import { dbConnect } from "../../../lib/db";
import Booking from "../../../models/Booking";
import { requireAdmin } from "../../../lib/auth";

function csvEscape(v){
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
  return s;
}

export default async function handler(req, res) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).send("Unauthorized");

  await dbConnect();
  const items = await Booking.find({}).sort({ createdAt: -1 }).lean();

  const header = ["bookingId","status","name","phone","date","time","location","mapsLink","package","amount","orderId","paymentId","verified","createdAt"].join(",");
  const rows = items.map(it => [
    it.bookingId, it.status, it.name, it.phone, it.date, it.time,
    it.location, it.mapsLink || "", it.package, it.amount,
    it?.razorpay?.orderId || "", it?.razorpay?.paymentId || "", it?.razorpay?.verified ? "true":"false",
    it.createdAt ? new Date(it.createdAt).toISOString() : ""
  ].map(csvEscape).join(","));

  const csv = [header, ...rows].join("\n");
  res.setHeader("Content-Type","text/csv; charset=utf-8");
  res.setHeader("Content-Disposition","attachment; filename=bookings.csv");
  return res.status(200).send(csv);
}
