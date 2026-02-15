import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const r = await fetch(`/api/admin/bookings?q=${encodeURIComponent(q)}`);
    if (r.status === 401) {
      router.push("/admin/login");
      return;
    }
    const j = await r.json();
    if (!r.ok) setErr(j.error || "Failed to load");
    else setItems(j.items || []);
  }

  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Admin dashboard</h2>
            <p>Search by Booking ID / phone / name.</p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" style={{ maxWidth: 320 }} />
            <button className="btn" onClick={load}>Search</button>
            <a className="btn" href="/api/admin/export" target="_blank" rel="noreferrer">Export CSV</a>
            <button className="btn btnGhost" onClick={async () => { await fetch("/api/admin/logout"); router.push("/"); }}>Logout</button>
          </div>

          {err ? <div className="notice" style={{ marginBottom: 12 }}>{err}</div> : null}

          <div className="panel">
            <div className="panelBody" style={{ paddingTop: 6 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Package</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((x) => (
                    <tr key={x.bookingId}>
                      <td><Link href={`/admin/booking/${encodeURIComponent(x.bookingId)}`}>{x.bookingId}</Link></td>
                      <td>{x.name}</td>
                      <td>{x.phone}</td>
                      <td>{x.date}</td>
                      <td>{x.time}</td>
                      <td>{x.packageType === "2_reels" ? "2 reels" : "1 reel"}</td>
                      <td>{x.status}</td>
                    </tr>
                  ))}
                  {items.length === 0 ? (
                    <tr><td colSpan="7" style={{ color: "rgba(255,255,255,0.55)" }}>No bookings yet.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
