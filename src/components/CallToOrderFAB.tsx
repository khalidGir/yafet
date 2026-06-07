'use client';

import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface FABContent {
  whatsapp: string;
  callToOrder: string;
}

const translations: Record<string, FABContent> = {
  en: {
    whatsapp: "WhatsApp",
    callToOrder: "Call to Order",
  },
  am: {
    whatsapp: "ዋትሳፕ",
    callToOrder: "ይደውሉ",
  },
};

const CallToOrderFAB = () => {
  const [locale, setLocale] = useState('am');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'am';
    setLocale(storedLocale);
  }, []);

  const content = translations[locale] || translations.am;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        href="https://wa.me/251950294422"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all hover:scale-110 active:scale-95 flex flex-col items-center gap-1"
        aria-label={content.whatsapp}
      >
        <MessageCircle size={24} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{content.whatsapp}</span>
      </a>
      <a
        href="tel:+251950294422"
        className="bg-brand-blue text-white px-5 py-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-brand-warm transition-all hover:scale-105 active:scale-95 border border-white/20"
      >
        <Phone size={20} />
        <span className="font-bold uppercase tracking-wider text-xs">{content.callToOrder}</span>
      </a>
    </div>
  );
};

export default CallToOrderFAB;