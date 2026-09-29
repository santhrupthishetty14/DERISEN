import React, { useEffect, useRef, useState } from 'react';
import { CatalogCard } from '../components/CatalogCard';
import { INDIVIDUAL_SERVICES_CATALOG } from '../utils/constants';
export const ServiceCatalog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>('01');

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
    const cardEl = document.getElementById(`service-catalog-card-${num}`);
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
      id="individual-services"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-purple-300 uppercase mb-4">
              <span className="w-8 h-px bg-purple-400/60 inline-block" />
              <span>INDIVIDUAL SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.1] mb-3">
              <div>Choose what your</div>
              <div>brand needs.</div>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-[15px] text-purple-200/80 leading-relaxed">
              Explore our 4 core modular services—click any category below to view all capabilities.
            </p>
          </div>
        </div>

        {/* 4 Category Quick Tabs matching Packages styling & colors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {INDIVIDUAL_SERVICES_CATALOG.map((cat) => {
            const isSelected = activeNumber === cat.number;
            return (
              <button
                key={cat.number}
                onClick={() => handleTabClick(cat.number)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6320EE] via-[#7C3AED] to-[#8B5CF6] text-white shadow-[0_4px_20px_rgba(99,32,238,0.45)] scale-105 border border-purple-300/40'
                    : 'bg-white/10 text-purple-100 border border-white/15 hover:bg-white/15 hover:border-purple-300/40'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/15 text-purple-200'
                  }`}
                >
                  {cat.number}
                </span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Solution Category Cards matching Packages 4-column size and layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-16">
          {INDIVIDUAL_SERVICES_CATALOG.map((cat, idx) => (
            <div
              key={cat.number}
              id={`service-catalog-card-${cat.number}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="h-full flex flex-col"
            >
              <CatalogCard
                category={cat}
                isActive={activeNumber === cat.number}
                onClick={() => handleCardClick(cat.number)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
