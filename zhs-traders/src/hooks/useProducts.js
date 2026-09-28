import { useState, useEffect } from "react";
import { supabase, getProductImageUrl } from "../lib/supabase";

/**
 * Fetches active products from Supabase for the public-facing Products page.
 * Only returns is_active = true, ordered by sort_order ASC.
 */
export function useProducts(categoryFilter = "All") {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      const { data, error: err } = await supabase
        .from("products")
        .select("id, name, category, description, image_url, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }

      // Resolve image URLs from Supabase Storage
      const resolved = (data || []).map((p) => ({
        ...p,
        image: getProductImageUrl(p.image_url),
      }));

      setProducts(resolved);

      // Build unique category list
      const cats = ["All", ...new Set(resolved.map((p) => p.category).filter(Boolean))];
      setCategories(cats);
      setLoading(false);
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  const filtered =
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return { products: filtered, categories, loading, error };
}
