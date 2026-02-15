import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, index: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  mapsLink: { type: String },
  package: { type: String, enum: ["1_reel", "2_reels"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["NEW","CONFIRMED","ASSIGNED","COMPLETED","RESCHEDULED","REFUNDED","CANCELLED"], default: "NEW" },
  razorpay: { orderId: String, paymentId: String, signature: String, verified: { type: Boolean, default: false } },
  notes: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
