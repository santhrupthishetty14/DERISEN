import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  isAnimated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const isDark = variant === 'dark';

  return (
    <a
      href="#home"
      className={`group relative inline-flex items-center select-none no-underline ${className}`}
      aria-label="De.risen — Creative Design, Branding & IT Solutions"
    >
      {/* Container with smooth entrance */}
      <div className="inline-flex items-center transition-all duration-300">
        {/* Exact Official De.risen Logo Image */}
        <div className="relative flex items-center">
          <img
            id="main-nav-logo"
            src={isDark ? '/assets/derisen-logo-transparent.png' : '/assets/derisen-logo-white.png'}
            alt="De.risen"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105"
            loading="eager"
          />
        </div>
      </div>
    </a>
  );
};

export default Logo;
