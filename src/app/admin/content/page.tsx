"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, Save } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function ContentEditor() {
  const [settingsData, setSettingsData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { token } = useAuth();

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettingsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const handleSettingChange = (key: string, value: string) => {
    setHasUnsavedChanges(true);
    setSettingsData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSettingsSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ settings: settingsData }),
      });
      if (res.ok) {
        setHasUnsavedChanges(false);
        alert("Website text updated live automatically!");
      } else {
        alert("Failed to save settings. Check authentication.");
      }
    } catch (err) {
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 animate-pulse text-brown/50">Loading editor...</div>
    );
  }

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-up">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brown tracking-tight">
            Site <span className="text-orange">Content</span>
          </h1>
          <p className="text-brown/50 font-medium">
            Manage your brand identity and website copy in real-time.
          </p>
        </div>
        <div className="hidden md:block">
           <SaveButton onClick={handleSettingsSave} saving={saving} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {/* Global Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown flex items-center gap-2">
            <Globe size={20} className="text-orange" /> Global & Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Brand Name
              </label>
              <input
                value={settingsData.brandName || "Vishwasa Foods"}
                onChange={(e) =>
                  handleSettingChange("brandName", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                WhatsApp Number
              </label>
              <input
                value={settingsData.whatsappNumber || ""}
                onChange={(e) =>
                  handleSettingChange("whatsappNumber", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                placeholder="e.g. 919876543210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Contact Email
              </label>
              <input
                value={settingsData.contactEmail || ""}
                onChange={(e) =>
                  handleSettingChange("contactEmail", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Physical Address
              </label>
              <textarea
                rows={2}
                value={settingsData.contactAddress || ""}
                onChange={(e) =>
                  handleSettingChange("contactAddress", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Announcement Banner */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown flex items-center gap-2">
            📢 Announcement Banner
          </h2>
          <p className="text-sm text-brown/50 mb-4">
            Show a banner across the top of the website. Leave text empty to hide it.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Banner Text (leave empty to hide)
              </label>
              <input
                value={settingsData.announcementText || ""}
                onChange={(e) => handleSettingChange("announcementText", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                placeholder="e.g. 🎉 Free delivery on orders above ₹500 this week!"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="announcementActive"
                checked={settingsData.announcementActive === "true"}
                onChange={(e) => handleSettingChange("announcementActive", e.target.checked ? "true" : "false")}
                className="w-5 h-5 accent-orange"
              />
              <label htmlFor="announcementActive" className="text-sm font-bold text-brown/70">
                Show banner on website
              </label>
            </div>
          </div>
        </section>

        {/* Homepage Hero */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Home Page Hero
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Hero Title
              </label>
              <input
                value={
                  settingsData.heroTitle || "Mother's Trust, Nature's Best"
                }
                onChange={(e) =>
                  handleSettingChange("heroTitle", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Hero Subtitle
              </label>
              <textarea
                rows={2}
                value={
                  settingsData.heroSubtitle ||
                  "Traditional South Indian snacks made with uncompromising quality. No palm oil, just pure butter and cold-pressed oils."
                }
                onChange={(e) =>
                  handleSettingChange("heroSubtitle", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-2 font-serif text-brown">
            Hero Image
          </h2>
          <p className="text-sm text-brown/50 mb-4">
            The product image shown on the right side of the homepage hero. Upload your image to imgbb.com and paste the direct link here.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Image URL
              </label>
              <input
                value={settingsData.heroImageUrl || ""}
                onChange={(e) => handleSettingChange("heroImageUrl", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                placeholder="https://i.ibb.co/..."
              />
            </div>
            {settingsData.heroImageUrl && (
              <div className="mt-2 w-32 h-32 relative rounded-xl overflow-hidden bg-cream border border-brown/10">
                <img 
                  src={settingsData.heroImageUrl} 
                  alt="Hero preview"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            )}
          </div>
        </section>

        {/* Trust Elements */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Trust Elements (Features)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 1</h3>
              <input
                value={settingsData.feature1Title || "No Palm Oil"}
                onChange={(e) =>
                  handleSettingChange("feature1Title", e.target.value)
                }
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={
                  settingsData.feature1Desc ||
                  "Absolutely zero palm oil in any of our products."
                }
                onChange={(e) =>
                  handleSettingChange("feature1Desc", e.target.value)
                }
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 2</h3>
              <input
                value={settingsData.feature2Title || "Cold Pressed Oils"}
                onChange={(e) =>
                  handleSettingChange("feature2Title", e.target.value)
                }
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={
                  settingsData.feature2Desc ||
                  "Made exclusively using groundnut and sesame cold pressed oils."
                }
                onChange={(e) =>
                  handleSettingChange("feature2Desc", e.target.value)
                }
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 3</h3>
              <input
                value={settingsData.feature3Title || "Butter Based"}
                onChange={(e) =>
                  handleSettingChange("feature3Title", e.target.value)
                }
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={
                  settingsData.feature3Desc ||
                  "Authentic recipes made rich and melt-in-mouth with pure butter."
                }
                onChange={(e) =>
                  handleSettingChange("feature3Desc", e.target.value)
                }
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Trust Strip Badges */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Trust Strip Badges
          </h2>
          <p className="text-sm text-brown/50 mb-4">
            The 4 badges shown in the brown strip below the hero.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {["trustBadge1","trustBadge2","trustBadge3","trustBadge4"].map((key, i) => (
              <div key={key}>
                <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                  Badge {i + 1}
                </label>
                <input
                  value={settingsData[key] || ""}
                  onChange={(e) => handleSettingChange(key, e.target.value)}
                  className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
            ))}
          </div>
        </section>

        {/* How to Order Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            How to Order Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Section Heading</label>
              <input
                value={settingsData.howToOrderTitle || ""}
                onChange={(e) => handleSettingChange("howToOrderTitle", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Section Subtext</label>
              <input
                value={settingsData.howToOrderSubtext || ""}
                onChange={(e) => handleSettingChange("howToOrderSubtext", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-brown/10">
              {[
                {t:"step1Title",d:"step1Desc",label:"Step 1"},
                {t:"step2Title",d:"step2Desc",label:"Step 2"},
                {t:"step3Title",d:"step3Desc",label:"Step 3"},
              ].map(({t, d, label}) => (
                <div key={t} className="space-y-2">
                  <h3 className="font-bold text-brown">{label}</h3>
                  <input
                    value={settingsData[t] || ""}
                    onChange={(e) => handleSettingChange(t, e.target.value)}
                    placeholder="Step title"
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    value={settingsData[d] || ""}
                    onChange={(e) => handleSettingChange(d, e.target.value)}
                    placeholder="Step description"
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Homepage Sections Text */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Homepage Sections Text
          </h2>
          <div className="space-y-6">
            
            <div className="pb-4 border-b border-brown/10">
              <h3 className="font-bold text-brown mb-3">Story Preview</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Label</label>
                  <input
                    value={settingsData.storyLabel || ""}
                    onChange={(e) => handleSettingChange("storyLabel", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Heading</label>
                  <input
                    value={settingsData.storyHeading || ""}
                    onChange={(e) => handleSettingChange("storyHeading", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Button Text</label>
                  <input
                    value={settingsData.storyButtonText || ""}
                    onChange={(e) => handleSettingChange("storyButtonText", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-brown/10">
              <h3 className="font-bold text-brown mb-3">
                Perfect for Sharing (Combo Section)
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Heading</label>
                  <input
                    value={settingsData.comboHeading || ""}
                    onChange={(e) => handleSettingChange("comboHeading", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Subtext</label>
                  <input
                    value={settingsData.comboSubtext || ""}
                    onChange={(e) => handleSettingChange("comboSubtext", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brown/50 uppercase mb-1">Button Text</label>
                  <input
                    value={settingsData.comboButtonText || ""}
                    onChange={(e) => handleSettingChange("comboButtonText", e.target.value)}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-brown/10">
              <h3 className="font-bold text-brown mb-3">
                Bulk Orders Section
              </h3>
              <div className="space-y-2">
                <input
                  value={settingsData.bulkHeading || ""}
                  onChange={(e) => handleSettingChange("bulkHeading", e.target.value)}
                  placeholder="Section heading"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={settingsData.bulkSubtext || ""}
                  onChange={(e) => handleSettingChange("bulkSubtext", e.target.value)}
                  placeholder="Section subtext"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
                <input
                  value={settingsData.bulkButtonText || ""}
                  onChange={(e) => handleSettingChange("bulkButtonText", e.target.value)}
                  placeholder="Button text"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-brown mb-3">
                Final CTA Section (Dark Brown)
              </h3>
              <div className="space-y-2">
                <input
                  value={settingsData.ctaHeading || ""}
                  onChange={(e) => handleSettingChange("ctaHeading", e.target.value)}
                  placeholder="CTA heading"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
                <input
                  value={settingsData.ctaSubtext || ""}
                  onChange={(e) => handleSettingChange("ctaSubtext", e.target.value)}
                  placeholder="CTA subtext"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
                <input
                  value={settingsData.ctaButtonText || ""}
                  onChange={(e) => handleSettingChange("ctaButtonText", e.target.value)}
                  placeholder="Button text"
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Orders & Delivery Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Orders & Delivery
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                value={settingsData.minOrderAmount || "240"}
                onChange={(e) => handleSettingChange("minOrderAmount", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
              <p className="text-xs text-brown/40 mt-1">
                Cart checkout unlocks above this amount
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Delivery Info Text
              </label>
              <input
                value={settingsData.deliveryInfo || ""}
                onChange={(e) => handleSettingChange("deliveryInfo", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="Shipped via India Post · 5-7 days"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Business Hours
              </label>
              <input
                value={settingsData.businessHours || ""}
                onChange={(e) => handleSettingChange("businessHours", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="Mon–Sat: 9AM to 6PM IST"
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            SEO Settings
          </h2>
          <p className="text-sm text-brown/50 mb-4">
            Controls how your site appears in Google search results.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Page Title (shown in browser tab and Google)
              </label>
              <input
                value={settingsData.seoTitle || ""}
                onChange={(e) => handleSettingChange("seoTitle", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="Vishwasa - Traditional South Indian Snacks"
              />
              <p className="text-xs text-brown/40 mt-1">
                Keep under 60 characters for best results
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Meta Description (shown in Google results)
              </label>
              <textarea
                rows={2}
                value={settingsData.seoDescription || ""}
                onChange={(e) => handleSettingChange("seoDescription", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="Mother's Trust, Nature's Best..."
              />
              <p className="text-xs text-brown/40 mt-1">
                Keep under 160 characters for best results
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Footer
          </h2>
          <div>
            <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
              Footer About Text
            </label>
            <textarea
              rows={3}
              value={settingsData.footerAbout || ""}
              onChange={(e) =>
                handleSettingChange("footerAbout", e.target.value)
              }
              className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              placeholder="Short blurb about the company for the footer..."
            />
          </div>
        </section>

        {/* Checkout & Social */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            Checkout & Social
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                WhatsApp Checkout Greeting
              </label>
              <textarea
                rows={2}
                value={settingsData.checkoutGreeting || ""}
                onChange={(e) =>
                  handleSettingChange("checkoutGreeting", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Checkout Warning Text
              </label>
              <input
                value={settingsData.deliveryWarning || ""}
                onChange={(e) =>
                  handleSettingChange("deliveryWarning", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Instagram Handle
              </label>
              <input
                value={settingsData.instagramHandle || ""}
                onChange={(e) =>
                  handleSettingChange("instagramHandle", e.target.value)
                }
                placeholder="@vishwasafoods"
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* About Page */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">
            About Page
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                About Title
              </label>
              <input
                value={settingsData.aboutTitle || "Our Story"}
                onChange={(e) =>
                  handleSettingChange("aboutTitle", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                About Paragraph
              </label>
              <textarea
                rows={4}
                value={settingsData.aboutText || ""}
                onChange={(e) =>
                  handleSettingChange("aboutText", e.target.value)
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-brown/10">
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 1</h3>
                <input
                  value={settingsData.aboutFeature1Title || "Made with Love"}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature1Title", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature1Desc || ""}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature1Desc", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 2</h3>
                <input
                  value={settingsData.aboutFeature2Title || "No Compromise"}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature2Title", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature2Desc || ""}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature2Desc", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 3</h3>
                <input
                  value={settingsData.aboutFeature3Title || "Authentic Taste"}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature3Title", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature3Desc || ""}
                  onChange={(e) =>
                    handleSettingChange("aboutFeature3Desc", e.target.value)
                  }
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Save Bar for Mobile/Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50 md:bottom-12">
        <div className="bg-white/80 backdrop-blur-xl border border-brown/10 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-6">
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-brown/40 uppercase tracking-widest">Unsaved Changes</p>
            <p className="text-sm font-semibold text-brown/80">Site Content Editor</p>
          </div>
          <SaveButton onClick={handleSettingsSave} saving={saving} full />
        </div>
      </div>
    </div>
  );
}

function SaveButton({ onClick, saving, full }: { onClick: () => void; saving: boolean; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={`${full ? 'w-full sm:w-auto' : ''} bg-orange hover:bg-orange-light text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-orange/20 transition-all active:scale-95 disabled:opacity-50 group font-serif`}
    >
      {saving ? (
        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
      ) : (
        <Save size={20} className="group-hover:rotate-12 transition-transform" />
      )}
      <span>{saving ? "Publishing..." : "Save & Push Live"}</span>
    </button>
  );
}
