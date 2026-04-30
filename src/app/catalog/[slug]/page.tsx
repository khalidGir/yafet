'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CallToOrderFAB from '@/components/CallToOrderFAB';
import { CheckCircle, ShieldCheck, Truck, ChevronRight, Star, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
}

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!params.slug) return;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.slug)
        .single();

      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <p className="font-serif text-2xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 selection:bg-luxury-gold selection:text-white">
      {/* Editorial Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
              <ChevronRight size={10} />
              <span className="text-black">{product.name}</span>
          </div>
          <Link href="/" className="font-serif text-xl tracking-widest hover:text-luxury-gold transition-colors">YAFET</Link>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] relative overflow-hidden bg-white group shadow-sm"
            >
              <img 
                src={product.image_url} 
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">Signature Collection</span>
              </div>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 flex flex-col pt-12">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-luxury-gold text-luxury-gold"/>)}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">(Verified Listing)</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
                </h1>
                
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                <span className="text-3xl font-light text-gray-900 tracking-tighter">{product.price}</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-luxury-gold">Negotiable</span>
                </div>
                </div>

                <p className="text-gray-500 leading-relaxed mb-12 text-lg font-light italic">
                "{product.description}"
                </p>

                <div className="space-y-10 mb-16">
                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white border border-gray-100 rounded-full text-luxury-gold transition-colors group-hover:bg-luxury-gold group-hover:text-white">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-1">Textile Integrity</h3>
                        <p className="text-gray-400 text-sm">Premium {product.category} Material</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white border border-gray-100 rounded-full text-luxury-gold transition-colors group-hover:bg-luxury-gold group-hover:text-white">
                            <Truck size={20} />
                        </div>
                        <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-1">White-Glove Delivery</h3>
                        <p className="text-gray-400 text-sm">Complimentary setup within Addis Ababa.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white border border-gray-100 rounded-full text-luxury-gold transition-colors group-hover:bg-luxury-gold group-hover:text-white">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-1">The Yafet Guarantee</h3>
                        <p className="text-gray-400 text-sm">Quality verification on delivery before payment.</p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex flex-col gap-6">
                    <a 
                        href="tel:+251911223344"
                        className="w-full bg-black text-white py-6 text-center font-bold tracking-[0.3em] uppercase hover:bg-luxury-gold transition-all duration-500 shadow-xl hover:shadow-luxury-gold/20"
                    >
                        Inquire & Order Now
                    </a>
                </div>
            </motion.div>
          </div>
        </div>
      </main>

      <CallToOrderFAB />
    </div>
  );
};

export default ProductPage;
