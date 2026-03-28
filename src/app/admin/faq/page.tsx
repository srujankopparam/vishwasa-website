"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Plus, Trash2, Edit2, CheckCircle, X, HelpCircle, Loader2 } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    sort_order: 0,
  });

  const fetchFaqs = () => {
    setLoading(true);
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch((err) => console.error("Error fetching FAQs:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (id?: number) => {
    setSaving(true);
    const method = id ? "PUT" : "POST";
    const body = id ? { id, ...formData } : formData;

    try {
      const res = await fetch("/api/faq", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setEditingId(null);
        setShowAddForm(false);
        setFormData({ question: "", answer: "", sort_order: 0 });
        fetchFaqs();
      } else {
        alert("Failed to save FAQ.");
      }
    } catch (err) {
      alert("Error saving FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/faq?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchFaqs();
      } else {
        alert("Failed to delete FAQ.");
      }
    } catch (err) {
      alert("Error deleting FAQ.");
    }
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-orange/10 p-3 rounded-2xl text-orange">
            <HelpCircle size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black text-brown">Manage FAQs</h1>
            <p className="text-brown/50">Add or edit frequently asked questions.</p>
          </div>
        </div>
        
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
              setFormData({ question: "", answer: "", sort_order: 0 });
            }}
            className="bg-orange hover:bg-orange-light text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add New Question
          </button>
        )}
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-brown/5 mb-10 animate-fade-up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-brown">
              {editingId ? "Edit Question" : "New Question"}
            </h2>
            <button 
              onClick={() => { setShowAddForm(false); setEditingId(null); }}
              className="text-brown/30 hover:text-brown"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-brown/50 uppercase tracking-widest mb-2">Question</label>
              <input
                className="w-full bg-cream/50 border border-brown/10 rounded-2xl px-5 py-4 focus:border-orange focus:outline-none transition-all font-bold"
                placeholder="What is the shelf life of your snacks?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brown/50 uppercase tracking-widest mb-2">Answer</label>
              <textarea
                rows={4}
                className="w-full bg-cream/50 border border-brown/10 rounded-2xl px-5 py-4 focus:border-orange focus:outline-none transition-all"
                placeholder="Most of our snacks have a shelf life of 30 days..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              />
            </div>
            <div className="w-1/4">
              <label className="block text-sm font-bold text-brown/50 uppercase tracking-widest mb-2">Sort Order</label>
              <input
                type="number"
                className="w-full bg-cream/50 border border-brown/10 rounded-2xl px-5 py-4 focus:border-orange focus:outline-none transition-all"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleSave(editingId || undefined)}
                disabled={saving}
                className="bg-brown text-white font-bold py-4 px-10 rounded-2xl shadow-xl flex items-center gap-2 hover:bg-brown-dark transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                {editingId ? "Update FAQ" : "Save FAQ"}
              </button>
              <button
                onClick={() => { setShowAddForm(false); setEditingId(null); }}
                className="text-brown/60 font-medium px-8 hover:text-brown"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && !showAddForm && !editingId ? (
        <div className="flex flex-col items-center py-20 text-orange">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest text-xs">Loading FAQs...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-white p-20 rounded-[40px] text-center border border-dashed border-brown/20 text-brown/30">
          <p className="text-xl italic">No FAQs added yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white p-6 rounded-3xl border transition-all flex items-center justify-between group ${
                editingId === faq.id ? "border-orange ring-1 ring-orange shadow-orange/10" : "border-brown/5 shadow-lg shadow-brown/5 hover:border-brown/10"
              }`}
            >
              <div className="max-w-[70%]">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] bg-brown/5 text-brown/40 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Order: {faq.sort_order}
                  </span>
                  <h3 className="font-bold text-brown text-lg line-clamp-1">{faq.question}</h3>
                </div>
                <p className="text-brown/50 text-sm line-clamp-1">{faq.answer}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(faq)}
                  className="p-3 rounded-xl bg-cream/50 text-brown/40 hover:text-orange hover:bg-orange/5 transition-all shadow-sm"
                  title="Edit FAQ"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-3 rounded-xl bg-cream/50 text-brown/40 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm"
                  title="Delete FAQ"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
