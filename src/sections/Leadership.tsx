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

  /**
   * Helper to render text with any bracketed content (e.g. "(CEO)", "(BVA)")
   * styled in the brand color (#620D9C) and light bold (font-semibold).
   */
  const renderWithBracketHighlight = (
    text: string,
    bracketColor = 'text-[#620D9C]',
    bracketWeight = 'font-semibold'
  ) => {
    const parts = text.split(/(\([^)]+\))/g);
    if (parts.length === 1) return text;

    return parts.map((part, index) => {
      if (part.startsWith('(') && part.endsWith(')')) {
        return (
          <span
            key={index}
            className={`${bracketColor} ${bracketWeight} tracking-normal`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const shweta = LEADERS[0];
  const lejai = LEADERS[1];

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden w-full"
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
              <span className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#B063FF]" />
              <span className="w-2 h-2 rounded-full bg-[#B063FF]" />
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shadow-lg shadow-[#620D9C]/30">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#B063FF]" />
              <span className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#B063FF]" />
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-white mb-3 leading-tight">
            The Visionaries Behind <span className="text-[#B063FF]">DE.RISEN</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-purple-200/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Driven by <strong className="text-[#B063FF] font-bold">passion</strong>, guided by{' '}
            <strong className="text-[#B063FF] font-bold">strategy</strong>, and committed to building{' '}
            <strong className="text-[#B063FF] font-bold">impactful brands</strong>.
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border-2 border-white/15 p-2 shadow-[0_10px_30px_rgba(99,32,238,0.15)] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-[#B063FF] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#620D9C]/20 to-[#B063FF]/30 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-[#B063FF]" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black tracking-wider uppercase text-white">
                  CREATIVE THINKING
                </h4>
                <p className="text-xs text-purple-200/80 font-medium max-w-[170px] mt-0.5">
                  Ideas that inspire brands that last.
                </p>
              </div>
            </div>

            {/* Center Duo Portrait Artwork - High-Resolution Clean Executive Portraits */}
            <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2">
              {/* Background ambient glowing concentric rings */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#B063FF]/25 -z-10 animate-pulse" />
              <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-[#B063FF]/15 -z-10" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#620D9C]/20 via-[#B063FF]/15 to-transparent blur-3xl -z-10" />

              {/* Clean Executive Duo Display with Glowing Badges */}
              <div className="relative w-full max-w-[560px] flex items-center justify-center gap-4 sm:gap-6 py-2">
                {/* Shweta Deharkar */}
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/80 shadow-[0_15px_35px_rgba(99,32,238,0.22)] bg-gradient-to-tr from-[#620D9C] to-[#B063FF] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/assets/leader-shweta-studio.jpg"
                      alt="Shweta Deharkar - CEO"
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02]"
                    />
                  </div>
                  <div className="mt-3 px-3.5 py-1.5 rounded-full bg-[#180128]/90 backdrop-blur-md border border-white/15 shadow-sm text-center">
                    <div className="text-sm sm:text-base font-bold text-white tracking-tight">Shweta Deharkar</div>
                    <div className="text-[10px] sm:text-[11px] font-semibold text-[#B063FF] uppercase tracking-wider">Chief Executive Officer</div>
                  </div>
                </div>

                {/* Center Synergy Icon Node */}
                <div className="hidden sm:flex -mx-4 z-20 w-10 h-10 rounded-full bg-[#180128] border-2 border-[#B063FF] shadow-md items-center justify-center text-[#B063FF] shrink-0 animate-pulse">
                  <Users className="w-5 h-5" />
                </div>

                {/* Lejai Jayakumar */}
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/80 shadow-[0_15px_35px_rgba(99,32,238,0.22)] bg-gradient-to-tr from-[#620D9C] to-[#B063FF] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/assets/leader-lejai-studio.jpg"
                      alt="Lejai Jayakumar - Managing Director & Co-Founder"
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02]"
                    />
                  </div>
                  <div className="mt-3 px-3.5 py-1.5 rounded-full bg-[#180128]/90 backdrop-blur-md border border-white/15 shadow-sm text-center">
                    <div className="text-sm sm:text-base font-bold text-white tracking-tight">Lejai Jayakumar</div>
                    <div className="text-[10px] sm:text-[11px] font-semibold text-[#B063FF] uppercase tracking-wider">Managing Director &amp; Co-Founder</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Badge: Strategic Growth */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-4 z-20 order-3">
              <div className="flex flex-col items-center lg:items-start group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border-2 border-white/15 p-2 shadow-[0_10px_30px_rgba(99,32,238,0.15)] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-[#B063FF] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#620D9C]/20 to-[#B063FF]/30 flex items-center justify-center">
                    <Target className="w-8 h-8 text-[#B063FF]" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black tracking-wider uppercase text-white">
                  STRATEGIC GROWTH
                </h4>
                <p className="text-xs text-purple-200/80 font-medium max-w-[170px] mt-0.5">
                  Solutions that drive measurable impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. White Card Container: Dual Leader Bio Panels
            =================================================================== */}
        <div
          className={`bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.15)] p-6 sm:p-10 lg:p-14 relative transition-all duration-800 ease-out delay-200 text-slate-900 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Subtle top section eyebrow */}
          <div className="flex items-center gap-2.5 pb-6 mb-8 border-b border-slate-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#620D9C] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-[#620D9C]">
              Executive Profiles &amp; Leadership Vision
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative">
            {/* -------------------------------------------------------------
                LEFT PANEL: Shweta Deharkar
                ------------------------------------------------------------- */}
            <div id="leader-shweta" className="lg:col-span-6 flex flex-col justify-between scroll-mt-28">
              <div>
                {/* Header: User Icon + Name with Designation Below */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shadow-md shadow-[#620D9C]/25 shrink-0">
                    <UserIcon className="w-6 h-6 fill-white" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-snug">
                      {shweta.name}
                    </h3>
                    <span className="inline-flex items-center px-3.5 py-0.5 bg-purple-50 text-slate-700 text-[11px] sm:text-xs font-medium rounded-full tracking-wide border border-purple-200 shadow-xs">
                      {renderWithBracketHighlight(shweta.role)}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative pl-5 sm:pl-6 py-4 pr-4 mb-6 rounded-2xl border-l-[3.5px] border-[#620D9C] bg-gradient-to-r from-purple-50/80 via-purple-50/20 to-transparent">
                  <Quote className="w-5 h-5 text-[#620D9C] mb-2 opacity-90" />
                  <p className="font-semibold text-[#620D9C] text-[15px] sm:text-[16.5px] leading-relaxed italic" style={{ fontFamily: "'Lora', 'Cormorant Garamond', Georgia, serif" }}>
                    {shweta.quote}
                  </p>
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-4 text-[14px] sm:text-[15px] text-slate-600 leading-[1.85] text-left" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif", fontWeight: 400 }}>
                  {shweta.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? 'text-[15px] sm:text-[15.5px] text-slate-700 leading-[1.85] pb-3 mb-2 border-b border-purple-100/80'
                          : 'text-slate-500'
                      }
                    >
                      {renderWithBracketHighlight(paragraph)}
                    </p>
                  ))}
                </div>

                {/* Executive Credential Highlights */}
                <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    BVA Animation &amp; Multimedia
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    MBA in Marketing
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Certified in AI
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    96+ Projects Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Center Vertical Divider with Decorative Pill (Desktop Only) */}
            <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
              <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              <div className="w-2.5 h-6 rounded-full bg-[#620D9C] my-2 shadow-sm" />
              <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
            </div>

            {/* -------------------------------------------------------------
                RIGHT PANEL: Lejai Jayakumar
                ------------------------------------------------------------- */}
            <div id="leader-lejai" className="lg:col-span-6 flex flex-col justify-between scroll-mt-28">
              <div>
                {/* Header: User Icon + Name with Designation Below */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shadow-md shadow-[#620D9C]/25 shrink-0">
                    <UserIcon className="w-6 h-6 fill-white" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-snug">
                      {lejai.name}
                    </h3>
                    <span className="inline-flex items-center px-3.5 py-0.5 bg-purple-50 text-slate-700 text-[11px] sm:text-xs font-medium rounded-full tracking-wide border border-purple-200 shadow-xs">
                      {renderWithBracketHighlight(lejai.role)}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative pl-5 sm:pl-6 py-4 pr-4 mb-6 rounded-2xl border-l-[3.5px] border-[#620D9C] bg-gradient-to-r from-purple-50/80 via-purple-50/20 to-transparent">
                  <Quote className="w-5 h-5 text-[#620D9C] mb-2 opacity-90" />
                  <p className="font-semibold text-[#620D9C] text-[15px] sm:text-[16.5px] leading-relaxed italic" style={{ fontFamily: "'Lora', 'Cormorant Garamond', Georgia, serif" }}>
                    {lejai.quote}
                  </p>
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-4 text-[14px] sm:text-[15px] text-slate-600 leading-[1.85] text-left" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif", fontWeight: 400 }}>
                  {lejai.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? 'text-[15px] sm:text-[15.5px] text-slate-700 leading-[1.85] pb-3 mb-2 border-b border-purple-100/80'
                          : 'text-slate-500'
                      }
                    >
                      {renderWithBracketHighlight(paragraph)}
                    </p>
                  ))}
                </div>

                {/* Executive Credential Highlights */}
                <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Management Consulting
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Enterprise Ops &amp; Budgeting
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    State IT &amp; Media Head
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/80 border border-purple-100 text-[11.5px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Strategic Growth
                  </span>
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
