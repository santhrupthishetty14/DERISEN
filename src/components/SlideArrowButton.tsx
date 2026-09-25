import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface SlideArrowButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'purple' | 'navy';
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const SlideArrowButton: React.FC<SlideArrowButtonProps> = ({
  label,
  onClick,
  variant = 'purple',
  className = '',
  ariaLabel,
  size = 'md',
  type = 'button',
  disabled = false,
}) => {
  const [isSliding, setIsSliding] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    if (isSliding) return;
    setIsSliding(true);

    // Smooth sliding animation across to the right side while opening
    setTimeout(() => {
      if (onClick) onClick();
      setTimeout(() => setIsSliding(false), 500);
    }, 320);
  };

  const bgStyle =
    variant === 'purple'
      ? 'bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] hover:brightness-110 shadow-[0_6px_22px_rgba(98,13,156,0.38)] hover:shadow-[0_10px_30px_rgba(176,99,255,0.45)]'
      : 'bg-[#13063e] hover:bg-[#1f0a5c] shadow-[0_10px_26px_rgba(19,6,62,0.28)] hover:shadow-[0_14px_34px_rgba(81,6,158,0.42)]';

  const sizeStyle =
    size === 'sm'
      ? 'py-2 text-[13.5px]'
      : size === 'lg'
      ? 'py-3.5 sm:py-4 text-[14.5px] sm:text-[16px]'
      : 'py-2.5 sm:py-3 text-[14px] sm:text-[15px]';

  const circleDimensions =
    size === 'sm'
      ? 'w-6 h-6'
      : size === 'lg'
      ? 'w-8 h-8 sm:w-9 sm:h-9'
      : 'w-7 h-7 sm:w-8 sm:h-8';

  const arrowDimensions =
    size === 'sm'
      ? 'w-3 h-3 stroke-[2.5]'
      : size === 'lg'
      ? 'w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]'
      : 'w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel || label}
      className={`group relative inline-flex items-center justify-center font-bold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden select-none ${bgStyle} ${sizeStyle} ${className}`}
    >
      {/* Subtle shine light sweep across button on hover */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

      {/* 
        Arrow Badge:
        - Starts on LEFT side (left-2 / left-2.5)
        - When someone presses / opens, slides across to the RIGHT side (left-[calc(100%-2.5rem)])
      */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${circleDimensions} ${
          isSliding
            ? 'left-[calc(100%-2.25rem)] sm:left-[calc(100%-2.5rem)] bg-white text-brand-purple scale-105 shadow-[0_0_15px_rgba(255,255,255,0.8)]'
            : 'left-2 sm:left-2.5 bg-white text-brand-purple shadow-sm group-hover:translate-x-1.5'
        }`}
      >
        <ArrowRight className={`${arrowDimensions} transition-transform duration-300 group-hover:translate-x-0.5`} />
      </span>

      {/* Button Text Label: Shifts smoothly to accommodate sliding arrow */}
      <span
        className={`tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
          isSliding
            ? 'pl-5 pr-11 sm:pl-6 sm:pr-12'
            : 'pl-11 pr-5 sm:pl-12 sm:pr-6 group-hover:-translate-x-0.5'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

