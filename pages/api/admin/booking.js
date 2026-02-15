import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const { id } = req.query;
  await dbConnect();
  const item = await Booking.findOne({ bookingId: id }).lean();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.status(200).json({ item });
}
