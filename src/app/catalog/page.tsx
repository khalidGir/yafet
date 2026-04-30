'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowRight, Loader2, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CallToOrderFAB from '@/components/CallToOrderFAB';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Luxury Collection', 'Egyptian Cotton', 'Pure Silk', 'Velvet'];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-luxury-gold selection:text-white">
      {/* Editorial Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto absolute top-0 w-full z-10">
          <Link href="/" className="font-serif text-xl tracking-widest text-black hover:text-luxury-gold transition-colors">YAFET</Link>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
              <Link href="/about" className="hover:text-black transition-colors">Heritage</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
      </nav>

      <header className="pt-32 pb-12 px-8 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold font-bold mb-4 block">The Full Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter">Curated <br/><span className="italic">Essentials</span></h1>
          <div className="w-20 h-[1px] bg-gray-200 mx-auto mb-12"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-all ${
                activeCategory === cat ? 'border-luxury-gold text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      {/* Catalog Grid */}
      <main className="px-8 pb-32 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-gray-200" size={48} />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Refining Collection...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-100">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Showing {filteredProducts.length} Listings</span>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:text-luxury-gold transition-colors">
                    <SlidersHorizontal size={14} />
                    <span>Refine Selection</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/catalog/${product.id}`} className="group block">
                      <div className="aspect-[3/4] relative overflow-hidden mb-8 bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-luxury-gold/5">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                                <ArrowRight size={18} className="text-black" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-[10px] uppercase tracking-widest font-bold">Quick View</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-serif text-2xl tracking-tight group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                          <span className="text-sm font-light text-gray-400">{product.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{product.category}</p>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-40 text-center">
                <p className="font-serif text-2xl text-gray-400">No pieces found in this category.</p>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="mt-6 text-xs tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all"
                >
                    View All Collections
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <CallToOrderFAB />

      <footer className="py-20 text-center border-t border-gray-100 bg-white">
          <div className="font-serif text-2xl tracking-[0.2em] mb-8">YAFET</div>
          <span className="text-[10px] tracking-[0.5em] uppercase text-gray-300 italic">Curating Luxury for the Ethiopian Home</span>
      </footer>
    </div>
  );
}
