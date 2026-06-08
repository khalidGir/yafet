'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight, Loader2, Star, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CallToOrderFAB from '@/components/CallToOrderFAB';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_urls: string[];
}

interface PageContent {
  headerLabel: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  showing: string;
  listings: string;
  loading: string;
  noProducts: string;
  quickView: string;
  tagline: string;
}

const translations: Record<string, PageContent> = {
  en: {
    headerLabel: "Our Collections",
    title: "Quality Bedding for",
    titleItalic: "Every Home",
    subtitle: "Durable, comfortable, and fairly priced bedding curated for Ethiopian families.",
    tagline: "Quality Verified • Locally Delivered",
    showing: "Viewing",
    listings: "available sets",
    loading: "Loading collection...",
    noProducts: "No products available yet.",
    quickView: "Call to Order",
  },
  am: {
    headerLabel: "ስብስባችን",
    title: "ጥራት ያለው የአልጋ ልብስ",
    titleItalic: "ለማንኛውም ቤት",
    subtitle: "ለኢትዮጵያ ቤተሰቦች የተዘጋጁ ዘላቂ፣ ምቹ እና ተመጣጣኝ ዋጋ ያላቸው የአልጋ ልብሶች።",
    tagline: "ጥራት የተረጋገጠ • በአካባቢው የሚደርስ",
    showing: "እያዩ ነው",
    listings: "የሚገኙ ስብስቦች",
    loading: "ስብስቡ በመጫን ላይ ነው...",
    noProducts: "ገና ምንም ምርቶች የሉም።",
    quickView: "ለመግዛት ይደውሉ",
  },
};

export default function SinglePageListing() {
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
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="font-bold text-xl tracking-tight text-brand-blue hover:text-brand-warm transition-colors uppercase">
            ETHIO COMFORT
          </Link>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-slate-100 text-brand-blue text-sm font-bold rounded-full hover:bg-brand-blue hover:text-white transition-colors"
          >
            {locale === 'am' ? '🇬🇧' : '🇪🇹'}
          </button>
        </div>
      </header>

      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NextImage
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Bedding"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <p className="text-xs md:text-sm font-bold tracking-widest mb-4 text-brand-warm uppercase">
            {content.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {content.title} <br />
            <span className="italic font-serif font-normal">{content.titleItalic}</span>
          </h1>
          <p className="text-sm md:text-lg font-medium text-gray-200 max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-brand-blue" size={48} />
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">{content.loading}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">
                {content.showing} {products.length} {content.listings}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/catalog/${product.id}`}
                  className="group p-3 md:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow block"
                >
                  <div className="aspect-[4/5] relative overflow-hidden mb-6 bg-slate-50 rounded-xl">
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-brand-warm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase shadow-sm">Verified</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-brand-blue font-bold text-xl">{product.price}</p>
                    </div>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="text-[10px] font-bold border border-slate-200 px-2 py-1 rounded-md text-slate-400 uppercase">King/Queen</span>
                    </div>

                    <span className="mt-4 w-full bg-slate-900 text-white py-3 rounded-xl text-center font-bold text-xs uppercase tracking-widest hover:bg-brand-blue transition-colors flex items-center justify-center gap-2">
                      {content.quickView}
                    </span>
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

      <footer className="py-16 text-center border-t border-slate-100 bg-slate-900 text-white">
        <Link href={`/${locale}`} className="font-bold text-3xl tracking-tight text-white mb-4 block uppercase">
          ETHIO COMFORT
        </Link>
        <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
          Quality Bedding for Every Ethiopian Home • Call 0950 29 44 22
        </span>
      </footer>
    </div>
  );
}