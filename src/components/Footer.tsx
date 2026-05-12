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
      { href: 'tel:+251911223344', label: 'Call Support' },
      { href: 'https://wa.me/251911223344', label: 'WhatsApp' },
      { href: 'mailto:hello@yafet.com', label: 'Email' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div>
            <h2 className="font-serif text-2xl mb-4">YAFET</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium bedding for the Ethiopian home. Quality verified, delivered with care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Explore
              </h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            © {currentYear} Yafet Premium. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;