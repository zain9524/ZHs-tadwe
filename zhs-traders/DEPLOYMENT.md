# ZHS Traders — Complete Deployment Guide

**GitHub → Supabase → Vercel**

This guide takes you from zero to a live, production website.
Follow every step in order. Estimated time: 30–45 minutes.

---

## What You Will End Up With

```
Your Code (GitHub)
      ↓  auto-deploys on every push
Vercel (hosting)
      ↓  reads/writes
Supabase (database + auth + file storage)
      ↑
Admin Dashboard (private URL)
```

- Public website live at your Vercel domain (or custom domain)
- Products managed through the private admin panel
- Auto-deploy: every time you push to GitHub, Vercel rebuilds the site

---

## Prerequisites

You need accounts at three free services. All have free tiers.

| Service | Sign up at | Purpose |
|---------|-----------|---------|
| GitHub | https://github.com | Stores your code |
| Supabase | https://app.supabase.com | Database, auth, image storage |
| Vercel | https://vercel.com | Hosts the website |

Sign up for all three before starting. Use the same email address for simplicity.

---

# PART 1 — GITHUB

## Step 1.1 — Install Git (if not installed)

**Windows:**
Download from https://git-scm.com/download/win
Install with default settings.

**Mac:**
Open Terminal and run:
```
git --version
```
If it prompts you to install, click Install.

**Verify:**
```bash
git --version
# Should print: git version 2.x.x
```

---

## Step 1.2 — Configure Git (first time only)

Open Terminal (Mac) or Git Bash (Windows) and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Use the same email you used to sign up on GitHub.

---

## Step 1.3 — Create a GitHub Repository

1. Go to https://github.com
2. Click the **+** button (top right) → **New repository**
3. Fill in:
   - **Repository name:** `zhs-traders`
   - **Description:** ZHS Traders website
   - **Visibility:** Private ← important, keeps your code private
   - **Do NOT** check "Add a README file"
4. Click **Create repository**
5. GitHub shows you a page with setup commands — keep this tab open

---

## Step 1.4 — Prepare Your Local Project

Open Terminal in your project folder. If you unzipped the project to your Desktop:

**Mac:**
```bash
cd ~/Desktop/zhs-traders
```

**Windows (Git Bash):**
```bash
cd ~/Desktop/zhs-traders
```

Verify you are in the right folder:
```bash
ls
# Should show: src, public, package.json, README.md, etc.
```

---

## Step 1.5 — Initialize Git and Push to GitHub

Run these commands one by one:

```bash
# Initialize a Git repository in this folder
git init

# Stage all files
git add .

# Check what will be committed (optional but useful)
git status

# Create the first commit
git commit -m "Initial commit — ZHS Traders website"

# Set the branch name to main
git branch -M main

# Connect to your GitHub repository
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/zhs-traders.git

# Push your code to GitHub
git push -u origin main
```

When prompted, enter your GitHub username and password.
> **Note:** GitHub may ask for a Personal Access Token instead of your password.
> If so, go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → check "repo" scope → copy the token and use it as your password.

**Verify:** Refresh your GitHub repository page. You should see all your project files.

---

## Step 1.6 — Confirm .env is NOT uploaded

On your GitHub repository page, look through the files.
You should see `.env.example` but **NOT** a file called just `.env`.

If `.env` is visible, run:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

---

# PART 2 — SUPABASE

## Step 2.1 — Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **New project**
3. Fill in:
   - **Name:** `zhs-traders`
   - **Database Password:** Choose a strong password and **save it somewhere safe**
   - **Region:** Southeast Asia (Singapore) — closest to Pakistan
4. Click **Create new project**
5. Wait 1–2 minutes for the project to start

---

## Step 2.2 — Get Your API Keys

1. In your Supabase project, click **Project Settings** (gear icon, bottom left)
2. Click **API** in the left menu
3. You will see two important values — copy both:

```
Project URL:     https://xxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIs...very long string...
```

> ⚠️ Copy ONLY the **anon public** key. Never copy the `service_role` key into your project.

Keep these copied — you will need them in multiple steps.

---

## Step 2.3 — Run the Database Schema

1. In Supabase, click **SQL Editor** in the left sidebar
2. Click **New query** (or the + button)
3. Open the file `supabase-schema.sql` from your project folder in any text editor
4. Select all the text (Ctrl+A / Cmd+A) and copy it
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see: **"Success. No rows returned"**

This created:
- `products` table — stores all product data
- `admin_users` table — controls who has admin access
- All security policies (Row Level Security)

