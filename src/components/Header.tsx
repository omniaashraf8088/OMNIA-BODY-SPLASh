'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const { language, setLanguage, isRtl } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const t = translations[language];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#493426] text-[#FFF9F1] py-2 px-4 text-center text-xs tracking-widest uppercase font-serif z-40 relative">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D1B99C] animate-pulse" />
          <span>
            {language === 'en'
              ? 'DISCOVER OMNIA — 50% OFF OPENING CAMPAIGN | LUXURY BODY SPLASH'
              : 'اكتشفي إم إن أومنيا — خصم 50% بمناسبة الافتتاح | بودي سبلاش فاخر'}
          </span>
          <span className="hidden sm:inline opacity-70">
            {language === 'en' ? '• Free Delivery on orders over 900 EGP' : '• توصيل مجاني للطلبات فوق 900 ج.م'}
          </span>
        </div>
      </div>

      {/* Main Fixed Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E8]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(73,52,38,0.06)] py-2 border-b border-[#E8D8C3]'
            : 'bg-[#F7F1E8] py-4 border-b border-[#E8D8C3]/70'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left Actions: Search, Wishlist, Shopping Bag */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-start">
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-[#493426] hover:text-[#8B674D] transition-colors flex items-center gap-2 group"
              aria-label={t.nav.searchPlaceholder}
            >
              <Search className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" />
              <span className="hidden lg:inline text-xs tracking-widest font-sans uppercase text-[#8B674D]">
                {t.nav.searchPlaceholder}
              </span>
            </button>

            <Link
              href="#collection"
              className="hidden sm:flex items-center gap-1.5 text-[#493426] hover:text-[#8B674D] transition-colors"
              aria-label={t.nav.wishlist}
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#493426] hover:text-[#8B674D] transition-colors flex items-center gap-2"
              aria-label={t.nav.bag}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#493426] text-[#FFF9F1] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs tracking-widest uppercase font-sans font-medium text-[#493426]">
                {t.nav.bag}
              </span>
            </button>
          </div>

          {/* Center: Official MN Circular Monogram & OMNIA Wordmark */}
          <div className="flex flex-col items-center justify-center">
            <Link href="/" className="flex flex-col items-center group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/brand/mn_circle_monogram.png"
                  alt="MN OMNIA"
                  fill
                  sizes="48px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="relative w-24 sm:w-28 h-5 sm:h-6 mt-1">
                <Image
                  src="/assets/brand/omnia_wordmark.png"
                  alt="OMNIA"
                  fill
                  sizes="120px"
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right Actions: Circular Language Switcher & Account */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1 justify-end">
            {/* Circular EN / AR Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#8B674D] text-[#493426] hover:bg-[#8B674D] hover:text-[#FFF9F1] transition-all duration-300 shadow-sm text-xs font-semibold tracking-wider font-sans"
              title={language === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
              aria-label="Language Selector"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 p-1.5 text-[#493426] hover:text-[#8B674D] transition-colors"
              aria-label={t.nav.account}
              title="Admin & Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#493426] sm:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Sub-navigation Menu on Desktop */}
        <nav className="hidden sm:flex items-center justify-center gap-8 mt-2 pt-2 border-t border-[#E8D8C3]/50 text-xs tracking-[0.2em] uppercase font-sans text-[#493426]">
          <Link href="/#collection" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.collection}
          </Link>
          <Link href="/#feminine" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.feminine}
          </Link>
          <Link href="/#masculine" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.masculine}
          </Link>
          <Link href="/#experience" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.experience}
          </Link>
          <Link href="/#quiz" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.quiz}
          </Link>
          <Link href="/#story" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.ourStory}
          </Link>
          <Link href="/#reviews" className="hover:text-[#8B674D] transition-colors py-1">
            {t.nav.reviews}
          </Link>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#F7F1E8] border-b border-[#E8D8C3] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-3 text-sm tracking-widest uppercase font-serif text-[#493426]">
              <Link
                href="/#collection"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.collection}
              </Link>
              <Link
                href="/#feminine"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.feminine}
              </Link>
              <Link
                href="/#masculine"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.masculine}
              </Link>
              <Link
                href="/#quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.quiz}
              </Link>
              <Link
                href="/#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.experience}
              </Link>
              <Link
                href="/#story"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8D8C3]"
              >
                {t.nav.ourStory}
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#8B674D]"
              >
                {t.nav.account} / Admin
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
