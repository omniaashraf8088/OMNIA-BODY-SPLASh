import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { CampaignProvider } from '@/context/CampaignContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omniabodysplash.vercel.app'),
  title: 'MN OMNIA | Luxury Body Splash — Your Signature. Your Scent.',
  description:
    'MN OMNIA luxury body splash collection. 150 ML fine body splashes for women and men: Vanilliano, Oud, Berry, Rose, Peach, Classic, Grey Musk, Navy Aqua, and Oud Noir. 150 EGP (50% Off Opening Offer).',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'MN OMNIA | Luxury Body Splash Collection',
    description: 'A little touch of luxury, every day. 150 ML Luxury Body Splash — 150 EGP with 50% discount.',
    url: 'https://omniabodysplash.vercel.app',
    siteName: 'MN OMNIA',
    images: [
      {
        url: '/assets/products/vanilliano.png',
        width: 1000,
        height: 1250,
        alt: 'MN OMNIA Luxury Body Splash Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MN OMNIA | Luxury Body Splash',
    description: 'A little touch of luxury, every day. Discover our exclusive fragrance collection.',
    images: ['/assets/products/vanilliano.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${playfair.variable} ${montserrat.variable} light`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="bg-[#F7F1E8] text-[#493426] font-sans antialiased min-h-screen selection:bg-[#493426] selection:text-[#FFF9F1]">
        <LanguageProvider>
          <CampaignProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </CampaignProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
