'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Package, X, ImagePlus, Palette } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product, Variant } from '@/lib/types';

interface AdminContent {
  title: string;
  addProduct: string;
  editProduct: string;
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
  updateBtn: string;
  cancelBtn: string;
  inventory: string;
  noProducts: string;
  edit: string;
  delete: string;
  added: string;
  updated: string;
  dragDrop: string;
  orClick: string;
  uploading: string;
  mainImage: string;
  addMoreImages: string;
  variants: string;
  addVariant: string;
  colorName: string;
  variantPrice: string;
  variantImages: string;
}

const translations: Record<string, AdminContent> = {
  en: {
    title: "Inventory Management",
    addProduct: "Add New Product",
    editProduct: "Edit Product",
    productName: "Product Name",
    price: "Base Price (ETB)",
    description: "Description",
    imageUpload: "Product Images",
    category: "Category",
    selectCategory: "Select a category",
    luxuryCollection: "Luxury Collection",
    egyptianCotton: "Egyptian Cotton",
    pureSilk: "Pure Silk",
    velvet: "Velvet",
    addBtn: "Add Product",
    updateBtn: "Update Product",
    cancelBtn: "Cancel",
    inventory: "Current Inventory",
    noProducts: "No products yet. Add your first product above.",
    edit: "Edit",
    delete: "Delete",
    added: "Product added successfully!",
    updated: "Product updated successfully!",
    dragDrop: "Drag images here",
    orClick: "or click to select",
    uploading: "Uploading...",
    mainImage: "Main",
    addMoreImages: "Add More",
    variants: "Color Variants",
    addVariant: "Add Variant",
    colorName: "Color Name",
    variantPrice: "Price (ETB)",
    variantImages: "Variant Images",
  },
  am: {
    title: "የማከማቻ አስተዳደር",
    addProduct: "አዲስ ምርት ጨምሩ",
    editProduct: "ምርት አስተካክል",
    productName: "ምርት ስም",
    price: "መሰረታዊ ዋጋ (ETB)",
    description: "መግለጫ",
    imageUpload: "ምርት ምስሎች",
    category: "ምድብ",
    selectCategory: "ምድብ ይምረጡ",
    luxuryCollection: "ርዕሰ ጉዳይ ስብስብ",
    egyptianCotton: "የግብፅ አበባ",
    pureSilk: "ንፁህ ሱሪ",
    velvet: "ቨልቬት",
    addBtn: "ምርት ጨምሩ",
    updateBtn: "ምርት አዘምን",
    cancelBtn: "ተው",
    inventory: "የአሁን ማከማቻ",
    noProducts: "ምርቶች የሉም። አዲስ ምርት ይጨምሩ።",
    edit: "አስተካክል",
    delete: "ሰርዝ",
    added: "ምርት በተሳካ ሁኔታ ታክሏል!",
    updated: "ምርት ተሻሽሏል!",
    dragDrop: "ምስሎችን እዚህ ይጎትቱ",
    orClick: "ወይም ጠቅ ያድርጉ",
    uploading: "በማስቀመጥ...",
    mainImage: "ዋና",
    addMoreImages: "ተጨማሪ",
    variants: "የቀለም ልዩነቶች",
    addVariant: "ልዩነት ጨምሩ",
    colorName: "የቀለም ስም",
    variantPrice: "ዋጋ (ETB)",
    variantImages: "የልዩነት ምስሎች",
  },
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [locale, setLocale] = useState('am');
  const [dragOver, setDragOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyForm = { name: '', price: '', description: '', image_urls: [] as string[], category: '', variants: [] as Variant[] };

  const [formData, setFormData] = useState({ ...emptyForm });

  const [currentVariant, setCurrentVariant] = useState<Variant>({
    color: '', price: '', image_urls: [],
  });

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'am';
    setLocale(storedLocale);
    fetchProducts();
  }, []);

  const content = translations[locale] || translations.am;

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
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from('produc-image')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'image/jpeg'
        });

      if (error) {
        console.error('Supabase upload error:', error.message, error);
        setUploadingCount(c => c - 1);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('produc-image')
        .getPublicUrl(fileName);

      setUploadingCount(c => c - 1);
      return urlData.publicUrl;
    } catch (err) {
      console.error('Upload exception:', err);
      setUploadingCount(c => c - 1);
      return null;
    }
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

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image_urls: product.image_urls,
      category: product.category,
      variants: product.variants || [],
    });
    setCurrentVariant({ color: '', price: '', image_urls: [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setCurrentVariant({ color: '', price: '', image_urls: [] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image_urls.length === 0) {
      alert('Please add at least one image');
      return;
    }
    setSubmitting(true);

    const payload = {
      ...formData,
      variants: formData.variants.length > 0 ? formData.variants : [],
    };

    const { error } = editingId
      ? await supabase.from('products').update(payload).eq('id', editingId)
      : await supabase.from('products').insert([payload]);

    if (!error) {
      setSuccess(true);
      setSuccessMsg(editingId ? content.updated : content.added);
      setEditingId(null);
      setFormData({ ...emptyForm });
      setCurrentVariant({ color: '', price: '', image_urls: [] });
      fetchProducts();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      if (editingId === id) handleCancel();
      fetchProducts();
    }
  };

  const addVariant = () => {
    if (!currentVariant.color.trim() || !currentVariant.price.trim() || currentVariant.image_urls.length === 0) {
      alert('Please fill in color name, price, and at least one image for the variant.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { ...currentVariant }],
    }));
    setCurrentVariant({ color: '', price: '', image_urls: [] });
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
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
              ← {locale === 'en' ? 'Back to Site' : 'ወደ ጣቢያ'}
            </Link>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
            >
              {locale === 'am' ? '🇬🇧' : '🇪🇹'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif flex items-center gap-2">
                <Plus className="text-luxury-gold" size={20} />
                {editingId ? content.editProduct : content.addProduct}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm text-gray-500 hover:text-black underline"
                >
                  {content.cancelBtn}
                </button>
              )}
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                {successMsg}
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

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Palette className="text-luxury-gold" size={20} />
                  {content.variants}
                </h3>

                {formData.variants.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {formData.variants.map((v, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {v.image_urls[0] && (
                            <img src={v.image_urls[0]} alt={v.color} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{v.color}</p>
                          <p className="text-xs text-gray-500">{v.price}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={content.colorName}
                      value={currentVariant.color}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, color: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-luxury-gold"
                    />
                    <input
                      type="text"
                      placeholder={content.variantPrice}
                      value={currentVariant.price}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, price: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/variant-image.jpg"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-luxury-gold"
                      value={currentVariant.image_urls[0] || ''}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, image_urls: [e.target.value] })}
                    />
                    <button
                      type="button"
                      onClick={addVariant}
                      className="px-4 py-2 bg-luxury-gold text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                    >
                      {content.addVariant}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || uploadingCount > 0}
                className="w-full bg-black text-white py-4 font-semibold rounded-lg hover:bg-luxury-gold transition-colors disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : (editingId ? content.updateBtn : content.addBtn)}
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
                        {product.variants?.length > 0 && (
                          <p className="text-xs text-luxury-gold">{product.variants.length} color(s)</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-luxury-gold transition-colors"
                          title={content.edit}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title={content.delete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
