import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const lightRayRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const sphereLeftRef = useRef<HTMLDivElement>(null);
  const sphereTopRef = useRef<HTMLDivElement>(null);
  const sphereRightRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // 3D Cinematic Entrance & Continuous Ambient Loop Animation
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIntroFinished(true);
      return;
    }

    // Initial 3D state: Camera positioned slightly to the left in depth
    gsap.set(stageRef.current, {
      x: -36,
      rotateY: 8.5,
      rotateX: -3.0,
      scale: 0.95,
      opacity: 0,
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    });

    gsap.set(auraRef.current, {
      scale: 0.6,
      opacity: 0,
      x: -40,
    });

    gsap.set(sheenRef.current, {
      x: '-120%',
      opacity: 0,
    });

    gsap.set(lightRayRef.current, {
      x: '-100%',
      opacity: 0,
    });

    gsap.set([sphereLeftRef.current, sphereTopRef.current, sphereRightRef.current], {
      opacity: 0,
      scale: 0.5,
    });

    // =========================================================================
    // 4.0-Second Cinematic 3D Camera & Parallax Entrance Timeline
    // =========================================================================
    const introTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        setIntroFinished(true);
        startAmbientFloatLoop();
      },
    });

    // 0.0s – 0.8s: Atmospheric awakening & smooth camera approach
    introTl
      .to(
        stageRef.current,
        {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
        },
        0.0
      )
      .to(
        auraRef.current,
        {
          opacity: 0.85,
          scale: 1.0,
          duration: 1.1,
          ease: 'power2.out',
        },
        0.0
      )
      .to(
        [sphereLeftRef.current, sphereTopRef.current, sphereRightRef.current],
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.5)',
        },
        0.3
      );

    // 0.8s – 2.8s: Smooth horizontal camera pan through 3D depth & parallax
    introTl
      .to(
        stageRef.current,
        {
          x: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1.0,
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0.6
      )
      .to(
        auraRef.current,
        {
          x: 0,
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0.6
      )
      // Horizontal purple light ray sweeps across the backdrop
      .fromTo(
        lightRayRef.current,
        { x: '-80%', opacity: 0 },
        { x: '120%', opacity: 0.7, duration: 1.8, ease: 'power2.inOut' },
        0.8
      )
      .to(
        lightRayRef.current,
        { opacity: 0, duration: 0.4, ease: 'power1.in' },
        2.2
      )
      // Cinematic purple specular sheen sweeps across the mockup screens
      .fromTo(
        sheenRef.current,
        { x: '-110%', opacity: 0 },
        { x: '130%', opacity: 0.75, duration: 1.6, ease: 'power1.inOut' },
        1.0
      )
      .to(
        sheenRef.current,
        { opacity: 0, duration: 0.35, ease: 'power1.out' },
        2.4
      );

    // 2.8s – 4.0s: Gentle settle into the perfect centered composition
    introTl.to(
      stageRef.current,
      {
        duration: 1.0,
        ease: 'power1.out',
      },
      2.8
    );

    // Continuous Subtle Ambient Floating & Depth Breathing
    let floatTween: gsap.core.Tween | null = null;
    let sphereFloatTweens: gsap.core.Tween[] = [];

    const startAmbientFloatLoop = () => {
      if (!stageRef.current) return;

      // Gentle horizontal and vertical floating motion with subtle breathing zoom
      floatTween = gsap.to(stageRef.current, {
        y: '-=10',
        x: '+=6',
        scale: 1.015,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Individual sphere floating parallax
      if (sphereLeftRef.current) {
        sphereFloatTweens.push(
          gsap.to(sphereLeftRef.current, {
            y: '-=14',
            x: '-=5',
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        );
      }

      if (sphereTopRef.current) {
        sphereFloatTweens.push(
          gsap.to(sphereTopRef.current, {
            y: '+=12',
            x: '+=7',
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5,
          })
        );
      }

      if (sphereRightRef.current) {
        sphereFloatTweens.push(
          gsap.to(sphereRightRef.current, {
            y: '-=10',
            x: '+=4',
            duration: 5.0,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.0,
          })
        );
      }

      // Periodic subtle purple light sheen sweep every 6 seconds
      const sheenLoop = () => {
        if (!sheenRef.current) return;
        gsap.fromTo(
          sheenRef.current,
          { x: '-110%', opacity: 0 },
          {
            x: '130%',
            opacity: 0.55,
            duration: 1.8,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.to(sheenRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  setTimeout(sheenLoop, 4500);
                },
              });
            },
          }
        );
      };
      setTimeout(sheenLoop, 2500);
    };

    return () => {
      introTl.kill();
      floatTween?.kill();
      sphereFloatTweens.forEach((t) => t.kill());
    };
  }, []);

  // Desktop 3D Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setMousePos({
      x: Math.max(-1, Math.min(1, deltaX)),
      y: Math.max(-1, Math.min(1, deltaY)),
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Dynamic interactive 3D perspective transform
  const mouseTransform = isDesktop && introFinished
    ? `translate3d(${mousePos.x * 14}px, ${mousePos.y * 10}px, 0) rotateY(${mousePos.x * 4.5}deg) rotateX(${-mousePos.y * 4.0}deg)`
    : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[760px] mx-auto flex items-center justify-center select-none perspective-[1200px] overflow-hidden py-2 sm:py-0"
      style={{ perspective: '1200px' }}
    >
      {/* Background Soft Purple Aura Glow (Multi-Depth Haze) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={auraRef}
          id="hero-ambient-aura"
          className="w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-gradient-to-tr from-[#6320EE]/30 via-[#8B5CF6]/22 to-[#00E5FF]/18 blur-3xl transition-transform duration-700 will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * -16}px, ${mousePos.y * -14}px, -40px)`
              : undefined,
          }}
        />
      </div>

      {/* Atmospheric Ambient Purple Horizontal Volumetric Light Ribbon */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          ref={lightRayRef}
          className="w-[140%] h-[120px] sm:h-[180px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent blur-2xl -rotate-6 transform will-change-transform"
        />
      </div>

      {/* Ambient Delicate Flowing Wave Ribbons Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-60 sm:w-96 h-60 sm:h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
      </div>

      {/* =====================================================================
          Master 3D Artwork (The ORIGINAL iMac, Phone, Mug, Keyboard, Velvet Ribbon & Spheres)
          ===================================================================== */}
      <div
        ref={stageRef}
        id="hero-master-picture-stage"
        style={{
          transform: mouseTransform,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full transition-transform duration-300 ease-out flex items-center justify-center px-2 sm:px-0 will-change-transform"
      >
        <div
          className="relative group overflow-visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Master 3D Scene Image with Dynamic Lighting & Soft Ambient Occlusion */}
          <img
            ref={mainImageRef}
            id="hero-main-picture"
            src="/assets/hero-3d-scene-perfect.png"
            alt="De.risen 3D Agency Suite & Creative Studio"
            className="w-full h-auto max-h-[290px] sm:max-h-[440px] lg:max-h-[570px] object-contain drop-shadow-[0_24px_55px_rgba(24,13,56,0.18)] transition-all duration-500 will-change-transform"
            style={{ transform: 'translateZ(0px)' }}
            loading="eager"
          />

          {/* Dynamic Purple Specular Sheen Sweep Across the Mockup Screens */}
          <div
            ref={sheenRef}
            id="hero-picture-sheen"
            className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen opacity-0 overflow-hidden"
            style={{ transform: 'translateZ(10px)' }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#D8B4FE]/45 via-white/35 to-transparent skew-x-[-25deg] blur-[1px]" />
          </div>
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 1 (Foreground Left near Mug) */}
        <div
          ref={sphereLeftRef}
          id="hero-sphere-left"
          className="absolute left-1 sm:-left-8 bottom-8 sm:bottom-18 z-20 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 45px)`
              : 'translateZ(45px)',
          }}
        >
          <div className="relative w-8 h-8 sm:w-14 sm:h-14 rounded-full shadow-[0_12px_28px_rgba(40,10,95,0.45)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#934bf8] via-[#5219c6] to-[#250961] relative overflow-hidden">
              <div className="absolute top-1 left-1.5 w-3 h-2 rounded-full bg-white/80 blur-[0.5px] -rotate-30" />
              <div className="absolute top-2 left-2 w-1.5 h-0.5 rounded-full bg-white" />
              <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-brand-cyan/25 to-transparent" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-brand-purple/30 blur-sm" />
          </div>
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 2 (Top-Right Ambient above iMac) */}
        <div
          ref={sphereTopRef}
          id="hero-sphere-top"
          className="absolute right-4 sm:right-8 top-1 sm:-top-8 z-20 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * 26}px, ${mousePos.y * 22}px, 30px)`
              : 'translateZ(30px)',
          }}
        >
          <div className="relative w-6 h-6 sm:w-10 sm:h-10 rounded-full shadow-[0_10px_20px_rgba(40,10,95,0.4)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#9f60f9] via-[#6320ee] to-[#2e0e70] relative overflow-hidden">
              <div className="absolute top-0.5 left-1 w-2.5 h-1.5 rounded-full bg-white/85 blur-[0.5px] -rotate-30" />
              <div className="absolute top-1.5 left-2 w-1 h-0.5 rounded-full bg-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-brand-purple/25 blur-sm" />
          </div>
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 3 (Far-Right Depth behind Phone) */}
        <div
          ref={sphereRightRef}
          id="hero-sphere-right"
          className="hidden sm:block absolute -right-3 sm:-right-6 bottom-28 sm:bottom-36 z-20 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * 18}px, ${mousePos.y * -20}px, 60px)`
              : 'translateZ(60px)',
          }}
        >
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-[0_14px_28px_rgba(40,10,95,0.4)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7e34f4] via-[#4d14be] to-[#200656] relative overflow-hidden">
              <div className="absolute top-1.5 left-2 w-3.5 h-2.5 rounded-full bg-white/75 blur-[0.5px] -rotate-30" />
              <div className="absolute top-2.5 left-2.5 w-1.5 h-0.5 rounded-full bg-white" />
              <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-brand-cyan/20 to-transparent" />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-brand-purple/20 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
