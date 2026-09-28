import "./Legal.css";

const LAST_UPDATED = "January 2025";

export default function PrivacyPolicy() {
  return (
    <main className="page-enter">
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="page-header__title">Privacy Policy</h1>
          <p className="page-header__sub">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            ZHS Traders ("we", "us", or "our") operates this website to provide
            information about our business and supply services. This Privacy Policy
            explains how we handle information you may provide when using this website.
          </p>

          <h2>1. Information We May Collect</h2>
          <p>
            We may collect information you voluntarily provide when you contact us
            through the website's contact form or via WhatsApp, phone, or email.
            This may include:
          </p>
          <ul>
            <li>Your name</li>
            <li>Your phone number or WhatsApp contact</li>
            <li>Your email address</li>
            <li>Details of your business enquiry</li>
          </ul>
          <p>
            We do not collect sensitive personal information and we do not operate
            an e-commerce system. No payment information is collected through this website.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Any information you provide is used solely to respond to your business
            enquiry and to communicate with you regarding the supply of products
            or services you have requested. We do not use your information for
            marketing purposes without your consent.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>
            This website may use the following third-party services:
          </p>
          <ul>
            <li>
              <strong>Google Fonts</strong> — used to load web fonts. Google may
              receive your IP address when fonts are loaded.
            </li>
            <li>
              <strong>WhatsApp</strong> — clicking WhatsApp links on this website
              will redirect you to the WhatsApp platform. WhatsApp's own privacy
              policy applies to any communication made through that platform.
            </li>
          </ul>

          <h2>4. Cookies</h2>
          <p>
            This website does not currently use tracking cookies or analytics
            cookies. If cookies are used in the future, this policy will be
            updated accordingly.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            If you contact us through the contact form, your message is retained
            only for the duration necessary to handle your enquiry. We do not
            store contact form submissions in a permanent database unless an
            email service is connected.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We take reasonable steps to protect information provided to us.
            However, no method of transmission over the internet is completely
            secure. Please contact us directly by phone or WhatsApp if you have
            concerns about sharing sensitive information.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            If you have provided us with your contact information and wish to
            have it removed, please contact us at{" "}
            <a href="mailto:zhstraders19@gmail.com">zhstraders19@gmail.com</a>{" "}
            and we will action your request.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The date at
            the top of this page will reflect the most recent update.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at:
          </p>
          <address className="legal-address">
            ZHS Traders<br />
            Flat # 2, 2nd Floor, Rabi Royal Mall,<br />
            Near Wateem Dental Hospital,<br />
            T-Chowk, Rawat, Islamabad, Pakistan<br />
            <a href="mailto:zhstraders19@gmail.com">zhstraders19@gmail.com</a><br />
            <a href="tel:+923215583861">+92 321 5583861</a>
          </address>
        </div>
      </section>
    </main>
  );
}
