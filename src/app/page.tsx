import { sql } from "@vercel/postgres";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProducts: any[] = [];
  let settings: any = {};

  try {
    const { rows: productRows } = await sql`
      SELECT * FROM products
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 8;
    `;
    featuredProducts = productRows;

    const { rows: settingsRows } = await sql`SELECT key, value FROM website_settings;`;
    settings = settingsRows.reduce(
      (acc: Record<string, string>, row) => ({ ...acc, [row.key]: row.value }),
      {}
    );
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    featuredProducts = [];
    settings = {};
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-cream/20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl sm:text-6xl font-black text-brown mb-4 tracking-tight">
                Our Snacks
              </h2>
              <p className="text-xl text-brown/60 font-medium">
                Traditional recipes, freshly prepared.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-light text-white font-black py-5 px-12 rounded-2xl shadow-xl shadow-orange/20 transition-all duration-300 hover:-translate-y-1"
              >
                View Full Collection
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Story Preview Section */}
      <section className="py-24 bg-white border-y border-brown/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-video bg-cream rounded-[40px] flex items-center justify-center overflow-hidden border-2 border-dashed border-brown/10 group">
              <div className="text-center">
                <span className="font-serif text-3xl text-brown/20 italic">Our Kitchen</span>
              </div>
              <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-8">
              <div className="inline-block text-orange font-black text-xs uppercase tracking-widest bg-orange/5 px-4 py-2 rounded-full border border-orange/10">
                Our Story
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-black text-brown leading-tight">
                Made the way it <span className="text-orange">used to be</span>
              </h2>
              <p className="text-xl text-brown/70 leading-relaxed font-medium whitespace-pre-wrap">
                {settings.aboutText || "Bringing back the authentic taste of traditional kitchens."}
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-brown font-black text-lg border-b-2 border-orange pb-2 hover:text-orange transition-colors"
                >
                  Read Our Full Story
                  <ArrowRight size={24} className="text-orange" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combo Psychology Section */}
      <section className="py-24 bg-cream/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-orange/5 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-brown">
              Perfect for <span className="text-orange italic">Sharing</span>
            </h2>
            <p className="text-lg text-brown/60 font-medium">
              Pick any 2 packs — that&apos;s all you need to place an order (min. ₹240)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {featuredProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="bg-white hover:bg-brown hover:text-white text-brown font-black py-5 px-12 rounded-2xl border border-brown/10 shadow-lg shadow-brown/5 transition-all duration-300 flex-inline items-center gap-3"
            >
              Browse All Snacks
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cream blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange blur-3xl rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          <h2 className="font-serif text-5xl sm:text-7xl font-black text-white leading-tight">
            Ready to taste <br />
            <span className="text-orange italic">real tradition?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/60 font-medium max-w-2xl mx-auto">
            No preservatives. No palm oil. Just honest snacks, delivered fresh to your door.
          </p>
          <div className="pt-6">
            <a
              href={`https://wa.me/${(settings.whatsappNumber || "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-orange hover:bg-orange-light text-white font-black text-2xl py-6 px-12 rounded-3xl shadow-2xl shadow-orange/30 transition-all duration-300 hover:-translate-y-2 active:scale-95 group"
            >
              <MessageCircle size={32} className="fill-current group-hover:rotate-12 transition-transform" />
              Order Now on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
