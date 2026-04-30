'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CallToOrderFAB from '@/components/CallToOrderFAB';
import { CheckCircle, ShieldCheck, Truck, ChevronRight, Star } from 'lucide-react';

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const product = {
    name: "Royal Silk Bedding Set",
    description: "Experience the ultimate luxury with our Royal Silk Bedding Set. Crafted from the finest 6A Grade mulberry silk, this set offers unparalleled comfort and a sophisticated aesthetic for your bedroom.",
    fabric: "100% Mulberry Silk",
    threadCount: 600,
    price: "4,500 ETB",
    features: [
      "Hypoallergenic & Breathable",
      "Natural Temperature Regulation",
      "Dermatologist Recommended",
      "Includes 1 Flat Sheet, 1 Fitted Sheet, and 4 Pillowcases"
    ],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505693333238-bc63a560dd37?auto=format&fit=crop&q=80&w=1200"
    ]
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 selection:bg-luxury-gold selection:text-white">
      {/* Editorial Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
              <a href="/" className="hover:text-black transition-colors">Home</a>
              <ChevronRight size={10} />
              <a href="/catalog" className="hover:text-black transition-colors">Catalog</a>
              <ChevronRight size={10} />
              <span className="text-black">Royal Silk</span>
          </div>
          <div className="font-serif text-xl tracking-widest">YAFET</div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Advanced Image Gallery */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] relative overflow-hidden bg-white group shadow-sm"
            >
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                priority
              />
              <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">Signature Collection</span>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-12">
                <motion.div 
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    className="aspect-square relative overflow-hidden bg-white shadow-sm"
                >
                    <Image src={product.images[1]} alt="Detail 1" fill className="object-cover parallax-hover" />
                </motion.div>
                <motion.div 
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="aspect-square relative overflow-hidden bg-white shadow-sm"
                >
                    <Image src={product.images[2]} alt="Detail 2" fill className="object-cover parallax-hover" />
                </motion.div>
            </div>
          </div>

          {/* Editorial Product Details */}
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
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">(48 Verified Reviews)</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
                </h1>
                
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                <span className="text-3xl font-light text-gray-900 tracking-tighter">{product.price}</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-luxury-gold">Negotiable Price</span>
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
                        <p className="text-gray-400 text-sm">{product.fabric} • Grade 6A Certified</p>
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
                    <p className="text-center text-[10px] tracking-widest text-gray-400 uppercase">
                        Experience concierge service for your home.
                    </p>
                </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <section className="mt-40 pt-40 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                <div className="md:col-span-4">
                    <h2 className="text-4xl font-serif mb-8">Technical <br/><span className="italic text-gray-400">Excellence</span></h2>
                    <p className="text-gray-500 font-light leading-relaxed">
                        Every thread is scrutinized for tensile strength and sheen uniformity. 
                        We don't just sell sheets; we engineer environments for deep recovery.
                    </p>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold">Composition</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {product.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-1 h-1 bg-luxury-gold rounded-full" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold">Maintenance</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            To preserve the natural proteins in the silk, we recommend a cold delicate cycle with pH-neutral detergent. 
                            Air dry only. Never expose to direct sunlight for extended periods.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <CallToOrderFAB />
      
      {/* Editorial Footer Space */}
      <footer className="py-20 text-center border-t border-gray-100 mt-40">
          <span className="text-[10px] tracking-[0.5em] uppercase text-gray-300">© 2026 Yafet Premium • Addis Ababa</span>
      </footer>
    </div>
  );
};

export default ProductPage;
