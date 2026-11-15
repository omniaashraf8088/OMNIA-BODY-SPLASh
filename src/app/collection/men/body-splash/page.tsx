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
import { Shield, Sparkles, Droplets, Clock, Compass } from 'lucide-react';

export default function MensBodySplashPage() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // STRICT CATEGORY ISOLATION: ONLY Men's Body Splash products
  const mensProducts = PRODUCTS.filter(
    p => p.category === 'masculine' && p.subCategory === 'body-splash'
  );

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#101820] selection:text-[#FFF9F1]">
      {/* Header Contextualized to Masculine Collection */}
      <Header currentCollection="masculine" onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Large Hero Background Video for Men's Body Splash (Uploaded Men's Campaign Video) */}
        <CategoryHeroVideo
          videoSrc="/assets/videos/men_campaign.mp4"
          posterSrc="/assets/posters/men_cover.png"
          badgeEn="EXCLUSIVE MEN'S BODY SPLASH ATELIER"
          badgeAr="تشكيلة البودي سبلاش الرجالية الفاخرة"
          titleEn="MEN'S BODY SPLASH"
          titleAr="بودي سبلاش إم إن أومنيا للرجال"
          subtitleEn="Commanding masculine scents formulated for clean distinction, maritime freshness, and smoky oriental depth: Grey Musk, Navy Aqua, and Oud Noir."
          subtitleAr="عطور رجالية راقية صُممت لتمنحك حضوراً واثقاً وانتعاشاً بحرياً وأناقة هادئة: جراي مسك، نافي أكوا، وعود نوار."
          breadcrumbs={[
            { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
            { labelEn: "Men's Collection", labelAr: 'المجموعة الرجالية', href: '/collection/men' },
            { labelEn: 'Body Splash', labelAr: 'بودي سبلاش' }
          ]}
          accentColor="#1B3252"
        />

        {/* Product Showcase Section (Strictly Men's Body Splash Only) */}
        <section id="products" className="py-16 sm:py-24 bg-[#F7F1E8]">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#8B674D] block mb-2">
                {language === 'en' ? 'MASCULINE ESSENTIALS • 150 ML' : 'أساسيات الرجل العصري • 150 مل'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#493426] tracking-tight">
                {language === 'en' ? 'The Men’s Fragrance Line' : 'مجموعة العطور الرجالية'}
              </h2>
              <p className="mt-3 text-sm text-[#8B674D] font-sans">
                {language === 'en'
                  ? `Displaying all ${mensProducts.length} authentic masculine fragrances formulated for daily confidence.`
                  : `عرض جميع عطور الرجال الـ ${mensProducts.length} المصممة لتمنحك ثباتاً وانتعاشاً استثنائياً.`}
              </p>
            </div>

            {/* Product Cards Grid: Strictly 3 Men's Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {mensProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Masculine Craftsmanship & Sillage Banner */}
            <div className="mt-20 max-w-5xl mx-auto p-8 bg-[#FFF9F1] border border-[#E8D8C3] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#101820] text-[#FFF9F1] flex items-center justify-center mb-3">
                    <Compass className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Modern Distinction' : 'تميز عصري واثق'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Crisp notes tailored for professional and casual poise.' : 'نفحات نقية تلائم العمل والإطلالات الرياضية.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#101820] text-[#FFF9F1] flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Long-Lasting Performance' : 'ثبات وأداء قوي'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Potent sillage designed to linger through long days.' : 'فوحان متوازن وثبات يرافقك طوال اليوم.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#101820] text-[#FFF9F1] flex items-center justify-center mb-3">
                    <Droplets className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? '150 ML Generous Volume' : 'حجم سخي 150 مل'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Generous atomization for post-shower and daily grooming.' : 'مثالي للاستخدام السخي بعد الاستحمام والحلاقة.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Isolated to Masculine Collection */}
      <Footer collection="masculine" />

      {/* Shopping Bag Drawer */}
      <CartDrawer />

      {/* Story Modal (Isolated to Men's Collection) */}
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
