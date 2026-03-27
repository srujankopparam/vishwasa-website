"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
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

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border-2 ${
              activeCategory === cat.id
                ? "bg-orange border-orange text-white shadow-lg scale-105"
                : "bg-white/50 border-brown/10 text-brown hover:border-orange/50 hover:bg-white"
            }`}
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
            We're currently preparing fresh batches. Stay tuned!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
