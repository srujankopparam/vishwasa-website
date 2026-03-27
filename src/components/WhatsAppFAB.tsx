"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function WhatsAppFAB() {
  const settings = useSettings();
  const message = encodeURIComponent(
    "Hi Vishwasa, I would like to know more about your products."
  );

  return (
    <a
      href={`https://wa.me/${settings.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 bg-green hover:bg-green-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 z-40 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
