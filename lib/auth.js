import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
const COOKIE_NAME = "ps_admin";

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
export function setAdminCookie(res) {
  const token = signAdminToken();
  res.setHeader("Set-Cookie", serialize(COOKIE_NAME, token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: 60*60*24*7
  }));
}
export function clearAdminCookie(res) {
  res.setHeader("Set-Cookie", serialize(COOKIE_NAME, "", {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: 0
  }));
}
export function requireAdmin(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return { ok: false };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.role === "admin" ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
}
