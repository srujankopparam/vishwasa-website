"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const expiry = localStorage.getItem("admin_token_expiry");
    if (storedToken && expiry) {
      if (Date.now() > parseInt(expiry, 10)) {
        // Session expired — clear immediately
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expiry");
        router.push("/admin/login");
      } else {
        setToken(storedToken);
      }
    }
  }, [router]);

  const login = async (password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // Store the password as the token — it's used as Bearer token
        // for authenticated API calls (settings, products, upload, setup).
        // The password is already known to the admin user and is only
        // sent over HTTPS to same-origin API routes.
        setToken(password);
        localStorage.setItem("admin_token", password);
        localStorage.setItem(
          "admin_token_expiry",
          String(Date.now() + 8 * 60 * 60 * 1000)
        );
        return true;
      }
    } catch (e) {
      console.error("Login failed:", e);
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token_expiry");
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
