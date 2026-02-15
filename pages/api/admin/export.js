import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/auth";

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  await dbConnect();
  const items = await Booking.find({}).sort({ createdAt: -1 }).lean();

  const header = [
    "bookingId","name","phone","date","time","location","mapsLink","packageType","amount","status","orderId","paymentId","createdAt"
  ];

  const rows = items.map((x) => ([
    x.bookingId, x.name, x.phone, x.date, x.time, x.location, x.mapsLink,
    x.packageType, x.amount, x.status, x.payment?.orderId, x.payment?.paymentId, x.createdAt
  ].map(csvEscape).join(",")));

  const csv = [header.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="bookings.csv"`);
  res.status(200).send(csv);
}
