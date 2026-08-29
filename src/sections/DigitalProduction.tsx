import React from 'react';
import { DigitalProdCard } from '../components/DigitalProdCard';
import { DIGITAL_PRODUCTION_SERVICES } from '../utils/constants';

export const DigitalProduction: React.FC = () => {
  return (
    <section id="digital-production" className="py-24 bg-surface-subtle relative">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow">DIGITAL + PRODUCTION</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Extend your brand into every touchpoint.
          </h2>
          <p className="text-base text-gray-600 font-medium">
            A connected stack for content, visibility, performance, websites, and technology.
          </p>
        </div>

        {/* 4 Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {DIGITAL_PRODUCTION_SERVICES.map((service) => (
            <DigitalProdCard key={service.number} service={service} />
          ))}
        </div>

        {/* Bottom Connected Pipeline Strip */}
        <div className="text-center">
          <div className="inline-block px-8 py-3.5 bg-brand-lilacSoft border border-brand-lilacBorder rounded-full text-xs sm:text-sm font-extrabold tracking-wider text-brand-purple uppercase shadow-sm">
            CREATIVE → CONTENT → VISIBILITY → PERFORMANCE → DIGITAL EXPERIENCE
          </div>
        </div>
      </div>
    </section>
  );
};
