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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-serif text-2xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-black transition-colors">
              {content.breadcrumb.home}
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${locale}/catalog`} className="hover:text-black transition-colors">
              {content.breadcrumb.catalog}
            </Link>
            <ChevronRight size={14} />
            <span className="text-black">{product.name}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
          >
            {locale === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <div className="aspect-[4/5] relative overflow-hidden bg-white rounded-lg shadow-lg">
              <img
                src={product.image_urls[0]}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider">
                  {content.signatureCollection}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className="fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                ({content.verified})
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <span className="text-3xl font-light text-gray-900">{product.price}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                <span className="text-xs uppercase font-semibold text-luxury-gold">
                  {content.negotiable}
                </span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-10 text-lg">
              "{product.description}"
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-luxury-gold/10 rounded-full text-luxury-gold">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">
                    {content.textileIntegrity}
                  </h3>
                  <p className="text-gray-500 text-sm">{content.textileIntegrityDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-luxury-gold/10 rounded-full text-luxury-gold">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">
                    {content.whiteGloveDelivery}
                  </h3>
                  <p className="text-gray-500 text-sm">{content.whiteGloveDeliveryDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-luxury-gold/10 rounded-full text-luxury-gold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">
                    {content.yafetGuarantee}
                  </h3>
                  <p className="text-gray-500 text-sm">{content.yafetGuaranteeDesc}</p>
                </div>
              </div>
            </div>

            <a
              href="tel:+251911223344"
              className="w-full bg-black text-white py-5 text-center font-semibold tracking-wider uppercase hover:bg-luxury-gold transition-colors shadow-xl"
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