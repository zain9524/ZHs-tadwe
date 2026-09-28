-- ============================================================
-- ZHS TRADERS — Supabase Database Schema
-- ============================================================
-- HOW TO USE:
-- 1. Open your Supabase project dashboard
-- 2. Go to SQL Editor (left sidebar)
-- 3. Paste this entire file and click Run
-- 4. All tables, policies, and indexes will be created
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- ENABLE UUID EXTENSION (needed for uuid_generate_v4)
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ────────────────────────────────────────────────────────────
-- TABLE: products
-- Stores all product information for the public catalog
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  slug        TEXT        UNIQUE,       -- optional URL-friendly name
  category    TEXT,
  description TEXT,
  image_url   TEXT,                    -- path in Supabase Storage bucket
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast public queries (only active products, ordered)
CREATE INDEX IF NOT EXISTS idx_products_active_order
  ON public.products (is_active, sort_order ASC, created_at ASC);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category
  ON public.products (category);


-- ────────────────────────────────────────────────────────────
-- TABLE: admin_users
-- Tracks which Supabase auth users have admin privileges.
-- Only users listed here (with is_active = true) can manage
-- products through the admin dashboard.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active  BOOLEAN     NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for fast admin lookup
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id
  ON public.admin_users (user_id, is_active);


-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- This is the most important security layer.
-- Even if someone has the anon key, RLS ensures they can only
-- read active products and cannot write anything.
-- ────────────────────────────────────────────────────────────

-- Enable RLS on both tables
ALTER TABLE public.products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;


-- ── products: public SELECT (active products only) ────────────
-- Anyone (including unauthenticated visitors) can read
-- active products. This powers the public product catalog.
CREATE POLICY "Public can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true);


-- ── products: admin SELECT (all products) ────────────────────
-- Admins can see all products including inactive ones.
CREATE POLICY "Admins can view all products"
  ON public.products
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );


-- ── products: admin INSERT ────────────────────────────────────
CREATE POLICY "Admins can insert products"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );


-- ── products: admin UPDATE ────────────────────────────────────
CREATE POLICY "Admins can update products"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );


-- ── products: admin DELETE ────────────────────────────────────
CREATE POLICY "Admins can delete products"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );


-- ── admin_users: admins can view admin list ───────────────────
-- Admins can see who else is an admin (for management purposes)
CREATE POLICY "Admins can view admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.user_id = auth.uid()
      AND au.is_active = true
    )
  );


-- ── admin_users: self-read ────────────────────────────────────
-- Any authenticated user can check if THEY are an admin.
-- This is needed by the useAdminAuth hook.
CREATE POLICY "Authenticated users can check their own admin status"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());


-- ────────────────────────────────────────────────────────────
-- STORAGE POLICIES
-- Run these after creating the 'product-images' bucket in the
-- Supabase Storage dashboard (set it to PUBLIC).
-- ────────────────────────────────────────────────────────────

-- Allow public access to read product images
-- (Supabase handles this automatically for public buckets)

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );

-- Allow authenticated admins to update/replace images
CREATE POLICY "Admins can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );

-- Allow authenticated admins to delete images
CREATE POLICY "Admins can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );

-- Allow public to read (view) product images
CREATE POLICY "Public can read product images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');


-- ────────────────────────────────────────────────────────────
-- HELPFUL NOTES
-- ────────────────────────────────────────────────────────────
-- After running this SQL:
--
-- 1. Create the 'product-images' storage bucket in Supabase
--    Dashboard → Storage → New bucket
--    Name: product-images
--    Public: YES (checked)
--
-- 2. Create your admin user:
--    Dashboard → Authentication → Users → Invite user
--    Use your real email address.
--    Click the confirmation link in the email to set your password.
--
-- 3. Find your user's UUID:
--    Dashboard → Authentication → Users → copy the UUID
--
-- 4. Insert your admin record:
--    Run this SQL (replace the UUID with yours):
--
--    INSERT INTO public.admin_users (user_id)
--    VALUES ('paste-your-user-uuid-here');
--
-- 5. You can now sign in at the admin URL.
-- ────────────────────────────────────────────────────────────
