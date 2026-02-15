export default function handler(req, res) {
  res.status(200).json({ ok: true, message: "Use /api/create-order and /api/verify-payment" });
}
