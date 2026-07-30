import { getUMKMBySlug } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GalleryLightbox from '@/components/GalleryLightbox';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const umkm = await getUMKMBySlug(slug);
  if (!umkm) return { title: 'UMKM Tidak Ditemukan' };

  return {
    title: umkm.namaUsaha,
    description: umkm.deskripsi,
    openGraph: {
      title: `${umkm.namaUsaha} | UMKM Desa Keduyung`,
      description: umkm.deskripsi,
      images: [
        {
          url: umkm.imageSrc || '/images/village-landscape.png',
          width: 1200,
          height: 630,
          alt: umkm.namaUsaha,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${umkm.namaUsaha} | UMKM Desa Keduyung`,
      description: umkm.deskripsi,
      images: [umkm.imageSrc || '/images/village-landscape.png'],
    },
  };
}

export default async function UMKMDetailPage({ params }) {
  const { slug } = await params;
  const umkm = await getUMKMBySlug(slug);

  if (!umkm) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={umkm.imageSrc || '/images/village-landscape.png'}
          alt={umkm.namaUsaha || 'UMKM'}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end max-w-[1200px] mx-auto px-8 pb-12">
          <div className="flex items-center gap-3 text-sm font-body bg-black/30 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-xl mb-6 w-fit">
            <Link href="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <Link href="/umkm" className="text-slate-300 hover:text-gold transition-colors">
              UMKM
            </Link>
            <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="text-gold font-medium tracking-wide truncate max-w-[200px]">{umkm.namaUsaha}</span>
          </div>
          <div className="inline-block bg-accent text-white font-body text-sm font-semibold px-4 py-1.5 rounded-full shadow-md w-fit mb-4">
            {umkm.kategori}
          </div>
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold text-white mb-2 leading-tight">
            {umkm.namaUsaha}
          </h1>
          <p className="font-body text-xl text-slate-300">
            Milik {umkm.namaPemilik}
          </p>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <h2 className="font-heading text-2xl text-white mb-4">Tentang Usaha</h2>
              <p className="text-slate-300 font-body leading-relaxed text-lg whitespace-pre-line">
                {umkm.deskripsi}
              </p>
            </section>

            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <h2 className="font-heading text-2xl text-white mb-6">Galeri Produk / Tempat</h2>
              <GalleryLightbox
                images={
                  umkm.galleryImages && umkm.galleryImages.length > 0 
                    ? umkm.galleryImages 
                    : [umkm.imageSrc || '/images/village-landscape.png']
                }
              />
            </section>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <h3 className="font-heading text-xl text-white mb-6">Informasi Kontak</h3>

              <ul className="space-y-6 font-body">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-sm mb-1">Alamat</h4>
                    <p className="text-white">{umkm.alamat}</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-sm mb-1">Telepon</h4>
                    <p className="text-white">{umkm.telepon}</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <h3 className="font-heading text-xl text-white mb-6">Hubungi / Kunjungi</h3>
              <div className="grid grid-cols-2 gap-4">
                {umkm.whatsappLink && (
                  <a href={umkm.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#25D366] mb-2 group-hover:scale-110 transition-transform">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="text-sm font-body text-slate-300">WhatsApp</span>
                  </a>
                )}

                {umkm.shopeeLink && (
                  <a href={umkm.shopeeLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#EE4D2D]/20 hover:border-[#EE4D2D] transition-all group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#EE4D2D] mb-2 group-hover:scale-110 transition-transform">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span className="text-sm font-body text-slate-300">Shopee</span>
                  </a>
                )}

                {umkm.tiktokLink && (
                  <a href={umkm.tiktokLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white transition-all group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                    <span className="text-sm font-body text-slate-300">TikTok</span>
                  </a>
                )}

                {umkm.mapsLink && (
                  <a href={umkm.mapsLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#EA4335]/20 hover:border-[#EA4335] transition-all group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#EA4335] mb-2 group-hover:scale-110 transition-transform">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-sm font-body text-slate-300">Maps</span>
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
