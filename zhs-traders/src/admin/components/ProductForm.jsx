import { useState, useEffect, useRef } from "react";
import "../admin.css";

const CATEGORIES = [
  "Nutraceuticals",
  "Vitamins",
  "Seals",
  "Packing",
  "General",
];

const EMPTY = {
  name: "",
  category: "Nutraceuticals",
  description: "",
  sort_order: "",
  is_active: true,
};

export default function ProductForm({ initial, onSubmit, onCancel, loading, submitLabel = "Save Product" }) {
  const [fields, setFields] = useState(initial ? { ...initial } : { ...EMPTY });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initial?.image || null);
  const [dragover, setDragover] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (initial) {
      setFields({ ...initial });
      setImagePreview(initial.image || null);
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageSelect(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleFileInput(e) {
    handleImageSelect(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragover(false);
    handleImageSelect(e.dataTransfer.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!fields.name.trim()) { setError("Product name is required."); return; }
    if (!fields.description.trim()) { setError("Description is required."); return; }

    const result = await onSubmit(fields, imageFile);
    if (result?.error) setError(result.error);
  }

  const formatBytes = (b) => b < 1024 * 1024
    ? `${(b / 1024).toFixed(1)} KB`
    : `${(b / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <form className="admin-form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="admin-form-title">
        {initial ? "Edit Product" : "Add New Product"}
      </h2>

      {error && (
        <div className="admin-alert admin-alert--error" role="alert">
          <ErrorIcon /> {error}
        </div>
      )}

      {/* Name + Category */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label htmlFor="pf-name">Product Name <Required /></label>
          <input
            id="pf-name" name="name" type="text"
            value={fields.name} onChange={handleChange}
            placeholder="e.g. Industrial Seals"
            required
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="pf-category">Category</label>
          <select id="pf-category" name="category" value={fields.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="admin-form-group">
        <label htmlFor="pf-desc">Description <Required /></label>
        <textarea
          id="pf-desc" name="description"
          value={fields.description} onChange={handleChange}
          placeholder="Short product description visible on the website..."
          rows={4}
          required
        />
      </div>

      {/* Sort order + Active */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label htmlFor="pf-sort">Display Order</label>
          <input
            id="pf-sort" name="sort_order" type="number"
            value={fields.sort_order} onChange={handleChange}
            placeholder="e.g. 1"
            min="0"
          />
          <span className="field-hint">Lower numbers appear first. Leave blank for default.</span>
        </div>
        <div className="admin-form-group">
          <label>Status</label>
          <label className="toggle-wrap">
            <button
              type="button"
              className={`toggle${fields.is_active ? " toggle--on" : ""}`}
              onClick={() => setFields((f) => ({ ...f, is_active: !f.is_active }))}
              aria-pressed={fields.is_active}
              aria-label="Toggle active status"
            />
            <span className="toggle-label">
              {fields.is_active ? "Active — visible on website" : "Inactive — hidden from website"}
            </span>
          </label>
        </div>
      </div>

      {/* Image upload */}
      <div className="admin-form-group">
        <label>Product Image</label>
        {imagePreview ? (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <div className="image-preview__info">
              <p className="image-preview__name">
                {imageFile ? imageFile.name : "Current image"}
              </p>
              {imageFile && (
                <p className="image-preview__size">{formatBytes(imageFile.size)}</p>
              )}
            </div>
            <button
              type="button"
              className="btn-icon btn-icon--danger"
              onClick={() => { setImageFile(null); setImagePreview(initial?.image || null); }}
              aria-label="Remove image"
              title="Remove selected image"
            >
              <TrashIcon />
            </button>
          </div>
        ) : (
          <div
            className={`image-upload-area${dragover ? " image-upload-area--dragover" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
            onDragLeave={() => setDragover(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            <div className="image-upload-area__icon"><UploadIcon /></div>
            <p className="image-upload-area__text">Click to select or drag & drop an image</p>
            <p className="image-upload-area__sub">JPG, PNG or WebP — max 5 MB — recommended 800×600 px</p>
          </div>
        )}
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function Required() {
  return <span style={{ color: "var(--blue-500)", marginLeft: 2 }} aria-hidden="true">*</span>;
}

function ErrorIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}
function UploadIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}
