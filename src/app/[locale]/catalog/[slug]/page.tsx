'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Truck, ChevronRight, Star, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CallToOrderFAB from '@/components/CallToOrderFAB';
import type { Product, Variant } from '@/lib/types';

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
  colorsAvailable: string;
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
    yafetGuarantee: "The Ethioconfurt Guarantee",
    yafetGuaranteeDesc: "100% satisfaction guaranteed",
    inquireOrder: "Inquire & Order Now",
    signatureCollection: "Signature Collection",
    colorsAvailable: "Colors Available",
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
    yafetGuarantee: "የEthioconfurt ማረጋገጫ",
    yafetGuaranteeDesc: "100% የሚረካ ማረጋገጫ",
    inquireOrder: "ይወስኑ እና ይላኩ",
    signatureCollection: "ፊርማ ስብስብ",
    colorsAvailable: "የሚገኙ ቀለሞች",
    breadcrumb: {
      home: "ቤት",
      catalog: "ካታሎግ",
    },
  },
};

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('am');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'am';
    setLocale(storedLocale);

    async function fetchProduct() {
      if (!params.slug) return;

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.slug)
        .single();

      if (data) {
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.slug]);

  const content = translations[locale] || translations.am;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const displayPrice = selectedVariant?.price || product?.price || '';
  const displayImages = selectedVariant?.image_urls || product?.image_urls || [];
  const hasVariants = product?.variants && product.variants.length > 0;

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
            {locale === 'am' ? '🇬🇧' : '🇪🇹'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-6">
            <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 rounded-2xl shadow-xl border border-slate-100">
              <img
                src={displayImages[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-brand-warm text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
                  {content.signatureCollection}
                </span>
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((url, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
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
              <span className="text-4xl font-bold text-brand-blue">{displayPrice}</span>
              <div className="flex items-center gap-2 bg-brand-warm/10 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-brand-warm animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-brand-warm tracking-widest">
                  {content.negotiable}
                </span>
              </div>
            </div>

            {hasVariants && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  {content.colorsAvailable}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedVariant?.color === v.color
                          ? 'border-brand-blue bg-brand-blue/5'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        {v.image_urls[0] && (
                          <img src={v.image_urls[0]} alt={v.color} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className={`text-sm font-bold ${
                        selectedVariant?.color === v.color ? 'text-brand-blue' : 'text-slate-700'
                      }`}>
                        {v.color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-slate-600 leading-relaxed mb-10 text-lg font-medium italic">
              &ldquo;{product.description}&rdquo;
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
              href="tel:+251950294422"
              className="w-full bg-brand-blue text-white py-5 rounded-2xl text-center font-bold tracking-widest uppercase hover:bg-brand-warm transition-all shadow-xl flex items-center justify-center gap-3"
            >
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
