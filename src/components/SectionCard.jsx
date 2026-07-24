import Image from 'next/image';
import Link from 'next/link';

export default function SectionCard({ 
  imageSrc, 
  imageAlt, 
  title, 
  description, 
  reversed = false, 
  accentColor = 'var(--color-red, #c53030)',
  linkHref,
  linkText
}) {
  return (
    <div 
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} bg-primary-dark/30 backdrop-blur-md border border-white/5 rounded-[1.25rem] overflow-hidden mb-12 transition-all duration-400 group hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-white/10 animate-[slideUp_0.8s_ease-out_forwards]`}
    >
      <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-[350px] overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={imageAlt || title} 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${reversed ? 'md:bg-gradient-to-l' : 'md:bg-gradient-to-r'} from-background-dark/90 md:from-background-dark/80 to-transparent`}></div>
      </div>
      
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="font-heading text-3xl font-bold text-white m-0 mb-4">{title}</h2>
        <div className="w-[60px] h-1 rounded-sm mb-6" style={{ background: accentColor }}></div>
        <p className="font-body text-slate-300 leading-relaxed m-0 mb-8 text-[1.0625rem]">{description}</p>
        
        {linkHref && linkText && (
          <Link href={linkHref} className="inline-flex items-center gap-2 text-gold font-body font-semibold self-start transition-colors duration-200 hover:text-white group/link">
            {linkText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-200 group-hover/link:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
