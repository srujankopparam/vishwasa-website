"use client";

import { useCart } from "../context/CartContext";
import { Plus } from "lucide-react";
import Image from "next/image";

type ProductInput = {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  highlights: string;
};

export default function ProductCard({ product }: { product: ProductInput }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const highlights = product.highlights ? product.highlights.split(",") : [];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brown/10 flex flex-col hover:shadow-xl transition-shadow group">
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
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍪
          </div>
        )}
        <div className="absolute top-4 right-4 bg-orange text-white px-3 py-1 rounded-full font-bold shadow-md">
          {product.price}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-brown mb-2">
          {product.name}
        </h3>
        <p className="text-brown/70 mb-4 flex-1 line-clamp-3">
          {product.description}
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
          className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          <Plus size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
