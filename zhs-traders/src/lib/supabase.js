import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables.\n" +
    "Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.\n" +
    "See .env.example for the correct format."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ─── Storage helpers ─────────────────────────
export const PRODUCT_BUCKET = "product-images";

/**
 * Get the public URL for a product image stored in Supabase Storage.
 * Returns null if no path is given.
 */
export function getProductImageUrl(path) {
  if (!path) return null;
  // If already a full URL (legacy or external), return as-is
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(path);
  return data?.publicUrl ?? null;
}
