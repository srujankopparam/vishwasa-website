"use client";

import { createContext, useContext, ReactNode } from "react";

export type WebsiteSettings = {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  checkoutGreeting: string;
  deliveryWarning: string;
  contactAddress: string;
  contactEmail: string;
  footerAbout: string;
  [key: string]: string;
};

const defaultSettings: WebsiteSettings = {
  brandName: "Vishwasa Foods",
  heroTitle: "Our Traditional Sweets & Snacks",
  heroSubtitle:
    "Made with love, pure butter, and cold-pressed oils. No preservatives. No palm oil.",
  whatsappNumber: "918310236708",
  checkoutGreeting: "Hi Vishwasa, I would like to place an order:",
  deliveryWarning:
    "Please enter your name and delivery address to continue.",
  contactAddress:
    "123 Traditional Street, J.P. Nagar, Bengaluru, Karnataka 560078",
  contactEmail: "hello@vishwasa.com",
  footerAbout:
    "Mother's Trust, Nature's Best. We craft traditional recipes using premium ingredients, absolutely no palm oil, and 100% cold-pressed oils.",
  aboutTitle: "Our Story",
  aboutText:
    "Vishwasa was born out of a simple desire: to bring back the authentic taste of our grandmothers' kitchens. \nIn a world filled with mass-produced snacks using cheap palm oil and artificial preservatives, we decided to take a step back to our roots.",
  aboutFeature1Title: "Made with Love",
  aboutFeature1Desc:
    "Every batch is prepared with the exact same care and ingredients we use for our own family.",
  aboutFeature2Title: "No Compromise",
  aboutFeature2Desc:
    "0% Palm Oil. 0% Artificial Colors. We strictly use pure butter, desi ghee, and local cold-pressed oils.",
  aboutFeature3Title: "Authentic Taste",
  aboutFeature3Desc:
    "Following generations-old traditional recipes that capture the true essence of South India.",
};

const SettingsContext = createContext<WebsiteSettings | undefined>(undefined);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings: Partial<WebsiteSettings>;
}) {
  const mergedSettings = { ...defaultSettings, ...initialSettings } as WebsiteSettings;

  return (
    <SettingsContext.Provider value={mergedSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): WebsiteSettings {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
