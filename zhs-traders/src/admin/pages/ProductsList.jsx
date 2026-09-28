import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import "../admin.css";

export default function ProductsList({ products, loading, onEdit, onDelete, onToggleActive, onAddNew }) {
  const [search, setSearch]           = useState("");
  const [catFilter, setCatFilter]     = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alert, setAlert]             = useState(null);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "All" || p.category === catFilter;
    const matchStatus = statusFilter === "All" || (statusFilter === "Active" ? p.is_active : !p.is_active);
    return matchSearch && matchCat && matchStatus;
  });

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const result = await onDelete(deleteTarget.id, deleteTarget.image_url);
    setDeleteLoading(false);
    setDeleteTarget(null);
    if (result?.error) {
      setAlert({ type: "error", msg: result.error });
    } else {
      setAlert({ type: "success", msg: `"${deleteTarget.name}" deleted.` });
      setTimeout(() => setAlert(null), 4000);
    }
  }

  async function handleToggle(p) {
    const result = await onToggleActive(p.id, p.is_active);
    if (result?.error) setAlert({ type: "error", msg: result.error });
    else setAlert({ type: "success", msg: `"${p.name}" ${p.is_active ? "deactivated" : "activated"}.` });
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <div>
      {deleteTarget && (
        <DeleteModal
          productName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}

      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>{products.length} product{products.length !== 1 ? "s" : ""} total</p>
        </div>
        <button className="btn btn-primary" onClick={onAddNew}>
          <PlusIcon /> Add Product
        </button>
      </div>

      {alert && (
        <div className={`admin-alert admin-alert--${alert.type}`} role="alert">
          {alert.msg}
        </div>
      )}

      <div className="admin-table-wrap">
        {/* Toolbar */}
        <div className="admin-table-toolbar">
          <div className="admin-table-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            <select className="admin-filter-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Filter by category">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "var(--space-8)" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: "var(--space-3)" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon"><BoxIcon /></div>
            <h3>{products.length === 0 ? "No products yet" : "No products match your filters"}</h3>
            <p>{products.length === 0 ? "Add your first product to get started." : "Try adjusting your search or filters."}</p>
            {products.length === 0 && (
              <button className="btn btn-primary" onClick={onAddNew} style={{ marginTop: "var(--space-4)" }}>
                Add First Product
              </button>
            )}
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image
                      ? <img src={p.image} alt={p.name} className="product-thumb" />
                      : <div className="product-thumb-placeholder">No img</div>
                    }
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "var(--gray-900)" }}>{p.name}</span>
                    <p style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginTop: 2, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.description}
                    </p>
                  </td>
                  <td>{p.category || "—"}</td>
                  <td>{p.sort_order ?? "—"}</td>
                  <td>
                    <span className={`status-badge status-badge--${p.is_active ? "active" : "inactive"}`}>
                      <span className="status-dot" />
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-icon"
                        onClick={() => onEdit(p)}
                        title="Edit product"
                        aria-label={`Edit ${p.name}`}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={`btn-icon ${p.is_active ? "" : "btn-icon--success"}`}
                        onClick={() => handleToggle(p)}
                        title={p.is_active ? "Deactivate (hide from website)" : "Activate (show on website)"}
                        aria-label={p.is_active ? `Deactivate ${p.name}` : `Activate ${p.name}`}
                      >
                        {p.is_active ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                      <button
                        className="btn-icon btn-icon--danger"
                        onClick={() => setDeleteTarget(p)}
                        title="Delete product"
                        aria-label={`Delete ${p.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function PlusIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function SearchIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gray-400)", flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function EditIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function TrashIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>; }
function EyeIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function EyeOffIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>; }
function BoxIcon()    { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>; }
