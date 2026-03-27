"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, Save } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function ContentEditor() {
  const [settingsData, setSettingsData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSettingChange = (key: string, value: string) => {
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
