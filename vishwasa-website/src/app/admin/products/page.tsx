"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, Search, Filter, Package } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import ProductForm from "../../../components/admin/ProductForm";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filterCategory]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert("Failed to delete product. Check your session.");
        return;
      }
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    closeForm();
    fetchProducts();
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-brown/40 gap-4">
        <div className="animate-spin w-10 h-10 border-4 border-orange/20 border-t-orange rounded-full" />
        <p className="font-serif font-medium animate-pulse">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-up">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-orange mb-1">
            <Package size={20} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Inventory</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-brown">
            Product <span className="text-orange">Catalog</span>
          </h1>
          <p className="text-brown/50 font-medium">Add, edit, or remove snacks from your menu.</p>
        </div>
        {!isAdding && !editingProduct && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-orange hover:bg-orange-light text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-orange/20 transition-all active:scale-95 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {isAdding || editingProduct ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ProductForm
            initialData={editingProduct || undefined}
            onSave={handleSave}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="space-y-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {/* Controls Bar */}
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-brown/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/30" size={18} />
              <input 
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream/50 border border-brown/5 rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all text-brown"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="text-brown/40" size={18} />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 md:w-48 bg-cream/50 border border-brown/5 rounded-2xl py-3 px-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all text-brown font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="Savories">Savories</option>
                <option value="Sweets">Sweets</option>
                <option value="Limited Edition">Limited Edition</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/50 rounded-[40px] border-2 border-dashed border-brown/10">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mb-6">
                  <Package size={32} className="text-brown/20" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brown mb-2">No items found</h3>
                <p className="text-brown/50">Try adjusting your search or category filters.</p>
              </div>
            )}
            {filteredProducts.map((p: any, idx) => (
              <div
                key={p.id}
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange/10 border border-brown/5 transition-all duration-500 flex flex-col animate-fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="h-60 bg-cream relative overflow-hidden">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl grayscale opacity-30">
                      🍪
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {p.category && (
                      <span className="bg-orange/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-lg font-bold text-brown shadow-xl border border-brown/5">
                    ₹{p.price}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif font-bold text-2xl text-brown mb-2 group-hover:text-orange transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-brown/50 text-sm leading-relaxed line-clamp-2 mb-8 flex-1 italic">
                    &ldquo;{p.description}&rdquo;
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-brown/5">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="bg-cream/50 hover:bg-orange hover:text-white text-brown/70 py-3.5 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 border border-transparent hover:shadow-lg hover:shadow-orange/20"
                    >
                      <Edit2 size={18} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-50/50 hover:bg-red-500 hover:text-white text-red-500 py-3.5 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 border border-transparent hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
