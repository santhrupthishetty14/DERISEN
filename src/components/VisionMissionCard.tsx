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
      style={{ transitionDelay: `${index * 140 + 500}ms` }}
      className={`group bg-white rounded-3xl border border-slate-100 p-8 sm:p-9 shadow-xl
        hover:shadow-[0_20px_50px_rgba(98,13,156,0.15)] hover:border-purple-200
        hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {/* Icon Badge */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#620D9C] via-[#7c1cc0] to-[#B063FF]
        text-white flex items-center justify-center mb-6 shadow-md shadow-[#620D9C]/30
        transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Kicker */}
      <div className="text-xs font-black uppercase tracking-widest text-[#620D9C] mb-2">
        {item.kicker}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 leading-snug transition-colors group-hover:text-[#620D9C]">
        {item.title}
      </h3>

      {/* Accent Bar */}
      <div className="w-10 h-1 bg-gradient-to-r from-[#620D9C] to-[#B063FF] rounded-full my-3.5 transition-all duration-300 group-hover:w-16" />

      {/* Description */}
      <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed flex-grow">
        {item.description}
      </p>
    </div>
  );
};

export default VisionMissionCard;
