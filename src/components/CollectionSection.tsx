'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Sparkles, Droplets } from 'lucide-react';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
}

export default function CollectionSection({ onSelectProduct }: CollectionSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'all' | 'feminine' | 'masculine'>('all');
  const [womenCategory, setWomenCategory] = useState<'all' | 'body-splash' | 'lip-gloss'>('all');

  // Filter products based on activeTab and womenCategory
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'masculine') {
      return p.category === 'masculine';
    }
    if (activeTab === 'feminine') {
      if (p.category !== 'feminine') return false;
      if (womenCategory === 'all') return true;
      return p.subCategory === womenCategory;
    }
    // activeTab === 'all'
    if (womenCategory === 'body-splash') {
      return p.category === 'feminine' && p.subCategory === 'body-splash';
    }
    if (womenCategory === 'lip-gloss') {
      return p.category === 'feminine' && p.subCategory === 'lip-gloss';
    }
    return true;
  });

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

        {/* Two Large Editorial Category Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Feminine Category Card */}
          <div
            id="feminine"
            onClick={() => {
              setActiveTab('feminine');
              setWomenCategory('all');
            }}
            className={`group relative h-[360px] sm:h-[420px] rounded-none overflow-hidden cursor-pointer border transition-all duration-500 ${
              activeTab === 'feminine'
                ? 'border-[#493426] ring-2 ring-[#493426]/20 shadow-xl'
                : 'border-[#E8D8C3] hover:border-[#D1B99C]'
            }`}
          >
            <Image
              src="/assets/posters/hero_poster.png"
              alt="Feminine Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/90 via-[#493426]/30 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FFF9F1]">
              <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#E8D8C3] mb-1">
                {feminineCount} {language === 'en' ? 'Products' : 'منتجات'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif tracking-wide">
                {t.collection.feminineTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#FFF9F1]/80 font-sans max-w-md leading-relaxed">
                {t.collection.feminineDesc}
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#FFF9F1] text-[#493426] group-hover:bg-[#E8D8C3] transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold"
                >
                  {t.collection.exploreFeminine}
                </button>
              </div>
            </div>
          </div>

          {/* Masculine Category Card */}
          <div
            id="masculine"
            onClick={() => {
              setActiveTab('masculine');
              setWomenCategory('all');
            }}
            className={`group relative h-[360px] sm:h-[420px] rounded-none overflow-hidden cursor-pointer border transition-all duration-500 ${
              activeTab === 'masculine'
                ? 'border-[#493426] ring-2 ring-[#493426]/20 shadow-xl'
                : 'border-[#E8D8C3] hover:border-[#D1B99C]'
            }`}
          >
            <Image
              src="/assets/posters/men_cover.png"
              alt="MN OMNIA Masculine Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/30 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FFF9F1]">
              <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#D1B99C] mb-1">
                {masculineCount} {language === 'en' ? 'Fragrances' : 'عطور'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif tracking-wide">
                {t.collection.masculineTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#FFF9F1]/80 font-sans max-w-md leading-relaxed">
                {t.collection.masculineDesc}
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#FFF9F1] text-[#493426] group-hover:bg-[#D1B99C] transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold"
                >
                  {t.collection.exploreMasculine}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Women's Section Interactive Categories (BODY SPLASH & LIP GLOSS) */}
        {(activeTab === 'feminine' || activeTab === 'all') && (
          <div className="mb-14 p-6 sm:p-8 bg-[#FFF9F1] border border-[#E8D8C3] shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#8B674D]">
                {language === 'en' ? "WOMEN'S CATEGORIES" : 'أقسام المجموعة النسائية'}
              </span>
              <h3 className="text-2xl font-serif text-[#493426] mt-1">
                {language === 'en' ? 'Choose Your Indulgence' : 'اختاري تجربتكِ الفاخرة'}
              </h3>
            </div>

            {/* Interactive Category Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Category 1: BODY SPLASH */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('feminine');
                  setWomenCategory('body-splash');
                }}
                className={`p-6 text-start transition-all duration-300 border flex items-center justify-between group ${
                  activeTab === 'feminine' && womenCategory === 'body-splash'
                    ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-lg ring-2 ring-[#C69A5A]/50'
                    : 'bg-[#F7F1E8] text-[#493426] border-[#E8D8C3] hover:border-[#8B674D] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className={`w-4 h-4 ${
                      activeTab === 'feminine' && womenCategory === 'body-splash' ? 'text-[#C69A5A]' : 'text-[#8B674D]'
                    }`} />
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase">
                      150 ML • {language === 'en' ? '3 Fragrances' : '3 عطور'}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif tracking-wide font-medium">
                    {language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش'}
                  </h4>
                  <p className={`text-xs mt-1 font-sans ${
                    activeTab === 'feminine' && womenCategory === 'body-splash' ? 'text-[#E8D8C3]' : 'text-[#8B674D]'
                  }`}>
                    {language === 'en' ? 'Vanilla • The Warm Night • Strawberry Cheesecake' : 'فانيليا • ذا وورم نايت • ستروبيري تشيزكيك'}
                  </p>
                </div>
                <div className={`px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border ${
                  activeTab === 'feminine' && womenCategory === 'body-splash'
                    ? 'bg-[#C69A5A] text-[#101820] border-[#C69A5A]'
                    : 'bg-white text-[#493426] border-[#D1B99C]'
                }`}>
                  {language === 'en' ? 'View' : 'عرض'}
                </div>
              </button>

              {/* Category 2: LIP GLOSS */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('feminine');
                  setWomenCategory('lip-gloss');
                }}
                className={`p-6 text-start transition-all duration-300 border flex items-center justify-between group ${
                  activeTab === 'feminine' && womenCategory === 'lip-gloss'
                    ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-lg ring-2 ring-[#C69A5A]/50'
                    : 'bg-[#F7F1E8] text-[#493426] border-[#E8D8C3] hover:border-[#8B674D] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${
                      activeTab === 'feminine' && womenCategory === 'lip-gloss' ? 'text-[#C69A5A]' : 'text-[#8B674D]'
                    }`} />
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase">
                      10 ML • {language === 'en' ? '2 Shades' : 'درجتان'}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif tracking-wide font-medium">
                    {language === 'en' ? 'LIP GLOSS' : 'ليب جلوس'}
                  </h4>
                  <p className={`text-xs mt-1 font-sans ${
                    activeTab === 'feminine' && womenCategory === 'lip-gloss' ? 'text-[#E8D8C3]' : 'text-[#8B674D]'
                  }`}>
                    {language === 'en' ? 'Nude • Rose' : 'نيود • روز'}
                  </p>
                </div>
                <div className={`px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border ${
                  activeTab === 'feminine' && womenCategory === 'lip-gloss'
                    ? 'bg-[#C69A5A] text-[#101820] border-[#C69A5A]'
                    : 'bg-white text-[#493426] border-[#D1B99C]'
                }`}>
                  {language === 'en' ? 'View' : 'عرض'}
                </div>
              </button>
            </div>

            {/* Quick Reset / All Feminine Button */}
            {activeTab === 'feminine' && womenCategory !== 'all' && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setWomenCategory('all')}
                  className="text-xs font-sans text-[#8B674D] hover:text-[#493426] underline tracking-wider uppercase font-semibold"
                >
                  {language === 'en' ? '← View All 5 Women’s Products' : '← عرض جميع منتجات النساء (5)'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Global Tab Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-12">
          <button
            onClick={() => {
              setActiveTab('all');
              setWomenCategory('all');
            }}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'all' && womenCategory === 'all'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/70 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.all} ({PRODUCTS.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('feminine');
              setWomenCategory('all');
            }}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'feminine' && womenCategory === 'all'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/70 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.feminineTitle} ({feminineCount})
          </button>

          <button
            onClick={() => {
              setActiveTab('feminine');
              setWomenCategory('body-splash');
            }}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'feminine' && womenCategory === 'body-splash'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md ring-1 ring-[#C69A5A]'
                : 'bg-white/70 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش'} ({bodySplashCount})
          </button>

          <button
            onClick={() => {
              setActiveTab('feminine');
              setWomenCategory('lip-gloss');
            }}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'feminine' && womenCategory === 'lip-gloss'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md ring-1 ring-[#C69A5A]'
                : 'bg-white/70 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {language === 'en' ? 'LIP GLOSS' : 'ليب جلوس'} ({lipGlossCount})
          </button>

          <button
            onClick={() => {
              setActiveTab('masculine');
              setWomenCategory('all');
            }}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'masculine'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/70 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.masculineTitle} ({masculineCount})
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
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
