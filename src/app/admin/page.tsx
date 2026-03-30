"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Package, HelpCircle, FileText, 
  ShoppingBag, ArrowRight, TrendingUp 
} from "lucide-react";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [faqCount, setFaqCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(d => setProductCount(d.products?.length || 0))
      .catch(() => setProductCount(0));
    
    fetch("/api/faq")
      .then(r => r.json())
      .then(d => setFaqCount(d.faqs?.length || 0))
      .catch(() => setFaqCount(0));
  }, []);

  const stats = [
    { 
      label: "Products Listed", 
      value: productCount, 
      icon: Package, 
      href: "/admin/products",
      color: "bg-orange/10 text-orange" 
    },
    { 
      label: "FAQ Questions", 
      value: faqCount, 
      icon: HelpCircle, 
      href: "/admin/faq",
      color: "bg-green/10 text-green" 
    },
  ];

  const quickLinks = [
    { 
      label: "Edit Site Content", 
      desc: "Hero, features, footer text",
      href: "/admin/content", 
      icon: FileText 
    },
    { 
      label: "Manage Products", 
      desc: "Add, edit, delete snacks",
      href: "/admin/products", 
      icon: Package 
    },
    { 
      label: "Manage FAQs", 
      desc: "Add or edit questions",
      href: "/admin/faq", 
      icon: HelpCircle 
    },
    { 
      label: "View Live Site", 
      desc: "See how it looks to customers",
      href: "/", 
      icon: ShoppingBag,
      external: true
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-serif font-bold text-brown">
          Welcome back 👋
        </h1>
        <p className="text-brown/50 font-medium">
          Vishwasa Admin — manage your store from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-3xl p-8 border border-brown/5 
              shadow-sm hover:shadow-lg transition-all duration-300 
              hover:-translate-y-1 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <p className="text-4xl font-bold text-brown mb-1">
              {stat.value === null ? "..." : stat.value}
            </p>
            <p className="text-brown/50 font-medium">{stat.label}</p>
            <div className="flex items-center gap-1 mt-3 
              text-orange text-sm font-bold opacity-0 
              group-hover:opacity-100 transition-opacity">
              Manage <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-brown mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              className="bg-white rounded-2xl p-6 border border-brown/5 
                shadow-sm hover:shadow-md transition-all duration-300 
                hover:border-orange/20 group flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-cream rounded-xl 
                flex items-center justify-center text-orange 
                group-hover:bg-orange group-hover:text-white 
                transition-all duration-300">
                <link.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-brown group-hover:text-orange 
                  transition-colors">{link.label}</p>
                <p className="text-brown/40 text-sm">{link.desc}</p>
              </div>
              <ArrowRight size={18} className="text-brown/20 
                group-hover:text-orange transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-orange/5 border border-orange/20 
        rounded-3xl p-8">
        <h3 className="font-serif text-xl font-bold text-brown mb-4 
          flex items-center gap-2">
          <TrendingUp size={20} className="text-orange" />
          Quick Tips
        </h3>
        <ul className="space-y-2 text-brown/60 text-sm">
          <li>✅ Add descriptions to all products — 
            it helps customers decide faster</li>
          <li>✅ Fill in the Physical Address in Site Content 
            — it builds trust</li>
          <li>✅ Keep your WhatsApp number updated with 
            country code (91...)</li>
          <li>✅ Use the Announcement Banner for offers 
            and festival specials</li>
          <li>✅ Add shelf life and storage info to products 
            — it reduces WhatsApp queries</li>
        </ul>
      </div>
    </div>
  );
}
