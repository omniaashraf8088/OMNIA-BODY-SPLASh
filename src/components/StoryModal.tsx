'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, ExternalLink } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { PRODUCTS, OFFICIAL_PRICING } from '@/data/products';

interface StoryModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}

export default function StoryModal({ product, onClose, onSelectRelated }: StoryModalProps) {
  const { language, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const t = translations[language];

  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const currentPrice = OFFICIAL_PRICING.salePrice;
  const originalPrice = OFFICIAL_PRICING.originalPrice;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 2);

  const collectionLabel =
    product.category === 'feminine'
      ? language === 'en'
        ? 'Feminine Collection'
        : 'المجموعة النسائية'
      : language === 'en'
      ? 'Masculine Collection'
      : 'المجموعة الرجالية';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 py-6 sm:py-10 animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl bg-[#FFF9F1] border border-[#E8D8C3] shadow-2xl self-start">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-[#493426] hover:text-[#FFF9F1] text-[#493426] flex items-center justify-center transition-all duration-300 shadow-md border border-[#E8D8C3]"
          aria-label="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Section A: Product Hero Header (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F7F1E8] border-b border-[#E8D8C3]">
          {/* Master Bottle Visual: 4:5 Aspect, Never Cropping the Bottle */}
          <div className="relative aspect-[4/5] max-h-[460px] sm:max-h-[500px] p-6 sm:p-8 flex items-center justify-center bg-[#F7F1E8]">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={product.image}
                alt={language === 'en' ? product.nameEn : product.nameAr}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain object-center drop-shadow-md select-none"
              />
            </div>
            <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-sans font-bold uppercase tracking-wider">
              50% OFF
            </span>
          </div>

          {/* Product Intro & Quick Purchase Details */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                  {collectionLabel}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8B674D]" />
                <span className="text-[10px] uppercase tracking-widest font-sans text-[#493426]">
                  {product.volume}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#493426] tracking-tight">
                {language === 'en' ? product.nameEn : product.nameAr}
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-[#8B674D] font-serif italic">
                &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
              </p>

              {/* Authoritative Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#493426]">
                  {currentPrice} {t.collection.egp}
                </span>
                <span className="text-sm text-[#8B674D] line-through font-sans">
                  {originalPrice} {t.collection.egp}
                </span>
                <span className="px-2 py-0.5 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-bold font-sans">
                  {language === 'en' ? '50% Discount' : 'خصم 50%'}
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed line-clamp-3">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E8D8C3]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#8B674D] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#493426] hover:bg-[#F7F1E8] text-xs font-bold"
                    aria-label="Decrease"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-sans font-semibold text-[#493426] min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#493426] hover:bg-[#F7F1E8] text-xs font-bold"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-5 bg-[#493426] hover:bg-[#8B674D] text-[#FFF9F1] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{t.collection.addedToBag}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.collection.addToBag}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8B674D] font-sans pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Cash on Delivery in Egypt' : 'دفع عند الاستلام لمحافظات مصر'}</span>
                </span>
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[#493426] font-semibold hover:underline"
                >
                  <span>{language === 'en' ? 'Full Product Details' : 'عرض التفاصيل الكاملة'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Honest Scent Story & Inspiration */}
        <div className="p-6 sm:p-8 space-y-8 bg-[#FFF9F1]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.scentStory}
              </span>
              <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>
            </div>

            <div className="bg-[#F7F1E8] border border-[#E8D8C3] p-4 space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                  {t.productDetail.inspiration}
                </span>
              </div>
              <p className="text-xs text-[#493426]/90 font-sans leading-relaxed">
                {language === 'en' ? product.inspirationEn : product.inspirationAr}
              </p>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#E8D8C3]">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D] block mb-4">
                {t.productDetail.relatedTitle}
              </span>
              <div className="grid grid-cols-2 gap-4">
                {relatedProducts.map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-[#F7F1E8] border border-[#E8D8C3] hover:border-[#8B674D] transition-colors flex items-center gap-3 text-start group"
                  >
                    <div className="relative w-12 h-16 bg-white flex-shrink-0">
                      <Image
                        src={rel.bottleImage}
                        alt={rel.nameEn}
                        fill
                        sizes="48px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#493426] group-hover:text-[#8B674D]">
                        {language === 'en' ? rel.nameEn : rel.nameAr}
                      </h4>
                      <span className="text-[11px] text-[#8B674D] font-sans">
                        {rel.price} {t.collection.egp}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}