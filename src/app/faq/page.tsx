"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Loader2 } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch((err) => console.error("Error fetching FAQs:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-cream/30 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange/10 rounded-2xl text-orange mb-4">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-brown">
            Frequently Asked Questions
          </h1>
          <p className="text-brown/60 text-lg max-w-xl mx-auto">
            Everything you need to know about our traditional snacks, delivery, and quality standards.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-orange">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-[40px] p-12 text-center border border-brown/5 shadow-xl shadow-brown/5">
            <p className="text-brown/40 font-serif text-2xl italic">
              No questions found yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-[32px] overflow-hidden border border-brown/5 shadow-lg shadow-brown/5 group transition-all duration-300"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left px-8 py-7 flex items-center justify-between hover:bg-cream/50 transition-colors"
                >
                  <span className="text-xl font-bold text-brown pr-8 leading-tight">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl transition-all duration-300 ${openId === faq.id ? "bg-orange text-white rotate-180" : "bg-brown/5 text-brown/40"}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openId === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="h-px bg-brown/5 mb-6" />
                    <p className="text-brown/70 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center p-10 bg-brown rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange hover:bg-orange-light opacity-10 blur-3xl rounded-full" />
          <h3 className="text-white font-serif text-2xl mb-4 relative z-10">Still have questions?</h3>
          <p className="text-white/60 mb-8 relative z-10">We&apos;re here to help you bring tradition to your table.</p>
          <a
            href="https://wa.me/918310236708?text=Hi%20Vishwasa%2C%20I%20have%20a%20question%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange hover:bg-orange-light text-white font-black py-4 px-10 rounded-2xl transition-all relative z-10 shadow-xl shadow-orange/20 flex items-center gap-2 mx-auto w-fit"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
