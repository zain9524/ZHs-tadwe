import { useState } from "react";
import "../admin.css";

const NAV = [
  { key: "overview",    label: "Overview",       icon: <GridIcon /> },
  { key: "products",    label: "Products",       icon: <BoxIcon /> },
  { key: "add-product", label: "Add Product",    icon: <PlusIcon /> },
];

export default function AdminLayout({ page, onNavigate, onLogout, userEmail, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          style={{ zIndex: 199 }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? " admin-sidebar--open" : ""}`} aria-label="Admin navigation">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">
            <img
              src="/images/logo.png"
              alt="ZHS Traders"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="admin-sidebar__logo-text">
              <span className="admin-sidebar__logo-name">ZHS Traders</span>
              <span className="admin-sidebar__logo-sub">Admin Panel</span>
            </div>
          </div>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin menu">
          <div className="admin-nav-section">
            <p className="admin-nav-section__label">Management</p>
          </div>
          {NAV.map((item) => (
            <button
              key={item.key}
              className={`admin-nav-link${page === item.key ? " admin-nav-link--active" : ""}`}
              onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
              aria-current={page === item.key ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div className="admin-nav-section" style={{ marginTop: "var(--space-4)" }}>
            <p className="admin-nav-section__label">Links</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-link"
            style={{ textDecoration: "none" }}
          >
            <ExternalIcon /> View Website
          </a>
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-logout-btn" onClick={onLogout}>
            <LogoutIcon /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <button
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              <MenuIcon />
            </button>
            <span className="admin-topbar__title">
              {NAV.find((n) => n.key === page)?.label ?? "Admin"}
            </span>
          </div>
          <span className="admin-topbar__user">{userEmail}</span>
        </header>

        {/* Page content */}
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

/* ─── Icons ─────────────────────────────────── */
function GridIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function BoxIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>; }
function PlusIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function ExternalIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>; }
function LogoutIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }
function MenuIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }
