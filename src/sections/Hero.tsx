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
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isAlreadyScrolled = window.scrollY > 40;

      // Initial clean entrance reveal
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: isAlreadyScrolled ? 0.05 : 1.2,
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
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }
        )
        .to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          '-=0.3'
        )
        .fromTo(
          rightVisualRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          pillarsRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-gradient-to-b from-[#24033b] via-[#200236] to-[#180128] text-white select-none overflow-hidden flex flex-col justify-start pt-[90px] sm:pt-[96px] md:pt-[102px] pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 w-full max-w-full border-b border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
    >
      {/* Background Subtle Ambient Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-[#B063FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-[400px] h-[400px] bg-[#620D9C]/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Core Content Stage */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-col justify-start pt-1 sm:pt-2 pb-2 sm:pb-3 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* =================================================================
              Left Column: Headline, Subtitle, CTA Button
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

            {/* Supporting Text */}
            <p className="reveal-item text-sm sm:text-base lg:text-lg text-purple-200/80 font-medium max-w-[460px] leading-relaxed mb-5 sm:mb-6">
              Creative Design, Branding, Digital Marketing &amp;<br className="hidden sm:inline" />
              IT Solutions under one roof.
            </p>

            {/* CTA Button */}
            <div className="reveal-item relative flex flex-wrap items-center gap-4 sm:gap-6 max-w-full">
              <SlideArrowButton
                label="Explore Our Services"
                onClick={() => onNavigate('services')}
                variant="purple"
                size="md"
              />
            </div>
          </div>

          {/* =================================================================
              Right Column: Marketing Bouquet Motion Showcase in Sleek Card Frame
              ================================================================= */}
          <div ref={rightVisualRef} className="lg:col-span-6 flex justify-center items-center relative w-full py-1">
            <div className="relative w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] flex items-center justify-center">
              {/* Soft Ambient Radiance Glow behind the animation */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#6320EE]/40 via-[#B063FF]/30 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              {/* Frameless Hero Animation Container with crisp rounded glow border */}
              <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 bg-white transform transition-transform duration-700 hover:scale-[1.02]">
                <video
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                      const p = el.play();
                      if (p !== undefined) {
                        p.catch(() => {
                          el.muted = true;
                          el.play().catch(() => {});
                        });
                      }
                    }
                  }}
                  src="/assets/hero-marketing-bouquet.mp4"
                  poster="/assets/hero-marketing-bouquet.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto aspect-[16/9] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          Bottom Unified 4-Pillars Card Strip
          ===================================================================== */}
      <div
        ref={pillarsRef}
        className="w-full max-w-[1360px] mx-auto bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.35)] border border-white/15 p-3 sm:p-4 lg:p-5 relative z-20 transition-all duration-300 hover:border-purple-300/30 mt-3 sm:mt-5 text-white"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 items-center">
          {/* 1. Creative Design */}
          <div className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 transition-all duration-300 hover:translate-x-1">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#6320EE] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-[#6320EE]/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
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
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#6320EE] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-[#6320EE]/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
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
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#6320EE] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-[#6320EE]/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
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
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#6320EE] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-[#6320EE]/25 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(99,32,238,0.4)]">
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
