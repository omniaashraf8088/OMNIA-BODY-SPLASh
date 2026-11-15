'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronRight, Shield, Droplets } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';
import { PRODUCTS } from '@/data/products';

export default function MensCollectionPage() {
  const { language, isRtl } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const ArrowIcon = isRtl ? () => <ArrowRight className="w-4 h-4 rotate-180" /> : ArrowRight;

  const menCount = PRODUCTS.filter(p => p.category === 'masculine').length;

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      {/* Header Contextualized to Masculine Collection */}
      <Header currentCollection="masculine" onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-8"
          >
            <Link href="/" className="hover:text-[#493426] transition-colors">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Link>
            <ChevronRight className={`w-3 h-3 text-[#E8D8C3] ${isRtl ? 'rotate-180' : ''}`} />
            <span className="text-[#493426] font-semibold">
              {language === 'en' ? "Men's Collection" : 'المجموعة الرجالية'}
            </span>
          </nav>

          {/* Editorial Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101820] text-[#FFF9F1] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#C69A5A]" />
              <span>{language === 'en' ? "MN OMNIA • MEN'S ATELIER" : 'تشكيلة الرجال الفاخرة'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#493426] tracking-tight leading-tight">
              {language === 'en' ? "Men's Collection" : 'المجموعة الرجالية'}
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#8B674D] font-sans max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Discover our masculine line of fine fragrance body splashes crafted with quiet authority and modern freshness.'
                : 'استكشف تشكيلتنا الرجالية الحصرية من البودي سبلاش المصممة بحضور واثق وانتعاش عصري يدوم طويلاً.'}
            </p>
          </div>

          {/* Men's Category Options Card */}
          <div className="max-w-2xl mx-auto mb-20">
            <Link
              href="/collection/men/body-splash"
              className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#493426] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container with Men's Campaign Visual */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#101820]">
                <Image
                  src="/assets/posters/men_cover.png"
                  alt="MN OMNIA Men's Body Splash Collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  className="object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/40 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-[#101820] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm border border-white/20">
                    {language === 'en' ? 'MASCULINE ESSENTIALS' : 'أساسيات الرجل العصري'}
                  </span>
                  <span className="px-3 py-1 bg-[#C69A5A] text-[#101820] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                    {menCount} {language === 'en' ? 'FRAGRANCES' : 'عطور'}
                  </span>
                </div>

                {/* Title over Image */}
                <div className="absolute bottom-6 inset-x-6 z-10 text-[#FFF9F1]">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#D1B99C] mb-1 block">
                    {language === 'en' ? 'FINE FRAGRANCE BODY SPLASH' : 'بودي سبلاش فاخر للرجال'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#FFF9F1]">
                    {language === 'en' ? 'BODY SPLASH FOR MEN' : 'بودي سبلاش للرجال'}
                  </h2>
                </div>
              </div>

              {/* Informational Lower Card Area */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#FFF9F1]">
                <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Explore our masculine body splash fragrances: Grey Musk (clean & refined woods), Navy Aqua (fresh oceanic breeze), and Oud Noir (royal dark smoky oud).'
                    : 'استكشف عطور البودي سبلاش الرجالية الثلاثة: جراي مسك (نقاء وعصرية الأخشاب)، نافي أكوا (انتعاش نسيم المحيط)، وعود نوار (فخامة العود الملكي الداكن).'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8D8C3]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#493426] group-hover:text-[#8B674D] transition-colors flex items-center gap-2">
                    <span>{language === 'en' ? "EXPLORE MEN'S BODY SPLASH" : 'استعراض عطور الرجال'}</span>
                    <ArrowIcon />
                  </span>
                  <span className="text-xs font-serif italic text-[#8B674D]">150 ML</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Isolated to Masculine Collection */}
      <Footer collection="masculine" />

      {/* Shopping Bag Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
