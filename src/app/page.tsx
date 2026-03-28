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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "FSSAI Licensed" },
              { label: "No Preservatives" },
              { label: "Ships Pan-India" },
              { label: "Fresh Every Batch" },
            ].map(({ label }) => (
              <div key={label} 
                className="flex items-center justify-center gap-2 text-cream">
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: initialSettings.feature1Title || "No Palm Oil", desc: initialSettings.feature1Desc || "Absolutely zero palm oil in any of our products." },
              { title: initialSettings.feature2Title || "Cold Pressed Oils", desc: initialSettings.feature2Desc || "Made exclusively using groundnut and sesame cold pressed oils." },
              { title: initialSettings.feature3Title || "Butter Based", desc: initialSettings.feature3Desc || "Authentic recipes made rich and melt-in-mouth with pure butter." },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown transition-transform group-hover:scale-110">
                  <span className="font-serif text-3xl font-bold">{i + 1}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown mb-4">{feature.title}</h3>
                <p className="text-brown/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-cream/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brown mb-4">Our Snacks</h2>
              <p className="text-lg text-brown/60">Traditional recipes, freshly prepared.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-brown text-white font-bold py-4 px-10 rounded-full hover:bg-brown/90 transition-all"
              >
                View Full Collection
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 1 — Story Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-cream rounded-3xl h-80 lg:h-96 
              flex items-center justify-center">
              <div className="text-center text-brown/40">
                <p className="font-serif text-2xl font-bold mb-2">
                  Our Kitchen
                </p>
                <p className="text-sm">Photo coming soon</p>
              </div>
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
      <section className="py-24 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
          text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold 
            text-brown mb-4">
            Perfect for Sharing
          </h2>
          <p className="text-lg text-brown/60 mb-12 max-w-xl mx-auto">
            Pick any 2 packs to place an order — minimum ₹240, 
            delivered to your door.
          </p>
          {featuredProducts.length >= 2 && (
            <div className="grid grid-cols-2 gap-6 
              max-w-lg mx-auto mb-12">
              {featuredProducts.slice(0, 2).map((product) => (
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

      {/* Section 3 — Final CTA */}
      <section className="py-24 bg-brown">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 
          text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold 
            text-cream mb-4">
            Ready to taste real tradition?
          </h2>
          <p className="text-cream/70 text-xl mb-10">
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
