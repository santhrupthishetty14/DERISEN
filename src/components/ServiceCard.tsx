import React, { useState } from 'react';
import { PenTool, Tag, Megaphone, Code, LucideIcon } from 'lucide-react';
import { OperatingModelService } from '../utils/types';

interface ServiceCardProps {
  service: OperatingModelService;
  index: number;
  isRevealed: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Tag,
  Megaphone,
  Code,
};

const serviceImageMap: Record<string, string> = {
  'creative-design': '/assets/service-creative-design.jpg',
  'branding': '/assets/service-branding.jpg',
  'digital-marketing': '/assets/service-marketing.jpg',
  'it-solutions': '/assets/service-it-solutions.jpg',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isRevealed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[service.iconName] || PenTool;
  const numString = `0${index + 1}`;
  const imageSrc = serviceImageMap[service.id];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
      className={`group relative bg-white rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col cursor-view-target ${
        isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[35px]'
      } ${
        isHovered
          ? '-translate-y-2 border-brand-purple shadow-[0_20px_40px_rgba(99,32,238,0.14)]'
          : 'border-gray-200/90 shadow-sm'
      }`}
    >
      {/* Top Number Indicator Tag */}
      <div className="absolute top-3.5 right-4 z-20 font-black text-xs sm:text-sm tracking-wider text-white bg-brand-dark/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md">
        {numString}
      </div>

      {/* Visual Thumbnail Area with Real High-Res Asset & Micro-Animations */}
      <div className="relative h-48 sm:h-52 bg-[#0B041A] overflow-hidden">
        {imageSrc ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={imageSrc}
              alt={service.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                isRevealed ? 'clip-path-reveal-full scale-100' : 'clip-path-reveal-left scale-105'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              loading="lazy"
            />
            {/* Ambient Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c]" />
        )}

        {/* Overlapping Round Purple Gradient Icon Badge */}
        <div
          className={`absolute bottom-3.5 left-5 w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-lg border-2 border-white transition-all duration-300 z-10 ${
            isHovered ? '-translate-y-1 scale-110 shadow-glow-purple' : 'translate-y-0 scale-100'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-brand-dark mb-1 transition-colors group-hover:text-brand-purple">
          {service.title}
        </h3>

        {/* Tagline */}
        <div className="text-xs sm:text-sm font-bold text-brand-purple mb-3">
          {service.tagline}
        </div>

        {/* Supporting Description */}
        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Animated Purple Accent Line at Bottom */}
        <div
          className={`h-0.5 mt-5 rounded-full transition-all duration-500 ease-out ${
            isHovered
              ? 'w-full bg-gradient-to-r from-brand-purple to-brand-violet'
              : 'w-10 bg-gray-200'
          }`}
        />
      </div>
    </div>
  );
};
