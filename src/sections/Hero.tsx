import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroVisual } from '../components/HeroVisual';
import { PillarBadge } from '../components/PillarBadge';
import { QUICK_PILLARS } from '../utils/constants';
import gsap from 'gsap';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial set state to prevent any layout shifts
    gsap.set(
      [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        subtitleRef.current,
        ctaRef.current,
        pillarsRef.current,
      ],
      { opacity: 0, willChange: 'transform, opacity' }
    );

    // Master Entrance Timeline
    const masterTl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    // Sequence Step 3: Hero headline reveals line-by-line
    masterTl
      .fromTo(
        line1Ref.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power4.out' },
        0.2
      )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power4.out' },
        0.35
      )
      .fromTo(
        line3Ref.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
        0.5
      );

    // Sequence Step 4: Supporting text appears
    masterTl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      0.65
    );

    // Sequence Step 5: Primary CTA button appears (Gentle scale + fade)
    masterTl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.93 },
      { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
      0.78
    );

    // Bottom 4 Pillars Stagger
    masterTl.fromTo(
      pillarsRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.5
    );

    return () => {
      masterTl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-lilacSoft/70 via-white to-white"
    >
      {/* Ambient background dots */}
      <div className="dot-pattern top-8 left-8" />
      <div className="dot-pattern top-12 right-12" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 lg:mb-20">
          {/* =================================================================
              Left Column: Headline (Line-by-Line Stagger), Subtitle, CTA
              ================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Main Display Headline with Line-by-Line Overflow Mask */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark leading-[1.12] tracking-tight mb-6">
              {/* Line 1 */}
              <div className="overflow-hidden pb-1">
                <div ref={line1Ref}>We Don't Just</div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden pb-1">
                <div ref={line2Ref}>Build Brands.</div>
              </div>

              {/* Line 3 */}
              <div className="overflow-hidden pb-1">
                <div ref={line3Ref}>
                  <span className="gradient-text">We Make Them Rise.</span>
                </div>
              </div>
            </h1>

            {/* Supporting Text */}
            <div className="overflow-hidden mb-8">
              <p
                ref={subtitleRef}
                className="text-base sm:text-lg text-gray-600 font-medium max-w-lg leading-relaxed"
              >
                Creative Design, Branding, Digital Marketing &amp; IT Solutions under one roof.
              </p>
            </div>

            {/* Primary CTA */}
            <div ref={ctaRef}>
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center gap-3.5 py-3.5 pl-8 pr-4 bg-brand-card hover:bg-brand-navy text-white text-[15px] font-bold rounded-full transition-all duration-300 shadow-[0_6px_20px_rgba(24,13,56,0.22)] hover:shadow-[0_10px_30px_rgba(99,32,238,0.4)] hover:-translate-y-1 active:translate-y-0 border border-white/15"
                aria-label="Explore Our Services"
              >
                <span>Explore Our Services</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-white shadow-inner transition-transform duration-300 group-hover:translate-x-1.5 group-hover:bg-brand-violetLight">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* =================================================================
              Right Column: Hero Visual Mockup with Layered GSAP Timeline
              ================================================================= */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroVisual />
          </div>
        </div>

        {/* ===================================================================
            Bottom 4 Core Quick Pillars Row
            =================================================================== */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-gray-200/80"
        >
          {QUICK_PILLARS.map((pillar) => (
            <PillarBadge
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              iconName={pillar.iconName}
              isPolygon={pillar.isPolygon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
