import "../admin.css";

export default function DeleteModal({ productName, onConfirm, onCancel, loading }) {
  return (
    <div className="admin-overlay" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <div className="admin-modal">
        <h3 id="delete-title">Delete Product</h3>
        <p>
          Are you sure you want to delete <strong>"{productName}"</strong>?
          This will also remove the product image from storage.
          This action cannot be undone.
        </p>
        <div className="admin-modal__actions">
          <button
            className="btn btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{ background: "#dc2626", color: "white", borderColor: "#dc2626" }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting…" : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
