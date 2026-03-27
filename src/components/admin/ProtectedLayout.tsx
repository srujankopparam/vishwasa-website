"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
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

  if (!mounted) return <div className="min-h-screen bg-cream"></div>;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-cream relative">
      <Sidebar />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-white border-b border-brown/10 px-4 flex items-center justify-between z-40">
        <span className="font-serif font-bold text-xl text-brown">Admin Panel</span>
        <button onClick={() => setMobileMenuOpen(true)} className="text-brown">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-64 bg-white h-full relative">
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="absolute top-4 right-4 text-brown p-2"
            >
              <X size={20} />
            </button>
            <div className="pt-16">
               {/* Reuse sidebar UI for mobile, wrapped slightly to allow the close button */}
               <div className="absolute inset-0 top-16"><Sidebar /></div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 md:h-screen md:overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
