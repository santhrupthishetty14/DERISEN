import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { About } from '../sections/About';
import { Leadership } from '../sections/Leadership';
import { WhatWeDo } from '../sections/WhatWeDo';
import { ServicesPackages } from '../sections/ServicesPackages';
import { ServiceCatalog } from '../sections/ServiceCatalog';
import { DigitalProduction } from '../sections/DigitalProduction';
import { OperatingModel } from '../sections/OperatingModel';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { Promise } from '../sections/Promise';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';

interface HomePageProps {
  onOpenModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      {/* Slide 1: Hero Banner with 4 Pillars & Dynamic Visual */}
      <Hero onOpenModal={onOpenModal} />

      {/* Slide 2: Key Performance Metrics & Statistics */}
      <Stats />

      {/* Slide 5: Company Introduction, Vision, Mission & Goals */}
      <About />

      {/* Slide 6: The Visionaries Behind DE.RISEN */}
      <Leadership />

      {/* Slide 3: What We Do (Creative Design, Branding, Marketing, IT) */}
      <WhatWeDo />

      {/* Slide 10: Integrated Ecosystem Services & Packages */}
      <ServicesPackages />

      {/* Slide 11: Comprehensive Service Catalog (Filterable Categories) */}
      <ServiceCatalog />

      {/* Slide 12: Digital & Production Ecosystem Stack */}
      <DigitalProduction />

      {/* Slide 4: Strategic Operating Model & Execution Architecture */}
      <OperatingModel />

      {/* Slide 8: Structured Work Process Roadmap */}
      <ProcessTimeline />

      {/* Slide 9: Our Core Promise & 6-Node Workflow Pipeline */}
      <Promise />

      {/* Slide 7: Why Choose DE.RISEN */}
      <WhyChooseUs />

      {/* Slide 8: Work Gallery & Client Testimonials */}
      <WorkGallery />

      {/* Slide 9: Conversion CTA & Let's Connect */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default HomePage;
