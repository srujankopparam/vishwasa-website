"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/context/SettingsContext";

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const settings = useSettings();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const parsePrice = (priceStr: string) => {
    const raw = priceStr.replace(/[^0-9]/g, '');
    return parseInt(raw) || 0;
  };

  const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (!name.trim() || !address.trim()) {
      alert("Please enter your name and delivery address to continue.");
      return;
    }

    const whatsappNumber = settings.whatsappNumber; 
    
    let text = `${settings.checkoutGreeting}\n\n`;
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    text += `\n*Grand Total: ₹${total}*\n`;
    text += `\nMy Delivery Details:\nName: ${name}\nAddress: ${address}\n`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col transform transition-transform border-l-4 border-brown">
        
        <div className="flex items-center justify-between p-4 bg-brown text-cream border-b border-white/20">
          <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
            <ShoppingBag /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
             <div className="text-center text-brown/60 mt-12 flex flex-col items-center gap-4">
                <ShoppingBag size={48} className="opacity-50" />
                <p className="font-medium text-lg">Your cart is completely empty!</p>
             </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-brown/10">
                  <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden shrink-0 relative border border-brown/5">
                    {item.image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🍪</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-brown leading-tight line-clamp-2">{item.name}</h4>
                      <div className="text-sm text-orange font-medium mt-1">{item.price}</div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                       <div className="flex items-center gap-3 bg-cream px-2 py-1 rounded-lg border border-brown/10">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-brown hover:text-orange"><Minus size={16} /></button>
                          <span className="font-bold text-brown w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-brown hover:text-orange"><Plus size={16} /></button>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors" aria-label="Remove item">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 border-brown/10 bg-white p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
             <div className="mb-4 space-y-3">
               <label className="font-bold text-brown mb-2 text-sm uppercase tracking-wider block">{settings.deliveryWarning}</label>
               <input 
                 type="text" 
                 placeholder="Your Full Name" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full border-2 border-cream rounded-lg px-3 py-2 text-brown focus:outline-none focus:border-orange transition-colors"
               />
               <textarea 
                 placeholder="Full Delivery Address" 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 className="w-full border-2 border-cream rounded-lg px-3 py-2 text-brown h-20 resize-none focus:outline-none focus:border-orange transition-colors"
               />
             </div>

             <div className="flex justify-between items-end mb-4 pt-4 border-t-2 border-cream border-dashed">
                <span className="font-medium text-brown/70">Grand Total</span>
                <span className="text-3xl font-bold text-brown">₹{total}</span>
             </div>
             
             <button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-lg"
             >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Checkout on WhatsApp
             </button>
          </div>
        )}
      </div>
    </>
  );
}
