import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const STATUS = ["NEW","CONFIRMED","ASSIGNED","COMPLETED","RESCHEDULED","REFUNDED","CANCELLED"];

export default function AdminBooking() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("CONFIRMED");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function load() {
    setErr(""); setOk("");
    const r = await fetch(`/api/admin/booking?bookingId=${encodeURIComponent(id||"")}`);
    const d = await r.json();
    if (!r.ok) {
      if (r.status === 401) router.push("/admin/login");
      else setErr(d?.error || "Failed");
      return;
    }
    setData(d);
    setStatus(d.status);
    setNotes(d.notes || "");
  }
  useEffect(() => { if (id) load(); }, [id]);

  async function save() {
    setErr(""); setOk("");
    const r = await fetch("/api/admin/update", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ bookingId: id, status, notes })
    });
    const d = await r.json();
    if (!r.ok) return setErr(d?.error || "Save failed");
    setOk("Saved ✅");
    load();
  }

  return (
    <main>
      <div className="h1">Booking</div>
      {err && <div className="error">{err}</div>}
      {ok && <div className="ok">{ok}</div>}
      {data && (
        <div className="card">
          <div className="cardhead">
            <div>
              <div className="small">Booking ID</div>
              <div style={{fontSize:22, fontWeight:900}}>{data.bookingId}</div>
              <div className="small">Payment: {data.razorpayPaymentId || "-"}</div>
            </div>
            <div className="pill">{data.status}</div>
          </div>

          <div className="hr"></div>
          <div className="grid" style={{gap:8}}>
            <div><span className="small">Name:</span> <b>{data.name}</b></div>
            <div><span className="small">Phone:</span> <b>{data.phone}</b></div>
            <div><span className="small">Date & Time:</span> <b>{data.date}</b> • <b>{data.time}</b></div>
            <div><span className="small">Location:</span> <b>{data.location}</b></div>
            {data.mapsLink ? <div><span className="small">Maps:</span> <a href={data.mapsLink} target="_blank" rel="noreferrer"><u>Open link</u></a></div> : null}
            <div><span className="small">Package:</span> <b>{data.packageLabel}</b></div>
            <div><span className="small">Amount:</span> <b>₹{data.amount}</b></div>
          </div>

          <div className="hr"></div>
          <label className="label">Status</label>
          <select className="input" value={status} onChange={(e)=>setStatus(e.target.value)}>
            {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <label className="label">Notes (manual creator assignment, etc.)</label>
          <textarea className="input" rows="4" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="E.g., Assigned: Charan 6281010170"></textarea>

          <div style={{marginTop:12, display:"flex", gap:10, flexWrap:"wrap"}}>
            <button className="btn primary" onClick={save}>Save</button>
            <button className="btn ghost" onClick={load}>Refresh</button>
            <button className="btn ghost" onClick={()=>router.push("/admin")}>Back</button>
          </div>
        </div>
      )}
    </main>
  );
}
