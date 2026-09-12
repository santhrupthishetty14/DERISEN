import React from 'react';
import { PageHeader } from '../components/PageHeader';
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
    <div className="w-full max-w-full overflow-x-clip bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="SERVICES & PACKAGES / COMPREHENSIVE SUITE"
        title="Unified Creative, Digital &"
        highlightWord="Technology Solutions."
        description="From strategic brand identities and performance ad campaigns to bespoke web applications and 3D visual production, explore our end-to-end capabilities."
        breadcrumb="Services & Packages"
        onNavigateHome={() => onNavigate('home')}
        tags={['Brand Identity', 'Graphic & Print', 'Performance Marketing', 'Full-Stack IT', 'Production Stack', 'Retainer Plans']}
      />

      {/* 2. Slide 3: What We Do (Creative Design, Branding, Marketing, IT) */}
      <WhatWeDo />

      {/* 3. Slide 10: Integrated Ecosystem Services & Packages */}
      <ServicesPackages />

      {/* 4. Slide 11: Comprehensive Service Catalog (Filterable Categories) */}
      <ServiceCatalog />

      {/* 5. Slide 12: Digital & Production Ecosystem Stack */}
      <DigitalProduction />

      {/* 6. Slide 8: Structured Work Process Roadmap */}
      <ProcessTimeline />

      {/* 7. Slide 9: Our Core Promise & 6-Node Workflow Pipeline */}
      <Promise />

      {/* 8. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default ServicesPage;
