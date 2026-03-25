"use client";

import { useState, useEffect } from "react";
import { Lock, Plus, Trash2, Edit2, LogOut, Database, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ id: null, name: "", description: "", price: "", image_url: "", highlights: "", status: "active" });

  useEffect(() => {
    // Check if auth token exists in sessionStorage so we don't have to login every refresh
    const savedToken = sessionStorage.getItem("admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        sessionStorage.setItem("admin_token", password);
        setIsAuthenticated(true);
        fetchProducts();
      } else {
        setLoginError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setLoginError("Something went wrong with authentication.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("admin_token");
    // If it has an ID, we update (PUT). Otherwise, we insert new (POST).
    const method = formData.id ? "PUT" : "POST";
    
    try {
      const res = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert(formData.id ? "Product successfully updated!" : "New product secretly added!");
        setFormData({ id: null, name: "", description: "", price: "", image_url: "", highlights: "", status: "active" });
        fetchProducts();
      } else {
        alert("Failed to save product. Are you authorized?");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving. Please check your internet connection.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you 100% sure you want to permanently delete this snack from the menu?")) return;
    const token = sessionStorage.getItem("admin_token");
    
    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchProducts();
  };

  const setupDatabase = async () => {
    if (!confirm("Start the 1-Time database setup? Only do this once!")) return;
    try {
      const res = await fetch("/api/setup");
      if(res.ok) {
        alert("Database successfully connected and table created! You are ready to add products.");
        fetchProducts();
      } else {
        alert("Setup failed. Are you sure you connected Vercel Postgres?");
      }
    } catch(e) {
      alert("Network error.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffe0b4] px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border-t-4 border-[#f67000]">
          <Lock className="w-12 h-12 mx-auto text-[#874721] mb-6" />
          <h1 className="text-3xl font-serif text-[#874721] mb-2">Admin Login</h1>
          <p className="text-gray-500 mb-8 font-sans">Enter the secret password to enter the dashboard.</p>
          <input 
            type="password" 
            placeholder="Type your password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#f67000] transition-colors mb-4 text-center font-sans tracking-widest text-lg"
          />
          {loginError && <p className="text-red-500 text-sm mb-4 font-sans">{loginError}</p>}
          <button type="submit" className="w-full bg-[#874721] text-white py-4 rounded-lg font-bold hover:bg-[#f67000] focus:ring-4 focus:ring-orange-200 transition-all font-sans text-lg">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffe0b4] pb-12 font-sans text-[#874721]">
      {/* Top Navbar */}
      <div className="bg-[#874721] text-white p-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-serif tracking-wide">Vishwasa Command Center</h1>
        <div className="flex gap-4">
          <button onClick={setupDatabase} className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
            <Database size={16}/> 1-Time Setup
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-[#f67000] transition-all">
            <LogOut size={16}/> Lock
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 grid md:grid-cols-3 gap-8 items-start">
        
        {/* Editor Form Panel */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-[#219348]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-serif text-2xl">
            {formData.id ? <Edit2 size={24} className="text-[#f67000]"/> : <Plus size={24} className="text-[#219348]"/>}
            {formData.id ? "Edit Snack Details" : "Add New Snack"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name *</label>
              <input required placeholder="e.g. Classic Butter Murukku" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border-b-2 border-gray-200 focus:border-[#219348] focus:outline-none py-2 text-lg"/>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Price Details</label>
              <input placeholder="e.g. ₹150 for 250g" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full border-b-2 border-gray-200 focus:border-[#219348] focus:outline-none py-2"/>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Image Link URL</label>
              <input placeholder="https://example.com/image.jpg" value={formData.image_url} onChange={e=>setFormData({...formData, image_url: e.target.value})} className="w-full border-b-2 border-gray-200 focus:border-[#219348] focus:outline-none py-2 text-sm text-gray-600"/>
              <p className="text-[10px] text-gray-400 mt-1">Leave blank if no image yet.</p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Special Highlights tag</label>
              <input placeholder="e.g. Cold Pressed Oil, Mild Spice" value={formData.highlights} onChange={e=>setFormData({...formData, highlights: e.target.value})} className="w-full border-b-2 border-gray-200 focus:border-[#219348] focus:outline-none py-2"/>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mouth-watering Description</label>
              <textarea placeholder="Describe the taste and ingredients..." rows={3} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full border-2 border-gray-200 rounded p-2 focus:border-[#219348] focus:outline-none mt-1"/>
            </div>

            <button type="submit" className="w-full bg-[#219348] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 active:scale-95 transition-all shadow-md mt-2 flex items-center justify-center gap-2">
              <CheckCircle size={20}/> Save to Live Menu
            </button>
            {formData.id && (
              <button type="button" onClick={()=>setFormData({ id: null, name: "", description: "", price: "", image_url: "", highlights: "", status: "active" })} className="w-full py-2 text-gray-500 font-medium hover:text-gray-800">
                Cancel / Clear
              </button>
            )}
          </form>
        </div>

        {/* Live List Panel */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-serif">Live Menu Overlook</h2>
            <span className="bg-[#f67000] text-white px-3 py-1 rounded-full text-sm font-bold shadow">{products.length} Items</span>
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <p className="text-gray-500">Fetching live products from Postgres Database...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.length === 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-dashed border-2 border-gray-300">
                  <h3 className="text-xl font-serif text-gray-800 mb-2">Your menu is currently empty!</h3>
                  <p className="text-gray-500 mb-6">If this is your first time here, click the "1-Time Setup" button in the top right to create the database table. Then, use the form on the left to add your snacks.</p>
                </div>
              )}
              
              {products.map((p: any) => (
                <div key={p.id} className="bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center border-l-8 border-[#f67000] hover:shadow-xl transition-shadow group">
                  <div className="flex gap-4 items-center">
                    {/* Tiny thumbnail proxy */}
                    <div className="w-16 h-16 bg-[#ffe0b4] rounded-lg border-2 border-[#874721]/10 flex items-center justify-center overflow-hidden shrink-0">
                      {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-cover"/> : <span className="text-3xl">🍪</span>}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-xl text-[#874721]">{p.name}</h3>
                      <p className="text-[#219348] font-bold text-sm tracking-wide">{p.price || "Contact for price"} • {p.highlights || "Standard"}</p>
                      <p className="text-gray-600 mt-1 line-clamp-1 max-w-lg text-sm">{p.description || "No description provided."}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity pl-4 border-l">
                    <button onClick={() => setFormData(p)} className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 rounded-full transition-all" title="Edit Snack">
                      <Edit2 size={18}/>
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-3 text-red-600 bg-red-50 hover:bg-red-100 hover:scale-110 rounded-full transition-all" title="Permanently Delete">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
