"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingBag, Trash2, Package } from "lucide-react";
import Image from "next/image";
import { useSettings } from "../context/SettingsContext";
import { useRouter } from "next/navigation";

const MIN_ORDER = 240;

export default function CartSidebar() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();
  const settings = useSettings();
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [upsellProducts, setUpsellProducts] = useState<any[]>([]);
  const [upsellLoading, setUpsellLoading] = useState(false);

  const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const total = cart.reduce(
    (sum: number, item: any) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const cartIds = new Set(cart.map((item: any) => item.id));
  const remaining = MIN_ORDER - total;
  const belowMin = total < MIN_ORDER;

  // Fetch upsell products when cart is open and below minimum
  useEffect(() => {
    if (!isCartOpen || cart.length === 0 || !belowMin) return;
    setUpsellLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const all: any[] = data.products || [];
        setUpsellProducts(all.filter((p: any) => !cartIds.has(p.id)).slice(0, 10));
      })
      .catch(() => {/* fail silently */})
      .finally(() => setUpsellLoading(false));
  }, [isCartOpen, cart.length, belowMin]); // eslint-disable-line

  const handleCheckout = () => {
    if (belowMin) return;

    if (!name.trim() || !address.trim()) {
      alert("Please enter your name and delivery address to continue.");
      return;
    }

    const whatsappNumber = settings.whatsappNumber;
    let text = settings.checkoutGreeting + "\n\n";
    cart.forEach((item: any) => {
      text += "- " + item.quantity + "x " + item.name + " (" + item.price + ")\n";
    });
    text += "\n*Grand Total: \u20B9" + total + "*\n";
    text += "\nMy Delivery Details:\nName: " + name + "\nAddress: " + address + "\n";

    const encodedText = encodeURIComponent(text);
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    window.open("https://wa.me/" + cleanNumber + "?text=" + encodedText, "_blank");
    clearCart();
    setIsCartOpen(false);
  };

  const overlayClass = isCartOpen
    ? "fixed inset-0 bg-brown/20 z-[110] backdrop-blur-md transition-all duration-500 opacity-100"
    : "fixed inset-0 bg-brown/20 z-[110] backdrop-blur-md transition-all duration-500 opacity-0 pointer-events-none";

  const drawerClass = isCartOpen
    ? "fixed inset-y-0 right-0 w-full max-w-md glass shadow-2xl z-[120] flex flex-col transition-all duration-500 ease-out transform translate-x-0"
    : "fixed inset-y-0 right-0 w-full max-w-md glass shadow-2xl z-[120] flex flex-col transition-all duration-500 ease-out transform translate-x-full";

  return (
    <>
      <div className={overlayClass} onClick={() => setIsCartOpen(false)} />

      <div className={drawerClass}>
        <div className="flex items-center justify-between p-6 bg-white/40 backdrop-blur-xl border-b border-brown/10 shrink-0">
          <h2 className="text-2xl font-serif font-bold text-brown flex items-center gap-3">
            <ShoppingBag className="text-orange" size={24} /> Your Bag
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-brown/10 p-2 rounded-full transition-all text-brown/60 hover:text-brown"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Progress Bar Section */}
        {cart.length > 0 && (
          <div className="px-6 py-4 bg-white/60 border-b border-brown/5 shrink-0 animate-fade-in shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <span className={`text-xs font-bold tracking-wide ${belowMin ? "text-brown/70" : "text-green-700"}`}>
                {belowMin ? `Add ₹${remaining} more to unlock checkout` : "🎉 You're good to go!"}
              </span>
              <span className="text-[10px] font-bold text-brown/50 bg-brown/5 px-2 py-0.5 rounded-full">
                ₹{total} / ₹240
              </span>
            </div>
            <div className="h-1.5 w-full bg-brown/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ease-out ${belowMin ? "bg-orange" : "bg-green-600"}`}
                style={{ width: `${Math.min((total / MIN_ORDER) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-2 pb-6 space-y-6 bg-cream/30 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-brown/40 animate-fade-in">
              <div className="bg-white p-8 rounded-full mb-6 shadow-sm border border-brown/5">
                <ShoppingBag size={56} strokeWidth={1} className="text-brown/30" />
              </div>
              <p className="font-serif text-2xl font-bold text-brown/80 mb-2">
                Your bag is empty
              </p>
              <p className="max-w-[220px] text-sm text-brown/60">
                Add at least 2 packs to place an order (min. ₹240)
              </p>
              <button
                onClick={() => { setIsCartOpen(false); router.push("/products"); }}
                className="mt-8 bg-orange hover:bg-orange-light text-white px-6 py-3 rounded-full font-bold shadow-md transition-all hover:shadow-lg"
              >
                Browse Snacks
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-5 border-b border-brown/10 last:border-0 animate-fade-up group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden shrink-0 relative border border-brown/10 shadow-sm transition-transform group-hover:scale-[1.02]">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl text-brown/20 bg-cream/20">
                        <Package size={28} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-brown text-base sm:text-lg leading-tight line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-brown/30 hover:text-red-500 p-1 -mr-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <div className="text-orange font-bold text-lg">
                        {item.price}
                      </div>
                      <div className="flex items-center bg-white shadow-sm border border-brown/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-brown hover:bg-brown/5 transition-colors"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="font-bold text-brown text-sm w-8 text-center bg-cream/20 py-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-brown hover:bg-brown/5 transition-colors"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell Panel — structured cleaner */}
              {belowMin && (
                <div className="mt-8 pt-6 border-t border-brown/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px bg-brown/10 flex-1"></div>
                    <p className="font-serif italic text-brown/60 text-sm">
                      Often bought together
                    </p>
                    <div className="h-px bg-brown/10 flex-1"></div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {upsellLoading
                      ? [0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="shrink-0 w-[120px] h-[140px] bg-white/50 border border-brown/5 rounded-xl animate-pulse"
                          />
                        ))
                      : upsellProducts.map((p: any) => (
                          <div
                            key={p.id}
                            className="shrink-0 flex flex-col snap-start bg-white rounded-2xl p-3 shadow-sm border border-brown/5 w-[130px] hover:shadow-md transition-shadow relative group"
                          >
                            <div className="relative w-full aspect-square mb-3 rounded-xl bg-cream/30 overflow-hidden mix-blend-multiply flex items-center justify-center shrink-0">
                              {p.image_url ? (
                                <Image
                                  src={p.image_url}
                                  alt={p.name}
                                  fill
                                  sizes="100px"
                                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <Package size={24} className="text-brown/20" strokeWidth={1} />
                              )}
                              <button
                                onClick={() =>
                                  addToCart({
                                    id: p.id,
                                    name: p.name,
                                    price: p.price,
                                    image_url: p.image_url,
                                  })
                                }
                                className="absolute bottom-1 right-1 bg-white hover:bg-orange hover:text-white text-brown w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                              >
                                <Plus size={16} strokeWidth={2.5} />
                              </button>
                            </div>
                            <h5 className="text-[11px] font-bold text-brown leading-tight line-clamp-2 mb-1 flex-1">
                              {p.name}
                            </h5>
                            <p className="text-xs text-orange font-bold">
                              {p.price}
                            </p>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-10 shrink-0 border-t border-brown/10">
            <div className="p-6 pb-8">
              {!belowMin && (
                <div className="mb-5 space-y-3 animate-fade-in">
                  <div className="bg-brown/5 rounded-2xl p-2 border border-brown/10 outline-none focus-within:border-orange/50 focus-within:bg-white transition-all">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-sm text-brown placeholder:text-brown/40 focus:outline-none"
                    />
                  </div>
                  <div className="bg-brown/5 rounded-2xl p-2 border border-brown/10 outline-none focus-within:border-orange/50 focus-within:bg-white transition-all">
                    <textarea
                      placeholder="Full Delivery Address"
                      value={address}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-sm text-brown placeholder:text-brown/40 h-16 resize-none focus:outline-none custom-scrollbar"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                  <span className="font-serif text-lg text-brown/70">Grand Total</span>
                  <span className="text-3xl font-bold text-brown">₹{total}</span>
                </div>

                {belowMin ? (
                  <button
                    disabled
                    className="w-full bg-cream text-brown/40 py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-brown/10"
                  >
                    Add ₹{remaining} more to checkout
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange hover:bg-orange-light text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    Order via WhatsApp
                  </button>
                )}
                {!belowMin && (
                  <p className="text-[10px] text-center text-brown/40 mt-1 font-medium bg-cream/50 py-1.5 rounded-lg border border-brown/5">
                    <span className="mr-1">🔒</span> {settings.deliveryWarning || "Secure checkout. Shipping via India Post (5-7 days)"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
