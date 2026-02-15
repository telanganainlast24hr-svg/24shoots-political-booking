# 24shoots Political Booking (GHMC) – Pay & Confirm Instantly

## Setup
1) Install
```bash
npm install
```

2) Create `.env.local` from `.env.example` and set:
- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_USER`, `ADMIN_PASS`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_ADMIN_WHATSAPP` (7989175554)

3) Run
```bash
npm run dev
```

Open http://localhost:3000

## Admin
- /admin/login then /admin
- Export CSV from admin.

## Notes
- GHMC enforcement is via a required checkbox (no geocoding).
- WhatsApp notification is a deep-link + copy on the success page.
