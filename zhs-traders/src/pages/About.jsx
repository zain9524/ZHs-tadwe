import { Link } from "react-router-dom";
import "./About.css";

const WA_URL =
  "https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

const VALUES = [
  {
    title: "Direct Sourcing",
    desc: "We work directly with suppliers to ensure materials are available and can be delivered on time to your business.",
  },
  {
    title: "Range of Materials",
    desc: "From nutraceutical inputs to packaging and seals, we cover multiple supply categories under one contact.",
  },
  {
    title: "Business-Focused",
    desc: "We serve B2B clients. Our communication, pricing, and supply approach is designed for business-to-business transactions.",
  },
  {
    title: "Clear Communication",
    desc: "We keep things simple. Enquire via WhatsApp or phone, discuss your requirements, and we handle the rest.",
  },
];

const SUPPLY_CATS = [
  "Nutraceutical Materials",
  "Seals",
  "Packing Materials",
  "Vitamins",
  "General Business Supplies",
];

export default function About() {
  return (
    <main className="page-enter">
      {/* Page header */}
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">Who We Are</span>
          <h1 className="page-header__title">About ZHS Traders</h1>
          <p className="page-header__sub">
            A general order supplier serving businesses across Pakistan.
          </p>
        </div>
      </section>

      {/* Company overview */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container about-overview">
          <div className="about-overview__text">
            <span className="section-label">Our Business</span>
            <h2 className="section-title" id="overview-heading">
              General Order Supplier
            </h2>
            <p>
              ZHS Traders is a B2B general order supplier based in Rawat, Islamabad.
              We work with businesses to source and supply a range of materials —
              including nutraceutical raw inputs, industrial seals, packing materials,
              vitamins, and other business requirements.
            </p>
            <p>
              We operate as a trading and sourcing company. We do not manufacture
              these products ourselves; instead, we maintain supply relationships
              that allow us to fulfil varied business requirements efficiently.
            </p>
            <p>
              Whether you need a regular supply arrangement or a one-time order,
              we are ready to discuss your requirements and provide a practical solution.
            </p>
            <div className="about-overview__actions">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="about-overview__sidebar">
            {/* Director card */}
            <div className="director-card">
              <div className="director-card__logo">
                <img
                  src="/images/logo.png"
                  alt="ZHS Traders"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span style={{ display: "none" }} className="director-card__logo-fb">
                  ZHS Traders
                </span>
              </div>
              <div className="director-card__divider" />
              <div className="director-card__person">
                <p className="director-card__name">Sagheer Malik</p>
                <p className="director-card__role">Director, ZHS Traders</p>
              </div>
              <ul className="director-card__contact">
                <li>
                  <a href="tel:+923215583861">
                    <PhoneIcon /> +92 321 5583861
                  </a>
                </li>
                <li>
                  <a href="mailto:zhstraders19@gmail.com">
                    <MailIcon /> zhstraders19@gmail.com
                  </a>
                </li>
                <li>
                  <span>
                    <LocationIcon /> Rawat, Islamabad, Pakistan
                  </span>
                </li>
              </ul>
            </div>

            {/* Supply areas */}
            <div className="about-supply-box">
              <p className="about-supply-box__title">Supply Areas</p>
              <ul className="about-supply-box__list">
                {SUPPLY_CATS.map((cat) => (
                  <li key={cat}>
                    <CheckIcon /> {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values / approach */}
      <section className="section section--alt" aria-labelledby="approach-heading">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Our Approach</span>
            <h2 className="section-title" id="approach-heading">
              How We Work
            </h2>
            <p className="section-subtitle">
              We keep the process straightforward for our business clients.
            </p>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="value-item">
                <h3 className="value-item__title">{v.title}</h3>
                <p className="value-item__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address section */}
      <section className="section" aria-labelledby="address-heading">
        <div className="container about-address">
          <div>
            <span className="section-label">Find Us</span>
            <h2 className="section-title" id="address-heading">
              Our Location
            </h2>
            <address className="about-address__block">
              <strong>ZHS Traders</strong><br />
              Flat # 2, 2nd Floor, Rabi Royal Mall,<br />
              Near Wateem Dental Hospital,<br />
              T-Chowk, Rawat,<br />
              Islamabad, Pakistan
            </address>
            <div className="about-address__actions">
              <a
                href="https://maps.google.com/?q=T-Chowk+Rawat+Islamabad+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
          <div className="about-address__map-placeholder" aria-label="Map location placeholder">
            <LocationIcon />
            <p>Rabi Royal Mall, T-Chowk,<br />Rawat, Islamabad</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
function PhoneIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0013 14.81l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>;
}
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function LocationIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
