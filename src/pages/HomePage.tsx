import React from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Stats } from '../sections/Stats';
import { ServicesPackages } from '../sections/ServicesPackages';
import { OperatingModel } from '../sections/OperatingModel';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate?: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      {/* 1. Hero Section with Cinematic Video & 4 Pillars Strip */}
      <Hero onOpenModal={onOpenModal} />

      {/* 2. About Section: Introduction, Vision, Mission & Goals */}
      <About />

      {/* 3. Performance & Statistics: (96+, 51+, 2+, 100%) */}
      <Stats />

      {/* 4. Services & Packages: Integrated Ecosystem with Staggered Cards */}
      <ServicesPackages />

      {/* 5. Process & Operating Model: Structure & Execution Architecture */}
      <OperatingModel />
      <ProcessTimeline />

      {/* 6. Work Gallery & Client Testimonials */}
      <WorkGallery />

      {/* 7. Contact / Conversion Final CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default HomePage;
