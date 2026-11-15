'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronRight, Droplets, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';
import { PRODUCTS } from '@/data/products';

export default function WomensCollectionPage() {
  const { language, isRtl } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const ArrowIcon = isRtl ? () => <ArrowRight className="w-4 h-4 rotate-180" /> : ArrowRight;

  const bodySplashCount = PRODUCTS.filter(
    p => p.category === 'feminine' && p.subCategory === 'body-splash'
  ).length;
  const lipGlossCount = PRODUCTS.filter(
    p => p.category === 'feminine' && p.subCategory === 'lip-gloss'
  ).length;

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      {/* Header Contextualized to Women's Collection */}
      <Header currentCollection="feminine" onOpenSearch={() => setSearchOpen(true)} />

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
              {language === 'en' ? "Women's Collection" : 'المجموعة النسائية'}
            </span>
          </nav>

          {/* Editorial Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D8C3] text-[#493426] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
              <span>{language === 'en' ? "MN OMNIA • WOMEN'S ATELIER" : 'تشكيلة المرأة الفاخرة'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#493426] tracking-tight leading-tight">
              {language === 'en' ? "Women's Collection" : 'المجموعة النسائية'}
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#8B674D] font-sans max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Select a category to discover dedicated campaigns, formulations, and tailored fragrance rituals.'
                : 'اختاري الفئة المناسبة لاستعراض الحملة الإعلانية والمنتجات الحصرية المخصصة لكل تجربة.'}
            </p>
          </div>

          {/* EXACTLY TWO CATEGORY OPTIONS: 1. Lip Gloss | 2. Body Splash */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20">
            {/* Category Option 1: LIP GLOSS */}
            <Link
              href="/collection/women/lip-gloss"
              className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#C69A5A] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container with Luxury Studio Visual */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-[#F7F1E8]">
                <Image
                  src="/assets/products/lipgloss_nude.png"
                  alt="MN OMNIA Lip Gloss"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/90 via-[#493426]/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-[#493426] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm">
                    {language === 'en' ? 'NEW LAUNCH' : 'إصدار جديد'}
                  </span>
                  <span className="px-3 py-1 bg-[#C69A5A] text-[#101820] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                    {lipGlossCount} {language === 'en' ? 'SHADES' : 'درجات'}
                  </span>
                </div>

                {/* Title over Image on mobile */}
                <div className="absolute bottom-6 inset-x-6 z-10 text-[#FFF9F1]">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E8D8C3] mb-1 block">
                    {language === 'en' ? 'HIGH-SHINE HYDRATION' : 'لمعان وترطيب مائي'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#FFF9F1]">
                    {language === 'en' ? 'LIP GLOSS' : 'ملمع الشفاه'}
                  </h2>
                </div>
              </div>

              {/* Informational Lower Card Area */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#FFF9F1]">
                <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Explore our newly launched lip gloss collection in Nude and Rose. Formulated with a silky, non-sticky cushion glaze for glass-like dimension.'
                    : 'استكشفي تشكيلة ملمع الشفاه الجديدة بدرجتي النيود والروز. تركيبة زجاجية غير لزجة تمنح الشفاه امتلاءً وترطيباً يدوم طوال اليوم.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8D8C3]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#493426] group-hover:text-[#8B674D] transition-colors flex items-center gap-2">
                    <span>{language === 'en' ? 'DISCOVER LIP GLOSS' : 'استعراض ملمع الشفاه'}</span>
                    <ArrowIcon />
                  </span>
                  <span className="text-xs font-serif italic text-[#8B674D]">10 ML</span>
                </div>
              </div>
            </Link>

            {/* Category Option 2: BODY SPLASH */}
            <Link
              href="/collection/women/body-splash"
              className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#C69A5A] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container with Campaign Visual */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-[#F7F1E8]">
                <Image
                  src="/assets/posters/hero_poster.png"
                  alt="MN OMNIA Women's Body Splash"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/90 via-[#493426]/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-[#493426] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm">
                    {language === 'en' ? 'SIGNATURE SCENTS' : 'العطور التوقيعية'}
                  </span>
                  <span className="px-3 py-1 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                    {bodySplashCount} {language === 'en' ? 'PRODUCTS' : 'منتجات'}
                  </span>
                </div>

                {/* Title over Image on mobile */}
                <div className="absolute bottom-6 inset-x-6 z-10 text-[#FFF9F1]">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E8D8C3] mb-1 block">
                    {language === 'en' ? 'LUXURY FINE MISTS' : 'رذاذ معطر فاخر'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#FFF9F1]">
                    {language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش'}
                  </h2>
                </div>
              </div>

              {/* Informational Lower Card Area */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#FFF9F1]">
                <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Delve into our signature body splash fragrances: Vanilla, The Warm Night, and Strawberry Cheesecake, crafted with fine fragrance oils for an all-day sillage.'
                    : 'استمتعي بتشكيلة البودي سبلاش المميزة: فانيليا، ذا وورم نايت، وستروبيري تشيزكيك، بزيوت عطرية فاخرة تمنحك انتعاشاً وثباتاً ساحراً.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8D8C3]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#493426] group-hover:text-[#8B674D] transition-colors flex items-center gap-2">
                    <span>{language === 'en' ? 'DISCOVER BODY SPLASH' : 'استعراض البودي سبلاش'}</span>
                    <ArrowIcon />
                  </span>
                  <span className="text-xs font-serif italic text-[#8B674D]">150 ML</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Isolated to Women's Collection */}
      <Footer collection="feminine" />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