---

## Step 2.4 — Create the Storage Bucket

1. In Supabase, click **Storage** in the left sidebar
2. Click **New bucket**
3. Fill in:
   - **Name:** `product-images` ← must be exactly this
   - **Public bucket:** ✓ checked (ON)
4. Click **Save**

You will see the new bucket appear in the list.

---

## Step 2.5 — Create Your Admin Account

1. In Supabase, click **Authentication** in the left sidebar
2. Click **Users**
3. Click **Invite user**
4. Enter **your real email address**
5. Click **Send invitation**
6. Check your email inbox
7. Click the **Confirm your email** link in the email
8. You will be taken to a page to set your password — set a strong password
9. Save this password — you will use it to log in to the admin panel

---

## Step 2.6 — Grant Yourself Admin Access

1. In Supabase → **Authentication → Users**
2. Find your user in the list
3. Click on your user — you will see a UUID like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
4. **Copy that UUID**
5. Go to **SQL Editor** → **New query**
6. Paste and run this (replace the UUID with yours):

```sql
INSERT INTO public.admin_users (user_id)
VALUES ('paste-your-uuid-here');
```

Example:
```sql
INSERT INTO public.admin_users (user_id)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
```

7. Click **Run** — you should see: **"Success. 1 row affected"**

You are now an authorized admin. ✓

---

## Step 2.7 — Verify Supabase is Working Locally

Before deploying to Vercel, test locally first.

1. Open your project folder in a text editor (VS Code recommended)
2. Find the file `.env.example`
3. In the same folder, create a new file called `.env`
4. Copy the contents of `.env.example` into `.env`
5. Replace the placeholder values with your real Supabase values:

```
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

6. Open Terminal in your project folder and run:
```bash
npm install
npm run dev
```

7. Open http://localhost:5173 — the public website should load
8. Open http://localhost:5173/manage-x7K9pQ2mL8vR4nT6aY5 — you should see the admin login
9. Sign in with your email and password — you should see the dashboard

If this works, Supabase is correctly configured. ✓

---

# PART 3 — VERCEL

## Step 3.1 — Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub** — this links Vercel to your GitHub account
4. Authorize Vercel to access your GitHub

---

## Step 3.2 — Import Your Repository

1. In Vercel dashboard, click **Add New → Project**
2. You will see a list of your GitHub repositories
3. Find `zhs-traders` and click **Import**

---

## Step 3.3 — Configure Build Settings

Vercel usually detects Vite automatically. Verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | `./` (default) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

Do not change anything if Vercel detected them correctly.

---

## Step 3.4 — Add Environment Variables

**This is the most important step.** Without these, the website cannot connect to Supabase.

1. In the Vercel project setup page, scroll down to **Environment Variables**
2. Add the first variable:
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** your Supabase project URL (e.g. `https://xxxx.supabase.co`)
   - Click **Add**
3. Add the second variable:
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** your Supabase anon public key
   - Click **Add**
4. Verify both variables appear in the list

> ⚠️ If you skip this step, the deployed website will fail to connect to the database.

---

## Step 3.5 — Deploy

1. Click **Deploy**
2. Vercel will:
   - Pull your code from GitHub
   - Run `npm install`
   - Run `npm run build`
   - Deploy the output
3. Wait 1–3 minutes
4. When complete, you will see: **"Congratulations! Your project is deployed"**
5. Vercel gives you a URL like: `https://zhs-traders-abc123.vercel.app`

---

## Step 3.6 — Verify the Deployment

1. Click your Vercel URL to open the live website
2. Check all pages load: Home, About, Products, Services, Contact
3. Visit the admin panel at:
   ```
   https://your-vercel-url.vercel.app/manage-x7K9pQ2mL8vR4nT6aY5
   ```
4. Sign in with your admin email and password
5. Add a test product through the dashboard
6. Visit the public Products page — the test product should appear

If everything works, your website is live. ✓

---

# PART 4 — ADDING A CUSTOM DOMAIN (Optional)

## Step 4.1 — Add Domain in Vercel

1. In Vercel, open your project
2. Go to **Settings → Domains**
3. Type your domain (e.g. `zhstraders.com`) and click **Add**
4. Vercel will show you DNS records to add

## Step 4.2 — Configure DNS at Your Domain Registrar

Log in to wherever you purchased your domain (e.g. Namecheap, GoDaddy, Hostinger):

**Option A — Point entire domain to Vercel (recommended):**
Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**Option B — Use Vercel's nameservers:**
Replace your current nameservers with:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

