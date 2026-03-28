import { sql } from "@vercel/postgres";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProducts: any[] = [];

  try {
    const { rows } = await sql`
      SELECT * FROM products
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 8;
    `;
    featuredProducts = rows;
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    featuredProducts = [];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {featuredProducts.length > 0 && (
        <section className="py-20 bg-cream/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-3">
                Our Snacks
              </h2>
              <p className="text-lg text-brown/60 font-medium">
                Fresh. Traditional. Made with care.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-orange text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
