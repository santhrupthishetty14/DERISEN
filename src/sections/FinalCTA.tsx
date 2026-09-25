import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SlideArrowButton } from '../components/SlideArrowButton';

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
      className="py-28 sm:py-36 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white text-center relative overflow-hidden w-full max-w-full"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#620D9C]/25 rounded-full blur-[120px]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#4B006E]/30 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#B063FF]/20 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          {/* Eyebrow Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-purple-200 text-xs font-black uppercase tracking-widest rounded-full mb-6 border border-white/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
            <span>START YOUR TRANSFORMATION</span>
          </span>

          {/* Main Headline from Requirement 36 */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Let's Make Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C084FC] to-[#B063FF]">
              Brand Rise.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Whether you need a world-class brand identity, a high-converting digital marketing campaign, or custom web technology—we are ready to elevate your business.
          </p>

          {/* Large Interactive CTA Button with Sliding Arrow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SlideArrowButton
              label="Let's Talk"
              onClick={onOpenModal}
              size="lg"
              variant="purple"
            />
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
