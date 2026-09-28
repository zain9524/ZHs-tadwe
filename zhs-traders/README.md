# ZHS Traders Website

Professional B2B corporate website with secure Supabase-powered product management.

**Stack:** React + Vite · Supabase (PostgreSQL + Auth + Storage) · CSS3

---

## Overview

- **Public website** — 7 pages: Home, About, Products, Services, Contact, Privacy Policy, Terms
- **Product catalog** — live from Supabase database, no code changes needed to add/edit products
- **Private admin panel** — accessible only at a hidden URL after authentication
- **Security** — Supabase Auth + admin_users table + Row Level Security at database level

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in your Supabase values (see Supabase Setup below).

### 3. Run locally
```bash
npm run dev
```
Opens at http://localhost:5173

---

## Supabase Setup (step by step)

### Step 1 — Create a free Supabase project
1. Go to https://app.supabase.com
2. Click **New project**
3. Choose a name (e.g. `zhs-traders`) and a strong database password
4. Select a region close to Pakistan (e.g. Singapore or Mumbai)
5. Wait for the project to start (~1 minute)

### Step 2 — Get your API keys
1. In your project, go to **Project Settings → API**
2. Copy:
   - **Project URL** → goes into `VITE_SUPABASE_URL`
   - **anon public** key → goes into `VITE_SUPABASE_ANON_KEY`
3. Open your `.env` file and paste these values

### Step 3 — Run the database schema
1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Open `supabase-schema.sql` from this project
4. Paste the entire contents into the SQL editor
5. Click **Run**
6. You should see: "Success. No rows returned"

This creates:
- `products` table with all fields and indexes
- `admin_users` table for admin authorization
- All Row Level Security policies
- Storage policies for the product images bucket

### Step 4 — Create the Storage bucket
1. In Supabase, go to **Storage** (left sidebar)
2. Click **New bucket**
3. Name it exactly: `product-images`
4. Check **Public bucket** ✓
5. Click **Save**

### Step 5 — Create your admin account
1. In Supabase, go to **Authentication → Users**
2. Click **Invite user**
3. Enter your real email address
4. Check your email and click the confirmation link
5. Set a strong password when prompted

### Step 6 — Grant yourself admin access
1. In Supabase, go to **Authentication → Users**
2. Find your user and **copy their UUID** (the long ID like `a1b2c3d4-...`)
3. Go to **SQL Editor** and run:
```sql
INSERT INTO public.admin_users (user_id)
VALUES ('paste-your-uuid-here');
```
You are now an authorized admin.

### Step 7 — Verify the setup
1. Run the project locally: `npm run dev`
2. Visit the admin panel: `http://localhost:5173/manage-x7K9pQ2mL8vR4nT6aY5`
3. Sign in with your email and password
4. You should see the Admin Dashboard

---

## Admin Panel

### Admin URL
```
/manage-x7K9pQ2mL8vR4nT6aY5
```
**Keep this URL private.** Do not share it publicly or add it to navigation.

### Adding a product
1. Go to admin URL → sign in
2. Click **Add Product** in the sidebar
3. Fill in: Name, Category, Description
4. Set Display Order (lower = appears first on website)
5. Toggle Active/Inactive
6. Upload a product image (JPG/PNG/WebP, max 5 MB, recommended 800×600)
7. Click **Add Product**
8. Product appears on the public website immediately

### Editing a product
1. Go to **Products** in the sidebar
2. Click the pencil (edit) icon on any product
3. Change any fields, optionally replace the image
4. Click **Save Changes**

### Hiding a product (without deleting)
1. In the Products list, click the eye icon to toggle Active/Inactive
2. Inactive products are hidden from the public website but remain in the database

### Deleting a product
1. Click the trash icon on any product
2. Confirm the deletion
3. The product and its image are permanently removed

### Controlling display order
- Set **Display Order** when adding/editing a product
- Lower numbers appear first (1 = first, 2 = second, etc.)
- Products with the same order number are sorted by creation date

---

## Adding Your Logo
Place your logo at:
```
public/images/logo.png
```
The navbar, footer, about page, and admin sidebar will automatically display it.

