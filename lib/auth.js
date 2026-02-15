import jwt from "jsonwebtoken";
import { parse } from "cookie";

export function getAdminFromRequest(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.admin_token;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload?.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export function requireAdmin(req, res) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return admin;
}
