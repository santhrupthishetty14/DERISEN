import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { WorkGallery } from '../sections/WorkGallery';
import { Promise } from '../sections/Promise';
import { FinalCTA } from '../sections/FinalCTA';

interface WorkPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-[#180128] text-white">
      {/* 1. Page Header - Work Gallery & Testimonials Banner with 3D Showcase Animation */}
      <PageHeader
        badge="WORK GALLERY & TESTIMONIALS / IMPACT"
        title="Crafted for Influence,"
        highlightWord="Engineered for Growth."
        description="Explore our curated portfolio of branding identities, high-conversion web platforms, motion graphics, and client testimonials that validate our commitment to excellence."
        breadcrumb="Work & Testimonials"
        onNavigateHome={() => onNavigate('home')}
        tags={['Brand Systems', 'Web Platforms', 'Campaign Creatives', 'Video & 3D Motion', 'Client Endorsements']}
        backgroundVideo="/assets/work-gallery-banner.mp4"
        videoPoster="/assets/work-gallery-banner-poster.jpg"
        fullBackground={true}
        backgroundPosition="object-center lg:object-right"
        backgroundOpacity={0.92}
        theme="dark"
        hudInfo={{
          tag: 'Creative Showcase',
          title: 'Brand Systems • Digital Platforms • 3D Motion',
          status: 'Enterprise Portfolio ROI',
        }}
        floatingBadge={{
          text: '5.0 ★ Client Rating',
          subtext: 'Proven Growth ROI',
        }}
      />

      {/* 2. Slide 8: Work Gallery & Client Testimonials */}
      <WorkGallery onOpenModal={onOpenModal} onNavigate={onNavigate} />

      {/* 3. Slide 9: Our Core Promise & Quality Assurance */}
      <Promise />

      {/* 4. Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default WorkPage;
