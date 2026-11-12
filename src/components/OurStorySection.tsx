'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function OurStorySection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="story" className="py-24 bg-[#F7F1E8] border-t border-[#E8D8C3] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Composition */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[500px] border border-[#E8D8C3] shadow-xl overflow-hidden bg-[#E8D8C3]">
              <Image
                src="/assets/posters/cinematic_poster.png"
                alt="The Art of OMNIA"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#493426]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md border border-white/50 text-[#493426]">
                <p className="font-serif italic text-sm text-[#493426]">
                  &ldquo;A fragrance is the most intense form of memory.&rdquo;
                </p>
                <span className="block mt-1 text-[10px] tracking-widest uppercase font-sans text-[#8B674D]">
                  MN OMNIA Fragrance Atelier
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#493426] text-[#FFF9F1] p-4 rounded-none shadow-xl border border-[#D1B99C] hidden sm:block">
              <span className="block text-2xl font-serif font-bold text-center">150</span>
              <span className="text-[9px] uppercase tracking-widest font-sans">ML LUXURY</span>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C3] text-[#493426] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
              <span>{t.story.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#493426] tracking-tight leading-tight">
              {t.story.title}
            </h2>

            <p className="text-sm sm:text-base text-[#493426]/85 font-sans leading-relaxed">
              {t.story.p1}
            </p>

            <p className="text-sm sm:text-base text-[#493426]/85 font-sans leading-relaxed">
              {t.story.p2}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8D8C3]">
              <div className="p-4 bg-[#FFF9F1] border border-[#E8D8C3]">
                <ShieldCheck className="w-5 h-5 text-[#8B674D] mb-2" />
                <h4 className="font-serif text-sm text-[#493426] font-semibold">
                  {language === 'en' ? 'Fine Essences' : 'خلاصات نقية'}
                </h4>
                <p className="text-[11px] text-[#8B674D] font-sans mt-1">
                  {language === 'en' ? 'International cosmetic-grade fragrance oils' : 'زيوت عطرية فرنسية بجودة مستحضرات التجميل العالمية'}
                </p>
              </div>

              <div className="p-4 bg-[#FFF9F1] border border-[#E8D8C3]">
                <Award className="w-5 h-5 text-[#8B674D] mb-2" />
                <h4 className="font-serif text-sm text-[#493426] font-semibold">
                  {language === 'en' ? 'Long-Lasting' : 'ثبات متألق'}
                </h4>
                <p className="text-[11px] text-[#8B674D] font-sans mt-1">
                  {language === 'en' ? 'Optimized projection that endures gracefully' : 'انتشار ناعم وثبات يدوم مع حركة الجسم'}
                </p>
              </div>

              <div className="p-4 bg-[#FFF9F1] border border-[#E8D8C3]">
                <HeartHandshake className="w-5 h-5 text-[#8B674D] mb-2" />
                <h4 className="font-serif text-sm text-[#493426] font-semibold">
                  {language === 'en' ? 'Gentle on Skin' : 'آمن على البشرة'}
                </h4>
                <p className="text-[11px] text-[#8B674D] font-sans mt-1">
                  {language === 'en' ? 'Dermatologically safe formulation' : 'تركيبة نقية ومناسبة لجميع أنواع البشرة'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
