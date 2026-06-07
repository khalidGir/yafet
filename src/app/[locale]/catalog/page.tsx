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
  category: string;
}

interface CatalogContent {
  headerLabel: string;
  title: string;
  titleItalic: string;
  categories: {
    all: string;
    luxuryCollection: string;
    egyptianCotton: string;
    pureSilk: string;
    velvet: string;
  };
  showing: string;
  listings: string;
  refineSelection: string;
  loading: string;
  viewAll: string;
  noProducts: string;
  quickView: string;
}

const translations: Record<string, CatalogContent> = {
  en: {
    headerLabel: "Our Collections",
    title: "Quality Bedding",
    titleItalic: "Essentials",
    categories: {
      all: "Show All",
      luxuryCollection: "Premium Silk",
      egyptianCotton: "Daily Cotton",
      pureSilk: "Mulberry Silk",
      velvet: "Velvet Soft",
    },
    showing: "Viewing",
    listings: "available sets",
    refineSelection: "Filter by Category",
    loading: "Loading collection...",
    viewAll: "See all items",
    noProducts: "We couldn't find any products in this category.",
    quickView: "View Details",
  },
  am: {
    headerLabel: "ስብስባችን",
    title: "ጥራት ያለው የአልጋ ልብስ",
    titleItalic: "አስፈላጊ ነገሮች",
    categories: {
      all: "ሁሉንም አሳይ",
      luxuryCollection: "ፕሪሚየም ሐር",
      egyptianCotton: "የዕለት ተዕለት ጥጥ",
      pureSilk: "የሾላ ሐር",
      velvet: "ለስላሳ ቬልቬት",
    },
    showing: "እያዩ ነው",
    listings: "የሚገኙ ስብስቦች",
    refineSelection: "በምድብ ይለዩ",
    loading: "ስብስቡ በመጫን ላይ ነው...",
    viewAll: "ሁሉንም እቃዎች ይመልከቱ",
    noProducts: "በዚህ ምድብ ውስጥ ምንም ምርቶች ማግኘት አልቻልንም።",
    quickView: "ዝርዝር ይመልከቱ",
  },
};

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
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

  const content = translations[locale] || translations.am;

  const categoryKeys = ['all', 'luxuryCollection', 'egyptianCotton', 'pureSilk', 'velvet'];
  const categories = categoryKeys.map((key) => ({
    key,
    label: content.categories[key as keyof typeof content.categories],
    value: key === 'all' ? 'All' : key === 'luxuryCollection' ? 'Luxury Collection' : 
           key === 'egyptianCotton' ? 'Egyptian Cotton' : 
           key === 'pureSilk' ? 'Pure Silk' : 'Velvet',
  }));

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
            ETHIOCONFURT
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeCategory === cat.value
                  ? 'border-luxury-gold text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
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
                {content.showing} {filteredProducts.length} {content.listings}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredProducts.map((product) => (
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
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      {product.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-bold text-2xl text-slate-400">{content.noProducts}</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="mt-6 text-sm font-bold border-b-2 border-brand-blue pb-1 text-brand-blue hover:text-brand-warm hover:border-brand-warm transition-all uppercase tracking-widest"
                >
                  {content.viewAll}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <CallToOrderFAB />

      <footer className="py-16 text-center border-t border-slate-100 bg-slate-50">
        <Link href={`/${locale}`} className="font-bold text-3xl tracking-tight text-brand-blue mb-4 block">
          ETHIOCONFURT
        </Link>
        <span className="text-sm font-bold tracking-widest uppercase text-slate-400">
          Quality Bedding for Every Ethiopian Home
        </span>
      </footer>
    </div>
  );
}