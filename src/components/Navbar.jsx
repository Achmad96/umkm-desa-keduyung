"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImage from "../../public/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profil Desa", path: "/profil-desa" },
    { name: "UMKM", path: "/umkm" },
    { name: "Pendaftaran", path: "/pendaftaran" }
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-[1000] h-[72px] w-full transition-all duration-300 ${scrolled ? "bg-background-dark/80 backdrop-blur-lg border-b border-border shadow-md" : "bg-transparent"}`}>
      <div className="container h-full flex items-center justify-between mx-auto px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 z-[1001]" onClick={closeMobileMenu}>
          <Image src={logoImage} alt="Desa Keduyung Logo" width={40} height={40} className="object-contain rounded-sm" style={{ width: 'auto', height: 'auto' }} />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-wider text-text-primary leading-tight">DESA KEDUYUNG</span>
            <span className="text-xs text-gold uppercase tracking-widest font-medium">Kumpulan UMKM</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link key={link.path} href={link.path} className={`font-heading font-semibold tracking-wider relative transition-colors duration-150 py-1 group hover:text-gold ${isActive ? "text-gold-light" : "text-text-primary"}`}>
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <button className="block md:hidden bg-transparent border-none cursor-pointer z-[1001] p-2 w-12 h-12 relative" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <div className="relative w-6 h-[2px] left-1">
            <span className={`block w-6 h-[2px] bg-text-primary absolute transition-all duration-300 ${mobileMenuOpen ? "rotate-45 top-0" : "-top-2"}`}></span>
            <span className={`block w-6 h-[2px] bg-text-primary absolute transition-all duration-300 top-0 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-6 h-[2px] bg-text-primary absolute transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 top-0" : "top-2"}`}></span>
          </div>
        </button>

        <nav className={`fixed inset-0 w-full h-screen bg-background-dark/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 z-[1000] transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-heading text-3xl font-bold transition-all duration-300 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} ${isActive ? "text-gold-light" : "text-text-primary"}`}
                style={{ transitionDelay: mobileMenuOpen ? `${(index + 1) * 100}ms` : "0ms" }}
                onClick={closeMobileMenu}>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
