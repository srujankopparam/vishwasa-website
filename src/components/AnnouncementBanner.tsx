"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export default function AnnouncementBanner() {
  const settings = useSettings();
  const [dismissed, setDismissed] = useState(false);

  if (
    dismissed ||
    settings.announcementActive !== "true" ||
    !settings.announcementText?.trim()
  ) {
    return null;
  }

  return (
    <div className="bg-orange text-white text-center py-2.5 px-10 text-sm font-semibold relative z-[150]">
      <span>{settings.announcementText}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
