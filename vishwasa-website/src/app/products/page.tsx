import { sql } from "@vercel/postgres";
import ProductList from "@/components/ProductList";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: any[] = [];

  try {
    const { rows } = await sql`SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC;`;
    products = rows;
  } catch (error) {
    console.warn("Could not load products:", error);
    products = [];
  }

  return (
    <div className="relative pt-32 pb-24 bg-cream/30 min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange/5 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-brown/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange font-bold text-sm tracking-wider uppercase mb-4">
            Our Collection
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-brown mb-6 leading-tight">
            Traditional <span className="text-orange italic">Snacks</span>
          </h1>
          <p className="text-xl text-brown/70 max-w-2xl mx-auto font-medium">
            Discover the authentic taste of tradition. Made fresh with pure butter, 
            cold-pressed oils, and zero preservatives.
          </p>
        </div>

        <ProductList initialProducts={products} />
      </div>
    </div>
  );
}
