import Link from "next/link";

function Icon({ children }) {
  return <span className="icon" aria-hidden="true">{children}</span>;
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Bolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Shield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12.2l1.8 1.8 3.6-3.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero2">
        <div className="hero2Grid">
          <div className="heroCopy">
            <div className="kicker">
              <span className="kdot" />
              <span>For political leaders</span>
              <span className="ksep">•</span>
              <span>GHMC Hyderabad</span>
              <span className="ksep">•</span>
              <span>Pay & book instantly</span>
            </div>

            <h1 className="heroTitle">
              Flash‑fast political reels that look <span className="accentText">premium</span>.
            </h1>

            <p className="heroSub">
              Choose <b>1 Reel</b> or <b>2 Reels</b>, pay via <b>UPI/Razorpay</b>, and your slot is confirmed.
              We shoot on‑ground and deliver a <b>post‑ready reel under 30 minutes after the shoot</b>.
              <span className="mutedLine">No raw clips • No revisions</span>
            </p>

            <div className="ctaRow2">
              <Link className="btn primary" href="/book">Pay & Book Now</Link>
              <a className="btn ghost" href="https://wa.me/917989175554" target="_blank" rel="noreferrer">
                WhatsApp to Confirm
              </a>
            </div>

            <div className="proofRow">
              <div className="proofPill"><Icon><Bolt/></Icon> Same‑day bookings</div>
              <div className="proofPill"><Icon><Shield/></Icon> Full refund policy</div>
              <div className="proofPill"><Icon><Check/></Icon> Verified payment = confirmed slot</div>
            </div>

            <div className="miniNote">
              Powered by <b>@telanganainlast24hr</b> (107k+ community). Bookings handled personally.
            </div>
          </div>

          <div className="heroMock">
            <div className="mockCard">
              <div className="mockTop">
                <div>
                  <div className="mockTitle">Book in ~60 seconds</div>
                  <div className="mockSub">Pay → auto‑verify → confirmed</div>
                </div>
                <div className="mockBadge">UPI</div>
              </div>

              <div className="mockSteps">
                <div className="step">
                  <span className="stepNum">1</span>
                  <div>
                    <div className="stepTitle">Choose package</div>
                    <div className="stepText">1 Reel ₹1,899 • 2 Reels ₹3,499</div>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">2</span>
                  <div>
                    <div className="stepTitle">Enter details</div>
                    <div className="stepText">Name, phone, date, time, location</div>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">3</span>
                  <div>
                    <div className="stepTitle">Pay & lock slot</div>
                    <div className="stepText">Instant confirmation after verification</div>
                  </div>
                </div>
              </div>

              <div className="mockLine" />

              <div className="mockList">
                <div className="ml"><Icon><Check/></Icon> On‑ground shoot: up to 2h / 4h</div>
                <div className="ml"><Icon><Check/></Icon> Delivery: under 30 mins after shoot</div>
                <div className="ml"><Icon><Check/></Icon> GHMC Hyderabad only</div>
              </div>

              <Link className="btn primary full" href="/book">Confirm a Slot</Link>
              <div className="mockFoot">Tip: share Google Maps link to avoid delays.</div>
            </div>

            <div className="glow" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">How it works</h2>
        <div className="grid3">
          <div className="card">
            <div className="cardIcon"><Bolt/></div>
            <div className="h2">Pay & book instantly</div>
            <p className="p">Your slot is confirmed only after Razorpay verification. No waiting, no back‑and‑forth.</p>
          </div>
          <div className="card">
            <div className="cardIcon"><Check/></div>
            <div className="h2">We shoot on‑ground</div>
            <p className="p">Professional iPhone workflow. One‑take storytelling built for political content.</p>
          </div>
          <div className="card">
            <div className="cardIcon"><Shield/></div>
            <div className="h2">Fast delivery</div>
            <p className="p">Get a post‑ready reel under 30 minutes after the shoot. Clean captions and pacing.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div>
            <h2 className="sectionTitle">What you get</h2>
            <ul className="list">
              <li><b>1 or 2 finished reels</b> (vertical, post‑ready)</li>
              <li><b>On‑ground shoot time</b>: up to 2h (1 reel) / up to 4h (2 reels)</li>
              <li><b>Same‑day bookings</b> available</li>
              <li><b>No raw clips</b> • <b>No revisions</b> (fast workflow)</li>
              <li><b>Full refund</b> + <b>free reschedule within 2 days</b></li>
            </ul>
            <div className="ctaInline">
              <Link className="btn primary" href="/book">Book Now</Link>
              <Link className="btn ghost" href="/pricing">View packages</Link>
            </div>
          </div>

          <div className="card highlightCard">
            <div className="h2">Built to convert</div>
            <p className="p">
              Most people don’t buy because they don’t trust the outcome.
              This page is designed to remove doubt: clear deliverables, clear timing, clear refund policy.
            </p>
            <div className="hr" />
            <div className="kv">
              <span>Instant confirmation</span>
              <span>WhatsApp support</span>
              <span>GHMC‑only focus</span>
              <span>Premium look</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">Packages</h2>
        <div className="grid grid2">
          <div className="card">
            <div className="cardhead">
              <div><div style={{fontWeight:950, fontSize:18}}>1 Reel</div><div className="small">Up to 2 hours shoot time</div></div>
              <div className="price">₹1,899</div>
            </div>
            <div className="hr"></div>
            <ul className="list"><li>Delivery under 30 minutes after shoot</li><li>GHMC Hyderabad only</li><li>No raw clips • No revisions</li></ul>
            <div style={{marginTop:12}}><Link className="btn primary full" href="/book?pkg=1_reel">Pay & Book</Link></div>
          </div>

          <div className="card">
            <div className="cardhead">
              <div><div style={{fontWeight:950, fontSize:18}}>2 Reels</div><div className="small">Up to 4 hours shoot time</div></div>
              <div className="price">₹3,499</div>
            </div>
            <div className="hr"></div>
            <ul className="list"><li>Delivery under 30 minutes after shoot</li><li>GHMC Hyderabad only</li><li>No raw clips • No revisions</li></ul>
            <div style={{marginTop:12}}><Link className="btn primary full" href="/book?pkg=2_reels">Pay & Book</Link></div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">Add your sample reels</h2>
        <p className="p">This is the #1 conversion lever. Replace these placeholders with 3 Instagram links from your best reels.</p>
        <div className="grid3">
          <div className="card sampleCard">
            <div className="sampleTop">Sample Reel 1</div>
            <div className="sampleLine">Paste Instagram link in code</div>
            <div className="sampleHint">pages/index.js → “Add your sample reels”</div>
          </div>
          <div className="card sampleCard">
            <div className="sampleTop">Sample Reel 2</div>
            <div className="sampleLine">Paste Instagram link in code</div>
            <div className="sampleHint">Replace placeholder text</div>
          </div>
          <div className="card sampleCard">
            <div className="sampleTop">Sample Reel 3</div>
            <div className="sampleLine">Paste Instagram link in code</div>
            <div className="sampleHint">Keep it under 15–25s</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="ctaFinal">
          <div>
            <div className="h2">Ready to book a slot?</div>
            <p className="p">Pay now and get instant confirmation after verification. Same‑day slots available.</p>
          </div>
          <Link className="btn primary" href="/book">Pay & Book Now</Link>
        </div>
      </section>
    </main>
  );
}
