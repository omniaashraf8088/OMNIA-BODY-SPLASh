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
  metadataBase: new URL('https://mn-omnia.vercel.app'),
  title: 'MN OMNIA | Luxury Body Splash — Your Signature. Your Scent.',
  description:
    'International luxury body splash fragrance brand specializing in feminine and masculine body splash scents. Vanilliano, Berry Muse, Rose Éclat, Peach Sugar, Oud Noir, and Navy Edition.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'MN OMNIA | Luxury Body Splash',
    description: 'A little touch of luxury, every day. Discover our exclusive fragrance collection.',
    images: ['/assets/posters/hero_poster.png'],
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
