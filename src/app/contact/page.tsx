"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export default function ContactPage() {
  const settings = useSettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      alert("Please fill in your name and message.");
      return;
    }
    const text = encodeURIComponent(
      `Hi Vishwasa!\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
    );
    window.open(
      `https://wa.me/${settings.whatsappNumber}?text=${text}`,
      "_blank"
    );
  };

  return (
    <div className="py-16 bg-cream/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-brown/70">
            We&apos;d love to hear from you. Reach out for bulk orders or
            feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10">
            <h2 className="font-serif text-2xl font-bold text-brown mb-2">
              Send us a WhatsApp message
            </h2>
            <p className="text-brown/50 text-sm mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green"></span>
              Fills a WhatsApp message — no email involved
            </p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green hover:bg-green-dark text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Send on WhatsApp
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-green/10 p-4 rounded-full text-green">
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">
                  WhatsApp Us
                </h3>
                <p className="text-brown/70 mb-4">
                  Fastest way to order or ask questions.
                </p>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green font-bold hover:underline"
                >
                  +{settings.whatsappNumber}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4">
              <div className="bg-orange/10 p-4 rounded-full text-orange">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">
                  Our Kitchen
                </h3>
                <p className="text-brown/70 whitespace-pre-wrap">
                  {settings.contactAddress}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4">
              <div className="bg-brown/10 p-4 rounded-full text-brown">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">
                  Email Us
                </h3>
                <p className="text-brown/70">{settings.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
