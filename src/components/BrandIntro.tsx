import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user already scrolled down, skip intro immediately
    const isAlreadyScrolled = window.scrollY > 40;
    if (isAlreadyScrolled) {
      setIsDone(true);
      onComplete();
      return;
    }

    // Lock page scroll during the smooth ~2.3s opening sequence
    document.body.style.overflow = 'hidden';

    // Temporarily hide navbar logo so traveling logo docks seamlessly
    const navLogo = document.getElementById('main-nav-logo');
    if (navLogo) {
      navLogo.style.opacity = '0';
    }

    const masterTl = gsap.timeline({
      delay: 0.08,
      onComplete: () => {
        if (navLogo) {
          navLogo.style.opacity = '1';
        }
        document.body.style.overflow = '';
        setIsDone(true);
        onComplete();
      },
    });

    // 1. Initial State Setup
    gsap.set(dropletRef.current, { scale: 0, y: -35, opacity: 0 });
    gsap.set(rippleRef.current, { scale: 0.4, opacity: 0 });
    gsap.set(logoWrapperRef.current, {
      opacity: 0,
      scale: 0.96,
      clipPath: 'inset(0 50% 0 50%)',
    });
    gsap.set(sheenRef.current, { xPercent: -180 });
    gsap.set(kickerRef.current, { opacity: 0, y: 12 });

    // =========================================================================
    // Step 1: Liquid Purple Droplet Lands on Pure White Surface (0.0s – 0.5s)
    // =========================================================================
    masterTl
      .to(
        dropletRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        0
      )
      // Soft Liquid Ripple Ring Expanding
      .to(
        rippleRef.current,
        {
          scale: 3.6,
          opacity: 0.6,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.2
      )
      .to(
        rippleRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.in',
        },
        0.5
      );

    // =========================================================================
    // Step 2: Real Official Logo Reveals with Precision Mask Wipe (0.45s – 1.15s)
    // =========================================================================
    masterTl
      // Droplet dissolves into the logo's purple dot
      .to(
        dropletRef.current,
        {
          scale: 1.8,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        },
        0.45
      )
      // Real Logo expands horizontally from the center dot origin
      .to(
        logoWrapperRef.current,
        {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0 0% 0 0%)',
          duration: 0.75,
          ease: 'power3.inOut',
        },
        0.48
      );

    // =========================================================================
    // Step 3: Specular Crystal Sheen & Agency Kicker (1.1s – 1.65s)
    // =========================================================================
    masterTl
      // Subtle, high-end light reflection sweeps across real logo
      .to(
        sheenRef.current,
        {
          xPercent: 220,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        1.05
      )
      // Agency Kicker fades in crisply beneath logo
      .to(
        kickerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        1.15
      );

    // Brief, elegant hold to absorb the official brand (0.2s)
    masterTl.to({}, { duration: 0.2 }, 1.6);

    // =========================================================================
    // Step 4: Seamless Bezier Dock into Navbar Logo (1.75s – 2.35s)
    // =========================================================================
    masterTl
      // Kicker softly fades
      .to(
        kickerRef.current,
        {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: 'power2.in',
        },
        1.65
      )
      // Real Logo scales down and glides smoothly into the navbar position
      .to(
        logoWrapperRef.current,
        {
          scale: () => {
            const target = document.getElementById('main-nav-logo');
            if (target && logoImgRef.current) {
              const navW = target.getBoundingClientRect().width;
              const introW = logoImgRef.current.getBoundingClientRect().width;
              return navW && introW ? navW / introW : 0.22;
            }
            return 0.22;
          },
          x: () => {
            const target = document.getElementById('main-nav-logo');
            if (target && logoImgRef.current) {
              const navRect = target.getBoundingClientRect();
              const introRect = logoImgRef.current.getBoundingClientRect();
              const navCenterX = navRect.left + navRect.width / 2;
              const introCenterX = introRect.left + introRect.width / 2;
              return navCenterX - introCenterX;
            }
            return -window.innerWidth / 2 + 80;
          },
          y: () => {
            const target = document.getElementById('main-nav-logo');
            if (target && logoImgRef.current) {
              const navRect = target.getBoundingClientRect();
              const introRect = logoImgRef.current.getBoundingClientRect();
              const navCenterY = navRect.top + navRect.height / 2;
              const introCenterY = introRect.top + introRect.height / 2;
              return navCenterY - introCenterY;
            }
            return -window.innerHeight / 2 + 45;
          },
          duration: 0.65,
          ease: 'power3.inOut',
        },
        1.7
      )
      // Overlay backdrop gently dissolves to unveil 1st page underneath
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        1.9
      );

    return () => {
      masterTl.kill();
      document.body.style.overflow = '';
      if (navLogo) {
        navLogo.style.opacity = '1';
      }
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Pure White Canvas with Delicate Ambient Lilac Warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-lilacSoft/60 via-white to-white pointer-events-none" />

      {/* Subtle Ambient Radial Light Aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      {/* 2. Center Stage: Liquid Droplet, Ripple & Real Official Logo */}
      <div className="relative flex flex-col items-center justify-center p-6 z-10">
        {/* Expanding Liquid Ripple Ring on White Canvas */}
        <div
          ref={rippleRef}
          className="absolute w-20 h-20 rounded-full border border-brand-purple/35 shadow-[0_0_24px_rgba(99,32,238,0.2)] pointer-events-none"
        />

        {/* Real Purple Droplet */}
        <div
          ref={dropletRef}
          className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#803bf5] to-[#5219c6] shadow-[0_4px_18px_rgba(99,32,238,0.4)] pointer-events-none"
        />

        {/* Real Official Logo Container */}
        <div
          ref={logoWrapperRef}
          className="relative flex flex-col items-center justify-center origin-center will-change-transform"
        >
          <div className="relative overflow-hidden p-2 rounded-2xl">
            {/* The Real Official De.risen Logo Image in Authentic Brand Colors */}
            <img
              ref={logoImgRef}
              src="/assets/derisen-logo-transparent.png"
              alt="De.risen"
              className="w-[78vw] sm:w-[56vw] md:w-[44vw] max-w-[540px] h-auto object-contain drop-shadow-[0_12px_28px_rgba(24,13,56,0.08)]"
              loading="eager"
            />

            {/* Specular Crystal Light Reflection Glide */}
            <div
              ref={sheenRef}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-22deg] pointer-events-none mix-blend-overlay"
            />
          </div>

          {/* Minimalist Top-Brand Kicker (Creative Design • Branding • Marketing • IT) */}
          <div
            ref={kickerRef}
            className="mt-4 sm:mt-5 flex items-center gap-2.5 sm:gap-3 text-[10.5px] sm:text-[12px] font-black uppercase tracking-[0.24em] text-brand-dark/70"
          >
            <span className="w-3 sm:w-5 h-[1.5px] bg-brand-purple/40" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-dark via-brand-purple to-brand-violet">
              Creative Design • Branding • Digital Marketing • IT Solutions
            </span>
            <span className="w-3 sm:w-5 h-[1.5px] bg-brand-purple/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;
