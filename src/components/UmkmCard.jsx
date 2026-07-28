"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteUMKM } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function UMKMCard({ id, slug, imageSrc, name, description, category, whatsappLink, phoneNumber, shopeeLink, tiktokLink, mapsLink, isAdmin }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    startTransition(async () => {
      const result = await deleteUMKM(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error);
        setIsDeleting(false);
      }
      setShowConfirm(false);
    });
  };

  return (
    <div
      className={`flex flex-col bg-primary-dark/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5),0_10px_10px_-5px_rgba(0,0,0,0.3)] relative ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Delete confirmation overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-2xl">
          <div className="bg-red-500/20 p-3 rounded-full mb-3">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h4 className="font-heading text-lg text-white mb-2">Hapus UMKM?</h4>
          <p className="text-slate-300 text-sm font-body mb-4">
            Anda yakin ingin menghapus <strong className="text-white">{name}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white font-heading font-medium text-sm cursor-pointer hover:bg-white/20 transition-all">
              Batal
            </button>
            <button onClick={confirmDelete} disabled={isPending} className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-heading font-medium text-sm cursor-pointer hover:bg-red-600 transition-all disabled:opacity-70">
              {isPending ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </div>
      )}

      {/* Admin action buttons */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Link href={`/umkm/edit/${id}`} className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/90 text-white hover:bg-gold hover:scale-110 transition-all duration-200 shadow-lg no-underline" aria-label={`Edit ${name}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </Link>
          <button onClick={handleDelete} className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/90 text-white hover:bg-red-500 hover:scale-110 transition-all duration-200 shadow-lg border-none cursor-pointer" aria-label={`Hapus ${name}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      )}

      <Link href={`/umkm/${slug}`} className="relative w-full aspect-[4/3] overflow-hidden block">
        <Image src={imageSrc || "/images/village-landscape.png"} alt={name || "UMKM Image"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        <div className="absolute top-4 right-4 bg-accent text-white font-body text-xs font-semibold px-3 py-1 rounded-full shadow-md">{category}</div>
      </Link>

      <div className="p-6 flex flex-col grow">
        <Link href={`/umkm/${slug}`} className="no-underline">
          <h3 className="font-heading text-xl font-bold text-white m-0 mb-2 hover:text-gold transition-colors">{name}</h3>
        </Link>
        <p className="font-body text-sm text-slate-400 m-0 mb-6 leading-relaxed line-clamp-3 grow">{description}</p>

        <div className="flex gap-3 justify-end mt-auto">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-200 no-underline bg-[#25D366] hover:scale-110 hover:shadow-[0_4px_12px_rgba(37,211,102,0.4)]"
              aria-label={`WhatsApp ${name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          )}

          {phoneNumber && (
            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-200 no-underline bg-primary-light hover:scale-110 hover:shadow-[0_4px_12px_rgba(42,74,127,0.4)]" aria-label={`Telepon ${name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          )}
          {shopeeLink && (
            <a href={shopeeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-200 no-underline bg-[#EE4D2D] hover:scale-110 hover:shadow-[0_4px_12px_rgba(238,77,45,0.4)]" aria-label={`Shopee ${name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </a>
          )}

          {tiktokLink && (
            <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-200 no-underline bg-[#010101] hover:scale-110 hover:shadow-[0_4px_12px_rgba(1,1,1,0.4)]" aria-label={`TikTok ${name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          )}

          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-200 no-underline bg-[#EA4335] hover:scale-110 hover:shadow-[0_4px_12px_rgba(234,67,53,0.4)]"
              aria-label={`Google Maps ${name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
