import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  isAnimated?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  onClick,
}) => {
  const isDark = variant === 'dark';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    // Dispatch event to trigger the 3D logo animation
    window.dispatchEvent(new CustomEvent('play-logo-intro'));
    if (onClick) onClick();
  };

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={`group relative inline-flex items-center select-none no-underline cursor-pointer ${className}`}
      aria-label="DE.RISEN — Click to play 3D Logo Animation"
      title="Click to play 3D Logo Animation"
    >
      {/* Container with smooth entrance */}
      <div className="inline-flex items-center transition-all duration-300">
        {/* Exact Official DE.RISEN Logo Image */}
        <div className="relative flex items-center">
          <img
            id="main-nav-logo"
            src="/derisen-icon.png?v=3"
            alt="DE.RISEN"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105 active:scale-95 drop-shadow-[0_0_14px_rgba(176,99,255,0.45)]"
            style={{ imageRendering: 'auto' }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </a>
  );
};

export default Logo;
