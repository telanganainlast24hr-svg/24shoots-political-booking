import Layout from "@/components/Layout";

export default function Contact() {
  const whatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554";
  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Contact</h2>
            <p>Fastest: WhatsApp.</p>
          </div>

          <div className="panel">
            <div className="panelBody">
              <p className="sub" style={{ marginBottom: 14 }}>
                For political leaders/teams in GHMC Hyderabad only. If you have questions before paying, message us on WhatsApp.
              </p>
              <a className="btn btnPrimary" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I want to book a political reel shoot in GHMC Hyderabad.")}`} target="_blank" rel="noreferrer">
                WhatsApp now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
