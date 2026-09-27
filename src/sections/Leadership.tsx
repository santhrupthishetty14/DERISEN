import React, { useEffect, useRef, useState } from 'react';
import { LEADERS } from '../utils/constants';
import { Users, Lightbulb, Target, Quote, User as UserIcon, Sparkles } from 'lucide-react';

export type LeadershipFontKey = 'editorial' | 'cormorant' | 'avantgarde' | 'modern';

interface FontOption {
  id: LeadershipFontKey;
  label: string;
  sublabel: string;
  nameFont: string;
  quoteFont: string;
  bodyFont: string;
  badge: string;
}

export const LEADERSHIP_FONT_OPTIONS: FontOption[] = [
  {
    id: 'editorial',
    label: 'Haute Editorial',
    sublabel: 'Playfair Display + Outfit',
    badge: 'Recommended',
    nameFont: 'font-serif font-bold text-2xl sm:text-[28px] tracking-tight text-slate-950',
    quoteFont: 'font-serif italic font-normal text-slate-800 text-base sm:text-[17px] leading-relaxed',
    bodyFont: 'font-outfit text-slate-600 font-normal leading-[1.8] tracking-[-0.01em]',
  },
  {
    id: 'cormorant',
    label: 'Royal Atelier',
    sublabel: 'Cormorant Garamond + Clean Sans',
    badge: 'Luxury Couture',
    nameFont: 'font-cormorant font-bold text-2xl sm:text-[30px] tracking-normal text-slate-950',
    quoteFont: 'font-cormorant italic font-medium text-slate-800 text-[18px] sm:text-[20px] leading-relaxed',
    bodyFont: 'font-sans text-slate-600 font-normal leading-[1.8] tracking-normal',
  },
  {
    id: 'avantgarde',
    label: 'Avant-Garde Studio',
    sublabel: 'Syne + Outfit',
    badge: 'Creative Agency',
    nameFont: 'font-syne font-extrabold text-xl sm:text-2xl tracking-tight text-slate-950 uppercase',
    quoteFont: 'font-outfit font-semibold italic text-slate-800 text-[14.5px] sm:text-[15.5px] leading-snug',
    bodyFont: 'font-outfit text-slate-600 font-normal leading-[1.75] tracking-tight',
  },
  {
    id: 'modern',
    label: 'Modern Executive',
    sublabel: 'Outfit + Plus Jakarta',
    badge: 'Clean Tech',
    nameFont: 'font-outfit font-black text-xl sm:text-2xl tracking-tight text-slate-950',
    quoteFont: 'font-sans font-bold italic text-slate-800 text-sm sm:text-[15px] leading-snug',
    bodyFont: 'font-sans text-slate-600 font-normal leading-[1.75] tracking-normal',
  },
];

