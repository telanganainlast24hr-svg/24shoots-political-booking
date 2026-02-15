export default function Contact() {
  const phone = (process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "7989175554").replace(/\D/g,"");
  const msg = encodeURIComponent("Hi, I want to book 24shoots political reel. Please share availability.");
  const link = `https://wa.me/91${phone}?text=${msg}`;
  return (
    <main>
      <div className="h1">Contact</div>
      <div className="card">
        <p className="p"><b>WhatsApp / Call:</b> {phone}</p>
        <a className="btn primary" href={link} target="_blank" rel="noreferrer">Tap to WhatsApp</a>
        <div className="hr"></div>
        <p className="p">For bookings, use <b>Book Now</b> to pay and confirm instantly.</p>
      </div>
    </main>
  );
}
