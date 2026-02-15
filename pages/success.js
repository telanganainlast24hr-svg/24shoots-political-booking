import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const bookingId = router.query.bookingId || "";
  const [details, setDetails] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/booking?bookingId=${encodeURIComponent(bookingId)}`)
      .then(r => r.json().then(d => ({ok:r.ok, d})))
      .then(({ok,d}) => { if (!ok) throw new Error(d?.error || "Failed"); setDetails(d); })
      .catch(e => setErr(e.message));
  }, [bookingId]);

  const adminPhone = (process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554").replace(/\D/g,"");
  const waText = useMemo(() => {
    if (!details) return "";
    return `NEW BOOKING CONFIRMED ✅
Booking ID: ${details.bookingId}
Package: ${details.packageLabel}
Name: ${details.name}
Phone: ${details.phone}
Date: ${details.date}
Time: ${details.time}
Location: ${details.location}
Maps: ${details.mapsLink || "-"}
Amount: ₹${details.amount}
Razorpay Payment ID: ${details.razorpayPaymentId}`;
  }, [details]);

  const waLink = useMemo(() => waText ? `https://wa.me/91${adminPhone}?text=${encodeURIComponent(waText)}` : "#", [adminPhone, waText]);

  async function copy() { try { await navigator.clipboard.writeText(waText); } catch {} }

  return (
    <main>
      <div className="h1">Booking Confirmed ✅</div>
      <p className="p">Your booking is confirmed after payment verification.</p>
      {err && <div className="error">{err}</div>}

      {details && (
        <div className="card">
          <div className="cardhead">
            <div>
              <div className="small">Booking ID</div>
              <div style={{fontSize:22, fontWeight:900}}>{details.bookingId}</div>
            </div>
            <div className="pill">{details.status}</div>
          </div>
          <div className="hr"></div>

          <div className="grid" style={{gap:8}}>
            <div><span className="small">Package:</span> <b>{details.packageLabel}</b></div>
            <div><span className="small">Date & Time:</span> <b>{details.date}</b> • <b>{details.time}</b></div>
            <div><span className="small">Location:</span> <b>{details.location}</b></div>
            {details.mapsLink ? <div><span className="small">Maps:</span> <a href={details.mapsLink} target="_blank" rel="noreferrer"><u>Open link</u></a></div> : null}
            <div><span className="small">Amount:</span> <b>₹{details.amount}</b></div>
          </div>

          <div className="hr"></div>
          <p className="p">Next: We will WhatsApp/call shortly to reconfirm entry + parking. We reach 10 minutes early.</p>

          <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
            <a className="btn primary" href={waLink} target="_blank" rel="noreferrer" onClick={copy}>WhatsApp confirmation to 24shoots</a>
            <button className="btn ghost" onClick={copy} type="button">Copy confirmation text</button>
          </div>

          <p className="note" style={{marginTop:10}}>Policies: Full refund • Free reschedule within 2 days • GHMC only • No raw clips • No revisions.</p>
        </div>
      )}
    </main>
  );
}
