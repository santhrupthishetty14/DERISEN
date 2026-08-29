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
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/80 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-md transition-all duration-300">
      <div
        className={`flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gradient-to-br from-brand-purple to-brand-violet text-white shadow-md shadow-brand-purple/20 ${
          isPolygon ? 'rounded-xl' : 'rounded-full'
        }`}
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-base font-bold text-brand-dark mb-1">{title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
