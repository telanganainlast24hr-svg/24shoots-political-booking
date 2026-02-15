import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Terms</h2>
            <p>Simple, strict terms for fast delivery.</p>
          </div>

          <div className="panel">
            <div className="panelBody">
              <div className="sub" style={{ maxWidth: "85ch" }}>
                <p><b>Service:</b> 24shoots provides on-ground iPhone reel shooting + editing for political leaders/teams in GHMC Hyderabad.</p>
                <p><b>Deliverables:</b> Final reel(s) only. No raw clips. No revisions.</p>
                <p><b>Timing:</b> 1 reel shoot time up to 2 hours. 2 reels shoot time up to 4 hours.</p>
                <p><b>Delivery:</b> Under 30 minutes after the shoot is completed.</p>
                <p><b>Payment:</b> Full payment before shoot. Booking is confirmed only after payment verification.</p>
                <p><b>Refund:</b> Full refund available. Free reschedule within 2 days.</p>
                <p><b>Coverage:</b> GHMC Hyderabad only.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
