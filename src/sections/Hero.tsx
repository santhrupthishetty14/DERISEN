import React, { useEffect, useRef } from 'react';
import { ArrowRight, PenTool, Tag, Megaphone, Code } from 'lucide-react';
import { HeroVisual } from '../components/HeroVisual';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightVisualRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isAlreadyScrolled = window.scrollY > 40;

      // 1. Initial entrance animation on mount (Synchronized with BrandIntro dock)
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: isAlreadyScrolled ? 0.05 : 1.75,
      });

      // Prepare SVG curved underline stroke draw
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      // Staggered reveal of hero elements
      entranceTl
        .fromTo(
          leftColRef.current?.querySelectorAll('.reveal-item') || [],
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }
        )
        .to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '-=0.4'
        )
        .fromTo(
          rightVisualRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(
          sphereRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' },
          '-=0.5'
        )
        .fromTo(
          pillarsRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          '-=0.6'
        );

      // 2. Continuous idle floating levitation on the prominent 3D purple sphere
      if (sphereRef.current) {
        gsap.to(sphereRef.current, {
          y: '-=12',
          x: '+=4',
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. GSAP ScrollTrigger Multi-Layer Dynamic Scroll Scrub Animation
      if (sectionRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax on Left Text Column (gently floats up and soft fade)
        if (leftColRef.current) {
          scrollTl.to(
            leftColRef.current,
            {
              y: -90,
              opacity: 0.35,
              ease: 'power1.out',
            },
            0
          );
        }

        // 1. Cinematic 3D Dolly Zoom & Perspective Tilt on Right Picture Visual
        if (rightVisualRef.current) {
          scrollTl.to(
            rightVisualRef.current,
            {
              y: -50,
              ease: 'power1.out',
            },
            0
          );
        }

        // Zoom & 3D Tilt on the Master 3D Image itself
        const mainPicture = document.getElementById('hero-main-picture');
        if (mainPicture) {
          scrollTl.to(
            mainPicture,
            {
              scale: 1.09,
              rotateX: 8,
              rotateY: -4,
              filter: 'drop-shadow(0 35px 70px rgba(99,32,238,0.25))',
              ease: 'power1.out',
            },
            0
          );
        }

        // Dynamic Light Sheen sweep across the picture on scroll
        const pictureSheen = document.getElementById('hero-picture-sheen');
        if (pictureSheen) {
          scrollTl.to(
            pictureSheen,
            {
              opacity: 0.7,
              x: 100,
              ease: 'power2.inOut',
            },
            0
          );
        }

        // 2. Multi-Depth Dynamic Parallax Orbits on All 3D Floating Spheres
        // Sphere next to CTA button (foreground deep parallax)
        if (sphereRef.current) {
          scrollTl.to(
            sphereRef.current,
            {
              y: -180,
              x: -45,
              scale: 0.78,
              rotate: 140,
              ease: 'none',
            },
            0
          );
        }

        // Sphere left of mug
        const sphereLeft = document.getElementById('hero-sphere-left');
        if (sphereLeft) {
          scrollTl.to(
            sphereLeft,
            {
              y: -150,
              x: -30,
              scale: 1.22,
              rotate: -90,
              ease: 'none',
            },
            0
          );
        }

        // Sphere top above iMac
        const sphereTop = document.getElementById('hero-sphere-top');
        if (sphereTop) {
          scrollTl.to(
            sphereTop,
            {
              y: 80,
              x: 40,
              scale: 0.82,
              rotate: 110,
              ease: 'none',
            },
            0
          );
        }

        // Sphere right behind phone
        const sphereRight = document.getElementById('hero-sphere-right');
        if (sphereRight) {
          scrollTl.to(
            sphereRight,
            {
              y: -160,
              x: 50,
              scale: 1.28,
              rotate: 180,
              ease: 'none',
            },
            0
          );
        }

        // Ambient Purple & Cyan Aura blooms and shifts with scroll
        if (auraRef.current) {
          scrollTl.to(
            auraRef.current,
            {
              y: -110,
              scale: 1.35,
              opacity: 0.9,
              ease: 'none',
            },
            0
          );
        }

        const ambientAura = document.getElementById('hero-ambient-aura');
        if (ambientAura) {
          scrollTl.to(
            ambientAura,
            {
              scale: 1.3,
              opacity: 0.85,
              ease: 'none',
            },
            0
          );
        }

        // Bottom 4-Pillars Card Strip gently floats and transitions smoothly
        if (pillarsRef.current) {
          scrollTl.to(
            pillarsRef.current,
            {
              y: -30,
              boxShadow: '0 25px 50px rgba(24,13,56,0.12)',
              ease: 'power1.out',
            },
            0
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-white select-none overflow-hidden flex flex-col justify-start pt-[95px] sm:pt-[105px] md:pt-[110px] pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-lilacSoft/70 via-white to-white w-full max-w-full"
    >
      {/* Background Soft Purple Aura & Ambient Radiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={auraRef}
          className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-brand-purple/6 rounded-full blur-3xl transition-transform"
        />
      </div>

      {/* Hero Core Content Stage (Directly below navbar with optimal spacing) */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-col justify-start pt-2 sm:pt-4 pb-6 sm:pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* =================================================================
              Left Column: Headline, Subtitle, CTA Button & Floating Sphere
              ================================================================= */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start text-left relative w-full max-w-full">
            {/* Display Headline */}
            <h1 className="reveal-item text-[28px] xs:text-[32px] sm:text-5xl lg:text-[48px] xl:text-[56px] font-black text-brand-dark leading-[1.1] tracking-[-0.035em] mb-4 sm:mb-5 max-w-full break-words">
              <div>We Don't Just</div>
              <div>Build Brands.</div>
              <div className="relative inline-block text-brand-purple mt-1 max-w-full">
                <span>We Make Them Rise.</span>
                {/* Reference Curved Underline Swoop */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-brand-purple overflow-visible pointer-events-none"
                  viewBox="0 0 320 16"
                  fill="none"
                >
                  <path
                    ref={pathRef}
                    d="M4 11 C80 3 240 3 316 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </h1>

            {/* Supporting Text matching reference exactly */}
            <p className="reveal-item text-sm sm:text-lg text-gray-600 font-medium max-w-[460px] leading-relaxed mb-6 sm:mb-8">
              Creative Design, Branding, Digital Marketing &amp;<br className="hidden sm:inline" />
              IT Solutions under one roof.
            </p>

            {/* CTA Button and Floating Sphere Row */}
            <div className="reveal-item relative flex flex-wrap items-center gap-4 sm:gap-6 max-w-full">
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center gap-3.5 sm:gap-4 py-3 sm:py-3.5 pl-6 sm:pl-7 pr-2.5 sm:pr-3 bg-[#13063e] hover:bg-[#1f0a5c] text-white text-[14px] sm:text-[15px] font-bold rounded-full transition-all duration-300 shadow-[0_10px_26px_rgba(19,6,62,0.28)] hover:shadow-[0_14px_34px_rgba(99,32,238,0.42)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                aria-label="Explore Our Services"
              >
                <span className="tracking-[-0.01em]">Explore Our Services</span>
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-brand-purple shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </button>

              {/* 3D Glossy Metallic Purple Sphere (Matching Reference Scene next to Button) */}
              <div
                ref={sphereRef}
                className="relative hidden sm:block ml-4 pointer-events-none select-none"
                style={{ perspective: '600px' }}
              >
                <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-[0_14px_28px_rgba(40,10,95,0.45)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8a42f8] via-[#5219c6] to-[#250961] relative overflow-hidden">
                    {/* Specular White Light Highlight */}
                    <div className="absolute top-2 left-2.5 w-4 h-3 rounded-full bg-white/75 blur-[0.5px] -rotate-30" />
                    <div className="absolute top-3.5 left-4 w-2 h-1 rounded-full bg-white" />
                    {/* Bottom-right Cyan Rim Radiance */}
                    <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-brand-cyan/25 to-transparent" />
                  </div>
                  {/* Subtle Floor Contact Shadow */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-full bg-brand-purple/20 blur-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              Right Column: 3D Scene Mockup Artwork
              ================================================================= */}
          <div ref={rightVisualRef} className="lg:col-span-7 flex justify-center items-center">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* =====================================================================
          Bottom Unified 4-Pillars Card Strip (From Reference Screenshot)
          ===================================================================== */}
      <div
        ref={pillarsRef}
        className="w-full max-w-[1360px] mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[28px] shadow-[0_15px_40px_rgba(24,13,56,0.06)] border border-gray-100/90 p-3.5 sm:p-6 lg:p-7 relative z-20 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(24,13,56,0.1)] mt-6 sm:mt-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 items-center">
          {/* 1. Creative Design */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <PenTool className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-brand-dark leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-purple transition-colors">
                Creative Design
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Unique and engaging designs that bring your ideas to life.
              </p>
            </div>
          </div>

          {/* 2. Branding */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-gray-200/80 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Tag className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-brand-dark leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-purple transition-colors">
                Branding
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Build a strong brand identity that connects and inspires trust.
              </p>
            </div>
          </div>

          {/* 3. Digital Marketing */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-gray-200/80 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Megaphone className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-brand-dark leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-purple transition-colors">
                Digital Marketing
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Result-driven marketing strategies that grow your brand online.
              </p>
            </div>
          </div>

          {/* 4. IT Solutions */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-gray-200/80 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Code className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-brand-dark leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-purple transition-colors">
                IT Solutions
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Reliable and scalable IT solutions to power your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
