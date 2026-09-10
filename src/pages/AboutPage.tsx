import React from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { About } from '../sections/About';
import { OperatingModel } from '../sections/OperatingModel';
import { Leadership } from '../sections/Leadership';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { FinalCTA } from '../sections/FinalCTA';

interface AboutPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full">
      {/* 1. Page Hero Banner with High-Resolution Photography */}
      <PageHeroBanner
        badge="DE.RISEN • CREATIVE AGENCY & IT SOLUTIONS"
        title="Transforming Bold Ideas Into"
        highlightedWord="Impactful Brands."
        subtitle="Discover our vision, strategic operating model, and the passionate leadership dedicated to elevating enterprises to new heights."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
        currentPage="About Us"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* 2. Company Story, Vision, Mission & Goals */}
      <About />

      {/* 3. Operating Model */}
      <OperatingModel />

      {/* 4. The Leadership: Shweta Deharkar & Lejai Jayakumar */}
      <Leadership />

      {/* 5. Why Choose DE.RISEN */}
      <WhyChooseUs />

      {/* 6. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};
