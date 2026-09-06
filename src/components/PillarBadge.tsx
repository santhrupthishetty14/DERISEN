import React from 'react';
import { PenTool, Tag, Megaphone, Code, LucideIcon } from 'lucide-react';

interface PillarBadgeProps {
  title: string;
  description: string;
  iconName: string;
  isPolygon?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Tag,
  Megaphone,
  Code,
};

export const PillarBadge: React.FC<PillarBadgeProps> = ({
  title,
  description,
  iconName,
  isPolygon,
}) => {
  const IconComponent = iconMap[iconName] || PenTool;

  return (
    <div className="group flex items-start gap-3.5 p-4 sm:p-4.5 rounded-2xl bg-white/90 hover:bg-white border border-gray-100/90 hover:border-brand-purple/30 shadow-[0_4px_18px_rgba(24,13,56,0.04)] hover:shadow-[0_10px_28px_rgba(99,32,238,0.1)] transition-all duration-300 hover:-translate-y-1">
      <div
        className={`flex items-center justify-center w-11 h-11 flex-shrink-0 bg-gradient-to-br from-brand-purple to-brand-violet text-white shadow-md shadow-brand-purple/25 transition-transform duration-300 group-hover:scale-105 ${
          isPolygon ? 'rounded-xl' : 'rounded-full'
        }`}
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-[14.5px] sm:text-base font-bold text-brand-dark mb-0.5 group-hover:text-brand-purple transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
