import "../admin.css";

export default function Overview({ products, onNavigate }) {
  const total    = products.length;
  const active   = products.filter((p) => p.is_active).length;
  const inactive = total - active;

  const recent = [...products]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Overview</h1>
          <p>ZHS Traders — Product Management</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("add-product")}>
          <PlusIcon /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <p className="stat-card__label">Total Products</p>
          <p className="stat-card__value stat-card__value--blue">{total}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Active (Visible)</p>
          <p className="stat-card__value stat-card__value--green">{active}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Inactive (Hidden)</p>
          <p className="stat-card__value stat-card__value--gray">{inactive}</p>
        </div>
      </div>

      {/* Recent products */}
      {total === 0 ? (
        <div className="admin-table-wrap">
          <div className="admin-empty">
            <div className="admin-empty__icon"><BoxIcon /></div>
            <h3>No products yet</h3>
            <p>Add your first product to get started.</p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate("add-product")}
              style={{ marginTop: "var(--space-4)" }}
            >
              Add First Product
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-toolbar">
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--gray-700)" }}>
              Recently Added
            </span>
            <button className="btn btn-outline" style={{ fontSize: "0.875rem", padding: "0.4rem 0.9rem" }} onClick={() => onNavigate("products")}>
              View All
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image
                      ? <img src={p.image} alt={p.name} className="product-thumb" />
                      : <div className="product-thumb-placeholder">No img</div>
                    }
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--gray-900)" }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`status-badge status-badge--${p.is_active ? "active" : "inactive"}`}>
                      <span className="status-dot" />
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{p.sort_order ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick help */}
      <div className="admin-alert admin-alert--info" style={{ marginTop: "var(--space-6)" }}>
        <InfoIcon />
        <div>
          <strong>Quick Guide:</strong> Add products from <em>Add Product</em>.
          Active products appear on the public website. Inactive products are hidden but not deleted.
          The <em>Display Order</em> field controls the order products appear — lower numbers appear first.
        </div>
      </div>
    </div>
  );
}

function PlusIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function BoxIcon()  { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>; }
function InfoIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>; }
