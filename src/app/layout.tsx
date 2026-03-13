import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'House of Soul | Luxury Spiritual Concierge',
  description:
    'A premium destination for spiritual alignment. Curated guidance, authenticated gems, and personalized rituals for your soul\'s elevation.',
  keywords: [
    'spiritual guidance',
    'astrology',
    'numerology',
    'gemstones',
    'luxury wellness',
    'soul alignment',
    'energy healing',
    'spiritual concierge',
  ],
  authors: [{ name: 'House of Soul' }],
  openGraph: {
    title: 'House of Soul | Luxury Spiritual Concierge',
    description:
      'A premium destination for spiritual alignment. Curated guidance, authenticated gems, and personalized rituals.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1A1A1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
