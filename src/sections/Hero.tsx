import React, { useEffect, useRef } from 'react';
import { PenTool, Tag, Megaphone, Code } from 'lucide-react';
import { SlideArrowButton } from '../components/SlideArrowButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenModal?: () => void;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
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

        // Ambient Purple & Violet Aura blooms and shifts with scroll
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
      className="relative bg-gradient-to-b from-[#24033b] via-[#200236] to-[#180128] text-white select-none overflow-hidden flex flex-col justify-start pt-[76px] sm:pt-[82px] md:pt-[86px] pb-5 sm:pb-7 px-4 sm:px-6 lg:px-8 w-full max-w-full border-b border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
    >
      {/* Background Subtle Ambient Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={auraRef}
          className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-3xl transition-transform"
        />
      </div>

      {/* Hero Core Content Stage (Directly below navbar with optimal compact spacing) */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-col justify-start pt-1 sm:pt-2 pb-2 sm:pb-3 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* =================================================================
              Left Column: Headline, Subtitle, CTA Button & Floating Sphere
              ================================================================= */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col items-start text-left relative w-full max-w-full">
            {/* Display Headline */}
            <h1 className="reveal-item text-[28px] xs:text-[32px] sm:text-5xl lg:text-[46px] xl:text-[54px] font-black text-white leading-[1.1] tracking-[-0.035em] mb-3 sm:mb-4 max-w-full break-words">
              <div>We Don't Just</div>
              <div>Build Brands.</div>
              <div className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B063FF] to-[#D8B4FE] mt-1 max-w-full">
                <span>We Make Them Rise.</span>
                {/* Reference Curved Underline Swoop */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#B063FF] overflow-visible pointer-events-none"
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
            <p className="reveal-item text-sm sm:text-base lg:text-lg text-purple-200/85 font-medium max-w-[460px] leading-relaxed mb-5 sm:mb-6">
              Creative Design, Branding, Digital Marketing &amp;<br className="hidden sm:inline" />
              IT Solutions under one roof.
            </p>

            {/* CTA Button and Floating Sphere Row */}
            <div className="reveal-item relative flex flex-wrap items-center gap-4 sm:gap-6 max-w-full">
              <SlideArrowButton
                label="Explore Our Services"
                onClick={() => onNavigate('services')}
                variant="purple"
                size="md"
              />

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
                    {/* Bottom-right Violet Rim Radiance */}
                    <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-[#B063FF]/30 to-transparent" />
                  </div>
                  {/* Subtle Floor Contact Shadow */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-full bg-brand-purple/20 blur-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              Right Column: Premium Marketing Service Cards Motion Showcase
              ================================================================= */}
          <div ref={rightVisualRef} className="lg:col-span-6 flex justify-center items-center relative w-full py-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_55px_rgba(24,13,56,0.12),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-200/80 bg-black group transition-all duration-500 hover:shadow-[0_30px_65px_rgba(24,13,56,0.18)]">
              {/* Clean Portrait Frame with Bottom Excess Cropped */}
              <div className="relative w-full aspect-[1/1.36] overflow-hidden bg-black flex items-center justify-center">
                <video
                  src="/assets/erasio_Digital_marketing_cards_popping_20260922230116.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          Bottom Unified 4-Pillars Card Strip (From Reference Screenshot)
          ===================================================================== */}
      <div
        ref={pillarsRef}
        className="w-full max-w-[1360px] mx-auto bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.35)] border border-white/15 p-3 sm:p-4 lg:p-5 relative z-20 transition-all duration-300 hover:border-purple-300/30 mt-3 sm:mt-4 text-white"
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
              <h4 className="text-xs sm:text-base font-black text-white leading-tight mb-0.5 sm:mb-1 group-hover:text-[#B063FF] transition-colors">
                Creative Design
              </h4>
              <p className="text-[10px] sm:text-xs text-purple-200/70 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Unique and engaging designs that bring your ideas to life.
              </p>
            </div>
          </div>

          {/* 2. Branding */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-white/10 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Tag className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-white leading-tight mb-0.5 sm:mb-1 group-hover:text-[#B063FF] transition-colors">
                Branding
              </h4>
              <p className="text-[10px] sm:text-xs text-purple-200/70 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Build a strong brand identity that connects and inspires trust.
              </p>
            </div>
          </div>

          {/* 3. Digital Marketing */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-white/10 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Megaphone className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-white leading-tight mb-0.5 sm:mb-1 group-hover:text-[#B063FF] transition-colors">
                Digital Marketing
              </h4>
              <p className="text-[10px] sm:text-xs text-purple-200/70 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
                Result-driven marketing strategies that grow your brand online.
              </p>
            </div>
          </div>

          {/* 4. IT Solutions */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:border-l lg:border-white/10 lg:pl-6 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white/60 rotate-45 flex items-center justify-center">
                <Code className="w-3 sm:w-3.5 h-3 sm:h-3.5 -rotate-45" />
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-base font-black text-white leading-tight mb-0.5 sm:mb-1 group-hover:text-[#B063FF] transition-colors">
                IT Solutions
              </h4>
              <p className="text-[10px] sm:text-xs text-purple-200/70 leading-tight sm:leading-relaxed max-w-[200px] hidden sm:block">
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
