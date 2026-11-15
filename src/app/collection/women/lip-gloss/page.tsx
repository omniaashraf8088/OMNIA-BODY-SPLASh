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
import { Sparkles, ShieldCheck, Heart, Droplets } from 'lucide-react';

export default function LipGlossPage() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // STRICT CATEGORY ISOLATION: ONLY Lip Gloss products
  const lipGlossProducts = PRODUCTS.filter(
    p => p.category === 'feminine' && p.subCategory === 'lip-gloss'
  );

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      {/* Header Contextualized to Women's Collection */}
      <Header currentCollection="feminine" onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Large Hero Background Video for Lip Gloss (The actual uploaded Lip Gloss video) */}
        <CategoryHeroVideo
          videoSrc="/assets/videos/lip_gloss_campaign.mp4"
          posterSrc="/assets/products/lipgloss_nude.png"
          badgeEn="EXCLUSIVE LIP GLOSS ATELIER"
          badgeAr="تشكيلة ملمع الشفاه الفاخرة"
          titleEn="MN OMNIA • LIP GLOSS"
          titleAr="ملمع شفاه إم إن أومنيا"
          subtitleEn="Luminous glass-like gloss, weightless non-sticky cushion hydration, and universally flattering shades crafted for effortless luxury."
          subtitleAr="لمعان زجاجي مائي وترطيب مخملي فائق النعومة بدون لزوجة، بدرجات طبيعية تتناغم مع كافة درجات البشرة."
          breadcrumbs={[
            { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
            { labelEn: "Women's Collection", labelAr: 'المجموعة النسائية', href: '/collection/women' },
            { labelEn: 'Lip Gloss', labelAr: 'ملمع الشفاه' }
          ]}
          accentColor="#C69A5A"
        />

        {/* Product Showcase Section (Strictly Lip Gloss Products Only) */}
        <section id="products" className="py-16 sm:py-24 bg-[#F7F1E8]">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#8B674D] block mb-2">
                {language === 'en' ? 'HIGH-SHINE HYDRATING GLAZES' : 'لمعان وترطيب زجاجي فائق'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#493426] tracking-tight">
                {language === 'en' ? 'Choose Your Signature Shade' : 'اختاري درجتكِ المفضلة'}
              </h2>
              <p className="mt-3 text-sm text-[#8B674D] font-sans">
                {language === 'en'
                  ? `Displaying ${lipGlossProducts.length} authentic lip gloss shades formulated with conditioning moisture.`
                  : `عرض ${lipGlossProducts.length} درجات ملمع شفاه أصلية فائقة اللمعان والعناية الترطيبية.`}
              </p>
            </div>

            {/* Product Cards Grid: Strictly Lip Gloss Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {lipGlossProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Exclusive Category Benefits Banner (Lip Gloss Specific) */}
            <div className="mt-20 max-w-4xl mx-auto p-8 bg-[#FFF9F1] border border-[#E8D8C3] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Non-Sticky Formula' : 'تركيبة غير لزجة'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Silky cushion texture that feels weightless.' : 'ملمس ناعم وخفيف يمنح الشفاه راحة كاملة.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <Droplets className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Deep Nourishment' : 'ترطيب وعناية فائقة'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Cushions and visually smooths fine lip lines.' : 'يعزز امتلاء الشفاه ويحميها من الجفاف.'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F7F1E8] border border-[#E8D8C3] flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#C69A5A]" />
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-[#493426] mb-1">
                    {language === 'en' ? 'Glass-Like Shine' : 'لمعان زجاجي عاكس'}
                  </h3>
                  <p className="text-xs text-[#8B674D] font-sans">
                    {language === 'en' ? 'Intense light reflection for voluminous lips.' : 'انعكاس ضوئي مبهر يبرز جمال الشفتين.'}
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

      {/* Story Modal (Isolated to Lip Gloss) */}
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
