import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, CheckCircle, Lightbulb, Target, Users, Rocket } from 'lucide-react';

export const WhatWeDo: React.FC = () => {
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

  const centerParallax = scrollY * -0.05;

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Dots */}
      <div className="dot-pattern top-10 left-10 opacity-10" />
      <div className="dot-pattern bottom-10 right-10 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =================================================================
              Left Column: WHAT WE DO (Line-by-Line Heading & 4 Mini Badges)
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-card text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full mb-5 shadow-sm transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-brand-purple" />
              <span>WHAT WE DO</span>
            </span>

            {/* Line-by-Line Masked Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight mb-5 leading-[1.18]">
              <div className="overflow-hidden pb-1">
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  We Create Brands
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  style={{ transitionDelay: '120ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  That Inspire,
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  style={{ transitionDelay: '240ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <span className="gradient-text">Connect &amp; Grow</span>
                </div>
              </div>
            </h3>

            {/* Body Text */}
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              <p
                style={{ transitionDelay: '350ms' }}
                className={`transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                At DE.RISEN, we believe every brand has a story worth telling. We combine creativity, strategy, and technology to transform ideas into impactful brand experiences that capture attention and drive business growth.
              </p>
              <p
                style={{ transitionDelay: '450ms' }}
                className={`transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                Whether you're launching a startup, rebranding an established business, or expanding your digital presence, we deliver solutions that create lasting value.
              </p>
            </div>

            {/* 4 Mini Service Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div
                style={{ transitionDelay: '550ms' }}
                className={`bg-surface-subtle border border-gray-200 rounded-xl p-3.5 hover:border-brand-purple hover:shadow-md transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center mb-2 shadow-sm">
                  <PenTool className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-brand-dark mb-1">Creative Design</h5>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Eye-catching visuals that communicate your brand story with clarity.
                </p>
              </div>

              <div
                style={{ transitionDelay: '630ms' }}
                className={`bg-surface-subtle border border-gray-200 rounded-xl p-3.5 hover:border-brand-purple hover:shadow-md transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center mb-2 shadow-sm">
                  <Tag className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-brand-dark mb-1">Branding</h5>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Strong identities that build trust, recognition &amp; lasting impressions.
                </p>
              </div>

              <div
                style={{ transitionDelay: '710ms' }}
                className={`bg-surface-subtle border border-gray-200 rounded-xl p-3.5 hover:border-brand-purple hover:shadow-md transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center mb-2 shadow-sm">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-brand-dark mb-1">Digital Marketing</h5>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Smart strategies that engage your audience &amp; drive measurable growth.
                </p>
              </div>

              <div
                style={{ transitionDelay: '790ms' }}
                className={`bg-surface-subtle border border-gray-200 rounded-xl p-3.5 hover:border-brand-purple hover:shadow-md transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center mb-2 shadow-sm">
                  <Code className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-brand-dark mb-1">IT Solutions</h5>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Innovative digital solutions that empower your business to scale.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================================
              Center Column: Real Extracted Visual Frame with Parallax & Glow
              ================================================================= */}
          <div
            style={{
              transform: `translate3d(0, ${centerParallax}px, 0)`,
              transitionDelay: '300ms',
            }}
            className={`lg:col-span-2 flex justify-center py-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed
                ? 'clip-path-reveal-full scale-100 opacity-100'
                : 'clip-path-reveal-left scale-[1.06] opacity-0'
            }`}
          >
            <div className="relative w-48 sm:w-56 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(99,32,238,0.3)] border-2 border-brand-purple/40 group/center">
              <img
                src="/assets/what-we-do-center.jpg"
                alt="DE.RISEN Creative Workshop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/center:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/20 flex flex-col justify-end p-4 text-white text-center">
                <span className="font-black text-xs tracking-widest text-brand-lilac">
                  DE.RISEN
                </span>
                <span className="text-[10px] text-white/70 font-mono mt-0.5">
                  IDEAS • STRATEGY • IMPACT
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================
              Right Column: WHY CHOOSE DE.RISEN? (Line-by-Line & 4 Features)
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-card text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full mb-5 shadow-sm transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-brand-purple" />
              <span>WHY CHOOSE DE.RISEN?</span>
            </span>

            {/* Line-by-Line Masked Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight mb-5 leading-[1.18]">
              <div className="overflow-hidden pb-1">
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  Creating Brands That
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  style={{ transitionDelay: '120ms' }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <span className="gradient-text">Leave a Lasting Impression</span>
                </div>
              </div>
            </h3>

            {/* Body Text */}
            <p
              style={{ transitionDelay: '350ms' }}
              className={`text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed transition-all duration-700 ease-out ${
                isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              Your brand deserves more than ordinary solutions. At DE.RISEN, we combine creativity, strategy, and innovation to craft powerful brand experiences that capture attention, build trust, and fuel business growth.
            </p>

            {/* 4 Feature Items with Icons */}
            <div className="space-y-4 w-full">
              <div
                style={{ transitionDelay: '480ms' }}
                className={`flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-surface-subtle transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-purple/20">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-brand-dark mb-0.5">Creative &amp; Strategic Approach</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    We blend creativity with strategy to design solutions that are innovative, effective, and results-driven.
                  </p>
                </div>
              </div>

              <div
                style={{ transitionDelay: '580ms' }}
                className={`flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-surface-subtle transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-purple/20">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-brand-dark mb-0.5">Results That Matter</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Our solutions are crafted to deliver measurable results that contribute to your business growth.
                  </p>
                </div>
              </div>

              <div
                style={{ transitionDelay: '680ms' }}
                className={`flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-surface-subtle transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-purple/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-brand-dark mb-0.5">Client-Centric Mindset</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    We listen, understand, and collaborate closely to deliver solutions tailored to your unique goals.
                  </p>
                </div>
              </div>

              <div
                style={{ transitionDelay: '780ms' }}
                className={`flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-surface-subtle transition-all duration-300 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-purple/20">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-brand-dark mb-0.5">Innovation at Every Step</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    We embrace the latest technologies and trends to keep your brand ahead of the competition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
