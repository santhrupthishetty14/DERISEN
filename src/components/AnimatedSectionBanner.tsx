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
  imageSrc: string;
  pills?: string[];
  stats?: { value: string; label: string }[];
  accentGlow?: 'purple' | 'violet' | 'magenta';
  align?: 'left' | 'right' | 'center';
}

export const AnimatedSectionBanner: React.FC<AnimatedSectionBannerProps> = ({
  badge,
  title,
  highlightWord,
  description,
  imageSrc,
  pills = [],
  stats = [],
  accentGlow = 'purple',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingLayerRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !imageRef.current) return;

      // 1. Image Smooth Parallax & Subtle Zoom In/Out
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -12,
          scale: 1.14,
        },
        {
          yPercent: 12,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 2. Image Reveal Curtain / Mask Animation
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            clipPath: 'inset(8% 4% 8% 4% round 24px)',
            opacity: 0.85,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Fade + Slide Content Elements
      if (contentRef.current) {
        const textElements = contentRef.current.children;
        gsap.fromTo(
          textElements,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Floating Layer Depth Parallax
      if (floatingLayerRef.current) {
        gsap.to(floatingLayerRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        });
      }

      // 5. Ambient Glowing Orb Movement
      if (glowOrbRef.current) {
        gsap.to(glowOrbRef.current, {
          x: 40,
          y: -25,
          scale: 1.15,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const glowColorClass =
    accentGlow === 'magenta' || accentGlow === 'violet'
      ? 'from-[#B063FF]/25 via-[#620d9c]/20 to-transparent'
      : 'from-[#620d9c]/30 via-[#B063FF]/15 to-transparent';

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 my-16 sm:my-24 select-none overflow-hidden"
    >
      <div
        ref={imageWrapperRef}
        className="relative w-full min-h-[360px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-200/90 shadow-[0_20px_50px_rgba(98,13,156,0.08)] bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900"
      >
        {/* Subtle Watermark Visual */}
        <div className="absolute inset-0 overflow-hidden opacity-25">
          <img
            ref={imageRef}
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-95"
          />
        </div>

        {/* Ambient Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 sm:to-white/40 pointer-events-none" />

        {/* Stats Layer */}
        {stats.length > 0 && (
          <div className="absolute top-8 right-8 hidden sm:flex flex-col gap-3 z-20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-md text-right"
              >
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#620D9C] to-[#7C3AED]">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-slate-600 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner Interactive Foreground Content */}
        <div
          ref={contentRef}
          className="relative z-20 h-full flex flex-col justify-center p-6 sm:p-12 md:p-16 max-w-2xl text-slate-900"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/90 text-[#620D9C] text-xs font-black uppercase tracking-wider mb-4 w-fit shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#620D9C]" />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.2] mb-4 text-slate-950">
            {title}{' '}
            {highlightWord && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#620D9C] via-[#7C3AED] to-[#9333EA]">
                {highlightWord}
              </span>
            )}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6 max-w-xl">
            {description}
          </p>

          {/* Service/Feature Pills */}
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-purple-200 text-xs font-mono font-semibold text-[#620D9C] shadow-sm hover:bg-purple-50 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Border Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#620D9C] to-transparent opacity-60" />
      </div>
    </div>
  );
};

export default AnimatedSectionBanner;
