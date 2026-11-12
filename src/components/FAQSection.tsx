'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface FAQItem {
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
}

const FAQS: FAQItem[] = [
  {
    qEn: 'How long does MN OMNIA body splash fragrance last on the skin?',
    qAr: 'كم من الوقت يدوم عطر بودي سبلاش إم إن أومنيا على البشرة؟',
    aEn: 'MN OMNIA is formulated with high-concentration fine fragrance oils that provide 6 to 8+ hours of noticeable longevity, outlasting ordinary body mists while maintaining a soft, elegant sillage.',
    aAr: 'تتميز تركيبة إم إن أومنيا بنسبة تركيز زيوت عطرية فرنسية فاخرة تمنح ثباتاً يدوم من 6 إلى أكثر من 8 ساعات على البشرة والملابس، متفوقاً على معطرات الجسم التقليدية مع انتشار ناعم راقٍ.'
  },
  {
    qEn: 'What are the delivery times and shipping costs across Egypt?',
    qAr: 'ما هي مدة وتكلفة الشحن والتوصيل لمحافظات مصر؟',
    aEn: 'Orders inside Cairo and Giza are delivered within 24–48 hours (45 EGP). Alexandria, Delta, and Canal cities take 2–3 days (55–60 EGP). Upper Egypt takes 3–4 days. Orders over 900 EGP receive FREE express shipping.',
    aAr: 'يصلك الطلب داخل القاهرة والجيزة خلال 24 إلى 48 ساعة فقط (45 ج.م). الإسكندرية ومحافظات الدلتا والقناة خلال يومين إلى ثلاثة أيام (55-60 ج.م). محافظات الصعيد 3-4 أيام. كما نقدم شحناً مجانياً بالكامل للطلبات التي تزيد عن 900 ج.م.'
  },
  {
    qEn: 'Is Cash on Delivery (COD) available?',
    qAr: 'هل الدفع عند الاستلام متاح؟',
    aEn: 'Yes! We offer 100% Cash on Delivery across all 27 Governorates in Egypt. You inspect your order upon delivery and pay the courier directly.',
    aAr: 'نعم بكل تأكيد! نوفر خدمة الدفع نقداً عند الاستلام (COD) في جميع محافظات جمهورية مصر العربية الـ 27. يمكنك معاينة شحنتك ودفع المبلغ مباشرة لمندوب الشحن.'
  },
  {
    qEn: 'What is the volume and packaging specifications of each bottle?',
    qAr: 'ما هو حجم ومواصفات عبوة البودي سبلاش؟',
    aEn: 'Every MN OMNIA bottle contains 150 ML of luxury body splash, equipped with an ultra-fine micro-mist pump and a crystal-clear acrylic protective cap for a silky, even mist distribution.',
    aAr: 'تحتوي كل عبوة من إم إن أومنيا على 150 مل من البودي سبلاش الفاخر، ومزودة برذاذ فائق الدقة (Micro-mist pump) وغطاء أكريليك شفاف يوزع العطر بنعومة حريرية على كامل الجسم.'
  },
  {
    qEn: 'Can I return or exchange a product if I am not satisfied?',
    qAr: 'هل يمكنني استبدال أو استرجاع المنتج في حال الرغبة؟',
    aEn: 'We offer a 14-day hassle-free return and exchange policy for any unopened items in their original luxury packaging. Simply contact our customer service on WhatsApp.',
    aAr: 'نوفر سياسة استبدال واسترجاع مرنة وسريعة خلال 14 يوماً من تاريخ الاستلام للمنتجات غير المفتوحة بتغليفها الأصلي. كل ما عليكِ هو مراسلتنا عبر واتساب لخدمة العملاء.'
  }
];

export default function FAQSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#F7F1E8] border-t border-[#E8D8C3]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C3] text-[#493426] text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#8B674D]" />
            <span>CLARITY & CONFIDENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#493426]">
            {t.productDetail.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFF9F1] border border-[#E8D8C3] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-[#493426] hover:text-[#8B674D] transition-colors"
                >
                  <span>{language === 'en' ? faq.qEn : faq.qAr}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#8B674D] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#493426]/85 font-sans leading-relaxed border-t border-[#E8D8C3]/50">
                    {language === 'en' ? faq.aEn : faq.aAr}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
