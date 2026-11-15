'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Sparkles, Droplets, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
}

export default function CollectionSection({ onSelectProduct }: CollectionSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const feminineCount = PRODUCTS.filter(p => p.category === 'feminine').length;
  const bodySplashCount = PRODUCTS.filter(p => p.category === 'feminine' && p.subCategory === 'body-splash').length;
  const lipGlossCount = PRODUCTS.filter(p => p.category === 'feminine' && p.subCategory === 'lip-gloss').length;
  const masculineCount = PRODUCTS.filter(p => p.category === 'masculine').length;

  return (
    <section id="collection" className="py-20 bg-[#F7F1E8]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C3] text-[#493426] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
            <span>MN OMNIA COLLECTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#493426] tracking-tight">
            {t.collection.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#8B674D] font-sans leading-relaxed">
            {t.collection.subtitle}
          </p>
        </div>

        {/* Two Large Editorial Category Hero Cards with Direct Dedicated Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Feminine Category Card -> Links to /collection/women */}
          <div className="group relative h-[420px] sm:h-[460px] rounded-none overflow-hidden border border-[#E8D8C3] hover:border-[#8B674D] transition-all duration-500 shadow-md hover:shadow-xl">
            <Link href="/collection/women" className="absolute inset-0 z-10" aria-label="Women's Collection">
              <span className="sr-only">Explore Women's Collection</span>
            </Link>

            <Image
              src="/assets/posters/hero_poster.png"
              alt="Feminine Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/95 via-[#493426]/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FFF9F1] pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#E8D8C3] font-semibold">
                  {feminineCount} {language === 'en' ? 'Products' : 'منتجات'} • 2 {language === 'en' ? 'Categories' : 'أقسام'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif tracking-wide font-normal">
                {t.collection.feminineTitle}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#FFF9F1]/80 font-sans max-w-md leading-relaxed">
                {t.collection.feminineDesc}
              </p>

              {/* Direct Quick Category Links inside Card */}
              <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto z-20">
                <Link
                  href="/collection/women/body-splash"
                  className="px-3.5 py-1.5 bg-black/40 backdrop-blur-sm border border-[#FFF9F1]/30 hover:border-[#C69A5A] hover:bg-[#493426] text-[11px] font-sans uppercase tracking-wider text-[#FFF9F1] transition-all"
                >
                  {language === 'en' ? 'Body Splash (3)' : 'بودي سبلاش (3)'}
                </Link>
                <Link
                  href="/collection/women/lip-gloss"
                  className="px-3.5 py-1.5 bg-black/40 backdrop-blur-sm border border-[#FFF9F1]/30 hover:border-[#C69A5A] hover:bg-[#493426] text-[11px] font-sans uppercase tracking-wider text-[#FFF9F1] transition-all"
                >
                  {language === 'en' ? 'Lip Gloss (2)' : 'ليب جلوس (2)'}
                </Link>
              </div>

              <div className="mt-5 pointer-events-auto z-20">
                <Link
                  href="/collection/women"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFF9F1] text-[#493426] hover:bg-[#E8D8C3] transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold shadow-md"
                >
                  <span>{t.collection.exploreFeminine}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Masculine Category Card -> Links to /collection/men */}
          <div className="group relative h-[420px] sm:h-[460px] rounded-none overflow-hidden border border-[#E8D8C3] hover:border-[#8B674D] transition-all duration-500 shadow-md hover:shadow-xl">
            <Link href="/collection/men" className="absolute inset-0 z-10" aria-label="Men's Collection">
              <span className="sr-only">Explore Men's Collection</span>
            </Link>

            <Image
              src="/assets/posters/men_cover.png"
              alt="MN OMNIA Masculine Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FFF9F1] pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#D1B99C] font-semibold">
                  {masculineCount} {language === 'en' ? 'Fragrances' : 'عطور'} • {language === 'en' ? 'Signature Collection' : 'مجموعة خاصة'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif tracking-wide font-normal">
                {t.collection.masculineTitle}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#FFF9F1]/80 font-sans max-w-md leading-relaxed">
                {t.collection.masculineDesc}
              </p>

              {/* Direct Quick Category Link inside Card */}
              <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto z-20">
                <Link
                  href="/collection/men/body-splash"
                  className="px-3.5 py-1.5 bg-black/40 backdrop-blur-sm border border-[#FFF9F1]/30 hover:border-[#D1B99C] hover:bg-[#101820] text-[11px] font-sans uppercase tracking-wider text-[#FFF9F1] transition-all"
                >
                  {language === 'en' ? 'Body Splash For Men (3)' : 'بودي سبلاش رجالي (3)'}
                </Link>
              </div>

              <div className="mt-5 pointer-events-auto z-20">
                <Link
                  href="/collection/men"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFF9F1] text-[#493426] hover:bg-[#D1B99C] transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold shadow-md"
                >
                  <span>{t.collection.exploreMasculine}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Women's Section Dedicated Portals (BODY SPLASH & LIP GLOSS) */}
        <div className="mb-14 p-6 sm:p-8 bg-[#FFF9F1] border border-[#E8D8C3] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#8B674D]">
              {language === 'en' ? "DEDICATED WOMEN'S PORTALS" : 'أقسام المجموعة النسائية المستقلة'}
            </span>
            <h3 className="text-2xl font-serif text-[#493426] mt-1">
              {language === 'en' ? 'Explore By Dedicated Category' : 'اختاري وجهتكِ في عالم الجمال'}
            </h3>
            <p className="text-xs text-[#8B674D] font-sans mt-1">
              {language === 'en' 
                ? 'Each category features its own dedicated video experience and exclusive products'
                : 'كل قسم يحتوي على فيديو حصري وتجربة تصفح منفصلة تماماً'}
            </p>
          </div>

          {/* Direct Category Portals: Links directly to dedicated pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Category 1: BODY SPLASH -> Links to /collection/women/body-splash */}
            <Link
              href="/collection/women/body-splash"
              className="p-6 text-start transition-all duration-300 border flex items-center justify-between group bg-[#F7F1E8] text-[#493426] border-[#E8D8C3] hover:border-[#493426] hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-[#8B674D] group-hover:text-[#493426] transition-colors" />
                  <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#8B674D]">
                    150 ML • {language === 'en' ? '3 Fragrances' : '3 عطور'}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif tracking-wide font-medium">
                  {language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش'}
                </h4>
                <p className="text-xs mt-1 font-sans text-[#8B674D]">
                  {language === 'en' ? 'Vanilla • The Warm Night • Strawberry Cheesecake' : 'فانيليا • ذا وورم نايت • ستروبيري تشيزكيك'}
                </p>
              </div>
              <div className="px-3.5 py-2 text-xs font-sans font-semibold uppercase tracking-wider bg-[#493426] text-[#FFF9F1] border border-[#493426] flex items-center gap-1 group-hover:bg-[#8B674D] transition-colors">
                <span>{language === 'en' ? 'Open Page' : 'فتح القسم'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Category 2: LIP GLOSS -> Links to /collection/women/lip-gloss */}
            <Link
              href="/collection/women/lip-gloss"
              className="p-6 text-start transition-all duration-300 border flex items-center justify-between group bg-[#F7F1E8] text-[#493426] border-[#E8D8C3] hover:border-[#493426] hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#8B674D] group-hover:text-[#493426] transition-colors" />
                  <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#8B674D]">
                    1 ML • {language === 'en' ? '2 Shades' : 'درجتان'}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif tracking-wide font-medium">
                  {language === 'en' ? 'LIP GLOSS' : 'ليب جلوس'}
                </h4>
                <p className="text-xs mt-1 font-sans text-[#8B674D]">
                  {language === 'en' ? 'Nude • Rose' : 'نيود • روز'}
                </p>
              </div>
              <div className="px-3.5 py-2 text-xs font-sans font-semibold uppercase tracking-wider bg-[#493426] text-[#FFF9F1] border border-[#493426] flex items-center gap-1 group-hover:bg-[#8B674D] transition-colors">
                <span>{language === 'en' ? 'Open Page' : 'فتح القسم'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Global Navigation Pills Bar -> Each Pill Navigates to its Isolated Page */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12">
          {/* All products on Homepage */}
          <span className="px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] bg-[#493426] text-[#FFF9F1] border border-[#493426] shadow-md flex items-center gap-1.5 font-semibold">
            <span>{t.collection.all}</span>
            <span>({PRODUCTS.length})</span>
          </span>

          {/* Women's Collection Hub */}
          <Link
            href="/collection/women"
            className="px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 bg-white/80 hover:bg-white text-[#493426] border border-[#E8D8C3] hover:border-[#8B674D] shadow-sm hover:shadow flex items-center gap-1"
          >
            <span>{t.collection.feminineTitle}</span>
            <span className="text-[10px] text-[#8B674D]">({feminineCount})</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B674D]" />
          </Link>

          {/* Body Splash */}
          <Link
            href="/collection/women/body-splash"
            className="px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 bg-white/80 hover:bg-white text-[#493426] border border-[#E8D8C3] hover:border-[#8B674D] shadow-sm hover:shadow flex items-center gap-1"
          >
            <span>{language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش'}</span>
            <span className="text-[10px] text-[#8B674D]">({bodySplashCount})</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B674D]" />
          </Link>

          {/* Lip Gloss */}
          <Link
            href="/collection/women/lip-gloss"
            className="px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 bg-white/80 hover:bg-white text-[#493426] border border-[#E8D8C3] hover:border-[#8B674D] shadow-sm hover:shadow flex items-center gap-1"
          >
            <span>{language === 'en' ? 'LIP GLOSS' : 'ليب جلوس'}</span>
            <span className="text-[10px] text-[#8B674D]">({lipGlossCount})</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B674D]" />
          </Link>

          {/* Men's Collection */}
          <Link
            href="/collection/men/body-splash"
            className="px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 bg-white/80 hover:bg-white text-[#493426] border border-[#E8D8C3] hover:border-[#8B674D] shadow-sm hover:shadow flex items-center gap-1"
          >
            <span>{t.collection.masculineTitle}</span>
            <span className="text-[10px] text-[#8B674D]">({masculineCount})</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B674D]" />
          </Link>
        </div>

        {/* Product Cards Grid: Complete Flagship Discovery Catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectStory={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
