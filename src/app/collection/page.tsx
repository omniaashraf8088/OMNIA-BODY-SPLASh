'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronRight, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';
import { PRODUCTS } from '@/data/products';

export default function CollectionsHubPage() {
  const { language, isRtl } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const ArrowIcon = isRtl ? () => <ArrowRight className="w-4 h-4 rotate-180" /> : ArrowRight;

  const womenCount = PRODUCTS.filter(p => p.category === 'feminine').length;
  const menCount = PRODUCTS.filter(p => p.category === 'masculine').length;

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      <Header onOpenSearch={() => setSearchOpen(true)} />

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
              {language === 'en' ? 'Collections' : 'المجموعات'}
            </span>
          </nav>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D8C3] text-[#493426] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
              <span>{language === 'en' ? 'MN OMNIA ATELIER' : 'عالم إم إن أومنيا'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#493426] tracking-tight leading-tight">
              {language === 'en' ? 'Signature Collections' : 'المجموعات الحصرية'}
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#8B674D] font-sans max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Select a dedicated collection to immerse yourself in curated fragrance rituals and high-shine lip glazes.'
                : 'اختاري مجموعتك المفضلة للانغماس في عالم من العطور الفاخرة وملمعات الشفاه المميزة.'}
            </p>
          </div>

          {/* Dual Collections Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20">
            {/* 1. Women's Collection Card */}
            <Link
              href="/collection/women"
              className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#C69A5A] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-[#F7F1E8]">
                <Image
                  src="/assets/posters/hero_poster.png"
                  alt="MN OMNIA Women's Collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/90 via-[#493426]/20 to-transparent" />

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-[#493426] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm">
                    {language === 'en' ? 'FEMININE ATELIER' : 'عالم المرأة'}
                  </span>
                  <span className="px-3 py-1 bg-[#C69A5A] text-[#101820] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                    {womenCount} {language === 'en' ? 'PRODUCTS' : 'منتجات'}
                  </span>
                </div>

                <div className="absolute bottom-6 inset-x-6 z-10 text-[#FFF9F1]">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E8D8C3] mb-1 block">
                    {language === 'en' ? 'LIP GLOSS & BODY SPLASH' : 'ليب جلوس وبودي سبلاش'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#FFF9F1]">
                    {language === 'en' ? "Women's Collection" : 'المجموعة النسائية'}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#FFF9F1]">
                <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Explore our dual feminine offerings: high-shine glass lip glazes and enchanting fine body splashes.'
                    : 'استكشفي تشكيلة المرأة المتكاملة: ملمع الشفاه الزجاجي فائق الترطيب ورذاذ البودي سبلاش العطري الساحر.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8D8C3]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#493426] group-hover:text-[#8B674D] transition-colors flex items-center gap-2">
                    <span>{language === 'en' ? 'ENTER WOMEN’S ATELIER' : 'دخول عالم المرأة'}</span>
                    <ArrowIcon />
                  </span>
                  <span className="text-xs font-serif italic text-[#8B674D]">2 Categories</span>
                </div>
              </div>
            </Link>

            {/* 2. Men's Collection Card */}
            <Link
              href="/collection/men"
              className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#101820] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-[#101820]">
                <Image
                  src="/assets/posters/men_cover.png"
                  alt="MN OMNIA Men's Collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/30 to-transparent" />

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-[#101820] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm border border-white/20">
                    {language === 'en' ? 'MASCULINE ATELIER' : 'عالم الرجل'}
                  </span>
                  <span className="px-3 py-1 bg-[#C69A5A] text-[#101820] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                    {menCount} {language === 'en' ? 'FRAGRANCES' : 'عطور'}
                  </span>
                </div>

                <div className="absolute bottom-6 inset-x-6 z-10 text-[#FFF9F1]">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#D1B99C] mb-1 block">
                    {language === 'en' ? 'FINE FRAGRANCE BODY SPLASH' : 'بودي سبلاش فاخر للرجال'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#FFF9F1]">
                    {language === 'en' ? "Men's Collection" : 'المجموعة الرجالية'}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#FFF9F1]">
                <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Commanding, clean, and modern fragrances formulated with quiet authority and maritime energy.'
                    : 'عطور رجالية راقية ونقية تمنحك ثقة كاملة وانتعاشاً متميزاً يعكس شخصيتك الواثقة.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8D8C3]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#493426] group-hover:text-[#8B674D] transition-colors flex items-center gap-2">
                    <span>{language === 'en' ? 'ENTER MEN’S ATELIER' : 'دخول عالم الرجل'}</span>
                    <ArrowIcon />
                  </span>
                  <span className="text-xs font-serif italic text-[#8B674D]">1 Category</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
