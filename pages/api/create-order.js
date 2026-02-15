import Razorpay from "razorpay";
import { dbConnect } from "../../lib/db";
import Booking from "../../models/Booking";
import { generateBookingId } from "../../lib/bookingId";

const PKG = {
  "1_reel": { label: "1 Reel", amount: 1899 },
  "2_reels": { label: "2 Reels", amount: 3499 },
};

function onlyDigits(s){ return (s||"").replace(/\D/g,""); }

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, phone, date, time, location, mapsLink, pkg } = req.body || {};
  const cleanPhone = onlyDigits(phone);

  if (!PKG[pkg]) return res.status(400).json({ error: "Invalid package" });
  if (!name || !cleanPhone || cleanPhone.length < 10 || !date || !time || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: "Razorpay keys not configured" });
  }

  await dbConnect();

  const bookingId = generateBookingId();
  const amount = PKG[pkg].amount;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: bookingId,
    notes: { bookingId, pkg }
  });

  await Booking.create({
    bookingId,
    name: String(name).trim(),
    phone: cleanPhone,
    date,
    time,
    location: String(location).trim(),
    mapsLink: mapsLink ? String(mapsLink).trim() : "",
    package: pkg,
    amount,
    status: "NEW",
    razorpay: { orderId: order.id, verified: false }
  });

  return res.status(200).json({
    orderId: order.id,
    amount,
    bookingId,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID
  });
}
