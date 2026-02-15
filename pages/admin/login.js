import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function login() {
    setErr("");
    const r = await fetch("/api/admin/login", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ user, pass })
    });
    const d = await r.json();
    if (!r.ok) return setErr(d?.error || "Login failed");
    router.push("/admin");
  }

  return (
    <main>
      <div className="h1">Admin Login</div>
      <div className="card" style={{maxWidth:520}}>
        <label className="label">Username</label>
        <input className="input" value={user} onChange={(e)=>setUser(e.target.value)} />
        <label className="label">Password</label>
        <input className="input" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
        {err && <div className="error">{err}</div>}
        <div style={{marginTop:12}}><button className="btn primary full" onClick={login}>Login</button></div>
      </div>
    </main>
  );
}
