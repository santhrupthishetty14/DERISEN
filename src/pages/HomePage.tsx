import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { OperatingModel } from '../sections/OperatingModel';
import { FinalCTA } from '../sections/FinalCTA';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate?: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Slide 2: Hero Section & 4 Pillars Strip */}
      <Hero onOpenModal={onOpenModal} />

      {/* 2. Slide 3: Performance & Statistics (96+, 51+, 2+, 100%) */}
      <Stats />

      {/* 3. Slide 4: One Operating Model & Core Pillars */}
      <OperatingModel />

      {/* 4. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default HomePage;
