import React, { useEffect, useRef, useState } from 'react';
import { DigitalProdCard } from '../components/DigitalProdCard';
import { DIGITAL_PRODUCTION_SERVICES } from '../utils/constants';

export const DigitalProduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

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

  const pipelineSteps = ['CREATIVE', 'CONTENT', 'VISIBILITY', 'PERFORMANCE', 'DIGITAL EXPERIENCE'];

  return (
    <section
      ref={sectionRef}
      id="digital-production"
      className="py-20 sm:py-28 bg-surface-subtle relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 sm:mb-16 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="eyebrow">DIGITAL + PRODUCTION</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Extend your brand into every touchpoint.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto">
            A connected stack for content, visibility, performance, websites, and technology.
          </p>
        </div>

        {/* 4 Cards (2x2 Grid) */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-16 transition-all duration-800 ease-out delay-150 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {DIGITAL_PRODUCTION_SERVICES.map((service) => (
            <DigitalProdCard key={service.number} service={service} />
          ))}
        </div>

        {/* Bottom Connected Pipeline Strip (Responsive on all screen sizes) */}
        <div
          className={`text-center transition-all duration-700 ease-out delay-300 ${
            isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-8 py-3 sm:py-3.5 bg-brand-lilacSoft border border-brand-lilacBorder rounded-2xl sm:rounded-full text-[11px] sm:text-sm font-extrabold tracking-wider text-brand-purple uppercase shadow-sm max-w-full">
            {pipelineSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {idx < pipelineSteps.length - 1 && (
                  <span className="text-brand-violetLight font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
