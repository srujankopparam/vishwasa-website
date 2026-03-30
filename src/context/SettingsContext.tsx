"use client";

import { createContext, useContext, ReactNode } from "react";
import defaultSettingsData from "../config/settings.json";

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
  instagramHandle: string;
  aboutTitle?: string;
  aboutText?: string;
  aboutFeature1Title?: string;
  aboutFeature1Desc?: string;
  aboutFeature2Title?: string;
  aboutFeature2Desc?: string;
  aboutFeature3Title?: string;
  aboutFeature3Desc?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  feature3Title?: string;
  feature3Desc?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  trustBadge1?: string;
  trustBadge2?: string;
  trustBadge3?: string;
  trustBadge4?: string;
  howToOrderTitle?: string;
  howToOrderSubtext?: string;
  step1Title?: string;
  step1Desc?: string;
  step2Title?: string;
  step2Desc?: string;
  step3Title?: string;
  step3Desc?: string;
  storyLabel?: string;
  storyHeading?: string;
  storyButtonText?: string;
  comboHeading?: string;
  comboSubtext?: string;
  comboButtonText?: string;
  bulkHeading?: string;
  bulkSubtext?: string;
  bulkButtonText?: string;
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaButtonText?: string;
  deliveryInfo?: string;
  minOrderAmount?: string;
  seoTitle?: string;
  seoDescription?: string;
  announcementText?: string;
  announcementActive?: string;
  businessHours?: string;
  [key: string]: string | undefined;
};

const defaultSettings: WebsiteSettings = defaultSettingsData;

const SettingsContext = createContext<WebsiteSettings | undefined>(undefined);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings: Partial<WebsiteSettings>;
}) {
  const mergedSettings: WebsiteSettings = { ...defaultSettings, ...initialSettings };

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
