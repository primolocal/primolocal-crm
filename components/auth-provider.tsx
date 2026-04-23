"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: Error }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => ({}),
  logout: async () => {},
});

const isSupabaseReady = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
const MOCK_AUTH_KEY = "primo-crm-auth-mock";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseReady) {
      const mockEmail = localStorage.getItem(MOCK_AUTH_KEY) || "dev@local.mode";
      localStorage.setItem(MOCK_AUTH_KEY, mockEmail);
      setUser({ email: mockEmail } as User);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!isSupabaseReady) {
      localStorage.setItem(MOCK_AUTH_KEY, email);
      setUser({ email } as User);
      return {};
    }
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ?? undefined };
  };

  const logout = async () => {
    if (!isSupabaseReady) {
      localStorage.removeItem(MOCK_AUTH_KEY);
      setUser(null);
      return;
    }
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
