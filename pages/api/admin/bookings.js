import { dbConnect } from "../../../lib/db";
import Booking from "../../../models/Booking";
import { requireAdmin } from "../../../lib/auth";

const LABEL = { "1_reel": "1 Reel", "2_reels": "2 Reels" };

export default async function handler(req, res) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const items = await Booking.find({}).sort({ createdAt: -1 }).limit(500).lean();
  return res.status(200).json({
    items: items.map(it => ({
      _id: String(it._id),
      bookingId: it.bookingId,
      status: it.status,
      name: it.name,
      phone: it.phone,
      date: it.date,
      time: it.time,
      packageLabel: LABEL[it.package] || it.package,
      amount: it.amount,
    }))
  });
}
