import React, { useEffect, useRef, useState } from 'react';
import { WORKFLOW_PIPELINE } from '../utils/constants';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const Promise: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic workflow pulse cycle
  useEffect(() => {
    if (!isRevealed) return;
    const interval = setInterval(() => {
      setActiveWorkflowIndex((prev) => (prev + 1) % WORKFLOW_PIPELINE.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isRevealed]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background Dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* ===================================================================
            Promise Dark Gradient Feature Banner with Glow Aura
            =================================================================== */}
        <div
          className={`bg-gradient-to-br from-[#12092c] via-[#180D38] to-[#1E1147] rounded-3xl p-8 sm:p-16 text-white text-center shadow-[0_25px_60px_rgba(24,13,56,0.35)] border border-white/20 mb-20 sm:mb-24 relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.98]'
          }`}
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-purple/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-violet/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-md text-brand-lilac text-xs font-black uppercase tracking-widest rounded-full mb-6 border border-white/15 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>OUR PROMISE</span>
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
              Creative Thinking. Strategic Execution.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan">
                Measurable Results.
              </span>
            </h3>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              Every project at <strong className="text-white font-bold">DE.RISEN</strong> is driven by creativity, powered by strategy, and delivered with excellence. We create meaningful brand experiences that inspire trust, accelerate growth, and help businesses rise above the competition.
            </p>
          </div>
        </div>

        {/* ===================================================================
            6-Node Workflow Pipeline (Discover → Strategize → Create → Develop → Launch → Grow)
            =================================================================== */}
        <div
          className={`text-center transition-all duration-800 delay-300 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="eyebrow mb-12">OUR 6-STEP WORKFLOW PIPELINE</div>

          <div className="relative max-w-5xl mx-auto mb-12 px-4">
            {/* Connecting Background Line */}
            <div className="hidden md:block absolute top-7 left-12 right-12 h-1 bg-gray-200 rounded-full z-0 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan transition-all duration-700 ease-out shadow-[0_0_10px_#6320EE]"
                style={{
                  width: `${((activeWorkflowIndex + 1) / WORKFLOW_PIPELINE.length) * 100}%`,
                }}
              />
            </div>

            {/* 6 Workflow Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-4 relative z-10">
              {WORKFLOW_PIPELINE.map((item, index) => {
                const isActive = activeWorkflowIndex === index;
                const isPassed = activeWorkflowIndex >= index;

                return (
                  <div
                    key={item.step}
                    onClick={() => setActiveWorkflowIndex(index)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-14 h-14 rounded-full font-black text-sm flex items-center justify-center mb-3 transition-all duration-500 border-2 ${
                        isActive
                          ? 'bg-gradient-to-tr from-brand-purple to-brand-violet text-white border-white scale-125 shadow-[0_0_25px_#6320EE]'
                          : isPassed
                          ? 'bg-brand-dark text-white border-brand-purple shadow-md'
                          : 'bg-white text-gray-400 border-gray-200 group-hover:border-brand-purple/50'
                      }`}
                    >
                      {isPassed && !isActive ? <Check className="w-5 h-5" /> : item.step}
                    </div>

                    {/* Step Title */}
                    <span
                      className={`text-xs sm:text-sm font-extrabold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? 'text-brand-purple scale-105'
                          : 'text-gray-700 group-hover:text-brand-purple'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breadcrumb Strip matching PDF */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-brand-lilacSoft border border-brand-lilacBorder rounded-full text-xs font-black tracking-wider text-brand-purple uppercase shadow-sm">
            <span>DISCOVER</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-violetLight" />
            <span>STRATEGIZE</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-violetLight" />
            <span>CREATE</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-violetLight" />
            <span>DEVELOP</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-violetLight" />
            <span>LAUNCH</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-violetLight" />
            <span className="text-brand-dark">GROW</span>
          </div>
        </div>
      </div>
    </section>
  );
};
