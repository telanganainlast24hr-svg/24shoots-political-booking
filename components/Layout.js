import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="nav2">
        <div className="brand2">
          <div className="logoMark" aria-hidden="true" />
          <div className="brandText">
            <span className="brandName">24shoots</span>
            <span className="brandSub">by @telanganainlast24hr</span>
          </div>
          <span className="badge2">Political • GHMC</span>
        </div>

        <nav className="navlinks2">
          <Link href="/" className="navlink">Home</Link>
          <Link href="/pricing" className="navlink">Pricing</Link>
          <Link href="/faq" className="navlink">FAQ</Link>
          <Link href="/contact" className="navlink">Contact</Link>
          <Link href="/terms" className="navlink">Terms</Link>
          <Link href="/admin" className="pill">Admin</Link>
          <Link className="btn primary" href="/book">Book Now</Link>
        </nav>
      </header>

      <div className="topbar2">
        <div className="tbItem"><b>Instant booking</b> after payment verification</div>
        <div className="tbDot">•</div>
        <div className="tbItem"><b>Same‑day slots</b> in GHMC</div>
        <div className="tbDot">•</div>
        <div className="tbItem"><b>Delivery under 30 mins</b> after shoot</div>
        <div className="tbDot">•</div>
        <div className="tbItem"><b>Full refund</b> + free reschedule (2 days)</div>
      </div>

      {children}

      <footer className="footer">
        <div>© {new Date().getFullYear()} 24shoots • GHMC Hyderabad only • Bookings confirmed only after payment verification.</div>
      </footer>

      <div className="stickybar">
        <Link className="btn primary full" href="/book">Pay & Book Now</Link>
      </div>
    </div>
  );
}
