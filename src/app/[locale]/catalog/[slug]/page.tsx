'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Truck, ChevronRight, Star, Loader2 } from 'lucide-react';
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

interface ProductContent {
  verified: string;
  negotiable: string;
  textileIntegrity: string;
  textileIntegrityDesc: string;
  whiteGloveDelivery: string;
  whiteGloveDeliveryDesc: string;
  yafetGuarantee: string;
  yafetGuaranteeDesc: string;
  inquireOrder: string;
  signatureCollection: string;
  breadcrumb: {
    home: string;
    catalog: string;
  };
}

const translations: Record<string, ProductContent> = {
  en: {
    verified: "Verified",
    negotiable: "Negotiable",
    textileIntegrity: "Textile Integrity",
    textileIntegrityDesc: "Premium materials, verified quality",
    whiteGloveDelivery: "White-Glove Delivery",
    whiteGloveDeliveryDesc: "Careful handling & delivery",
    yafetGuarantee: "The Yafet Guarantee",
    yafetGuaranteeDesc: "100% satisfaction guaranteed",
    inquireOrder: "Inquire & Order Now",
    signatureCollection: "Signature Collection",
    breadcrumb: {
      home: "Home",
      catalog: "Catalog",
    },
  },
  am: {
    verified: "የተረጋገጠ",
    negotiable: "ሊደራደር ይችላል",
    textileIntegrity: "የቁም ጥራት",
    textileIntegrityDesc: "ላቀ አምርቲያሎች፣ የተረጋገጠ ጥራት",
    whiteGloveDelivery: "ትኩረት ማጓጓዝ",
    whiteGloveDeliveryDesc: "ጥንቃቄ የተሞላው ማጓጓዝ",
    yafetGuarantee: "የYafet ማረጋገጫ",
    yafetGuaranteeDesc: "100% የሚረካ ማረጋገጫ",
    inquireOrder: "ይወስኑ እና ይላኩ",
    signatureCollection: "ፊርማ ስብስብ",
    breadcrumb: {
      home: "ቤት",
      catalog: "ካታሎግ",
    },
  },
};

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLocale(storedLocale);

    async function fetchProduct() {
      if (!params.slug) return;

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.slug)
        .single();

      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.slug]);

  const content = translations[locale] || translations.en;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-brand-blue" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-bold text-2xl text-slate-400 uppercase tracking-widest">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-slate-400">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">
              {content.breadcrumb.home}
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <Link href={`/${locale}/catalog`} className="hover:text-brand-blue transition-colors">
              {content.breadcrumb.catalog}
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-900 truncate max-w-[100px] md:max-w-none">{product.name}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-slate-100 text-brand-blue text-sm font-bold rounded-full hover:bg-brand-blue hover:text-white transition-colors"
          >
            {locale === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-6">
            <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 rounded-2xl shadow-xl border border-slate-100">
              <img
                src={product.image_urls[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-brand-warm text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
                  {content.signatureCollection}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-brand-warm text-brand-warm" />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                {content.verified}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8 pb-8 border-b border-slate-100">
              <span className="text-4xl font-bold text-brand-blue">{product.price}</span>
              <div className="flex items-center gap-2 bg-brand-warm/10 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-brand-warm animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-brand-warm tracking-widest">
                  {content.negotiable}
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-10 text-lg font-medium italic">
              "{product.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-12">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-900">
                    {content.textileIntegrity}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium">{content.textileIntegrityDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-900">
                    {content.whiteGloveDelivery}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium">{content.whiteGloveDeliveryDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-900">
                    {content.yafetGuarantee}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium">{content.yafetGuaranteeDesc}</p>
                </div>
              </div>
            </div>

            <a
              href="tel:+251911223344"
              className="w-full bg-brand-blue text-white py-5 rounded-2xl text-center font-bold tracking-widest uppercase hover:bg-brand-warm transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Loader2 size={20} className="hidden" /> {/* Placeholder for state */}
              {content.inquireOrder}
            </a>
          </div>
        </div>
      </main>

      <CallToOrderFAB />
    </div>
  );
};

export default ProductPage;