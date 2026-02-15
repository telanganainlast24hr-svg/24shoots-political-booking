import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, index: true, unique: true },
    name: String,
    phone: String,
    date: String,
    time: String,
    location: String,
    mapsLink: String,
    packageType: { type: String, enum: ["1_reel", "2_reels"] },
    amount: Number,
    status: {
      type: String,
      enum: ["CONFIRMED", "IN_PROGRESS", "DELIVERED", "CANCELLED", "REFUNDED"],
      default: "CONFIRMED",
    },
    payment: {
      provider: { type: String, default: "razorpay" },
      orderId: String,
      paymentId: String,
      signature: String,
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
