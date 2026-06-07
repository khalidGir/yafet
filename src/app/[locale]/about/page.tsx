'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AboutContent {
  heroLabel: string;
  heroTitle: string;
  storyTitle: string;
  storyText: string;
  philosophyTitle: string;
  integrity: string;
  integrityDesc: string;
  comfort: string;
  comfortDesc: string;
  localCare: string;
  localCareDesc: string;
  exploreCollection: string;
}

const translations: Record<string, AboutContent> = {
  en: {
    heroLabel: "Our Heritage",
    heroTitle: "Crafting the Perfect Rest",
    storyTitle: "A Legacy of Luxury",
    storyText: "Ethioconfurt was born from a simple belief: that every Ethiopian home deserves access to world-class bedding. Founded in Addis Ababa, we've spent years sourcing the finest materials from across the globe—Mulberry silk from China, Egyptian cotton from the Nile Valley, and velvet weaves from Italian artisans.",
    philosophyTitle: "Our Philosophy",
    integrity: "Integrity",
    integrityDesc: "Every thread tells a story of honest craftsmanship",
    comfort: "Comfort",
    comfortDesc: "Your perfect night's sleep is our mission",
    localCare: "Local Care",
    localCareDesc: "Proudly serving Ethiopian homes with pride",
    exploreCollection: "Explore the Collection",
  },
  am: {
    heroLabel: "ቅርሳችን",
    heroTitle: "ፍፁም እንቅልፍን ማዘጋጀት",
    storyTitle: "የሽልማት ታሪክ",
    storyText: "Ethioconfurt ከቀላል እምነት የተወለደ፡ እያንዳንዱ የኢትዮጵያ ቤት የዓለምን ደረጃ ያለው አልጋ ልብስ ሊያገኝ ይገባል። በአዲስ አበባ የተመሰረተ፣ ከዓለም ዙሪያ ምርጥ ቁሶችን ለማግኘት ዓመታትን አሳለፍን—ከቻይና ሙለሪ ሱሪ፣ ከዓብይ ሸለቆ የግብፅ አበባ፣ እና ከጣሊያን አርበኞች ቨልቬት ፈርባይ።",
    philosophyTitle: "ፍልስፍናችን",
    integrity: "ታማኝነት",
    integrityDesc: "እያንዳንዱ ጥቅል የወንድማማችነት ታሪክ ይናገራል",
    comfort: "ምቾት",
    comfortDesc: "የእርስዎ ፍፁም እንቅልፍ ተልዕኮታችን ነው",
    localCare: "ለሀገር እንክብካቤ",
    localCareDesc: "በኢትዮጵያ ቤቶች ላይ ደማቅ ሰራን",
    exploreCollection: "ስብስብ ይመልከቱ",
  },
};

export default function AboutPage() {
  const [locale, setLocale] = useState('am');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'am';
    setLocale(storedLocale);
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

      <section className="py-20 md:py-32 text-center px-6">
        <p className="text-luxury-gold text-sm tracking-widest uppercase mb-4">
          {content.heroLabel}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
          {content.heroTitle}
        </h1>
        <div className="w-16 h-0.5 bg-gray-200 mx-auto" />
      </section>

      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 italic">
              {content.storyTitle}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {content.storyText}
            </p>
          </div>
          <div className="aspect-[4/5] relative overflow-hidden rounded-lg shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000"
              alt="Heritage"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-16 md:py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm tracking-widest uppercase text-luxury-gold font-semibold mb-12">
            {content.philosophyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-xl mb-4 italic text-white/90">
                {content.integrity}
              </h3>
              <p className="text-gray-400 text-sm">{content.integrityDesc}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 italic text-white/90">
                {content.comfort}
              </h3>
              <p className="text-gray-400 text-sm">{content.comfortDesc}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 italic text-white/90">
                {content.localCare}
              </h3>
              <p className="text-gray-400 text-sm">{content.localCareDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center">
        <Link
          href={`/${locale}/catalog`}
          className="inline-flex items-center gap-2 text-sm font-semibold hover:text-luxury-gold transition-colors"
        >
          {content.exploreCollection} <ArrowRight size={16} />
        </Link>
        <div className="mt-16 text-xs tracking-widest uppercase text-gray-300">
          © 2026 Ethioconfurt Premium
        </div>
      </footer>
    </div>
  );
}