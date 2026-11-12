'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function HeroVideo() {
  const { language } = useLanguage();
  const t = translations[language];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[92vh] overflow-hidden bg-[#2D1E16]">
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/assets/videos/hero_campaign.mp4"
        poster="/assets/posters/hero_poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
      />

      {/* Editorial Luxury Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/90 via-[#493426]/30 to-black/20" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50" />

      {/* Video Play/Mute Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#FFF9F1] flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-md"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#FFF9F1] flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-md"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Editable HTML Text Overlay */}
      <div className="relative z-10 container mx-auto h-full px-6 flex flex-col justify-end pb-16 sm:pb-20 max-w-4xl text-center sm:text-start">
        <div className="inline-flex items-center gap-2 self-center sm:self-start px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[#FFF9F1] text-[11px] tracking-[0.25em] uppercase font-sans mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8D8C3]" />
          <span>MN OMNIA • INTERNATIONAL FRAGRANCE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FFF9F1] tracking-wide leading-tight sm:leading-none uppercase drop-shadow-md">
          {t.hero.headline}
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#F7F1E8]/90 max-w-2xl font-sans font-light leading-relaxed drop-shadow">
          {t.hero.description}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 self-center sm:self-start w-full sm:w-auto">
          <Link
            href="#collection"
            className="w-full sm:w-auto px-8 py-4 bg-[#FFF9F1] text-[#493426] hover:bg-[#E8D8C3] transition-all duration-300 text-xs sm:text-sm tracking-[0.2em] font-sans font-semibold uppercase shadow-lg text-center"
          >
            {t.hero.exploreBtn}
          </Link>
          <Link
            href="#story"
            className="w-full sm:w-auto px-8 py-4 border border-[#FFF9F1]/80 text-[#FFF9F1] hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm tracking-[0.2em] font-sans font-medium uppercase text-center"
          >
            {t.hero.discoverBtn}
          </Link>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent animate-bounce" />
      </div>
    </section>
  );
}
