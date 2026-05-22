import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Menu, X } from 'lucide-react';
import splashLogo from '../assets/splash-logo.jpeg';

export default function Navbar({
  menuOpen: externalMenuOpen,
  setMenuOpen: externalSetMenuOpen,
}: {
  menuOpen?: boolean;
  setMenuOpen?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
} = {}) {
  const [localMenuOpen, setLocalMenuOpen] = useState(false);
  const menuOpen = externalMenuOpen !== undefined ? externalMenuOpen : localMenuOpen;
  const setMenuOpen = externalSetMenuOpen !== undefined ? externalSetMenuOpen : setLocalMenuOpen;

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#about', label: 'Purpose' },
    { href: '#process', label: 'Process' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#impact', label: 'Impact' },
    { href: '#standards', label: 'Standards' },
    { href: '#inquiries', label: 'Inquiries' },
  ];

  return (
    <>
      <nav className={`absolute top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] max-w-6xl ${menuOpen ? 'z-50' : 'z-30'} flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0c]/40 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] transition-all duration-500 hover:bg-[#0a0a0c]/55 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:scale-[1.01] group/nav`}>
        
        {/* 1. Left aligned - Logo */}
        <div className={`flex-1 flex justify-start items-center gap-2.5 text-white select-none transition-opacity duration-300 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img src={splashLogo} alt="Splash Logo" className="w-7 h-7 rounded-full object-cover border border-white/10" />
          <span className="text-lg sm:text-xl font-light tracking-tight font-serif italic text-white">
            Splash<sup className="text-[8px] font-sans font-normal not-italic tracking-normal ml-0.5 opacity-60 text-[#DEDBC8]/70">TM</sup>
          </span>
        </div>

        {/* 2. Perfectly Centered Desktop Nav links */}
        <div className="hidden lg:flex flex-initial items-center justify-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-2 text-neutral-300 hover:text-white transition-all duration-300 hover:scale-[1.03] relative group/link"
            >
              {link.label}
              {/* Elegant tiny line under link on hover */}
              <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#DEDBC8] transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </div>

        {/* 3. Right aligned - CTA button or Mobile hamburger */}
        <div className="flex-1 flex justify-end items-center">
          <a 
            href="#inquiries"
            className="hidden lg:inline-flex bg-[#DEDBC8]/10 hover:bg-[#DEDBC8] hover:text-black text-[#DEDBC8] text-[10px] font-sans font-bold uppercase tracking-widest px-4.5 py-2 rounded-full border border-[#DEDBC8]/20 hover:border-transparent transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Inquire
          </a>
          
          {/* Mobile Hamburger toggle (stays active and accessible at z-50) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-[#121212]/80 border border-neutral-700/50 text-[#DEDBC8] transition-all duration-300 hover:bg-neutral-800 hover:border-neutral-600 cursor-pointer z-50"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay - Pure jet black to completely obscure everything underneath */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer side panel - Pure jet-black background taking full width for focus */}
      <div
        className={`lg:hidden fixed inset-0 z-45 bg-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full items-center justify-center px-8 py-16">
          <div className="flex flex-col items-center justify-center gap-2 w-full max-w-sm">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-light tracking-wide text-neutral-300 hover:text-[#DEDBC8] hover:scale-105 active:scale-95 py-3 transition-all duration-500 text-center w-full block ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${100 + i * 40}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}

            <div
              className={`w-full mt-8 transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + navLinks.length * 40}ms` : '0ms' }}
            >
              <a
                href="#inquiries"
                onClick={() => setMenuOpen(false)}
                className="block mx-auto max-w-[240px] text-center bg-[#DEDBC8] hover:bg-white text-black text-[11px] font-sans font-bold uppercase tracking-widest py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
              >
                Consult an Engineer
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
