import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0f1419] to-[#0a0a0a] text-slate-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-gold to-accent"></div>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Logo & Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15L15 45H25V85H75V45H85L50 15Z" fill="#c7833e" />
                <path d="M50 25L30 42.14V75H70V42.14L50 25Z" fill="#1a365d" />
                <path d="M50 40C45 50 40 60 40 75H60C60 60 55 50 50 40Z" fill="#d69e2e" />
              </svg>
              <div>
                <div className="font-heading font-bold text-xl tracking-wider text-white leading-tight">DESA KEDUYUNG</div>
                <div className="text-xs text-gold uppercase tracking-widest font-medium">Kumpulan UMKM</div>
              </div>
            </Link>
            <p className="mb-4 leading-relaxed font-body">Pusat informasi dan direktori produk unggulan dari para pelaku Usaha Mikro Kecil Menengah (UMKM) di Desa Keduyung.</p>
            <p className="text-[0.9rem] text-slate-400 font-body leading-relaxed">
              Balai Desa Keduyung
              <br />
              Kecamatan Laren, Kabupaten Lamongan
              <br />
              Jawa Timur, Indonesia
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-white text-xl font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-10 after:h-0.5 after:bg-gold">Tautan Cepat</h3>
            <ul className="list-none flex flex-col gap-3 p-0 m-0">
              <li>
                <Link href="/" className="inline-block transition-all duration-200 hover:text-gold hover:translate-x-1">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil-desa" className="inline-block transition-all duration-200 hover:text-gold hover:translate-x-1">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="inline-block transition-all duration-200 hover:text-gold hover:translate-x-1">
                  Direktori UMKM
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="inline-block transition-all duration-200 hover:text-gold hover:translate-x-1">
                  Pendaftaran UMKM
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading text-white text-xl font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-10 after:h-0.5 after:bg-gold">Kontak Kami</h3>
            <ul className="list-none flex flex-col gap-4 p-0 m-0">
              <li>
                <a href="tel:+6281554707886" className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gold transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <span>+62 815-5470-7886</span>
                </a>
              </li>
              <li>
                <a href="mailto:pemdes@keduyung.desa.id" className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gold transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <span>pemdes@keduyung.desa.id</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281554707886" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gold transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <span>WhatsApp Pengaduan</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm text-slate-500 m-0">© 2026 Kumpulan UMKM Desa Keduyung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
