"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartFAB() {
  const { cart, setIsCartOpen } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 bg-brown text-cream p-4 rounded-full shadow-2xl hover:bg-orange transition-all hover:scale-110 z-40 border-4 border-cream flex items-center justify-center group"
      aria-label="Open Shopping Cart"
    >
      <ShoppingBag size={28} />
      <span className="absolute -top-3 -right-3 bg-orange text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-cream shadow-md">
        {totalItems}
      </span>
    </button>
  );
}
