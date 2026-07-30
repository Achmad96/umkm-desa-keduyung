// 'use client';

import React from 'react';
import Link from 'next/link';
import SectionCard from '@/components/SectionCard';
import AnimatedNumber from '@/components/AnimatedNumber';

export const metadata = {
  title: 'Profil Desa',
  description: 'Mengenal Desa Keduyung Lebih Dekat - Sejarah, Demografi, dan Potensi',
  openGraph: {
    title: 'Profil Desa | UMKM Desa Keduyung',
    description: 'Mengenal Desa Keduyung Lebih Dekat - Sejarah, Demografi, dan Potensi',
  },
};

export default function ProfilDesaPage() {
  return (
    <main>
      <header
        className="relative min-h-[40vh] flex items-center justify-center text-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/village-landscape.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/70 to-black/80 z-10"></div>
        <div className="relative z-20 text-white px-6 animate-[slideUp_0.8s_ease-out_forwards]">
          <h1 className="font-heading text-[2.5rem] sm:text-[3.5rem] font-extrabold mb-2 tracking-[2px] drop-shadow-md">PROFIL DESA</h1>
          <p className="text-xl font-light text-white/90 mb-6">Mengenal Desa Keduyung Lebih Dekat</p>
          <div className="flex items-center justify-center gap-3 text-sm font-body bg-black/30 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-xl mt-4 mx-auto w-fit">
            <Link href="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="text-gold font-medium tracking-wide">Profil Desa</span>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-16">
            <SectionCard
              title="Sejarah Singkat & Geografis"
              imageSrc="/images/village-landscape.png"
              imageAlt="Geografis Desa Keduyung"
              description="Nama Keduyung berasal dari kisah legenda Den Bagus dan Den Ayu, di mana sebuah 'Dayung' perahu mereka ditemukan setelah terdampar. Secara geografis, Desa Keduyung terletak di wilayah dataran rendah dengan luas 218 hektar. Desa ini berbatasan dengan Desa Pesanggrahan di utara, Sungai Bengawan Solo di timur, Desa Centini di selatan, dan Desa Mlangi di barat."
            />

            <SectionCard
              title="Kepengurusan"
              imageSrc="/images/jasa-service.png"
              imageAlt="Kepengurusan Desa Keduyung"
              description="Pemerintahan Desa Keduyung saat ini dipimpin oleh Kepala Desa Angga Pradita David Hamka, SE. Wilayah administratif desa terbagi menjadi 2 Dusun yaitu Dusun Keduyung dan Dusun Misuwur, yang mencakup 4 RW dan 9 RT."
              reversed={true}
            />

            <SectionCard
              title="Demografi"
              imageSrc="/images/hero-village.png"
              imageAlt="Demografi Desa Keduyung"
              description="Desa Keduyung memiliki populasi penduduk sebanyak 1.371 jiwa, yang terdiri dari 667 laki-laki dan 678 perempuan, serta 403 Kepala Keluarga (KK). Sebagian besar penduduk desa ini bermata pencaharian sebagai buruh tani (573 orang) dan buruh migran (165 orang)."
              accentColor="var(--color-gold)"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="font-heading text-5xl font-extrabold bg-gradient-to-br from-gold to-[#f6e05e] bg-clip-text text-transparent mb-2"><AnimatedNumber value={218} decimal={false} suffix=" Ha" duration={1500} /></div>
              <div className="text-lg text-white font-medium">Luas Wilayah</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="font-heading text-5xl font-extrabold bg-gradient-to-br from-gold to-[#f6e05e] bg-clip-text text-transparent mb-2"><AnimatedNumber value={1230} decimal={false} duration={1500} /></div>
              <div className="text-lg text-white font-medium">Jumlah Penduduk</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="font-heading text-5xl font-extrabold bg-gradient-to-br from-gold to-[#f6e05e] bg-clip-text text-transparent mb-2"><AnimatedNumber value={403} decimal={false} duration={1500} /></div>
              <div className="text-lg text-white font-medium">Kepala Keluarga</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="font-heading text-5xl font-extrabold bg-gradient-to-br from-gold to-[#f6e05e] bg-clip-text text-transparent mb-2"><AnimatedNumber value={41} decimal={false} duration={1500} /></div>
              <div className="text-lg text-white font-medium">Pengusaha UMKM</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
