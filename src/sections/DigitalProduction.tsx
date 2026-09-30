import React, { useEffect, useRef, useState } from 'react';
import { DigitalProdCard } from '../components/DigitalProdCard';
import { DIGITAL_PRODUCTION_SERVICES } from '../utils/constants';
import { Sparkles } from 'lucide-react';

export const DigitalProduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>('05');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (num: string) => {
    setActiveNumber(num);
    const cardEl = document.getElementById(`digital-prod-card-${num}`);
    if (cardEl && window.innerWidth < 1024) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCardClick = (num: string) => {
    setActiveNumber((prev) => (prev === num ? null : num));
  };

  return (
    <section
      ref={sectionRef}
      id="digital-production"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden"
    >
      {/* Subtle Grid / Ambient Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-purple-300 uppercase mb-4">
              <span className="w-8 h-px bg-purple-400/60 inline-block" />
              <span>DIGITAL + PRODUCTION STACK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.1] mb-3">
              <div>Extend your brand into</div>
              <div>every touchpoint.</div>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-[15px] text-purple-200/80 leading-relaxed">
              Explore our 4 production modules—click any module below to view all capabilities.
            </p>
          </div>
        </div>

        {/* 4 Category Quick Tabs matching Packages styling & colors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {DIGITAL_PRODUCTION_SERVICES.map((service) => {
            const isSelected = activeNumber === service.number;
            return (
              <button
                key={service.number}
                onClick={() => handleTabClick(service.number)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6320EE] via-[#7C3AED] to-[#8B5CF6] text-white shadow-[0_4px_20px_rgba(99,32,238,0.45)] scale-105 border border-purple-300/40'
                    : 'bg-[#2A0A40] text-purple-200 border border-purple-700/50 hover:bg-[#3A0D5C] hover:border-purple-500/60 hover:text-white'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-purple-700/50 text-purple-200'
                  }`}
                >
                  {service.number}
                </span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Production Category Cards matching Packages 4-column size & layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-16">
          {DIGITAL_PRODUCTION_SERVICES.map((service, idx) => (
            <div
              key={service.number}
              id={`digital-prod-card-${service.number}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="h-full flex flex-col"
            >
              <DigitalProdCard
                service={service}
                isSelected={activeNumber === service.number}
                onClick={() => handleCardClick(service.number)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalProduction;

