"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const success = await login(password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl border border-brown/10 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Vishwasa Logo" width={80} height={80} className="object-contain" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-brown mb-2">Admin Panel</h1>
        <p className="text-brown/70 mb-8">Enter your password to manage the website.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" size={20} />
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-brown/20 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange text-brown"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-left">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange hover:bg-orange-light text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
