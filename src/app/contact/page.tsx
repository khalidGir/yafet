'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const contactInfo = [
    { icon: <Phone size={24} />, label: "Call Us", value: "+251 911 22 33 44", href: "tel:+251911223344" },
    { icon: <MessageCircle size={24} />, label: "WhatsApp", value: "+251 911 22 33 44", href: "https://wa.me/251911223344" },
    { icon: <Mail size={24} />, label: "Email", value: "concierge@yafet.com", href: "mailto:concierge@yafet.com" },
    { icon: <MapPin size={24} />, label: "Showroom", value: "Bole Road, Addis Ababa", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-luxury-gold selection:text-white">
      {/* Editorial Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto">
          <Link href="/" className="font-serif text-xl tracking-widest text-black">YAFET</Link>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
              <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
              <Link href="/about" className="hover:text-black transition-colors">Heritage</Link>
          </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="text-center mb-24">
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold font-bold mb-6 block"
            >
                Get in Touch
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter"
            >
                Concierge <br/><span className="italic">Service</span>
            </motion.h1>
            <p className="text-gray-400 font-light text-lg max-w-xl mx-auto">
                Whether you're looking for a bespoke size or have questions about our fabrics, our specialists are here to assist.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {contactInfo.map((item, index) => (
                <motion.a
                    key={index}
                    href={item.href}
                    whileHover={{ y: -10 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-10 bg-white shadow-sm border border-gray-50 flex flex-col items-center text-center group"
                >
                    <div className="mb-6 text-gray-200 group-hover:text-luxury-gold transition-colors duration-500">
                        {item.icon}
                    </div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">{item.label}</h3>
                    <p className="text-lg font-serif italic text-gray-800">{item.value}</p>
                </motion.a>
            ))}
        </div>

        {/* Inquiry Form Mockup */}
        <section className="mt-32 max-w-3xl mx-auto bg-white p-12 md:p-20 shadow-2xl rounded-sm">
            <h2 className="text-3xl font-serif mb-12 text-center italic">Direct Inquiry</h2>
            <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Your Name</label>
                        <input type="text" className="w-full border-b border-gray-100 py-4 outline-none focus:border-luxury-gold transition-colors font-light" placeholder="e.g. Dawit K." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone Number</label>
                        <input type="tel" className="w-full border-b border-gray-100 py-4 outline-none focus:border-luxury-gold transition-colors font-light" placeholder="+251 ..." />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Inquiry Details</label>
                    <textarea rows={4} className="w-full border-b border-gray-100 py-4 outline-none focus:border-luxury-gold transition-colors font-light resize-none" placeholder="How can we help elevate your rest?"></textarea>
                </div>
                <button className="w-full bg-black text-white py-6 font-bold tracking-[0.4em] uppercase hover:bg-luxury-gold transition-all duration-500">
                    Send Request
                </button>
            </form>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-gray-100 mt-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-gray-300">© 2026 Yafet Premium • Addis Ababa</span>
      </footer>
    </div>
  );
}
