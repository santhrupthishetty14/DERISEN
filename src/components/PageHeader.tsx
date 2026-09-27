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
  backgroundVideo,
  hudInfo,
  floatingBadge,
  purpleAnimationOnly = false,
  theme = 'white',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark' || Boolean(backgroundVideo);
  const hasRightVisual = Boolean(backgroundVideo) || purpleAnimationOnly || Boolean(hudInfo || floatingBadge) || Boolean(imageSrc);

  return (
    <div
      className={`relative w-full min-h-[480px] lg:min-h-[calc(100vh-78px)] lg:max-h-[760px] flex items-center pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-24 lg:pb-10 overflow-hidden select-none ${
        isDark
          ? 'bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900 border-b border-purple-200/80 shadow-[0_10px_35px_rgba(98,13,156,0.06)]'
      }`}
    >
      {/* Background Video Ambient Motion Layer (Zero Distortion, Smooth Radial Bloom) */}
      {backgroundVideo && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-25 lg:opacity-30 mix-blend-screen">
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-3/4 h-full object-cover filter blur-3xl"
            style={{ transform: 'translateZ(0)' }}
          />
        </div>
      )}

      {/* Static Subtle Ambient Purple Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Radial Ambient Purple Glow on Right Side */}
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(98, 13, 156, 0.15) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192, 132, 252, 0.35) 0%, rgba(233, 213, 255, 0.2) 45%, transparent 70%)',
          }}
        />

        {/* Soft Violet Tint on Lower Left */}
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(32, 2, 54, 0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(245, 240, 255, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Clean Static Subtle Circuit Grid Texture */}
        <div
          className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-[0.08]' : 'opacity-[0.05]'}`}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(176, 99, 255, 0.45) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(176, 99, 255, 0.45) 1px, transparent 1px)
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
                className={`${
                  isDark
                    ? 'text-purple-300/70 hover:text-white'
                    : 'text-slate-500 hover:text-[#620D9C]'
                } font-semibold transition-colors cursor-pointer`}
              >
                Home
              </button>
              <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400/50' : 'text-slate-400'}`} />
              <span className={isDark ? 'text-[#D8B4FE] font-bold' : 'text-[#620D9C] font-black'}>{breadcrumb}</span>
            </div>

            {/* Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3.5 sm:mb-4 transition-all duration-500 ease-out ${
                isDark
                  ? 'bg-purple-900/60 text-[#D8B4FE] border border-purple-500/40 shadow-sm'
                  : 'bg-purple-50 text-[#620D9C] border border-purple-200/90 shadow-sm'
              } ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#B063FF]' : 'text-[#620D9C]'}`} />
              <span className={`text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] ${isDark ? 'text-[#D8B4FE]' : 'text-[#620D9C]'}`}>
                {badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black tracking-tight leading-[1.12] max-w-3xl mb-3.5 sm:mb-4">
              <span className={isDark ? 'text-white' : 'text-slate-950'}>{title} </span>
              {highlightWord && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B063FF] via-[#C084FC] to-[#E9D5FF] inline-block pb-1 pr-2">
                  {highlightWord}
                </span>
              )}
            </h1>

            {/* Description */}
            <p className={`text-xs sm:text-sm lg:text-base max-w-xl font-medium leading-relaxed mb-4 sm:mb-5 ${
              isDark ? 'text-purple-200/80' : 'text-slate-600'
            }`}>
              {description}
            </p>

            {/* Premium Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`header-tag-pill px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors ${
                      isDark
                        ? 'bg-white/10 text-purple-200 border border-white/15 hover:bg-white/20'
                        : 'bg-white/95 text-[#620D9C] border border-purple-200/90 shadow-[0_2px_8px_rgba(98,13,156,0.06)] hover:bg-purple-50'
                    }`}
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
                background: isDark
                  ? 'linear-gradient(90deg, rgba(176, 99, 255, 0.8) 0%, rgba(147, 51, 234, 0.4) 60%, transparent 100%)'
                  : 'linear-gradient(90deg, rgba(98, 13, 156, 0.75) 0%, rgba(147, 51, 234, 0.4) 60%, transparent 100%)',
              }}
            />
          </div>

          {/* Right Column: Visual Showcase (Zero Quality Loss 1:1 Rendering) */}
          {hasRightVisual && (
            <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative my-auto">
              {backgroundVideo ? (
                /* Native Resolution Pristine 1:1 Video Showcase (Zero Quality Loss) */
                <div
                  className={`relative w-full max-w-[360px] sm:max-w-[400px] aspect-[464/688] max-h-[520px] flex items-center justify-center transition-all duration-1000 ease-out ${
                    isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: '250ms' }}
                >
                  {/* Ambient Neon Purple Aura Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#620D9C]/60 via-[#B063FF]/50 to-[#7000FF]/30 blur-2xl rounded-3xl opacity-80 pointer-events-none" />

                  {/* 1:1 Sharp Video Container */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#B063FF]/60 shadow-[0_25px_60px_rgba(99,32,238,0.4)] bg-[#120e24] group">
                    <video
                      src={backgroundVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.04]"
                      style={{
                        imageRendering: 'high-quality',
                        transform: 'translateZ(0)',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />
                    {/* Subtle Top & Bottom Vignette Ring */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120e24]/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Mini Badge */}
                  {floatingBadge && (
                    <div className="absolute -bottom-3 -right-2 z-20 px-3.5 py-1.5 rounded-full bg-[#180128]/95 border border-[#B063FF]/70 shadow-lg flex items-center gap-2 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-[#B063FF] animate-pulse" />
                      <span className="text-[10px] font-bold text-white tracking-wide uppercase">
                        {floatingBadge.text}
                      </span>
                    </div>
                  )}
                </div>
              ) : purpleAnimationOnly ? (
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

export default PageHeader;
