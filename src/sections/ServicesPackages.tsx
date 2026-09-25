import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, Check, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSectionBanner } from '../components/AnimatedSectionBanner';

interface ServicesPackagesProps {
  onOpenModal?: () => void;
}

interface ServicePackage {
  num: string;
  id: string;
  badge?: string;
  tag: string;
  title: string;
  desc: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  metaLeft: { label: string; value: string };
  metaRight: { label: string; value: string };
}

export const ServicesPackages: React.FC<ServicesPackagesProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  // Default selected is '03' (Digital Marketing - Most Popular) matching reference
  const [selectedNum, setSelectedNum] = useState<string>('03');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preserved original 4 packages and exact content
  const packages: ServicePackage[] = [
    {
      num: '01',
      id: 'creative-design',
      tag: 'FOR BRAND IDENTITY & VISUALS',
      title: 'Creative Design',
      desc: 'Design that captures attention.',
      detail:
        'High-impact visual identities, custom graphics, marketing collaterals, and unforgettable presentations that communicate your brand message with clarity.',
      icon: PenTool,
      deliverables: [
        'Logo & Complete Brand Identity',
        'Brochures, Posters & Print Collateral',
        'Custom Packaging & Merchandise',
        'High-Conversion UI/UX Wireframes',
      ],
      metaLeft: { label: 'TIMELINE', value: '2–3 weeks' },
      metaRight: { label: 'REVISIONS', value: '3 rounds' },
    },
    {
      num: '02',
      id: 'branding',
      tag: 'FOR STRATEGY & POSITIONING',
      title: 'Branding',
      desc: 'Build a brand people remember.',
      detail:
        'Strategic brand architecture, distinctive market positioning, comprehensive brand guidelines, and evocative storytelling that cements customer loyalty.',
      icon: Tag,
      deliverables: [
        'Strategic Brand Positioning',
        'Comprehensive Brand Guidelines',
        'Tone of Voice & Messaging Bible',
        'Corporate Rebranding Architecture',
      ],
      metaLeft: { label: 'TIMELINE', value: '3–4 weeks' },
      metaRight: { label: 'DELIVERABLE', value: 'Brand Guide' },
    },
    {
      num: '03',
      id: 'digital-marketing',
      badge: 'MOST POPULAR',
      tag: 'FOR GROWTH & PERFORMANCE',
      title: 'Digital Marketing',
      desc: 'Turn visibility into growth.',
      detail:
        'Targeted ad funnels, performance marketing, search engine rank elevation, and viral social media campaigns engineered for measurable ROI and conversion.',
      icon: Megaphone,
      deliverables: [
        'Meta & Google Performance Ads',
        'Advanced SEO & Organic Ranking',
        'Full-Funnel Lead Generation',
        'Content Strategy & Social Media',
      ],
      metaLeft: { label: 'TIMELINE', value: 'Monthly' },
      metaRight: { label: 'REPORTING', value: 'Bi-Weekly' },
    },
    {
      num: '04',
      id: 'it-solutions',
      tag: 'FOR FULL-STACK IT & TECH',
      title: 'IT Solutions',
      desc: 'Smart technology. Seamless experiences.',
      detail:
        'High-performance web applications, responsive corporate platforms, cloud infrastructure, and 24/7 technical engineering tailored to scale your enterprise.',
      icon: Code,
      deliverables: [
        'Custom Web & Web App Development',
        'Ultra-Fast Responsive Architecture',
        'API & Cloud Infrastructure Setup',
        '24/7 Monitoring & Technical Support',
      ],
      metaLeft: { label: 'TIMELINE', value: '4–6 weeks' },
      metaRight: { label: 'SUPPORT', value: '24/7 SLA' },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#24033b] via-[#200236] to-[#180128] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#620d9c]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#4A0573]/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 relative z-10">
        {/* =====================================================================
            HEADER: Preserved original wording with reference styling
            ===================================================================== */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-purple-300 uppercase mb-4">
              <span className="w-8 h-px bg-purple-400/60 inline-block" />
              <span>INTEGRATED ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.1]">
              <div>Everything your</div>
              <div>brand needs.</div>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-[15px] text-purple-200/80 leading-relaxed">
              Explore our 4 core modular packages—click any package below to explore deliverables
              and find the perfect strategic fit for your business.
            </p>
          </div>
        </div>

        {/* =====================================================================
            QUICK TABS: 4 category filter buttons (using exact #620d9c active color)
            ===================================================================== */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedNum === pkg.num;

            return (
              <button
                key={pkg.num}
                onClick={() => setSelectedNum(pkg.num)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white shadow-[0_4px_20px_rgba(176,99,255,0.45)] scale-105 border border-purple-300/40'
                    : 'bg-white/10 text-purple-100 border border-white/15 hover:bg-white/15 hover:border-purple-300/40'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/15 text-purple-200'
                  }`}
                >
                  {pkg.num}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{pkg.title}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            4 SOLUTION PACKAGE CARDS: Exact Design from reference image
            ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-20">
          {packages.map((pkg, idx) => {
            const isSelected = selectedNum === pkg.num;

            return (
              <div
                key={pkg.num}
                onClick={() => setSelectedNum(pkg.num)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNum(pkg.num);
                  }
                }}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
                className={`relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group will-change-transform ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#620D9C] to-[#45056E] text-white shadow-2xl shadow-[#620d9c]/60 -translate-y-3 scale-[1.02] border-2 border-purple-300/40 z-10'
                    : 'bg-white text-slate-900 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2'
                }`}
              >
                {/* Most Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md ${
                        isSelected
                          ? 'bg-white text-[#620D9C] shadow-lg border border-purple-200'
                          : 'bg-[#620D9C] text-white border border-purple-300/40'
                      }`}
                    >
                      <Sparkles className={`w-3 h-3 ${isSelected ? 'text-[#620D9C]' : 'text-purple-200'}`} />
                      <span>{pkg.badge}</span>
                    </span>
                  </div>
                )}

                {/* Light sheen sweep animation on hover */}
                <div className="absolute inset-0 rounded-[28px] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent pointer-events-none overflow-hidden" />

                <div>
                  {/* Category Tag */}
                  <span
                    className={`text-[10.5px] font-mono font-bold tracking-[0.2em] uppercase block mb-3 transition-colors duration-300 ${
                      isSelected ? 'text-purple-200' : 'text-[#620D9C]'
                    }`}
                  >
                    {pkg.tag}
                  </span>

                  {/* Package Title */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3
                      className={`text-xl sm:text-[22px] font-black tracking-tight transition-colors duration-300 ${
                        isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#620D9C]'
                      }`}
                    >
                      {pkg.title}
                    </h3>
                    <span
                      className={`text-xs font-mono font-bold transition-colors duration-300 ${
                        isSelected ? 'text-white/60' : 'text-slate-300'
                      }`}
                    >
                      {pkg.num}
                    </span>
                  </div>

                  {/* Subtitle / Tagline */}
                  <p
                    className={`text-xs font-bold leading-relaxed mb-4 transition-colors duration-300 ${
                      isSelected ? 'text-purple-100 font-extrabold' : 'text-[#620D9C]'
                    }`}
                  >
                    {pkg.desc}
                  </p>

                  {/* Detailed Description */}
                  <p
                    className={`text-xs leading-relaxed mb-6 font-normal transition-colors duration-300 ${
                      isSelected ? 'text-white/85' : 'text-slate-600'
                    }`}
                  >
                    {pkg.detail}
                  </p>

                  {/* Deliverables Bullet List with Checkmarks */}
                  <div
                    className={`space-y-2.5 mb-7 pt-4 border-t border-dashed transition-colors duration-300 ${
                      isSelected ? 'border-white/20' : 'border-slate-200'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 transition-colors duration-300 ${
                        isSelected ? 'text-purple-200' : 'text-slate-400'
                      }`}
                    >
                      Key Deliverables:
                    </span>
                    {pkg.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-xs font-medium leading-snug transition-colors duration-300 ${
                          isSelected ? 'text-white/95' : 'text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 ${
                            isSelected
                              ? 'bg-white text-[#620d9c] shadow-sm'
                              : 'bg-[#620D9C] text-white shadow-sm'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Meta info & Action Button */}
                <div>
                  {/* Meta Specs (Timeline / Revisions) */}
                  <div
                    className={`pt-4 mb-4 border-t grid grid-cols-2 gap-3 transition-colors duration-300 ${
                      isSelected ? 'border-white/20' : 'border-slate-100'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5 transition-colors duration-300 ${
                          isSelected ? 'text-purple-200/75' : 'text-slate-400'
                        }`}
                      >
                        {pkg.metaLeft.label}
                      </span>
                      <span
                        className={`text-xs font-extrabold transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {pkg.metaLeft.value}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5 transition-colors duration-300 ${
                          isSelected ? 'text-purple-200/75' : 'text-slate-400'
                        }`}
                      >
                        {pkg.metaRight.label}
                      </span>
                      <span
                        className={`text-xs font-extrabold transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {pkg.metaRight.value}
                      </span>
                    </div>
                  </div>

                  {/* Request Quote / Book Consultation Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenModal) onOpenModal();
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold transition-all duration-300 group/btn cursor-pointer ${
                      isSelected
                        ? 'text-white hover:text-purple-200'
                        : 'text-[#620D9C] hover:text-[#45056E]'
                    }`}
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Section Banner: IT Solutions & Digital Technology Stack */}
        <AnimatedSectionBanner
          badge="DE.RISEN / IT SOLUTIONS & TECH STACK"
          title="Architecting Resilient"
          highlightWord="Digital Platforms."
          description="From custom enterprise web applications and API architectures to cloud-native platforms, we bridge cutting-edge technology with high-conversion creative design."
          imageSrc="/assets/banner-services.jpg"
          pills={['Enterprise Web Apps', 'Cloud Architecture', '24/7 Monitoring', 'High-Speed Stack']}
          stats={[
            { value: '4 Pillars', label: 'Ecosystem Suite' },
            { value: '99.9%', label: 'Platform Reliability' },
          ]}
          accentGlow="violet"
        />
      </div>
    </section>
  );
};

export default ServicesPackages;

