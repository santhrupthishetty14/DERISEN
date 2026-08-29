import React, { useEffect, useRef, useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { TrustBadge } from '../components/TrustBadge';
import { OPERATING_MODEL_SERVICES, TRUST_BADGES } from '../utils/constants';

export const OperatingModel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
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
      id="services-packages"
      className="py-24 sm:py-28 bg-surface-subtle relative overflow-hidden"
    >
      {/* Subtle Dot Pattern */}
      <div className="dot-pattern top-12 left-10 opacity-10" />
      <div className="dot-pattern bottom-12 right-10 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-800 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="eyebrow">ONE OPERATING MODEL</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-4 leading-tight">
            FOUR SERVICES.<br />
            ONE OPERATING MODEL.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Everything Your Brand Needs to Grow — Under One Roof.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-4" />
        </div>

        {/* 4 Staggered Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-14">
          {OPERATING_MODEL_SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isRevealed={isRevealed}
            />
          ))}
        </div>

        {/* 4 Trust Badges Bottom Strip */}
        <div
          style={{ transitionDelay: '550ms' }}
          className={`bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-800 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {TRUST_BADGES.map((badge) => (
            <TrustBadge
              key={badge.title}
              title={badge.title}
              subtitle={badge.subtitle}
              iconName={badge.iconName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
