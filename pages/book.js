import Layout from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const PACKAGES = {
  "1_reel": { label: "1 Reel", price: 1899, limit: "up to 2 hours" },
  "2_reels": { label: "2 Reels", price: 3499, limit: "up to 4 hours" },
};

export default function Book() {
  const router = useRouter();
  const initialPkg = (router.query.pkg === "2_reels" ? "2_reels" : "1_reel");

  const [packageType, setPackageType] = useState(initialPkg);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    location: "",
    mapsLink: "",
    ghmcConfirmed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (router.query.pkg && ["1_reel", "2_reels"].includes(router.query.pkg)) {
      setPackageType(router.query.pkg);
    }
  }, [router.query.pkg]);

  const pkg = useMemo(() => PACKAGES[packageType], [packageType]);

  async function handlePay() {
    setError("");
    // client-side validation
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (form.phone.trim().length < 8) return setError("Please enter a valid phone number.");
    if (!form.date) return setError("Please select date.");
    if (!form.time) return setError("Please select time.");
    if (form.location.trim().length < 5) return setError("Please enter location.");
    if (!form.ghmcConfirmed) return setError("Please confirm GHMC Hyderabad.");

    setLoading(true);
    const ok = await loadRazorpayScript();
    if (!ok) { setLoading(false); return setError("Razorpay failed to load. Try again."); }

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageType }),
      });
      const orderJson = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderJson.error || "Could not create order.");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || undefined,
        // If NEXT_PUBLIC_RAZORPAY_KEY_ID isn't set, Razorpay still works on some envs; but better to set it.
        amount: orderJson.amount * 100,
        currency: "INR",
        name: "24shoots",
        description: "Political reel booking (GHMC)",
        order_id: orderJson.orderId,
        theme: { color: "#ff7a18" },
        handler: async function (response) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking: { ...form, packageType },
            }),
          });
          const verifyJson = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyJson.error || "Payment verification failed.");

          router.push(`/success?bookingId=${encodeURIComponent(verifyJson.bookingId)}`);
        },
        prefill: {
          name: form.name,
          contact: form.phone,
        },
        notes: {
          packageType,
          date: form.date,
          time: form.time,
        },
      };

      // eslint-disable-next-line no-undef
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const whatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554";

  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container heroGrid">
          <div>
            <div className="kicker"><span className="kickerDot" /> Book a slot (GHMC only)</div>
            <h1 className="h1" style={{ fontSize: 40 }}>Book instantly. Slot confirmed after payment verification.</h1>
            <p className="sub">
              This booking page is for <b>political leaders/teams only</b>. Choose a package, pay via UPI, and get your booking ID instantly.
            </p>

            <div className="panel">
              <div className="panelBody">
                <div className="formGrid">
                  <div className="field">
                    <label>Package</label>
                    <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                      <option value="1_reel">1 Reel — ₹1,899 (up to 2 hours)</option>
                      <option value="2_reels">2 Reels — ₹3,499 (up to 4 hours)</option>
                    </select>
                    <div className="help">Choose what you want. No negotiation. Clear deliverables.</div>
                  </div>

                  <div className="field">
                    <label>Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                  </div>

                  <div className="field">
                    <label>Phone number</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" inputMode="numeric" />
                  </div>

                  <div className="field">
                    <label>Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>

                  <div className="field">
                    <label>Time</label>
                    <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                  </div>

                  <div className="field">
                    <label>Location (GHMC Hyderabad)</label>
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Address / area" />
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label>Google Maps link (optional)</label>
                    <input value={form.mapsLink} onChange={(e) => setForm({ ...form, mapsLink: e.target.value })} placeholder="https://maps.app.goo.gl/..." />
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <div className="checkboxRow">
                      <input
                        type="checkbox"
                        checked={form.ghmcConfirmed}
                        onChange={(e) => setForm({ ...form, ghmcConfirmed: e.target.checked })}
                      />
                      <div>
                        <label style={{ display: "block" }}>I confirm this shoot is within GHMC Hyderabad.</label>
                        <div className="help">If it’s not GHMC, booking won’t be accepted.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {error ? <div style={{ marginTop: 12 }} className="notice">{error}</div> : null}

                <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                  <button className="btn btnPrimary" onClick={handlePay} disabled={loading}>
                    {loading ? "Preparing checkout…" : `Pay ₹${pkg.price} & Book Now`}
                  </button>
                  <a className="btn" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I want help booking a political reel shoot. My preferred date/time: ")}`} target="_blank" rel="noreferrer">
                    Need help? WhatsApp us
                  </a>
                </div>

                <div className="help" style={{ marginTop: 10 }}>
                  Note: Razorpay checkout requires <code>NEXT_PUBLIC_RAZORPAY_KEY_ID</code> for best reliability. Add it in Vercel env vars.
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">
              <div className="panelTitle">
                <h3>Checkout summary</h3>
                <span className="pill">Secure</span>
              </div>
            </div>
            <div className="panelBody">
              <div className="card" style={{ background: "rgba(0,0,0,0.22)" }}>
                <h3 style={{ marginTop: 0 }}>{pkg.label}</h3>
                <div className="price">₹{pkg.price} <small>{pkg.limit}</small></div>
                <div className="hr" />
                <ul className="list">
                  <li><span className="tick" /> Delivered under 30 minutes after shoot</li>
                  <li><span className="tick" /> Same-day bookings allowed</li>
                  <li><span className="warn" /> No raw clips, no revisions</li>
                </ul>
              </div>

              <div className="hr" />

              <div className="notice">
                ✅ Slot confirmed only after payment verification.
                <br />You get a Booking ID instantly.
              </div>

              <div style={{ marginTop: 12 }} className="help">
                If you want higher conversion, add 3 sample reels on the homepage (Proof section).
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
