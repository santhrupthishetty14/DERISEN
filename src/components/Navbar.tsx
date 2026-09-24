import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { X } from 'lucide-react';
import { SlideArrowButton } from './SlideArrowButton';

interface NavbarProps {
  onOpenModal: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItemData {
  label: string;
  href: string;
  id: string;
}

const DESKTOP_NAV_ITEMS: NavItemData[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Services & Packages', href: '#services', id: 'services' },
  { label: 'Work Gallery & Testimonials', href: '#work', id: 'work' },
  { label: 'Contact Us', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky header background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleItemClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================================
          Sticky Translucent Header
          ===================================================================== */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'h-[70px] bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(24,13,56,0.06)] border-b border-gray-200/50'
            : 'h-[90px] bg-white/60 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 h-full flex items-center justify-between">
          {/* 1. DE.RISEN Animated Logo */}
          <div
            onClick={(e) => {
              handleItemClick(e, 'home');
              if (currentPage === 'home') {
                window.dispatchEvent(new CustomEvent('play-logo-intro'));
              }
            }}
            title="DE.RISEN - Click to view logo intro"
            className="cursor-pointer group"
          >
            <Logo isAnimated={true} />
          </div>

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={`relative text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 py-2 group cursor-pointer ${
                    isActive
                      ? 'text-brand-purple font-bold'
                      : 'text-gray-600 hover:text-brand-purple'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Active Indicator Underline */}
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

          {/* 3. Right-side Premium CTA Button (Arrow starts on left, slides to right when pressed) */}
          <div className="hidden lg:flex items-center">
            <SlideArrowButton
              label="Let's Talk"
              onClick={onOpenModal}
              variant="purple"
              size="sm"
            />
          </div>

          {/* 4. Premium Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden relative p-2.5 rounded-full text-brand-dark hover:text-brand-purple hover:bg-brand-lilacSoft transition-colors focus:outline-none cursor-pointer"
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
        <div className="absolute inset-0 bg-[#0B041A]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Fullscreen Drawer */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/10">
            <div
              onClick={(e) => handleItemClick(e, 'home')}
              className="cursor-pointer"
            >
              <Logo variant="light" isAnimated={false} />
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-purple text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Navigation Items List */}
          <nav className="relative z-10 my-auto flex flex-col gap-5 sm:gap-6 py-6">
            {DESKTOP_NAV_ITEMS.map((item, index) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item.id)}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 60 + 100}ms` : '0ms',
                  }}
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-500 transform cursor-pointer ${
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
                      <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_#620d9c]" />
                    )}
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Mobile Bottom Section: CTA */}
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
            <SlideArrowButton
              label="Let's Talk"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              variant="purple"
              size="lg"
              className="w-full"
            />

            <p className="text-center text-xs text-white/50 mt-4 tracking-wide font-medium">
              We Don't Just Build Brands. We Make Them Rise.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
