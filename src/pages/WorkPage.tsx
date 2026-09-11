import React from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';

interface WorkPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      {/* 1. Page Hero Banner with High-Resolution Photography */}
      <PageHeroBanner
        badge="DELIVERED PROJECTS & CASE STUDIES"
        title="Our Portfolio of Impact &"
        highlightedWord="Delivered Work."
        subtitle="Explore our cross-industry portfolio across branding identities, high-scale web platforms, performance campaigns, and 3D visual production."
        backgroundImage="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=2400&q=95"
        currentPage="Work Gallery"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* 2. Interactive Work Gallery & Client Testimonials */}
      <WorkGallery />

      {/* 3. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};
