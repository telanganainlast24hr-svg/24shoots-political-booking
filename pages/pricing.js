import Link from "next/link";

export default function Pricing() {
  return (
    <main>
      <div className="h1">Pricing</div>
      <p className="p">Fixed pricing. Pay first. Booking confirmed instantly after payment verification.</p>

      <div className="grid grid2">
        <div className="card">
          <div className="cardhead">
            <div><div style={{fontWeight:900, fontSize:18}}>1 Reel</div><div className="small">Up to 2 hours shoot time</div></div>
            <div className="price">₹1,899</div>
          </div>
          <div className="hr"></div>
          <ul className="list"><li>Delivery under 30 minutes after shoot</li><li>GHMC Hyderabad only</li><li>No raw clips • No revisions</li></ul>
          <div style={{marginTop:12}}><Link className="btn primary full" href="/book?pkg=1_reel">Pay & Book 1 Reel</Link></div>
        </div>

        <div className="card">
          <div className="cardhead">
            <div><div style={{fontWeight:900, fontSize:18}}>2 Reels</div><div className="small">Up to 4 hours shoot time</div></div>
            <div className="price">₹3,499</div>
          </div>
          <div className="hr"></div>
          <ul className="list"><li>Both reels delivered under 30 minutes after shoot</li><li>Same‑day booking available</li><li>No raw clips • No revisions</li></ul>
          <div style={{marginTop:12}}><Link className="btn primary full" href="/book?pkg=2_reels">Pay & Book 2 Reels</Link></div>
        </div>
      </div>

      <div className="card" style={{marginTop:14}}>
        <div className="h2">Policies</div>
        <ul className="list">
          <li><b>Full payment before shoot</b> (Razorpay UPI only).</li>
          <li><b>Full refund</b> available for both packages.</li>
          <li><b>Free reschedule</b> within 2 days.</li>
          <li><b>GHMC Hyderabad only</b>. Outside GHMC bookings are not accepted.</li>
        </ul>
      </div>
    </main>
  );
}
