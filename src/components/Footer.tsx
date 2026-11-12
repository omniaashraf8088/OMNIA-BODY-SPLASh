'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, Check, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface FooterProps {
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
}

export default function Footer({
  facebookUrl = '[FACEBOOK_PAGE_URL]',
  instagramUrl = '[INSTAGRAM_PROFILE_URL]',
  whatsappNumber = '[WHATSAPP_NUMBER_WITH_COUNTRY_CODE]',
}: FooterProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#493426] text-[#FFF9F1] pt-20 pb-12 border-t border-[#36261b]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#5c4230]">
          {/* Column 1: Brand Info & Warm Ivory Master Logo */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-24">
                <Image
                  src="/assets/brand/mn_omnia_warm_ivory.png"
                  alt="MN OMNIA Luxury Fragrance"
                  fill
                  sizes="180px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#E8D8C3] font-sans leading-relaxed">
              {t.footer.aboutDesc}
            </p>

            {/* Official Social Media Icons */}
            <div className="pt-2">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#D1B99C] font-sans font-semibold mb-3">
                {t.footer.officialSocial}
              </span>
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a
                  href={facebookUrl.startsWith('[') ? '#' : facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D1B99C]/50 flex items-center justify-center text-[#FFF9F1] hover:bg-[#FFF9F1] hover:text-[#493426] transition-all duration-300 shadow"
                  title="Official Facebook Page"
                  aria-label="MN OMNIA Facebook"
                >
                  <div className="w-4 h-4 relative">
                    <Image
                      src="/assets/social/facebook.svg"
                      alt="Facebook"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl.startsWith('[') ? '#' : instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D1B99C]/50 flex items-center justify-center text-[#FFF9F1] hover:bg-[#FFF9F1] hover:text-[#493426] transition-all duration-300 shadow"
                  title="Official Instagram Profile"
                  aria-label="MN OMNIA Instagram"
                >
                  <div className="w-4 h-4 relative">
                    <Image
                      src="/assets/social/instagram.svg"
                      alt="Instagram"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={
                    whatsappNumber.startsWith('[')
                      ? 'https://wa.me/'
                      : `https://wa.me/${whatsappNumber}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D1B99C]/50 flex items-center justify-center text-[#FFF9F1] hover:bg-[#FFF9F1] hover:text-[#493426] transition-all duration-300 shadow"
                  title="WhatsApp Business Contact"
                  aria-label="MN OMNIA WhatsApp"
                >
                  <div className="w-4 h-4 relative">
                    <Image
                      src="/assets/social/whatsapp.svg"
                      alt="WhatsApp"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#D1B99C]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8D8C3] font-sans">
              <li>
                <Link href="#collection" className="hover:text-[#FFF9F1] transition-colors">
                  {t.nav.collection}
                </Link>
              </li>
              <li>
                <Link href="#feminine" className="hover:text-[#FFF9F1] transition-colors">
                  {t.collection.feminineTitle}
                </Link>
              </li>
              <li>
                <Link href="#masculine" className="hover:text-[#FFF9F1] transition-colors">
                  {t.collection.masculineTitle}
                </Link>
              </li>
              <li>
                <Link href="#quiz" className="hover:text-[#FFF9F1] transition-colors">
                  {t.quiz.title}
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-[#FFF9F1] transition-colors">
                  {t.cinematic.headline}
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-[#FFF9F1] transition-colors">
                  {t.nav.ourStory}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#D1B99C]">
              {t.footer.customerCare}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8D8C3] font-sans">
              <li>
                <Link href="/checkout" className="hover:text-[#FFF9F1] transition-colors">
                  {t.checkout.title}
                </Link>
              </li>
              <li>
                <span className="text-[#E8D8C3]/90">
                  {t.footer.shippingInfo}: 1-3 Business Days
                </span>
              </li>
              <li>
                <span className="text-[#E8D8C3]/90">
                  {t.footer.returnsPolicy}: 14 Days Inspection
                </span>
              </li>
              <li>
                <span className="text-[#E8D8C3]/90">
                  {t.footer.privacyPolicy} & {t.footer.terms}
                </span>
              </li>
              <li>
                <Link href="/admin" className="text-[#D1B99C] hover:underline">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#D1B99C]">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-[#E8D8C3] font-sans leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border border-[#8B674D] bg-[#3a271c]">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="bg-transparent text-[#FFF9F1] placeholder-[#D1B99C]/60 text-xs px-3 py-2.5 w-full focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 bg-[#8B674D] text-[#FFF9F1] hover:bg-[#D1B99C] hover:text-[#493426] transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-sans">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.footer.subscribed}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D1B99C]/80 font-sans gap-4">
          <p>© 2026 MN OMNIA. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>CAIRO • DUBAI • MILAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
