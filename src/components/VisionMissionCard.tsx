import React from 'react';
import { Telescope, Compass, Flag, Target, Mountain, LucideIcon } from 'lucide-react';
import { VisionMissionItem } from '../utils/types';

interface VisionMissionCardProps {
  item: VisionMissionItem;
  index?: number;
  isRevealed?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Telescope,
  Compass,
  Flag,
  Mountain,
  Target,
};

export const VisionMissionCard: React.FC<VisionMissionCardProps> = ({
  item,
  index = 0,
  isRevealed = true,
}) => {
  const IconComponent = iconMap[item.iconName] || Target;

  return (
    <div
      style={{
        transitionDelay: `${index * 140 + 500}ms`,
      }}
      className={`group bg-white rounded-2xl border border-gray-200/90 p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-brand-purple/40 hover:-translate-y-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
        isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Top Icon Badge: Circular purple gradient with white icon */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6320EE] via-[#7C3AED] to-[#9333EA] text-white flex items-center justify-center mb-6 shadow-md shadow-brand-purple/25 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Kicker */}
      <div className="text-xs font-black uppercase tracking-widest text-[#6320EE] mb-2">
        {item.kicker}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-brand-dark leading-snug transition-colors group-hover:text-brand-purple">
        {item.title}
      </h3>

      {/* Purple Accent Bar directly below Title (as in PDF Page 5) */}
      <div className="w-10 h-1 bg-[#6320EE] rounded-full my-3.5 transition-all duration-300 group-hover:w-16" />

      {/* Description */}
      <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed flex-grow">
        {item.description}
      </p>
    </div>
  );
};

export default VisionMissionCard;
