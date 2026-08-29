import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 sm:py-36 bg-gradient-to-br from-[#0B041A] via-[#180D38] to-[#100726] text-white text-center relative overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-violet/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-cyan/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          {/* Eyebrow Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-brand-lilac text-xs font-black uppercase tracking-widest rounded-full mb-6 border border-white/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>START YOUR TRANSFORMATION</span>
          </span>

          {/* Main Headline from Requirement 36 */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Let's Make Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-lilac to-brand-cyan">
              Brand Rise.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Whether you need a world-class brand identity, a high-converting digital marketing campaign, or custom web technology—we are ready to elevate your business.
          </p>

          {/* Large Interactive CTA Button with Glow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-4 py-4 pl-9 pr-5 bg-gradient-to-r from-brand-purple via-brand-violet to-brand-violetLight hover:brightness-110 text-white text-base sm:text-lg font-black rounded-full transition-all duration-300 shadow-[0_10px_35px_rgba(99,32,238,0.5)] hover:shadow-[0_15px_45px_rgba(99,32,238,0.7)] hover:-translate-y-1 active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-brand-dark shadow-md transition-transform duration-300 group-hover:translate-x-1.5 group-hover:rotate-[-15deg]">
                <ArrowRight className="w-4 h-4 text-brand-purple" />
              </span>
            </button>
          </div>

          {/* Micro-trust copy */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs font-mono text-white/50">
            <span>✓ 96+ PROJECTS DELIVERED</span>
            <span>•</span>
            <span>✓ 100% SATISFACTION GUARANTEE</span>
            <span>•</span>
            <span>✓ 24-HOUR CONSULTATION RESPONSE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
