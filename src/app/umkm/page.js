import UmkmList from '../../components/UmkmList';
import { getUmkms, getUmkmBySlug } from '@/lib/db';
import Link from 'next/link';

export default async function UmkmPage() {
  const umkms = await getUmkms();
  // Fetch Dapur Rere as the featured UMKM for this page, or fallback to the first UMKM if not found
  const featuredUmkm = await getUmkmBySlug('dapur-rere') || umkms[0];

  return (
    <div className="min-h-screen pb-16">
      <header
        className="h-[40vh] min-h-[350px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8 mb-12"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(26, 54, 93, 0.7), rgba(15, 23, 42, 0.9)), url('/images/hero-village.png')" }}
      >
        <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold text-white mb-4 tracking-[1px]">UMKM KEDUYUNG</h1>
        <p className="font-body text-[clamp(1rem,2vw,1.25rem)] text-gold mb-4">Direktori Usaha Mikro Kecil Menengah Desa Keduyung</p>
        <div className="flex items-center justify-center gap-3 text-sm font-body bg-black/30 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-xl mt-4 mx-auto w-fit">
          <Link href="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gold font-medium tracking-wide">UMKM</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8">
        {featuredUmkm && (
          <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-gold text-background-dark px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                FEATURED
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredUmkm.imageSrc || "/images/village-landscape.png"} alt={featuredUmkm.namaUsaha} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-heading text-4xl text-white mb-4">{featuredUmkm.namaUsaha}</h2>
              <p className="text-slate-400 leading-relaxed mb-8">{featuredUmkm.deskripsi}</p>
              <div className="flex gap-4 flex-wrap">
                {featuredUmkm.whatsappLink && (
                  <a href={featuredUmkm.whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg font-heading font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 inline-block">WhatsApp</a>
                )}
                {featuredUmkm.telepon && featuredUmkm.telepon !== '-' && (
                  <a href={`tel:${featuredUmkm.telepon}`} className="px-6 py-3 rounded-lg font-heading font-semibold transition-all duration-300 bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white inline-block">Telepon</a>
                )}
                <Link href={`/umkm/${featuredUmkm.slug}`} className="px-6 py-3 rounded-lg font-heading font-semibold transition-all duration-300 bg-gold text-background-dark hover:bg-[#d49929] hover:-translate-y-0.5 inline-block">Lihat Detail</Link>
              </div>
            </div>
          </section>
        )}

        <UmkmList initialUmkms={umkms} />
      </main>
    </div>
  );
}
