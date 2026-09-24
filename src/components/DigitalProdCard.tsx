import React from 'react';
import { DigitalProductionService } from '../utils/types';
import { Sparkles } from 'lucide-react';

interface DigitalProdCardProps {
  service: DigitalProductionService;
  isSelected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const DigitalProdCard: React.FC<DigitalProdCardProps> = ({
  service,
  isSelected = false,
  onClick,
}) => {
  // Dark theme is applied ONLY when explicitly active (touched/clicked by user)
  const isDark = isSelected;

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
      className={`rounded-2xl p-7 sm:p-8 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between cursor-pointer select-none h-full relative overflow-hidden group will-change-transform ${
        isDark
          ? 'bg-[#620d9c] text-white shadow-2xl shadow-[#620d9c]/40 border border-purple-300/20 -translate-y-1.5'
          : 'bg-white text-gray-900 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#620d9c]/40 hover:-translate-y-1'
      }`}
    >
      {/* Ambient background glow when active */}
      {isDark && (
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none transition-opacity duration-700" />
      )}

      {/* Skidding Gloss / Light sheen sweep on hover & touch */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div>
        {/* Top Header with Inverted Circle Icon and Number */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              isDark
                ? 'bg-white/20 text-white backdrop-blur-sm group-hover:scale-110'
                : 'bg-[#620d9c] text-white shadow-md shadow-[#620d9c]/25 group-hover:scale-110'
            }`}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className={`text-xs font-mono font-bold tracking-wider transition-colors duration-300 ${
              isDark ? 'text-white/80' : 'text-gray-300'
            }`}
          >
            {service.number}
          </span>
        </div>

        <h4
          className={`text-xl sm:text-[22px] font-black tracking-tight mb-4 pb-3 border-b transition-colors duration-300 ${
            isDark ? 'text-white border-white/15' : 'text-brand-dark border-gray-100 group-hover:text-[#620d9c]'
          }`}
        >
          {service.title}
        </h4>

        {/* Services List Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4">
          {service.items.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-2.5 text-xs sm:text-[13px] font-medium transition-colors duration-300 ${
                isDark ? 'text-white/90' : 'text-gray-600'
              }`}
            >
              <span
                className={`font-bold text-sm transition-colors duration-300 ${
                  isDark ? 'text-purple-200' : 'text-[#620d9c]'
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
        className={`pt-3 mt-4 border-t text-[11px] font-semibold flex items-center justify-between transition-colors duration-300 ${
          isDark
            ? 'border-white/15 text-purple-200'
            : 'border-gray-100 text-gray-400 group-hover:text-[#620d9c]'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span>{isDark ? 'Production Vertical' : 'Explore Capabilities'}</span>
        </span>
        <span
          className={`text-xs font-bold transition-colors duration-300 ${
            isDark ? 'text-white font-extrabold' : 'text-gray-400 group-hover:text-[#620d9c]'
          }`}
        >
          {isDark ? 'Selected' : 'Tap to select'}
        </span>
      </div>
    </div>
  );
};

export default DigitalProdCard;
