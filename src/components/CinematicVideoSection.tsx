'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function CinematicVideoSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
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
    <section id="experience" className="relative w-full py-24 sm:py-32 bg-[#231710] overflow-hidden text-[#FFF9F1]">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <video
          ref={videoRef}
          src="/assets/videos/product_cinematic.mp4"
          poster="/assets/posters/cinematic_poster.png"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231710] via-[#231710]/40 to-[#231710]" />
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#FFF9F1] flex items-center justify-center hover:bg-white/25 transition-all shadow"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#FFF9F1] flex items-center justify-center hover:bg-white/25 transition-all shadow"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#D1B99C] text-[10px] tracking-[0.3em] uppercase font-sans mb-4">
          <Sparkles className="w-3 h-3 text-[#D1B99C]" />
          <span>CINEMATIC PRODUCT EXPERIENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FFF9F1] tracking-wide uppercase leading-tight">
          {t.cinematic.headline}
        </h2>

        <p className="mt-6 text-sm sm:text-lg text-[#F7F1E8]/90 font-sans max-w-2xl mx-auto leading-relaxed">
          {t.cinematic.supporting}
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="#quiz"
            className="px-8 py-3.5 bg-[#FFF9F1] text-[#493426] hover:bg-[#E8D8C3] transition-all text-xs tracking-[0.2em] font-sans font-semibold uppercase shadow-lg"
          >
            {t.quiz.title}
          </Link>
          <Link
            href="#collection"
            className="px-8 py-3.5 border border-[#FFF9F1]/80 text-[#FFF9F1] hover:bg-white/10 transition-all text-xs tracking-[0.2em] font-sans font-medium uppercase"
          >
            {t.hero.exploreBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
