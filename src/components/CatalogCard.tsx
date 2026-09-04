import React, { useState } from 'react';
import { ServiceCategory } from '../utils/types';

interface CatalogCardProps {
  category: ServiceCategory;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({
  category,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  const isDark = isActive || isSelfHovered;

  return (
    <div
      onMouseEnter={() => {
        setIsSelfHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsSelfHovered(false);
        onMouseLeave?.();
      }}
      className={`rounded-2xl p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col cursor-pointer ${
        isDark
          ? 'bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] text-white shadow-2xl shadow-brand-dark/35 border border-white/20 -translate-y-3 scale-[1.02]'
          : 'bg-white text-gray-900 border border-gray-200/90 shadow-sm hover:border-brand-purple/40 translate-y-0 scale-100'
      }`}
    >
      {/* Number Badge */}
      <div
        className={`text-sm font-black mb-1.5 transition-colors duration-300 ${
          isDark ? 'text-brand-cyan' : 'text-brand-purple'
        }`}
      >
        {category.number}
      </div>

      {/* Category Title */}
      <h4
        className={`text-xl sm:text-[22px] font-black tracking-tight mb-5 pb-3 border-b transition-colors duration-300 ${
          isDark
            ? 'text-white border-white/15'
            : 'text-brand-dark border-gray-100'
        }`}
      >
        {category.title}
      </h4>

      {/* Services List */}
      <ul className="space-y-2.5 flex-grow">
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
  );
};
