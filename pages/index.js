import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroGrid">
          <div>
            <div className="h1">
              Political reels that look <span className="accentText">premium</span> — booked instantly after payment.
            </div>

            <p className="p">
              Built for political leaders and teams inside <b>GHMC Hyderabad</b>. Choose 1 or 2 reels, pay via UPI/Razorpay, and your slot is confirmed.
              We shoot with iPhone + pro workflow and deliver a <b>post‑ready reel under 30 minutes after the shoot</b>.
              <br />
              <span className="small">No raw clips. No revisions.</span>
            </p>

            <div className="ctaRow">
              <Link className="btn primary" href="/book">Pay & Confirm Booking</Link>
              <Link className="btn ghost" href="/pricing">See Pricing</Link>
            </div>

            <div className="kv">
              <span>GHMC only</span>
              <span>Same‑day booking</span>
              <span>UPI / Razorpay</span>
              <span>Under‑30‑min delivery</span>
              <span>Full refund</span>
              <span>Free reschedule (2 days)</span>
            </div>

            <div className="mini">
              Backed by <b>@telanganainlast24hr</b> (107k+ community reach). We don’t promise virality — only clean, fast, post‑ready output.
            </div>
          </div>

          <div className="mock">
            <div className="mockTop">
              <div className="dotRow" aria-hidden="true">
                <div className="dot"></div><div className="dot"></div><div className="dot"></div>
              </div>
              <div className="mockTitle">Booking in ~60 seconds</div>
            </div>

            <div className="mockCard">
              <div className="mockRow"><span>Package</span><b>1 Reel / 2 Reels</b></div>
              <div className="mockRow" style={{marginTop:6}}><span>Area</span><b>GHMC Hyderabad</b></div>
              <div className="mockRow" style={{marginTop:6}}><span>Payment</span><b>UPI / Card / NetBanking</b></div>
            </div>

            <div className="mockCard highlight">
              <div className="mockRow"><span>What you get</span><b>Ready‑to‑post Reel</b></div>
              <div className="mockRow" style={{marginTop:6}}><span>Delivery</span><b>Under 30 mins</b></div>
              <div className="mockRow" style={{marginTop:6}}><span>Policy</span><b>Full refund</b></div>
            </div>

            <div className="mockCta">
              <Link className="btn primary full" href="/book">Book Now</Link>
            </div>

            <div className="mockHint">
              Tip: Same‑day slots get filled. If your time is not fixed, pick “Anytime today” and we’ll confirm on WhatsApp.
            </div>
          </div>
        </div>
      </section>

      <section className="section grid grid3">
        <div className="card soft">
          <div className="h3">Designed for public-facing moments</div>
          <p className="p">Stage events, rallies, meetings, inaugurations, constituency visits — shot with clean framing + stable movement.</p>
        </div>
        <div className="card soft">
          <div className="h3">Conversion-first edits</div>
          <p className="p">Fast hook, captions for clarity, crisp pacing — so the reel holds attention and looks “official”.</p>
        </div>
        <div className="card soft">
          <div className="h3">Zero friction booking</div>
          <p className="p">Pay first → booking confirmed. You receive a WhatsApp confirmation message and we lock the slot.</p>
        </div>
      </section>

      <section className="section card">
        <div className="h2">How it works</div>
        <div className="grid grid3">
          <div className="card soft">
            <div className="pill">Step 1</div>
            <div className="h3" style={{marginTop:8}}>Choose package</div>
            <p className="p">Pick 1 reel or 2 reels. Add date, time, and location inside GHMC.</p>
          </div>
          <div className="card soft">
            <div className="pill">Step 2</div>
            <div className="h3" style={{marginTop:8}}>Pay & confirm</div>
            <p className="p">Pay via UPI/Razorpay. Your booking is confirmed only after payment verification.</p>
          </div>
          <div className="card soft">
            <div className="pill">Step 3</div>
            <div className="h3" style={{marginTop:8}}>Shoot → deliver</div>
            <p className="p">We shoot on-ground and deliver the final reel under 30 minutes after shoot.</p>
          </div>
        </div>
      </section>

      <section className="section grid grid2">
        <div className="card">
          <div className="cardhead">
            <div>
              <div style={{fontWeight:1000, fontSize:18}}>1 Reel</div>
              <div className="small">Up to 2 hours shoot time</div>
            </div>
            <div className="price">₹1,899</div>
          </div>
          <div className="hr"></div>
          <ul className="list">
            <li><b>1</b> final reel delivered under 30 minutes</li>
            <li>No raw clips, no revisions</li>
            <li>Full refund available</li>
          </ul>
          <div style={{marginTop:12}}>
            <Link className="btn primary full" href="/book?pkg=1_reel">Book 1 Reel</Link>
          </div>
        </div>

        <div className="card highlight">
          <div className="cardhead">
            <div>
              <div style={{fontWeight:1000, fontSize:18}}>2 Reels</div>
              <div className="small">Up to 4 hours shoot time</div>
            </div>
            <div className="price">₹3,499</div>
          </div>
          <div className="hr"></div>
          <ul className="list">
            <li><b>2</b> final reels delivered under 30 minutes</li>
            <li>No raw clips, no revisions</li>
            <li>Full refund available</li>
          </ul>
          <div style={{marginTop:12}}>
            <Link className="btn primary full" href="/book?pkg=2_reels">Book 2 Reels</Link>
          </div>
        </div>
      </section>

      <section className="section card">
        <div className="h2">Refund & reschedule policy</div>
        <ul className="list">
          <li><b>Full refund</b> available (both packages).</li>
          <li><b>Free reschedule</b> within 2 days.</li>
          <li>Booking is confirmed only after payment verification.</li>
        </ul>
      </section>
    </main>
  );
}
