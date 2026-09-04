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
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup
    gsap.set(heroContentRef.current, { opacity: 0 });
    gsap.set(
      [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        subtitleRef.current,
        ctaRef.current,
        pillarsRef.current,
      ],
      { opacity: 0, y: 40 }
    );
    
    // Set initial giant logo size
    gsap.set(logoWrapperRef.current, { scale: 1 });

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=80%', // Shorter scroll distance for faster animation
        pin: true,
        scrub: 1, // Smooth scrub
        invalidateOnRefresh: true, // Recalculate positions on resize
        onUpdate: (self) => {
          const navLogo = document.getElementById('main-nav-logo');
          if (navLogo) {
            navLogo.style.opacity = self.progress > 0.9 ? '1' : '0';
          }
        },
        onLeave: () => {
          const navLogo = document.getElementById('main-nav-logo');
          if (navLogo) navLogo.style.opacity = '1';
        },
        onEnterBack: () => {
          const navLogo = document.getElementById('main-nav-logo');
          if (navLogo) navLogo.style.opacity = '0';
        }
      },
    });

    // 1. Calculate and animate logo shrinking and moving to nav position
    masterTl.to(logoWrapperRef.current, {
      scale: () => {
        const navLogo = document.getElementById('main-nav-logo');
        if (navLogo && logoImgRef.current) {
          return navLogo.getBoundingClientRect().width / logoImgRef.current.getBoundingClientRect().width;
        }
        return 0.15;
      },
      x: () => {
        const navLogo = document.getElementById('main-nav-logo');
        if (navLogo && logoImgRef.current) {
          const navRect = navLogo.getBoundingClientRect();
          const heroRect = logoImgRef.current.getBoundingClientRect();
          // Calculate difference in centers
          const navCenterX = navRect.left + navRect.width / 2;
          const heroCenterX = heroRect.left + heroRect.width / 2;
          return navCenterX - heroCenterX;
        }
        return -window.innerWidth / 2 + 100;
      },
      y: () => {
        const navLogo = document.getElementById('main-nav-logo');
        if (navLogo && logoImgRef.current) {
          const navRect = navLogo.getBoundingClientRect();
          const heroRect = logoImgRef.current.getBoundingClientRect();
          const navCenterY = navRect.top + navRect.height / 2;
          const heroCenterY = heroRect.top + heroRect.height / 2;
          return navCenterY - heroCenterY;
        }
        return -window.innerHeight / 2 + 40;
      },
      ease: 'power2.inOut',
      duration: 1,
    }, 0);

    // 2. Fade in the hero background/content container behind the logo
    masterTl.to(heroContentRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.2); // Start fading in shortly after scroll starts

    // 3. Stagger the text reveal
    masterTl.to(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out',
      },
      0.4
    );

    masterTl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, 0.6);
    masterTl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, 0.7);
    masterTl.to(pillarsRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, 0.8);

    // 4. Fade out the hero logo at the very end to seamlessly hand off to Navbar logo
    masterTl.to(logoWrapperRef.current, {
      opacity: 0,
      duration: 0.1,
    }, 0.9);

    return () => {
      masterTl.scrollTrigger?.kill();
      masterTl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative bg-white">
      {/* Pinned Container */}
      <div ref={pinContainerRef} className="h-[100svh] w-full relative overflow-hidden flex items-center justify-center">
        
        {/* Giant Logo (Z-Index above content but below navbar) */}
        <div 
          ref={logoWrapperRef} 
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-[45]"
        >
          <img 
            ref={logoImgRef}
            src="/assets/derisen-logo-transparent.png" 
            alt="DE.RISEN"
            className="w-[90vw] md:w-[65vw] max-w-[1200px] object-contain origin-center" 
          />
        </div>

        {/* Hero Content (Fades in) */}
        <div 
          ref={heroContentRef} 
          className="absolute inset-0 pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-lilacSoft/70 via-white to-white flex flex-col justify-center"
        >
          {/* Ambient background dots */}
          <div className="dot-pattern top-8 left-8" />
          <div className="dot-pattern top-12 right-12" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1320px] mx-auto w-full px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 lg:mb-20">
              {/* Left Column */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-lilacSoft/90 border border-brand-purple/20 text-brand-purple text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                  <span>Full-Service Creative &amp; Digital Studio</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-brand-dark leading-[1.1] tracking-[-0.03em] mb-6">
                  <div className="overflow-hidden pb-1">
                    <div ref={line1Ref}>Creative Thinking.</div>
                  </div>
                  <div className="overflow-hidden pb-1">
                    <div ref={line2Ref}>Strategic Execution.</div>
                  </div>
                  <div className="overflow-hidden pb-1">
                    <div ref={line3Ref}>
                      <span className="gradient-text">Measurable Results.</span>
                    </div>
                  </div>
                </h1>

                {/* Subtitle */}
                <div className="overflow-hidden mb-8">
                  <p
                    ref={subtitleRef}
                    className="text-base sm:text-lg text-gray-600 font-medium max-w-lg leading-relaxed"
                  >
                    Strategy-first Creative Design, Global Branding, Digital Marketing &amp; High-Performance IT Solutions built to convert and scale.
                  </p>
                </div>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-8">
                  <button
                    onClick={onOpenModal}
                    className="group relative inline-flex items-center gap-3.5 py-3.5 pl-8 pr-4 bg-brand-card hover:bg-brand-navy text-white text-[15px] font-bold rounded-full transition-all duration-300 shadow-[0_6px_20px_rgba(24,13,56,0.22)] hover:shadow-[0_10px_30px_rgba(99,32,238,0.4)] hover:-translate-y-1 border border-white/15"
                  >
                    <span>Explore Our Work</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-white shadow-inner transition-transform duration-300 group-hover:translate-x-1.5 group-hover:bg-brand-violetLight">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>

                  <a
                    href="#work-gallery"
                    className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full border border-gray-300/80 hover:border-brand-purple text-brand-dark hover:text-brand-purple text-[14.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-lilacSoft/50"
                  >
                    <span>View Client Work</span>
                  </a>
                </div>

                {/* Proof Metrics */}
                <div className="flex items-center gap-6 pt-5 border-t border-gray-200/70 text-xs text-gray-500 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-700 font-bold">96+</span> Projects Delivered
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-purple" />
                    <span className="text-gray-700 font-bold">100%</span> Client Satisfaction
                  </div>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-6 flex justify-center">
                <HeroVisual />
              </div>
            </div>

            {/* Bottom Pillars */}
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
        </div>
      </div>
    </section>
  );
};

