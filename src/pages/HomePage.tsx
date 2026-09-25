import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';
import { Sparkles, Users } from 'lucide-react';
import { SlideArrowButton } from '../components/SlideArrowButton';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-[#180128] text-white">
      {/* 1. Hero Banner with 4 Core Pillars & Interactive 3D Visual */}
      <Hero onOpenModal={onOpenModal} onNavigate={onNavigate} />

      {/* 2. Key Performance Metrics & Statistics */}
      <Stats />

      {/* Bridge Card to Explore Comprehensive Services */}
      <div className="max-w-[1320px] mx-auto px-6 -mt-8 mb-16 relative z-20">
        <div className="bg-gradient-to-r from-[#180D38] via-[#200d4d] to-[#0e0524] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_20px_50px_rgba(24,13,56,0.22)] flex flex-col lg:flex-row items-center justify-between gap-8 text-white overflow-hidden relative group">
          <div className="space-y-3 text-center lg:text-left max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/30 border border-brand-cyan/40 text-brand-cyan text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Full Spectrum Capabilities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Looking for Retainer Plans or Individual Services?
            </h3>
            <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed">
              Explore our transparent packages, interactive 50+ service catalog, and enterprise production technology stack.
            </p>
            <div className="pt-1 flex justify-center lg:justify-start">
              <SlideArrowButton
                label="Explore Services & Packages"
                onClick={() => onNavigate('services')}
                variant="purple"
                size="lg"
              />
            </div>
          </div>

          {/* 3D Visual Preview Thumbnail */}
          <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
            <div className="relative w-56 sm:w-64 lg:w-72 h-36 sm:h-40 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/15 bg-white/5 backdrop-blur-md">
              <img
                src="/assets/service-branding.jpg"
                alt="Comprehensive Creative Services"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-brand-cyan uppercase tracking-wider">50+ Creative &amp; IT Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Strategic Differentiators: Why Choose DE.RISEN */}
      <WhyChooseUs />

      {/* 5. Company Story & Leadership Teaser Banner */}
      <div className="max-w-[1320px] mx-auto px-6 my-14 relative z-20">
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative group text-slate-900">
          <div className="space-y-3.5 max-w-xl z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#620D9C] text-xs font-bold uppercase tracking-wider border border-purple-200">
              <Users className="w-3.5 h-3.5" />
              <span>Leadership &amp; Vision</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Driven by Strategic Vision &amp; Creative Mastery
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Discover the founders, philosophy, and proprietary operating model that empower DE.RISEN to deliver unmatched brand elevation across industries.
            </p>
            <div className="pt-2 flex justify-center lg:justify-start">
              <SlideArrowButton
                label="Learn About DE.RISEN"
                onClick={() => onNavigate('about')}
                variant="purple"
                size="lg"
              />
            </div>
          </div>

          {/* Real Duo Founders Image Showcase */}
          <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
            <div className="relative w-64 sm:w-72 lg:w-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <img
                src="/assets/visionaries-duo-clean.png"
                alt="DE.RISEN Visionary Founders"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5 text-white text-center">
                <span className="text-[11px] font-bold tracking-wider uppercase text-purple-200">The Founders &amp; Leadership</span>
              </div>
            </div>
          </div>
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
