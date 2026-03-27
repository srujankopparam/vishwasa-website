"use client";

import Link from "next/link";
import { Leaf, Droplets, Heart } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export default function Home() {
  const settings = useSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-cream-light py-24 sm:py-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brown/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-6xl sm:text-8xl font-bold text-brown mb-8 tracking-tight whitespace-pre-wrap animate-fade-up">
            {settings.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-brown/70 mb-12 max-w-3xl mx-auto whitespace-pre-wrap animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
            {settings.heroSubtitle}
          </p>
          <div className="flex justify-center gap-6 animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
            <Link 
              href="/products" 
              className="bg-orange-gold hover:bg-brown-dark text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
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
                className="group flex flex-col items-center p-8 rounded-3xl hover:bg-cream-light transition-all duration-500 animate-fade-up [animation-delay:var(--delay)] opacity-0 fill-mode-forwards"
                style={{ "--delay": `${600 + i * 200}ms` } as any}
              >
                <div className={`${feature.bg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <feature.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown mb-3">{feature.title}</h3>
                <p className="text-brown/60 text-center leading-relaxed whitespace-pre-wrap">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
