import React, { useEffect, useRef, useState } from 'react';
import { LeaderCard } from '../components/LeaderCard';
import { LEADERS } from '../utils/constants';
import { Lightbulb, TrendingUp } from 'lucide-react';

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="py-16 sm:py-28 bg-surface-subtle relative overflow-hidden"
    >
      {/* Dot Matrix Ambient Patterns matching PDF Slide 6 */}
      <div className="dot-pattern top-8 left-8 opacity-15" />
      <div className="dot-pattern top-8 right-8 opacity-15" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* ===================================================================
            Hero Dual Circular Portraits matching PDF Slide 6
            =================================================================== */}
        <div
          className={`relative mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* DESKTOP LAYOUT (>= 1024px) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
            {/* Left Leader Portrait Circle (Shweta Deharkar) */}
            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="w-56 h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1.5 shadow-[0_20px_50px_rgba(99,32,238,0.35)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-shweta.jpg"
                      alt="Shweta Deharkar"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-brand-purple/20 blur-2xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
                <div className="text-center mt-3">
                  <h4 className="text-base font-black text-brand-dark">Shweta Deharkar</h4>
                  <p className="text-xs text-brand-purple font-bold">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Center Header Details */}
            <div className="col-span-4 text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-brand-purple/60" />
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-brand-purple">
                  THE VISIONARIES BEHIND
                </span>
                <span className="h-px w-6 bg-brand-purple/60" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight mb-3 leading-none">
                DE.RISEN
              </h2>

              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-sm mx-auto mb-6 leading-relaxed">
                Driven by <strong className="text-brand-purple">passion</strong>, guided by{' '}
                <strong className="text-brand-purple">strategy</strong>, and committed to building{' '}
                <strong className="text-brand-purple">impactful brands</strong>.
              </p>

              {/* 2 Core Value Badges */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20 shrink-0">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-brand-dark">
                      CREATIVE THINKING
                    </h5>
                    <p className="text-[9px] text-gray-500">Ideas that inspire</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-brand-dark">
                      STRATEGIC GROWTH
                    </h5>
                    <p className="text-[9px] text-gray-500">Measurable impact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Leader Portrait Circle (Lejai Jayakumar) */}
            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="w-56 h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1.5 shadow-[0_20px_50px_rgba(99,32,238,0.35)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-lejai.jpg"
                      alt="Lejai Jayakumar"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-brand-purple/20 blur-2xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
                <div className="text-center mt-3">
                  <h4 className="text-base font-black text-brand-dark">Lejai Jayakumar</h4>
                  <p className="text-xs text-brand-purple font-bold">Managing Director & Co-Founder</p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET COMPACT LAYOUT (< 1024px) */}
          <div className="block lg:hidden text-center">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-brand-purple block mb-1">
              THE VISIONARIES BEHIND
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight mb-3">
              DE.RISEN
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md mx-auto mb-6">
              Driven by passion, guided by strategy, and committed to building impactful brands.
            </p>

            {/* Compact Dual Avatar Row on Mobile */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1 shadow-md">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-shweta.jpg"
                      alt="Shweta Deharkar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-brand-dark mt-1.5">Shweta Deharkar</h4>
                <p className="text-[10px] text-brand-purple font-bold">Founder & CEO</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1 shadow-md">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-lejai.jpg"
                      alt="Lejai Jayakumar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-brand-dark mt-1.5">Lejai Jayakumar</h4>
                <p className="text-[10px] text-brand-purple font-bold">MD & Co-Founder</p>
              </div>
            </div>

            {/* Badges on Mobile */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 text-[10px] font-bold text-brand-dark shadow-sm">
                <Lightbulb className="w-3 h-3 text-brand-purple" />
                Creative Thinking
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 text-[10px] font-bold text-brand-dark shadow-sm">
                <TrendingUp className="w-3 h-3 text-brand-purple" />
                Strategic Growth
              </span>
            </div>
          </div>
        </div>

        {/* 2 Detailed Founder Profile Cards */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-800 ease-out delay-200 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
