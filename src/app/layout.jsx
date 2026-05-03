import { Inter, Outfit, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './tailwind.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhysicsBackground from '@/components/PhysicsBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-next-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-next-display',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-next-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-next-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Daniel Ozoani — Builder, TPM & Developer',
    template: '%s | Daniel Ozoani',
  },
  description: 'Technical Project Manager and developer who loves building products, exploring AI, and thinking in systems. Come see what I\'m working on.',
  authors: [{ name: 'Daniel Ozoani' }],
  robots: 'index, follow',
  metadataBase: new URL('https://danbuilds.work'),
  openGraph: {
    title: 'Daniel Ozoani — Builder, TPM & Developer',
    description: 'Technical Project Manager and developer building things that matter. Currently: Recaller.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Ozoani — Builder, TPM & Developer',
    description: 'Technical Project Manager and developer building things that matter.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    google: 'hW-_0E2xJXKBiddXe3PDqA1Jyoqo7LgSTe2odhYPynU',
  },
  other: {
    'theme-color': '#1a1a2e',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="min-h-screen relative">
          <PhysicsBackground />
          <CustomCursor />
          <Navbar />
          <main className="content-layer">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
