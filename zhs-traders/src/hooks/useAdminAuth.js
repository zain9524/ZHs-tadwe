import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Manages admin authentication state.
 * Checks Supabase session AND verifies the user is in the admin_users table.
 *
 * Returns:
 *   session    — current Supabase session (or null)
 *   isAdmin    — true only if session user is in admin_users table
 *   loading    — true while session/admin status is being determined
 *   signIn     — async fn(email, password) → { error }
 *   signOut    — async fn() → void
 */
export function useAdminAuth() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check admin status in DB
  async function checkAdmin(userId) {
    if (!userId) { setIsAdmin(false); return; }
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", userId)
      .eq("is_active", true)
      .maybeSingle();
    setIsAdmin(!error && !!data);
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await checkAdmin(session?.user?.id);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        await checkAdmin(session?.user?.id);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  return { session, isAdmin, loading, signIn, signOut };
}
