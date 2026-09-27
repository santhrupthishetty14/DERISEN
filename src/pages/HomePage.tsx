import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { WorkGallery } from '../sections/WorkGallery';
import { FinalCTA } from '../sections/FinalCTA';
import { Sparkles, Users, ArrowUpRight } from 'lucide-react';
import { SlideArrowButton } from '../components/SlideArrowButton';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate: (page: string, anchor?: string) => void;
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
        <div className="bg-gradient-to-r from-[#2B0348] via-[#3B0764] to-[#180128] rounded-3xl p-8 sm:p-10 border border-[#B063FF]/30 shadow-[0_20px_50px_rgba(43,3,72,0.35)] flex flex-col lg:flex-row items-center justify-between gap-8 text-white overflow-hidden relative group">
          <div className="space-y-3 text-center lg:text-left max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/30 border border-[#B063FF]/40 text-[#D8B4FE] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
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
                <span className="text-[11px] font-bold text-[#D8B4FE] uppercase tracking-wider">50+ Creative &amp; IT Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Strategic Differentiators: Why Choose DE.RISEN */}
      <WhyChooseUs />

      {/* 5. Company Story & Leadership Teaser Banner - Symmetrical Executive Flanking Layout */}
      <div className="max-w-[1340px] mx-auto px-6 my-16 relative z-20">
        <div className="relative rounded-[2.5rem] p-8 sm:p-10 lg:p-12 border border-[#B063FF]/30 hover:border-[#B063FF]/60 transition-all duration-700 bg-gradient-to-br from-[#24033b]/95 via-[#1a0129]/95 to-[#130022]/98 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(176,99,255,0.12)] overflow-hidden group">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-[#620D9C]/35 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-[#B063FF]/25 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#B063FF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Symmetrical 3-Part Grid: Left Leader (Shweta), Center Editorial Content, Right Leader (Lejai) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* =========================================================
                LEFT SIDE: Shweta Deharkar (Founder & CEO)
                ========================================================= */}
            <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
              <div
                onClick={() => onNavigate('about', 'leader-shweta')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('about', 'leader-shweta'); }}
                title="Click to view Shweta Deharkar's Executive Bio & Vision"
                className="group/leader relative cursor-pointer select-none transition-transform duration-500 hover:scale-105 active:scale-95 focus:outline-none"
                style={{ animation: 'leaderFloatLeft 6s ease-in-out infinite alternate' }}
              >
                {/* Purple Neon Pulsing Aura */}
                <div
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#620D9C] via-[#B063FF] to-[#9333EA] blur-xl opacity-60 group-hover/leader:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ animation: 'leaderAuraGlow 4s ease-in-out infinite' }}
                />

                {/* Interactive Click Cue Badge (Floats at Top Left) */}
                <div className="absolute -top-3 -left-2 z-30 px-3 py-1 rounded-full bg-[#180128]/95 border border-[#B063FF]/60 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-transform duration-300 group-hover/leader:scale-105">
                  <span className="w-2 h-2 rounded-full bg-[#B063FF] animate-ping" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Founder &amp; CEO</span>
                </div>

                {/* Portrait Cut-Glass Frame */}
                <div className="relative w-52 sm:w-56 lg:w-48 xl:w-56 h-64 sm:h-72 lg:h-72 xl:h-80 rounded-3xl overflow-hidden border-2 border-[#B063FF]/50 group-hover/leader:border-[#B063FF] shadow-2xl bg-gradient-to-b from-[#2a0445] to-[#120120] backdrop-blur-md">
                  <img
                    src="/assets/leader-shweta-cleaned.jpg"
                    alt="Shweta Deharkar - Founder & CEO"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/leader:scale-108 filter brightness-105 contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120120] via-[#120120]/40 to-transparent pointer-events-none" />

                  {/* Bottom Plate with Profile CTA */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-center text-center">
                    <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                      Shweta Deharkar
                    </h4>
                    <p className="text-[11px] font-semibold text-[#D8B4FE]">Founder &amp; Chief Executive</p>
                    
                    {/* Hover reveal CTA pill */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B063FF]/20 border border-[#B063FF]/50 text-white text-[10px] font-bold tracking-wide group-hover/leader:bg-[#B063FF] group-hover/leader:text-[#180128] transition-all duration-300 shadow-md">
                      <span>View Bio &amp; Vision</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover/leader:translate-x-0.5 group-hover/leader:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================
                CENTER CONTENT: Editorial & Strategic Story
                ========================================================= */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-center text-center px-2 sm:px-4 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#620D9C]/30 text-[#D8B4FE] text-xs font-mono font-bold uppercase tracking-widest border border-[#B063FF]/40 shadow-[0_0_20px_rgba(98,13,156,0.3)]">
                <Users className="w-3.5 h-3.5 text-[#B063FF]" />
                <span>Leadership &amp; Vision</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.18] text-white">
                Driven by Strategic Vision &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#B063FF]">
                  Creative Mastery.
                </span>
              </h3>

              <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
                Meet the founders architecting scalable brands and digital futures. Click either founder to explore their career journey, strategic philosophy, and executive leadership.
              </p>

              {/* Strategic Value Tags */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Executive Creative Direction', 'Full-Spectrum Production', 'Enterprise IT Architecture'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-200/90 text-[11px] font-semibold tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <SlideArrowButton
                  label="Learn About DE.RISEN"
                  onClick={() => onNavigate('about', 'leadership')}
                  variant="purple"
                  size="lg"
                />
              </div>
            </div>

            {/* =========================================================
                RIGHT SIDE: Lejai Jayakumar (Managing Director)
                ========================================================= */}
            <div className="lg:col-span-3 flex justify-center order-3">
              <div
                onClick={() => onNavigate('about', 'leader-lejai')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('about', 'leader-lejai'); }}
                title="Click to view Lejai Jayakumar's Strategic Roadmap & Bio"
                className="group/leader relative cursor-pointer select-none transition-transform duration-500 hover:scale-105 active:scale-95 focus:outline-none"
                style={{ animation: 'leaderFloatRight 6s ease-in-out infinite alternate', animationDelay: '1.2s' }}
              >
                {/* Purple Neon Pulsing Aura */}
                <div
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#620D9C] via-[#B063FF] to-[#9333EA] blur-xl opacity-60 group-hover/leader:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ animation: 'leaderAuraGlow 4s ease-in-out infinite', animationDelay: '1.5s' }}
                />

                {/* Interactive Click Cue Badge (Floats at Top Right) */}
                <div className="absolute -top-3 -right-2 z-30 px-3 py-1 rounded-full bg-[#180128]/95 border border-[#B063FF]/60 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-transform duration-300 group-hover/leader:scale-105">
                  <span className="w-2 h-2 rounded-full bg-[#B063FF] animate-ping" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Managing Director</span>
                </div>

                {/* Portrait Cut-Glass Frame */}
                <div className="relative w-52 sm:w-56 lg:w-48 xl:w-56 h-64 sm:h-72 lg:h-72 xl:h-80 rounded-3xl overflow-hidden border-2 border-[#B063FF]/50 group-hover/leader:border-[#B063FF] shadow-2xl bg-gradient-to-b from-[#2a0445] to-[#120120] backdrop-blur-md">
                  <img
                    src="/assets/leader-lejai-cleaned.jpg"
                    alt="Lejai Jayakumar - Managing Director & Co-Founder"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/leader:scale-108 filter brightness-105 contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120120] via-[#120120]/40 to-transparent pointer-events-none" />

                  {/* Bottom Plate with Profile CTA */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-center text-center">
                    <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                      Lejai Jayakumar
                    </h4>
                    <p className="text-[11px] font-semibold text-[#D8B4FE]">Managing Director &amp; Co-Founder</p>
                    
                    {/* Hover reveal CTA pill */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B063FF]/20 border border-[#B063FF]/50 text-white text-[10px] font-bold tracking-wide group-hover/leader:bg-[#B063FF] group-hover/leader:text-[#180128] transition-all duration-300 shadow-md">
                      <span>View Bio &amp; Strategy</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover/leader:translate-x-0.5 group-hover/leader:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. Curated Work Gallery & Verified Client Testimonials */}
      <WorkGallery onOpenModal={onOpenModal} onNavigate={onNavigate} />

      {/* 7. High-Converting Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default HomePage;
