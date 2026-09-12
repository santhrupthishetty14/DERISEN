import React, { useState } from 'react';
import { ServiceCategory } from '../utils/types';
import { Check, Sparkles } from 'lucide-react';

interface CatalogCardProps {
  category: ServiceCategory;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({
  category,
  isActive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  const [isSelfTouched, setIsSelfTouched] = useState(false);

  const isDark = isActive || isSelfHovered || isSelfTouched;

  const handleTouch = () => {
    setIsSelfTouched((prev) => !prev);
    onClick?.();
  };

  return (
    <div
      onClick={handleTouch}
      onTouchStart={() => {
        setIsSelfTouched(true);
        onClick?.();
      }}
      onMouseEnter={() => {
        setIsSelfHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsSelfHovered(false);
        onMouseLeave?.();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTouch();
        }
      }}
      className={`rounded-2xl p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between cursor-pointer select-none h-full relative overflow-hidden group will-change-transform ${
        isDark
          ? 'bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] text-white shadow-2xl shadow-brand-dark/40 border-2 border-brand-purple/90 -translate-y-2.5 translate-x-0.5 -rotate-[0.5deg] scale-[1.015]'
          : 'bg-white text-gray-900 border border-gray-200/90 shadow-sm hover:border-brand-purple/60 hover:shadow-xl hover:-translate-y-1.5 hover:translate-x-0.5 hover:-rotate-[0.3deg]'
      }`}
    >
      {/* Ambient background glow when dark */}
      {isDark && (
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-brand-purple/30 rounded-full blur-3xl pointer-events-none transition-opacity duration-700" />
      )}

      {/* Skidding Gloss / Light sheen sweep on hover & touch */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Top Active Indicator Badge */}
      {isDark && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/40 border border-brand-cyan/50 text-brand-cyan text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.25)] animate-in fade-in duration-300">
          <Check className="w-3.5 h-3.5" />
          <span>Active</span>
        </div>
      )}

      <div>
        {/* Number Badge */}
        <div
          className={`text-sm font-black mb-1.5 transition-colors duration-300 ${
            isDark ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]' : 'text-brand-purple'
          }`}
        >
          {category.number}
        </div>

        {/* Category Title */}
        <h4
          className={`text-xl sm:text-[22px] font-black tracking-tight mb-5 pb-3 border-b transition-colors duration-300 ${
            isDark
              ? 'text-white border-white/15'
              : 'text-brand-dark border-gray-100 group-hover:text-brand-purple'
          }`}
        >
          {category.title}
        </h4>

        {/* Services List */}
        <ul className="space-y-2.5 mb-6">
          {category.items.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-2.5 text-xs sm:text-[12.5px] font-medium transition-colors duration-300 ${
                isDark ? 'text-white/85' : 'text-gray-600'
              }`}
            >
              <span
                className={`font-bold text-sm transition-colors duration-300 ${
                  isDark ? 'text-brand-cyan' : 'text-brand-purple'
                }`}
              >
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive Bottom Hint */}
      <div
        className={`pt-3 mt-auto border-t text-[11px] font-semibold flex items-center justify-between transition-colors duration-300 ${
          isDark
            ? 'border-white/10 text-brand-violetLight'
            : 'border-gray-100 text-gray-400 group-hover:text-brand-purple'
        }`}
      >
        <span className="flex items-center gap-1.5">
          {isDark && <Sparkles className="w-3 h-3 text-brand-cyan" />}
          <span>{isDark ? 'Active Service Module' : 'Touch or hover for details'}</span>
        </span>
        <span
          className={`text-xs font-bold transition-colors duration-300 ${
            isDark ? 'text-brand-cyan' : 'text-gray-300 group-hover:text-brand-purple'
          }`}
        >
          {isDark ? '● Dark Mode Active' : '○ Tap to activate'}
        </span>
      </div>
    </div>
  );
};

export default CatalogCard;
