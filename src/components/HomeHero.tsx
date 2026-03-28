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
      <section className="relative min-h-[90vh] flex items-center bg-[#fff8f0] overflow-hidden pt-20">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-orange/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-brown/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="text-left space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-full text-orange font-bold text-xs uppercase tracking-widest shadow-sm">
                <Heart size={14} fill="currentColor" />
                Trusted by 500+ Families
              </div>
              
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-brown leading-[1.1] tracking-tight">
                {settings.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className={i === settings.heroTitle.split(' ').length - 1 ? "text-orange block sm:inline" : "block sm:inline"}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <p className="text-lg sm:text-xl text-brown/70 max-w-xl leading-relaxed whitespace-pre-wrap font-medium">
                {settings.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/products"
                  className="bg-orange hover:bg-orange-light text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-orange/20 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 group text-lg"
                >
                  <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                  Order Fresh Now
                </Link>
                <Link
                  href="/about"
                  className="bg-white hover:bg-cream-light text-brown font-bold py-5 px-10 rounded-2xl border border-brown/10 shadow-sm transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  Our Story
                  <ArrowRight size={20} className="text-orange" />
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-brown/5">
                <div className="flex items-center gap-2 text-brown/60">
                  <ShieldCheck size={20} className="text-green" />
                  <span className="text-xs font-bold uppercase tracking-wider">FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-2 text-brown/60">
                  <Leaf size={20} className="text-green" />
                  <span className="text-xs font-bold uppercase tracking-wider">0% Palm Oil</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Image */}
            <div className="relative group animate-fade-up [animation-delay:300ms]">
              <div className="relative aspect-square max-w-[550px] mx-auto">
                {/* Decorative circular backgrounds */}
                <div className="absolute inset-0 bg-cream rounded-[60px] rotate-6 scale-95 opacity-50 group-hover:rotate-12 transition-transform duration-700" />
                <div className="absolute inset-0 bg-orange/10 rounded-[60px] -rotate-3 scale-95 group-hover:-rotate-6 transition-transform duration-700" />
                
                {/* Main Product Image Container */}
                <div className="absolute inset-0 bg-white shadow-2xl rounded-[60px] flex items-center justify-center border border-brown/5 overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1626082866744-32fe3b0276d9?q=80&w=800&auto=format&fit=crop" 
                    alt="Traditional Indian Snacks"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    priority
                  />
                  
                  {/* Floating floating card 1 */}
                  <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float border border-brown/5">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center text-green">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brown/40 uppercase tracking-widest">Natural</p>
                      <p className="text-sm font-bold text-brown leading-none">Cold Pressed Oils</p>
                    </div>
                  </div>

                  {/* Floating floating card 2 */}
                  <div className="absolute top-12 -right-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float-delayed border border-brown/5">
                    <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center text-orange">
                      <Heart size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brown/40 uppercase tracking-widest">Quality</p>
                      <p className="text-sm font-bold text-brown leading-none">Butter Based</p>
                    </div>
                  </div>
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
