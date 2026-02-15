import crypto from "crypto";
import { dbConnect } from "../../lib/db";
import Booking from "../../models/Booking";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment fields" });
  }
  if (!process.env.RAZORPAY_KEY_SECRET) return res.status(500).json({ error: "Razorpay secret missing" });

  await dbConnect();
  const booking = await Booking.findOne({ bookingId }).lean();
  if (!booking) return res.status(404).json({ error: "Booking not found" });

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
  if (expected !== razorpay_signature) return res.status(400).json({ error: "Invalid signature" });

  if (booking?.razorpay?.orderId && booking.razorpay.orderId !== razorpay_order_id) {
    return res.status(400).json({ error: "Order mismatch" });
  }

  await Booking.updateOne({ bookingId }, {
    $set: {
      status: "CONFIRMED",
      razorpay: { orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature, verified: true }
    }
  });

  return res.status(200).json({ bookingId });
}
