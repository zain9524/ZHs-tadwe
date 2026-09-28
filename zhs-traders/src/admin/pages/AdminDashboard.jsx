import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Overview from "./Overview";
import ProductsList from "./ProductsList";
import ProductForm from "../components/ProductForm";
import { useAdminProducts } from "../../hooks/useAdminProducts";
import "../admin.css";

export default function AdminDashboard({ session, onLogout }) {
  const [page, setPage]         = useState("overview");
  const [editTarget, setEditTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [successMsg, setSuccessMsg]   = useState(null);

  const {
    products, loading, error,
    addProduct, updateProduct, deleteProduct, toggleActive,
  } = useAdminProducts();

  const userEmail = session?.user?.email ?? "";

  function showSuccess(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  }

  // ── Add ────────────────────────────────────
  async function handleAdd(fields, imageFile) {
    setFormLoading(true);
    const result = await addProduct(fields, imageFile);
    setFormLoading(false);
    if (!result.error) {
      showSuccess("Product added successfully.");
      setPage("products");
    }
    return result;
  }

  // ── Edit ───────────────────────────────────
  function startEdit(product) {
    setEditTarget(product);
    setPage("edit-product");
  }

  async function handleEdit(fields, imageFile) {
    setFormLoading(true);
    const result = await updateProduct(editTarget.id, { ...fields, image_url: editTarget.image_url }, imageFile);
    setFormLoading(false);
    if (!result.error) {
      showSuccess("Product updated successfully.");
      setEditTarget(null);
      setPage("products");
    }
    return result;
  }

  // ── Navigate helper ────────────────────────
  function navigate(key) {
    if (key !== "edit-product") setEditTarget(null);
    setPage(key);
  }

  // ── Render page content ────────────────────
  function renderPage() {
    if (error) {
      return (
        <div className="admin-alert admin-alert--error" role="alert">
          Database error: {error}. Check your Supabase connection and RLS policies.
        </div>
      );
    }

    switch (page) {
      case "overview":
        return (
          <Overview
            products={loading ? [] : products}
            onNavigate={navigate}
          />
        );

      case "products":
        return (
          <ProductsList
            products={products}
            loading={loading}
            onEdit={startEdit}
            onDelete={deleteProduct}
            onToggleActive={toggleActive}
            onAddNew={() => navigate("add-product")}
          />
        );

      case "add-product":
        return (
          <>
            {successMsg && (
              <div className="admin-alert admin-alert--success" role="alert">
                {successMsg}
              </div>
            )}
            <div className="admin-page-header">
              <div>
                <h1>Add Product</h1>
                <p>New products appear on the public website immediately after saving.</p>
              </div>
              <button className="btn btn-outline" onClick={() => navigate("products")}>
                ← Back to Products
              </button>
            </div>
            <ProductForm
              onSubmit={handleAdd}
              onCancel={() => navigate("products")}
              loading={formLoading}
              submitLabel="Add Product"
            />
          </>
        );

      case "edit-product":
        if (!editTarget) { navigate("products"); return null; }
        return (
          <>
            <div className="admin-page-header">
              <div>
                <h1>Edit Product</h1>
                <p>Changes are reflected on the public website immediately after saving.</p>
              </div>
              <button className="btn btn-outline" onClick={() => navigate("products")}>
                ← Back to Products
              </button>
            </div>
            <ProductForm
              initial={editTarget}
              onSubmit={handleEdit}
              onCancel={() => navigate("products")}
              loading={formLoading}
              submitLabel="Save Changes"
            />
          </>
        );

      default:
        return null;
    }
  }

  return (
    <AdminLayout
      page={page === "edit-product" ? "products" : page}
      onNavigate={navigate}
      onLogout={onLogout}
      userEmail={userEmail}
    >
      {successMsg && page !== "add-product" && (
        <div className="admin-alert admin-alert--success" role="alert">
          {successMsg}
        </div>
      )}
      {renderPage()}
    </AdminLayout>
  );
}
