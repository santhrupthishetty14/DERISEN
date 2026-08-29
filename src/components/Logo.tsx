import React, { useEffect, useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  isAnimated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  isAnimated = true,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Trigger logo reveal animation on mount
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isDark = variant === 'dark';

  return (
    <a
      href="#home"
      className={`group relative inline-flex items-center gap-1 select-none no-underline ${className}`}
      aria-label="DE.RISEN Home"
    >
      {/* Container with entrance scale & fade */}
      <div
        className={`inline-flex items-center transition-all duration-700 ease-out ${
          isAnimated && !hasLoaded
            ? 'opacity-0 scale-[0.92]'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Vector Mark + Typography */}
        <div className="relative flex items-center overflow-hidden py-1 px-1">
          {/* Logo Mark Text with Clip Wipe Animation */}
          <div
            className={`flex items-center font-extrabold tracking-tight transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isAnimated && !hasLoaded
                ? 'clip-path-reveal-left opacity-0'
                : 'clip-path-reveal-full opacity-100'
            }`}
          >
            {/* "De" */}
            <span
              className={`text-2xl sm:text-[26px] font-black tracking-[-0.03em] ${
                isDark ? 'text-brand-dark' : 'text-white'
              }`}
            >
              De
            </span>

            {/* Accent Separator Dot */}
            <span className="relative flex items-center justify-center mx-0.5">
              <span className="w-2 h-2 sm:w-[8.5px] sm:h-[8.5px] rounded-full bg-brand-purple shadow-[0_0_12px_rgba(99,32,238,0.75)] animate-pulse" />
            </span>

            {/* "risen" */}
            <span
              className={`text-2xl sm:text-[26px] font-extrabold tracking-[-0.02em] ${
                isDark ? 'text-brand-purple' : 'text-brand-violetLight'
              }`}
            >
              risen
            </span>
          </div>

          {/* Ambient Glow Settle */}
          <div
            className={`absolute inset-0 bg-brand-purple/20 blur-xl rounded-full pointer-events-none transition-opacity duration-1000 ${
              hasLoaded ? 'opacity-40 group-hover:opacity-80' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </a>
  );
};
