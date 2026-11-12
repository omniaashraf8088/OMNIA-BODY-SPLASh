'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCampaign } from '@/context/CampaignContext';
import { translations } from '@/data/translations';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { language, isRtl } = useLanguage();
  const { campaign, getDiscountedPrice } = useCampaign();
  const t = translations[language];

  if (!isCartOpen) return null;

  const freeShippingThreshold = 900;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div
        className={`w-full max-w-md bg-[#FFF9F1] h-full shadow-2xl flex flex-col justify-between border-s border-[#E8D8C3] transform transition-transform duration-300 ${
          isRtl ? 'animate-in slide-in-from-left' : 'animate-in slide-in-from-right'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8D8C3] flex items-center justify-between bg-[#F7F1E8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#493426]" />
            <h3 className="font-serif text-lg tracking-wide text-[#493426] uppercase">
              {t.cart.title}
            </h3>
            <span className="text-xs font-sans text-[#8B674D]">({items.length})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#493426] hover:text-[#8B674D] transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#E8D8C3]/50 border-b border-[#D1B99C]/40 text-xs font-sans text-[#493426]">
          {remainingForFreeShipping > 0 ? (
            <p>
              {language === 'en'
                ? `Add ${remainingForFreeShipping} EGP more for FREE shipping!`
                : `أضف بقيمة ${remainingForFreeShipping} ج.م إضافية للشحن المجاني!`}
            </p>
          ) : (
            <p className="font-semibold text-emerald-800">
              {language === 'en'
                ? '🎉 You unlocked FREE delivery across Egypt!'
                : '🎉 لقد حصلت على شحن مجاني لكافة المحافظات!'}
            </p>
          )}
          <div className="mt-1.5 h-1.5 bg-[#D1B99C]/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#493426] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F7F1E8] flex items-center justify-center text-[#8B674D]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <p className="text-sm font-sans text-[#8B674D]">{t.cart.empty}</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-colors text-xs font-sans uppercase tracking-widest font-semibold"
              >
                {t.cart.explore}
              </button>
            </div>
          ) : (
            items.map(item => {
              const currentPrice = item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-[#F7F1E8] border border-[#E8D8C3] relative group"
                >
                  <div className="relative w-20 h-24 bg-white flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.nameEn}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base text-[#493426]">
                        {language === 'en' ? item.product.nameEn : item.product.nameAr}
                      </h4>
                      <span className="text-[10px] uppercase font-sans text-[#8B674D]">
                        {item.product.volume} • {language === 'en' ? item.product.familyEn : item.product.familyAr}
                      </span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-serif font-bold text-sm text-[#493426]">
                          {currentPrice} {t.collection.egp}
                        </span>
                        {campaign.isActive && currentPrice < item.product.originalPrice && (
                          <span className="text-[10px] text-[#8B674D] line-through font-sans">
                            {item.product.originalPrice} {t.collection.egp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8D8C3]">
                      <div className="flex items-center border border-[#8B674D] bg-white text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#493426] hover:bg-[#F7F1E8]"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold font-sans text-[#493426]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#493426] hover:bg-[#F7F1E8]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#8B674D] hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8D8C3] bg-[#F7F1E8] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-sans uppercase tracking-wider text-[#8B674D]">
                {t.cart.subtotal}
              </span>
              <span className="text-xl font-serif font-bold text-[#493426]">
                {subtotal} {t.collection.egp}
              </span>
            </div>

            <p className="text-[11px] text-[#8B674D] font-sans">
              {t.cart.shippingNotice}
            </p>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-3.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-colors text-xs font-sans uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg group"
            >
              <span>{t.cart.checkoutBtn}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-xs text-[#8B674D] hover:text-[#493426] underline font-sans"
            >
              {t.cart.continueShopping}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
