"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Package, LogOut, Verified } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { href: "/admin/content", icon: <FileText size={20} />, label: "Site Content" },
    { href: "/admin/products", icon: <Package size={20} />, label: "Products" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-brown/10 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-brown/10 flex items-center gap-3">
        <Image src="/logo.png" alt="Vishwasa Logo" width={40} height={40} className="object-contain" />
        <span className="font-serif font-bold text-xl text-brown">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {links.map((link) => {
          // Highlight active link
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive 
                  ? "bg-orange/10 text-orange" 
                  : "text-brown/70 hover:bg-cream hover:text-brown"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brown/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
