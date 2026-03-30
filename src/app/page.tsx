import { sql } from "@vercel/postgres";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProducts: any[] = [];
  let initialSettings: any = {};

  try {
    const { rows: productRows } = await sql`
      SELECT * FROM products
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 8;
    `;
    featuredProducts = productRows;

    const { rows: settingsRows } = await sql`SELECT key, value FROM website_settings;`;
    initialSettings = settingsRows.reduce(
      (acc: Record<string, string>, row) => ({ ...acc, [row.key]: row.value }),
      {}
    );
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    featuredProducts = [];
    initialSettings = {};
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {/* Trust Strip */}
      <div className="bg-brown py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              { label: "FSSAI Licensed" },
              { label: "No Preservatives" },
              { label: "Ships Pan-India" },
              { label: "Fresh Every Batch" },
            ].map(({ label }) => (
              <div key={label} 
                className="flex items-center justify-center gap-1 md:gap-2 text-cream">
                <span className="text-xs md:text-sm font-semibold text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-10 md:py-20 bg-cream/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brown mb-4">Our Snacks</h2>
              <p className="text-lg text-brown/60">Traditional recipes, freshly prepared.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Order */}
      <section className="py-12 md:py-20 bg-white border-y border-brown/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-orange font-bold uppercase tracking-widest text-sm">
              Simple Process
            </span>
            <h2 className="font-serif text-4xl font-bold text-brown mt-3">
              How to Order
            </h2>
            <p className="text-brown/60 mt-3 max-w-lg mx-auto leading-relaxed">
              No complicated checkout. Add snacks, fill your details, 
              and confirm on WhatsApp. Done.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-orange/20 z-0" />
            {[
              {
                step: "01",
                title: "Add Snacks to Cart",
                desc: "Browse our collection and add your favourites. Minimum order is ₹240 — usually 2 packs."
              },
              {
                step: "02",
                title: "Enter Your Details",
                desc: "Fill in your name and full delivery address in the cart. We deliver pan-India."
              },
              {
                step: "03",
                title: "Confirm on WhatsApp",
                desc: "Tap the WhatsApp button. We confirm your order and dispatch within 1-2 business days."
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-xl shadow-orange/20">
                  <span className="text-white font-bold text-lg md:text-xl font-serif">{item.step}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brown mb-3">{item.title}</h3>
                <p className="text-brown/60 leading-relaxed text-sm max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — Story Preview */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="bg-cream rounded-3xl h-64 md:h-80 lg:h-96 p-4 md:p-6 flex flex-col items-center justify-center gap-3">
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {featuredProducts.slice(0, 4).map((product: any) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden aspect-square relative shadow-sm border border-brown/5"
                  >
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain mix-blend-multiply"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-light" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-brown/40 text-xs font-bold uppercase tracking-widest text-center">
                Fresh from our kitchen
              </p>
            </div>
            <div>
              <span className="text-orange font-bold uppercase 
                tracking-widest text-sm">
                Our Story
              </span>
              <h2 className="font-serif text-4xl font-bold 
                text-brown mt-3 mb-6">
                Made the way it used to be
              </h2>
              <p className="text-brown/70 leading-relaxed text-lg 
                mb-8 whitespace-pre-wrap">
                {initialSettings.aboutText || "Vishwasa was born out of a simple desire: to bring back the authentic taste of our grandmothers' kitchens. Better ingredients. No shortcuts. No compromise."}
              </p>
              <Link
                href="/about"
                className="inline-block border-2 border-brown 
                  text-brown font-bold py-3 px-8 rounded-full 
                  hover:bg-brown hover:text-cream transition-all duration-300"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Combo Psychology */}
      <section className="py-12 md:py-24 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
          text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brown mb-3 md:mb-4">
            Perfect for Sharing
          </h2>
          <p className="text-lg text-brown/60 mb-12 max-w-xl mx-auto">
            Pick any 2 packs to place an order — minimum ₹240, 
            delivered to your door.
          </p>
          {featuredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Link
            href="/products"
            className="inline-block bg-orange hover:bg-orange-light 
              text-white font-bold py-4 px-10 rounded-full shadow-lg 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Browse All Snacks
          </Link>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-[32px] p-7 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 border border-brown/10">
            <div>
              <span className="text-orange font-bold uppercase tracking-widest text-xs">
                Bulk & Corporate
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brown mt-2 mb-2 md:mb-3">
                Ordering for office or events?
              </h3>
              <p className="text-brown/60 max-w-md leading-relaxed">
                We offer bulk pricing and custom packaging for corporate gifting, office snack boxes, and festive hampers. Minimum 10 packs.
              </p>
            </div>
            <a
              href={`https://wa.me/${initialSettings.whatsappNumber || '918310236708'}?text=${encodeURIComponent('Hi Vishwasa, I am interested in bulk or corporate ordering. Please share details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto shrink-0 bg-brown hover:bg-brown-dark text-cream font-bold py-4 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg text-center"
            >
              WhatsApp for Bulk Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Section 3 — Final CTA */}
      <section className="py-14 md:py-24 bg-brown">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 
          text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream mb-3 md:mb-4">
            Ready to taste real tradition?
          </h2>
          <p className="text-cream/70 text-base md:text-xl mb-6 md:mb-10">
            No preservatives. No palm oil. Just honest snacks.
          </p>
          <a
            href={`https://wa.me/${initialSettings.whatsappNumber || '918310236708'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange hover:bg-orange-light 
              text-white font-bold py-4 px-10 rounded-full shadow-xl 
              hover:shadow-2xl hover:-translate-y-1 
              transition-all duration-300 text-lg"
          >
            Order Now on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
