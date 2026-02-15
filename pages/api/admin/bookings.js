import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  await dbConnect();

  const q = String(req.query.q || "").trim();
  const filter = q
    ? {
        $or: [
          { bookingId: new RegExp(q, "i") },
          { name: new RegExp(q, "i") },
          { phone: new RegExp(q, "i") },
        ],
      }
    : {};

  const items = await Booking.find(filter).sort({ createdAt: -1 }).limit(200).lean();
  res.status(200).json({ items });
}
