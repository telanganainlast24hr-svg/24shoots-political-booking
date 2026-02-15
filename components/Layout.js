import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <Link className="brand" href="/">
            <span className="logoMark" aria-hidden="true" />
            <span>
              24shoots
              <small>Instant reels • Political leaders</small>
            </span>
          </Link>

          <nav className="navLinks">
            <Link href="/">Home</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/book">Book Now</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/terms">Terms</Link>
          </nav>

          <div className="ctaRow">
            <a
              className="btn btnGhost"
              href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554"}?text=${encodeURIComponent(
                "Hi, I want to book a 24shoots political reel in GHMC Hyderabad."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link className="btn btnPrimary" href="/book">
              Book in 60s
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <b style={{ color: "rgba(255,255,255,0.88)" }}>24shoots</b> — on-ground iPhone reel team for political leaders (GHMC).
            <br />
            <small>Pay & book instantly. Slot confirmed after payment verification.</small>
          </div>
          <small>© {new Date().getFullYear()} 24shoots</small>
        </div>
      </footer>
    </>
  );
}
