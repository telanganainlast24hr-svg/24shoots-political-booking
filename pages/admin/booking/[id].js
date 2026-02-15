import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookingDetail() {
  const router = useRouter();
  const id = router.query.id?.toString() || "";
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("CONFIRMED");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    const r = await fetch(`/api/admin/booking?id=${encodeURIComponent(id)}`);
    if (r.status === 401) { router.push("/admin/login"); return; }
    const j = await r.json();
    if (r.ok) {
      setItem(j.item);
      setStatus(j.item.status);
      setNotes(j.item.notes || "");
    }
  }

  useEffect(() => { if (id) load(); }, [id]);

  async function save() {
    setMsg("");
    const r = await fetch("/api/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: id, status, notes }),
    });
    const j = await r.json();
    if (!r.ok) setMsg(j.error || "Failed");
    else { setMsg("Saved ✅"); setItem(j.item); }
  }

  if (!id) return null;

  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="sectionTitle">
            <h2>Booking {id}</h2>
            <p>Update status/notes and coordinate.</p>
          </div>

          <div className="panel">
            <div className="panelBody">
              {item ? (
                <>
                  <div className="grid3" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <div className="card"><h3>Name</h3><p>{item.name}</p></div>
                    <div className="card"><h3>Phone</h3><p>{item.phone}</p></div>
                    <div className="card"><h3>Package</h3><p>{item.packageType === "2_reels" ? "2 reels" : "1 reel"}</p></div>
                  </div>

                  <div className="grid3" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
                    <div className="card"><h3>Date</h3><p>{item.date}</p></div>
                    <div className="card"><h3>Time</h3><p>{item.time}</p></div>
                    <div className="card"><h3>Status</h3><p>{item.status}</p></div>
                  </div>

                  <div className="card" style={{ marginTop: 12 }}>
                    <h3>Location</h3>
                    <p style={{ marginBottom: 0 }}>{item.location}</p>
                    {item.mapsLink ? <p style={{ marginTop: 10 }}><a className="btn" href={item.mapsLink} target="_blank" rel="noreferrer">Open maps</a></p> : null}
                  </div>

                  <div className="hr" />

                  <div className="formGrid">
                    <div className="field">
                      <label>Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="REFUNDED">REFUNDED</option>
                      </select>
                    </div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                      <label>Notes</label>
                      <textarea rows="4" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes…" />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
                    <button className="btn btnPrimary" onClick={save}>Save</button>
                    <button className="btn" onClick={() => router.push("/admin")}>Back</button>
                    {msg ? <span className="help">{msg}</span> : null}
                  </div>
                </>
              ) : (
                <div className="help">Loading…</div>
              )}
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
