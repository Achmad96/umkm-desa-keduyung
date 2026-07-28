'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import CategoryCard from '../../components/CategoryCard';
import LoginModal from '../../components/LoginModal';
import { registerUMKM, checkSessionAction } from '../actions';

export default function PendaftaranPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaUsaha: '',
    namaPemilik: '',
    kategori: '',
    alamat: '',
    telepon: '',
    deskripsi: '',
    shopeeLink: '',
    tiktokLink: '',
    mapsLink: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    checkSessionAction().then(result => {
      if (result.isAdmin) setIsLoggedIn(true);
    });
  }, []);

  const handleCategorySelect = (categoryTitle) => {
    setFormData(prev => ({ ...prev, kategori: categoryTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const result = await registerUMKM(form);

    if (result.success) {
      alert('Terima kasih! Pendaftaran UMKM Anda telah berhasil dikirim dan akan segera kami proses.');
      setFormData({
        namaUsaha: '',
        namaPemilik: '',
        kategori: '',
        alamat: '',
        telepon: '',
        deskripsi: '',
        shopeeLink: '',
        tiktokLink: '',
        mapsLink: ''
      });
    } else {
      alert(result.error);
    }
  };

  const FoodIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  );

  const FashionIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
    </svg>
  );

  const CraftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
    </svg>
  );

  const ServiceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  );

  const CheckIcon = () => (
    <svg className="text-primary shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div className="min-h-screen pb-16">
      <header
        className="h-[40vh] min-h-[350px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8 mb-12"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(26, 54, 93, 0.7), rgba(15, 23, 42, 0.9)), url('/images/village-landscape.png')" }}
      >
        <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-4 tracking-[1px]">PENDAFTARAN UMKM</h1>
        <p className="font-body text-[clamp(1rem,2vw,1.25rem)] text-gold mb-4">Daftarkan Usaha Anda di Direktori UMKM Desa Keduyung</p>
        <div className="flex items-center justify-center gap-3 text-sm font-body bg-black/30 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-xl mt-4 mx-auto w-fit">
          <Link href="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gold font-medium tracking-wide">Pendaftaran</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8">
        <section className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-12 mx-auto mb-16 max-w-[800px] text-center">
          <p className="text-slate-400 leading-relaxed text-[1.1rem] mb-8">Bergabunglah dengan ratusan pelaku usaha lainnya di Desa Keduyung. Dengan mendaftarkan UMKM Anda, usaha Anda akan lebih mudah ditemukan oleh masyarakat luas melalui platform digital desa kita.</p>
          <ul className="list-none p-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 text-left">
            <li className="text-white flex items-start gap-3"><CheckIcon /> Promosi gratis di website desa</li>
            <li className="text-white flex items-start gap-3"><CheckIcon /> Akses lebih luas ke pelanggan</li>
            <li className="text-white flex items-start gap-3"><CheckIcon /> Dukungan program desa</li>
            <li className="text-white flex items-start gap-3"><CheckIcon /> Terhubung dengan pembeli online</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-3xl text-white text-center mb-8">Pilih Kategori UMKM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <CategoryCard
              icon={<FoodIcon />}
              title="Makanan & Minuman"
              description="Usaha kuliner, makanan, minuman, dan catering"
              onRegister={() => handleCategorySelect('Makanan & Minuman')}
            />
            <CategoryCard
              icon={<FashionIcon />}
              title="Pakaian & Busana"
              description="Fashion, batik, konveksi, dan aksesoris"
              onRegister={() => handleCategorySelect('Pakaian & Busana')}
            />
            <CategoryCard
              icon={<CraftIcon />}
              title="Kerajinan Tangan"
              description="Anyaman, ukiran, keramik, dan produk handmade"
              onRegister={() => handleCategorySelect('Kerajinan Tangan')}
            />
            <CategoryCard
              icon={<ServiceIcon />}
              title="Jasa & Layanan"
              description="Bengkel, jahit, tukang, dan layanan profesional"
              onRegister={() => handleCategorySelect('Jasa & Layanan')}
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-12 max-w-[700px] mx-auto" ref={formRef}>
          {!isLoggedIn && (
            <div className="absolute inset-0 z-10 bg-[#0f172a]/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">Akses Terkunci</h3>
              <p className="text-slate-300 mb-6 font-body">Silakan login terlebih dahulu untuk mendaftarkan UMKM Anda.</p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-gradient-to-br from-primary to-primary-dark text-white font-bold font-heading px-8 py-3 rounded-full hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 border-none cursor-pointer"
              >
                Login Sekarang
              </button>
            </div>
          )}

          <div className={!isLoggedIn ? "opacity-30 pointer-events-none blur-sm transition-all duration-300" : "transition-all duration-300"}>
            <h2 className="font-heading text-3xl text-white text-center mb-8">Formulir Pendaftaran</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="namaUsaha" className="font-heading font-medium mb-2 text-slate-400">Nama Usaha</label>
                <input type="text" id="namaUsaha" name="namaUsaha" required value={formData.namaUsaha} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Masukkan nama usaha Anda" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="namaPemilik" className="font-heading font-medium mb-2 text-slate-400">Nama Pemilik</label>
                <input type="text" id="namaPemilik" name="namaPemilik" required value={formData.namaPemilik} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Masukkan nama lengkap pemilik" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="kategori" className="font-heading font-medium mb-2 text-slate-400">Kategori</label>
                <select id="kategori" name="kategori" required value={formData.kategori} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)] [&_option]:bg-background-dark [&_option]:text-white">
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="Makanan & Minuman">Makanan & Minuman</option>
                  <option value="Pakaian & Busana">Pakaian & Busana</option>
                  <option value="Kerajinan Tangan">Kerajinan Tangan</option>
                  <option value="Jasa & Layanan">Jasa & Layanan</option>
                </select>
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="alamat" className="font-heading font-medium mb-2 text-slate-400">Alamat Usaha</label>
                <textarea id="alamat" name="alamat" required value={formData.alamat} onChange={handleInputChange} className="min-h-[120px] resize-y bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Detail alamat usaha (RT/RW, Dusun)"></textarea>
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="telepon" className="font-heading font-medium mb-2 text-slate-400">No. Telepon / WhatsApp</label>
                <input type="tel" id="telepon" name="telepon" required value={formData.telepon} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Contoh: 081234567890" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="deskripsi" className="font-heading font-medium mb-2 text-slate-400">Deskripsi Usaha</label>
                <textarea id="deskripsi" name="deskripsi" required value={formData.deskripsi} onChange={handleInputChange} className="min-h-[120px] resize-y bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Ceritakan singkat tentang produk atau layanan Anda"></textarea>
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="image" className="font-heading font-medium mb-2 text-slate-400">Foto Utama (Opsional)</label>
                <input type="file" id="image" name="image" accept="image/*" className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="galleryImages" className="font-heading font-medium mb-2 text-slate-400">Foto Galeri (Bisa pilih lebih dari satu, Opsional)</label>
                <input type="file" id="galleryImages" name="galleryImages" accept="image/*" multiple className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="shopeeLink" className="font-heading font-medium mb-2 text-slate-400">Link Toko Shopee (Opsional)</label>
                <input type="url" id="shopeeLink" name="shopeeLink" value={formData.shopeeLink} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Contoh: https://shopee.co.id/tokoanda" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="tiktokLink" className="font-heading font-medium mb-2 text-slate-400">Link TikTok (Opsional)</label>
                <input type="url" id="tiktokLink" name="tiktokLink" value={formData.tiktokLink} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Contoh: https://tiktok.com/@akunanda" />
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="mapsLink" className="font-heading font-medium mb-2 text-slate-400">Link Google Maps (Opsional)</label>
                <input type="url" id="mapsLink" name="mapsLink" value={formData.mapsLink} onChange={handleInputChange} className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]" placeholder="Contoh: https://maps.google.com/?q=Lokasi+Toko" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-br from-primary to-primary-dark text-white p-4 border-none rounded-lg font-heading text-lg font-bold cursor-pointer transition-all duration-300 mt-4 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]">Daftar Sekarang</button>
            </form>
          </div>
        </section>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
