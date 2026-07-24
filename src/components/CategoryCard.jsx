'use client';

export default function CategoryCard({ 
  icon, 
  title, 
  description, 
  onRegister 
}) {
  return (
    <div className="relative bg-gradient-to-br from-accent to-accent-dark rounded-2xl overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(197,48,48,0.3)]">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center text-center z-10 h-full">
        <div className="flex items-center justify-center w-16 h-16 mb-6 text-white">
          {icon ? icon : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          )}
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-white m-0 mb-3">{title}</h3>
        <p className="font-body text-[0.9375rem] text-white/85 m-0 mb-8 leading-relaxed grow">{description}</p>
        
        <button 
          className="w-full py-3.5 px-6 rounded-lg bg-white text-accent-dark font-body font-bold text-base border-none cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-slate-50 active:scale-95" 
          onClick={onRegister}
        >
          DAFTAR
        </button>
      </div>
    </div>
  );
}
