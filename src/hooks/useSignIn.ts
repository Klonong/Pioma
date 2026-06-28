"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

const ADMIN_EMAIL = "admin@pioma.com";
const ADMIN_PASSWORD = "pioma@dmin";

export function useSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("isAdmin", "true");
        toast.success("Welcome, Admin!");
        router.push("/admin/create-product");
        return;
      }

      const { error } = await authService.signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, password, setPassword, rememberMe, setRememberMe, loading, handleSignIn };
}
