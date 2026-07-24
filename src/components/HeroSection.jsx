import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.7), rgba(26, 54, 93, 0.5), rgba(10, 10, 10, 0.9)), url('/images/hero-village.png')" }}>
      <div className="relative w-full max-w-[1200px] mx-auto px-8 py-8 z-10">
        <div className="flex flex-col items-center text-center animate-slideUp">
          {/* <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-body text-sm font-medium mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
            🌾 Kumpulan UMKM
          </div> */}
          <h1 className="font-heading text-[clamp(3rem,8vw,5rem)] font-black bg-gradient-to-r from-white to-gold bg-clip-text text-transparent mb-2 leading-[1.1] opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">Desa Keduyung</h1>
          <h2 className="font-body text-[clamp(1.25rem,3vw,1.75rem)] font-normal text-slate-200 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">Pusat Ekonomi Kreatif & Perdagangan Lokal</h2>
          <p className="font-body text-lg text-slate-300 max-w-[600px] mx-auto mb-8 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
            Selamat datang di Desa Keduyung, desa yang kaya akan potensi agraria dan inovasi UMKM. Temukan berbagai produk unggulan, mulai dari hasil pertanian hingga kerajinan tangan berkualitas tinggi.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto max-w-[300px] md:max-w-none mx-auto opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            <Link href="/umkm" className="px-8 py-3 rounded-lg bg-gradient-to-br from-primary-light to-primary text-white font-body font-semibold transition-all duration-300 shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(43,108,176,0.5)] text-center w-full md:w-auto">
              Jelajahi UMKM
            </Link>
            <Link href="/profil-desa" className="px-8 py-3 rounded-lg bg-transparent border-2 border-gold text-gold font-body font-semibold transition-all duration-300 hover:scale-105 hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(214,158,46,0.3)] text-center w-full md:w-auto">
              Profil Desa
            </Link>
          </div>
        </div>
        <div className="absolute rounded-full z-[1] animate-float w-[150px] h-[150px] top-[10%] left-[10%] bg-gold/30 blur-[20px]"></div>
        <div className="absolute rounded-full z-[1] animate-float w-[200px] h-[200px] bottom-[20%] right-[5%] bg-primary-light/20 blur-[20px]" style={{ animationDelay: "2s" }}></div>
        <div className="absolute rounded-full z-[1] animate-float w-[100px] h-[100px] top-[40%] right-[25%] bg-accent/20 blur-[20px]" style={{ animationDelay: "4s" }}></div>
      </div>
    </section>
  );
}
