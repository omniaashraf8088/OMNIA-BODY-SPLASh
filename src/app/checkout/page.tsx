'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Truck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCampaign } from '@/context/CampaignContext';
import { SHIPPING_ZONES } from '@/data/products';
import { translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { language, isRtl } = useLanguage();
  const { campaign, getDiscountedPrice } = useCampaign();
  const t = translations[language];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState(SHIPPING_ZONES[0].id);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentZone = SHIPPING_ZONES.find(z => z.id === selectedGovernorate) || SHIPPING_ZONES[0];
  const shippingFee = subtotal >= 900 ? 0 : currentZone.fee;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      setError(language === 'en' ? 'Please fill in all required delivery fields.' : 'يرجى استكمال جميع بيانات التوصيل المطلوبة.');
      return;
    }

    if (items.length === 0) {
      setError(language === 'en' ? 'Your cart is empty.' : 'حقيبة التسوق فارغة.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Generate unique order ID
    const orderNumber = `MN-${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderNumber,
      customerName: fullName,
      customerPhone: phone,
      governorate: language === 'en' ? currentZone.nameEn : currentZone.nameAr,
      city,
      address,
      notes,
      paymentMethod,
      items,
      subtotal,
      shippingFee,
      total,
      createdAt: new Date().toISOString()
    };

    // Store in localStorage for confirmation page and admin view
    try {
      const existingOrders = JSON.parse(localStorage.getItem('omnia_orders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('omnia_orders', JSON.stringify(existingOrders));
      localStorage.setItem('omnia_latest_order', JSON.stringify(orderData));
    } catch (e) {
      console.error(e);
    }

    clearCart();

    // Redirect to order confirmation
    setTimeout(() => {
      router.push(`/order-confirmation/${orderNumber}`);
    }, 600);
  };

  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl flex-grow">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#8B674D] hover:text-[#493426] mb-8 transition-colors"
        >
          <ArrowIcon className="w-4 h-4" />
          <span>{language === 'en' ? 'Continue Shopping' : 'العودة للتسوق'}</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif text-[#493426] mb-8">
          {t.checkout.title}
        </h1>

        {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-800 text-xs font-sans mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Customer & Delivery Details Form */}
          <div className="lg:col-span-7 bg-[#FFF9F1] border border-[#E8D8C3] p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-serif text-[#493426] border-b border-[#E8D8C3] pb-3 mb-6">
              {t.checkout.contactInfo}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                  {t.checkout.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder={t.checkout.fullNamePlaceholder}
                  className="w-full bg-[#F7F1E8] border border-[#D1B99C] px-3.5 py-2.5 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                  {t.checkout.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.checkout.phonePlaceholder}
                  className="w-full bg-[#F7F1E8] border border-[#D1B99C] px-3.5 py-2.5 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                    {t.checkout.governorate} *
                  </label>
                  <select
                    value={selectedGovernorate}
                    onChange={e => setSelectedGovernorate(e.target.value)}
                    className="w-full bg-[#F7F1E8] border border-[#D1B99C] px-3.5 py-2.5 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                  >
                    {SHIPPING_ZONES.map(z => (
                      <option key={z.id} value={z.id}>
                        {language === 'en' ? z.nameEn : z.nameAr} ({z.fee} EGP)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                    {t.checkout.city} *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder={t.checkout.cityPlaceholder}
                    className="w-full bg-[#F7F1E8] border border-[#D1B99C] px-3.5 py-2.5 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                  {t.checkout.address} *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                  className="w-full bg-[#F7F1E8] border border-[#D1B99C] p-3 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-1.5 font-medium">
                  {t.checkout.notes}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={t.checkout.notesPlaceholder}
                  className="w-full bg-[#F7F1E8] border border-[#D1B99C] px-3.5 py-2.5 text-xs sm:text-sm text-[#493426] focus:outline-none focus:border-[#493426]"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-[#E8D8C3]">
                <label className="block text-xs uppercase tracking-wider font-sans text-[#8B674D] mb-2 font-medium">
                  {t.checkout.paymentMethod}
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3.5 border border-[#8B674D] bg-[#F7F1E8] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-[#493426] focus:ring-[#493426]"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-[#493426]">
                        {t.checkout.cod}
                      </span>
                      <span className="block text-xs text-[#8B674D] mt-0.5">
                        {t.checkout.codDesc}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 border border-[#E8D8C3] bg-white/60 opacity-60 cursor-not-allowed">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="mt-0.5"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-[#493426]">
                        {t.checkout.card}
                      </span>
                      <span className="block text-xs text-[#8B674D] mt-0.5">
                        Online credit card payment gateway will be enabled upon merchant account activation.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-4 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] disabled:opacity-50 text-xs sm:text-sm font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg mt-6"
              >
                {isSubmitting ? t.checkout.placingOrder : t.checkout.placeOrder}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 bg-[#FFF9F1] border border-[#E8D8C3] p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-serif text-[#493426] border-b border-[#E8D8C3] pb-3">
              {t.checkout.orderSummary} ({items.length})
            </h2>

            <div className="space-y-4 max-h-[320px] overflow-y-auto">
              {items.map(item => {
                const currentPrice = item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-3 pb-3 border-b border-[#E8D8C3]/50">
                    <div className="relative w-14 h-18 bg-[#F7F1E8] flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.nameEn}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 flex justify-between items-start text-xs font-sans">
                      <div>
                        <h4 className="font-serif text-sm text-[#493426] font-semibold">
                          {language === 'en' ? item.product.nameEn : item.product.nameAr}
                        </h4>
                        <span className="text-[#8B674D]">
                          Qty: {item.quantity} × {currentPrice} {t.collection.egp}
                        </span>
                      </div>
                      <span className="font-serif font-bold text-[#493426]">
                        {currentPrice * item.quantity} {t.collection.egp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-2 text-xs font-sans text-[#493426]">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal} {t.collection.egp}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.checkout.shippingFee} ({language === 'en' ? currentZone.nameEn : currentZone.nameAr})</span>
                <span>{shippingFee === 0 ? (language === 'en' ? 'FREE' : 'مجاني') : `${shippingFee} ${t.collection.egp}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#493426] pt-3 border-t border-[#E8D8C3]">
                <span>{t.checkout.total}</span>
                <span>{total} {t.collection.egp}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F7F1E8] border border-[#E8D8C3] text-[11px] text-[#8B674D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#493426] flex-shrink-0" />
              <span>{t.checkout.egyptNotice}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
