import { dbConnect } from "../../../lib/db";
import Booking from "../../../models/Booking";
import { requireAdmin } from "../../../lib/auth";

const VALID = new Set(["NEW","CONFIRMED","ASSIGNED","COMPLETED","RESCHEDULED","REFUNDED","CANCELLED"]);

export default async function handler(req, res) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { bookingId, status, notes } = req.body || {};
  if (!bookingId || !VALID.has(status)) return res.status(400).json({ error: "Invalid input" });

  await dbConnect();
  await Booking.updateOne({ bookingId }, { $set: { status, notes: notes || "" }});
  return res.status(200).json({ ok: true });
}
