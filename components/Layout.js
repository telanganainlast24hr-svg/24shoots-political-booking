import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="nav">
        <div className="brand">
          <span style={{fontSize:18}}>24shoots</span>
          <span className="badge">Political Leaders • GHMC</span>
        </div>
        <nav className="navlinks">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/book">Book Now</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/admin" className="pill">Admin</Link>
        </nav>
      </header>
      {children}
      <footer className="footer">
        <div>© {new Date().getFullYear()} 24shoots • GHMC Hyderabad only • Pay & confirm instantly</div>
      </footer>
      <div className="stickybar">
        <Link className="btn primary full" href="/book">Pay & Confirm Booking</Link>
      </div>
    </div>
  );
}
