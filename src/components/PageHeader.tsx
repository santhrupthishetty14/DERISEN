import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

export interface PageHeaderProps {
  badge: string;
  title: string;
  highlightWord?: string;
  description: string;
  breadcrumb: string;
  onNavigateHome?: () => void;
  tags?: string[];
  imageSrc?: string;
  imageAlt?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  videoHueRotate?: string;
  fullBackground?: boolean;
  backgroundPosition?: string;
  backgroundOpacity?: number;
  hudInfo?: {
    tag: string;
    title: string;
    status: string;
  };
  floatingBadge?: {
    text: string;
    subtext?: string;
  };
  showNexus?: boolean;
  purpleAnimationOnly?: boolean;
  theme?: 'dark' | 'white';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightWord,
  description,
  breadcrumb,
  onNavigateHome,
  tags = [],
  imageSrc,
  imageAlt,
  hudInfo,
  floatingBadge,
  purpleAnimationOnly = false,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const hasRightVisual = purpleAnimationOnly || Boolean(hudInfo || floatingBadge) || Boolean(imageSrc);

  return (
    <div
      className="relative w-full min-h-[480px] lg:min-h-[calc(100vh-78px)] lg:max-h-[760px] flex items-center pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-24 lg:pb-10 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900 border-b border-purple-200/80 shadow-[0_10px_35px_rgba(98,13,156,0.06)] select-none"
    >
      {/* Static Subtle Ambient Purple Accents on White Canvas (Zero Movement/Animations) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Radial Ambient Purple Glow on Right Side */}
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.35) 0%, rgba(233, 213, 255, 0.2) 45%, transparent 70%)',
          }}
        />

        {/* Soft Violet Tint on Lower Left */}
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(245, 240, 255, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Clean Static Subtle Circuit Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(98, 13, 156, 0.45) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(98, 13, 156, 0.45) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ====== BANNER FOREGROUND CONTENT ====== */}
      <div className="max-w-[1360px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Left Column: Editorial Typography & Actions */}
          <div className={`${hasRightVisual ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col items-start`}>
            {/* Breadcrumb Navigation */}
            <div
              className={`flex items-center gap-2 text-xs font-mono mb-3 sm:mb-4 transition-all duration-500 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <button
                onClick={onNavigateHome}
                className="text-slate-500 hover:text-[#620D9C] font-semibold transition-colors cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#620D9C] font-black">{breadcrumb}</span>
            </div>

            {/* Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3.5 sm:mb-4 bg-purple-50 text-[#620D9C] border border-purple-200/90 shadow-sm transition-all duration-500 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#620D9C]" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] text-[#620D9C]">{badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black tracking-tight leading-[1.12] max-w-3xl mb-3.5 sm:mb-4 text-slate-950">
              <span className="text-slate-950">{title} </span>
              {highlightWord && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#620D9C] via-[#7C3AED] to-[#9333EA] inline-block pb-1 pr-2">
                  {highlightWord}
                </span>
              )}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base max-w-xl font-medium leading-relaxed mb-4 sm:mb-5 text-slate-600">
              {description}
            </p>

            {/* Premium Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="header-tag-pill px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/95 text-[#620D9C] border border-purple-200/90 shadow-[0_2px_8px_rgba(98,13,156,0.06)] hover:bg-purple-50 hover:border-[#620D9C]/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Decorative bottom line */}
            <div
              className="mt-4 sm:mt-5 h-[1px] w-full max-w-xs"
              style={{
                background: 'linear-gradient(90deg, rgba(98, 13, 156, 0.75) 0%, rgba(147, 51, 234, 0.4) 60%, transparent 100%)',
              }}
            />
          </div>

          {/* Right Column: Clean Static Visuals (Zero Animations) */}
          {hasRightVisual && (
            <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative my-auto">
              {purpleAnimationOnly ? (
                /* Clean Static 3D Nexus Graphic for Contact Us */
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center select-none pointer-events-none">
                  {/* Outer Concentric Static Orbit Ring 1 */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#7C3AED]/35 pointer-events-none" />

                  {/* Outer Concentric Static Orbit Ring 2 */}
                  <div className="absolute inset-4 rounded-full border border-purple-300/60 pointer-events-none" />

                  {/* Static Halo Core */}
                  <div
                    className="absolute w-36 h-36 rounded-full blur-xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(216, 180, 254, 0.15) 45%, transparent 75%)',
                    }}
                  />

                  {/* High-Luminance Static Center Energy Gem */}
                  <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#620D9C] via-[#7C3AED] to-[#B063FF] shadow-[0_10px_30px_rgba(124,58,237,0.2)]">
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-center p-2.5 bg-white/95 text-slate-800 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED] mb-1" />
                      <span className="text-[9.5px] font-mono font-black uppercase tracking-wider text-[#620D9C]">
                        LIVE NEXUS
                      </span>
                      <span className="text-[8.5px] font-bold text-slate-500">
                        Direct 24/7
                      </span>
                    </div>
                  </div>

                  {/* Satellite Static Micro Nodes */}
                  <div className="absolute top-1 right-1 px-2.5 py-1 rounded-full border border-purple-200 bg-white/95 text-slate-800 shadow-sm text-[9px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                    <span>Instant Reply</span>
                  </div>

                  <div className="absolute bottom-1 left-1 px-2.5 py-1 rounded-full border border-purple-200 bg-white/95 text-slate-800 shadow-sm text-[9px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>WhatsApp Ready</span>
                  </div>
                </div>
              ) : (hudInfo || floatingBadge) ? (
                /* Clean Static HUD Cards for Work / Services */
                <div className="flex flex-col items-end justify-center gap-4 w-full max-w-[280px]">
                  {hudInfo && (
                    <div className="p-4 rounded-2xl bg-white/95 border border-purple-200/90 shadow-[0_12px_30px_rgba(98,13,156,0.08)] flex flex-col gap-2 w-full transition-transform hover:scale-102">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#620D9C] font-bold">
                          {hudInfo.tag}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {hudInfo.title}
                      </div>
                      <div className="flex items-center gap-2 pt-1 border-t border-purple-100 text-[10px] text-slate-600 font-mono">
                        <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                        <span>{hudInfo.status}</span>
                      </div>
                    </div>
                  )}

                  {floatingBadge && (
                    <div className="px-3.5 py-2 rounded-2xl bg-white/95 border border-purple-200/90 shadow-[0_8px_24px_rgba(98,13,156,0.06)] flex items-center gap-2.5 w-full">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#620D9C] to-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 leading-tight">{floatingBadge.text}</div>
                        {floatingBadge.subtext && (
                          <div className="text-[9px] text-[#620D9C] font-bold leading-tight">{floatingBadge.subtext}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : imageSrc ? (
                /* Static Image Card */
                <div className="relative w-full max-w-[420px]">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-purple-200 bg-white shadow-[0_15px_40px_rgba(98,13,156,0.08)]">
                    <img
                      src={imageSrc}
                      alt={imageAlt || title}
                      className="w-full h-[230px] sm:h-[260px] lg:h-[280px] object-cover rounded-2xl block"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
