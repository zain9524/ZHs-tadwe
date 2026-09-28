import "../../styles/global.css";
import "../admin.css";

export default function AccessDenied({ onLogout }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--gray-50)",
      padding: "var(--space-6)"
    }}>
      <div style={{
        background: "var(--white)",
        border: "1px solid var(--gray-200)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "var(--space-10) var(--space-8)",
        maxWidth: 420,
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{ color: "#dc2626", marginBottom: "var(--space-4)" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "var(--space-3)" }}>
          Access Denied
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "var(--space-8)" }}>
          Your account does not have admin privileges.
          Contact the system administrator if you believe this is an error.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <button className="btn btn-outline" onClick={onLogout} style={{ width: "100%", justifyContent: "center" }}>
            Sign Out
          </button>
          <a href="/" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", display: "inline-flex", textAlign: "center" }}>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
