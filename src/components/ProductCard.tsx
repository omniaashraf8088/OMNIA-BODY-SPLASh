'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Sparkles, Check, Droplets } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';

interface ProductCardProps {
  product: Product;
  onSelectStory?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const t = translations[language];

  const currentPrice = product.price;
  const isDiscounted = product.price < product.originalPrice;
  const isLipGloss = product.subCategory === 'lip-gloss';

  const subCategoryLabel = isLipGloss
    ? language === 'en' ? 'LIP GLOSS' : 'ليب جلوس'
    : language === 'en' ? 'BODY SPLASH' : 'بودي سبلاش';

  return (
    <div className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#C69A5A]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl">
      {/* 1. Product Image Area */}
      <div className="relative w-full aspect-[3/4] bg-[#F7F1E8] overflow-hidden flex items-center justify-center p-6">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 bg-[#493426] text-[#FFF9F1] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">
            {subCategoryLabel}
          </span>
          {isDiscounted && (
            <span className="px-2.5 py-1 bg-[#C69A5A] text-[#101820] text-[9px] uppercase tracking-[0.2em] font-sans font-bold shadow-sm">
              50% OFF
            </span>
          )}
        </div>

        {/* Volume badge */}
        <div className="absolute top-3 right-3 z-10 text-[10px] tracking-widest text-[#493426] font-sans uppercase font-semibold bg-white/85 backdrop-blur-sm px-2.5 py-0.5 border border-[#E8D8C3]">
          {product.volume}
        </div>

        {/* Clickable Image leading to Product Detail Page */}
        <Link
          href={`/product/${product.id}`}
          className="relative w-full h-full flex items-center justify-center focus:outline-none"
        >
          <div className="relative w-full h-full max-h-[380px] transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={product.image}
              alt={language === 'en' ? product.nameEn : product.nameAr}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain object-center drop-shadow-sm"
              priority={product.id === 'vanilla' || product.id === 'lipgloss-nude'}
            />
          </div>
        </Link>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur-md text-[#493426] hover:bg-[#493426] hover:text-[#FFF9F1] transition-colors text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.collection.discoverScent}</span>
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-colors flex items-center justify-center shadow-md"
            title={t.collection.addToBag}
            aria-label={t.collection.addToBag}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Structured Product Details Area Directly Under the Image */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-[#FFF9F1]">
        <div className="space-y-4">
          {/* Header info: Family & Product Name */}
          <div>
            <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-sans text-[#8B674D] mb-1">
              <span>{language === 'en' ? product.familyEn : product.familyAr}</span>
              <span className="font-semibold text-[#493426]">{subCategoryLabel}</span>
            </div>

            {/* Product Name */}
            <h3 className="text-xl sm:text-2xl font-serif text-[#493426] font-normal tracking-wide hover:text-[#8B674D] transition-colors">
              <Link href={`/product/${product.id}`}>
                {language === 'en' ? product.nameEn : product.nameAr}
              </Link>
            </h3>

            {/* Emotional Tagline */}
            <p className="mt-1 text-xs text-[#8B674D] font-serif italic">
              &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
            </p>
          </div>

          {/* Scent & Character Description */}
          <div className="pt-2 border-t border-[#E8D8C3]/60">
            <p className="text-xs text-[#493426]/90 font-sans leading-relaxed">
              {language === 'en' ? product.storyEn : product.storyAr}
            </p>
          </div>

          {/* Key Product Features & Benefits */}
          {((product.featuresEn && product.featuresEn.length > 0) || (product.featuresAr && product.featuresAr.length > 0)) && (
            <div className="pt-2 border-t border-[#E8D8C3]/60 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-[#8B674D] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C69A5A]" />
                {language === 'en' ? 'Key Features & Benefits' : 'أبرز المميزات والفوائد'}
              </span>
              <ul className="space-y-1.5 text-xs text-[#493426]/85 font-sans">
                {(language === 'en' ? product.featuresEn : product.featuresAr)?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8B674D] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Persuasive Marketing Copy (Why You Should Try & Buy) */}
          {(product.whyBuyEn || product.whyBuyAr) && (
            <div className="p-3 bg-[#F7F1E8] border-s-2 border-[#C69A5A] text-xs font-sans text-[#493426] leading-relaxed">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#8B674D] mb-1">
                {language === 'en' ? 'Why You’ll Love It' : 'لماذا ستعشقين هذا المنتج؟'}
              </span>
              <p className="italic font-serif text-[#493426]">
                {language === 'en' ? product.whyBuyEn : product.whyBuyAr}
              </p>
            </div>
          )}

          {/* Brief Usage Instructions */}
          {(product.usageEn || product.usageAr) && (
            <div className="pt-2 text-[11px] font-sans text-[#8B674D] flex items-start gap-2">
              <Droplets className="w-3.5 h-3.5 text-[#8B674D] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-[#493426] me-1">
                  {language === 'en' ? 'How to use:' : 'طريقة الاستخدام:'}
                </span>
                <span>{language === 'en' ? product.usageEn : product.usageAr}</span>
              </div>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 border-t border-[#E8D8C3] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-serif font-bold text-[#493426]">
              {currentPrice} {t.collection.egp}
            </span>
            {isDiscounted && (
              <span className="text-xs text-[#8B674D] line-through font-sans">
                {product.originalPrice} {t.collection.egp}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.collection.addToBag}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
