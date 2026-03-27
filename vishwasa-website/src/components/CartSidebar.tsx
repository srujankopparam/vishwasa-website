"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/context/SettingsContext";

export default function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();
  const settings = useSettings();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const total = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!name.trim() || !address.trim()) {
      alert("Please enter your name and delivery address to continue.");
      return;
    }

    const whatsappNumber = settings.whatsappNumber;

    let text = `${settings.checkoutGreeting}\n\n`;
    cart.forEach((item) => {
      text += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    text += `\n*Grand Total: ₹${total}*\n`;
    text += `\nMy Delivery Details:\nName: ${name}\nAddress: ${address}\n`;

    const encodedText = encodeURIComponent(text);
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    
    // Use window.location.href for better mobile compatibility (avoiding popup blockers)
    window.location.href = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    clearCart();
    setIsCartOpen(false);
  };

      <div
        className={`fixed inset-0 bg-brown/20 z-[110] backdrop-blur-md transition-all duration-500 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md glass shadow-2xl z-[120] flex flex-col transition-all duration-500 ease-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-brown/10">
          <h2 className="text-3xl font-serif font-bold text-brown flex items-center gap-3">
            <ShoppingBag className="text-orange-gold" /> Your Bag
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-brown/5 p-2 rounded-full transition-colors text-brown"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-brown/40 animate-fade-in">
              <div className="bg-brown/5 p-8 rounded-full mb-6">
                <ShoppingBag size={64} strokeWidth={1} />
              </div>
              <p className="font-serif text-2xl font-bold text-brown/60 mb-2">
                Your bag is empty
              </p>
              <p className="max-w-[200px]">Looks like you haven't added any snacks yet!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-8 text-orange-gold font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, i) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white/50 p-4 rounded-2xl border border-brown/5 animate-fade-up style={{ '--delay': `${i * 100}ms` } as any}"
                >
                  <div className="w-24 h-24 bg-cream-light rounded-2xl overflow-hidden shrink-0 relative border border-brown/5">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍪
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-bold text-brown text-lg leading-tight line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="text-orange-gold font-bold mt-1">
                        {item.price}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 bg-brown/5 px-3 py-1.5 rounded-xl border border-brown/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-brown hover:text-orange-gold transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold text-brown min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-brown hover:text-orange-gold transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-brown/30 hover:text-red-500 p-2 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="glass-solid p-6 border-t border-brown/10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
            <div className="mb-6 space-y-4">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brown/5 border border-brown/10 rounded-xl px-4 py-3 text-brown placeholder:text-brown/40 focus:outline-none focus:border-orange-gold transition-all"
                />
                <textarea
                  placeholder="Full Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-brown/5 border border-brown/10 rounded-xl px-4 py-3 text-brown placeholder:text-brown/40 h-24 resize-none focus:outline-none focus:border-orange-gold transition-all"
                />
              </div>
              <p className="text-[10px] uppercase font-bold text-brown/40 tracking-widest text-center">
                {settings.deliveryWarning}
              </p>
            </div>

            <div className="flex justify-between items-center mb-6 px-2">
              <span className="font-serif text-lg text-brown/60">Grand Total</span>
              <span className="text-4xl font-bold text-brown">₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-teal-700 hover:bg-brown-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-xl"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp to Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
