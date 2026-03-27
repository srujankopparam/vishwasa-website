"use client";

import { Target, Heart, ShieldCheck } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

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

          {[
            { icon: Heart, title: settings.aboutFeature1Title || "Made with Love", desc: settings.aboutFeature1Desc || "Every snack is crafted with care using age-old family recipes." },
            { icon: ShieldCheck, title: settings.aboutFeature2Title || "No Compromise", desc: settings.aboutFeature2Desc || "Zero preservatives, zero palm oil. Only the purest ingredients." },
            { icon: Target, title: settings.aboutFeature3Title || "Authentic Taste", desc: settings.aboutFeature3Desc || "True to traditional South Indian flavours, straight from our kitchen." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="text-center">
              <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
                <Icon size={40} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brown mb-4">{title}</h3>
              <p className="text-brown/80 whitespace-pre-wrap">{desc}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
