import React from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
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
    <div className="w-full max-w-full overflow-x-clip">
      {/* 1. Page Hero Banner with High-Resolution Photography */}
      <PageHeroBanner
        badge="FULL-SPECTRUM SOLUTIONS"
        title="Comprehensive Services & Strategic"
        highlightedWord="Packages."
        subtitle="From brand identity systems and full-stack web platforms to ROI-driven digital marketing and high-end video production."
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=95"
        currentPage="Services & Packages"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* 2. Slide 10: Services & Packages Overview */}
      <ServicesPackages />

      {/* 3. Slide 11: Individual Services Catalog (Filterable) */}
      <ServiceCatalog />

      {/* 4. Slide 12: Digital + Production Stack */}
      <DigitalProduction />

      {/* 5. Slide 8: Structured Work Process (6 Steps) */}
      <ProcessTimeline />

      {/* 6. Slide 9: Our Promise & 6-Node Workflow Pipeline */}
      <Promise />

      {/* 7. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default ServicesPage;
