"use client";

import Link from "next/link";
import { Leaf, Droplets, Heart } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Home() {
  const settings = useSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold text-brown mb-6 tracking-tight whitespace-pre-wrap">
            {settings.heroTitle}
          </h1>
          <p className="text-xl text-brown/80 mb-10 max-w-2xl mx-auto whitespace-pre-wrap">
            {settings.heroSubtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products" className="bg-orange hover:bg-orange-light text-white font-bold py-3 px-8 rounded-full shadow-md transition-all">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="bg-white py-12 border-y border-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="bg-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-green">
                <Leaf size={32} />
              </div>
              <h3 className="font-bold text-brown text-xl mb-2">{settings.feature1Title || "No Palm Oil"}</h3>
              <p className="text-brown/70 whitespace-pre-wrap">{settings.feature1Desc || "Absolutely zero palm oil in any of our products."}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-orange">
                <Droplets size={32} />
              </div>
              <h3 className="font-bold text-brown text-xl mb-2">{settings.feature2Title || "Cold Pressed Oils"}</h3>
              <p className="text-brown/70 whitespace-pre-wrap">{settings.feature2Desc || "Made exclusively using groundnut and sesame cold pressed oils."}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-brown/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-brown">
                <Heart size={32} />
              </div>
              <h3 className="font-bold text-brown text-xl mb-2">{settings.feature3Title || "Butter Based"}</h3>
              <p className="text-brown/70 whitespace-pre-wrap">{settings.feature3Desc || "Authentic recipes made rich and melt-in-mouth with pure butter."}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
