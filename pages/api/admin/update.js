import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { bookingId, status, notes } = req.body || {};
  if (!bookingId) return res.status(400).json({ error: "Missing bookingId" });

  await dbConnect();

  const update = {};
  if (status) update.status = status;
  if (typeof notes === "string") update.notes = notes;

  const item = await Booking.findOneAndUpdate({ bookingId }, update, { new: true }).lean();
  if (!item) return res.status(404).json({ error: "Not found" });

  res.status(200).json({ ok: true, item });
}
