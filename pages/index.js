import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <div className="kicker"><span className="kickerDot" /> GHMC Hyderabad • Political leaders only</div>
            <h1 className="h1">Pay & book a political reel shoot — in under 60 seconds.</h1>
            <p className="sub">
              24shoots is an on-ground iPhone reel team for political leaders and teams.
              We shoot fast, edit fast, and deliver the final reel <b>within 30 minutes after the shoot</b>.
              Slot is confirmed only after payment verification.
            </p>

            <div className="ctaRow" style={{ marginTop: 8 }}>
              <Link className="btn btnPrimary" href="/book">Book Now</Link>
              <Link className="btn" href="/pricing">See Pricing</Link>
            </div>

            <div className="heroBadges">
              <div className="badge"><strong>Under 30 min</strong> delivery</div>
              <div className="badge"><strong>Same-day</strong> bookings</div>
              <div className="badge"><strong>No raw clips</strong> • No revisions</div>
              <div className="badge"><strong>Full refund</strong> + reschedule</div>
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">
              <div className="panelTitle">
                <h3>Book like an app</h3>
                <span className="pill">Fast checkout</span>
              </div>
            </div>
            <div className="panelBody">
              <div className="notice">
                ✅ Your slot is confirmed only after payment verification.
                <br />You’ll get a Booking ID instantly.
              </div>

              <div className="steps">
                <div className="step">
                  <div className="stepNum">1</div>
                  <div className="stepText">
                    <b>Choose package</b>
                    <span>1 reel or 2 reels. Clear timing limits.</span>
                  </div>
                </div>
                <div className="step">
                  <div className="stepNum">2</div>
                  <div className="stepText">
                    <b>Pay via UPI</b>
                    <span>Razorpay checkout. Secure verification.</span>
                  </div>
                </div>
                <div className="step">
                  <div className="stepNum">3</div>
                  <div className="stepText">
                    <b>We shoot + deliver</b>
                    <span>Under 30 min delivery after shoot completion.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link className="btn btnPrimary" href="/book">Book in 60s</Link>
                <a className="btn" href="#proof">Add sample reels (recommended)</a>
              </div>

              <div className="help" style={{ marginTop: 10 }}>
                Tip: your conversion goes up massively when you add 3 sample reels on the homepage.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="proof">
        <div className="container">
          <div className="sectionTitle">
            <h2>Proof that this works</h2>
            <p>Add 3 of your best reels here. People pay faster when they can see the style instantly.</p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="icon">▶</div>
              <h3>Sample Reel #1</h3>
              <p>Replace this card with your best political reel (Instagram link).</p>
            </div>
            <div className="card">
              <div className="icon">▶</div>
              <h3>Sample Reel #2</h3>
              <p>Strong hook + crowd visuals convert the best.</p>
            </div>
            <div className="card">
              <div className="icon">▶</div>
              <h3>Sample Reel #3</h3>
              <p>Before/after or rally highlights work well.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionTitle">
            <h2>Why teams book 24shoots</h2>
            <p>Clear deliverables. Clear time limits. No back-and-forth.</p>
          </div>
          <div className="grid3">
            <div className="card">
              <div className="icon">⚡</div>
              <h3>Fast output</h3>
              <p>We optimize for speed: shoot + edit pipeline designed for political teams.</p>
            </div>
            <div className="card">
              <div className="icon">🧾</div>
              <h3>Simple booking</h3>
              <p>Pay and book instantly. Slot confirmed after verified payment — no ambiguity.</p>
            </div>
            <div className="card">
              <div className="icon">🎯</div>
              <h3>Designed for reach</h3>
              <p>Hooks, framing and pacing built for Instagram Reels performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionTitle">
            <h2>Packages</h2>
            <p>Pick the package, pay, and book instantly.</p>
          </div>

          <div className="pricingGrid">
            <div className="card" style={{ borderColor: "rgba(255,122,24,0.35)" }}>
              <h3>1 Reel</h3>
              <div className="price">₹1,899 <small>up to 2 hours</small></div>
              <div className="hr" />
              <ul className="list">
                <li><span className="tick" /> 1 final reel delivered (under 30 min after shoot)</li>
                <li><span className="tick" /> Same-day bookings allowed</li>
                <li><span className="warn" /> No raw clips</li>
                <li><span className="warn" /> No revisions</li>
              </ul>
              <div style={{ marginTop: 14 }}>
                <Link className="btn btnPrimary" href="/book?pkg=1_reel">Book 1 Reel</Link>
              </div>
            </div>

            <div className="card">
              <h3>2 Reels</h3>
              <div className="price">₹3,499 <small>up to 4 hours</small></div>
              <div className="hr" />
              <ul className="list">
                <li><span className="tick" /> 2 final reels delivered (under 30 min after shoot)</li>
                <li><span className="tick" /> Same-day bookings allowed</li>
                <li><span className="warn" /> No raw clips</li>
                <li><span className="warn" /> No revisions</li>
              </ul>
              <div style={{ marginTop: 14 }}>
                <Link className="btn btnPrimary" href="/book?pkg=2_reels">Book 2 Reels</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionTitle">
            <h2>Policies (clear & strict)</h2>
            <p>Clarity increases trust — and increases conversions.</p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="icon">🧠</div>
              <h3>Refunds</h3>
              <p>Full refunds available for both packages.</p>
            </div>
            <div className="card">
              <div className="icon">📅</div>
              <h3>Reschedule</h3>
              <p>Free reschedule within 2 days.</p>
            </div>
            <div className="card">
              <div className="icon">📍</div>
              <h3>Location</h3>
              <p>GHMC Hyderabad only. If not GHMC, we won’t confirm.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
