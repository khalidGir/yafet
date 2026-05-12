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
            className="px-4 py-2 bg-white/90 text-black text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
          >
            {locale === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <p className="text-sm md:text-base tracking-wider mb-6 text-luxury-gold">
            {content.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-8 leading-tight">
            {content.title} <br />
            <span className="italic">{content.titleItalic}</span>
          </h1>
          <p className="text-base md:text-xl font-light mb-10 text-gray-300 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/catalog`}
              className="bg-white text-black px-8 py-4 font-semibold hover:bg-luxury-gold hover:text-white transition-colors"
            >
              {content.discoverBtn}
            </Link>
            <Link
              href={`/${locale}/catalog`}
              className="text-white border border-white/50 px-8 py-4 hover:bg-white/10 transition-colors"
            >
              {content.viewCatalogBtn}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </header>

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-luxury-gold text-sm tracking-wider uppercase mb-4">
              {content.section1Label}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
              {content.section1Title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              {content.section1Desc}
            </p>
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-luxury-gold transition-colors"
            >
              {content.browseAll} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
              alt="Silk Collection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-sm tracking-widest uppercase text-gray-400">
            {content.latestArrivals}
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto mt-4" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gray-200" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/catalog/${item.id}`}
                className="group"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-4 bg-gray-100 rounded-lg">
                  <img
                    src={item.image_urls[0]}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 group-hover:text-luxury-gold transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm">{item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-black py-16 md:py-24 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-4 h-4 fill-current text-luxury-gold"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-xl md:text-3xl font-serif italic mb-8 leading-relaxed">
            "{content.quote}"
          </p>
          <div className="w-8 h-0.5 bg-luxury-gold mx-auto mb-4" />
          <p className="text-sm tracking-widest text-gray-400">
            Dr. Selamawit T. • Addis Ababa
          </p>
        </div>
      </section>
    </div>
  );
}