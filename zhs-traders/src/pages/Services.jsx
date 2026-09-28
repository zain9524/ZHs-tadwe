import { Link } from "react-router-dom";
import "./Services.css";

const WA_URL =
  "https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20discuss%20a%20supply%20requirement.";

const SERVICES = [
  {
    title: "Nutraceutical Materials",
    description:
      "We supply raw materials used in the nutraceutical industry. This includes base compounds, active ingredients, and other inputs required by manufacturers and processors of nutritional products.",
    details: [
      "Raw compound supply",
      "Active ingredient sourcing",
      "Available in various grades",
      "Suitable for industrial use",
    ],
  },
  {
    title: "Seals",
    description:
      "We source and supply industrial and packaging seals for a variety of business applications. Available in different materials, sizes, and specifications as needed.",
    details: [
      "Industrial seals",
      "Packaging seals",
      "Multiple material types",
      "Various size specifications",
    ],
  },
  {
    title: "Packing Materials",
    description:
      "ZHS Traders supplies packing and packaging materials for businesses. Whether you need flexible pouches, rigid packaging, or protective wrapping, we can source appropriate materials.",
    details: [
      "Flexible packaging",
      "Protective wrapping",
      "Industrial packing",
      "Custom sizes available on enquiry",
    ],
  },
  {
    title: "Vitamins",
    description:
      "We supply vitamin compounds and micronutrient blends for use in supplement manufacturing, formulation, and related industrial applications.",
    details: [
      "Vitamin compounds",
      "Micronutrient blends",
      "Suitable for formulation",
      "Industrial-grade supply",
    ],
  },
  {
    title: "General Business Supplies",
    description:
      "Beyond the above categories, ZHS Traders handles a range of general order requirements. If your business needs a specific material or supply, contact us to discuss whether we can source it.",
    details: [
      "General order fulfilment",
      "Sourcing on request",
      "Flexible requirements",
      "Direct B2B communication",
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Enquire", desc: "Contact us via WhatsApp or phone with your supply requirement." },
  { step: "02", title: "Discuss", desc: "We discuss your specifications, quantity, and timeline." },
  { step: "03", title: "Source", desc: "We source the required materials from our supply network." },
  { step: "04", title: "Supply", desc: "We deliver or arrange collection as agreed." },
];

export default function Services() {
  return (
    <main className="page-enter">
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">What We Do</span>
          <h1 className="page-header__title">Services &amp; Supply Areas</h1>
          <p className="page-header__sub">
            ZHS Traders supplies businesses with materials across several key categories.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="sr-only">Supply Areas</h2>
          <div className="services-list">
            {SERVICES.map((svc, i) => (
              <article key={svc.title} className="service-item">
                <div className="service-item__num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="service-item__body">
                  <h3 className="service-item__title">{svc.title}</h3>
                  <p className="service-item__desc">{svc.description}</p>
                  <ul className="service-item__details">
                    {svc.details.map((d) => (
                      <li key={d}>
                        <CheckIcon /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-item__action">
                  <a
                    href={`https://wa.me/923215583861?text=${encodeURIComponent(
                      `Hello ZHS Traders, I would like to enquire about your ${svc.title} supply.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <WAIcon /> Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--alt" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">How It Works</span>
            <h2 className="section-title" id="process-heading">
              The Supply Process
            </h2>
          </div>
          <div className="process-grid">
            {PROCESS.map((p) => (
              <div key={p.step} className="process-step">
                <span className="process-step__num">{p.step}</span>
                <h3 className="process-step__title">{p.title}</h3>
                <p className="process-step__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="services-cta-heading">
        <div className="container services-cta">
          <h2 className="section-title" id="services-cta-heading">
            Have a Specific Requirement?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "var(--space-8)" }}>
            If you don't see your requirement listed above, contact us.
            We handle a broad range of general supply orders for businesses.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <WAIcon /> Chat on WhatsApp
            </a>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
