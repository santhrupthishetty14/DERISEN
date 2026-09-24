import React from 'react';

interface PageTransitionProps {
  isActive: boolean;
  targetPage?: string;
}

const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About Us',
  services: 'Services & Packages',
  work: 'Work Gallery & Process',
  contact: 'Contact Us',
};

export const PageTransition: React.FC<PageTransitionProps> = ({ isActive, targetPage = 'home' }) => {
  const pageTitle = PAGE_LABELS[targetPage] || 'DE.RISEN';

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none transition-all duration-500 ease-in-out ${
        isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      {/* Dynamic Top Gradient Loading Sweep */}
      <div
        className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#620d9c] via-[#a855f7] to-[#38bdf8] shadow-[0_0_20px_#620d9c] transition-transform duration-500 ease-out ${
          isActive ? 'scale-x-100 origin-left' : 'scale-x-0 origin-right'
        }`}
      />

      {/* Main Luxury Gradient Curtain Backdrop (matches deep royal purple in reference) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#120429] via-[#2d0752] to-[#430f73] transition-transform duration-500 cubic-bezier(0.77,0,0.175,1) ${
          isActive ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(147,51,234,0.35),transparent_70%)] pointer-events-none" />

        {/* Center Minimalist Transition Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="relative flex items-center justify-center mb-5">
            {/* Pulsing ring */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#620d9c] to-[#c084fc] opacity-30 animate-ping absolute" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#620d9c] via-[#9333ea] to-[#c084fc] shadow-[0_0_30px_rgba(147,51,234,0.7)] flex items-center justify-center text-white font-black text-xs tracking-wider">
              DR
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] font-mono font-bold text-brand-lilac/80 mb-1">
            NAVIGATING
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {pageTitle}
          </h3>

          {/* Micro animated gradient line */}
          <div className="mt-4 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};
