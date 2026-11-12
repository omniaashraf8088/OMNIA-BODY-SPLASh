'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShoppingBag, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { language, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const { campaign, getDiscountedPrice } = useCampaign();
  const t = translations[language];

  const product = PRODUCTS.find(p => p.id === id || p.slug === id) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentPrice = getDiscountedPrice(product.id, product.price);
  const isDiscounted = campaign.isActive && currentPrice < product.originalPrice;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl flex-grow space-y-16">
        {/* Breadcrumb */}
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#8B674D] hover:text-[#493426] transition-colors"
        >
          <ArrowIcon className="w-4 h-4" />
          <span>{t.productDetail.backToCollection}</span>
        </Link>

        {/* Hero Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-12 shadow-sm">
          <div className="relative h-[420px] sm:h-[520px] bg-[#F7F1E8] p-6 flex items-center justify-center border border-[#E8D8C3]/50">
            <Image
              src={product.image}
              alt={product.nameEn}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain p-4 drop-shadow-xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                {language === 'en' ? product.familyEn : product.familyAr}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#493426] mt-1">
                {language === 'en' ? product.nameEn : product.nameAr}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#8B674D] font-serif italic">
                &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-[#493426]">
                {currentPrice} {t.collection.egp}
              </span>
              {isDiscounted && (
                <>
                  <span className="text-base text-[#8B674D] line-through font-sans">
                    {product.originalPrice} {t.collection.egp}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-bold font-sans uppercase">
                    50% Discount
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-[#493426]/85 font-sans leading-relaxed">
              {language === 'en' ? product.storyEn : product.storyAr}
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E8D8C3]">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#8B674D] bg-white text-sm font-sans font-semibold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-[#F7F1E8]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 hover:bg-[#F7F1E8]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-[#493426] hover:bg-[#8B674D] text-[#FFF9F1] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {added ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? t.collection.addedToBag : t.collection.addToBag}</span>
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#8B674D] font-sans pt-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>{language === 'en' ? 'Express Egypt Shipping' : 'شحن لجميع المحافظات'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'en' ? '150 ML Original' : '150 مل أصلية'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story & Notes */}
        <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-12 space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#493426] mb-4">
              {t.productDetail.scentStory}
            </h2>
            <p className="text-sm sm:text-base text-[#493426]/90 font-sans leading-relaxed">
              {language === 'en' ? product.storyEn : product.storyAr}
            </p>
            <p className="mt-4 text-sm text-[#8B674D] font-sans">
              <strong>{t.productDetail.inspiration}:</strong> {language === 'en' ? product.inspirationEn : product.inspirationAr}
            </p>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8D8C3]">
            <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#8B674D] block mb-1">
                {t.productDetail.topNotes}
              </span>
              <p className="font-serif text-[#493426] text-sm">
                {language === 'en' ? product.notes.topEn : product.notes.topAr}
              </p>
            </div>

            <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#8B674D] block mb-1">
                {t.productDetail.heartNotes}
              </span>
              <p className="font-serif text-[#493426] text-sm">
                {language === 'en' ? product.notes.heartEn : product.notes.heartAr}
              </p>
            </div>

            <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#8B674D] block mb-1">
                {t.productDetail.baseNotes}
              </span>
              <p className="font-serif text-[#493426] text-sm">
                {language === 'en' ? product.notes.baseEn : product.notes.baseAr}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h3 className="text-2xl font-serif text-[#493426] mb-6">
            {t.productDetail.relatedTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <Link
                key={rel.id}
                href={`/product/${rel.id}`}
                className="p-6 bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#8B674D] transition-colors flex flex-col items-center text-center group"
              >
                <div className="relative w-36 h-48 mb-3">
                  <Image
                    src={rel.image}
                    alt={rel.nameEn}
                    fill
                    sizes="140px"
                    className="object-contain"
                  />
                </div>
                <h4 className="font-serif text-lg text-[#493426] group-hover:text-[#8B674D] transition-colors">
                  {language === 'en' ? rel.nameEn : rel.nameAr}
                </h4>
                <span className="text-xs text-[#8B674D] font-sans mt-1">
                  {rel.price} {t.collection.egp}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F1E8] flex items-center justify-center font-serif text-[#493426]">Loading fragrance details...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
