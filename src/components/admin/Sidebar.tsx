"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { href: "/admin/content", icon: <FileText size={20} />, label: "Site Content" },
    { href: "/admin/products", icon: <Package size={20} />, label: "Product Catalog" },
    { href: "/admin/faq", icon: <HelpCircle size={20} />, label: "FAQ Manager" },
  ];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-brown/10 hidden md:flex flex-col h-screen sticky top-0 shadow-2xl z-50">
      <div className="p-8 border-b border-brown/5 flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center p-3 shadow-inner">
          <Image src="/logo.png" alt="Vishwasa Logo" width={48} height={48} className="object-contain" />
        </div>
        <div className="text-center">
          <h1 className="font-serif font-bold text-xl text-brown">Vishwasa</h1>
          <p className="text-[10px] text-orange font-bold uppercase tracking-[0.2em] mt-1">Management Console</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="text-[10px] font-bold text-brown/40 uppercase tracking-widest px-4 mb-4">Main Menu</p>
        <nav className="flex flex-col gap-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? "bg-orange text-white shadow-lg shadow-orange/20" 
                    : "text-brown/60 hover:bg-orange/5 hover:text-orange"
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <p className="text-[10px] font-bold text-brown/40 uppercase tracking-widest px-4 mb-4">Quick Links</p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-brown/60 hover:bg-cream hover:text-brown transition-all duration-300 border border-transparent hover:border-brown/10 shadow-sm hover:shadow-md"
          >
            <ExternalLink size={20} className="text-orange" />
            <span>View Live Site</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-brown/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all duration-300 group"
        >
          <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors text-red-500">
            <LogOut size={18} />
          </div>
          Logout
        </button>
      </div>
    </aside>
  );
}
