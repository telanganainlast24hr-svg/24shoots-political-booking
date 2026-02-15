import { setAdminCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { user, pass } = req.body || {};
  if (!user || !pass) return res.status(400).json({ error: "Missing credentials" });

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: "Invalid username/password" });
  }

  setAdminCookie(res);
  return res.status(200).json({ ok: true });
}
