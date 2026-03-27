"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import ProductForm from "@/components/admin/ProductForm";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
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
      <div className="p-8 animate-pulse text-brown/50">Loading products...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brown">
            Products Menu
          </h1>
          <p className="text-brown/70 mt-1">Manage and edit your snacks.</p>
        </div>
        {!isAdding && !editingProduct && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-orange hover:bg-orange-light text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Plus size={20} /> Add New Product
          </button>
        )}
      </div>

      {isAdding || editingProduct ? (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ProductForm
            initialData={editingProduct || undefined}
            onSave={handleSave}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-brown/10">
              <h3 className="text-xl font-serif text-brown mb-2">
                No products found
              </h3>
              <p className="text-brown/70">
                Click &apos;Add New Product&apos; to get started.
              </p>
            </div>
          )}
          {products.map((p: any) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brown/10 flex flex-col group"
            >
              <div className="h-48 bg-cream relative overflow-hidden">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🍪
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-brown shadow-sm">
                  {p.price || "₹0"}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-xl text-brown mb-1">
                  {p.name}
                </h3>
                <p className="text-brown/60 text-sm line-clamp-2 mb-4 flex-1">
                  {p.description}
                </p>

                <div className="flex gap-2 mt-auto pt-4 border-t border-brown/10">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="flex-1 bg-cream hover:bg-orange hover:text-white text-brown py-2 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-4 bg-cream hover:bg-red-500 hover:text-white text-brown/70 py-2 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
