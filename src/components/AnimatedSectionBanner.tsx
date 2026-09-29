import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface AnimatedSectionBannerProps {
  id?: string;
  badge: string;
  title: string;
  highlightWord?: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  pills?: string[];
  stats?: { value: string; label: string }[];
  accentGlow?: 'purple' | 'violet' | 'magenta';
  align?: 'left' | 'right' | 'center';
  theme?: 'light' | 'dark';
}

export const AnimatedSectionBanner: React.FC<AnimatedSectionBannerProps> = ({
  badge,
  title,
  highlightWord,
  description,
  imageSrc,
  videoSrc,
  pills = [],
  stats = [],
  theme = 'light',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !imageRef.current) return;

      // 1. Image Smooth Parallax
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -8,
          scale: 1.08,
        },
        {
          yPercent: 8,
          scale: 1.01,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 2. Fade + Slide Content Elements
      if (contentRef.current) {
        const textElements = contentRef.current.children;
        gsap.fromTo(
          textElements,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isDark = theme === 'dark' || Boolean(videoSrc);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 my-16 sm:my-24 select-none overflow-hidden"
    >
      <div
        ref={imageWrapperRef}
        className={`relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#180128] via-[#200236] to-[#120022] text-white border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900 border-purple-200/90 shadow-[0_20px_50px_rgba(98,13,156,0.08)]'
        }`}
      >
        {/* Background Visual Layer */}
        {videoSrc ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Ambient Cyber Neon Backlight */}
            <div className="absolute right-0 lg:right-12 top-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-gradient-to-br from-[#620D9C]/50 via-[#7C3AED]/40 to-[#00F0FF]/30 blur-[100px] rounded-full pointer-events-none" />

            {/* Complete Uncropped 3D Cyber Laptop Video Animation */}
            <div className="absolute right-0 lg:right-4 top-0 bottom-0 w-full lg:w-[50%] flex items-center justify-center lg:justify-end overflow-visible">
              <div className="relative h-[92%] sm:h-[96%] max-h-[540px] aspect-[464/688] flex items-center justify-center">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain filter brightness-[1.06] contrast-[1.06] drop-shadow-[0_20px_40px_rgba(99,32,238,0.5)]"
                  style={{ transform: 'translateZ(0)' }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#180128] via-transparent to-transparent opacity-80 lg:opacity-30" />
                <div className="absolute inset-x-0 top-0 h-12 pointer-events-none bg-gradient-to-b from-[#180128] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none bg-gradient-to-t from-[#180128] to-transparent" />
              </div>
            </div>

            {/* Left Safety Curtain */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#180128] via-[#180128]/95 lg:via-[#180128]/70 to-transparent pointer-events-none w-full lg:w-[60%]" />
          </div>
        ) : imageSrc ? (
          /* Background Image Visual */
          <div className={`absolute inset-0 overflow-hidden ${isDark ? 'opacity-50' : 'opacity-25'}`}>
            <img
              ref={imageRef}
              src={imageSrc}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-95"
            />
            {/* Dark mode: left gradient curtain for text legibility */}
            {isDark && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#180128] via-[#180128]/85 lg:via-[#180128]/60 to-transparent pointer-events-none" />
            )}
          </div>
        ) : null}

        {/* Ambient Gradient Overlays for High Legibility (Light theme only) */}
        {!isDark && (
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 sm:to-white/40 pointer-events-none" />
        )}

        {/* Stats Layer */}
        {stats.length > 0 && (
          <div className="absolute top-8 right-8 hidden sm:flex flex-col gap-3 z-20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`px-4 py-2.5 rounded-2xl backdrop-blur-md border shadow-md text-right ${
                  isDark
                    ? 'bg-[#180128]/85 border-[#B063FF]/40 text-white'
                    : 'bg-white/95 border-purple-200/90 text-slate-900'
                }`}
              >
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B063FF] to-[#C084FC]">
                  {stat.value}
                </div>
                <div className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner Interactive Foreground Content */}
        <div
          ref={contentRef}
          className={`relative z-20 h-full flex flex-col justify-center p-6 sm:p-12 md:p-16 max-w-2xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {/* Eyebrow Pill */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 w-fit shadow-sm ${
            isDark
              ? 'bg-purple-900/60 border border-[#B063FF]/40 text-[#D8B4FE]'
              : 'bg-purple-50 border border-purple-200/90 text-[#620D9C]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#B063FF]' : 'text-[#620D9C]'}`} />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.2] mb-4 ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {title}{' '}
            {highlightWord && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B063FF] via-[#C084FC] to-[#E9D5FF]">
                {highlightWord}
              </span>
            )}
          </h3>

          {/* Description */}
          <p className={`text-sm sm:text-base leading-relaxed font-medium mb-6 max-w-xl ${
            isDark ? 'text-purple-200/80' : 'text-slate-600'
          }`}>
            {description}
          </p>

          {/* Service/Feature Pills */}
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold shadow-sm transition-colors ${
                    isDark
                      ? 'bg-white/10 border border-white/15 text-purple-200 hover:bg-white/15'
                      : 'bg-white border border-purple-200 text-[#620D9C] hover:bg-purple-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B063FF]" />
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Border Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B063FF] to-transparent opacity-60" />
      </div>
    </div>
  );
};

export default AnimatedSectionBanner;
