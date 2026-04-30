import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const CallToOrderFAB = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        href="https://wa.me/251911223344" // Placeholder Ethiopian number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-transform hover:scale-110 active:scale-95"
        aria-label="Inquiry on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href="tel:+251911223344"
        className="bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 border border-white/20"
      >
        <Phone size={20} />
        <span className="font-semibold uppercase tracking-widest text-xs">Call to Order</span>
      </a>
    </div>
  );
};

export default CallToOrderFAB;
