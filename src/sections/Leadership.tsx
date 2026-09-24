import React, { useEffect, useRef, useState } from 'react';
import { LEADERS } from '../utils/constants';
import { Users, Lightbulb, Target, Quote, User as UserIcon } from 'lucide-react';

export const Leadership: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const shweta = LEADERS[0];
  const lejai = LEADERS[1];

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="py-16 sm:py-24 bg-[#FAF9FF] relative overflow-hidden w-full"
    >
      {/* Subtle Dot Matrix Ambient Patterns matching Slide */}
      <div className="dot-pattern top-6 left-6 opacity-20" />
      <div className="dot-pattern top-12 right-12 opacity-15" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================================
            1. Top Header: Connector Badge + Title + Subtitle
            =================================================================== */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Connector Badge: ---o [Users Icon] o--- */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center">
              <span className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#620d9c]" />
              <span className="w-2 h-2 rounded-full bg-[#620d9c]" />
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#5b13d6] text-white flex items-center justify-center shadow-lg shadow-[#5b13d6]/30">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#620d9c]" />
              <span className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#620d9c]" />
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#111827] mb-3 leading-tight">
            The Visionaries Behind <span className="text-[#5b13d6]">DE.RISEN</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Driven by <strong className="text-[#5b13d6] font-extrabold">passion</strong>, guided by{' '}
            <strong className="text-[#5b13d6] font-extrabold">strategy</strong>, and committed to building{' '}
            <strong className="text-[#5b13d6] font-extrabold">impactful brands</strong>.
          </p>
        </div>

        {/* ===================================================================
            2. Hero Composition: Center Duo with Circular Glow + Flanking Badges
            =================================================================== */}
        <div
          className={`relative max-w-[1240px] mx-auto mb-10 sm:mb-12 transition-all duration-1000 ease-out delay-100 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Desktop/Tablet visual arrangement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0">
            {/* Left Badge: Creative Thinking */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right px-4 z-20 order-2 lg:order-1">
              <div className="flex flex-col items-center lg:items-end group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#5b13d6]/30 p-2 shadow-[0_10px_30px_rgba(99,32,238,0.15)] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-[#5b13d6] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#620d9c]/10 to-[#8447FF]/20 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-[#5b13d6]" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#111827]">
                  CREATIVE THINKING
                </h4>
                <p className="text-xs text-gray-500 font-medium max-w-[170px] mt-0.5">
                  Ideas that inspire brands that last.
                </p>
              </div>
            </div>

            {/* Center Duo Portrait Artwork - High-Resolution Clean Executive Portraits */}
            <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2">
              {/* Background ambient glowing concentric rings */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#8447FF]/25 -z-10 animate-pulse" />
              <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-[#8447FF]/15 -z-10" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#620d9c]/15 via-[#8447FF]/10 to-transparent blur-3xl -z-10" />

              {/* Clean Executive Duo Display with Glowing Badges */}
              <div className="relative w-full max-w-[560px] flex items-center justify-center gap-4 sm:gap-6 py-2">
                {/* Shweta Sarkar */}
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(99,32,238,0.22)] bg-gradient-to-tr from-[#620d9c] to-[#9d68ff] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/assets/leader-shweta-cleaned.jpg"
                      alt="Shweta Deharkar - CEO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-3 px-3 py-1 rounded-full bg-white/95 border border-purple-100 shadow-sm text-center">
                    <div className="text-xs sm:text-sm font-black text-[#111827]">Shweta Deharkar</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#5b13d6]">Chief Executive Officer</div>
                  </div>
                </div>

                {/* Center Synergy Icon Node */}
                <div className="hidden sm:flex -mx-4 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#5b13d6] shadow-md items-center justify-center text-[#5b13d6] shrink-0 animate-pulse">
                  <Users className="w-5 h-5" />
                </div>

                {/* Lejai Jayakumar */}
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(99,32,238,0.22)] bg-gradient-to-tr from-[#5b13d6] to-[#7c3aed] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/assets/leader-lejai-cleaned.jpg"
                      alt="Lejai Jayakumar - Managing Director & Co-Founder"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-3 px-3 py-1 rounded-full bg-white/95 border border-purple-100 shadow-sm text-center">
                    <div className="text-xs sm:text-sm font-black text-[#111827]">Lejai Jayakumar</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#5b13d6]">Managing Director & Co-Founder</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Badge: Strategic Growth */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-4 z-20 order-3">
              <div className="flex flex-col items-center lg:items-start group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#5b13d6]/30 p-2 shadow-[0_10px_30px_rgba(99,32,238,0.15)] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-[#5b13d6] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#620d9c]/10 to-[#8447FF]/20 flex items-center justify-center">
                    <Target className="w-8 h-8 text-[#5b13d6]" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#111827]">
                  STRATEGIC GROWTH
                </h4>
                <p className="text-xs text-gray-500 font-medium max-w-[170px] mt-0.5">
                  Solutions that drive measurable impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. Unified White Container: Dual Leader Bio Panels
            =================================================================== */}
        <div
          className={`bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-purple-100/90 shadow-[0_25px_60px_rgba(99,32,238,0.08)] p-6 sm:p-10 lg:p-14 relative transition-all duration-800 ease-out delay-200 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative">
            {/* -------------------------------------------------------------
                LEFT PANEL: Shweta Deharkar
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Header: User Icon + Name + Pill */}
                <div className="flex flex-wrap items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#5b13d6] text-white flex items-center justify-center shadow-md shadow-[#5b13d6]/30 shrink-0">
                    <UserIcon className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                      {shweta.name}
                    </h3>
                    <span className="inline-block px-3.5 py-1 bg-[#5b13d6] text-white text-[11px] sm:text-xs font-bold rounded-full tracking-wide shadow-sm">
                      {shweta.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex items-start gap-2 text-[#5b13d6] mb-5">
                  <Quote className="w-5 h-5 fill-[#5b13d6] shrink-0 mt-0.5 rotate-180" />
                  <p className="text-sm sm:text-[15px] font-bold italic leading-snug">
                    {shweta.quote}
                  </p>
                  <Quote className="w-5 h-5 fill-[#5b13d6] shrink-0 mt-0.5" />
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-3.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal text-justify sm:text-left">
                  {shweta.bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Vertical Divider with Decorative Pill (Desktop Only) */}
            <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
              <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
              <div className="w-2.5 h-6 rounded-full bg-[#5b13d6]/80 my-2 shadow-sm" />
              <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
            </div>

            {/* -------------------------------------------------------------
                RIGHT PANEL: Lejai Jayakumar
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Header: User Icon + Name + Pill */}
                <div className="flex flex-wrap items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#5b13d6] text-white flex items-center justify-center shadow-md shadow-[#5b13d6]/30 shrink-0">
                    <UserIcon className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                      {lejai.name}
                    </h3>
                    <span className="inline-block px-3.5 py-1 bg-[#5b13d6] text-white text-[11px] sm:text-xs font-bold rounded-full tracking-wide shadow-sm">
                      {lejai.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex items-start gap-2 text-[#5b13d6] mb-5">
                  <Quote className="w-5 h-5 fill-[#5b13d6] shrink-0 mt-0.5 rotate-180" />
                  <p className="text-sm sm:text-[15px] font-bold italic leading-snug">
                    {lejai.quote}
                  </p>
                  <Quote className="w-5 h-5 fill-[#5b13d6] shrink-0 mt-0.5" />
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-3.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal text-justify sm:text-left">
                  {lejai.bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