DNS changes take 10 minutes to 24 hours to propagate.

## Step 4.3 — SSL Certificate

Vercel automatically issues a free SSL certificate (HTTPS) once your DNS is connected. No action required.

## Step 4.4 — Update Supabase Allowed URLs

Once your custom domain is live:
1. In Supabase → **Authentication → URL Configuration**
2. Add your domain to **Site URL**: `https://zhstraders.com`
3. Add to **Redirect URLs**: `https://zhstraders.com/**`
4. Click **Save**

---

# PART 5 — ONGOING WORKFLOW

## Making Changes to the Website

After the initial setup, updating the website is simple:

```bash
# Make your changes in the project files

# Stage and commit
git add .
git commit -m "Describe what you changed"

# Push to GitHub
git push
```

Vercel detects the push automatically and rebuilds the website in 1–2 minutes.
No manual deployment needed.

---

## Managing Products (No Code Required)

To add, edit, or remove products after going live:

1. Go to: `https://your-domain.com/manage-x7K9pQ2mL8vR4nT6aY5`
2. Sign in with your admin email and password
3. Use the dashboard to manage products
4. Changes appear on the public website immediately

---

## Adding a Second Admin

If you want another person to have admin access:

1. In Supabase → Authentication → Users → **Invite user** (their email)
2. They confirm their email and set a password
3. Copy their UUID from the Users list
4. In Supabase SQL Editor, run:
```sql
INSERT INTO public.admin_users (user_id)
VALUES ('their-uuid-here');
```

To remove their access:
```sql
UPDATE public.admin_users
SET is_active = false
WHERE user_id = 'their-uuid-here';
```

---

# TROUBLESHOOTING

## "Products are temporarily unavailable" on the website

**Cause:** Supabase environment variables are wrong or missing.

**Fix:**
1. In Vercel → your project → **Settings → Environment Variables**
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
3. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

---

## Admin login says "Invalid login credentials"

**Cause:** Wrong email or password, or you haven't confirmed your email.

**Fix:**
1. Check you are using the email and password you set in Supabase Authentication
2. Check your email inbox for a confirmation email — you must click the link before logging in
3. In Supabase → Authentication → Users — verify your user shows **Confirmed**

---

## Login succeeds but shows "Access Denied"

**Cause:** Your user is authenticated but not in the `admin_users` table.

**Fix:** In Supabase SQL Editor:
```sql
-- First, find your user ID
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- Then insert your user into admin_users
INSERT INTO public.admin_users (user_id)
VALUES ('the-uuid-from-above');
```

---

## Product images not loading

**Cause:** Storage bucket is not set to Public, or bucket name is wrong.

**Fix:**
1. In Supabase → Storage
2. Find the `product-images` bucket
3. Click the three dots → **Edit bucket**
4. Make sure **Public bucket** is checked ON
5. Click **Save**

---

## Vercel build fails

**Cause:** Usually a missing environment variable or a code error.

**Fix:**
1. In Vercel → your project → **Deployments**
2. Click the failed deployment → **View build logs**
3. Look for the error message near the bottom
4. If it says "Missing environment variable" — add the missing variable in Settings
5. If it shows a code error — fix it locally, test with `npm run build`, then push again

---

## Changes not appearing after git push

**Cause:** Vercel may still be building, or there was a build error.

**Fix:**
1. In Vercel → your project → **Deployments**
2. Check the status of the latest deployment
3. If it shows a red error, click it to see the logs

---

# QUICK REFERENCE

## Important URLs

| What | URL |
|------|-----|
| Your live website | `https://your-vercel-url.vercel.app` |
| Admin panel | `https://your-vercel-url.vercel.app/manage-x7K9pQ2mL8vR4nT6aY5` |
| Supabase dashboard | `https://app.supabase.com` |
| Vercel dashboard | `https://vercel.com/dashboard` |
| GitHub repo | `https://github.com/YOUR_USERNAME/zhs-traders` |

## Environment Variables (needed in Vercel)

| Variable | Where to get it |
|----------|----------------|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |

## Admin Panel URL
```
/manage-x7K9pQ2mL8vR4nT6aY5
```
Do not share this URL publicly.

## Useful Git Commands
```bash
git add .                          # Stage all changes
git commit -m "Your message"       # Save a snapshot
git push                           # Upload to GitHub (triggers Vercel redeploy)
git status                         # See what has changed
git log --oneline                  # See commit history
```

---

*ZHS Traders — General Order Supplier, Rawat, Islamabad, Pakistan*
