import { dbConnect } from "../../../lib/db";
import Booking from "../../../models/Booking";
import { requireAdmin } from "../../../lib/auth";

const LABEL = { "1_reel": "1 Reel", "2_reels": "2 Reels" };

export default async function handler(req, res) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: "Unauthorized" });

  const bookingId = req.query.bookingId;
  if (!bookingId) return res.status(400).json({ error: "Missing bookingId" });

  await dbConnect();
  const b = await Booking.findOne({ bookingId }).lean();
  if (!b) return res.status(404).json({ error: "Not found" });

  return res.status(200).json({
    bookingId: b.bookingId,
    status: b.status,
    name: b.name,
    phone: b.phone,
    date: b.date,
    time: b.time,
    location: b.location,
    mapsLink: b.mapsLink || "",
    packageLabel: LABEL[b.package] || b.package,
    amount: b.amount,
    notes: b.notes || "",
    razorpayPaymentId: b?.razorpay?.paymentId || "",
    createdAt: b.createdAt
  });
}
