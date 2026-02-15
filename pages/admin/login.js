import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Login failed");
      router.push("/admin");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="section" style={{ paddingTop: 26 }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="panel">
            <div className="panelBody">
              <div className="kicker"><span className="kickerDot" /> Admin</div>
              <h1 className="h1" style={{ fontSize: 34, marginTop: 10 }}>Login</h1>
              <form onSubmit={submit} style={{ display: "grid", gap: 12, marginTop: 10 }}>
                <div className="field">
                  <label>Username</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {err ? <div className="notice">{err}</div> : null}
                <button className="btn btnPrimary" disabled={loading}>{loading ? "Logging in…" : "Login"}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
