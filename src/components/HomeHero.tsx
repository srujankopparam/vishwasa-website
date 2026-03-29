"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Droplets, Heart, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <section className="relative min-h-[90vh] flex items-center bg-cream py-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brown/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side — text */}
            <div className="flex flex-col items-start">
              
              {/* FSSAI badge — honest, no fake numbers */}
              <div className="flex items-center gap-2 bg-white border border-brown/10 rounded-full px-4 py-2 mb-8 shadow-sm">
                <span className="text-green text-sm">✓</span>
                <span className="text-brown/70 text-sm font-semibold uppercase tracking-widest">
                  FSSAI Certified · Made Fresh
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-brown mb-6 leading-tight whitespace-pre-wrap animate-fade-up">
                {settings.heroTitle}
              </h1>
              
              <p className="text-lg sm:text-xl text-brown/70 mb-10 max-w-lg leading-relaxed whitespace-pre-wrap animate-fade-up">
                {settings.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
                <Link
                  href="/products"
                  className="bg-orange hover:bg-orange-light text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center text-lg"
                >
                  Shop Our Snacks
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-brown/30 hover:border-brown text-brown font-bold py-4 px-10 rounded-full transition-all duration-300 text-center text-lg hover:bg-brown/5"
                >
                  Our Story →
                </Link>
              </div>

              {/* Small trust pills below buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                {["No Palm Oil", "Cold Pressed Oils", "Pure Butter", "No Preservatives"].map((label) => (
                  <span key={label} className="bg-white border border-brown/10 text-brown/70 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side — product image */}
            <div className="relative flex items-center justify-center animate-fade-in">
              {/* Warm circular background */}
              <div className="absolute w-[420px] h-[420px] bg-orange/10 rounded-full blur-2xl" />
              <div className="relative w-[380px] h-[380px] sm:w-[450px] sm:h-[450px]">
                <Image
                  src="https://i.ibb.co/LhYrtDfH/IMG-20240929-WA0026-removebg-preview.png"
                  alt="Vishwasa Traditional Snacks"
                  fill
                  priority
                  className="object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown">What Makes Us <span className="text-orange underline decoration-[3px] underline-offset-8">Different</span></h2>
            <p className="text-brown/50 max-w-2xl mx-auto text-lg font-medium">Uncompromising quality rooted in South Indian traditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: settings.feature1Title || "No Palm Oil", desc: settings.feature1Desc || "Absolutely zero palm oil in any of our products.", color: "text-green", bg: "bg-green/5" },
              { icon: Droplets, title: settings.feature2Title || "Cold Pressed Oils", desc: settings.feature2Desc || "Made exclusively using groundnut and sesame cold pressed oils.", color: "text-orange", bg: "bg-orange/5" },
              { icon: Heart, title: settings.feature3Title || "Butter Based", desc: settings.feature3Desc || "Authentic recipes made rich and melt-in-mouth with pure butter.", color: "text-brown-light", bg: "bg-brown/5" }
            ].map((feature, i) => (
              <div
                key={i}
                className="group flex flex-col items-center p-10 rounded-[40px] hover:bg-cream-light transition-all duration-500 border border-transparent hover:border-brown/10 hover:shadow-2xl hover:shadow-brown/5"
              >
                <div className={feature.bg + " w-24 h-24 rounded-3xl flex items-center justify-center mb-8 " + feature.color + " transition-transform duration-500 group-hover:scale-110 shadow-sm"}>
                  <feature.icon size={42} strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown mb-4">{feature.title}</h3>
                <p className="text-brown/60 text-center leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bottom Bar */}
      {showBar && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] z-[200]">
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-orange text-white font-bold py-5 rounded-2xl text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 border border-orange-light shadow-orange/30"
          >
            <ShoppingBag size={20} />
            Shop Our Collection →
          </button>
        </div>
      )}
    </>
  );
}
