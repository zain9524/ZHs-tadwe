import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AccessDenied from "./AccessDenied";
import "../../styles/global.css";
import "../admin.css";

/**
 * Admin entry point.
 * State machine:
 *   loading  → spinner
 *   no session → login screen
 *   session + not admin → access denied
 *   session + admin → dashboard
 */
export default function AdminEntry() {
  const { session, isAdmin, loading, signIn, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gray-50)"
      }}>
        <div style={{ textAlign: "center", color: "var(--gray-500)" }}>
          <div className="skeleton" style={{ width: 120, height: 8, borderRadius: 4, margin: "0 auto var(--space-3)" }} />
          <div className="skeleton" style={{ width: 80, height: 8, borderRadius: 4, margin: "0 auto" }} />
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={signIn} />;
  }

  if (!isAdmin) {
    return <AccessDenied onLogout={signOut} />;
  }

  return <AdminDashboard session={session} onLogout={signOut} />;
}