export const Leadership: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeFontKey, setActiveFontKey] = useState<LeadershipFontKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('derisen_leadership_font');
      if (saved && ['editorial', 'cormorant', 'avantgarde', 'modern'].includes(saved)) {
        return saved as LeadershipFontKey;
      }
    }
    return 'editorial';
  });

  const handleFontChange = (key: LeadershipFontKey) => {
    setActiveFontKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('derisen_leadership_font', key);
    }
  };

  const activeFont = LEADERSHIP_FONT_OPTIONS.find((f) => f.id === activeFontKey) || LEADERSHIP_FONT_OPTIONS[0];

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
          <p className="text-sm sm:text-base lg:text-[17px] text-purple-200/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Driven by <strong className="text-[#B063FF] font-extrabold">passion</strong>, guided by{' '}
            <strong className="text-[#B063FF] font-extrabold">strategy</strong>, and committed to building{' '}
            <strong className="text-[#B063FF] font-extrabold">impactful brands</strong>.
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
                <p className="text-xs text-purple-200/70 font-medium max-w-[170px] mt-0.5">
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
                  <div className="mt-3 px-3 py-1 rounded-full bg-[#180128]/90 backdrop-blur-md border border-white/15 shadow-sm text-center">
                    <div className="text-xs sm:text-sm font-black text-white">Shweta Deharkar</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#B063FF]">Chief Executive Officer</div>
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
                  <div className="mt-3 px-3 py-1 rounded-full bg-[#180128]/90 backdrop-blur-md border border-white/15 shadow-sm text-center">
                    <div className="text-xs sm:text-sm font-black text-white">Lejai Jayakumar</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#B063FF]">Managing Director & Co-Founder</div>
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
                <p className="text-xs text-purple-200/70 font-medium max-w-[170px] mt-0.5">
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
          {/* Top Bar: Executive Header & Premium Typography Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#620D9C] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#620D9C]">
                Executive Leadership &amp; Vision
              </span>
            </div>

            {/* Typography Vibe Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-purple-50/70 rounded-2xl border border-purple-100 self-start sm:self-auto overflow-x-auto max-w-full">
              <div className="px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#620D9C]" />
                <span className="hidden md:inline">Font Style:</span>
              </div>
              {LEADERSHIP_FONT_OPTIONS.map((opt) => {
                const isActive = activeFontKey === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleFontChange(opt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-300 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#620D9C] shadow-sm font-bold border border-purple-200 ring-1 ring-[#620D9C]/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                    }`}
                    title={opt.sublabel}
                  >
                    <span>{opt.label}</span>
                    {opt.badge === 'Recommended' && (
                      <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded-full bg-purple-100 text-[#620D9C] font-extrabold uppercase hidden lg:inline">
                        Best
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
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
                    <h3 className={`transition-all duration-300 ${activeFont.nameFont}`}>
                      {shweta.name}
                    </h3>
                    <span className="inline-flex items-center px-3.5 py-0.5 bg-purple-50 text-[#620D9C] text-[11px] sm:text-xs font-bold rounded-full tracking-wide border border-purple-200 shadow-sm">
                      {shweta.role}
                    </span>
                  </div>
                </div>

                {/* Quote with Editorial Luxury Styling */}
                <div className="relative pl-5 py-4 pr-4 mb-6 rounded-r-2xl border-l-[3.5px] border-[#620D9C] bg-gradient-to-r from-purple-50/70 via-purple-50/20 to-transparent">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-5 h-5 text-[#620D9C] shrink-0 mt-0.5 opacity-80" />
                    <p className={`transition-all duration-300 ${activeFont.quoteFont}`}>
                      "{shweta.quote}"
                    </p>
                  </div>
                </div>

                {/* Bio Paragraphs */}
                <div className={`space-y-4 text-left transition-all duration-300 ${activeFont.bodyFont}`}>
                  {shweta.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? 'text-[14.5px] sm:text-[15.5px] font-medium text-slate-900 leading-[1.75]'
                          : 'text-[13.5px] sm:text-[14.5px]'
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Executive Credential Highlights */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    BVA Animation &amp; Multimedia
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    MBA in Marketing
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Certified in AI
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
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
                    <h3 className={`transition-all duration-300 ${activeFont.nameFont}`}>
                      {lejai.name}
                    </h3>
                    <span className="inline-flex items-center px-3.5 py-0.5 bg-purple-50 text-[#620D9C] text-[11px] sm:text-xs font-bold rounded-full tracking-wide border border-purple-200 shadow-sm">
                      {lejai.role}
                    </span>
                  </div>
                </div>

                {/* Quote with Editorial Luxury Styling */}
                <div className="relative pl-5 py-4 pr-4 mb-6 rounded-r-2xl border-l-[3.5px] border-[#620D9C] bg-gradient-to-r from-purple-50/70 via-purple-50/20 to-transparent">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-5 h-5 text-[#620D9C] shrink-0 mt-0.5 opacity-80" />
                    <p className={`transition-all duration-300 ${activeFont.quoteFont}`}>
                      "{lejai.quote}"
                    </p>
                  </div>
                </div>

                {/* Bio Paragraphs */}
                <div className={`space-y-4 text-left transition-all duration-300 ${activeFont.bodyFont}`}>
                  {lejai.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? 'text-[14.5px] sm:text-[15.5px] font-medium text-slate-900 leading-[1.75]'
                          : 'text-[13.5px] sm:text-[14.5px]'
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Executive Credential Highlights */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Management Consulting
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    Enterprise Ops &amp; Budgeting
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#620D9C]" />
                    State IT &amp; Media Head
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] font-semibold text-slate-700">
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
