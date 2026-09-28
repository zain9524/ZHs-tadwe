import { useState } from "react";
import "./Contact.css";

const WA_CONTACT =
  "https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20contact%20you%20regarding%20a%20business%20requirement.";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
     * ─────────────────────────────────────────────
     * TO CONNECT A REAL EMAIL SERVICE:
     * Replace the setSubmitted(true) call below with
     * a fetch/axios POST to your chosen service, e.g.:
     *   - EmailJS (https://www.emailjs.com)
     *   - Formspree (https://formspree.io)
     *   - A custom backend endpoint
     * ─────────────────────────────────────────────
     */
    setSubmitted(true);
  };

  return (
    <main className="page-enter">
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">Reach Out</span>
          <h1 className="page-header__title">Contact Us</h1>
          <p className="page-header__sub">
            We respond promptly to all business enquiries. WhatsApp is the fastest way to reach us.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-heading">
        <div className="container contact-layout">
          <h2 id="contact-heading" className="sr-only">Contact ZHS Traders</h2>

          {/* Info column */}
          <aside className="contact-info" aria-label="Contact information">
            <div className="contact-card">
              <div className="contact-card__logo">
                <img
                  src="/images/logo.png"
                  alt="ZHS Traders"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span style={{ display: "none" }} className="contact-card__logo-fb">ZHS Traders</span>
              </div>

              <p className="contact-card__director">
                <strong>Sagheer Malik</strong><br />
                <span>Director, ZHS Traders</span>
              </p>

              <ul className="contact-methods">
                <li>
                  <div className="contact-method">
                    <div className="contact-method__icon contact-method__icon--phone">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="contact-method__label">Phone / WhatsApp</p>
                      <a href="tel:+923215583861" className="contact-method__value">
                        +92 321 5583861
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="contact-method">
                    <div className="contact-method__icon contact-method__icon--mail">
                      <MailIcon />
                    </div>
                    <div>
                      <p className="contact-method__label">Email</p>
                      <a href="mailto:zhstraders19@gmail.com" className="contact-method__value">
                        zhstraders19@gmail.com
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="contact-method">
                    <div className="contact-method__icon contact-method__icon--loc">
                      <LocationIcon />
                    </div>
                    <div>
                      <p className="contact-method__label">Address</p>
                      <address className="contact-method__value contact-method__value--address">
                        Flat # 2, 2nd Floor, Rabi Royal Mall,<br />
                        Near Wateem Dental Hospital,<br />
                        T-Chowk, Rawat, Islamabad, Pakistan
                      </address>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="contact-buttons">
                <a
                  href={WA_CONTACT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <WAIcon /> WhatsApp Us
                </a>
                <a href="tel:+923215583861" className="btn btn-outline">
                  <PhoneIcon /> Call Us
                </a>
                <a href="mailto:zhstraders19@gmail.com" className="btn btn-outline">
                  <MailIcon /> Email Us
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success" role="alert">
                <SuccessIcon />
                <h3>Message Received</h3>
                <p>
                  Thank you for reaching out. We will get back to you as soon as possible.
                  For a faster response, message us on{" "}
                  <a href={WA_CONTACT} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3 className="contact-form__title">Send a Message</h3>
                <p className="contact-form__note">
                  Fill in the form below and we'll get back to you.
                  {/* Note: connect an email service to make this form functional */}
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span aria-hidden="true">*</span></label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      required autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+92 3XX XXXXXXX"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                    placeholder="Brief subject"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Describe your requirement..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact-form__submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0013 14.81l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>;
}
function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function LocationIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function WAIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function SuccessIcon() {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "#16a34a" }}><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>;
}
