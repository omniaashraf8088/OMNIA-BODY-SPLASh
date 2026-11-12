'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';

interface ProductCardProps {
  product: Product;
  onSelectStory?: (product: Product) => void;
}

export default function ProductCard({ product, onSelectStory }: ProductCardProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { campaign, getDiscountedPrice } = useCampaign();
  const t = translations[language];

  const currentPrice = getDiscountedPrice(product.id, product.price);
  const isDiscounted = campaign.isActive && currentPrice < product.originalPrice;

  return (
    <div className="group relative bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#D1B99C] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl">
      {/* Product Image Area */}
      <div className="relative w-full aspect-[3/4] bg-[#F7F1E8] overflow-hidden flex items-center justify-center p-4">
        {/* Tag / Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestseller && (
            <span className="px-2.5 py-1 bg-[#493426] text-[#FFF9F1] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">
              {language === 'en' ? 'Bestseller' : 'الأكثر طلباً'}
            </span>
          )}
          {isDiscounted && (
            <span className="px-2.5 py-1 bg-[#8B674D] text-[#FFF9F1] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">
              50% OFF
            </span>
          )}
        </div>

        {/* Volume badge */}
        <div className="absolute top-3 right-3 z-10 text-[10px] tracking-widest text-[#8B674D] font-sans uppercase font-medium bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-sm">
          {product.volume}
        </div>

        {/* Clickable Image leading to Story Modal/Page */}
        <button
          onClick={() => onSelectStory?.(product)}
          className="relative w-full h-full flex items-center justify-center focus:outline-none"
        >
          <div className="relative w-full h-full max-h-[380px] transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={product.image}
              alt={language === 'en' ? product.nameEn : product.nameAr}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain object-center"
            />
          </div>
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2">
          <button
            onClick={() => onSelectStory?.(product)}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur-md text-[#493426] hover:bg-[#493426] hover:text-[#FFF9F1] transition-colors text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.collection.discoverScent}</span>
          </button>
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

      {/* Product Details Area */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-[#FFF9F1]">
        <div>
          {/* Fragrance Family */}
          <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#8B674D] mb-1">
            {language === 'en' ? product.familyEn : product.familyAr}
          </span>

          {/* Product Name */}
          <h3
            onClick={() => onSelectStory?.(product)}
            className="text-xl font-serif text-[#493426] font-normal tracking-wide cursor-pointer hover:text-[#8B674D] transition-colors"
          >
            {language === 'en' ? product.nameEn : product.nameAr}
          </h3>

          {/* Short Emotional Tagline */}
          <p className="mt-1 text-xs text-[#8B674D] font-serif italic">
            &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
          </p>

          {/* Short Fragrance Introduction */}
          <p className="mt-2.5 text-xs text-[#493426]/80 font-sans leading-relaxed line-clamp-2">
            {language === 'en' ? product.storyEn : product.storyAr}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-[#E8D8C3] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-serif font-bold text-[#493426]">
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
            className="px-3.5 py-2 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            {t.collection.addToBag}
          </button>
        </div>
      </div>
    </div>
  );
}
