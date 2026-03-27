"use client";

import { useState, useEffect } from "react";
import { Globe, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ContentEditor() {
  const [settingsData, setSettingsData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettingsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettingsData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSettingsSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: token, settings: settingsData }),
      });
      if (res.ok) {
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
    return <div className="p-8 animate-pulse text-brown/50">Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brown">Content Editor</h1>
          <p className="text-brown/70 mt-1">Edit all visible text across the website.</p>
        </div>
        <button
          onClick={handleSettingsSave}
          disabled={saving}
          className="bg-orange hover:bg-orange-light text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
        >
          {saving ? <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <Save size={20} />}
          {saving ? "Saving..." : "Save & Push Live"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Global Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown flex items-center gap-2">
            <Globe size={20} className="text-orange" /> Global & Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Brand Name</label>
              <input
                value={settingsData.brandName || "Vishwasa Foods"}
                onChange={(e) => handleSettingChange("brandName", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">WhatsApp Number</label>
              <input
                value={settingsData.whatsappNumber || ""}
                onChange={(e) => handleSettingChange("whatsappNumber", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                placeholder="e.g. 919876543210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Contact Email</label>
              <input
                value={settingsData.contactEmail || ""}
                onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Physical Address</label>
              <textarea
                rows={2}
                value={settingsData.contactAddress || ""}
                onChange={(e) => handleSettingChange("contactAddress", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Homepage Hero */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">Home Page Hero</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Hero Title</label>
              <input
                value={settingsData.heroTitle || "Mother's Trust, Nature's Best"}
                onChange={(e) => handleSettingChange("heroTitle", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Hero Subtitle</label>
              <textarea
                rows={2}
                value={settingsData.heroSubtitle || "Traditional South Indian snacks made with uncompromising quality. No palm oil, just pure butter and cold-pressed oils."}
                onChange={(e) => handleSettingChange("heroSubtitle", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Trust Elements */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">Trust Elements (Features)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 1</h3>
              <input
                value={settingsData.feature1Title || "No Palm Oil"}
                onChange={(e) => handleSettingChange("feature1Title", e.target.value)}
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={settingsData.feature1Desc || "Absolutely zero palm oil in any of our products."}
                onChange={(e) => handleSettingChange("feature1Desc", e.target.value)}
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 2</h3>
              <input
                value={settingsData.feature2Title || "Cold Pressed Oils"}
                onChange={(e) => handleSettingChange("feature2Title", e.target.value)}
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={settingsData.feature2Desc || "Made exclusively using groundnut and sesame cold pressed oils."}
                onChange={(e) => handleSettingChange("feature2Desc", e.target.value)}
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-brown">Feature 3</h3>
              <input
                value={settingsData.feature3Title || "Butter Based"}
                onChange={(e) => handleSettingChange("feature3Title", e.target.value)}
                placeholder="Title"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
              <textarea
                rows={3}
                value={settingsData.feature3Desc || "Authentic recipes made rich and melt-in-mouth with pure butter."}
                onChange={(e) => handleSettingChange("feature3Desc", e.target.value)}
                placeholder="Description"
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">Footer</h2>
          <div>
            <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Footer About Text</label>
            <textarea
              rows={3}
              value={settingsData.footerAbout || ""}
              onChange={(e) => handleSettingChange("footerAbout", e.target.value)}
              className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              placeholder="Short blurb about the company for the footer..."
            />
          </div>
        </section>

        {/* About Page */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-brown/10">
          <h2 className="text-xl font-bold mb-4 font-serif text-brown">About Page</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">About Title</label>
              <input
                value={settingsData.aboutTitle || "Our Story"}
                onChange={(e) => handleSettingChange("aboutTitle", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">About Paragraph</label>
              <textarea
                rows={4}
                value={settingsData.aboutText || ""}
                onChange={(e) => handleSettingChange("aboutText", e.target.value)}
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-brown/10">
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 1</h3>
                <input
                  value={settingsData.aboutFeature1Title || "Made with Love"}
                  onChange={(e) => handleSettingChange("aboutFeature1Title", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature1Desc || ""}
                  onChange={(e) => handleSettingChange("aboutFeature1Desc", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 2</h3>
                <input
                  value={settingsData.aboutFeature2Title || "No Compromise"}
                  onChange={(e) => handleSettingChange("aboutFeature2Title", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature2Desc || ""}
                  onChange={(e) => handleSettingChange("aboutFeature2Desc", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-brown">Feature 3</h3>
                <input
                  value={settingsData.aboutFeature3Title || "Authentic Taste"}
                  onChange={(e) => handleSettingChange("aboutFeature3Title", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <textarea
                  rows={3}
                  value={settingsData.aboutFeature3Desc || ""}
                  onChange={(e) => handleSettingChange("aboutFeature3Desc", e.target.value)}
                  className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
