import Image from "next/image";
import { MessageCircle } from "lucide-react";

const products = [
  { id: 1, name: "Butter Murukku", description: "Crispy, melt-in-mouth traditional murukku made with pure butter and rice flour.", price: "₹250", weight: "250g", image: "/placeholder.jpg" },
  { id: 2, name: "Madras Mixture", description: "The classic evening snack. A perfect blend of crunch, spice, and groundnuts.", price: "₹280", weight: "250g", image: "/placeholder.jpg" },
  { id: 3, name: "Ribbon Pakoda", description: "Thin, crispy ribbons of seasoned gram flour. Perfect with filter coffee.", price: "₹220", weight: "250g", image: "/placeholder.jpg" },
  { id: 4, name: "Groundnut Chikki", description: "Crunchy, sweet, and protein-packed chikki made with jaggery.", price: "₹180", weight: "200g", image: "/placeholder.jpg" },
];

export default function ProductsPage() {
  const whatsappNumber = "919876543210";

  return (
    <div className="py-16 bg-cream/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-4">Our Traditional Sweets &amp; Snacks</h1>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">Made with love, pure butter, and cold-pressed oils. No preservatives. No palm oil.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-brown/10 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              <div className="h-64 bg-cream/50 relative overflow-hidden">
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-brown/20 group-hover:scale-105 transition-transform duration-500">
                   <span className="font-serif text-xl">{product.name}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-brown">{product.name}</h3>
                  <span className="font-medium text-orange">{product.price}</span>
                </div>
                <p className="text-sm text-brown/60 mb-2">{product.weight}</p>
                <p className="text-brown/80 mb-6 flex-grow">{product.description}</p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Vishwasa, I would like to order ${product.name} (${product.weight}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green hover:bg-green-dark text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={20} />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
