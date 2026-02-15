import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="card">
        <div className="h1">Political Reel. Same‑day GHMC. Confirmed only after payment.</div>
        <p className="p">
          Built for political leaders and teams in GHMC Hyderabad. Choose 1 or 2 reels, pay via UPI, and your slot is confirmed instantly.
          Delivery is <b>under 30 minutes after the shoot</b>. No raw clips. No revisions.
        </p>
        <div style={{display:"flex", gap:10, flexWrap:"wrap", marginTop:10}}>
          <Link className="btn primary" href="/book">Pay & Confirm Booking</Link>
          <Link className="btn ghost" href="/pricing">See Pricing</Link>
        </div>
        <div className="kv">
          <span>GHMC Hyderabad only</span><span>Same‑day booking</span><span>UPI payment</span>
          <span>Under‑30‑min delivery</span><span>Full refund</span><span>Free reschedule (2 days)</span>
        </div>
      </div>

      <div className="grid grid2" style={{marginTop:14}}>
        <div className="card">
          <div className="cardhead">
            <div><div style={{fontWeight:900, fontSize:18}}>1 Reel</div><div className="small">Up to 2 hours shoot time</div></div>
            <div className="price">₹1,899</div>
          </div>
          <div className="hr"></div>
          <ul className="list">
            <li>Final reel delivered under 30 minutes after shoot</li>
            <li>No raw clips, no revisions</li>
            <li>Full refund available</li>
          </ul>
          <div style={{marginTop:12}}>
            <Link className="btn primary full" href="/book?pkg=1_reel">Book 1 Reel</Link>
          </div>
        </div>

        <div className="card">
          <div className="cardhead">
            <div><div style={{fontWeight:900, fontSize:18}}>2 Reels</div><div className="small">Up to 4 hours shoot time</div></div>
            <div className="price">₹3,499</div>
          </div>
          <div className="hr"></div>
          <ul className="list">
            <li>Both reels delivered under 30 minutes after shoot</li>
            <li>No raw clips, no revisions</li>
            <li>Full refund available</li>
          </ul>
          <div style={{marginTop:12}}>
            <Link className="btn primary full" href="/book?pkg=2_reels">Book 2 Reels</Link>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:14}}>
        <div className="h2">How it works</div>
        <ol className="list">
          <li><b>Choose package</b> (1 reel / 2 reels) and enter date, time, location.</li>
          <li><b>Pay via UPI</b>. Booking is confirmed only after payment verification.</li>
          <li><b>We shoot + deliver</b> your final reel under 30 minutes after the shoot.</li>
        </ol>
        <div className="hr"></div>
        <p className="p">Backed by <b>@telanganainlast24hr</b> (107k+ community reach). We don’t promise virality—only clean, fast, post‑ready output.</p>
      </div>
    </main>
  );
}
