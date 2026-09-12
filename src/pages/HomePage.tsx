import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { WhatWeDo } from '../sections/WhatWeDo';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-white">
      {/* 1. Hero Banner with 4 Core Pillars & Interactive 3D Visual */}
      <Hero onOpenModal={onOpenModal} />

      {/* 2. Key Performance Metrics & Statistics */}
      <Stats />

      {/* 3. Core Verticals Overview (Creative Design, Branding, Marketing, IT) */}
      <WhatWeDo />

      {/* Bridge Card to Explore Comprehensive Services */}
      <div className="max-w-[1320px] mx-auto px-6 -mt-8 mb-16 relative z-20">
        <div className="bg-gradient-to-r from-[#180D38] via-[#200d4d] to-[#0e0524] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_15px_40px_rgba(24,13,56,0.18)] flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-cyan text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Spectrum Capabilities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Looking for Retainer Plans or Individual Services?
            </h3>
            <p className="text-white/70 text-sm max-w-xl">
              Explore our transparent packages, interactive 50+ service catalog, and production technology stack.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-sm font-extrabold hover:brightness-110 shadow-lg shadow-brand-purple/40 transition-all cursor-pointer group"
          >
            <span>Explore Services &amp; Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* 4. Strategic Differentiators: Why Choose DE.RISEN */}
      <WhyChooseUs />

      {/* 5. Company Story & Leadership Teaser Banner */}
      <div className="max-w-[1320px] mx-auto px-6 my-12 relative z-20">
        <div className="bg-[#FAFAFC] rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Leadership &amp; Vision</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Driven by Strategic Vision &amp; Multi-Disciplinary Mastery
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Discover the founders, philosophy, and proprietary operating model that empower DE.RISEN to deliver unmatched brand elevation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-brand-navy hover:bg-brand-purple text-white text-sm font-bold shadow-md transition-all cursor-pointer group flex-shrink-0"
          >
            <span>Learn About DE.RISEN</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* 6. Curated Work Gallery & Verified Client Testimonials */}
      <WorkGallery />

      {/* 7. High-Converting Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default HomePage;
