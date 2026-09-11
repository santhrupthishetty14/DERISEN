import React, { useEffect, useRef, useState } from 'react';
import { VisionMissionCard } from '../components/VisionMissionCard';
import { VISION_MISSION_DATA } from '../utils/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // GSAP ScrollTrigger for About Section Artwork Parallax
    const ctx = gsap.context(() => {
      if (sectionRef.current && artworkRef.current) {
        gsap.fromTo(
          artworkRef.current,
          { y: 30, scale: 0.97 },
          {
            y: -30,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 bg-white relative overflow-hidden w-full max-w-full"
    >
      {/* Ambient background dots */}
      <div className="dot-pattern top-12 left-10 opacity-10" />
      <div className="dot-pattern bottom-12 right-10 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* ===================================================================
            Top Split Layout: Editorial Copy + 3D Visual Composition
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24 sm:mb-28">
          {/* Left Column: Heading (Line-by-Line) + Body Copy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span
              className={`eyebrow transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              COMPANY INTRODUCTION
            </span>

            {/* Line-by-Line Masked Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-brand-dark tracking-tight mb-8 leading-[1.22]">
              {/* Line 1 */}
              <div className="overflow-hidden pb-2">
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  Building Brands.
                </div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden pb-2">
                <div
                  style={{ transitionDelay: '140ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  Creating Experiences.
                </div>
              </div>

              {/* Line 3 with Gradient Text */}
              <div className="overflow-hidden pb-3 pt-0.5">
                <div
                  style={{ transitionDelay: '280ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <span className="gradient-text inline-block pb-1">Driving Growth.</span>
                </div>
              </div>
            </h2>

            {/* Body Text: Smooth Upward Fade */}
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              <p
                style={{ transitionDelay: '400ms' }}
                className={`transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                At <strong className="text-brand-dark font-extrabold">DE.RISEN</strong>, we believe every business deserves a powerful identity and a strong digital presence. We are a full-service creative agency delivering innovative solutions in <strong className="text-brand-purple font-bold">Creative Design, Branding, Digital Marketing, and IT Solutions</strong>.
              </p>

              <p
                style={{ transitionDelay: '520ms' }}
                className={`transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                With a passion for creativity and a strategy-first approach, we transform ideas into impactful brands that connect, inspire, and grow. Whether you're a startup, an established business, or an enterprise, we provide customized solutions that help you stand out in today's competitive market.
              </p>

              <p
                style={{ transitionDelay: '640ms' }}
                className={`transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                At DE.RISEN, we don't just deliver services—we build brands, create lasting impressions, and drive sustainable growth. Your vision inspires our creativity, and your success defines our mission.
              </p>
            </div>
          </div>

          {/* Right Column: Exact Visual Composition from PDF Page 5 */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div
              ref={artworkRef}
              className={`relative w-full max-w-[620px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-[0.96] opacity-0 translate-y-6'
              }`}
            >
              <img
                src="/assets/about-visual-composition.png"
                alt="DE.RISEN Creative Agency - Building Brands. Creating Impact."
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(99,32,238,0.14)] transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ===================================================================
            Bottom 3 Core Cards: Vision, Mission, Goal
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {VISION_MISSION_DATA.map((item, index) => (
            <VisionMissionCard
              key={item.kicker}
              item={item}
              index={index}
              isRevealed={isRevealed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
