import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, Lightbulb, Target, Users, Rocket, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhatWeDo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const centerFrameRef = useRef<HTMLDivElement>(null);
  const centerImgRef = useRef<HTMLImageElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const ctx = gsap.context(() => {
      if (sectionRef.current && centerFrameRef.current) {
        gsap.fromTo(
          centerFrameRef.current,
          { y: 20, scale: 0.98 },
          {
            y: -20,
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
      id="what-we-do"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden w-full max-w-full"
    >
      {/* Subtle background ambient accents */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* ===================================================================
            Grid with items-start and generous gap
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          
          {/* =================================================================
              LEFT COLUMN: WHAT WE DO (Slide 7 Left)
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start pt-0 pr-0 lg:pr-2">
            {/* Tag Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#620D9C] text-white text-[11px] font-extrabold uppercase tracking-wider mb-5 shadow-sm transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-[#B063FF]" />
              <span>WHAT WE DO</span>
            </div>

            {/* Heading */}
            <h2
              className={`text-2xl sm:text-3xl xl:text-[36px] font-black text-white tracking-tight leading-[1.2] mb-5 min-h-[72px] sm:min-h-[86px] flex flex-col justify-start transition-all duration-700 delay-100 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span>We Create Brands That</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#620D9C] via-[#A855F7] to-[#B063FF]">
                Inspire, Connect &amp; Grow
              </span>
            </h2>

            {/* Accent divider line */}
            <div className="w-16 h-1 bg-gradient-to-r from-[#620D9C] to-[#B063FF] rounded-full mb-6" />

            {/* Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-[13px] text-purple-200/80 leading-relaxed mb-7">
              <p
                className={`transition-all duration-700 delay-200 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                At <strong className="text-[#B063FF] font-bold">DE.RISEN</strong>, we believe every brand has a story worth telling. We combine creativity, strategy, and technology to transform ideas into impactful brand experiences that capture attention and drive business growth.
              </p>
              <p
                className={`transition-all duration-700 delay-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Whether you're launching a startup, rebranding an established business, or expanding your digital presence, we deliver solutions that create lasting value.
              </p>
              <p
                className={`transition-all duration-700 delay-400 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                From compelling visual identities and engaging marketing campaigns to high-performance websites and digital solutions, our team works with passion and precision to help businesses stand out in a competitive world.
              </p>
            </div>

            {/* 4 Cards at Bottom of Left Column */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 w-full">
              {/* Card 1: Creative Design */}
              <div
                className={`group bg-white rounded-2xl border border-slate-100 hover:border-purple-200 p-3.5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#620D9C] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-4 h-4 text-[#B063FF]" />
                </div>
                <h4 className="text-xs font-black text-slate-900 mb-1 group-hover:text-[#620D9C] transition-colors">
                  Creative Design
                </h4>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Eye-catching visuals that communicate your brand story with clarity.
                </p>
              </div>

              {/* Card 2: Branding */}
              <div
                className={`group bg-white rounded-2xl border border-slate-100 hover:border-purple-200 p-3.5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '520ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#620D9C] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-4 h-4 text-[#B063FF]" />
                </div>
                <h4 className="text-xs font-black text-slate-900 mb-1 group-hover:text-[#620D9C] transition-colors">
                  Branding
                </h4>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Strong identities that build trust, recognition &amp; lasting impressions.
                </p>
              </div>

              {/* Card 3: Digital Marketing */}
              <div
                className={`group bg-white rounded-2xl border border-slate-100 hover:border-purple-200 p-3.5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '590ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#620D9C] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Megaphone className="w-4 h-4 text-[#B063FF]" />
                </div>
                <h4 className="text-xs font-black text-slate-900 mb-1 group-hover:text-[#620D9C] transition-colors">
                  Digital Marketing
                </h4>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Smart strategies that engage your audience &amp; drive measurable growth.
                </p>
              </div>

              {/* Card 4: IT Solutions */}
              <div
                className={`group bg-white rounded-2xl border border-slate-100 hover:border-purple-200 p-3.5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '660ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#620D9C] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-4 h-4 text-[#B063FF]" />
                </div>
                <h4 className="text-xs font-black text-slate-900 mb-1 group-hover:text-[#620D9C] transition-colors">
                  IT Solutions
                </h4>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Innovative digital solutions that empower your business to scale.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================================
              CENTER COLUMN: CURVED CIRCULAR ARC ARTWORK (Slide 7 Center)
              ================================================================= */}
          <div className="lg:col-span-2 flex flex-col items-center justify-start pt-2 lg:pt-0 relative px-1">
            {/* Contained Curved Frame - No overflowing outer rings that collide with text */}
            <div className="relative w-48 sm:w-56 lg:w-44 xl:w-52 h-[440px] sm:h-[480px] lg:h-[500px] flex items-center justify-center">
              
              {/* Subtle Ambient Radial Glow Behind Center Image */}
              <div className="absolute inset-0 bg-[#620D9C]/30 rounded-full blur-xl pointer-events-none" />

              {/* Masked Photo Frame */}
              <div
                ref={centerFrameRef}
                className="w-full h-full rounded-full overflow-hidden shadow-[0_20px_45px_rgba(99,32,238,0.25)] border-[3.5px] border-[#620D9C] bg-brand-dark relative group/img z-10"
              >
                <img
                  ref={centerImgRef}
                  src="/assets/what-we-do-center.jpg"
                  alt="DE.RISEN Creative Desk & Mug"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover/img:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-brand-dark/20 flex flex-col justify-end p-4 text-center text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B063FF] font-bold">
                    Creative Agency
                  </span>
                  <span className="text-xs font-black tracking-wider text-purple-200">
                    DE.RISEN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: WHY CHOOSE DE.RISEN? (Slide 7 Right - shifted right)
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start pt-0 lg:pl-8 xl:pl-12 2xl:pl-14">
            {/* Tag Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#620D9C] text-white text-[11px] font-extrabold uppercase tracking-wider mb-5 shadow-sm transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#B063FF] fill-[#B063FF]" />
              <span>WHY CHOOSE DE.RISEN?</span>
            </div>

            {/* Heading */}
            <h2
              className={`text-2xl sm:text-3xl xl:text-[36px] font-black text-white tracking-tight leading-[1.2] mb-5 min-h-[72px] sm:min-h-[86px] flex flex-col justify-start transition-all duration-700 delay-100 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span>Creating Brands That</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#620D9C] via-[#A855F7] to-[#B063FF]">
                Leave a Lasting Impression
              </span>
            </h2>

            {/* Accent divider line */}
            <div className="w-16 h-1 bg-gradient-to-r from-[#620D9C] to-[#B063FF] rounded-full mb-6" />

            {/* Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-[13px] text-purple-200/80 leading-relaxed mb-7">
              <p
                className={`transition-all duration-700 delay-200 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Your brand deserves more than ordinary solutions.
              </p>
              <p
                className={`transition-all duration-700 delay-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                At <strong className="text-[#B063FF] font-bold">DE.RISEN</strong>, we combine creativity, strategy, and innovation to craft powerful brand experiences that capture attention, build trust, and fuel business growth.
              </p>
              <p
                className={`transition-all duration-700 delay-400 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                We focus on delivering measurable results through thoughtful design, impactful marketing, and cutting-edge digital solutions.
              </p>
            </div>

            {/* 4 Feature Items with Circular Purple Icons */}
            <div className="space-y-3.5 w-full">
              {/* Feature 1 */}
              <div
                className={`flex items-start gap-4 p-2.5 rounded-2xl hover:bg-white/5 transition-all duration-300 group ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#620D9C] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#620D9C]/30 group-hover:scale-110 group-hover:bg-[#B063FF] transition-all duration-300">
                  <Lightbulb className="w-5 h-5 text-[#B063FF] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-0.5 group-hover:text-[#B063FF] transition-colors">
                    Creative &amp; Strategic Approach
                  </h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">
                    We blend creativity with strategy to design solutions that are innovative, effective, and results-driven.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div
                className={`flex items-start gap-4 p-2.5 rounded-2xl hover:bg-white/5 transition-all duration-300 group ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: '520ms' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#620D9C] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#620D9C]/30 group-hover:scale-110 group-hover:bg-[#B063FF] transition-all duration-300">
                  <Target className="w-5 h-5 text-[#B063FF] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-0.5 group-hover:text-[#B063FF] transition-colors">
                    Results That Matter
                  </h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">
                    Our solutions are crafted to deliver measurable results that contribute to your business growth.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div
                className={`flex items-start gap-4 p-2.5 rounded-2xl hover:bg-white/5 transition-all duration-300 group ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: '590ms' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#620D9C] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#620D9C]/30 group-hover:scale-110 group-hover:bg-[#B063FF] transition-all duration-300">
                  <Users className="w-5 h-5 text-[#B063FF] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-0.5 group-hover:text-[#B063FF] transition-colors">
                    Client-Centric Mindset
                  </h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">
                    We listen, understand, and collaborate closely to deliver solutions tailored to your unique goals.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div
                className={`flex items-start gap-4 p-2.5 rounded-2xl hover:bg-white/5 transition-all duration-300 group ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: '660ms' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#620D9C] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#620D9C]/30 group-hover:scale-110 group-hover:bg-[#B063FF] transition-all duration-300">
                  <Rocket className="w-5 h-5 text-[#B063FF] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-0.5 group-hover:text-[#B063FF] transition-colors">
                    Innovation at Every Step
                  </h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">
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

export default WhatWeDo;