---

## Product Images
Uploaded via the admin dashboard — they are stored in Supabase Storage automatically.

For images placed manually in `public/images/products/`, use the path directly in the database `image_url` field.

---

## Changing Company Information

| What | File |
|------|------|
| WhatsApp number | Search `923215583861` and replace in all files |
| Email address | Search `zhstraders19@gmail.com` and replace |
| Phone number | Search `+92 321 5583861` and replace |
| Address | `src/pages/About.jsx`, `src/pages/Contact.jsx`, `src/components/Footer.jsx` |
| Director name | `src/pages/About.jsx`, `src/pages/Contact.jsx` |

---

## Environment Variables

| Variable | Where to find it | Required |
|----------|-----------------|----------|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public | Yes |

**Never add** the `service_role` key to frontend code.

---

## Building for Production
```bash
npm run build
```
Output goes to `dist/`. This folder is what you deploy.

---

## Deployment

### Netlify (recommended — free)
1. Push this project to GitHub (without `.env` — it's gitignored)
2. Go to https://netlify.com → **New site from Git**
3. Connect your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Go to **Site settings → Environment variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Trigger a redeploy

The `public/_redirects` file is already included for React Router to work on Netlify.

### Vercel
1. Push to GitHub
2. Import repo at https://vercel.com
3. Framework: Vite | Build: `npm run build` | Output: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy

### Shared hosting / cPanel
1. Run `npm run build` locally
2. Upload contents of `dist/` to `public_html`
3. The `.htaccess` file is included in `public/` and copied to `dist/` automatically

---

## Security Notes

- `.env` is in `.gitignore` — your keys will NOT be committed to GitHub
- The anon key in the frontend is safe (it's the public key)
- Data is protected by Row Level Security at the database level
- Only users in the `admin_users` table can modify products
- The admin URL is kept private (not in navigation, blocked in robots.txt)
- No customer accounts, no payment data, no sensitive public data

---

## Project Structure

```
zhs-traders/
├── public/
│   ├── images/
│   │   ├── logo.png          ← your logo
│   │   └── products/         ← manual product images (optional)
│   ├── _redirects            ← Netlify routing
│   ├── .htaccess             ← Apache routing
│   └── robots.txt            ← blocks admin from search engines
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── DeleteModal.jsx
│   │   ├── pages/
│   │   │   ├── AdminEntry.jsx      ← auth state machine
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Overview.jsx
│   │   │   ├── ProductsList.jsx
│   │   │   └── AccessDenied.jsx
│   │   └── admin.css
│   ├── components/            ← public site components (unchanged)
│   ├── hooks/
│   │   ├── useProducts.js     ← public product fetching
│   │   ├── useAdminProducts.js ← admin CRUD operations
│   │   └── useAdminAuth.js    ← auth state + admin check
│   ├── lib/
│   │   └── supabase.js        ← Supabase client
│   ├── pages/                 ← public pages (Products updated)
│   ├── styles/
│   │   └── global.css
│   └── App.jsx                ← routes (public + admin)
├── supabase-schema.sql        ← run this in Supabase SQL Editor
├── .env.example               ← copy to .env and fill in values
├── .gitignore
└── README.md
```

---

## Adding a Second Admin

To give another person admin access:
1. In Supabase → Authentication → Users → Invite user (their email)
2. They confirm and set their password
3. Copy their UUID
4. Run in SQL Editor:
```sql
INSERT INTO public.admin_users (user_id)
VALUES ('their-user-uuid-here');
```

To remove admin access:
```sql
UPDATE public.admin_users SET is_active = false WHERE user_id = 'their-uuid';
```

---

## Connecting the Contact Form

The contact form currently shows a success state but does not send emails.
To connect it, use **Formspree** (free tier available):

1. Sign up at https://formspree.io
2. Create a form → copy the form ID
3. Open `src/pages/Contact.jsx`
4. Find the `handleSubmit` function and replace the body with:
```js
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (res.ok) setSubmitted(true);
else setSubmitted(true); // still show success to user
```

---

© 2026 ZHS Traders. All rights reserved.
