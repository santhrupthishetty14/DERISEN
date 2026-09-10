import React from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { WhatWeDo } from '../sections/WhatWeDo';
import { ServicesPackages } from '../sections/ServicesPackages';
import { ServiceCatalog } from '../sections/ServiceCatalog';
import { DigitalProduction } from '../sections/DigitalProduction';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { Promise } from '../sections/Promise';
import { FinalCTA } from '../sections/FinalCTA';

interface ServicesPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full">
      {/* 1. Page Hero Banner with High-Resolution Photography */}
      <PageHeroBanner
        badge="FULL-SPECTRUM SOLUTIONS"
        title="Comprehensive Services & Strategic"
        highlightedWord="Packages."
        subtitle="From brand identity systems and full-stack web platforms to ROI-driven digital marketing and high-end video production."
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85"
        currentPage="Services & Packages"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* 2. What We Do - 4 Core Pillars */}
      <WhatWeDo />

      {/* 3. Comprehensive Services Packages */}
      <ServicesPackages />

      {/* 4. Individual Services Catalog (Filterable) */}
      <ServiceCatalog />

      {/* 5. Digital + Production Stack */}
      <DigitalProduction />

      {/* 6. Structured Work Process (6 Steps) */}
      <ProcessTimeline />

      {/* 7. Our Promise & 6-Node Workflow Pipeline */}
      <Promise />

      {/* 8. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};
