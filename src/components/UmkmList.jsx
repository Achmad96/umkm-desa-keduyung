"use client";

import { useState } from "react";
import UmkmCard from "./UmkmCard";

const categories = ["Semua", "Makanan", "Camilan", "Minuman", "Fashion", "Kerajinan", "Jasa"];

export default function UmkmList({ initialUmkms, isAdmin = false }) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const filteredUmkm = activeFilter === "Semua" ? initialUmkms : initialUmkms.filter((item) => item.kategori === activeFilter);

  const totalPages = Math.ceil(filteredUmkm.length / itemsPerPage);
  const paginatedUmkm = filteredUmkm.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 sticky top-4 z-10 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-3 rounded-full font-heading font-medium cursor-pointer whitespace-nowrap transition-all duration-300 backdrop-blur-sm ${
              activeFilter === category ? "bg-primary border border-primary text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => handleFilterChange(category)}>
            {category}
          </button>
        ))}
      </div>

      {paginatedUmkm.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 mb-12">
            {paginatedUmkm.map((umkm) => (
              <UmkmCard
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

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 items-center mt-8 mb-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentPage === page ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"}`}>
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                &gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-16 text-slate-400 bg-white/5 rounded-2xl border border-dashed border-white/10">
          <h3 className="font-heading text-xl text-white mb-2">Tidak ada UMKM yang ditemukan</h3>
          <p className="font-body">Belum ada data UMKM untuk kategori ini.</p>
        </div>
      )}
    </>
  );
}
