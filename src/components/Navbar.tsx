import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ArrowRight, X } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

interface NavItemData {
  label: string;
  href: string;
  id: string;
}

const DESKTOP_NAV_ITEMS: NavItemData[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Services & Packages', href: '#services-packages', id: 'services-packages' },
  { label: 'Work Gallery & Testimonial', href: '#work-gallery', id: 'work-gallery' },
  { label: 'Contact Us', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky size change & active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Navbar size change threshold
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active Section Tracking
      const scrollPosition = window.scrollY + 140;
      const sectionIds = ['home', 'about', 'services-packages', 'work-gallery', 'contact'];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* =====================================================================
          Sticky Translucent Header
          ===================================================================== */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'h-[70px] bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(24,13,56,0.06)] border-b border-gray-200/50'
            : 'h-[90px] bg-white/50 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 h-full flex items-center justify-between">
          {/* 1. DE.RISEN Animated Logo */}
          <Logo isAnimated={true} />

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 py-2 group ${
                    isActive
                      ? 'text-brand-purple font-bold'
                      : 'text-gray-600 hover:text-brand-purple'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Client's Purple Underline for Active Item */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'w-full bg-gradient-to-r from-brand-purple via-brand-violet to-brand-violetLight opacity-100 shadow-[0_2px_8px_rgba(99,32,238,0.4)]'
                        : 'w-0 bg-brand-purple/60 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* 3. Right-side Premium CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 py-2.5 pl-6 pr-3 bg-brand-card hover:bg-brand-navy text-white text-[14.5px] font-bold rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(24,13,56,0.18)] hover:shadow-[0_8px_25px_rgba(99,32,238,0.35)] hover:-translate-y-0.5 border border-white/10 active:translate-y-0"
              aria-label="Open Let's Talk modal"
            >
              <span className="tracking-[-0.01em]">Let's Talk</span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-purple text-white shadow-inner transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-brand-violet">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* 4. Premium Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden relative p-2.5 rounded-full text-brand-dark hover:text-brand-purple hover:bg-brand-lilacSoft transition-colors focus:outline-none"
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className="w-6 h-0.5 bg-brand-dark rounded-full transition-all duration-300" />
              <span className="w-4 h-0.5 bg-brand-purple rounded-full transition-all duration-300 group-hover:w-6" />
              <span className="w-5 h-0.5 bg-brand-dark rounded-full transition-all duration-300" />
            </div>
          </button>
        </div>
      </header>

      {/* =====================================================================
          Mobile Fullscreen Navigation Panel
          ===================================================================== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Fullscreen Backdrop / Glassmorphism Background */}
        <div className="absolute inset-0 bg-[#0B041A]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10">
          {/* Ambient Purple Radial Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Fullscreen Drawer */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/10">
            <Logo variant="light" isAnimated={false} />

            {/* Animated Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-purple text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Navigation Items List */}
          <nav className="relative z-10 my-auto flex flex-col gap-5 sm:gap-6 py-6">
            {DESKTOP_NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 60 + 100}ms` : '0ms',
                  }}
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-500 transform ${
                    mobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  } ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-lilac to-brand-violetLight'
                      : 'text-white/70 hover:text-white hover:translate-x-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-brand-violetLight opacity-60">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_#6320EE]" />
                    )}
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Mobile Bottom Section: CTA & Brand Philosophy */}
          <div
            style={{
              transitionDelay: mobileMenuOpen ? '450ms' : '0ms',
            }}
            className={`relative z-10 pt-6 border-t border-white/10 transition-all duration-500 transform ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full inline-flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-brand-purple to-brand-violet text-white text-base font-extrabold rounded-full shadow-[0_6px_25px_rgba(99,32,238,0.45)] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-white/50 mt-4 tracking-wide font-medium">
              We Don't Just Build Brands. We Make Them Rise.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
