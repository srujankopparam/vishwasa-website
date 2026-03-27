"use client";

import { Target, Heart, ShieldCheck } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AboutPage() {
  const settings = useSettings();

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-6">{settings.aboutTitle}</h1>
          <p className="text-xl text-brown/80 leading-relaxed whitespace-pre-wrap">
            {settings.aboutText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <Heart size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">{settings.aboutFeature1Title}</h3>
            <p className="text-brown/80 whitespace-pre-wrap">{settings.aboutFeature1Desc}</p>
          </div>
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <ShieldCheck size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">{settings.aboutFeature2Title}</h3>
            <p className="text-brown/80 whitespace-pre-wrap">{settings.aboutFeature2Desc}</p>
          </div>
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <Target size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">{settings.aboutFeature3Title}</h3>
            <p className="text-brown/80 whitespace-pre-wrap">{settings.aboutFeature3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
