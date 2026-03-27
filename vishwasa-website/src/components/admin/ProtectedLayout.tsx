"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X, Bell } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted) return <div className="min-h-screen bg-cream"></div>;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-[#FDFCFB] relative overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-brown/5 px-6 flex items-center justify-between z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-serif font-bold text-lg text-brown tracking-tight">Vishwasa</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="text-brown bg-cream/50 p-2.5 rounded-xl border border-brown/5 shadow-sm active:scale-95 transition-all"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-72 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="h-full pt-20">
               <Sidebar />
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen md:h-screen md:overflow-y-auto pt-24 md:pt-0 relative">
        {/* Subtle Decorative Background */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange/[0.02] rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brown/[0.02] rounded-full blur-[120px] -z-10" />
        
        <div className="p-4 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
