import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { About } from '../sections/About';
import { Leadership } from '../sections/Leadership';
import { OperatingModel } from '../sections/OperatingModel';
import { FinalCTA } from '../sections/FinalCTA';

interface AboutPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-white">
      {/* 1. Dedicated Page Header Banner */}
      <PageHeader
        badge="ABOUT DE.RISEN / WHO WE ARE"
        title="Architecting Scalable Brands &"
        highlightWord="Digital Futures."
        description="We combine visionary creative direction, enterprise technology, and performance marketing under one unified roof to elevate ambitious brands."
        breadcrumb="About Us"
        onNavigateHome={() => onNavigate('home')}
        tags={['Executive Leadership', 'Vision & Mission', 'Strategic Operating Model', 'Global Delivery']}
      />

      {/* 2. Company Background, Vision, Mission & Goals */}
      <About />

      {/* 3. The Visionaries Behind DE.RISEN */}
      <Leadership />

      {/* 4. Strategic Operating Model & Execution Architecture */}
      <OperatingModel />

      {/* 5. Direct Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default AboutPage;
