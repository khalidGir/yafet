'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_urls: string[];
}

interface HomeContent {
  tagline: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  discoverBtn: string;
  viewCatalogBtn: string;
  section1Label: string;
  section1Title: string;
  section1Desc: string;
  browseAll: string;
  latestArrivals: string;
  quote: string;
}

const translations: Record<string, HomeContent> = {
  en: {
    tagline: "Ethically Sourced • Global Luxury",
    title: "The Art of",
    titleItalic: "Fine Sleep",
    subtitle: "Curated premium bedding for the most discerning Ethiopian homes. Quality verified, delivered with care.",
    discoverBtn: "Discover Collection",
    viewCatalogBtn: "View Catalog",
    section1Label: "01 — The Standard",
    section1Title: "600 Thread Count Mulberry Silk",
    section1Desc: "Our signature silk collection isn't just bedding; it's a dermatological investment. Natural proteins preserve skin hydration and prevent hair breakage while you rest.",
    browseAll: "Browse All",
    latestArrivals: "Latest Arrivals",
    quote: "The quality of the Royal Silk set completely changed my sleep hygiene. It's hard to imagine going back to anything else.",
  },
  am: {
    tagline: "በስነምር የተሰበሰበ • የዓለም ርዕሰ ጉዳይ",
    title: "የሚያማምር",
    titleItalic: "እንቅልፍ",
    subtitle: "ለሚፈልጉት የኢትዮጵያ ቤቶች የተዘጋጁ የላቀ የአልጋ ልብሶች። የተረጋገጠ ጥራት፣ በንኽክት የሚታሰብ።",
    discoverBtn: "ስብስብ ይመልከቱ",
    viewCatalogBtn: "ካታሎግ ይመልከቱ",
    section1Label: "01 — ደረጃ",
    section1Title: "600 ጥቅል ሙሉርሪ ሱሪ",
    section1Desc: "የእኛ ፊርማ ሱሪ ስብስብ አልጋ ልብስ ብቻ ሳይሆን የቆዳ ኢንቨስትማንት ነው። ተፈጥሯዊ ፕሮቲን ቆዳን ለስላሳነት ለማስቀረት እና ፀጉር ሊሰብሩ እንዳይጀምር ይረዳል።",
    browseAll: "ሁሉንም ይመልከቱ",
    latestArrivals: "አዲስ ምጥጥን",
    quote: "የሮያል ሱሪ ስብስብ ጥራት የእንቅልፍ ንጽህናን ሙሉ በሙሉ ለወጠ። ወደ ሌላ መሄድ ማሰብ አስቸጋሪ ነው።",
  },
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLocale(storedLocale);

    async function getProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  const content = translations[locale] || translations.en;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Bedding"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>

        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white/95 text-brand-blue text-sm font-bold rounded-full hover:bg-brand-warm hover:text-white transition-colors shadow-sm"
          >
            {locale === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <p className="text-sm md:text-base font-bold tracking-widest mb-6 text-brand-warm uppercase">
            {content.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            {content.title} <br />
            <span className="italic font-serif font-normal">{content.titleItalic}</span>
          </h1>
          <p className="text-base md:text-xl font-medium mb-10 text-gray-100 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/catalog`}
              className="bg-brand-blue text-white px-8 py-4 font-bold rounded-lg hover:bg-brand-warm transition-all shadow-lg"
            >
              {content.discoverBtn}
            </Link>
            <Link
              href={`/${locale}/catalog`}
              className="text-white border-2 border-white/50 px-8 py-4 font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              {content.viewCatalogBtn}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-1 h-12 bg-gradient-to-b from-brand-warm to-transparent rounded-full" />
        </div>
      </header>

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-brand-blue font-bold text-sm tracking-widest uppercase mb-4">
              {content.section1Label}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {content.section1Title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {content.section1Desc}
            </p>
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-warm transition-colors"
            >
              {content.browseAll} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
              alt="Bedding Collection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400">
            {content.latestArrivals}
          </h2>
          <div className="w-16 h-1 bg-brand-warm mx-auto mt-4 rounded-full" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-blue" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/catalog/${item.id}`}
                className="group card-hover p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-white rounded-xl">
                  <img
                    src={item.image_urls[0]}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-warm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">New</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-brand-blue transition-colors">
                  {item.name}
                </h3>
                <p className="text-brand-blue font-bold text-lg">{item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-900 py-16 md:py-24 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-5 h-5 fill-current text-brand-warm"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-medium italic mb-8 leading-relaxed text-slate-200">
            "{content.quote}"
          </p>
          <div className="w-8 h-1 bg-brand-warm mx-auto mb-4 rounded-full" />
          <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            Dr. Selamawit T. • Addis Ababa
          </p>
        </div>
      </section>
    </div>
  );
}