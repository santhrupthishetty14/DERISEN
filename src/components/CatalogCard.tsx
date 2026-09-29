import React from 'react';
import { ServiceCategory } from '../utils/types';
import { Sparkles, Check } from 'lucide-react';

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
      className={`relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group will-change-transform h-full ${
        isDark
          ? 'bg-gradient-to-b from-[#6320EE] to-[#45056E] text-white shadow-2xl shadow-[#6320EE]/60 -translate-y-3 scale-[1.02] border-2 border-purple-300/40 z-10'
          : 'bg-white text-slate-900 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2'
      }`}
    >
      {/* Light sheen sweep animation on hover */}
      <div className="absolute inset-0 rounded-[28px] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent pointer-events-none overflow-hidden" />

      <div>
        {/* Top Header: Inverted Circle Icon Badge & Number */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              isDark
                ? 'bg-white text-[#6320EE] shadow-md shadow-white/20 group-hover:scale-110'
                : 'bg-gradient-to-r from-[#6320EE] to-[#7C3AED] text-white shadow-md shadow-[#6320EE]/25 group-hover:scale-110'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#6320EE]' : 'text-white'}`} />
          </div>
          <span
            className={`text-xs font-mono font-bold tracking-wider transition-colors duration-300 ${
              isDark ? 'text-white/60' : 'text-slate-300'
            }`}
          >
            {category.number}
          </span>
        </div>

        {/* Category Title */}
        <h4
          className={`text-xl sm:text-[22px] font-black tracking-tight mb-4 pb-3 border-b transition-colors duration-300 ${
            isDark
              ? 'text-white border-white/20'
              : 'text-slate-900 border-slate-100 group-hover:text-[#6320EE]'
          }`}
        >
          {category.title}
        </h4>

        {/* Services List with Checkmark Bullets */}
        <ul className="space-y-2.5 mb-6">
          {category.items.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2.5 text-xs font-medium leading-snug transition-colors duration-300 ${
                isDark ? 'text-white/95' : 'text-slate-800'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 ${
                  isDark
                    ? 'bg-white text-[#6320EE] shadow-sm'
                    : 'bg-[#6320EE] text-white shadow-sm'
                }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive Bottom Hint */}
      <div
        className={`pt-3.5 mt-auto border-t text-[11px] font-semibold flex items-center justify-between transition-colors duration-300 ${
          isDark
            ? 'border-white/20 text-purple-200'
            : 'border-slate-100 text-[#6320EE]'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span>{isDark ? 'Active Service' : 'Modular Deliverable'}</span>
        </span>
        <span
          className={`text-xs font-bold transition-colors duration-300 ${
            isDark ? 'text-white font-extrabold' : 'text-[#6320EE] group-hover:text-[#5214db]'
          }`}
        >
          {isDark ? 'Selected' : 'Tap to select'}
        </span>
      </div>
    </div>
  );
};

export default CatalogCard;
