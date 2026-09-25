import React from 'react';
import { ServiceCategory } from '../utils/types';
import { Sparkles } from 'lucide-react';

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
}) => {
  // Dark theme is applied ONLY when explicitly active (touched/clicked by user)
  const isDark = isActive;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`rounded-[26px] p-7 sm:p-8 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between cursor-pointer select-none h-full relative overflow-hidden group will-change-transform ${
        isDark
          ? 'bg-gradient-to-br from-[#4B006E] via-[#620D9C] to-[#8E24AA] text-white shadow-2xl shadow-[#620d9c]/50 border-2 border-purple-300/40 -translate-y-2'
          : 'bg-white text-slate-900 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-1.5'
      }`}
    >
      {/* Ambient background glow when active */}
      {isDark && (
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none transition-opacity duration-700" />
      )}

      {/* Skidding Gloss / Light sheen sweep on hover & touch */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent pointer-events-none" />

      <div>
        {/* Top Header: Inverted Circle Icon Badge & Number */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              isDark
                ? 'bg-white/20 text-white backdrop-blur-sm group-hover:scale-110'
                : 'bg-gradient-to-r from-[#4B006E] to-[#620D9C] text-white shadow-md shadow-[#620d9c]/25 group-hover:scale-110'
            }`}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className={`text-xs font-mono font-bold tracking-wider transition-colors duration-300 ${
              isDark ? 'text-white/80' : 'text-slate-300'
            }`}
          >
            {category.number}
          </span>
        </div>

        {/* Category Title */}
        <h4
          className={`text-xl sm:text-[22px] font-black tracking-tight mb-4 pb-3 border-b transition-colors duration-300 ${
            isDark
              ? 'text-white border-white/15'
              : 'text-slate-900 border-slate-100 group-hover:text-[#620D9C]'
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
                isDark ? 'text-white/90' : 'text-slate-700'
              }`}
            >
              <span
                className={`font-bold text-sm transition-colors duration-300 ${
                  isDark ? 'text-purple-200' : 'text-[#620D9C]'
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
            ? 'border-white/15 text-purple-200'
            : 'border-slate-100 text-[#620D9C]'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span>{isDark ? 'Service Module' : 'Explore Deliverables'}</span>
        </span>
        <span
          className={`text-xs font-bold transition-colors duration-300 ${
            isDark ? 'text-white font-extrabold' : 'text-[#620D9C] group-hover:text-[#4B006E]'
          }`}
        >
          {isDark ? 'Selected' : 'Tap to select'}
        </span>
      </div>
    </div>
  );
};

export default CatalogCard;
