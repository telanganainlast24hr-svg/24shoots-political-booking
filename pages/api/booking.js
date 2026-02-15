import { dbConnect } from "../../lib/db";
import Booking from "../../models/Booking";

const LABEL = { "1_reel": "1 Reel", "2_reels": "2 Reels" };

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const bookingId = req.query.bookingId;
  if (!bookingId) return res.status(400).json({ error: "Missing bookingId" });

  await dbConnect();
  const b = await Booking.findOne({ bookingId }).lean();
  if (!b) return res.status(404).json({ error: "Not found" });
  if (!b?.razorpay?.verified) return res.status(403).json({ error: "Not verified" });

  return res.status(200).json({
    bookingId: b.bookingId,
    name: b.name,
    phone: b.phone,
    date: b.date,
    time: b.time,
    location: b.location,
    mapsLink: b.mapsLink || "",
    packageLabel: LABEL[b.package] || b.package,
    amount: b.amount,
    status: b.status,
    razorpayPaymentId: b?.razorpay?.paymentId || "",
    createdAt: b.createdAt
  });
}
