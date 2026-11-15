'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface BreadcrumbItem {
  labelEn: string;
  labelAr: string;
  href?: string;
}

export interface CategoryHeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  breadcrumbs: BreadcrumbItem[];
  accentColor?: string;
  secondaryVideoSrc?: string;
  secondaryVideoLabelEn?: string;
  secondaryVideoLabelAr?: string;
}

export default function CategoryHeroVideo({
  videoSrc,
  posterSrc,
  badgeEn,
  badgeAr,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  breadcrumbs,
  accentColor = '#C69A5A',
  secondaryVideoSrc,
  secondaryVideoLabelEn,
  secondaryVideoLabelAr
}: CategoryHeroVideoProps) {
  const { language, isRtl } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideo, setActiveVideo] = useState(videoSrc);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSwitchVideo = (src: string) => {
    setActiveVideo(src);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] md:h-[82vh] max-h-[920px] overflow-hidden bg-[#101820] flex items-center justify-center">
      {/* Background Video with Cover and Looping Autoplay */}
      <video
        ref={videoRef}
        key={activeVideo}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.01]"
      >
        <source src={activeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Layered Luxury Vignette Overlay for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/45 to-[#101820]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(16,24,32,0.65)_100%)]" />

      {/* Breadcrumbs (Top-Left on LTR, Top-Right on RTL) */}
      <div className="absolute top-6 sm:top-8 inset-x-0 z-20 container mx-auto px-4 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs tracking-wider uppercase font-sans text-[#E8D8C3]/80"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const label = language === 'en' ? crumb.labelEn : crumb.labelAr;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-[#E8D8C3]/50 ${isRtl ? 'rotate-180' : ''}`}
                  />
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#FFF9F1] transition-colors underline-offset-4 hover:underline"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#FFF9F1] font-semibold' : ''}>{label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-[#FFF9F1] max-w-3xl pt-16 sm:pt-20">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9F1]/10 backdrop-blur-md border border-[#E8D8C3]/30 text-[10px] sm:text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4 text-[#E8D8C3]">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>{language === 'en' ? badgeEn : badgeAr}</span>
        </div>

        {/* Primary Page Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight drop-shadow-md">
          {language === 'en' ? titleEn : titleAr}
        </h1>

        {/* Subtitle / Marketing Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#FFF9F1]/90 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-light">
          {language === 'en' ? subtitleEn : subtitleAr}
        </p>

        {/* Optional Secondary Video Selector (e.g. for The Warm Night) */}
        {secondaryVideoSrc && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => handleSwitchVideo(videoSrc)}
              className={`px-3 py-1.5 rounded-none text-[11px] font-sans uppercase tracking-widest border transition-all ${
                activeVideo === videoSrc
                  ? 'bg-[#FFF9F1] text-[#101820] border-[#FFF9F1] font-semibold'
                  : 'bg-black/30 backdrop-blur-sm text-[#FFF9F1]/80 border-white/20 hover:border-white/60'
              }`}
            >
              {language === 'en' ? 'Main Campaign' : 'الحملة الرئيسية'}
            </button>
            <button
              onClick={() => handleSwitchVideo(secondaryVideoSrc)}
              className={`px-3 py-1.5 rounded-none text-[11px] font-sans uppercase tracking-widest border transition-all ${
                activeVideo === secondaryVideoSrc
                  ? 'bg-[#FFF9F1] text-[#101820] border-[#FFF9F1] font-semibold'
                  : 'bg-black/30 backdrop-blur-sm text-[#FFF9F1]/80 border-white/20 hover:border-white/60'
              }`}
            >
              {language === 'en' ? secondaryVideoLabelEn || 'Featured Video' : secondaryVideoLabelAr || 'فيديو مميز'}
            </button>
          </div>
        )}

        {/* Action Button: Scroll down to products */}
        <div className="mt-8 sm:mt-10">
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFF9F1] text-[#101820] hover:bg-[#E8D8C3] transition-all duration-300 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em] shadow-lg group"
          >
            <span>{language === 'en' ? 'VIEW PRODUCTS' : 'استعراض المنتجات'}</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sound Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#FFF9F1] hover:bg-black/70 flex items-center justify-center transition-all shadow-md group"
        title={isMuted ? (language === 'en' ? 'Play Sound' : 'تشغيل الصوت') : (language === 'en' ? 'Mute' : 'كتم الصوت')}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#FFF9F1]/80 group-hover:text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#C69A5A] group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
