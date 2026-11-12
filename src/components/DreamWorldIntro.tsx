'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DreamWorldIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export default function DreamWorldIntro({ onComplete, forcePlay = false }: DreamWorldIntroProps) {
  const [phase, setPhase] = useState<'drawing' | 'monogram' | 'wordmark' | 'shimmer' | 'fading' | 'completed'>(
    'drawing'
  );
  const [hasVisited, setHasVisited] = useState<boolean>(true);

  useEffect(() => {
    // Check session persistence safely
    try {
      const visited = sessionStorage.getItem('omnia_intro_seen');
      if (visited && !forcePlay) {
        setPhase('completed');
        onComplete?.();
        return;
      }
    } catch {
      // Ignore storage errors in privacy mode
    }

    setHasVisited(false);
    // Snappy luxury animation timeline (total ~1.8s)
    const t1 = setTimeout(() => setPhase('monogram'), 350);
    const t2 = setTimeout(() => setPhase('wordmark'), 700);
    const t3 = setTimeout(() => setPhase('shimmer'), 1100);
    const t4 = setTimeout(() => setPhase('fading'), 1500);
    const t5 = setTimeout(() => {
      setPhase('completed');
      try {
        sessionStorage.setItem('omnia_intro_seen', 'true');
      } catch {}
      onComplete?.();
    }, 1900);

    // Fast dismiss on any user scroll or touch
    const onUserInteract = () => {
      setPhase('fading');
      setTimeout(() => {
        setPhase('completed');
        try {
          sessionStorage.setItem('omnia_intro_seen', 'true');
        } catch {}
        onComplete?.();
      }, 300);
    };

    window.addEventListener('scroll', onUserInteract, { passive: true, once: true });
    window.addEventListener('keydown', onUserInteract, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener('scroll', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
    };
  }, [forcePlay, onComplete]);

  const handleSkip = () => {
    setPhase('fading');
    setTimeout(() => {
      setPhase('completed');
      try {
        sessionStorage.setItem('omnia_intro_seen', 'true');
      } catch {}
      onComplete?.();
    }, 250);
  };

  if (hasVisited && !forcePlay && phase === 'completed') {
    return null;
  }

  if (phase === 'completed') {
    return null;
  }

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 select-none cursor-pointer overflow-hidden ${
        phase === 'fading' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFF9F1 0%, #F4ECE0 45%, #E6D7C2 100%)',
      }}
    >
      {/* Ambient Champagne Glow & Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      {/* Floating Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300 opacity-60 animate-float-particle"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${15 + (i * 29) % 70}%`,
              top: `${20 + (i * 37) % 65}%`,
              animationDelay: `${(i * 0.35) % 2.5}s`,
              animationDuration: `${3.5 + (i % 3)}s`,
              boxShadow: '0 0 6px rgba(212, 175, 55, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Main Cinematic Logo Container */}
      <div className="relative flex flex-col items-center justify-center px-6 max-w-lg w-full">
        {/* Animated Bronze-Gold SVG Circle with 4-Point Stars */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full -rotate-45"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bronzeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C69A5A" />
                <stop offset="35%" stopColor="#F5E4BE" />
                <stop offset="70%" stopColor="#A3703C" />
                <stop offset="100%" stopColor="#805327" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background subtle guide circle */}
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="#D1B99C"
              strokeWidth="0.75"
              strokeOpacity="0.3"
            />

            {/* Drawing Circular Ring */}
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="url(#bronzeGoldGrad)"
              strokeWidth="1.75"
              strokeDasharray="528"
              strokeDashoffset={phase === 'drawing' ? '280' : '0'}
              strokeLinecap="round"
              filter="url(#goldGlow)"
              className="transition-all duration-[2200ms] ease-out"
            />
          </svg>

          {/* Luxury 4-Point Stars Sparkles */}
          <div
            className={`absolute top-3 right-6 sm:top-4 sm:right-8 transition-all duration-1000 ${
              phase !== 'drawing' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <svg
              className="w-6 h-6 text-[#A3703C] animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
            </svg>
          </div>

          <div
            className={`absolute bottom-6 left-6 transition-all duration-1000 delay-500 ${
              phase !== 'drawing' ? 'opacity-70 scale-90' : 'opacity-0 scale-0'
            }`}
          >
            <svg
              className="w-4 h-4 text-[#C69A5A]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L13.5 8.5L22 12L13.5 15.5L12 24L10.5 15.5L2 12L10.5 8.5L12 0Z" />
            </svg>
          </div>

          {/* Official Intertwined MN Monogram inside the circle */}
          <div
            className={`relative z-10 transition-all duration-1000 transform ${
              phase !== 'drawing'
                ? 'opacity-100 scale-100 translate-y-0 filter-none'
                : 'opacity-0 scale-90 translate-y-2 blur-sm'
            }`}
          >
            <Image
              src="/assets/brand/mn_monogram_only.png"
              alt="MN Monogram"
              width={160}
              height={120}
              priority
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* Official OMNIA Wordmark + Luxury Tagline */}
        <div
          className={`mt-4 flex flex-col items-center transition-all duration-1000 transform ${
            phase === 'wordmark' || phase === 'shimmer' || phase === 'fading'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative overflow-hidden py-1">
            <Image
              src="/assets/brand/omnia_wordmark.png"
              alt="OMNIA"
              width={260}
              height={55}
              priority
              className="object-contain"
            />
            {/* Shimmer light sweep */}
            {phase === 'shimmer' && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full animate-shimmer" />
            )}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#8B674D]/40" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#493426] font-medium font-sans">
              LUXURY BODY SPLASH
            </span>
            <span className="h-[1px] w-8 bg-[#8B674D]/40" />
          </div>

          <p className="mt-3 text-xs sm:text-sm tracking-[0.25em] text-[#8B674D] font-serif uppercase">
            A Little Touch of Luxury, Every Day
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 text-[11px] uppercase tracking-[0.25em] text-[#8B674D]/80 hover:text-[#493426] px-4 py-2 border border-[#D1B99C]/50 rounded-full transition-all duration-300 hover:bg-white/40"
      >
        Skip Intro
      </button>
    </div>
  );
}
