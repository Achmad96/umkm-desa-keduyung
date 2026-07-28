'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateUMKM } from '@/app/actions';
import { getUMKMByIdAction } from '@/app/actions';
import LoginModal from '@/components/LoginModal';

export default function EditUMKMPage({ params }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [umkmId, setUMKMId] = useState(null);
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

  useEffect(() => {
    async function loadData() {
      const { id } = await params;
      setUMKMId(id);

      const result = await getUMKMByIdAction(id);
      if (!result.success) {
        alert(result.error || 'UMKM tidak ditemukan.');
        router.push('/umkm');
        return;
      }

      setIsLoggedIn(result.isAdmin);
      const umkm = result.data;
      setFormData({
        namaUsaha: umkm.namaUsaha || '',
        namaPemilik: umkm.namaPemilik || '',
        kategori: umkm.kategori || '',
        alamat: umkm.alamat || '',
        telepon: umkm.telepon || '',
        deskripsi: umkm.deskripsi || '',
        shopeeLink: umkm.shopeeLink || '',
        tiktokLink: umkm.tiktokLink || '',
        mapsLink: umkm.mapsLink || '',
      });
      setIsLoading(false);
    }
    loadData();
  }, [params, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = new FormData(e.target);
    const result = await updateUMKM(umkmId, form);

    if (result.success) {
      alert('UMKM berhasil diperbarui!');
      router.push('/umkm');
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-body">Memuat data UMKM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <header
        className="h-[30vh] min-h-[250px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8 mb-12"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(26, 54, 93, 0.7), rgba(15, 23, 42, 0.9)), url('/images/village-landscape.png')" }}
      >
        <h1 className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-4 tracking-[1px]">EDIT UMKM</h1>
        <p className="font-body text-[clamp(1rem,2vw,1.15rem)] text-gold mb-4">Perbarui Informasi Usaha</p>
        <div className="flex items-center justify-center gap-3 text-sm font-body bg-black/30 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-xl mt-4 mx-auto w-fit">
          <Link href="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <Link href="/umkm" className="text-slate-300 hover:text-gold transition-colors">UMKM</Link>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gold font-medium tracking-wide">Edit</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8">
        <section className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-12 max-w-[700px] mx-auto">
          {!isLoggedIn && (
            <div className="absolute inset-0 z-10 bg-[#0f172a]/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">Akses Terkunci</h3>
              <p className="text-slate-300 mb-6 font-body">Silakan login terlebih dahulu untuk mengedit UMKM.</p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-gradient-to-br from-primary to-primary-dark text-white font-bold font-heading px-8 py-3 rounded-full hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 border-none cursor-pointer"
              >
                Login Sekarang
              </button>
            </div>
          )}

          <div className={!isLoggedIn ? "opacity-30 pointer-events-none blur-sm transition-all duration-300" : "transition-all duration-300"}>
            <h2 className="font-heading text-3xl text-white text-center mb-8">Edit Data UMKM</h2>
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
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Clothing & Apparel">Clothing & Apparel</option>
                  <option value="Kerajinan Tangan">Kerajinan Tangan</option>
                  <option value="Jasa & Layanan">Jasa & Layanan</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Camilan">Camilan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Kerajinan">Kerajinan</option>
                  <option value="Jasa">Jasa</option>
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
                <label htmlFor="image" className="font-heading font-medium mb-2 text-slate-400">Ganti Foto Utama (Opsional)</label>
                <input type="file" id="image" name="image" accept="image/*" className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
                <p className="text-sm text-slate-500 mt-1 font-body">Kosongkan jika tidak ingin mengganti foto utama.</p>
              </div>

              <div className="mb-6 flex flex-col text-left">
                <label htmlFor="galleryImages" className="font-heading font-medium mb-2 text-slate-400">Tambah Foto Galeri (Bisa pilih lebih dari satu, Opsional)</label>
                <input type="file" id="galleryImages" name="galleryImages" accept="image/*" multiple className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
                <p className="text-sm text-slate-500 mt-1 font-body">Pilih foto-foto baru untuk ditambahkan ke galeri produk Anda.</p>
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

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-4 rounded-lg font-heading text-lg font-bold cursor-pointer transition-all duration-300 mt-4 hover:bg-white/10"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-br from-primary to-primary-dark text-white p-4 border-none rounded-lg font-heading text-lg font-bold cursor-pointer transition-all duration-300 mt-4 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
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
