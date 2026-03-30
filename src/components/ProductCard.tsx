"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Plus, Check, Package } from "lucide-react";
import Image from "next/image";

type ProductInput = {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  highlights: string;
  badge?: string;
  ingredients?: string;
  shelf_life?: string;
  storage?: string;
  category?: string;
  is_featured?: boolean;
  visibility?: string;
};

import ProductModal from "./ProductModal";

export default function ProductCard({ product }: { product: ProductInput }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const highlights = product.highlights ? product.highlights.split(",") : [];

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brown/10 flex flex-col hover:shadow-xl transition-shadow group cursor-pointer"
      >
      <div className="relative h-48 sm:h-64 bg-cream overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-brown/20">
            <Package className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1} />
          </div>
        )}
        {product.badge && product.badge !== "none" && (
          <div className={`absolute top-2 left-2 sm:top-4 sm:left-4 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold shadow-md uppercase text-[8px] sm:text-[10px] tracking-widest z-10 ${
            product.badge === "new" ? "bg-green-600" : 
            product.badge === "bestseller" ? "bg-orange" : 
            product.badge === "limited" ? "bg-[#874721]" : "bg-gray-500"
          }`}>
            {product.badge === "limited" ? "Limited Edition" : product.badge}
          </div>
        )}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-orange text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold shadow-md text-xs sm:text-base">
          {isNaN(Number(product.price)) ? product.price : `₹${product.price}`}
        </div>
      </div>

      <div className="p-3 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-base sm:text-2xl font-serif font-bold text-brown mb-1 sm:mb-2 min-h-[2.5rem] sm:min-h-[3.5rem] line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-brown/60 mb-2 sm:mb-4 flex-1 line-clamp-2 text-xs sm:text-sm leading-snug sm:leading-relaxed min-h-[2rem] sm:min-h-[2.5rem]">
          {product.description || "Traditional South Indian snack made with cold-pressed oil and pure butter."}
        </p>

        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-6">
            {highlights.map(
              (h, i) =>
                h.trim() && (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs bg-cream text-brown px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium border border-brown/10 tracking-wide"
                  >
                    {h.trim()}
                  </span>
                )
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-base font-bold transition-all duration-300 ${
            added 
              ? "bg-green-600 text-white" 
              : "bg-orange hover:bg-orange-light text-white shadow-md sm:shadow-lg"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add<span className="hidden sm:inline"> to Cart</span></span>
            </>
          )}
        </button>
      </div>
      </div>
      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}

