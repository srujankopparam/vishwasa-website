"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useSettings } from "../context/SettingsContext";

interface ProductListProps {
  initialProducts: any[];
  initialError?: boolean;
}

export default function ProductList({ initialProducts, initialError }: ProductListProps) {
  const settings = useSettings();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "savories", label: "Savories" },
    { id: "sweets", label: "Sweets" },
    { id: "limited", label: "Special Edition" },
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return initialProducts;
    return initialProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, initialProducts]);

  if (initialError) {
    return (
      <div className="w-full bg-white/60 backdrop-blur-sm rounded-3xl border border-brown/10 p-12 text-center animate-fade-in">
        <p className="text-2xl font-serif text-brown mb-3 opacity-70">
          We're having trouble loading our products right now.
        </p>
        <p className="text-brown/50 mb-6">
          Please try again in a moment or WhatsApp us directly to order.
        </p>
        <a
          href={"https://wa.me/" + settings.whatsappNumber}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          Order via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={"px-6 py-2 rounded-full font-bold transition-all duration-300 border-2 " + (
              activeCategory === cat.id
                ? "bg-orange border-orange text-white shadow-lg scale-105"
                : "bg-white/50 border-brown/10 text-brown hover:border-orange/50 hover:bg-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-brown/10 animate-fade-in shadow-inner">
          <h2 className="text-2xl font-serif text-brown mb-2 opacity-70">
            No items in this category yet.
          </h2>
          <p className="text-brown/50">
            We&apos;re currently preparing fresh batches. Stay tuned!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
