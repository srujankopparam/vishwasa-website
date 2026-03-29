"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type ProductInput = {
  id: number | null;
  name: string;
  description: string;
  price: string;
  image_url: string;
  highlights: string;
  status: string;
  category: string;
  ingredients: string;
  shelf_life: string;
  storage: string;
  badge: string;
  is_featured: boolean;
  visibility: string;
};

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        let width = img.width;
        let height = img.height;
        const maxDim = 1200; // Resize to max 1200px width/height
        
        if (width > height && width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        } else if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            // Keep original filename but use a compressed jpeg format
            resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { 
              type: "image/jpeg", 
              lastModified: Date.now() 
            }));
          } else {
            // Fallback to original if compression fails
            resolve(file);
          }
        }, "image/jpeg", 0.75); // 75% quality JPEG
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export default function ProductForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: ProductInput;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ProductInput>(
    initialData || {
      id: null,
      name: "",
      description: "",
      price: "",
      image_url: "",
      highlights: "",
      status: "active",
      category: "savories",
      ingredients: "",
      shelf_life: "",
      storage: "",
      badge: "none",
      is_featured: false,
      visibility: "active",
    }
  );
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 10MB.");
      return;
    }

    setUploading(true);
    try {
      // Compress the image down so it easily passes Vercel's 4.5MB limits
      const compressedFile = await compressImage(file);
      
      const fd = new FormData();
      fd.append("file", compressedFile);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      
      const textResponse = await res.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        throw new Error(
          res.status === 413 
            ? "File is too large for the server to process."
            : `Server returned an invalid format: ${textResponse.substring(0, 50)}...`
        );
      }

      if (res.ok) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
        if (data.warning) {
          console.warn("Upload warning:", data.warning);
        }
      } else {
        alert(`Image upload failed: ${data.error || "Unknown server error"}`);
      }
    } catch (err: any) {
      alert(`Image upload error: ${err.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = formData.id ? "PUT" : "POST";

    try {
      const res = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-brown/50 hover:text-brown bg-cream rounded-full p-2"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-serif text-brown mb-6">
        {formData.id ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Product Name *
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Price
              </label>
              <input
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="e.g. ₹150 for 250g"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Highlights (comma separated)
              </label>
              <input
                value={formData.highlights}
                onChange={(e) =>
                  setFormData({ ...formData, highlights: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                placeholder="Cold Pressed, Vegan"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none bg-white font-medium"
              >
                <option value="savories">Savories (Snacks)</option>
                <option value="sweets">Sweets</option>
                <option value="limited">Limited Edition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                Ingredients
              </label>
              <textarea
                rows={3}
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData({ ...formData, ingredients: e.target.value })
                }
                className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                  Shelf Life
                </label>
                <input
                  value={formData.shelf_life}
                  onChange={(e) =>
                    setFormData({ ...formData, shelf_life: e.target.value })
                  }
                  className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                  placeholder="e.g. 30 days"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                  Storage Instructions
                </label>
                <input
                  value={formData.storage}
                  onChange={(e) =>
                    setFormData({ ...formData, storage: e.target.value })
                  }
                  className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none"
                  placeholder="e.g. Store in airtight container"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                  Badge
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none bg-white font-medium"
                >
                  <option value="none">None</option>
                  <option value="new">New</option>
                  <option value="bestseller">Bestseller</option>
                  <option value="limited">Limited Edition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) =>
                    setFormData({ ...formData, visibility: e.target.value })
                  }
                  className="w-full border border-brown/20 rounded-xl px-4 py-2 focus:border-orange focus:outline-none bg-white font-medium"
                >
                  <option value="active">Active</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) =>
                  setFormData({ ...formData, is_featured: e.target.checked })
                }
                className="w-4 h-4 text-orange border-brown/20 rounded focus:ring-orange"
              />
              <label htmlFor="is_featured" className="text-sm font-bold text-brown/70 uppercase cursor-pointer">
                Mark as Featured on Homepage
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brown/70 uppercase mb-1">
              Product Image
            </label>
            <div
              className={`mt-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 h-64 transition-colors text-center ${
                isDragging
                  ? "border-orange bg-orange/5"
                  : "border-brown/20 bg-cream/50 hover:bg-cream"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {uploading ? (
                <div className="flex flex-col items-center text-orange">
                  <Loader2 size={48} className="mb-4 animate-spin" />
                  <p className="font-bold">Uploading image...</p>
                </div>
              ) : formData.image_url ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold flex items-center gap-2">
                      <ImageIcon size={20} /> Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-brown/60">
                  <UploadCloud size={48} className="mb-4 text-orange" />
                  <p className="font-bold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm mt-1">SVG, PNG, JPG (Max. 800x800px)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-brown/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-bold text-brown/70 hover:bg-cream transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-orange hover:bg-orange-light text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <CheckCircle size={20} />
            )}
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
