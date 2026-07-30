import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import SectionCard from '@/components/SectionCard';
import UMKMCard from '@/components/UMKMCard';
import { getUMKMs } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const metadata = {
  title: 'Beranda',
  description: 'Mengenal lebih dekat potensi dan keindahan Desa Keduyung serta UMKM unggulan kami.',
  openGraph: {
    title: 'Beranda | UMKM Desa Keduyung',
    description: 'Mengenal lebih dekat potensi dan keindahan Desa Keduyung serta UMKM unggulan kami.',
  },
};

export default async function HomePage() {
  const umkms = await getUMKMs();
  const session = await getSession();
  const isAdmin = !!session;
  const featuredSlugs = ['dapur-rere', 'srawung-coffee-roastery', 'keripik-telur-asin-tiara'];
  const featuredUMKMs = umkms.filter(umkm => featuredSlugs.includes(umkm.slug));

  return (
    <main>
      <HeroSection />
      <StatsBar />

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out_forwards]">
            <h2 className="font-heading text-[2.5rem] font-bold text-white mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-1 after:bg-gold after:rounded-sm">
              Tentang Desa Keduyung
            </h2>
            <p className="text-[1.125rem] text-slate-400 max-w-[600px] mx-auto">
              Mengenal lebih dekat potensi dan keindahan desa kami
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <SectionCard
              imageSrc="/images/village-landscape.png"
              imageAlt="Pemandangan Desa Keduyung"
              title="Profil Desa"
              description="Desa Keduyung memiliki sejarah unik yang berawal dari kisah Den Bagus dan Den Ayu. Kini, desa seluas 218 hektar ini dihuni oleh sekitar 1.371 jiwa dan berbatasan langsung dengan Sungai Bengawan Solo, menghadirkan potensi sumber daya yang berlimpah."
              linkHref="/profil-desa"
              linkText="Selengkapnya"
            />

            <SectionCard
              imageSrc={featuredUMKMs[0]?.imageSrc || "/images/nasi-pecel.png"}
              imageAlt="UMKM Unggulan Keduyung"
              title="UMKM Unggulan"
              description="Potensi ekonomi Desa Keduyung didukung oleh berbagai Usaha Mikro, Kecil, dan Menengah (UMKM) yang terus berkembang. Dari kuliner tradisional hingga kerajinan tangan, produk kami siap bersaing di pasar yang lebih luas."
              reversed={true}
              accentColor="var(--color-gold)"
              linkHref="/umkm"
              linkText="Lihat Semua UMKM"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out_forwards]">
            <h2 className="font-heading text-[2.5rem] font-bold text-white mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-1 after:bg-gold after:rounded-sm">
              UMKM Pilihan
            </h2>
            <p className="text-[1.125rem] text-slate-400 max-w-[600px] mx-auto">
              Dukung ekonomi lokal dengan berbelanja produk asli dari warga Desa Keduyung
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 mt-8">
            {featuredUMKMs.map((umkm) => (
              <UMKMCard
                key={umkm.id}
                id={umkm.id}
                slug={umkm.slug}
                imageSrc={umkm.imageSrc}
                name={umkm.namaUsaha}
                description={umkm.deskripsi}
                category={umkm.kategori}
                whatsappLink={umkm.whatsappLink}
                phoneNumber={umkm.telepon}
                shopeeLink={umkm.shopeeLink}
                tiktokLink={umkm.tiktokLink}
                mapsLink={umkm.mapsLink}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#0d213e] py-24 px-6 relative overflow-hidden">
        <div className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)] w-[300px] h-[300px] -top-[100px] -left-[100px]"></div>
        <div className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)] w-[400px] h-[400px] -bottom-[150px] -right-[100px]"></div>
        <div className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)] w-[200px] h-[200px] top-1/2 left-[80%] -translate-y-1/2"></div>

        <div className="max-w-[800px] mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16 text-center relative z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <h2 className="font-heading text-[2.5rem] font-bold text-white mb-4">Daftarkan UMKM Anda</h2>
          <p className="text-[1.125rem] text-white/90 mb-10 max-w-[500px] mx-auto leading-relaxed">
            Mari kembangkan bisnis Anda bersama-sama. Daftarkan usaha Anda sekarang juga ke dalam direktori UMKM Desa Keduyung dan jangkau lebih banyak pelanggan.
          </p>
          <Link href="/pendaftaran" className="inline-block bg-gold text-white font-heading font-semibold text-[1.125rem] px-10 py-4 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(214,158,46,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(214,158,46,0.6)] hover:bg-[#b7791f]">
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}
