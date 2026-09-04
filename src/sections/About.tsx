import React, { useEffect, useRef, useState } from 'react';
import { VisionMissionCard } from '../components/VisionMissionCard';
import { VISION_MISSION_DATA } from '../utils/constants';
import { PenTool, Megaphone, Code, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(rect.top);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle scroll parallax offset
  const parallaxOffset = scrollY * 0.04;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
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
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-brand-dark tracking-tight mb-8 leading-[1.15]">
              {/* Line 1 */}
              <div className="overflow-hidden pb-1">
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  Building Brands.
                </div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden pb-1">
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
              <div className="overflow-hidden pb-1">
                <div
                  style={{ transitionDelay: '280ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <span className="gradient-text">Driving Growth.</span>
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

          {/* Right Column: Exact Visual Composition from PDF Page 4 with Real Assets & Micro-Parallax */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 relative">
            {/* 1. Main Center Circle Frame with Extracted Collage */}
            <div
              style={{
                transform: `translate3d(0, ${parallaxOffset * -0.8}px, 0)`,
              }}
              className={`relative w-72 h-72 sm:w-84 sm:h-84 rounded-full p-2 bg-gradient-to-tr from-brand-purple via-brand-violet to-brand-cyan shadow-[0_25px_60px_rgba(99,32,238,0.22)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? 'clip-path-reveal-full scale-100 opacity-100'
                  : 'clip-path-reveal-left scale-[1.06] opacity-0'
              }`}
            >
              {/* Refined Studio Accent Ring */}
              <div className="absolute -inset-3.5 rounded-full border border-brand-purple/20 pointer-events-none" />

              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white relative group/center">
                <img
                  src="/assets/about-circle-collage.jpg"
                  alt="DE.RISEN Agency Setup"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/center:scale-105"
                  loading="lazy"
                />
                {/* Overlay subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Service Badge Pill 1: Top Left */}
              <div className="absolute -top-3 -left-3 bg-brand-dark/90 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-extrabold shadow-lg">
                <PenTool className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Creative Design</span>
              </div>

              {/* Floating Service Badge Pill 2: Bottom Right */}
              <div className="absolute -bottom-3 -right-3 bg-brand-purple text-white px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-extrabold shadow-lg shadow-brand-purple/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strategy First</span>
              </div>
            </div>

            {/* 2. Right Side 3 Visual Cards (Creative, Marketing, IT) */}
            <div className="flex flex-col gap-3 w-full max-w-[280px]">
              {/* Card 1: Creative Design & Branding */}
              <div
                style={{ transitionDelay: '300ms' }}
                className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group/card transition-all duration-700 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="h-24 w-full overflow-hidden bg-[#180D38] relative">
                  <img
                    src="/assets/about-thumb-creative.jpg"
                    alt="Creative Design & Branding"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center text-white">
                        <PenTool className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">
                        Creative &amp; Branding
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Digital Marketing */}
              <div
                style={{ transitionDelay: '450ms' }}
                className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group/card transition-all duration-700 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="h-24 w-full overflow-hidden bg-[#180D38] relative">
                  <img
                    src="/assets/about-thumb-marketing.jpg"
                    alt="Digital Marketing"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center text-white">
                        <Megaphone className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">
                        Digital Marketing
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: IT Solutions */}
              <div
                style={{ transitionDelay: '600ms' }}
                className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group/card transition-all duration-700 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="h-24 w-full overflow-hidden bg-[#180D38] relative">
                  <img
                    src="/assets/about-thumb-it.jpg"
                    alt="IT Solutions"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center text-white">
                        <Code className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">
                        IT Solutions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
