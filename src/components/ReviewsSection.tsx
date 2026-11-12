'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS, PRODUCTS } from '@/data/products';
import { Review } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function ReviewsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Vanilliano');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      commentEn: newComment,
      commentAr: newComment,
      productName: newProduct,
      verifiedBuyer: false
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setShowAddForm(false);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FFF9F1] border-t border-[#E8D8C3]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C3] text-[#493426] text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3 h-3 text-[#8B674D]" />
              <span>AUTHENTIC TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#493426]">
              {t.productDetail.authenticReviews}
            </h2>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-2 shadow"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{t.productDetail.leaveReview}</span>
          </button>
        </div>

        {/* Submit Review Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-12 p-6 bg-[#F7F1E8] border border-[#E8D8C3] shadow-md space-y-4 animate-in fade-in"
          >
            <h3 className="font-serif text-lg text-[#493426]">
              {language === 'en' ? 'Share Your Fragrance Experience' : 'شاركي تجربتكِ مع عطور أومنيا'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={language === 'en' ? 'Your Name' : 'اسمك الكريم'}
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                className="bg-white border border-[#D1B99C] px-3.5 py-2.5 text-xs text-[#493426] focus:outline-none"
                required
              />
              <select
                value={newProduct}
                onChange={e => setNewProduct(e.target.value)}
                className="bg-white border border-[#D1B99C] px-3.5 py-2.5 text-xs text-[#493426] focus:outline-none"
              >
                {PRODUCTS.map(p => (
                  <option key={p.id} value={language === 'en' ? p.nameEn : p.nameAr}>
                    {language === 'en' ? p.nameEn : p.nameAr}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder={language === 'en' ? 'Your feedback and thoughts on the scent...' : 'انطباعك ورأيك في الرائحة والثبات...'}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              rows={3}
              className="w-full bg-white border border-[#D1B99C] p-3 text-xs text-[#493426] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-widest font-semibold"
            >
              {language === 'en' ? 'Post Review' : 'إرسال التقييم'}
            </button>
          </form>
        )}

        {/* Reviews Grid or Elegant Empty State */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 px-6 bg-[#F7F1E8] border border-[#E8D8C3] space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#E8D8C3] flex items-center justify-center text-[#8B674D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#493426]">
              {language === 'en' ? 'Authentic Fragrance Experiences' : 'تجارب وانطباعات عملاء أومنيا'}
            </h3>
            <p className="text-xs sm:text-sm text-[#8B674D] font-sans leading-relaxed">
              {language === 'en'
                ? 'We value genuine customer impressions. Be among the first to experience the collection and share your personal fragrance story.'
                : 'نعتز بالتقييمات الحقيقية لعملائنا بعد تجربة العطور. كوني من أوائل من يشاركون تجربتهم مع تشكيلة إم إن أومنيا.'}
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-2 px-6 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-widest font-semibold transition-colors"
              >
                {t.productDetail.leaveReview}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="p-6 bg-[#F7F1E8] border border-[#E8D8C3] flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8B674D] font-sans">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#493426] font-sans leading-relaxed italic">
                    &ldquo;{language === 'en' ? rev.commentEn : rev.commentAr}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E8D8C3] flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#493426]">{rev.author}</h4>
                    <span className="text-[10px] font-sans text-[#8B674D]">{rev.productName}</span>
                  </div>
                  {rev.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-sans font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>{language === 'en' ? 'Verified Buyer' : 'مشتري مؤكد'}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
