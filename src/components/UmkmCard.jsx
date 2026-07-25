import Image from "next/image";
import Link from "next/link";

export default function UmkmCard({ id, slug, imageSrc, name, description, category, whatsappLink, phoneNumber, shopeeLink, tiktokLink, mapsLink }) {
  return (
    <div className="flex flex-col bg-primary-dark/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5),0_10px_10px_-5px_rgba(0,0,0,0.3)]">
      <Link href={`/umkm/${slug}`} className="relative w-full aspect-[4/3] overflow-hidden block">
        <Image 
          src={imageSrc || '/images/village-landscape.png'} 
          alt={name || 'UMKM Image'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
