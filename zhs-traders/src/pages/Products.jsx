import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import "./Products.css";

const ALL = "All";

export default function Products() {
  const [active, setActive] = useState(ALL);
  const { products, categories, loading, error } = useProducts(active);

  return (
    <main className="page-enter">
      {/* Page header */}
      <section className="page-header" aria-label="Page title">
        <div className="container">
          <span className="section-label">What We Carry</span>
          <h1 className="page-header__title">Product Catalog</h1>
          <p className="page-header__sub">
            Browse our supply categories and enquire directly via WhatsApp
            for pricing and availability.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="section" aria-labelledby="products-heading">
        <div className="container">
          <h2 id="products-heading" className="sr-only">Products</h2>

          {/* Category filter - only show when we have data */}
          {!loading && !error && categories.length > 1 && (
            <div className="products-filter" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn${active === cat ? " filter-btn--active" : ""}`}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="products-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="product-skeleton">
                  <div className="product-skeleton__img skeleton" />
                  <div className="product-skeleton__body">
                    <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
                    <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 14, width: "85%", marginBottom: 20 }} />
                    <div className="skeleton" style={{ height: 36, width: 160 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="products-error" role="alert">
              <InfoIcon />
              <div>
                <strong>Products temporarily unavailable.</strong>
                <p>Please try again shortly or contact us directly on WhatsApp.</p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <div className="products-empty-state">
              <p>
                Products will be listed here soon. For current availability,
                please{" "}
                <a
                  href="https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20know%20about%20your%20available%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact ZHS Traders on WhatsApp
                </a>.
              </p>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Enquiry note */}
          {!loading && !error && (
            <div className="products-note">
              <InfoIcon />
              <p>
                Prices and availability are not listed online.{" "}
                <a
                  href="https://wa.me/923215583861?text=Hello%20ZHS%20Traders%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact us on WhatsApp
                </a>{" "}
                or{" "}
                <a href="tel:+923215583861">call us</a>{" "}
                to discuss your specific requirements.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}
