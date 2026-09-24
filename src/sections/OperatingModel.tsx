import React, { useState } from 'react';
import { PenTool, Tag, Megaphone, Code, ArrowRight, Sparkles } from 'lucide-react';
import { TrustBadge } from '../components/TrustBadge';
import { TRUST_BADGES } from '../utils/constants';

interface OperatingModelProps {
  onOpenModal?: () => void;
  onNavigate?: (page: string) => void;
}

interface ServiceCardData {
  num: string;
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceCardData[] = [
  {
    num: '01',
    id: 'creative-design',
    title: 'Creative Design',
    tagline: 'Design that captures attention.',
    icon: PenTool,
  },
  {
    num: '02',
    id: 'branding',
    title: 'Branding',
    tagline: 'Build a brand people remember.',
    icon: Tag,
  },
  {
    num: '03',
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Turn visibility into growth.',
    icon: Megaphone,
  },
  {
    num: '04',
    id: 'it-solutions',
    title: 'IT Solutions',
    tagline: 'Smart technology. Seamless experiences.',
    icon: Code,
  },
];

export const OperatingModel: React.FC<OperatingModelProps> = ({ onOpenModal, onNavigate }) => {
  // Matches exact reference image: 01 and 03 are active purple, 02 and 04 are white
  const [activeCards, setActiveCards] = useState<Record<string, boolean>>({
    '01': true,
    '02': false,
    '03': true,
    '04': false,
  });

  const toggleCard = (num: string) => {
    setActiveCards((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  return (
    <div id="services-packages" className="relative bg-[#FAFAFC] w-full max-w-full overflow-hidden py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="dot-pattern top-8 left-8 opacity-10 pointer-events-none" />
      <div className="dot-pattern bottom-8 right-8 opacity-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 relative z-10">
        {/* =====================================================================
            TOP HEADER: Exact match from reference screenshot
            Left: "Creating Experiences. Driving Growth."
            Right: Description & "Start a conversation ->"
            ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-brand-dark tracking-tight leading-[1.15]">
              <div>Creating Experiences.</div>
              <div>Driving Growth.</div>
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-start lg:items-start text-left">
            <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-3">
              From a first identity to a complete digital presence, every detail is built to
              communicate better, move faster and create lasting impact.
            </p>
            <button
              onClick={() => {
                if (onOpenModal) onOpenModal();
                else if (onNavigate) onNavigate('contact');
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#620d9c] hover:text-[#4A0573] group transition-colors duration-200 cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            MAIN CONTENT: Left Hero Card + Right 2x2 Grid of 4 Service Cards
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-16">
          
          {/* Left Hero Card: "FOUR SERVICES. One operating model." */}
          <div className="lg:col-span-5 relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#4A0573] via-[#620d9c] to-[#360352] text-white flex flex-col justify-between overflow-hidden shadow-2xl shadow-[#620d9c]/25 min-h-[380px] lg:min-h-[460px]">

            {/* Ambient Corner Glow */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Text Content */}
            <div className="relative z-10">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-white/70 uppercase block mb-4">
                FOUR SERVICES.
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.1] mb-5">
                One operating<br />model.
              </h3>
              <p className="text-sm sm:text-base text-purple-100/85 leading-relaxed max-w-xs font-normal">
                Everything your brand needs to grow—under one roof.
              </p>
            </div>

            {/* Bottom Delivered Projects Pill Badge */}
            <div className="relative z-10 pt-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>96+ Projects delivered</span>
              </div>
            </div>
          </div>

          {/* Right 2x2 Grid of 4 Cards: Creative Design, Branding, Digital Marketing, IT Solutions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const isDark = !!activeCards[service.num];

              return (
                <div
                  key={service.num}
                  onClick={() => toggleCard(service.num)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(service.num);
                    }
                  }}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group will-change-transform ${
                    isDark
                      ? 'bg-[#620d9c] text-white shadow-xl shadow-[#620d9c]/35 -translate-y-1.5 border border-purple-300/20'
                      : 'bg-white text-gray-900 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#620d9c]/30 hover:-translate-y-1.5'
                  }`}
                >

                  {/* Subtle sweep gloss animation */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Card Header: Inverted Circle Icon Badge & Service Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isDark
                          ? 'bg-white/20 text-white backdrop-blur-sm group-hover:scale-110'
                          : 'bg-[#620d9c] text-white shadow-[#620d9c]/25 group-hover:scale-110'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <span
                      className={`text-xs font-mono font-bold transition-colors duration-300 ${
                        isDark ? 'text-white/80' : 'text-gray-300'
                      }`}
                    >
                      {service.num}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h4
                      className={`text-lg sm:text-xl font-black tracking-tight mb-1.5 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-brand-dark group-hover:text-[#620d9c]'
                      }`}
                    >
                      {service.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm font-normal leading-relaxed transition-colors duration-300 ${
                        isDark ? 'text-purple-100/80' : 'text-gray-500'
                      }`}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  {/* Bottom Accent Underline Bar */}
                  <div className="pt-4">
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        isDark
                          ? 'w-8 group-hover:w-16 bg-white/40'
                          : 'w-8 group-hover:w-16 bg-purple-200/60 group-hover:bg-[#620d9c]/60'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Trust Badges Strip */}
        <div className="bg-white rounded-2xl border border-gray-200/80 py-8 px-6 sm:px-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => (
              <TrustBadge
                key={badge.title}
                title={badge.title}
                subtitle={badge.subtitle}
                iconName={badge.iconName}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OperatingModel;
