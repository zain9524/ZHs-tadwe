import { Link } from "react-router-dom";
import "./Home.css";

const WA_GENERAL =
  "https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20supplies.";

const SUPPLY_AREAS = [
  {
    icon: <NutriIcon />,
    title: "Nutraceutical Materials",
    desc: "Raw materials and compounds for nutraceutical manufacturers and processors.",
  },
  {
    icon: <SealIcon />,
    title: "Seals",
    desc: "Industrial and packaging seals in a range of materials and specifications.",
  },
  {
    icon: <PackIcon />,
    title: "Packing Materials",
    desc: "Flexible and protective packaging solutions for business use.",
  },
  {
    icon: <VitaIcon />,
    title: "Vitamins",
    desc: "Vitamin compounds and micronutrient blends for supplement and industrial use.",
  },
];

export default function Home() {
  return (
    <main className="page-enter">
      {/* ── Hero ──────────────────────────────── */}
      <section className="hero" aria-label="Introduction">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">General Order Supplier · Rawat, Islamabad</p>
            <h1 className="hero__heading">
              Reliable Supply Solutions<br />for Your Business
            </h1>
            <p className="hero__body">
              ZHS Traders connects businesses across Pakistan with quality materials —
              from nutraceutical raw inputs to industrial seals, packing materials,
              vitamins, and more. One supplier, multiple requirements.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore Products
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
            <div className="hero__contact-strip">
              <a href="tel:+923215583861" className="hero__contact-item">
                <PhoneIcon />
                <span>+92 321 5583861</span>
              </a>
              <span className="hero__contact-sep" aria-hidden="true" />
              <a href="mailto:zhstraders19@gmail.com" className="hero__contact-item">
                <MailIcon />
                <span>zhstraders19@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-inner">
              <div className="hero__badge">
                <span className="hero__badge-label">B2B Supplier</span>
                <span className="hero__badge-sub">Pakistan</span>
              </div>
              <div className="hero__supply-list">
                {["Nutraceuticals", "Seals", "Packing", "Vitamins", "General Supplies"].map((item) => (
                  <div key={item} className="hero__supply-item">
                    <CheckIcon />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="hero__card-contact">
                <p className="hero__card-name">Sagheer Malik</p>
                <p className="hero__card-role">Director, ZHS Traders</p>
                <a href="tel:+923215583861" className="hero__card-phone">
                  +92 321 5583861
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Supply ────────────────────── */}
      <section className="section section--alt" aria-labelledby="supply-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Supply</span>
            <h2 className="section-title" id="supply-heading">
              Supply Areas
            </h2>
            <p className="section-subtitle">
              ZHS Traders sources and supplies materials across several categories.
              Each supply area is handled directly — no middlemen, no unnecessary delays.
            </p>
          </div>
          <div className="supply-grid">
            {SUPPLY_AREAS.map((item) => (
              <div key={item.title} className="supply-card">
                <div className="supply-card__icon">{item.icon}</div>
                <h3 className="supply-card__title">{item.title}</h3>
                <p className="supply-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="supply-footer">
            <p>Looking for something not listed? Contact us — we handle a broad range of business requirements.</p>
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── About strip ───────────────────────── */}
      <section className="section about-strip" aria-labelledby="about-strip-heading">
        <div className="container about-strip__inner">
          <div className="about-strip__text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title" id="about-strip-heading">
              A B2B Supplier You Can Depend On
            </h2>
            <p className="section-subtitle">
              Based in Rawat, Islamabad, ZHS Traders operates as a general order supplier
              serving business needs across Pakistan. We maintain direct sourcing
              relationships to ensure quality materials are available when you need them.
            </p>
            <div className="about-strip__actions">
              <Link to="/about" className="btn btn-primary">
                About ZHS Traders
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="about-strip__info">
            <div className="info-block">
              <dt>Director</dt>
              <dd>Sagheer Malik</dd>
            </div>
            <div className="info-block">
              <dt>Category</dt>
              <dd>General Order Supplier</dd>
            </div>
            <div className="info-block">
              <dt>Location</dt>
              <dd>Rawat, Islamabad, Pakistan</dd>
            </div>
            <div className="info-block">
              <dt>Contact</dt>
              <dd>
                <a href="tel:+923215583861">+92 321 5583861</a>
              </dd>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="section section--blue cta-banner" aria-labelledby="cta-heading">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="section-title section-title--white" id="cta-heading">
              Ready to Discuss Your Requirements?
            </h2>
            <p className="section-subtitle section-subtitle--white">
              Send us a WhatsApp message or call us directly. We respond promptly to
              all business enquiries.
            </p>
          </div>
          <div className="cta-banner__actions">
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <WhatsAppIcon /> WhatsApp Us
            </a>
            <a href="tel:+923215583861" className="btn btn-outline--white btn btn-lg">
              <PhoneIcon /> Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Icons ─────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0013 14.81l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function NutriIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/>
    </svg>
  );
}
function SealIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
    </svg>
  );
}
function PackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  );
}
function VitaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
