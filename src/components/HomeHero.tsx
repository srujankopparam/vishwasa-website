"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Droplets, Heart, ShieldCheck } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import Image from "next/image";

export default function HomeHero() {
  const settings = useSettings();
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
      <section className="relative min-h-[85vh] flex items-center bg-cream pt-20 lg:pt-24 pb-10 lg:pb-12 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brown/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left side — text */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* FSSAI badge — honest, no fake numbers */}
              <div className="inline-flex items-center gap-2 bg-white border border-brown/10 rounded-full px-4 py-2 mb-4 lg:mb-6 shadow-sm animate-fade-up">
                <span className="text-green text-sm">✓</span>
                <span className="text-brown/70 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  FSSAI Certified · Made Fresh
                </span>
              </div>

              <h1 className="font-serif text-[2.5rem] sm:text-6xl lg:text-7xl font-bold text-brown mb-3 lg:mb-6 leading-[1.1] whitespace-pre-wrap animate-fade-up">
                {settings.heroTitle}
              </h1>
              
              <p className="text-base sm:text-xl text-brown/70 mb-6 lg:mb-10 max-w-lg leading-relaxed whitespace-pre-wrap animate-fade-up">
                {settings.heroSubtitle}
              </p>

              <div className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto animate-fade-up mb-8">
                <Link
                  href="/products"
                  className="bg-orange hover:bg-orange-light text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center text-base md:text-lg w-full sm:w-auto"
                >
                  Shop Our Snacks
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-brown/30 hover:border-brown text-brown font-bold py-4 px-10 rounded-full transition-all duration-300 text-center text-base md:text-lg hover:bg-brown/5 w-full sm:w-auto"
                >
                  Our Story →
                </Link>
              </div>

              {/* Small trust pills below buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 lg:mb-0">
                {["No Palm Oil", "Cold Pressed Oils", "Pure Butter", "No Preservatives"].map((label) => (
                  <span key={label} className="bg-white border border-brown/10 text-brown/70 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side — 3 product images */}
            <div className="relative flex items-center justify-center animate-fade-in order-first lg:order-last mb-10 lg:mb-0 w-full mt-10 lg:mt-0">
              {/* Soft glow background */}
              <div className="absolute w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] bg-orange/10 rounded-full blur-[80px] -z-10" />

              <div className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[560px] h-[360px] sm:h-[480px] lg:h-[560px]">

                {/* Boondi — top left */}
                <div className="absolute z-20 top-[0%] left-[0%] w-[52%] h-[52%] animate-float rotate-[-8deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
                  <Image
                    src="https://i.postimg.cc/7bJvN03y/boondi1-removebg-preview.png"
                    alt="Boondi"
                    fill
                    priority
                    sizes="(max-width: 768px) 45vw, 28vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Namkeen — top right, slightly lower */}
                <div className="absolute z-20 top-[10%] right-[0%] w-[50%] h-[50%] animate-float-fast rotate-[10deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
                  <Image
                    src="https://i.postimg.cc/kD00YGcH/IMG-20240929-WA0020-removebg-preview.png"
                    alt="Namkeen Mixture"
                    fill
                    priority
                    sizes="(max-width: 768px) 45vw, 28vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Khara — bottom center */}
                <div className="absolute z-30 bottom-[0%] left-[22%] w-[56%] h-[56%] animate-float-reverse rotate-[-5deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
                  <Image
                    src="https://i.postimg.cc/23ss9ywK/khara-removebg-preview.png"
                    alt="Khara"
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 32vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

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
                className="group flex flex-col items-center p-6 md:p-10 rounded-[40px] hover:bg-cream-light transition-all duration-500 border border-transparent hover:border-brown/10 hover:shadow-2xl hover:shadow-brown/5"
              >
                <div className={feature.bg + " w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-8 " + feature.color + " transition-transform duration-500 group-hover:scale-110 shadow-sm"}>
                  <feature.icon size={28} strokeWidth={1} className="md:hidden" />
                  <feature.icon size={42} strokeWidth={1} className="hidden md:block" />
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
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 pt-2 bg-gradient-to-t from-white/95 to-transparent">
          <a
            href="/products"
            className="w-full bg-orange hover:bg-orange-light text-white font-bold py-4 rounded-2xl text-base shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Try Our Products →
          </a>
        </div>
      )}
    </>
  );
}
