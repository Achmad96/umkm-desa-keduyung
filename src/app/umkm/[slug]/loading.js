import React from 'react';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className="min-h-screen pb-20">
      <header className="relative w-full h-[50vh] min-h-[400px] bg-slate-900 animate-pulse">
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
            <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          <div className="w-20 h-6 bg-white/20 rounded-full mb-4 animate-pulse"></div>
          <div className="w-2/3 max-w-md h-12 md:h-16 bg-white/20 rounded animate-pulse mb-4"></div>
          <div className="w-48 h-6 bg-white/20 rounded animate-pulse"></div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 mb-8">
              <div className="w-40 h-8 bg-white/20 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="w-4/6 h-4 bg-white/10 rounded animate-pulse"></div>
              </div>
            </section>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <div className="w-48 h-8 bg-white/20 rounded animate-pulse mb-6"></div>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 mr-4 animate-pulse"></div>
                  <div className="w-full">
                    <div className="w-16 h-3 bg-white/10 rounded animate-pulse mb-2"></div>
                    <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 mr-4 animate-pulse"></div>
                  <div className="w-full">
                    <div className="w-20 h-3 bg-white/10 rounded animate-pulse mb-2"></div>
                    <div className="w-32 h-4 bg-white/10 rounded animate-pulse"></div>
                  </div>
                </li>
              </ul>
            </section>

            <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8">
              <div className="w-48 h-8 bg-white/20 rounded animate-pulse mb-6"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                    <div className="w-8 h-8 rounded bg-white/10 mb-2"></div>
                    <div className="w-16 h-3 bg-white/10 rounded"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
