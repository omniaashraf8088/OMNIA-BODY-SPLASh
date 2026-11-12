'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';

export default function PromotionalBanner() {
  const { language, isRtl } = useLanguage();
  const { campaign } = useCampaign();
  const t = translations[language];

  if (!campaign.isActive) {
    return null;
  }

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#E8D8C3]/50 border-y border-[#D1B99C]/60 py-8 sm:py-10 relative overflow-hidden">
      {/* Decorative luxury accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D1B99C]/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#B89573]/20 blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#493426]/10 text-[#493426] text-[11px] font-sans font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
              <span>{t.campaign.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#493426] tracking-tight">
              {language === 'en' ? campaign.titleEn : campaign.titleAr}
            </h2>

            <p className="text-sm sm:text-base text-[#8B674D] font-sans max-w-xl">
              {language === 'en' ? campaign.subtitleEn : campaign.subtitleAr}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center md:text-end px-4 py-2 border-x border-[#D1B99C]/60">
              <span className="block text-[11px] uppercase tracking-widest text-[#8B674D] font-sans">
                {language === 'en' ? 'Limited Launch' : 'لفترة محدودة'}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#493426]">
                {campaign.discountPercentage}% OFF
              </span>
            </div>

            <Link
              href="#collection"
              className="px-6 py-3.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-all duration-300 text-xs tracking-[0.2em] font-sans font-semibold uppercase flex items-center gap-2 shadow-md group"
            >
              <span>{t.campaign.shopOffer}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
