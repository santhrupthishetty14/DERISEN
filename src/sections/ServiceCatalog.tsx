import React from 'react';
import { CatalogCard } from '../components/CatalogCard';
import { INDIVIDUAL_SERVICES_CATALOG } from '../utils/constants';

export const ServiceCatalog: React.FC = () => {
  return (
    <section id="individual-services" className="py-24 bg-white relative">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow">INDIVIDUAL SERVICES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Choose what your brand needs.
          </h2>
          <p className="text-base text-gray-600 font-medium">
            A modular service catalog—from identity and content to digital experiences and production.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIVIDUAL_SERVICES_CATALOG.map((cat) => (
            <CatalogCard key={cat.number} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
