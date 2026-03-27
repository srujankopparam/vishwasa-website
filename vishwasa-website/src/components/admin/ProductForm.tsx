"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type ProductInput = {
  id: number | null;
  name: string;
  description: string;
  price: string;
  image_url: string;
  highlights: string;
  status: string;
};

export default function ProductForm({ 
  initialData, 
  onSave, 
  onCancel 
}: { 
  initialData?: ProductInput; 
  onSave: () => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ProductInput>(
    initialData || { id: null, name: "", description: "", price: "", image_url: "", highlights: "", status: "active" }
  );
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to highly compressed webp Base64 string to fit in DB nicely
        const compressedBase64 = canvas.toDataURL("image/webp", 0.7);
        setFormData((prev) => ({ ...prev, image_url: compressedBase64 }));
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = formData.id ? "PUT" : "POST";
    
    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onSave();
      } else {
        alert("Failed to save product.");
      }
    } catch (err) {
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-brown/10 relative">
      <button onClick={onCancel} className="absolute top-4 right-4 text-brown/50 hover:text-brown bg-cream rounded-full p-2">
        <X size={20} />
      </button>
      
      <h2 className="text-2xl font-serif text-brown mb-6">
        {formData.id ? "Edit Product" : "Add New Product"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Product Name *</label>
              <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Price</label>
              <input value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none" placeholder="e.g. ₹150 for 250g"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Highlights (comma separated)</label>
              <input value={formData.highlights} onChange={e=>setFormData({...formData, highlights: e.target.value})} className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none" placeholder="Cold Pressed, Vegan"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Description</label>
              <textarea rows={4} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"/>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-brown/70 uppercase mb-1">Product Image</label>
             <div 
               className={`mt-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 h-64 transition-colors text-center ${isDragging ? "border-orange bg-orange/5" : "border-brown/20 bg-cream/50 hover:bg-cream"}`}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               onClick={() => fileInputRef.current?.click()}
             >
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
               {formData.image_url ? (
                 <div className="relative w-full h-full">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                     <span className="text-white font-bold flex items-center gap-2"><ImageIcon size={20}/> Change Image</span>
                   </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-brown/60">
                   <UploadCloud size={48} className="mb-4 text-orange" />
                   <p className="font-bold">Click to upload or drag and drop</p>
                   <p className="text-sm mt-1">SVG, PNG, JPG (Max. 800x800px)</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-brown/10">
          <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl font-bold text-brown/70 hover:bg-cream transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="bg-orange hover:bg-orange-light text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50">
            {saving ? <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <CheckCircle size={20} />}
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
