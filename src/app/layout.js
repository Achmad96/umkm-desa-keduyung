import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: {
    default: 'UMKM Desa Keduyung',
    template: '%s | UMKM Desa Keduyung'
  },
  description: 'Direktori Usaha Mikro Kecil Menengah (UMKM) Desa Keduyung',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'UMKM Desa Keduyung',
    description: 'Direktori Usaha Mikro Kecil Menengah (UMKM) Desa Keduyung',
    url: '/',
    siteName: 'UMKM Desa Keduyung',
    images: [
      {
        url: '/images/village-landscape.png',
        width: 1200,
        height: 630,
        alt: 'Pemandangan Desa Keduyung',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UMKM Desa Keduyung',
    description: 'Direktori Usaha Mikro Kecil Menengah (UMKM) Desa Keduyung',
    images: ['/images/village-landscape.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${outfit.variable}`} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
