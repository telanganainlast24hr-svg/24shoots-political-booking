import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const r = await fetch("/api/admin/bookings");
    const d = await r.json();
    if (!r.ok) {
      if (r.status === 401) router.push("/admin/login");
      else setErr(d?.error || "Failed to load");
      return;
    }
    setItems(d.items || []);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(it =>
      (it.bookingId || "").toLowerCase().includes(s) ||
      (it.phone || "").toLowerCase().includes(s) ||
      (it.name || "").toLowerCase().includes(s)
    );
  }, [q, items]);

  async function logout(){
    await fetch("/api/admin/logout", { method:"POST" });
    router.push("/admin/login");
  }

  return (
    <main>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
        <div>
          <div className="h1">Admin</div>
          <p className="p">Bookings (newest first). Search by Booking ID / phone / name.</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn ghost" onClick={load}>Refresh</button>
          <button className="btn danger" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="card">
        <input className="input" placeholder="Search…" value={q} onChange={(e)=>setQ(e.target.value)} />
        {err && <div className="error">{err}</div>}
        <div className="hr"></div>
        <div style={{overflowX:"auto"}}>
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Status</th><th>Name</th><th>Phone</th><th>Date</th><th>Time</th><th>Package</th><th>Amount</th><th>View</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(it => (
                <tr key={it._id}>
                  <td><b>{it.bookingId}</b></td>
                  <td><span className="pill">{it.status}</span></td>
                  <td>{it.name}</td>
                  <td>{it.phone}</td>
                  <td>{it.date}</td>
                  <td>{it.time}</td>
                  <td>{it.packageLabel}</td>
                  <td>₹{it.amount}</td>
                  <td><Link href={`/admin/booking/${encodeURIComponent(it.bookingId)}`}><u>Open</u></Link></td>
                </tr>
              ))}
              {filtered.length === 0 && (<tr><td colSpan="9" className="small">No bookings found.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{marginTop:14}}>
        <div className="h2">Export</div>
        <p className="p">Download CSV of all bookings.</p>
        <a className="btn ghost" href="/api/admin/export" target="_blank" rel="noreferrer">Export CSV</a>
      </div>
    </main>
  );
}
