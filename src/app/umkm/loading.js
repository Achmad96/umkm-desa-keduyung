import React from 'react';
import Link from 'next/link';
import UMKMCardSkeleton from '@/components/UMKMCardSkeleton';

export default function Loading() {
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
        <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-pulse">
          <div className="w-full h-[300px] rounded-lg bg-white/10"></div>
          <div>
            <div className="h-10 w-3/4 bg-white/10 rounded mb-4"></div>
            <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-white/10 rounded mb-8"></div>
            <div className="flex gap-4 flex-wrap">
              <div className="h-12 w-32 bg-white/10 rounded-lg"></div>
              <div className="h-12 w-32 bg-white/10 rounded-lg"></div>
              <div className="h-12 w-32 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Skeleton for Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 sticky top-4 z-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 w-28 rounded-full bg-white/10 animate-pulse shrink-0"></div>
          ))}
        </div>

        {/* Skeleton for UMKM List */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <UMKMCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
