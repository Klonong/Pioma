import client from "@/api/client";

export type OAuthProvider = "google" | "apple";

export const authService = {
  signIn: (email: string, password: string) =>
    client.auth.signInWithPassword({ email, password }),

  signUp: (email: string, password: string, phone: string) =>
    client.auth.signUp({
      email,
      password,
      options: { data: { phone } },
    }),

  signInWithOAuth: (provider: OAuthProvider) =>
    client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/` },
    }),

  signOut: () => client.auth.signOut(),
};
