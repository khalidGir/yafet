'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Filter, ArrowRight, Loader2, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CallToOrderFAB from '@/components/CallToOrderFAB';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_urls: string[];
}

interface CatalogContent {
  headerLabel: string;
  title: string;
  titleItalic: string;
  showing: string;
  listings: string;
  loading: string;
  noProducts: string;
}

const translations: Record<string, CatalogContent> = {
  en: {
    headerLabel: "Our Collections",
    title: "Quality Bedding",
    titleItalic: "Essentials",
    showing: "Viewing",
    listings: "available sets",
    loading: "Loading collection...",
    noProducts: "No products available yet.",
  },
  am: {
    headerLabel: "ስብስባችን",
    title: "ጥራት ያለው የአልጋ ልብስ",
    titleItalic: "አስፈላጊ ነገሮች",
    showing: "እያዩ ነው",
    listings: "የሚገኙ ስብስቦች",
    loading: "ስብስቡ በመጫን ላይ ነው...",
    noProducts: "ገና ምንም ምርቶች የሉም።",
  },
};

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('am');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'am';
    setLocale(storedLocale);

    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const content = translations[locale] || translations.am;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="font-serif text-xl tracking-wider text-black hover:text-luxury-gold">
            ETHIO COMFORT
          </Link>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
          >
            {locale === 'am' ? '🇬🇧' : '🇪🇹'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <p className="text-luxury-gold text-sm tracking-widest uppercase mb-4">
          {content.headerLabel}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif mb-8">
          {content.title} <span className="italic">{content.titleItalic}</span>
        </h1>
        <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-12" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-gray-200" size={48} />
            <p className="text-sm tracking-widest text-gray-400 font-medium">{content.loading}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <span className="text-sm text-gray-400">
                {content.showing} {products.length} {content.listings}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/catalog/${product.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-serif text-xl group-hover:text-luxury-gold transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-sm text-gray-400">{product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-bold text-2xl text-slate-400">{content.noProducts}</p>
              </div>
            )}
          </>
        )}
      </main>

      <CallToOrderFAB />

      <footer className="py-16 text-center border-t border-slate-100 bg-slate-50">
        <Link href={`/${locale}`} className="font-bold text-3xl tracking-tight text-brand-blue mb-4 block">
          ETHIO COMFORT
        </Link>
        <span className="text-sm font-bold tracking-widest uppercase text-slate-400">
          Quality Bedding for Every Ethiopian Home
        </span>
      </footer>
    </div>
  );
}