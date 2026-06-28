"use client";
import client from "@/api/client";
import { createContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await client
      .from("users")
      .select("id, email, name, phone, role")
      .eq("id", userId)
      .single();
    setProfile(data as UserProfile | null);
  };

  useEffect(() => {
    const { data: listener } = client.auth.onAuthStateChange(
      async (_event, session) => {
        const authUser = session?.user ?? null;
        setUser(authUser);
        if (authUser) {
          await fetchProfile(authUser.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
