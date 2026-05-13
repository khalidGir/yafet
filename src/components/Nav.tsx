'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavProps {
  locale: string;
}

const Nav = ({ locale }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: 'Home', hrefAm: `/${locale}` },
    { href: `/${locale}/catalog`, label: 'Catalog', hrefAm: `/${locale}/catalog` },
    { href: `/${locale}/about`, label: 'About', hrefAm: `/${locale}/about` },
    { href: `/${locale}/contact`, label: 'Contact', hrefAm: `/${locale}/contact` },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            href={`/${locale}`} 
            className="font-serif text-xl md:text-2xl tracking-wider text-black hover:text-luxury-gold transition-colors"
          >
            YAFET
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-luxury-gold hover:text-white rounded-full transition-colors"
            >
              {locale === 'en' ? 'አማ' : 'EN'}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-black"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-gray-600 hover:text-black py-2"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="mt-2 px-4 py-3 text-sm font-bold bg-slate-100 text-slate-900 hover:bg-brand-blue hover:text-white rounded-lg transition-colors text-left"
              >
                {locale === 'en' ? 'Switch to አማርኛ' : 'Switch to English'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;