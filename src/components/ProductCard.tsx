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
      <div className="relative h-64 bg-cream overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-brown/20">
            <Package size={64} strokeWidth={1} />
          </div>
        )}
        {product.badge && product.badge !== "none" && (
          <div className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full font-bold shadow-md uppercase text-[10px] tracking-widest z-10 ${
            product.badge === "new" ? "bg-green-600" : 
            product.badge === "bestseller" ? "bg-orange" : 
            product.badge === "limited" ? "bg-[#874721]" : "bg-gray-500"
          }`}>
            {product.badge === "limited" ? "Limited Edition" : product.badge}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-orange text-white px-3 py-1 rounded-full font-bold shadow-md">
          {isNaN(Number(product.price)) ? product.price : `₹${product.price}`}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-brown mb-2 min-h-[3.5rem] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-brown/60 mb-4 flex-1 line-clamp-2 text-sm leading-relaxed min-h-[2.5rem]">
          {product.description || "Traditional South Indian snack made with cold-pressed oil and pure butter."}
        </p>

        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {highlights.map(
              (h, i) =>
                h.trim() && (
                  <span
                    key={i}
                    className="text-xs bg-cream text-brown px-3 py-1 rounded-full font-medium border border-brown/10 tracking-wide"
                  >
                    {h.trim()}
                  </span>
                )
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
            added 
              ? "bg-green-600 text-white" 
              : "bg-orange hover:bg-orange-light text-white shadow-lg"
          }`}
        >
          {added ? (
            <>
              <Check size={20} />
              Added!
            </>
          ) : (
            <>
              <Plus size={20} />
              Add to Cart
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

