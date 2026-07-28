'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GalleryLightbox({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.key === 'ArrowRight' && isOpen) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
      if (e.key === 'ArrowLeft' && isOpen) {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    // Prevent scrolling on the body when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div 
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/10 bg-white/5 shadow-lg"
          >
            <Image 
              src={src} 
              alt={`Galeri ${index + 1}`} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300"
          onClick={closeLightbox}
        >
          <div className="absolute top-6 right-6 z-50">
            <button 
              onClick={closeLightbox}
              className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 cursor-pointer border-none"
              aria-label="Tutup"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={images[currentIndex]} 
              alt={`Galeri ${currentIndex + 1} diperbesar`} 
              fill 
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 hover:scale-110 rounded-full p-3 backdrop-blur-md cursor-pointer border-none z-50"
                aria-label="Sebelumnya"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 hover:scale-110 rounded-full p-3 backdrop-blur-md cursor-pointer border-none z-50"
                aria-label="Selanjutnya"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-body bg-black/50 px-4 py-2 rounded-full backdrop-blur-md z-50 tracking-wide font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
