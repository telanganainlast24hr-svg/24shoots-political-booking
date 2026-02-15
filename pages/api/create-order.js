import Razorpay from "razorpay";

function getAmount(packageType) {
  if (packageType === "2_reels") return 3499;
  return 1899;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { packageType } = req.body || {};
  if (!packageType || !["1_reel", "2_reels"].includes(packageType)) {
    return res.status(400).json({ error: "Invalid packageType" });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: "Razorpay keys missing" });
  }

  const amount = getAmount(packageType);
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    notes: { packageType, product: "24shoots-political" },
  });

  res.status(200).json({ orderId: order.id, amount });
}
