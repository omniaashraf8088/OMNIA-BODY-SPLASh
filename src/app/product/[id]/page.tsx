'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Maximize2,
  X,
  Droplets,
  Package
} from 'lucide-react';
import { PRODUCTS, OFFICIAL_PRICING } from '@/data/products';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || '';
  const { language, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const { campaign } = useCampaign();
  const t = translations[language];

  const product = PRODUCTS.find(p => p.id === rawId || p.slug === rawId) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Authoritative Pricing
  const currentPrice = OFFICIAL_PRICING.salePrice;
  const originalPrice = OFFICIAL_PRICING.originalPrice;
  const isDiscounted = true;

  const galleryImages = [
    { src: product.image, labelEn: 'Campaign Atmosphere', labelAr: 'الأجواء العطرية' },
    { src: product.bottleImage, labelEn: 'Bottle & Packaging', labelAr: 'العبوة والتصميم' }
  ];

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const collectionLabel =
    product.category === 'feminine'
      ? language === 'en'
        ? 'Feminine Collection'
        : 'المجموعة النسائية'
      : language === 'en'
      ? 'Masculine Collection'
      : 'المجموعة الرجالية';

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl flex-grow space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#8B674D]">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-1.5 hover:text-[#493426] transition-colors"
          >
            <ArrowIcon className="w-3.5 h-3.5" />
            <span>{t.productDetail.backToCollection}</span>
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-[#8B674D]/80">{collectionLabel}</span>
          <span className="opacity-50">/</span>
          <span className="text-[#493426] font-semibold">
            {language === 'en' ? product.nameEn : product.nameAr}
          </span>
        </nav>

        {/* SECTION 1: Master Product Hero Layout */}
        <section aria-label="Product Showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Complete Uncropped Product Photography & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Container: 4:5 Aspect Ratio, Never Cropping the Bottle */}
            <div className="relative w-full aspect-[4/5] max-h-[640px] sm:max-h-[700px] bg-[#FFF9F1] border border-[#E8D8C3] p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-sm group">
              {/* Badges on Top */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isBestseller && (
                  <span className="px-3 py-1 bg-[#493426] text-[#FFF9F1] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] shadow-sm">
                    {language === 'en' ? 'Bestseller' : 'الأكثر طلباً'}
                  </span>
                )}
                <span className="px-3 py-1 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                  50% OFF
                </span>
              </div>

              {/* Volume Tag */}
              <div className="absolute top-4 right-4 z-10 text-[11px] tracking-widest text-[#8B674D] font-sans uppercase font-medium bg-white/80 backdrop-blur-sm px-2.5 py-1 border border-[#E8D8C3]/50">
                {product.volume}
              </div>

              {/* Zoom Action Trigger */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#E8D8C3] text-[#493426] hover:bg-[#493426] hover:text-[#FFF9F1] flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-sm"
                title={language === 'en' ? 'Inspect Image' : 'تكبير الصورة'}
                aria-label="Inspect Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* The Master Image: Cap, Bottle & Base Fully Visible with Generous Breathing Room */}
              <div className="relative w-full h-full max-h-[580px] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <Image
                  src={galleryImages[activeImageIndex].src}
                  alt={`${language === 'en' ? product.nameEn : product.nameAr} - ${galleryImages[activeImageIndex].labelEn}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain object-center drop-shadow-md select-none"
                />
              </div>
            </div>

            {/* Gallery Selector Thumbnails */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/5] bg-[#FFF9F1] border transition-all duration-300 p-2 flex flex-col items-center justify-center overflow-hidden ${
                    activeImageIndex === idx
                      ? 'border-[#493426] ring-2 ring-[#493426]/30 shadow-md'
                      : 'border-[#E8D8C3] hover:border-[#8B674D] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={language === 'en' ? img.labelEn : img.labelAr}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                  <span className="block text-[9px] uppercase tracking-wider font-sans text-[#8B674D] mt-1 truncate w-full text-center">
                    {language === 'en' ? img.labelEn : img.labelAr}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Clear Visual Purchasing Hierarchy */}
          <div className="lg:col-span-5 bg-[#FFF9F1] border border-[#E8D8C3] p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* 1. Collection Classification */}
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                {collectionLabel} • {language === 'en' ? product.familyEn : product.familyAr}
              </span>

              {/* 2. Official Product Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#493426] tracking-tight leading-tight">
                {language === 'en' ? product.nameEn : product.nameAr}
              </h1>

              {/* 3 & 4. Product Type & Volume */}
              <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-sans text-[#8B674D] border-b border-[#E8D8C3] pb-3">
                <span className="font-semibold text-[#493426]">BODY SPLASH</span>
                <span>•</span>
                <span>{OFFICIAL_PRICING.volume}</span>
                <span>•</span>
                <span className="text-emerald-800 font-medium">
                  {language === 'en' ? 'In Stock' : 'متوفر الآن'}
                </span>
              </div>

              {/* 5. Short Emotional Product Introduction */}
              <p className="text-sm sm:text-base text-[#8B674D] font-serif italic">
                &ldquo;{language === 'en' ? product.taglineEn : product.taglineAr}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>

              {/* 6, 7 & 8. Authoritative Pricing Block */}
              <div className="pt-4 pb-2">
                <span className="block text-[10px] uppercase tracking-widest font-sans text-[#8B674D] mb-1">
                  {language === 'en' ? 'Official Price' : 'السعر الرسمي'}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#493426]">
                    {currentPrice} {t.collection.egp}
                  </span>
                  <span className="text-lg text-[#8B674D] line-through font-sans">
                    {originalPrice} {t.collection.egp}
                  </span>
                  <span className="px-2.5 py-1 bg-[#8B674D] text-[#FFF9F1] text-xs font-sans font-bold uppercase tracking-wider">
                    {language === 'en' ? '50% Discount' : 'خصم 50%'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8B674D] font-sans mt-1">
                  {language === 'en'
                    ? 'Introductory launch campaign offer. Applied automatically.'
                    : 'عرض الافتتاح الحصري. يطبق الخصم تلقائياً عند الإضافة.'}
                </p>
              </div>
            </div>

            {/* 9 & 10. Quantity Selector & Prominent ADD TO BAG Button */}
            <div className="space-y-4 pt-4 border-t border-[#E8D8C3]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-[#8B674D] bg-white text-sm font-sans font-semibold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-[#493426] hover:bg-[#F7F1E8] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-[#493426] min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-[#493426] hover:bg-[#F7F1E8] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 px-6 bg-[#493426] hover:bg-[#8B674D] text-[#FFF9F1] text-xs sm:text-sm font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 animate-in zoom-in" />
                      <span>{t.collection.addedToBag}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{t.collection.addToBag}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 11. Authentic Shipping & Assurance Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] font-sans text-[#8B674D] border-t border-[#E8D8C3]/60">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#493426] flex-shrink-0" />
                  <span>{language === 'en' ? 'Cash on Delivery Across Egypt' : 'دفع عند الاستلام لكافة المحافظات'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#493426] flex-shrink-0" />
                  <span>{language === 'en' ? 'Official MN OMNIA 150 ML' : 'منتج أصلي سعة 150 مل'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Premium Editorial Storytelling */}
        <section aria-label="Fragrance Story & Details" className="space-y-12">
          {/* Order 1 & 2: Scent Story & Fragrance Inspiration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* 1. THE SCENT STORY */}
            <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-10 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                {t.productDetail.scentStory}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#493426]">
                {language === 'en' ? product.taglineEn : product.taglineAr}
              </h2>
              <p className="text-sm sm:text-base text-[#493426]/90 font-sans leading-relaxed">
                {language === 'en' ? product.storyEn : product.storyAr}
              </p>
              <div className="p-4 bg-[#F7F1E8] border-s-2 border-[#8B674D] text-xs text-[#8B674D] italic font-serif">
                &ldquo;{language === 'en' ? product.lifestyleQuoteEn : product.lifestyleQuoteAr}&rdquo;
              </div>
            </div>

            {/* 2. FRAGRANCE INSPIRATION */}
            <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-10 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B674D]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                    {t.productDetail.inspiration}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#493426]">
                  {language === 'en' ? 'Sensory Creative Vision' : 'الرؤية الحسية والإلهام'}
                </h3>
                <p className="text-sm text-[#493426]/85 font-sans leading-relaxed">
                  {language === 'en' ? product.inspirationEn : product.inspirationAr}
                </p>
              </div>

              <div className="p-3 bg-[#F7F1E8] border border-[#E8D8C3] text-[11px] text-[#8B674D] font-sans italic">
                {language === 'en'
                  ? '* Creative Inspiration represents the artistic olfactory character and mood of the fragrance.'
                  : '* يمثل الإلهام الحسي الطابع الفني والأجواء العطرية المميزة للتركيبة.'}
              </div>
            </div>
          </div>

          {/* 3. PRODUCT SPECIFICATIONS (Honest & Transparent) */}
          <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-10 space-y-6">
            <h3 className="text-xl sm:text-2xl font-serif text-[#493426]">
              {t.productDetail.detailsTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
              <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]/60 space-y-1">
                <span className="text-[#8B674D] uppercase tracking-wider block text-[10px]">
                  {language === 'en' ? 'Product Type' : 'نوع المنتج'}
                </span>
                <p className="font-semibold text-[#493426]">
                  {language === 'en' ? 'Luxury Body Splash Spray' : 'سبلاش معطر للجسم فاخر'}
                </p>
              </div>

              <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]/60 space-y-1">
                <span className="text-[#8B674D] uppercase tracking-wider block text-[10px]">
                  {language === 'en' ? 'Volume' : 'الحجم'}
                </span>
                <p className="font-semibold text-[#493426]">{OFFICIAL_PRICING.volume}</p>
              </div>

              <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]/60 space-y-1">
                <span className="text-[#8B674D] uppercase tracking-wider block text-[10px]">
                  {language === 'en' ? 'Dispenser' : 'آلية الرش'}
                </span>
                <p className="font-semibold text-[#493426]">
                  {language === 'en' ? 'Ultra-Fine Micro-Mist Pump' : 'مضخة رذاذ ناعمة وفائقة الدقة'}
                </p>
              </div>

              <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3]/60 space-y-1">
                <span className="text-[#8B674D] uppercase tracking-wider block text-[10px]">
                  {language === 'en' ? 'Delivery & Payment' : 'التوصيل والدفع'}
                </span>
                <p className="font-semibold text-[#493426]">
                  {language === 'en' ? 'Cash on Delivery (1-3 Days)' : 'الدفع عند الاستلام (1-3 أيام)'}
                </p>
              </div>
            </div>
          </div>

          {/* 5. PRODUCT IMAGE GALLERY INSPECTION */}
          <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-10 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8B674D]">
                {language === 'en' ? 'Visual Atelier Inspection' : 'معاينة تفاصيل العبوة'}
              </span>
              <h3 className="text-2xl font-serif text-[#493426] mt-1">
                {language === 'en' ? 'Packaging & Silhouette' : 'التصميم والعبوة الأصلية'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative aspect-[4/5] max-h-[460px] bg-[#F7F1E8] border border-[#E8D8C3] p-6 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={language === 'en' ? `${product.nameEn} Campaign` : `حملة ${product.nameAr}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 drop-shadow-md"
                />
              </div>

              <div className="relative aspect-[4/5] max-h-[460px] bg-[#F7F1E8] border border-[#E8D8C3] p-6 flex items-center justify-center">
                <Image
                  src={product.bottleImage}
                  alt={language === 'en' ? `${product.nameEn} Bottle Studio` : `عبوة ${product.nameAr}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* 6. RELATED FRAGRANCES */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#493426]">
                {t.productDetail.relatedTitle}
              </h3>
              <Link
                href="/#collection"
                className="text-xs font-sans uppercase tracking-widest text-[#8B674D] hover:text-[#493426] transition-colors"
              >
                {language === 'en' ? 'View All Fragrances' : 'عرض كافة العطور'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.id}`}
                  className="p-6 bg-[#FFF9F1] border border-[#E8D8C3] hover:border-[#8B674D] transition-all duration-300 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                >
                  <div className="relative w-full aspect-[4/5] max-h-[260px] mb-4">
                    <Image
                      src={rel.image}
                      alt={rel.nameEn}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-sans text-[#8B674D] mb-1">
                    {rel.volume}
                  </span>
                  <h4 className="font-serif text-lg text-[#493426] group-hover:text-[#8B674D] transition-colors">
                    {language === 'en' ? rel.nameEn : rel.nameAr}
                  </h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm font-serif font-bold text-[#493426]">
                      {rel.price} {t.collection.egp}
                    </span>
                    <span className="text-xs text-[#8B674D] line-through font-sans">
                      {rel.originalPrice} {t.collection.egp}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 text-white hover:bg-white hover:text-[#493426] flex items-center justify-center transition-colors shadow-lg z-10"
            aria-label="Close Zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[85vh] flex items-center justify-center">
            <Image
              src={galleryImages[activeImageIndex].src}
              alt={language === 'en' ? product.nameEn : product.nameAr}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Refined Mobile Sticky Add to Bag Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFF9F1]/95 backdrop-blur-md border-t border-[#E8D8C3] px-4 py-3 shadow-[0_-4px_20px_rgba(73,52,38,0.08)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-12 bg-[#F7F1E8] border border-[#E8D8C3] flex-shrink-0">
            <Image
              src={product.bottleImage}
              alt={product.nameEn}
              fill
              sizes="40px"
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#493426] truncate max-w-[120px]">
              {language === 'en' ? product.nameEn : product.nameAr}
            </h4>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-xs text-[#493426]">
                {currentPrice} {t.collection.egp}
              </span>
              <span className="text-[10px] text-[#8B674D] line-through font-sans">
                {originalPrice} {t.collection.egp}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow"
        >
          {added ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          <span>{added ? t.collection.addedToBag : t.collection.addToBag}</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F1E8] flex items-center justify-center font-serif text-[#493426]">
          Loading fragrance atelier...
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}