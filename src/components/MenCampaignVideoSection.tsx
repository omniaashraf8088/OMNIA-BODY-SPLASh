'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Play, Pause, Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function MenCampaignVideoSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay policy gracefully
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
    <section id="men-campaign" className="py-20 sm:py-28 bg-[#131B26] text-[#FFF9F1] relative overflow-hidden border-t border-[#233145]">
      {/* Subtle luxury ambient backlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#1B3252]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#8B674D]/15 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[#D1B99C] text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D1B99C]" />
            <span>{t.menCampaign.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FFF9F1] tracking-wide uppercase leading-tight">
            {t.menCampaign.headline}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#E8D8C3]/90 font-sans leading-relaxed max-w-xl mx-auto">
            {t.menCampaign.supporting}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-[#0C121A] border border-[#D1B99C]/30 shadow-2xl overflow-hidden group">
          <video
            ref={videoRef}
            src="/assets/videos/men_campaign.mp4"
            poster="/assets/posters/men_cover.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />

          {/* Subtle gradient vignette around edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Elegant Floating Video Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#FFF9F1] hover:bg-black/60 transition-all flex items-center justify-center shadow-lg"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#FFF9F1] hover:bg-black/60 transition-all flex items-center justify-center shadow-lg"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Call to action below video */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/#masculine"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#FFF9F1] text-[#131B26] hover:bg-[#D1B99C] hover:text-[#131B26] transition-all text-xs font-sans uppercase tracking-[0.2em] font-semibold shadow-lg"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.menCampaign.exploreBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
