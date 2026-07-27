import AnimatedNumber from "./AnimatedNumber";

export default function StatsBar() {
  return (
    <div className="w-full max-w-[1200px] -mt-[40px] mb-10 mx-auto px-8 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-primary-dark/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(214,158,46,0.15)] hover:bg-white/10">
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gold/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gold">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading text-3xl font-bold bg-gradient-to-r from-white to-gold bg-clip-text text-transparent m-0 mb-1 leading-[1.2]">
              <AnimatedNumber value={15} suffix="+" /> UMKM
            </h3>
            <p className="font-body text-sm text-slate-300 m-0">Kawasan Ekonomi Produktif</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(214,158,46,0.15)] hover:bg-white/10">
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gold/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gold">
              <path d="M12 2v20"></path>
              <path d="M12 22c5.523 0 10-4.477 10-10a10 10 0 00-10-10"></path>
              <path d="M12 12c-3.314 0-6-2.686-6-6"></path>
              <path d="M12 12c3.314 0 6 2.686 6 6"></path>
              <path d="M12 22c-5.523 0-10-4.477-10-10"></path>
              <path d="M12 12c-3.314 0-6 2.686-6 6"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading text-3xl font-bold bg-gradient-to-r from-white to-gold bg-clip-text text-transparent m-0 mb-1 leading-[1.2]">
              <AnimatedNumber value={218} suffix="+" /> Hektar
            </h3>
            <p className="font-body text-sm text-slate-300 m-0">Potensi Agraris</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(214,158,46,0.15)] hover:bg-white/10">
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gold/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gold">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading text-3xl font-bold bg-gradient-to-r from-white to-gold bg-clip-text text-transparent m-0 mb-1 leading-[1.2]">
              <AnimatedNumber value={10} suffix="+" /> Kategori
            </h3>
            <p className="font-body text-sm text-slate-300 m-0">Pusat Perdagangan Lokal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
