'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';

interface FragranceQuizProps {
  onSelectProduct: (product: Product) => void;
}

export default function FragranceQuiz({ onSelectProduct }: FragranceQuizProps) {
  const { language, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const t = translations[language];

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSelectAnswer = (questionKey: 'q1' | 'q2' | 'q3', value: string) => {
    const updated = { ...answers, [questionKey]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      const product = determineMatch(updated);
      setMatchedProduct(product);
      setStep(4);
    }
  };

  const determineMatch = (ans: { q1?: string; q2?: string; q3?: string }): Product => {
    // Intelligent matching based on preferences
    if (ans.q2 === 'vanilla' || ans.q3 === 'comforting' || ans.q1 === 'sweet') {
      return PRODUCTS.find(p => p.id === 'vanilliano') || PRODUCTS[0];
    }
    if (ans.q2 === 'berries' || ans.q3 === 'playful' || ans.q1 === 'fruity') {
      return PRODUCTS.find(p => p.id === 'berry') || PRODUCTS[1];
    }
    if (ans.q2 === 'rose' || ans.q3 === 'romantic' || ans.q1 === 'floral') {
      return PRODUCTS.find(p => p.id === 'rose') || PRODUCTS[2];
    }
    if (ans.q2 === 'peach' || ans.q3 === 'luminous') {
      return PRODUCTS.find(p => p.id === 'peach') || PRODUCTS[3];
    }
    if (ans.q2 === 'oud' || ans.q3 === 'commanding') {
      return PRODUCTS.find(p => p.id === 'oud-noir') || PRODUCTS.find(p => p.id === 'oud') || PRODUCTS[4];
    }
    if (ans.q1 === 'aquatic' || ans.q2 === 'ocean' || ans.q3 === 'maritime') {
      return PRODUCTS.find(p => p.id === 'navy-aqua') || PRODUCTS[5];
    }
    if (ans.q1 === 'woody') {
      return PRODUCTS.find(p => p.id === 'grey-musk') || PRODUCTS[0];
    }
    return PRODUCTS[0];
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setMatchedProduct(null);
  };

  return (
    <section id="quiz" className="py-20 sm:py-28 bg-[#F7F1E8] border-t border-[#E8D8C3]">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C3] text-[#493426] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8B674D]" />
            <span>{t.quiz.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#493426] tracking-tight">
            {t.quiz.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B674D] font-sans max-w-xl mx-auto leading-relaxed">
            {t.quiz.subtitle}
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-6 sm:p-10 shadow-lg relative min-h-[420px] flex flex-col justify-between">
          {/* Progress bar */}
          {step <= 3 && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider text-[#8B674D] mb-2">
                <span>
                  {language === 'en' ? `Question ${step} of 3` : `السؤال ${step} من 3`}
                </span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-[#E8D8C3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8B674D] transition-all duration-500 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl sm:text-2xl font-serif text-[#493426] text-center">
                {t.quiz.q1}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  { key: 'sweet', label: t.quiz.q1_opt1 },
                  { key: 'fruity', label: t.quiz.q1_opt2 },
                  { key: 'floral', label: t.quiz.q1_opt3 },
                  { key: 'woody', label: t.quiz.q1_opt4 },
                  { key: 'aquatic', label: t.quiz.q1_opt5 },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectAnswer('q1', opt.key)}
                    className="p-4 text-start border border-[#E8D8C3] hover:border-[#8B674D] bg-[#F7F1E8] hover:bg-white text-xs sm:text-sm font-sans text-[#493426] transition-all duration-300 flex items-center justify-between group shadow-sm"
                  >
                    <span>{opt.label}</span>
                    <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B674D]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl sm:text-2xl font-serif text-[#493426] text-center">
                {t.quiz.q2}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  { key: 'vanilla', label: t.quiz.q2_opt1 },
                  { key: 'berries', label: t.quiz.q2_opt2 },
                  { key: 'rose', label: t.quiz.q2_opt3 },
                  { key: 'peach', label: t.quiz.q2_opt4 },
                  { key: 'oud', label: t.quiz.q2_opt5 },
                  { key: 'ocean', label: t.quiz.q2_opt6 },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectAnswer('q2', opt.key)}
                    className="p-4 text-start border border-[#E8D8C3] hover:border-[#8B674D] bg-[#F7F1E8] hover:bg-white text-xs sm:text-sm font-sans text-[#493426] transition-all duration-300 flex items-center justify-between group shadow-sm"
                  >
                    <span>{opt.label}</span>
                    <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B674D]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl sm:text-2xl font-serif text-[#493426] text-center">
                {t.quiz.q3}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  { key: 'comforting', label: t.quiz.q3_opt1 },
                  { key: 'playful', label: t.quiz.q3_opt2 },
                  { key: 'romantic', label: t.quiz.q3_opt3 },
                  { key: 'luminous', label: t.quiz.q3_opt4 },
                  { key: 'commanding', label: t.quiz.q3_opt5 },
                  { key: 'maritime', label: t.quiz.q3_opt6 },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectAnswer('q3', opt.key)}
                    className="p-4 text-start border border-[#E8D8C3] hover:border-[#8B674D] bg-[#F7F1E8] hover:bg-white text-xs sm:text-sm font-sans text-[#493426] transition-all duration-300 flex items-center justify-between group shadow-sm"
                  >
                    <span>{opt.label}</span>
                    <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B674D]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Step 4 */}
          {step === 4 && matchedProduct && (
            <div className="text-center space-y-6 animate-in zoom-in-95">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B674D] text-[#FFF9F1] text-[10px] tracking-[0.2em] uppercase font-sans font-semibold">
                <Sparkles className="w-3 h-3 text-[#FFF9F1]" />
                <span>{t.quiz.matchBadge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#493426]">
                {t.quiz.resultTitle}
              </h3>

              {/* Matched Product Card */}
              <div className="max-w-md mx-auto p-6 bg-[#F7F1E8] border border-[#E8D8C3] shadow-md flex flex-col items-center">
                <div className="relative w-40 h-52 mb-4">
                  <Image
                    src={matchedProduct.image}
                    alt={matchedProduct.nameEn}
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8B674D]">
                  {language === 'en' ? matchedProduct.familyEn : matchedProduct.familyAr}
                </span>

                <h4 className="text-2xl font-serif text-[#493426] mt-1">
                  {language === 'en' ? matchedProduct.nameEn : matchedProduct.nameAr}
                </h4>

                <p className="text-xs text-[#8B674D] font-serif italic mt-1">
                  &ldquo;{language === 'en' ? matchedProduct.taglineEn : matchedProduct.taglineAr}&rdquo;
                </p>

                <p className="mt-3 text-xs text-[#493426]/80 font-sans leading-relaxed">
                  {language === 'en' ? matchedProduct.storyEn : matchedProduct.storyAr}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif font-bold text-lg text-[#493426]">
                    {matchedProduct.price} {t.collection.egp}
                  </span>
                  <span className="text-xs text-[#8B674D] line-through font-sans">
                    {matchedProduct.originalPrice} {t.collection.egp}
                  </span>
                  <span className="px-2 py-0.5 bg-[#8B674D] text-[#FFF9F1] text-[10px] font-bold font-sans">
                    50% OFF
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
                  <a
                    href={`/product/${matchedProduct.id}`}
                    className="px-5 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.quiz.viewStory}</span>
                  </a>

                  <button
                    onClick={() => addToCart(matchedProduct, 1)}
                    className="px-5 py-2.5 bg-[#FFF9F1] border border-[#493426] text-[#493426] hover:bg-[#493426] hover:text-[#FFF9F1] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.collection.addToBag}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#8B674D] hover:text-[#493426] underline transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.quiz.retake}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
