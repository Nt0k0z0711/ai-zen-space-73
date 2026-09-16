import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  MapPin,
  Instagram,
  Clock,
  Menu,
  MessageCircle,
} from "lucide-react";

import heroImg from "@/assets/lashes/hero.jpg";
import aboutImg from "@/assets/lashes/about.jpg";
import galleryClassic from "@/assets/lashes/gallery-classic.jpg";
import galleryHybrid from "@/assets/lashes/gallery-hybrid.jpg";
import galleryVolume from "@/assets/lashes/gallery-volume.jpg";
import galleryLift from "@/assets/lashes/gallery-lift.jpg";

export const Route = createFileRoute("/lashes")({
  head: () => ({
    meta: [
      { title: "Flutter 4 Lashes — Eyelash Extensions Studio, Boksburg" },
      {
        name: "description",
        content:
          "Premium eyelash extensions — classic, hybrid & volume lashes in Boksburg. Book your appointment with a certified lash artist today.",
      },
      { property: "og:title", content: "Flutter 4 Lashes — Eyelash Extensions Studio" },
      {
        property: "og:description",
        content:
          "Classic, hybrid & volume lash extensions by a certified lash artist in Boksburg. Book on WhatsApp in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: LashesPage,
});

/* ---------------------------------- data ---------------------------------- */

const WHATSAPP = "27603279810";

const services = [
  {
    id: "Classic Set",
    name: "Classic Set",
    num: "01",
    price: 250,
    duration: "~1 hour",
    description:
      "One extension per natural lash. A natural, mascara-like look — perfect for first-timers.",
  },
  {
    id: "Hybrid Set",
    name: "Hybrid Set",
    num: "02",
    price: 300,
    duration: "~1.5 hours",
    description:
      "A mix of classic and volume fans for a textured, fuller look with a soft wispy finish.",
  },
  {
    id: "Volume Set",
    name: "Volume Set",
    num: "03",
    price: 350,
    duration: "~2 hours",
    description:
      "Handmade fans for maximum fullness and drama. Lightweight, fluffy and glamorous.",
  },
  {
    id: "Lash Fill",
    name: "Lash Fill",
    num: "04",
    price: 120,
    duration: "~45 min",
    description:
      "Touch-up for your existing set, recommended every 2–3 weeks to keep lashes full.",
  },
  {
    id: "Lash Lift",
    name: "Lash Lift",
    num: "05",
    price: 200,
    duration: "~1 hour",
    description:
      "Your natural lashes, lifted and tinted. Low-maintenance curl that lasts 6–8 weeks.",
  },
] as const;

const gallery = [
  { src: galleryClassic, label: "Classic" },
  { src: galleryHybrid, label: "Hybrid" },
  { src: galleryVolume, label: "Volume" },
  { src: galleryLift, label: "Lash Lift" },
];

const reviews = [
  {
    text: "My lashes have never looked this good. So comfortable I forget I'm wearing them!",
    name: "Sarah M.",
  },
  {
    text: "The most relaxing appointment and the results are incredible. I get compliments daily.",
    name: "Jessica K.",
  },
  {
    text: "Finally a lash artist who listens. My hybrid set is exactly what I wanted.",
    name: "Amanda R.",
  },
  {
    text: "Clean studio, gentle hands and lashes that lasted beautifully. I'm never going anywhere else.",
    name: "Thando N.",
  },
];

const faqs = [
  {
    q: "How long do lash extensions last?",
    a: "A full set lasts through your natural lash cycle — with a fill every 2–3 weeks, you can keep them looking fresh indefinitely.",
  },
  {
    q: "Does it hurt?",
    a: "Not at all. You lie comfortably with your eyes closed while each extension is applied to a single natural lash. Most clients nap through it.",
  },
  {
    q: "How do I care for my lashes?",
    a: "Keep them dry for 24 hours after your appointment, avoid oil-based products around the eyes, and brush them daily with a clean spoolie. Full aftercare instructions are included with every set.",
  },
  {
    q: "How do I prepare for my appointment?",
    a: "Arrive with clean, makeup-free eyes (no mascara or eyeliner) and skip coffee right before — it helps you relax during the application.",
  },
];

/* --------------------------------- styles --------------------------------- */

const styles = `
.fl *{margin:0;padding:0;box-sizing:border-box;}
.fl{font-family:'Jost',sans-serif;background:#faf6f1;color:#231f1e;line-height:1.6;font-weight:300;}
.fl img{max-width:100%;display:block;}
.fl a{color:inherit;text-decoration:none;}
.fl .fl-container{width:min(1120px,90%);margin:0 auto;}
.fl section{padding:96px 0;}
.fl h1,.fl h2,.fl h3{font-family:'Cormorant Garamond',serif;font-weight:500;line-height:1.15;}
.fl .fl-eyebrow{text-transform:uppercase;letter-spacing:.35em;font-size:.72rem;color:#a97e68;margin-bottom:14px;display:block;}
.fl .fl-title{font-size:clamp(2rem,4.5vw,3rem);margin-bottom:16px;}
.fl .fl-sub{color:#8c7d74;max-width:560px;margin:0 auto 56px;font-size:1.05rem;}
.fl .fl-center{text-align:center;}
.fl .fl-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#231f1e;color:#faf6f1;padding:14px 34px;border-radius:999px;font-size:.82rem;letter-spacing:.18em;text-transform:uppercase;transition:all .3s;border:none;cursor:pointer;}
.fl .fl-btn:hover{background:#a97e68;transform:translateY(-2px);}
.fl .fl-btn.light{background:transparent;border:1px solid #231f1e;color:#231f1e;}
.fl .fl-btn.light:hover{background:#231f1e;color:#faf6f1;}

/* header */
.fl .fl-header{position:fixed;top:0;left:0;right:0;z-index:50;transition:background .3s,box-shadow .3s;}
.fl .fl-header.scrolled{background:rgba(250,246,241,.92);backdrop-filter:blur(10px);box-shadow:0 1px 0 rgba(35,31,30,.07);}
.fl .fl-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 0;}
.fl .fl-logo{font-family:'Cormorant Garamond',serif;font-size:1.55rem;letter-spacing:.06em;}
.fl .fl-logo span{color:#a97e68;}
.fl .fl-links{display:flex;gap:36px;list-style:none;align-items:center;}
.fl .fl-links a{font-size:.85rem;letter-spacing:.14em;text-transform:uppercase;transition:color .25s;}
.fl .fl-links a:hover{color:#a97e68;}
.fl .fl-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;color:#231f1e;}
.fl .fl-burger span{width:24px;height:2px;background:#231f1e;transition:.3s;display:block;}

/* hero */
.fl .fl-hero{min-height:100vh;display:flex;align-items:center;position:relative;background:linear-gradient(120deg,#faf6f1 55%,#f3e6dd 55%);overflow:hidden;padding-top:90px;}
.fl .fl-hero-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;}
.fl .fl-hero h1{font-size:clamp(2.8rem,6.5vw,4.6rem);margin:18px 0 22px;}
.fl .fl-hero h1 em{font-style:italic;color:#a97e68;}
.fl .fl-hero p{color:#8c7d74;font-size:1.1rem;max-width:460px;margin-bottom:36px;}
.fl .fl-hero-cta{display:flex;gap:16px;flex-wrap:wrap;}
.fl .fl-hero-visual{position:relative;aspect-ratio:4/5;border-radius:18px 18px 200px 200px;box-shadow:0 30px 60px -20px rgba(140,102,84,.4);}
.fl .fl-hero-visual img{width:100%;height:100%;object-fit:cover;border-radius:inherit;}
.fl .fl-badge{position:absolute;bottom:-22px;left:-22px;background:#fff;border-radius:50%;width:130px;height:130px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:#a97e68;box-shadow:0 16px 40px -12px rgba(35,31,30,.25);padding:16px;}

/* marquee */
.fl .fl-marquee{background:#231f1e;color:#faf6f1;overflow:hidden;padding:16px 0;}
.fl .fl-marquee-track{display:flex;gap:56px;white-space:nowrap;animation:fl-scroll 22s linear infinite;width:max-content;}
.fl .fl-marquee-track span{font-size:.82rem;letter-spacing:.3em;text-transform:uppercase;display:flex;align-items:center;gap:56px;}
.fl .fl-marquee-track i{font-style:normal;color:#c9a08c;}
@keyframes fl-scroll{to{transform:translateX(-50%);}}

/* about */
.fl .fl-about-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:center;}
.fl .fl-about-photo{aspect-ratio:3/4;border-radius:18px;overflow:hidden;box-shadow:0 24px 50px -30px rgba(35,31,30,.3);}
.fl .fl-about-photo img{width:100%;height:100%;object-fit:cover;}
.fl .fl-about-text p{color:#8c7d74;margin-bottom:20px;font-size:1.05rem;}
.fl .fl-stats{display:flex;gap:48px;margin-top:36px;}
.fl .fl-stats h3{font-size:2.2rem;color:#231f1e;}
.fl .fl-stats p{font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;margin:0;}

/* services */
.fl #fl-services{background:#fff;}
.fl .fl-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;text-align:left;}
.fl .fl-card{background:#faf6f1;border-radius:18px;padding:44px 32px;transition:transform .35s,box-shadow .35s,border-color .35s;border:2px solid rgba(35,31,30,.06);cursor:pointer;}
.fl .fl-card:hover{transform:translateY(-8px);box-shadow:0 28px 50px -24px rgba(35,31,30,.22);}
.fl .fl-card.selected{border-color:#c9a08c;box-shadow:0 28px 50px -24px rgba(169,126,104,.35);}
.fl .fl-card .num{font-family:'Cormorant Garamond',serif;font-size:.95rem;color:#a97e68;letter-spacing:.2em;}
.fl .fl-card h3{font-size:1.7rem;margin:14px 0 10px;}
.fl .fl-card p{color:#8c7d74;font-size:.95rem;margin-bottom:22px;}
.fl .fl-price{font-family:'Cormorant Garamond',serif;font-size:2rem;color:#231f1e;}
.fl .fl-price small{font-size:.9rem;font-family:'Jost',sans-serif;color:#8c7d74;letter-spacing:.05em;}
.fl .fl-tag{display:inline-block;margin-top:18px;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#a97e68;border:1px solid #c9a08c;border-radius:999px;padding:6px 14px;}
.fl .fl-pick{margin-top:14px;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;color:#a97e68;display:inline-flex;align-items:center;gap:6px;}

/* gallery */
.fl .fl-gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.fl .fl-g-item{aspect-ratio:1;border-radius:14px;overflow:hidden;position:relative;padding:0;border:none;cursor:pointer;background:none;display:block;width:100%;}
.fl .fl-g-item img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease;}
.fl .fl-g-item:hover img{transform:scale(1.07);}
.fl .fl-g-item::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(35,31,30,.5),transparent 55%);pointer-events:none;}
.fl .fl-g-item span{position:absolute;bottom:16px;left:18px;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:#fff;z-index:2;}
.fl .fl-zoom{position:absolute;top:14px;right:14px;z-index:2;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.85);display:grid;place-items:center;color:#231f1e;font-size:.8rem;}

/* lightbox */
.fl .fl-lightbox{position:fixed;inset:0;z-index:90;background:rgba(35,31,30,.9);display:flex;align-items:center;justify-content:center;padding:24px;animation:fl-fade .25s ease;}
@keyframes fl-fade{from{opacity:0;}to{opacity:1;}}
.fl .fl-lightbox img{max-height:82vh;max-width:92vw;border-radius:14px;box-shadow:0 40px 80px -20px rgba(0,0,0,.6);}
.fl .fl-lb-btn{position:absolute;background:rgba(250,246,241,.92);border:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:#231f1e;transition:background .25s;}
.fl .fl-lb-btn:hover{background:#c9a08c;color:#fff;}
.fl .fl-lb-close{top:24px;right:24px;}
.fl .fl-lb-prev{left:24px;top:50%;transform:translateY(-50%);}
.fl .fl-lb-next{right:24px;top:50%;transform:translateY(-50%);}
.fl .fl-lb-caption{position:absolute;bottom:28px;left:0;right:0;text-align:center;color:#faf6f1;font-size:.8rem;letter-spacing:.25em;text-transform:uppercase;}

/* faq */
.fl .fl-faq{max-width:720px;margin:0 auto;text-align:left;}
.fl .fl-faq-item{border:1px solid rgba(35,31,30,.1);border-radius:14px;margin-bottom:14px;background:#fff;overflow:hidden;}
.fl .fl-faq-q{width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;font-family:'Jost',sans-serif;font-size:1rem;cursor:pointer;text-align:left;color:#231f1e;}
.fl .fl-faq-q .chev{transition:transform .3s;color:#a97e68;flex-shrink:0;}
.fl .fl-faq-q.open .chev{transform:rotate(180deg);}
.fl .fl-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;padding:0 24px;color:#8c7d74;font-size:.95rem;}
.fl .fl-faq-a.open{max-height:220px;padding:0 24px 22px;}

/* reviews slider */
.fl #fl-reviews{background:#231f1e;color:#faf6f1;}
.fl #fl-reviews .fl-title{color:#faf6f1;}
.fl #fl-reviews .fl-sub{color:rgba(250,246,241,.6);}
.fl .fl-slider{max-width:640px;margin:0 auto;text-align:center;min-height:220px;position:relative;}
.fl .fl-slide{display:none;animation:fl-fade .5s ease;}
.fl .fl-slide.active{display:block;}
.fl .fl-slide .stars{color:#c9a08c;letter-spacing:4px;margin-bottom:16px;display:flex;justify-content:center;gap:4px;}
.fl .fl-slide p{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-style:italic;margin-bottom:20px;}
.fl .fl-slide footer{font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(250,246,241,.6);}
.fl .fl-dots{display:flex;gap:10px;justify-content:center;margin-top:28px;}
.fl .fl-dot{width:10px;height:10px;border-radius:50%;border:1px solid #c9a08c;background:transparent;cursor:pointer;padding:0;transition:background .3s;}
.fl .fl-dot.active{background:#c9a08c;}

/* booking */
.fl .fl-booking-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.fl .fl-contact-list{list-style:none;margin-top:32px;}
.fl .fl-contact-list li{display:flex;align-items:center;gap:18px;padding:18px 0;border-bottom:1px solid rgba(35,31,30,.08);}
.fl .fl-contact-list .ico{width:46px;height:46px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#a97e68;box-shadow:0 6px 18px -6px rgba(35,31,30,.15);}
.fl .fl-contact-list small{display:block;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:#8c7d74;}
.fl .fl-contact-list strong{font-weight:400;font-size:1.05rem;}
.fl .fl-form{display:grid;gap:16px;background:#fff;padding:40px;border-radius:18px;box-shadow:0 24px 50px -30px rgba(35,31,30,.25);}
.fl .fl-form input,.fl .fl-form select,.fl .fl-form textarea{font-family:'Jost',sans-serif;font-size:.95rem;padding:14px 18px;border-radius:10px;border:1px solid rgba(35,31,30,.14);background:#faf6f1;width:100%;outline:none;transition:border .25s;color:#231f1e;}
.fl .fl-form input:focus,.fl .fl-form select:focus,.fl .fl-form textarea:focus{border-color:#a97e68;}
.fl .fl-form textarea{resize:vertical;min-height:90px;}
.fl .fl-summary{border:1px dashed #c9a08c;border-radius:14px;padding:18px 20px;background:#faf6f1;}
.fl .fl-summary h4{font-family:'Cormorant Garamond',serif;font-size:1.2rem;margin-bottom:6px;}
.fl .fl-summary p{font-size:.9rem;color:#8c7d74;}
.fl .fl-summary .total{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:#231f1e;}

/* footer */
.fl .fl-footer{background:#231f1e;color:rgba(250,246,241,.65);padding:44px 0;text-align:center;font-size:.85rem;}
.fl .fl-footer .fl-logo{color:#faf6f1;margin-bottom:10px;}
.fl .fl-footer .fl-logo span{color:#c9a08c;}
.fl .fl-socials{display:flex;gap:24px;justify-content:center;margin:14px 0 20px;}
.fl .fl-socials a{letter-spacing:.18em;text-transform:uppercase;font-size:.72rem;transition:color .25s;}
.fl .fl-socials a:hover{color:#c9a08c;}

/* floating whatsapp */
.fl .fl-wa-float{position:fixed;bottom:26px;right:26px;z-index:60;width:60px;height:60px;border-radius:50%;background:#25d366;color:#fff;display:grid;place-items:center;box-shadow:0 14px 30px -8px rgba(37,211,102,.55);transition:transform .3s;border:none;cursor:pointer;}
.fl .fl-wa-float:hover{transform:scale(1.1);}
.fl .fl-wa-pulse::before{content:"";position:absolute;inset:0;border-radius:50%;background:#25d366;opacity:.5;animation:fl-ping 2s cubic-bezier(0,0,.2,1) infinite;}
@keyframes fl-ping{75%,100%{transform:scale(1.6);opacity:0;}}

/* reveal */
.fl .fl-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;}
.fl .fl-reveal.visible{opacity:1;transform:none;}

@media(max-width:900px){
  .fl .fl-hero-inner,.fl .fl-about-grid,.fl .fl-booking-grid{grid-template-columns:1fr;}
  .fl .fl-hero-visual{max-width:420px;margin:0 auto;}
  .fl .fl-cards{grid-template-columns:1fr;}
  .fl .fl-gallery-grid{grid-template-columns:repeat(2,1fr);}
  .fl .fl-links{position:fixed;inset:0;background:#faf6f1;flex-direction:column;justify-content:center;gap:32px;transform:translateX(100%);transition:transform .35s;}
  .fl .fl-links.open{transform:none;}
  .fl .fl-links a{font-size:1.1rem;}
  .fl .fl-burger{display:flex;z-index:60;}
  .fl .fl-stats{gap:32px;flex-wrap:wrap;}
  .fl section{padding:72px 0;}
  .fl .fl-form{padding:28px;}
}
`;

/* -------------------------------- component ------------------------------- */

function LashesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [selected, setSelected] = useState<string>(services[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  // sticky header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    pageRef.current?.querySelectorAll(".fl-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // reviews auto-advance
  useEffect(() => {
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);

  // lightbox keyboard controls
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const chosen = services.find((s) => s.id === selected) ?? services[0];
  const today = new Date().toISOString().slice(0, 10);

  function bookService(id: string) {
    setSelected(id);
    document.getElementById("fl-book")?.scrollIntoView({ behavior: "smooth" });
  }

  function onBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi Ntokozo! I'd like to book ${chosen.name} (${chosen.duration})${
      date ? ` on ${date}` : ""
    }. My name is ${name}${phone ? `, and you can reach me on ${phone}` : ""}.${
      notes ? ` Note: ${notes}` : ""
    }`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Opening WhatsApp with your booking details…");
  }

  return (
    <div className="fl" ref={pageRef}>
      <style>{styles}</style>

      {/* header */}
      <header className={`fl-header ${scrolled ? "scrolled" : ""}`}>
        <div className="fl-container">
          <nav className="fl-nav">
            <a href="#fl-top" className="fl-logo">
              Flutter 4 <span>Lashes</span>
            </a>
            <ul className={`fl-links ${menuOpen ? "open" : ""}`}>
              <li><a href="#fl-about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#fl-services" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#fl-gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
              <li><a href="#fl-reviews" onClick={() => setMenuOpen(false)}>Reviews</a></li>
              <li><a href="#fl-book" className="fl-btn" onClick={() => setMenuOpen(false)}>Book Now</a></li>
            </ul>
            <button
              className="fl-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="fl-hero" id="fl-top">
        <div className="fl-container fl-hero-inner">
          <div className="fl-reveal visible">
            <span className="fl-eyebrow">Eyelash Extensions Studio</span>
            <h1>
              Wake up with <em>perfect</em> lashes, every day.
            </h1>
            <p>
              Custom lash sets designed for your eyes — classic, hybrid and volume
              extensions by a certified lash artist.
            </p>
            <div className="fl-hero-cta">
              <a href="#fl-book" className="fl-btn">Book Appointment</a>
              <a href="#fl-services" className="fl-btn light">View Services</a>
            </div>
          </div>
          <div className="fl-hero-visual fl-reveal visible" style={{ position: "relative" }}>
            <img src={heroImg} alt="Volume eyelash extensions close-up" width={1024} height={1280} />
            <div className="fl-badge">Certified<br />Lash Artist</div>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="fl-marquee">
        <div className="fl-marquee-track">
          {[0, 1].map((n) => (
            <span key={n}>
              Classic <i>✦</i> Hybrid <i>✦</i> Volume <i>✦</i> Lash Lift <i>✦</i> Fills <i>✦</i>{" "}
              Classic <i>✦</i> Hybrid <i>✦</i> Volume <i>✦</i> Lash Lift <i>✦</i> Fills <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* about */}
      <section id="fl-about">
        <div className="fl-container fl-about-grid">
          <div className="fl-about-photo fl-reveal">
            <img src={aboutImg} alt="Ntokozo applying eyelash extensions in the studio" loading="lazy" width={960} height={1280} />
          </div>
          <div className="fl-about-text fl-reveal">
            <span className="fl-eyebrow">Meet Your Lash Artist</span>
            <h2 className="fl-title">Hi, I'm Ntokozo</h2>
            <p>
              I'm a certified lash artist with a passion for enhancing natural beauty.
              My goal is simple: lashes that look stunning, feel comfortable, and last.
            </p>
            <p>
              Every set is fully customized — I study your eye shape, natural lashes and
              lifestyle to create a look that's uniquely yours.
            </p>
            <div className="fl-stats">
              <div><h3>500+</h3><p>Happy Clients</p></div>
              <div><h3>3+</h3><p>Years Experience</p></div>
              <div><h3>5★</h3><p>Average Rating</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section id="fl-services">
        <div className="fl-container fl-center">
          <span className="fl-eyebrow">Services &amp; Pricing</span>
          <h2 className="fl-title">Choose your look</h2>
          <p className="fl-sub">
            Tap a card to start your booking — all sets include a consultation, lash bath
            and aftercare instructions.
          </p>
          <div className="fl-cards">
            {services.map((s) => (
              <div
                key={s.id}
                className={`fl-card fl-reveal ${selected === s.id ? "selected" : ""}`}
                onClick={() => bookService(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && bookService(s.id)}
              >
                <span className="num">{s.num}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="fl-price">
                  R{s.price} <small>/ {s.id === "Lash Fill" ? "fill" : s.id === "Lash Lift" ? "treatment" : "full set"}</small>
                </div>
                <span className="fl-tag">{s.duration}</span>
                <div className="fl-pick">Book this →</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, color: "#8c7d74" }}>
            Lash fills recommended every 2–3 weeks · Fill prices from R120
          </p>
        </div>
      </section>

      {/* gallery */}
      <section id="fl-gallery">
        <div className="fl-container fl-center">
          <span className="fl-eyebrow">Portfolio</span>
          <h2 className="fl-title">My work</h2>
          <p className="fl-sub">Tap any photo to view it up close.</p>
          <div className="fl-gallery-grid">
            {gallery.map((g, i) => (
              <button key={g.label} className="fl-g-item fl-reveal" onClick={() => setLightbox(i)} aria-label={`View ${g.label} lashes larger`}>
                <img src={g.src} alt={`${g.label} eyelash extensions by Flutter 4 Lashes`} loading="lazy" width={1024} height={1024} />
                <span className="fl-zoom">＋</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="fl-faq">
        <div className="fl-container fl-center">
          <span className="fl-eyebrow">Good to know</span>
          <h2 className="fl-title">Frequently asked</h2>
          <p className="fl-sub">Everything first-timers want to ask — answered.</p>
          <div className="fl-faq">
            {faqs.map((f, i) => (
              <div key={f.q} className="fl-faq-item fl-reveal">
                <button
                  className={`fl-faq-q ${faqOpen === i ? "open" : ""}`}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                >
                  {f.q}
                  <ChevronRight className="chev" size={18} style={{ transform: "rotate(90deg)" }} />
                </button>
                <div className={`fl-faq-a ${faqOpen === i ? "open" : ""}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* reviews */}
      <section id="fl-reviews">
        <div className="fl-container fl-center">
          <span className="fl-eyebrow">Reviews</span>
          <h2 className="fl-title">What clients say</h2>
          <p className="fl-sub">Real words from real lash lovers.</p>
          <div className="fl-slider">
            {reviews.map((r, i) => (
              <div key={r.name} className={`fl-slide ${reviewIdx === i ? "active" : ""}`}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p>"{r.text}"</p>
                <footer>— {r.name}</footer>
              </div>
            ))}
            <div className="fl-dots">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  className={`fl-dot ${reviewIdx === i ? "active" : ""}`}
                  onClick={() => setReviewIdx(i)}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* booking */}
      <section id="fl-book">
        <div className="fl-container fl-booking-grid">
          <div className="fl-reveal">
            <span className="fl-eyebrow">Book Now</span>
            <h2 className="fl-title">Ready for gorgeous lashes?</h2>
            <p style={{ color: "#8c7d74", fontSize: "1.05rem" }}>
              Pick a service, choose a date and hit request — WhatsApp opens with your
              details ready to send. I'll confirm within 24 hours.
            </p>
            <ul className="fl-contact-list">
              <li><div className="ico"><Phone size={20} /></div><div><small>WhatsApp / Phone</small><strong>060 327 9810</strong></div></li>
              <li><div className="ico"><MapPin size={20} /></div><div><small>Studio Location</small><strong>Boksburg, Gauteng</strong></div></li>
              <li><div className="ico"><Instagram size={20} /></div><div><small>Instagram</small><strong>@ntokozoon_</strong></div></li>
              <li><div className="ico"><Clock size={20} /></div><div><small>Opening Hours</small><strong>Mon–Sat, 9:00 – 18:00</strong></div></li>
            </ul>
          </div>
          <form className="fl-form fl-reveal" onSubmit={onBookingSubmit}>
            <input type="text" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
            <input type="tel" placeholder="Phone / WhatsApp" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            <select value={selected} onChange={(e) => setSelected(e.target.value)} aria-label="Choose a service">
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R{s.price}
                </option>
              ))}
            </select>
            <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} aria-label="Preferred date" />
            <textarea placeholder="Any questions or requests?" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <div className="fl-summary">
              <h4>Your booking</h4>
              <p>
                {chosen.name} · {chosen.duration}
                {date ? ` · ${date}` : ""}
              </p>
              <p className="total">R{chosen.price}</p>
            </div>
            <button type="submit" className="fl-btn" style={{ width: "100%" }}>
              Request Booking
            </button>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="fl-footer">
        <div className="fl-container">
          <div className="fl-logo">Flutter 4 <span>Lashes</span></div>
          <div className="fl-socials">
            <a href="https://instagram.com/ntokozoon_" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/27603279810" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <p>© 2026 Flutter 4 Lashes. All rights reserved.</p>
        </div>
      </footer>

      {/* floating whatsapp */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Ntokozo! I'd like to ask about lash appointments.")}`}
        target="_blank"
        rel="noreferrer"
        className="fl-wa-float fl-wa-pulse"
        aria-label="Chat on WhatsApp"
        style={{ position: "fixed" }}
      >
        <MessageCircle size={26} />
      </a>

      {/* lightbox */}
      {lightbox !== null && (
        <div className="fl-lightbox" onClick={() => setLightbox(null)}>
          <button className="fl-lb-btn fl-lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            <X size={22} />
          </button>
          <button
            className="fl-lb-btn fl-lb-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <img
            src={gallery[lightbox].src}
            alt={`${gallery[lightbox].label} eyelash extensions — enlarged`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="fl-lb-btn fl-lb-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % gallery.length);
            }}
          >
            <ChevronRight size={22} />
          </button>
          <div className="fl-lb-caption">{gallery[lightbox].label}</div>
        </div>
      )}
    </div>
  );
}
