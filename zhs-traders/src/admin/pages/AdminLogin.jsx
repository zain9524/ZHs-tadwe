import { useState } from "react";
import "../../styles/global.css";
import "../admin.css";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await onLogin(email.trim(), password);
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        {/* Logo */}
        <div className="login-card__logo">
          <img
            src="/images/logo.png"
            alt="ZHS Traders"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <span style={{ display: "none" }} className="login-logo-fb">ZHS Traders</span>
        </div>

        <h1 className="login-card__title">Admin Sign In</h1>
        <p className="login-card__sub">ZHS Traders Management Panel</p>

        {error && (
          <div className="admin-alert admin-alert--error" role="alert">
            {error}
          </div>
        )}

        {resetSent && (
          <div className="admin-alert admin-alert--success" role="alert">
            Password reset email sent. Check your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="login-password">Password</label>
            <div className="login-pw-wrap">
              <input
                id="login-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-pw-toggle"
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg login-submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="login-card__footer">
          <a href="/" className="login-back-link">← Back to website</a>
        </div>
      </div>
    </div>
  );
}

function EyeIcon()    { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function EyeOffIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>; }
