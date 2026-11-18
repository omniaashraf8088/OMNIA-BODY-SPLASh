'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoryModal from '@/components/StoryModal';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import CategoryHeroVideo from '@/components/CategoryHeroVideo';
import { useLanguage } from '@/context/LanguageContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Sparkles, ShieldCheck, Heart, Droplets, Clock, Flame } from 'lucide-react';

export default function WomensBodySplashPage() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // STRICT CATEGORY ISOLATION: ONLY Women's Body Splash products
  const bodySplashProducts = PRODUCTS.filter(
    p => p.category === 'feminine' && p.subCategory === 'body-splash'
  );

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      {/* Header Contextualized to Women's Collection */}
      <Header currentCollection="feminine" onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Large Hero Background Video for Women's Body Splash (Uploaded Video with secondary Warm Night option) */}
        <CategoryHeroVideo
          videoSrc="/assets/videos/hero_campaign.mp4"
          posterSrc="/assets/posters/hero_poster.png"
          badgeEn="EXCLUSIVE BODY SPLASH ATELIER"
          badgeAr="تشكيلة البودي سبلاش النسائية الفاخرة"
          titleEn="WOMEN'S BODY SPLASH"
          titleAr="بودي سبلاش إم إن أومنيا"
          subtitleEn="Formulated with fine fragrance accords for an intimate, lingering sillage. Experience the seductive warmth of Vanilla, the nocturnal mystery of The Warm Night, and the playful sweetness of Strawberry Cheesecake."
          subtitleAr="تركيبة فاخرة بزيوت عطرية راقية تمنحك ثباتاً وأناقة طوال اليوم. استمتعي بدفء الفانيليا، سحر الليلة الدافئة، وحلاوة الفراولة اللؤلؤية."
          breadcrumbs={[
            { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
            { labelEn: "Women's Collection", labelAr: 'المجموعة النسائية', href: '/collection/women' },
            { labelEn: 'Body Splash', labelAr: 'بودي سبلاش' }
          ]}
          accentColor="#C69A5A"
          secondaryVideoSrc="/assets/videos/the_warm_night_campaign.mp4"
          secondaryVideoLabelEn="The Warm Night Film"
          secondaryVideoLabelAr="فيديو ذا وورم نايت"
        />

        {/* Product Showcase Section (Strictly Women's Body Splash Only) */}
        <section id="products" className="py-16 sm:py-24 bg-[#F7F1E8]">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#8B674D] block mb-2">
                {language === 'en' ? 'FINE FRAGRANCE BODY MISTS • 120 ML' : 'رذاذ معطر فاخر للجسم • 120 مل'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#493426] tracking-tight">
                {language === 'en' ? 'Signature Scent Collection' : 'مجموعة العطور التوقيعية'}
              </h2>
              <p className="mt-3 text-sm text-[#8B674D] font-sans">
                {language === 'en'
                  ? `Displaying all ${bodySplashProducts.length} authentic body splash fragrances crafted for distinct personal moods.`
                  : `عرض جميع عطور البودي سبلاش النسائية الـ ${bodySplashProducts.length} المصممة لتناسب مختلف إطلالاتكِ ومناسباتكِ.`}
              </p>
            </div>

            {/* Product Cards Grid: Strictly 3 Body Splash Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bodySplashProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Category Craftsmanship & Sillage Banner */}
            <div className="mt-20 max-w-5xl mx-auto p-8 bg-[#FFF9F1] border border-[#E8D8C3] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <Droplets className="w-5 h-5 text-[#8B674D]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Fine Fragrance Mists' : 'رذاذ ناعم فائق التوزيع'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Micro-fine atomization for even, luxurious coverage.' : 'توزيع متساوٍ برذاذ لطيف يغمر الجسم بانتعاش خفيف.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#8B674D]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Long-Lasting Sillage' : 'ثبات وفوحان متميز'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'High concentration of authentic fragrance oils.' : 'تركيز مدروس من الزيوت العطرية يدوم لساعات.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-[#8B674D]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? '120 ML Generous Volume' : 'حجم سخي 120 مل'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Designed for generous, refreshing daily self-care.' : 'يكفي للاستخدام اليومي الواسع بعد الاستحمام وفي كل وقت.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Isolated to Women's Collection */}
      <Footer collection="feminine" />

      {/* Shopping Bag Drawer */}
      <CartDrawer />

      {/* Story Modal (Isolated to Women's Body Splash) */}
      <StoryModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectRelated={product => setSelectedProduct(product)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={product => setSelectedProduct(product)}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
