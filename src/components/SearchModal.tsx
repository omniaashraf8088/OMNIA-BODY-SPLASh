'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const t = translations[language];

  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter(p => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.familyEn.toLowerCase().includes(q) ||
      p.familyAr.includes(q) ||
      p.taglineEn.toLowerCase().includes(q) ||
      p.notes.topEn.toLowerCase().includes(q) ||
      p.notes.heartEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#FFF9F1] border border-[#E8D8C3] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#493426] hover:text-[#8B674D]"
          aria-label="Close Search"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl text-[#493426] mb-4">
          {language === 'en' ? 'Search Fragrances' : 'البحث عن عطر'}
        </h3>

        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B674D]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={language === 'en' ? 'Type a fragrance name, notes (e.g. Vanilla, Oud, Rose)...' : 'ابحث باسم العطر أو النوتات (مثال: فانيليا، عود، ورد)...'}
            className="w-full bg-[#F7F1E8] border border-[#D1B99C] pl-10 pr-4 py-3 text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
            autoFocus
          />
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-sm text-[#8B674D]">
              {language === 'en' ? 'No fragrances found matching your search.' : 'لم نجد عطوراً تطابق بحثك.'}
            </p>
          ) : (
            filtered.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-[#F7F1E8] border border-[#E8D8C3] hover:border-[#8B674D] transition-colors"
              >
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  <div className="relative w-12 h-16 flex-shrink-0 bg-white">
                    <Image
                      src={product.image}
                      alt={product.nameEn}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#493426] hover:text-[#8B674D] transition-colors">
                      {language === 'en' ? product.nameEn : product.nameAr}
                    </h4>
                    <span className="text-[10px] uppercase font-sans text-[#8B674D]">
                      {product.volume} • {language === 'en' ? product.familyEn : product.familyAr}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-[#493426] mr-2">
                    {product.price} {t.collection.egp}
                  </span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-colors"
                    title={t.collection.addToBag}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
