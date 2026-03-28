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
            href="/#contact"
            className="inline-block bg-orange hover:bg-orange-light text-white font-black py-4 px-10 rounded-2xl transition-all relative z-10 shadow-xl shadow-orange/20"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
