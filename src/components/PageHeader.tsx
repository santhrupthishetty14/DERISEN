import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export interface PageHeaderProps {
  badge: string;
  title: string;
  highlightWord?: string;
  description: string;
  breadcrumb: string;
  onNavigateHome?: () => void;
  tags?: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightWord,
  description,
  breadcrumb,
  onNavigateHome,
  tags = [],
}) => {
  return (
    <div className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-24 bg-[#0B041A] text-white overflow-hidden border-b border-white/10">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] bg-brand-cyan/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 circuit-grid-dark opacity-20" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-brand-lilac font-semibold">{breadcrumb}</span>
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-lilac text-xs font-black uppercase tracking-wider mb-6 shadow-[0_4px_20px_rgba(99,32,238,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Page Title with Highlight */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mb-6">
          {title}{' '}
          {highlightWord && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan">
              {highlightWord}
            </span>
          )}
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg text-white/75 max-w-2xl font-medium leading-relaxed mb-8">
          {description}
        </p>

        {/* Feature Tags / Pills */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
