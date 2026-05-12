'use client';

import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

interface ContactContent {
  headerLabel: string;
  headerTitle: string;
  headerTitleItalic: string;
  headerDesc: string;
  phone: string;
  phoneDesc: string;
  whatsapp: string;
  whatsappDesc: string;
  emailContact: string;
  emailDesc: string;
  showroom: string;
  showroomAddress: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  formDetails: string;
  formSubmit: string;
  successMsg: string;
}

const translations: Record<string, ContactContent> = {
  en: {
    headerLabel: "Get in Touch",
    headerTitle: "Concierge",
    headerTitleItalic: "Service",
    headerDesc: "Our team is available to assist with inquiries, orders, and special requests.",
    phone: "Phone",
    phoneDesc: "Call us directly",
    whatsapp: "WhatsApp",
    whatsappDesc: "Send a message",
    emailContact: "Email",
    emailDesc: "hello@yafet.com",
    showroom: "Showroom",
    showroomAddress: "Bole Road, Addis Ababa",
    formTitle: "Send an Inquiry",
    formName: "Your Name",
    formPhone: "Phone Number",
    formDetails: "Your Inquiry",
    formSubmit: "Send Request",
    successMsg: "Thank you! We'll be in touch soon.",
  },
  am: {
    headerLabel: "ያግኙን",
    headerTitle: "ኮንሲየርጅ",
    headerTitleItalic: "አገልግሎት",
    headerDesc: "ለጥያቄዎች፣ ስጦች፣ እና ልዩ ስጦታዎች አማካሪዎቻችን ዝግጁ ናቸው።",
    phone: "ስልክ",
    phoneDesc: "በራስ ይደውሉ",
    whatsapp: "ዋትሳፕ",
    whatsappDesc: "መልእክት ይላኩ",
    emailContact: "ኢሜይል",
    emailDesc: "hello@yafet.com",
    showroom: "ሱቅ",
    showroomAddress: "ቦሌ ማለት፣ አዲስ አበባ",
    formTitle: "ጥያቄ ላኩ",
    formName: "ስምዎ",
    formPhone: "ስልክ ቁጥር",
    formDetails: "ጥያቄዎ",
    formSubmit: "ላኩ",
    successMsg: "አመሰጣለሁ! በቅርቡ እናግኛለን።",
  },
};

export default function ContactPage() {
  const [locale, setLocale] = useState('en');
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLocale(storedLocale);
  }, []);

  const content = translations[locale] || translations.en;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', details: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    { icon: <Phone size={24} />, label: content.phone, value: "+251 911 22 33 44", href: "tel:+251911223344" },
    { icon: <MessageCircle size={24} />, label: content.whatsapp, value: content.whatsappDesc, href: "https://wa.me/251911223344" },
    { icon: <Mail size={24} />, label: content.emailContact, value: content.emailDesc, href: "mailto:hello@yafet.com" },
    { icon: <MapPin size={24} />, label: content.showroom, value: content.showroomAddress, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="font-serif text-xl tracking-wider text-black hover:text-luxury-gold">
            YAFET
          </Link>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-white transition-colors"
          >
            {locale === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-16">
          <p className="text-luxury-gold text-sm tracking-widest uppercase mb-4">
            {content.headerLabel}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            {content.headerTitle} <span className="italic">{content.headerTitleItalic}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {content.headerDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="p-8 bg-white rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="mb-4 text-gray-300">
                {item.icon}
              </div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-400 mb-2">
                {item.label}
              </h3>
              <p className="text-lg font-serif text-gray-800">{item.value}</p>
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-xl">
          <h2 className="text-2xl font-serif mb-8 text-center">{content.formTitle}</h2>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-serif text-gray-800">{content.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{content.formName}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold transition-colors"
                    placeholder="e.g. Dawit K."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{content.formPhone}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold transition-colors"
                    placeholder="+251 ..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{content.formDetails}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 font-semibold tracking-wider uppercase hover:bg-luxury-gold transition-colors"
              >
                {content.formSubmit}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-gray-100">
        <span className="text-sm tracking-widest uppercase text-gray-300">
          © 2026 Yafet Premium • Addis Ababa
        </span>
      </footer>
    </div>
  );
}