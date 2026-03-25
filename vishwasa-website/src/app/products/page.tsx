import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { sql } from "@vercel/postgres";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const whatsappNumber = "919876543210";
  let products: any[] = [];
  
  try {
    const { rows } = await sql`SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC;`;
    products = rows;
  } catch (error) {
    // If the database hasn't been set up yet via the /api/setup route, fallback to empty to avoid crashing
    products = [];
  }

  return (
    <div className="py-16 bg-cream/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-4">Our Traditional Sweets & Snacks</h1>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">Made with love, pure butter, and cold-pressed oils. No preservatives. No palm oil.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-brown/10">
            <h2 className="text-2xl font-serif text-brown mb-2">Our menu is being updated!</h2>
            <p className="text-brown/70">Check back soon for our fresh daily snacks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-brown/10 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-64 bg-cream/50 relative overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-brown/20 group-hover:scale-105 transition-transform duration-500">
                      <span className="font-serif text-xl">{product.name}</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-brown">{product.name}</h3>
                    <span className="font-medium text-orange whitespace-nowrap ml-2">{product.price || "₹ Contact"}</span>
                  </div>
                  {product.highlights && (
                    <p className="text-xs font-bold text-green uppercase tracking-wider mb-2">{product.highlights}</p>
                  )}
                  <p className="text-brown/80 mb-6 flex-grow">{product.description}</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Vishwasa, I would like to order ${product.name} (${product.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green hover:bg-green-dark text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto"
                  >
                    <MessageCircle size={20} />
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
