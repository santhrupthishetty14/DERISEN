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
      className="py-24 sm:py-32 bg-surface-subtle relative overflow-hidden"
    >
      {/* Dot Matrix Ambient Patterns matching PDF Slide 6 */}
      <div className="dot-pattern top-8 left-8 opacity-15" />
      <div className="dot-pattern top-8 right-8 opacity-15" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* ===================================================================
            Hero Dual Circular Portraits matching PDF Slide 6
            =================================================================== */}
        <div
          className={`relative mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Leader Portrait Circle (Shweta Deharkar) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center order-2 lg:order-1">
              <div className="relative group">
                {/* Purple Circular Halo Backdrop */}
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1.5 shadow-[0_20px_50px_rgba(99,32,238,0.35)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-shweta.jpg"
                      alt="Shweta Deharkar"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Floating ambient glow */}
                <div className="absolute -inset-4 rounded-full bg-brand-purple/20 blur-2xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
                <div className="text-center mt-4">
                  <h4 className="text-lg font-black text-brand-dark">Shweta Deharkar</h4>
                  <p className="text-xs text-brand-purple font-bold">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Center Header Details */}
            <div className="lg:col-span-4 text-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-brand-purple/60" />
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-brand-purple">
                  THE VISIONARIES BEHIND
                </span>
                <span className="h-px w-6 bg-brand-purple/60" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight mb-4 leading-none">
                DE.RISEN
              </h2>

              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-sm mx-auto mb-8 leading-relaxed">
                Driven by <strong className="text-brand-purple">passion</strong>, guided by{' '}
                <strong className="text-brand-purple">strategy</strong>, and committed to building{' '}
                <strong className="text-brand-purple">impactful brands</strong>.
              </p>

              {/* 2 Core Value Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20 shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-brand-dark">
                      CREATIVE THINKING
                    </h5>
                    <p className="text-[10px] text-gray-500">Ideas that inspire brands that last.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-brand-dark">
                      STRATEGIC GROWTH
                    </h5>
                    <p className="text-[10px] text-gray-500">Solutions that drive measurable impact.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Leader Portrait Circle (Lejai Jayakumar) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center order-3">
              <div className="relative group">
                {/* Purple Circular Halo Backdrop */}
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#8447FF] to-[#00E5FF] p-1.5 shadow-[0_20px_50px_rgba(99,32,238,0.35)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark">
                    <img
                      src="/assets/leader-lejai.jpg"
                      alt="Lejai Jayakumar"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Floating ambient glow */}
                <div className="absolute -inset-4 rounded-full bg-brand-purple/20 blur-2xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
                <div className="text-center mt-4">
                  <h4 className="text-lg font-black text-brand-dark">Lejai Jayakumar</h4>
                  <p className="text-xs text-brand-purple font-bold">Managing Director & Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Detailed Founder Profile Cards */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-800 ease-out delay-200 ${
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
