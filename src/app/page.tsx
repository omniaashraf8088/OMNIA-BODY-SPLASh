'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroVideo from '@/components/HeroVideo';
import PromotionalBanner from '@/components/PromotionalBanner';
import CollectionSection from '@/components/CollectionSection';
import MenCampaignVideoSection from '@/components/MenCampaignVideoSection';
import CinematicVideoSection from '@/components/CinematicVideoSection';
import FragranceQuiz from '@/components/FragranceQuiz';
import OurStorySection from '@/components/OurStorySection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoryModal from '@/components/StoryModal';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import DreamWorldIntro from '@/components/DreamWorldIntro';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between selection:bg-[#493426] selection:text-[#FFF9F1]">
      {/* Flagship Luxury Dream World Logo Intro */}
      <DreamWorldIntro />

      {/* Fixed Luxury Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section 1: Main Campaign Hero Video (Female Model holding Vanilliano) */}
        <HeroVideo />

        {/* Section 2: 50% Opening Promotional Campaign Banner */}
        <PromotionalBanner />

        {/* Section 3: Feminine & Masculine Collections + Product Cards */}
        <CollectionSection onSelectProduct={product => setSelectedProduct(product)} />

        {/* Section 4: Men's Campaign Video (Male Model holding Navy Aqua) */}
        <MenCampaignVideoSection />

        {/* Section 5: Second Cinematic Product-Only Video (The Art of Fragrance) */}
        <CinematicVideoSection />

        {/* Section 5: Interactive Fragrance Discovery Quiz (Find Your Scent) */}
        <FragranceQuiz onSelectProduct={product => setSelectedProduct(product)} />

        {/* Section 6: Our Story & Brand Atelier Philosophy */}
        <OurStorySection />

        {/* Section 7: Authentic Customer Testimonials */}
        <ReviewsSection />

        {/* Section 8: Frequently Asked Questions & Delivery Transparency */}
        <FAQSection />
      </main>

      {/* Luxury Dark Mocha Footer */}
      <Footer />

      {/* Slide-out Persistent Shopping Bag */}
      <CartDrawer />

      {/* Dedicated Fragrance Storytelling Modal */}
      <StoryModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectRelated={product => setSelectedProduct(product)}
      />

      {/* Live Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={product => setSelectedProduct(product)}
      />

      {/* Floating Official WhatsApp Concierge Button */}
      <WhatsAppButton />
    </div>
  );
}
