import { useState, useEffect, useCallback } from "react";
import { supabase, getProductImageUrl, PRODUCT_BUCKET } from "../lib/supabase";

/**
 * Admin-side product management hook.
 * Requires authenticated admin session.
 * Fetches ALL products (active + inactive).
 */
export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (err) {
      setError(err.message);
    } else {
      setProducts(
        (data || []).map((p) => ({
          ...p,
          image: getProductImageUrl(p.image_url),
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── CREATE ───────────────────────────────────
  async function addProduct(fields, imageFile) {
    let image_url = null;

    if (imageFile) {
      const uploadResult = await uploadImage(imageFile);
      if (uploadResult.error) return { error: uploadResult.error };
      image_url = uploadResult.path;
    }

    const { error: err } = await supabase.from("products").insert([
      {
        name: fields.name.trim(),
        category: fields.category.trim(),
        description: fields.description.trim(),
        image_url,
        is_active: fields.is_active ?? true,
        sort_order: fields.sort_order ? Number(fields.sort_order) : 0,
      },
    ]);

    if (err) return { error: err.message };
    await fetchAll();
    return { error: null };
  }

  // ── UPDATE ───────────────────────────────────
  async function updateProduct(id, fields, imageFile) {
    let image_url = fields.image_url; // keep existing by default

    if (imageFile) {
      // Delete old image first (best-effort)
      if (fields.image_url) {
        await supabase.storage.from(PRODUCT_BUCKET).remove([fields.image_url]);
      }
      const uploadResult = await uploadImage(imageFile);
      if (uploadResult.error) return { error: uploadResult.error };
      image_url = uploadResult.path;
    }

    const { error: err } = await supabase
      .from("products")
      .update({
        name: fields.name.trim(),
        category: fields.category.trim(),
        description: fields.description.trim(),
        image_url,
        is_active: fields.is_active,
        sort_order: fields.sort_order ? Number(fields.sort_order) : 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (err) return { error: err.message };
    await fetchAll();
    return { error: null };
  }

  // ── DELETE ───────────────────────────────────
  async function deleteProduct(id, image_url) {
    // Delete the image from storage first (best-effort)
    if (image_url) {
      await supabase.storage.from(PRODUCT_BUCKET).remove([image_url]);
    }

    const { error: err } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (err) return { error: err.message };
    await fetchAll();
    return { error: null };
  }

  // ── TOGGLE ACTIVE ────────────────────────────
  async function toggleActive(id, currentState) {
    const { error: err } = await supabase
      .from("products")
      .update({ is_active: !currentState, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (err) return { error: err.message };
    await fetchAll();
    return { error: null };
  }

  return {
    products, loading, error,
    addProduct, updateProduct, deleteProduct, toggleActive,
    refetch: fetchAll,
  };
}

// ── Image upload helper ───────────────────────
async function uploadImage(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_BUCKET)
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (error) return { path: null, error: error.message };
  return { path: filename, error: null };
}
