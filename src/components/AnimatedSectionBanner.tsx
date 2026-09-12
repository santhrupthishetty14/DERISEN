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
  accentGlow?: 'purple' | 'cyan' | 'violet';
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
    accentGlow === 'cyan'
      ? 'from-[#00E5FF]/20 via-[#6320EE]/15 to-transparent'
      : accentGlow === 'violet'
      ? 'from-[#8B5CF6]/25 via-[#6320EE]/20 to-transparent'
      : 'from-[#6320EE]/30 via-[#B388FF]/15 to-transparent';

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 my-16 sm:my-24 select-none overflow-hidden"
    >
      <div
        ref={imageWrapperRef}
        className="relative w-full min-h-[360px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_24px_65px_rgba(11,4,26,0.35)] bg-[#0B041A] will-change-transform"
      >
        {/* Parallax Background Visual */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center will-change-transform filter brightness-95 contrast-105"
          />
        </div>

        {/* Ambient Radial Gradient Overlays */}
        <div
          ref={glowOrbRef}
          className={`absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br ${glowColorClass} blur-3xl pointer-events-none will-change-transform`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B041A]/95 via-[#180D38]/75 to-[#0B041A]/60 sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B041A] via-transparent to-black/20 pointer-events-none" />

        {/* Floating Ambient Depth Grid & Badge Layer */}
        <div
          ref={floatingLayerRef}
          className="absolute inset-0 pointer-events-none z-10 hidden sm:block will-change-transform"
        >
          {stats.length > 0 && (
            <div className="absolute top-8 right-8 flex flex-col gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-2.5 rounded-2xl bg-[#180D38]/80 backdrop-blur-md border border-white/20 shadow-lg text-right"
                >
                  <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-lilac to-brand-cyan">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-white/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Banner Interactive Foreground Content */}
        <div
          ref={contentRef}
          className="relative z-20 h-full flex flex-col justify-center p-6 sm:p-12 md:p-16 max-w-2xl text-white"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-lilac text-xs font-black uppercase tracking-wider mb-4 w-fit shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{badge}</span>
          </div>

          {/* Headline with Glowing Gradient Accent */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.2] mb-4 text-white">
            {title}{' '}
            {highlightWord && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan">
                {highlightWord}
              </span>
            )}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium mb-6 max-w-xl">
            {description}
          </p>

          {/* Service/Feature Pills */}
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-xs font-mono font-medium text-white/90 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sleek Bottom Border Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-70" />
      </div>
    </div>
  );
};

export default AnimatedSectionBanner;
