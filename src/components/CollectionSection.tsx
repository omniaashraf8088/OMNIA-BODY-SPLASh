'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Sparkles } from 'lucide-react';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
}

export default function CollectionSection({ onSelectProduct }: CollectionSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'all' | 'feminine' | 'masculine'>('all');

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

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
            onClick={() => setActiveTab('feminine')}
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
                4 Fragrances
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
            onClick={() => setActiveTab('masculine')}
            className={`group relative h-[360px] sm:h-[420px] rounded-none overflow-hidden cursor-pointer border transition-all duration-500 ${
              activeTab === 'masculine'
                ? 'border-[#493426] ring-2 ring-[#493426]/20 shadow-xl'
                : 'border-[#E8D8C3] hover:border-[#D1B99C]'
            }`}
          >
            <Image
              src="/assets/posters/cinematic_poster.png"
              alt="Masculine Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#20140D]/95 via-[#20140D]/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FFF9F1]">
              <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#D1B99C] mb-1">
                2 Fragrances
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

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'all'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/60 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.all} ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setActiveTab('feminine')}
            className={`px-6 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'feminine'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/60 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.feminineTitle} (4)
          </button>
          <button
            onClick={() => setActiveTab('masculine')}
            className={`px-6 py-2.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
              activeTab === 'masculine'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426] shadow-md'
                : 'bg-white/60 text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            {t.collection.masculineTitle} (2)
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
