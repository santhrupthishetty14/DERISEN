import React, { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS } from '../utils/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
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

  // Auto-progress through steps every 3.5s when revealed, or on manual hover
  useEffect(() => {
    if (!isRevealed) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isRevealed]);

  return (
    <section
      ref={sectionRef}
      id="work-process"
      className="py-24 sm:py-32 bg-surface-subtle relative overflow-hidden"
    >
      {/* Background Dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow">STRUCTURED ROADMAP</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-4">
            Turning Vision into Measurable Success
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            At DE.RISEN, we believe exceptional results are built through a clear strategy, creative innovation, and flawless execution. Our structured 6-step process ensures every project is delivered with precision, purpose, and lasting impact.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-5" />
        </div>

        {/* Interactive Progress Indicator Bar (Desktop) */}
        <div className="hidden lg:block relative max-w-4xl mx-auto mb-12">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan transition-all duration-700 ease-out shadow-[0_0_12px_#6320EE]"
              style={{
                width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-3 text-[11px] font-mono font-bold text-gray-400">
            {PROCESS_STEPS.map((s, idx) => (
              <button
                key={s.number}
                onClick={() => setActiveStep(idx)}
                className={`transition-colors duration-300 ${
                  activeStep === idx
                    ? 'text-brand-purple font-black scale-105'
                    : 'hover:text-gray-700'
                }`}
              >
                {s.number}. {s.title.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Step Cards Grid with Interactive Active States */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PROCESS_STEPS.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(index)}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
                className={`rounded-2xl p-8 sm:p-9 transition-all duration-500 relative cursor-pointer overflow-hidden border flex flex-col justify-between ${
                  isRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${
                  isActive
                    ? 'bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] text-white border-brand-purple shadow-[0_20px_50px_rgba(99,32,238,0.28)] scale-[1.03] -translate-y-1'
                    : 'bg-white text-gray-900 border-gray-200 shadow-sm hover:border-brand-purple/40 hover:-translate-y-0.5'
                }`}
              >
                {/* Top Number & Active Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-full font-black text-base flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-tr from-brand-purple to-brand-violet text-white shadow-[0_0_20px_#6320EE]'
                        : 'bg-surface-subtle text-brand-purple border border-gray-200'
                    }`}
                  >
                    {step.number}
                  </div>

                  {isActive && (
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-brand-lilac bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      <Sparkles className="w-3 h-3 text-brand-cyan" />
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h4
                    className={`text-xl sm:text-2xl font-black mb-3 tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-brand-dark'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-xs sm:text-[13.5px] leading-relaxed transition-colors ${
                      isActive ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono font-bold ${
                    isActive ? 'border-white/10 text-brand-lilac' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <span>STEP 0{index + 1} OF 06</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'translate-x-1 text-brand-cyan' : 'text-gray-300'
                    }`}
                  />
                </div>

                {/* Ambient Radial Glow on Active */}
                {isActive && (
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-purple/30 rounded-full blur-2xl pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
