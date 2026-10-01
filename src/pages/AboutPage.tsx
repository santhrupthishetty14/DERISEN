import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { About } from '../sections/About';
import { Leadership } from '../sections/Leadership';
import { OperatingModel } from '../sections/OperatingModel';
import { ClientTestimonials } from '../components/ClientTestimonials';
import { FinalCTA } from '../sections/FinalCTA';

interface AboutPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-[#180128] text-white">
      {/* 1. Dedicated Page Header Banner - Royal Dark Cyber Theme with Background Video Animation */}
      <PageHeader
        badge="ABOUT DE.RISEN / WHO WE ARE"
        title="Architecting Scalable Brands &"
        highlightWord="Digital Futures."
        description="We combine visionary creative direction, enterprise technology, and performance marketing under one unified roof to elevate ambitious brands."
        breadcrumb="About Us"
        onNavigateHome={() => onNavigate('home')}
        tags={['Executive Leadership', 'Vision & Mission', 'Strategic Operating Model', 'Global Delivery']}
        backgroundVideo="/assets/about-custom-video-v3.mp4"
        videoPoster="/assets/about-custom-poster-v3.jpg"
        fullBackground={true}
        theme="dark"
        hudInfo={{
          tag: 'Executive Leadership',
          title: 'Visionary Direction • Scalable Systems',
          status: 'Global Delivery Active',
        }}
        floatingBadge={{
          text: 'Executive Strategic Model',
          subtext: 'End-to-End Synergy',
        }}
      />

      {/* 2. Company Background, Vision, Mission & Goals */}
      <About />

      {/* 3. The Visionaries Behind DE.RISEN */}
      <Leadership />

      {/* 4. Strategic Operating Model & Execution Architecture */}
      <OperatingModel />

      {/* 5. Verified Client Endorsements & Proof of Excellence */}
      <section className="py-12 sm:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <ClientTestimonials />
      </section>

      {/* 6. Direct Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default AboutPage;
