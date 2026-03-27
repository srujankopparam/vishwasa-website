import Image from "next/image";
import { sql } from "@vercel/postgres";
import ProductCard from "@/components/ProductCard";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products: any[] = [];
  let heroTitle = "Our Traditional Sweets & Snacks";
  let heroSubtitle = "Made with love, pure butter, and cold-pressed oils. No preservatives. No palm oil.";
  
  try {
    const { rows } = await sql`SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC;`;
    products = rows;
    
    try {
      const { rows: textRows } = await sql`SELECT key, value FROM website_settings WHERE key IN ('heroTitle', 'heroSubtitle');`;
      textRows.forEach(r => {
        if (r.key === 'heroTitle') heroTitle = r.value;
        if (r.key === 'heroSubtitle') heroSubtitle = r.value;
      });
    } catch(e) {}

  } catch (error) {
    products = [];
  }

  return (
    <div className="py-16 bg-cream/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-4">{heroTitle}</h1>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto whitespace-pre-wrap">{heroSubtitle}</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-brown/10">
            <h2 className="text-2xl font-serif text-brown mb-2">Our menu is being updated!</h2>
            <p className="text-brown/70">Check back soon for our fresh daily snacks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
