'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  locale: string;
}

const Footer = ({ locale }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { href: `/${locale}/catalog`, label: 'Catalog' },
      { href: `/${locale}/about`, label: 'About' },
    ],
    connect: [
      { href: 'tel:+251950294422', label: 'Call Support' },
      { href: 'https://wa.me/251950294422', label: 'WhatsApp' },
      { href: 'mailto:hello@yafet.com', label: 'Email' },
    ],
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left space-y-4">
            <h2 className="font-bold text-3xl tracking-tight text-white uppercase">YAFET</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Quality bedding for every Ethiopian home. Durable, comfortable, and locally delivered.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center md:text-right">
            {footerLinks.connect.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-brand-warm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            © {currentYear} YAFET BEDDING. QUALITY YOU CAN TRUST.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;