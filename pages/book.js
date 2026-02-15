import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PKG = {
  "1_reel": { label: "1 Reel", amount: 1899, shoot: "Up to 2 hours" },
  "2_reels": { label: "2 Reels", amount: 3499, shoot: "Up to 4 hours" },
};

function onlyDigits(s){ return (s||"").replace(/\D/g,""); }

export default function Book() {
  const router = useRouter();
  const [pkg, setPkg] = useState("1_reel");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [ghmc, setGhmc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  useEffect(() => {
    if (router.query.pkg === "1_reel" || router.query.pkg === "2_reels") setPkg(router.query.pkg);
  }, [router.query.pkg]);

  const pkgInfo = PKG[pkg];

  async function startPayment() {
    setErr("");
    const cleanPhone = onlyDigits(phone);

    if (!name.trim()) return setErr("Enter full name.");
    if (cleanPhone.length < 10) return setErr("Enter a valid phone number.");
    if (!date) return setErr("Select date.");
    if (!time) return setErr("Select time.");
    if (!location.trim()) return setErr("Enter location (GHMC Hyderabad).");
    if (!ghmc) return setErr("Please confirm the location is within GHMC Hyderabad.");

    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          date,
          time,
          location: location.trim(),
          mapsLink: mapsLink.trim(),
          pkg
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");

      const { orderId, razorpayKeyId, bookingId, amount } = data;

      const options = {
        key: razorpayKeyId,
        amount: amount * 100,
        currency: "INR",
        name: "24shoots",
        description: `Political Leader Reel Booking (${pkgInfo.label})`,
        order_id: orderId,
        prefill: { name: name.trim(), contact: cleanPhone },
        notes: { bookingId },
        theme: { color: "#22c55e" },
        handler: async function (response) {
          const vr = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
              bookingId,
              pkg,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const vdata = await vr.json();
          if (!vr.ok) throw new Error(vdata?.error || "Payment verification failed");
          router.push(`/success?bookingId=${encodeURIComponent(vdata.bookingId)}`);
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        setErr(resp?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="h1">Book Now</div>
      <p className="p">Pay via UPI to confirm instantly. Only for political leaders in <b>GHMC Hyderabad</b>.</p>

      <div className="grid grid2">
        <div className="card">
          <div className="h2">Your details</div>

          <label className="label">Full Name</label>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />

          <label className="label">Phone Number</label>
          <input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="10-digit phone" inputMode="numeric" />

          <label className="label">Date</label>
          <input className="input" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

          <label className="label">Time</label>
          <input className="input" type="time" value={time} onChange={(e)=>setTime(e.target.value)} />

          <label className="label">Location (GHMC Hyderabad)</label>
          <input className="input" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Area + landmark" />

          <label className="label">Google Maps link (optional)</label>
          <input className="input" value={mapsLink} onChange={(e)=>setMapsLink(e.target.value)} placeholder="https://maps.app.goo.gl/..." />

          <div style={{marginTop:12}}>
            <label style={{display:"flex", gap:10, alignItems:"flex-start"}}>
              <input type="checkbox" checked={ghmc} onChange={(e)=>setGhmc(e.target.checked)} style={{marginTop:3}} />
              <span className="note">I confirm this location is within <b>GHMC Hyderabad</b>. Outside GHMC bookings are not accepted.</span>
            </label>
          </div>

          {err && <div className="error">{err}</div>}
        </div>

        <div className="card">
          <div className="h2">Choose package</div>
          <div className="grid" style={{gap:10}}>
            <button className={`btn ${pkg==="1_reel"?"primary":"ghost"} full`} onClick={()=>setPkg("1_reel")} type="button">
              1 Reel • ₹1,899
            </button>
            <button className={`btn ${pkg==="2_reels"?"primary":"ghost"} full`} onClick={()=>setPkg("2_reels")} type="button">
              2 Reels • ₹3,499
            </button>
          </div>

          <div className="hr"></div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
            <div><div style={{fontWeight:900, fontSize:18}}>{pkgInfo.label}</div><div className="small">On-ground: {pkgInfo.shoot}</div></div>
            <div className="price">₹{pkgInfo.amount}</div>
          </div>

          <div className="kv">
            <span>Under‑30‑min delivery</span><span>No raw clips</span><span>No revisions</span><span>Full refund</span><span>Free reschedule (2 days)</span>
          </div>

          <div style={{marginTop:14}}>
            <button className="btn primary full" onClick={startPayment} disabled={loading}>
              {loading ? "Preparing UPI…" : "Pay & Confirm Instantly"}
            </button>
            <p className="note" style={{marginTop:10}}>Payment is required to confirm. After payment, you’ll get a Booking ID.</p>
            <p className="note">By booking you agree to our <Link href="/terms"><u>Terms</u></Link>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
