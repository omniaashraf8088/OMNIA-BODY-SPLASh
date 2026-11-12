'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Check, Star, ShieldCheck, Truck, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';
import { PRODUCTS, INITIAL_REVIEWS } from '@/data/products';

interface StoryModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}

export default function StoryModal({ product, onClose, onSelectRelated }: StoryModalProps) {
  const { language, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const { campaign, getDiscountedPrice } = useCampaign();
  const t = translations[language];

  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const currentPrice = getDiscountedPrice(product.id, product.price);
  const isDiscounted = campaign.isActive && currentPrice < product.originalPrice;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-[#FFF9F1] border border-[#E8D8C3] shadow-2xl overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-[#493426] hover:text-[#FFF9F1] text-[#493426] flex items-center justify-center transition-all duration-300 shadow-md"
          aria-label="Close Story"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Section A: Product Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F7F1E8] border-b border-[#E8D8C3]">
          {/* Large Master Bottle Visual */}
          <div className="relative h-96 sm:h-[480px] p-6 flex items-center justify-center bg-[#F7F1E8] overflow-hidden">
            <div className="absolute inset-0 bg-radial-vignette opacity-20" />
            <div className="relative w-full h-full max-h-[420px]">
              <Image
                src={product.image}
                alt={language === 'en' ? product.nameEn : product.nameAr}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain object-center drop-shadow-xl"
              />
            </div>
          </div>

          {/* Product Intro & Quick Purchase */}
          <div className="p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                  {language === 'en' ? product.familyEn : product.familyAr}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8B674D]" />
                <span className="text-[10px] uppercase tracking-widest font-sans text-[#493426]">
                  {product.volume}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#493426] tracking-tight">
                {language === 'en' ? product.nameEn : product.nameAr}
              </h2>

              <p className="mt-2 text-sm text-[#8B674D] font-serif italic">
                &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#493426]">
                  {currentPrice} {t.collection.egp}
                </span>
                {isDiscounted && (
                  <>
                    <span className="text-sm text-[#8B674D] line-through font-sans">
                      {product.originalPrice} {t.collection.egp}
                    </span>
                    <span className="px-2 py-0.5 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-bold font-sans">
                      50% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#493426]/90 font-sans leading-relaxed">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4 pt-6 border-t border-[#E8D8C3]">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#8B674D] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#493426] hover:bg-[#F7F1E8] text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-sans font-semibold text-[#493426]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#493426] hover:bg-[#F7F1E8] text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-[#493426] hover:bg-[#8B674D] text-[#FFF9F1] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md"
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

              <div className="flex items-center gap-4 text-[11px] text-[#8B674D] font-sans">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Egypt Express Delivery' : 'شحن سريع لجميع المحافظات'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? '100% Authentic Formula' : 'تركيبة أصلية معتمدة'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-10 space-y-12 bg-[#FFF9F1]">
          {/* Section B & C: Scent Story & Inspiration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.scentStory}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#493426]">
                {language === 'en' ? product.taglineEn : product.taglineAr}
              </h3>
              <p className="text-sm text-[#493426]/85 font-sans leading-relaxed">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>
              <div className="p-4 bg-[#F7F1E8] border-l-2 border-[#8B674D] text-xs text-[#8B674D] italic font-serif">
                &ldquo;{language === 'en' ? product.lifestyleQuoteEn : product.lifestyleQuoteAr}&rdquo;
              </div>
            </div>

            <div className="bg-[#F7F1E8] border border-[#E8D8C3] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.inspiration}
              </span>
              <p className="text-sm text-[#493426] font-sans leading-relaxed">
                {language === 'en' ? product.inspirationEn : product.inspirationAr}
              </p>
              <p className="text-[11px] text-[#8B674D]/80 font-sans italic">
                * Note: Artistic inspiration represents the olfactory mood and visual world of the fragrance.
              </p>
            </div>
          </div>

          {/* Section D: Fragrance Profile Scales */}
          <div className="bg-[#F7F1E8] p-6 sm:p-8 border border-[#E8D8C3]">
            <div className="text-center max-w-md mx-auto mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.profile}
              </span>
              <h4 className="text-xl font-serif text-[#493426] mt-1">
                {language === 'en' ? 'Olfactory Architecture' : 'الهرم والخصائص العطرية'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Sweetness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-[#493426]">
                  <span>{t.productDetail.sweetness}</span>
                  <span className="font-semibold">{product.profile.sweetness}%</span>
                </div>
                <div className="h-2 bg-[#E8D8C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B674D] rounded-full transition-all duration-1000"
                    style={{ width: `${product.profile.sweetness}%` }}
                  />
                </div>
              </div>

              {/* Freshness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-[#493426]">
                  <span>{t.productDetail.freshness}</span>
                  <span className="font-semibold">{product.profile.freshness}%</span>
                </div>
                <div className="h-2 bg-[#E8D8C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B674D] rounded-full transition-all duration-1000"
                    style={{ width: `${product.profile.freshness}%` }}
                  />
                </div>
              </div>

              {/* Warmth */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-[#493426]">
                  <span>{t.productDetail.warmth}</span>
                  <span className="font-semibold">{product.profile.warmth}%</span>
                </div>
                <div className="h-2 bg-[#E8D8C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B674D] rounded-full transition-all duration-1000"
                    style={{ width: `${product.profile.warmth}%` }}
                  />
                </div>
              </div>

              {/* Floral */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-[#493426]">
                  <span>{t.productDetail.floral}</span>
                  <span className="font-semibold">{product.profile.floral}%</span>
                </div>
                <div className="h-2 bg-[#E8D8C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B674D] rounded-full transition-all duration-1000"
                    style={{ width: `${product.profile.floral}%` }}
                  />
                </div>
              </div>

              {/* Woody */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-[#493426]">
                  <span>{t.productDetail.woody}</span>
                  <span className="font-semibold">{product.profile.woody}%</span>
                </div>
                <div className="h-2 bg-[#E8D8C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B674D] rounded-full transition-all duration-1000"
                    style={{ width: `${product.profile.woody}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section F: Verified Notes Pyramid */}
          <div>
            <div className="text-center max-w-md mx-auto mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.verifiedNotes}
              </span>
              <h4 className="text-xl font-serif text-[#493426] mt-1">
                {language === 'en' ? 'Fragrance Notes Pyramid' : 'الهرم العطري المعتمد'}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-[#F7F1E8] border border-[#E8D8C3] text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#8B674D] font-sans font-semibold">
                  {t.productDetail.topNotes}
                </span>
                <p className="text-sm font-serif text-[#493426]">
                  {language === 'en' ? product.notes.topEn : product.notes.topAr}
                </p>
              </div>

              <div className="p-5 bg-[#F7F1E8] border border-[#E8D8C3] text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#8B674D] font-sans font-semibold">
                  {t.productDetail.heartNotes}
                </span>
                <p className="text-sm font-serif text-[#493426]">
                  {language === 'en' ? product.notes.heartEn : product.notes.heartAr}
                </p>
              </div>

              <div className="p-5 bg-[#F7F1E8] border border-[#E8D8C3] text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#8B674D] font-sans font-semibold">
                  {t.productDetail.baseNotes}
                </span>
                <p className="text-sm font-serif text-[#493426]">
                  {language === 'en' ? product.notes.baseEn : product.notes.baseAr}
                </p>
              </div>
            </div>
          </div>

          {/* Section H: Related Fragrances */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#E8D8C3]">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D] block mb-4">
                {t.productDetail.relatedTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-4 bg-[#F7F1E8] border border-[#E8D8C3] hover:border-[#8B674D] cursor-pointer flex items-center gap-4 transition-all group"
                  >
                    <div className="relative w-16 h-20 flex-shrink-0">
                      <Image
                        src={rel.image}
                        alt={rel.nameEn}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif text-[#493426] group-hover:text-[#8B674D] transition-colors">
                        {language === 'en' ? rel.nameEn : rel.nameAr}
                      </h5>
                      <p className="text-xs text-[#8B674D] font-sans">
                        {rel.price} {t.collection.egp}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-[#493426] underline mt-1 inline-block">
                        {t.collection.discoverScent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
