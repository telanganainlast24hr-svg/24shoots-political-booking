import Layout from "@/components/Layout";
import Link from "next/link";

export default function Pricing() {
  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Pricing</h2>
            <p>Pay & book instantly. Slot confirmed only after payment verification.</p>
          </div>

          <div className="pricingGrid">
            <div className="card" style={{ borderColor: "rgba(255,122,24,0.35)" }}>
              <h3>1 Reel</h3>
              <div className="price">₹1,899 <small>up to 2 hours</small></div>
              <ul className="list">
                <li><span className="tick" /> 1 final reel</li>
                <li><span className="tick" /> Under 30 min delivery after shoot</li>
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
              <ul className="list">
                <li><span className="tick" /> 2 final reels</li>
                <li><span className="tick" /> Under 30 min delivery after shoot</li>
                <li><span className="warn" /> No raw clips</li>
                <li><span className="warn" /> No revisions</li>
              </ul>
              <div style={{ marginTop: 14 }}>
                <Link className="btn btnPrimary" href="/book?pkg=2_reels">Book 2 Reels</Link>
              </div>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panelBody">
              <div className="sectionTitle" style={{ marginBottom: 0 }}>
                <h2 style={{ fontSize: 18 }}>What’s included</h2>
                <p>One clean deliverable, fast turnaround, minimal coordination.</p>
              </div>
              <div className="grid3" style={{ marginTop: 12 }}>
                <div className="card">
                  <div className="icon">🎬</div>
                  <h3>Reel-ready edit</h3>
                  <p>Hook-first pacing, captions (optional), output optimized for IG reels.</p>
                </div>
                <div className="card">
                  <div className="icon">📲</div>
                  <h3>iPhone workflow</h3>
                  <p>Fast shoot-to-edit pipeline for same-day political schedules.</p>
                </div>
                <div className="card">
                  <div className="icon">🛡️</div>
                  <h3>Secure booking</h3>
                  <p>Verified payment only. No slot confusion.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
