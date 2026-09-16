import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { AnimatedSectionBanner } from '../components/AnimatedSectionBanner';
import { SlideArrowButton } from '../components/SlideArrowButton';

// Swiper imports for smooth sliding
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ServicesPackagesProps {
  onOpenModal?: () => void;
}

interface ServicePackage {
  num: string;
  title: string;
  desc: string;
  detail: string;
  icon: typeof PenTool;
  deliverables: string[];
  gradient: string;
}

export const ServicesPackages: React.FC<ServicesPackagesProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const packages: ServicePackage[] = [
    {
      num: '01',
      title: 'Creative Design',
      desc: 'Design that captures attention.',
      detail: 'High-impact visual identities, custom graphics, marketing collaterals, and unforgettable presentations that communicate your brand message with clarity.',
      icon: PenTool,
      deliverables: [
        'Logo & Complete Brand Identity',
        'Brochures, Posters & Print Collateral',
        'Custom Packaging & Merchandise',
        'High-Conversion UI/UX Wireframes'
      ],
      gradient: 'from-[#51069E] to-[#7C3AED]',
    },
    {
      num: '02',
      title: 'Branding',
      desc: 'Build a brand people remember.',
      detail: 'Strategic brand architecture, distinctive market positioning, comprehensive brand guidelines, and evocative storytelling that cements customer loyalty.',
      icon: Tag,
      deliverables: [
        'Strategic Brand Positioning',
        'Comprehensive Brand Guidelines',
        'Tone of Voice & Messaging Bible',
        'Corporate Rebranding Architecture'
      ],
      gradient: 'from-[#180D38] to-[#51069E]',
    },
    {
      num: '03',
      title: 'Digital Marketing',
      desc: 'Turn visibility into growth.',
      detail: 'Targeted ad funnels, performance marketing, search engine rank elevation, and viral social media campaigns engineered for measurable ROI and conversion.',
      icon: Megaphone,
      deliverables: [
        'Meta & Google Performance Ads',
        'Advanced SEO & Organic Ranking',
        'Full-Funnel Lead Generation',
        'Content Strategy & Social Media'
      ],
      gradient: 'from-[#51069E] to-[#38BDF8]',
    },
    {
      num: '04',
      title: 'IT Solutions',
      desc: 'Smart technology. Seamless experiences.',
      detail: 'High-performance web applications, responsive corporate platforms, cloud infrastructure, and 24/7 technical engineering tailored to scale your enterprise.',
      icon: Code,
      deliverables: [
        'Custom Web & Web App Development',
        'Ultra-Fast Responsive Architecture',
        'API & Cloud Infrastructure Setup',
        '24/7 Monitoring & Technical Support'
      ],
      gradient: 'from-[#12092c] to-[#51069E]',
    },
  ];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 sm:py-28 bg-surface-subtle relative overflow-hidden"
    >
      {/* Ambient background dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow">INTEGRATED ECOSYSTEM</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-4 leading-tight">
            Everything your brand needs.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            One unified sliding operating model across creative, branding, digital marketing, and technology.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-4" />
        </div>

        {/* ── Interactive Service Slide Switcher Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={pkg.num}
                onClick={() => handleTabClick(idx)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#51069E] text-white shadow-[0_4px_18px_rgba(81,6,158,0.35)] scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#51069E]/50 hover:text-[#51069E]'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {pkg.num}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{pkg.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── Sliding Services Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Dynamic Dark Feature Card */}
          <div
            className={`lg:col-span-4 bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] rounded-3xl p-8 sm:p-10 text-white shadow-[0_25px_60px_rgba(24,13,56,0.35)] border border-white/15 flex flex-col justify-between relative overflow-hidden transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'
            }`}
          >
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#51069E]/40 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan font-mono">
                  {packages[activeIndex].num}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-brand-lilac font-mono text-xs font-bold border border-white/15">
                  SLIDE {activeIndex + 1} OF 04
                </span>
              </div>

              <div className="w-12 h-12 rounded-full bg-[#51069E] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#51069E]/40">
                {React.createElement(packages[activeIndex].icon, { className: 'w-6 h-6' })}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3 tracking-tight">
                {packages[activeIndex].title}
              </h3>
              <p className="text-sm text-brand-cyan font-semibold mb-4">
                {packages[activeIndex].desc}
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                {packages[activeIndex].detail}
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous service"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#51069E] text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next service"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#51069E] text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <span className="text-[11px] font-mono font-bold text-white/60 tracking-wider">
                SWIPE OR USE ARROWS
              </span>
            </div>
          </div>

          {/* Right Sliding Carousel Cards Container */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1.3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1.7,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              loop={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full !pb-14"
            >
              {packages.map((pkg, idx) => {
                const Icon = pkg.icon;
                const isSelected = activeIndex === idx;

                return (
                  <SwiperSlide key={pkg.num} className="!h-auto flex">
                    <div
                      className={`w-full bg-white rounded-3xl border p-7 sm:p-8 shadow-sm flex flex-col justify-between transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(81,6,158,0.18)] ${
                        isSelected
                          ? 'border-[#51069E] shadow-[0_12px_36px_rgba(81,6,158,0.12)] ring-2 ring-[#51069E]/20'
                          : 'border-gray-200 hover:border-[#51069E]/60'
                      }`}
                    >
                      <div>
                        {/* Header: Icon + Number */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-full bg-[#51069E] text-white flex items-center justify-center shadow-md shadow-[#51069E]/25 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-3xl font-black font-mono text-gray-200 group-hover:text-[#51069E]/30 transition-colors">
                            {pkg.num}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h4 className="text-xl sm:text-2xl font-black text-brand-dark mb-2 tracking-tight group-hover:text-[#51069E] transition-colors">
                          {pkg.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] font-bold text-[#51069E] mb-4">
                          {pkg.desc}
                        </p>

                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                          {pkg.detail}
                        </p>

                        {/* Deliverables Bullet List */}
                        <div className="space-y-2 mb-8 pt-4 border-t border-gray-100">
                          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-2">
                            Key Deliverables:
                          </span>
                          {pkg.deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                              <span className="w-4 h-4 rounded-full bg-brand-lilacSoft text-[#51069E] flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                        <SlideArrowButton
                          label="Book Consultation"
                          onClick={() => {
                            if (onOpenModal) onOpenModal();
                          }}
                          variant="purple"
                          size="sm"
                        />
                        <span className="text-xs font-mono font-bold text-gray-400">
                          {pkg.num}/04
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* Animated Section Banner: IT Solutions & Digital Technology */}
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
          accentGlow="cyan"
        />
      </div>
    </section>
  );
};
