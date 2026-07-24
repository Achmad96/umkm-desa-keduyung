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
  title: 'Kumpulan UMKM Desa Keduyung',
  description: 'Direktori Usaha Mikro Kecil Menengah (UMKM) Desa Keduyung',
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
