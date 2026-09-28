import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Admin entry — loaded lazily so it doesn't bloat the public bundle
import AdminEntry from "./admin/pages/AdminEntry";

/*
 * PRIVATE ADMIN ROUTE
 * ─────────────────────────────────────────────
 * This route is intentionally obscure to reduce
 * casual discovery. Security is enforced by:
 *   1. Supabase Authentication (email + password)
 *   2. admin_users table check (authorization)
 *   3. Supabase Row Level Security (database level)
 *
 * The hidden URL is an additional privacy layer only.
 * Do NOT share this URL publicly.
 * ─────────────────────────────────────────────
 */
const ADMIN_ROUTE = "/manage-x7K9pQ2mL8vR4nT6aY5";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* Public layout wrapper — includes navbar, footer, floating WA button */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith(ADMIN_ROUTE.split("/manage-")[0] + "/manage-");

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Public routes ───────────────── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

        {/* ── Private admin route ─────────── */}
        {/* No navbar/footer/WA button on admin pages */}
        <Route path={ADMIN_ROUTE} element={<AdminEntry />} />

        {/* ── 404 ─────────────────────────── */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
