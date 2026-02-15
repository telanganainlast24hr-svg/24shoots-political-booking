import crypto from "crypto";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { makeBookingId } from "@/lib/bookingId";

function priceFor(packageType) {
  return packageType === "2_reels" ? 3499 : 1899;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking,
  } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !booking) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({ error: "Payment verification failed" });
  }

  const packageType = booking.packageType;
  if (!["1_reel", "2_reels"].includes(packageType)) {
    return res.status(400).json({ error: "Invalid packageType" });
  }

  // Basic validation
  const required = ["name", "phone", "date", "time", "location"];
  for (const k of required) {
    if (!booking?.[k] || String(booking[k]).trim().length < 2) {
      return res.status(400).json({ error: `Invalid ${k}` });
    }
  }

  // GHMC confirmation must be true
  if (!booking.ghmcConfirmed) {
    return res.status(400).json({ error: "GHMC confirmation required" });
  }

  await dbConnect();

  const bookingId = makeBookingId();
  const doc = await Booking.create({
    bookingId,
    name: booking.name,
    phone: booking.phone,
    date: booking.date,
    time: booking.time,
    location: booking.location,
    mapsLink: booking.mapsLink || "",
    packageType,
    amount: priceFor(packageType),
    status: "CONFIRMED",
    payment: {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    },
  });

  res.status(200).json({ ok: true, bookingId: doc.bookingId });
}
