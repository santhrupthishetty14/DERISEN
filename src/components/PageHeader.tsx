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
  videoPoster?: string;
  videoHueRotate?: string;
  fullBackground?: boolean;
  backgroundPosition?: string;
  backgroundOpacity?: number;
  videoAspectRatio?: string;
  videoFit?: 'contain' | 'cover';
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
  videoPoster,
  fullBackground = false,
  backgroundPosition,
  backgroundOpacity,
  videoAspectRatio,
  videoFit = 'contain',
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
  const hasRightVisual = purpleAnimationOnly || Boolean(hudInfo || floatingBadge) || Boolean(imageSrc);
  const hasRightColumn = hasRightVisual || Boolean(backgroundVideo && !fullBackground);

  return (
    <div
      className={`relative w-full min-h-[480px] lg:min-h-[calc(100vh-78px)] lg:max-h-[760px] flex items-center pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-24 lg:pb-10 overflow-hidden select-none ${
        isDark
          ? 'bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900 border-b border-purple-200/80 shadow-[0_10px_35px_rgba(98,13,156,0.06)]'
      }`}
    >
      {/* Background Video Layer - High Performance, Native 60fps Uncompressed Rendering */}
      {backgroundVideo && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {fullBackground ? (
            <div className="absolute inset-0 w-full h-full">
              {/* Full Background Video Animation - Pristine Native Quality */}
              <video
                src={backgroundVideo}
                poster={videoPoster}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover filter brightness-[1.08] contrast-[1.05] ${
                  backgroundPosition || 'object-center lg:object-right'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  opacity: backgroundOpacity ?? 0.88,
                  willChange: 'transform',
                }}
              />

              {/* Ambient Cyber Neon Backlight & Particle Glow */}
              <div className="absolute right-0 lg:right-16 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-[#620D9C]/40 via-[#7C3AED]/30 to-[#00F0FF]/20 blur-[130px] rounded-full pointer-events-none" />

              {/* Left Editorial Safe-Zone Gradient Curtain (Ensures typography & badges are crystal clear) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#180128] via-[#180128]/92 md:via-[#180128]/80 lg:via-[#180128]/65 to-transparent pointer-events-none w-full lg:w-[65%]" />

              {/* Top & Bottom seamless gradient blending into page background #180128 */}
              <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#180128] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-[#180128] to-transparent" />
            </div>
          ) : (
            <>
              {/* Ambient Cyber Neon Backlight & Particle Glow */}
              <div className="absolute right-0 lg:right-16 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-[#620D9C]/50 via-[#7C3AED]/40 to-[#00F0FF]/25 blur-[120px] rounded-full pointer-events-none" />

              {/* Complete Uncropped 3D Video Animation */}
              <div className="absolute right-0 lg:right-6 xl:right-16 top-0 bottom-0 w-full lg:w-[55%] flex items-center justify-center lg:justify-end overflow-visible">
                <div
                  className={`relative h-[92%] sm:h-[96%] max-h-[660px] flex items-center justify-center ${
                    videoAspectRatio || 'aspect-[464/688]'
                  }`}
                >
                  {/* Native uncropped video */}
                  <video
                    src={backgroundVideo}
                    poster={videoPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full ${
                      videoFit === 'cover' ? 'object-cover' : 'object-contain'
                    } filter brightness-[1.06] contrast-[1.06] drop-shadow-[0_20px_50px_rgba(99,32,238,0.55)]`}
                    style={{ transform: 'translateZ(0)' }}
                  />
                  {/* Feathered gradient edges to blend naturally into #180128 */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#180128] via-transparent to-transparent opacity-75 lg:opacity-30" />
                  <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-gradient-to-b from-[#180128] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-[#180128] to-transparent" />
                </div>
              </div>

              {/* Left Text Safety Gradient Curtain */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#180128] via-[#180128]/95 lg:via-[#180128]/70 to-transparent pointer-events-none w-full lg:w-[60%]" />
            </>
          )}
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
          <div className={`${hasRightColumn ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col items-start`}>
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
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black tracking-tight leading-[1.18] max-w-3xl mb-3.5 sm:mb-4 pb-2">
              <span className={isDark ? 'text-white' : 'text-slate-950'}>{title} </span>
              {highlightWord && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B063FF] via-[#C084FC] to-[#E9D5FF] inline-block pb-2 pr-2">
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

          {/* Right Column: Visual Showcase or Floating Badges */}
          {hasRightVisual ? (
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative my-auto mt-6 lg:mt-0">
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
                /* Clean Luxury Floating HUD / Badges */
                <div className="flex flex-col items-end justify-center gap-4 w-full max-w-[300px]">
                  {hudInfo && (
                    <div
                      className={`p-4 rounded-2xl ${
                        isDark
                          ? 'bg-[#180128]/85 border border-[#B063FF]/40 text-white shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-md'
                          : 'bg-white/95 border border-purple-200/90 text-slate-900 shadow-[0_12px_30px_rgba(98,13,156,0.08)]'
                      } flex flex-col gap-2 w-full transition-transform hover:scale-102`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${isDark ? 'text-purple-300' : 'text-[#620D9C]'}`}>
                          {hudInfo.tag}
                        </span>
                        <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-[#B063FF]' : 'text-[#7C3AED]'}`} />
                      </div>
                      <div className={`text-xs sm:text-sm font-extrabold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {hudInfo.title}
                      </div>
                      <div className={`flex items-center gap-2 pt-1 border-t ${isDark ? 'border-purple-500/20 text-purple-200/70' : 'border-purple-100 text-slate-600'} text-[10px] font-mono`}>
                        <span className="w-2 h-2 rounded-full bg-[#B063FF]" />
                        <span>{hudInfo.status}</span>
                      </div>
                    </div>
                  )}

                  {floatingBadge && (
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        isDark
                          ? 'bg-[#180128]/90 border border-[#B063FF]/50 text-white shadow-[0_10px_35px_rgba(99,32,238,0.4)] backdrop-blur-md'
                          : 'bg-white/95 border border-purple-200/90 text-slate-900 shadow-[0_8px_24px_rgba(98,13,156,0.06)]'
                      } flex items-center gap-3 w-full`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {floatingBadge.text}
                        </div>
                        {floatingBadge.subtext && (
                          <div className={`text-[10px] font-bold leading-tight mt-0.5 ${isDark ? 'text-[#D8B4FE]' : 'text-[#620D9C]'}`}>
                            {floatingBadge.subtext}
                          </div>
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
          ) : hasRightColumn ? (
            <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
