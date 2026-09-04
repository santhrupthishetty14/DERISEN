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
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const isDark = variant === 'dark';

  return (
    <a
      href="#home"
      className={`group relative inline-flex items-center select-none no-underline ${className}`}
      aria-label="De.risen — Creative Design, Branding & IT Solutions"
    >
      {/* Container with smooth entrance */}
      <div
        className={`inline-flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAnimated && !hasLoaded
            ? 'opacity-0 scale-95 -translate-y-0.5'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Exact Official De.risen Logo Image */}
        <div className="relative flex items-center">
          <img
            id="main-nav-logo"
            src={isDark ? '/assets/derisen-logo-transparent.png' : '/assets/derisen-logo-white.png'}
            alt="De.risen"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105"
            style={{ opacity: 0, transition: 'opacity 0.2s' }}
            loading="eager"
          />
        </div>
      </div>
    </a>
  );
};

export default Logo;
