'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Package, Image as ImageIcon, Trash2, Save, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category: 'Luxury Collection'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      const { error } = await supabase
        .from('products')
        .insert([formData]);

      if (error) throw error;

      // Reset form and refresh list
      setFormData({ name: '', price: '', description: '', image_url: '', category: 'Luxury Collection' });
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex selection:bg-black selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 hidden md:block">
        <h2 className="text-2xl font-serif mb-12 tracking-widest font-bold">YAFET</h2>
        <nav className="space-y-6">
          <a href="#" className="flex items-center gap-4 text-white bg-zinc-900 p-4 rounded-xl transition-all">
            <Package size={20} className="text-luxury-gold" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold">Inventory</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-gray-900">Catalogue Manager</h1>
            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest text-[10px]">Manage your premium listings</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Form Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-8 flex items-center gap-2">
            <Plus size={14} /> New Listing Entry
          </h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Product Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Mulberry Silk Sheet" 
                className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-luxury-gold outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Price Label (ETB)</label>
              <input 
                required
                type="text" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="e.g. 4,500 ETB" 
                className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-luxury-gold outline-none transition-all" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Editorial Description</label>
              <textarea 
                required
                rows={4} 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-luxury-gold outline-none transition-all" 
                placeholder="Describe the quality, fabric, and feel..."
              ></textarea>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Image URL</label>
                <div className="flex gap-3">
                    <input 
                      required
                      type="url" 
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="flex-1 p-4 bg-gray-50 border-none rounded-xl outline-none" 
                      placeholder="Paste link from Supabase Storage" 
                    />
                    <div className="p-4 bg-gray-100 rounded-xl text-gray-400"><ImageIcon size={20} /></div>
                </div>
            </div>
            <div className="space-y-2 flex items-end">
                <button 
                  disabled={saving}
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Publish Listing
                </button>
            </div>
          </form>
        </section>

        {/* Product List */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
             <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Current Collection</h3>
             <span className="text-[10px] bg-gray-100 px-3 py-1 rounded-full font-bold">{products.length} Products</span>
          </div>
          
          {loading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-gray-200" size={40} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-gray-400">Preview</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-gray-400">Product</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-gray-400">Price</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-6">
                        <div className="w-12 h-16 relative bg-gray-100 rounded-md overflow-hidden">
                          <img src={p.image_url} alt="" className="object-cover w-full h-full" />
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-serif text-lg">{p.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">{p.category}</div>
                      </td>
                      <td className="p-6 font-light text-gray-600">{p.price}</td>
                      <td className="p-6 text-right space-x-4">
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-400 italic font-light">
                        No products listed yet. Start by adding your first luxury set.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
