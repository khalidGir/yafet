'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-luxury-gold selection:text-white">
      {/* Editorial Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto absolute top-0 w-full z-10">
          <Link href="/" className="font-serif text-xl tracking-widest text-black">YAFET</Link>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
              <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
      </nav>

      <main>
        {/* Heritage Hero */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="max-w-4xl text-center px-8">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold font-bold mb-6 block"
                >
                    Our Heritage
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-serif mb-12 leading-tight"
                >
                    Crafting the <br/><span className="italic">Perfect Rest</span>
                </motion.h1>
                <div className="w-20 h-[1px] bg-gray-200 mx-auto"></div>
            </div>
        </section>

        {/* Narrative Section */}
        <section className="py-32 px-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -30 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-serif mb-8 italic">Born in Addis Ababa, <br/>Sourced Globally.</h2>
                    <p className="text-gray-500 font-light leading-relaxed mb-8">
                        Yafet was founded on a simple realization: the home is a sanctuary, and the bed is its soul. In the fast-paced life of Ethiopia's capital, we saw a need for uncompromising quality in the one place where we all seek recovery.
                    </p>
                    <p className="text-gray-500 font-light leading-relaxed">
                        We don't just import bedding. We curate textiles. From the high thread counts of Egyptian cotton to the dermatological benefits of 6A grade mulberry silk, every piece in our collection is selected to elevate the Ethiopian domestic experience.
                    </p>
                </motion.div>
                <motion.div 
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] relative bg-gray-100 rounded-sm overflow-hidden shadow-2xl"
                >
                    <Image 
                        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" 
                        alt="Heritage" 
                        fill 
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-black py-32 px-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xs tracking-[0.5em] uppercase text-luxury-gold font-bold mb-12">The Yafet Philosophy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div>
                        <h4 className="font-serif text-xl mb-4 italic text-white/90">Integrity</h4>
                        <p className="text-gray-500 text-sm font-light">Transparency in fiber sourcing and ethical manufacturing.</p>
                    </div>
                    <div>
                        <h4 className="font-serif text-xl mb-4 italic text-white/90">Comfort</h4>
                        <p className="text-gray-500 text-sm font-light">Engineering the ideal microclimate for deep, uninterrupted sleep.</p>
                    </div>
                    <div>
                        <h4 className="font-serif text-xl mb-4 italic text-white/90">Local Care</h4>
                        <p className="text-gray-500 text-sm font-light">Personalized white-glove delivery across all Ethiopian regions.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-gray-100">
          <Link href="/catalog" className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase font-bold hover:text-luxury-gold transition-colors">
              Explore the Collection <ArrowRight size={16}/>
          </Link>
          <div className="mt-20 text-[10px] tracking-[0.5em] uppercase text-gray-300">© 2026 Yafet Premium</div>
      </footer>
    </div>
  );
}
