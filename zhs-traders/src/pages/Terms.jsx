import "./Legal.css";

const LAST_UPDATED = "January 2025";

export default function Terms() {
  return (
    <main className="page-enter">
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="page-header__title">Terms &amp; Conditions</h1>
          <p className="page-header__sub">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            By accessing and using the ZHS Traders website, you accept and agree
            to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          <h2>1. Website Purpose</h2>
          <p>
            This website is provided for informational purposes only. It presents
            information about ZHS Traders, a B2B general order supplier based in
            Rawat, Islamabad, Pakistan. The website is not an e-commerce store
            and does not offer online purchasing functionality unless explicitly
            stated otherwise.
          </p>

          <h2>2. Product Information</h2>
          <p>
            Product descriptions and categories displayed on this website are
            provided for general guidance only. Product availability, specifications,
            and supply conditions may change without notice.
          </p>
          <p>
            Customers should contact ZHS Traders directly to confirm:
          </p>
          <ul>
            <li>Current product availability</li>
            <li>Pricing and minimum order quantities</li>
            <li>Delivery timelines and arrangements</li>
            <li>Product specifications relevant to their requirements</li>
          </ul>

          <h2>3. No Online Purchasing</h2>
          <p>
            This website does not facilitate online purchasing, payment, or
            checkout. All supply arrangements must be made directly with ZHS Traders
            via WhatsApp, phone, or email. Any transaction is subject to a direct
            agreement between the buyer and ZHS Traders.
          </p>

          <h2>4. Accuracy of Information</h2>
          <p>
            We make reasonable efforts to ensure the information on this website
            is accurate and up to date. However, we do not guarantee the completeness
            or accuracy of any information presented. We reserve the right to
            update or correct information at any time.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on this website, including text, design, and the ZHS Traders
            logo and branding, is the property of ZHS Traders. Reproduction or use
            of any content without written permission is not permitted.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            This website may contain links to third-party services such as WhatsApp
            and Google Maps. We are not responsible for the content or privacy
            practices of those platforms. Use of third-party services is subject
            to their own terms and conditions.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            ZHS Traders shall not be held liable for any loss or damage arising
            from your use of this website or reliance on information contained
            herein. This includes, but is not limited to, indirect or consequential
            loss arising from business decisions made based on website content.
          </p>

          <h2>8. Changes to These Terms</h2>
          <p>
            We reserve the right to amend these Terms and Conditions at any time.
            Changes will be reflected on this page with an updated date. Continued
            use of the website following any changes constitutes acceptance of the
            revised terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of the Islamic
            Republic of Pakistan. Any disputes shall be subject to the jurisdiction
            of the courts of Islamabad, Pakistan.
          </p>

          <h2>10. Contact</h2>
          <p>If you have any questions regarding these Terms, please contact:</p>
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
