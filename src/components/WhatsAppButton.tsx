'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({
  phoneNumber = '[WHATSAPP_NUMBER_WITH_COUNTRY_CODE]'
}: WhatsAppButtonProps) {
  const { language, isRtl } = useLanguage();
  const t = translations[language];
  const [showTooltip, setShowTooltip] = useState(false);

  const encodedMessage = encodeURIComponent(t.whatsapp.prefill);
  const whatsappUrl = phoneNumber.startsWith('[')
    ? `https://wa.me/?text=${encodedMessage}`
    : `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div
      className={`fixed bottom-6 z-40 flex items-center gap-3 ${
        isRtl ? 'left-6' : 'right-6'
      }`}
    >
      {/* Optional luxury preview tooltip on hover */}
      {showTooltip && (
        <div className="bg-[#493426] text-[#FFF9F1] px-4 py-2 rounded-full text-xs font-sans shadow-xl border border-[#D1B99C]/40 animate-in fade-in hidden sm:flex items-center gap-2">
          <span>{t.whatsapp.floatingTooltip}</span>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact MN OMNIA on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
        <div className="w-7 h-7 relative">
          <Image
            src="/assets/social/whatsapp.svg"
            alt="WhatsApp"
            fill
            className="object-contain filter invert"
          />
        </div>
      </a>
    </div>
  );
}
