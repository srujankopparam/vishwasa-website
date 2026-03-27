"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Droplets, Heart, ShieldCheck, Package, Clock } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { useRouter } from "next/navigation";

export default function HomeHero() {
  const settings = useSettings();
  const router = useRouter();
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-cream-light py-24 sm:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brown/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-6xl sm:text-8xl font-bold text-brown mb-8 tracking-tight whitespace-pre-wrap animate-fade-up">
            {settings.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-brown/70 mb-12 max-w-3xl mx-auto whitespace-pre-wrap animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {settings.heroSubtitle}
          </p>
          <div className="flex justify-center gap-6 animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="/products"
              className="bg-brown hover:bg-brown-dark text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-brown py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, label: "FSSAI Licensed" },
              { icon: Leaf, label: "No Preservatives" },
              { icon: Package, label: "Ships Pan-India" },
              { icon: Clock, label: "Fresh Every Batch" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2 text-cream">
                <Icon size={18} strokeWidth={2} />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-20 border-y border-brown/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: settings.feature1Title || "No Palm Oil", desc: settings.feature1Desc || "Absolutely zero palm oil in any of our products.", color: "text-green-600", bg: "bg-green-50" },
              { icon: Droplets, title: settings.feature2Title || "Cold Pressed Oils", desc: settings.feature2Desc || "Made exclusively using groundnut and sesame cold pressed oils.", color: "text-orange-600", bg: "bg-orange-50" },
              { icon: Heart, title: settings.feature3Title || "Butter Based", desc: settings.feature3Desc || "Authentic recipes made rich and melt-in-mouth with pure butter.", color: "text-red-600", bg: "bg-red-50" }
            ].map((feature, i) => (
              <div
                key={i}
                className="group flex flex-col items-center p-8 rounded-3xl hover:bg-cream-light transition-all duration-500 animate-fade-up [animation-delay:var(--delay)] opacity-0 [animation-fill-mode:forwards]"
                style={{ "--delay": `${600 + i * 200}ms` } as React.CSSProperties}
              >
                <div className={feature.bg + " w-20 h-20 rounded-2xl flex items-center justify-center mb-6 " + feature.color + " group-hover:scale-110 transition-transform duration-500 shadow-sm"}>
                  <feature.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown mb-3">{feature.title}</h3>
                <p className="text-brown/60 text-center leading-relaxed whitespace-pre-wrap">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bottom Bar */}
      {showBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] p-4 bg-white/90 backdrop-blur-md border-t border-brown/10 shadow-2xl">
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-orange text-white font-bold py-4 rounded-2xl text-lg shadow-lg active:scale-95 transition-transform"
          >
            Shop Our Snacks →
          </button>
        </div>
      )}
    </>
  );
}
