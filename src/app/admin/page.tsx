'use client';

import React, { useState } from 'react';
import { Plus, Package, Image as ImageIcon, Trash2, Save } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Royal Silk Set', price: '4,500 ETB', stock: 'In Stock' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-xl font-serif mb-10 tracking-widest">YAFET ADMIN</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-white bg-gray-900 p-3 rounded-lg">
            <Package size={20} />
            <span>Products</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif text-gray-800">Product Management</h1>
          <button className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Plus size={18} />
            Add New Product
          </button>
        </div>

        {/* Form Mockup (Add Product) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-lg font-medium mb-6">Create New Listing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Product Name</label>
              <input type="text" placeholder="e.g. Mulberry Silk Sheet" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Base Price (ETB)</label>
              <input type="text" placeholder="4,500" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Description</label>
              <textarea rows={4} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" placeholder="Describe the quality, fabric, and feel..."></textarea>
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Image URL</label>
                <div className="flex gap-2">
                    <input type="text" className="flex-1 p-3 border border-gray-200 rounded-lg outline-none" placeholder="Paste link from Supabase/Unsplash" />
                    <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200"><ImageIcon size={20} /></button>
                </div>
            </div>
            <div className="space-y-2 flex items-end">
                <button className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <Save size={16} />
                    Save Product
                </button>
            </div>
          </div>
        </section>

        {/* Product List */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-400">Product</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-400">Price</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-400">Status</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-gray-500">{p.price}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-100">
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 text-gray-400 hover:text-black"><Plus size={18} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
