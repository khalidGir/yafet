'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Package, Upload, X, ImagePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

interface AdminContent {
  title: string;
  addProduct: string;
  productName: string;
  price: string;
  description: string;
  imageUpload: string;
  category: string;
  selectCategory: string;
  luxuryCollection: string;
  egyptianCotton: string;
  pureSilk: string;
  velvet: string;
  addBtn: string;
  inventory: string;
  noProducts: string;
  delete: string;
  added: string;
  dragDrop: string;
  orClick: string;
  uploading: string;
  mainImage: string;
  addMoreImages: string;
}

const translations: Record<string, AdminContent> = {
  en: {
    title: "Inventory Management",
    addProduct: "Add New Product",
    productName: "Product Name",
    price: "Price (ETB)",
    description: "Description",
    imageUpload: "Product Images",
    category: "Category",
    selectCategory: "Select a category",
    luxuryCollection: "Luxury Collection",
    egyptianCotton: "Egyptian Cotton",
    pureSilk: "Pure Silk",
    velvet: "Velvet",
    addBtn: "Add Product",
    inventory: "Current Inventory",
    noProducts: "No products yet. Add your first product above.",
    delete: "Delete",
    added: "Product added successfully!",
    dragDrop: "Drag images here",
    orClick: "or click to select",
    uploading: "Uploading...",
    mainImage: "Main",
    addMoreImages: "Add More",
  },
  am: {
    title: "የማከማቻ አስተዳደር",
    addProduct: "አዲስ ምርት ጨምሩ",
    productName: "ምርት ስም",
    price: "ዋጋ (ETB)",
    description: "መግለጫ",
    imageUpload: "ምርት ምስሎች",
    category: "ምድብ",
    selectCategory: "ምድብ ይምረጡ",
    luxuryCollection: "ርዕሰ ጉዳይ ስብስብ",
    egyptianCotton: "የግብፅ አበባ",
    pureSilk: "ንፁህ ሱሪ",
    velvet: "ቨልቬት",
    addBtn: "ምርት ጨምሩ",
    inventory: "የአሁን ማከማቻ",
    noProducts: "ምርቶች የሉም። አዲስ ምርት ይጨምሩ።",
    delete: "ሰርዝ",
    added: "ምርት በተሳካ ሁኔታ ታክሏል!",
    dragDrop: "ምስሎችን እዚህ ይጎትቱ",
    orClick: "ወይም ጠቅ ያድርጉ",
    uploading: "በማስቀመጥ...",
    mainImage: "ዋና",
    addMoreImages: "ተጨማሪ",
  },
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [locale, setLocale] = useState('en');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_urls: [] as string[],
    category: '',
  });

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLocale(storedLocale);
    fetchProducts();
  }, []);

  const content = translations[locale] || translations.en;

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadingCount(c => c + 1);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('produc-image')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      setUploadingCount(c => c - 1);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('produc-image')
      .getPublicUrl(fileName);

    setUploadingCount(c => c - 1);
    return urlData.publicUrl;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) {
        setFormData(prev => ({
          ...prev,
          image_urls: [...prev.image_urls, url]
        }));
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) {
        setFormData(prev => ({
          ...prev,
          image_urls: [...prev.image_urls, url]
        }));
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image_urls.length === 0) {
      alert('Please add at least one image');
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from('products').insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({ name: '', price: '', description: '', image_urls: [], category: '' });
      fetchProducts();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const categories = [
    { value: 'Luxury Collection', label: content.luxuryCollection },
    { value: 'Egyptian Cotton', label: content.egyptianCotton },
    { value: 'Pure Silk', label: content.pureSilk },
    { value: 'Velvet', label: content.velvet },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="text-luxury-gold" size={24} />
            <span className="font-serif text-xl tracking-wider">{content.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-black">
              ← Back to Site
            </Link>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
            >
              {locale === 'en' ? 'አማ' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
              <Plus className="text-luxury-gold" size={20} />
              {content.addProduct}
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                {content.added}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.productName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.price}
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold"
                  placeholder="e.g. 25,000 ETB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.description}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.imageUpload}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    dragOver ? 'border-luxury-gold bg-luxury-gold/5' : 'border-gray-300 hover:border-luxury-gold'
                  }`}
                >
                  {uploadingCount > 0 ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="animate-spin text-luxury-gold mb-2" size={32} />
                      <p className="text-sm text-gray-500">{content.uploading}</p>
                    </div>
                  ) : (
                    <>
                      <ImagePlus className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-500">{content.dragDrop}</p>
                      <p className="text-xs text-gray-400 mt-1">{content.orClick}</p>
                    </>
                  )}
                </div>

                {formData.image_urls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3">
                      {formData.image_urls.length} image(s) added
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {formData.image_urls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={url}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {index === 0 && (
                            <span className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-xs rounded">
                              {content.mainImage}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 flex items-center gap-2 text-sm text-luxury-gold hover:underline"
                    >
                      <ImagePlus size={16} />
                      {content.addMoreImages}
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3 text-center">Or paste image URL:</p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-luxury-gold"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const url = (e.target as HTMLInputElement).value;
                          if (url) {
                            setFormData(prev => ({
                              ...prev,
                              image_urls: [...prev.image_urls, url]
                            }));
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                        if (input.value) {
                          setFormData(prev => ({
                            ...prev,
                            image_urls: [...prev.image_urls, input.value]
                          }));
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-lg hover:bg-luxury-gold hover:text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.category}
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold"
                >
                  <option value="">{content.selectCategory}</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting || uploadingCount > 0}
                className="w-full bg-black text-white py-4 font-semibold rounded-lg hover:bg-luxury-gold transition-colors disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : content.addBtn}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-serif mb-6">{content.inventory}</h2>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-200" size={40} />
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Package className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-500">{content.noProducts}</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                      <div className="flex gap-2 flex-shrink-0">
                        {product.image_urls.slice(0, 2).map((url, i) => (
                          <div key={i} className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image src={url} alt="" fill className="object-cover" />
                          </div>
                        ))}
                        {product.image_urls.length > 2 && (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            +{product.image_urls.length - 2}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.price}</p>
                        <p className="text-xs text-gray-400 uppercase">{product.category}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}