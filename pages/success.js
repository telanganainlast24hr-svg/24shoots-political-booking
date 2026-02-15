import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Success() {
  const router = useRouter();
  const bookingId = (router.query.bookingId || "").toString();
  const whatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554";

  const msg = `Booking confirmed ✅\nBooking ID: ${bookingId}\nI want WhatsApp confirmation and next steps.`;

  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="panel">
            <div className="panelBody">
              <div className="kicker"><span className="kickerDot" /> Payment verified</div>
              <h1 className="h1" style={{ marginTop: 12 }}>Booking confirmed.</h1>
              <p className="sub" style={{ maxWidth: "70ch" }}>
                Your booking is confirmed. Save this Booking ID and WhatsApp us for the confirmation message.
              </p>

              <div className="card" style={{ background: "rgba(0,0,0,0.22)" }}>
                <h3 style={{ margin: 0 }}>Booking ID</h3>
                <div style={{ fontSize: 28, fontWeight: 950, letterSpacing: "-0.6px", marginTop: 8 }}>
                  {bookingId || "—"}
                </div>
                <div className="help" style={{ marginTop: 6 }}>
                  Keep this ID for support, reschedule or refund requests.
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 14, maxWidth: 520 }}>
                <a className="btn btnPrimary" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">
                  WhatsApp confirmation
                </a>
                <Link className="btn" href="/">Back to Home</Link>
              </div>

              <div className="help" style={{ marginTop: 12 }}>
                We’ll coordinate the exact shoot time, and we’ll reach 10 minutes early.
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
