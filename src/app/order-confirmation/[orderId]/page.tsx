'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, MessageSquare, ArrowLeft, ArrowRight, PackageCheck, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function OrderConfirmationContent() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { language, isRtl } = useLanguage();
  const t = translations[language];

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('omnia_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hello MN OMNIA, I placed order #${orderId} for delivery to ${order?.customerName || ''}. Please confirm my order details.`
  );

  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl flex-grow">
        <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 sm:p-12 shadow-lg text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8B674D]">
              {language === 'en' ? 'Order Successful' : 'تم استلام طلبك بنجاح'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#493426]">
              {t.orderConfirmation.title}
            </h1>
            <p className="text-sm text-[#8B674D] font-sans max-w-md mx-auto">
              {t.orderConfirmation.subtitle}
            </p>
          </div>

          <div className="p-4 bg-[#F7F1E8] border border-[#E8D8C3] inline-block">
            <span className="block text-[11px] uppercase tracking-widest text-[#8B674D] font-sans">
              {t.orderConfirmation.orderNumber}
            </span>
            <span className="text-2xl font-serif font-bold text-[#493426] tracking-wider">
              #{orderId || 'MN-CONFIRMED'}
            </span>
          </div>

          {order && (
            <div className="text-start p-6 bg-[#F7F1E8] border border-[#E8D8C3] space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E8D8C3]">
                <div>
                  <span className="font-semibold text-[#8B674D] block uppercase tracking-wider mb-1">
                    {t.orderConfirmation.customerDetails}
                  </span>
                  <p className="font-medium text-[#493426]">{order.customerName}</p>
                  <p className="text-[#8B674D]">{order.customerPhone}</p>
                </div>

                <div>
                  <span className="font-semibold text-[#8B674D] block uppercase tracking-wider mb-1">
                    {t.orderConfirmation.deliveryAddress}
                  </span>
                  <p className="font-medium text-[#493426]">
                    {order.governorate}, {order.city}
                  </p>
                  <p className="text-[#8B674D]">{order.address}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-serif font-bold text-[#493426] pt-2">
                <span>{language === 'en' ? 'Total Amount (Cash on Delivery):' : 'المبلغ الإجمالي (الدفع عند الاستلام):'}</span>
                <span>{order.total} {t.collection.egp}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.orderConfirmation.whatsappConfirm}</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#493426] hover:bg-[#8B674D] text-[#FFF9F1] text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow"
            >
              <ArrowIcon className="w-4 h-4" />
              <span>{t.orderConfirmation.backHome}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F1E8] flex items-center justify-center font-serif text-[#493426]">Loading order confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
