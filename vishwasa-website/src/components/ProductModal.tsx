"use client";

import { X, Check, Plus, Package } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleAddToCart = () => {
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown/40 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative transition-all duration-300 transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-cream text-brown hover:text-orange p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-[auto] min-h-[300px] relative bg-cream">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brown/20">
                <Package size={80} strokeWidth={1} />
              </div>
            )}
            
            {/* Badges on Image */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.badge && product.badge !== "none" && (
                <div className={`text-white px-4 py-1.5 rounded-full font-bold shadow-lg uppercase text-xs tracking-widest ${
                  product.badge === "new" ? "bg-green-600" : 
                  product.badge === "bestseller" ? "bg-orange" : 
                  product.badge === "limited" ? "bg-[#874721]" : "bg-gray-500"
                }`}>
                  {product.badge === "limited" ? "Limited Edition" : product.badge}
                </div>
              )}
              <div className="bg-orange text-white px-4 py-1.5 rounded-full font-bold shadow-lg text-lg">
                {product.price}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brown mb-2">
                {product.name}
              </h2>
              {product.category && (
                <span className="text-orange font-bold uppercase tracking-widest text-xs">
                  {product.category}
                </span>
              )}
            </div>

            <p className="text-brown/80 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {product.ingredients && (
              <div className="mb-8">
                <h4 className="font-bold text-brown uppercase text-sm tracking-widest mb-3 border-b border-brown/10 pb-2">
                  Ingredients
                </h4>
                <p className="text-brown/70 whitespace-pre-wrap leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-8">
              {product.shelf_life && (
                <div>
                  <h4 className="font-bold text-brown/50 uppercase text-[10px] tracking-widest mb-1">
                    Shelf Life
                  </h4>
                  <p className="text-brown/70 font-medium">{product.shelf_life}</p>
                </div>
              )}
              {product.storage && (
                <div>
                  <h4 className="font-bold text-brown/50 uppercase text-[10px] tracking-widest mb-1">
                    Storage
                  </h4>
                  <p className="text-brown/70 font-medium">{product.storage}</p>
                </div>
              )}
            </div>

            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {highlights.map((h: string, i: number) => h.trim() && (
                  <span
                    key={i}
                    className="text-xs bg-cream text-brown px-3 py-1.5 rounded-full font-bold border border-brown/10 tracking-wide uppercase"
                  >
                    {h.trim()}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className={`mt-auto w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                added 
                  ? "bg-green-600 text-white" 
                  : "bg-orange hover:bg-orange-light text-white"
              }`}
            >
              {added ? (
                <>
                  <Check size={24} />
                  Added!
                </>
              ) : (
                <>
                  <Plus size={24} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
