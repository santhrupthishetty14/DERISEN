import React from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { About } from '../sections/About';
import { Leadership } from '../sections/Leadership';
import { WhatWeDo } from '../sections/WhatWeDo';
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

      {/* 2. Slide 5: Company Introduction, Story, Vision, Mission & Goals */}
      <About />

      {/* 3. Slide 6: The Visionaries Behind DE.RISEN (Shweta Deharkar & Lejai Jayakumar) */}
      <Leadership />

      {/* 4. Slide 7: What We Do & Why Choose DE.RISEN */}
      <WhatWeDo />

      {/* 5. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default AboutPage;
