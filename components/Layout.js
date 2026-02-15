import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="nav">
        <div className="brand">
          <div className="logoMark" aria-hidden="true" />
          <div style={{display:"flex", flexDirection:"column", lineHeight:1.1}}>
            <span style={{fontSize:16}}>24shoots</span>
            <span className="small">by @telanganainlast24hr</span>
          </div>
          <span className="badge">Political Leaders • GHMC</span>
        </div>

        <nav className="navlinks">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/admin" className="pill">Admin</Link>
          <Link className="btn primary" href="/book">Book Now</Link>
        </nav>
      </header>

      <div className="topbar">
        <span><b>Pay & book instantly</b> (Razorpay/UPI)</span>
        <span>•</span>
        <span><b>Same‑day slots</b> in GHMC</span>
        <span>•</span>
        <span><b>Delivery under 30 mins</b> after shoot</span>
        <span>•</span>
        <span><b>Full refund</b> + free reschedule (2 days)</span>
      </div>

      {children}

      <footer className="footer">
        <div>© {new Date().getFullYear()} 24shoots • GHMC Hyderabad only • Bookings confirmed only after payment.</div>
      </footer>

      <div className="stickybar">
        <Link className="btn primary full" href="/book">Pay & Confirm Booking</Link>
      </div>
    </div>
  );
}
