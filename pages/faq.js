import Layout from "@/components/Layout";

const items = [
  { q: "Is this only for political leaders?", a: "Yes. This website is strictly for political leaders/teams." },
  { q: "Do you accept same-day bookings?", a: "Yes, if we have slots. Pay & book instantly to lock it." },
  { q: "Do you give raw clips?", a: "No raw clips. You receive the final reel(s) only." },
  { q: "Do you do revisions?", a: "No revisions. We keep deliverables simple and fast." },
  { q: "Refund and reschedule policy?", a: "Full refund is available. Free reschedule within 2 days." },
  { q: "Location coverage?", a: "GHMC Hyderabad only." },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="sectionTitle">
            <h2>FAQ</h2>
            <p>Short, clear answers. This improves trust and conversions.</p>
          </div>

          <div className="grid3" style={{ gridTemplateColumns: "1fr" }}>
            {items.map((x) => (
              <div key={x.q} className="card">
                <h3>{x.q}</h3>
                <p>{x.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
