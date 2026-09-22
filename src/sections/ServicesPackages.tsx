import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { AnimatedSectionBanner } from '../components/AnimatedSectionBanner';
import { SlideArrowButton } from '../components/SlideArrowButton';

// Swiper imports for smooth sliding
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, FreeMode, Mousewheel, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

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

  const handleTabClick = (idx: number, num: string) => {
    setCurrentSlide(idx);
    setActiveNumber(num);
    if (swiperRef.current) {
      swiperRef.current.slideTo(idx);
    }
  };

  const handleCardClick = (num: string) => {
    // Only apply dark theme when user explicitly clicks/touches that card
    setActiveNumber((prev) => (prev === num ? null : num));
  };

  const handlePrev = () => {
    if (!swiperRef.current) return;
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(packages.length - 1);
    } else {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (!swiperRef.current) return;
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0);
    } else {
      swiperRef.current.slideNext();
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
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="eyebrow">INTEGRATED ECOSYSTEM</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-3">
              Everything your brand needs.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Explore our 4 core modular packages—slide smoothly to view all capabilities.
            </p>
          </div>

          {/* Slider Arrow Controls (Slide smoothly with wrap-around) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous package"
              className="w-12 h-12 rounded-full bg-white hover:bg-[#51069E] text-brand-dark hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#51069E] shadow-sm hover:shadow-[0_8px_20px_rgba(81,6,158,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next package"
              className="w-12 h-12 rounded-full bg-white hover:bg-[#51069E] text-brand-dark hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#51069E] shadow-sm hover:shadow-[0_8px_20px_rgba(81,6,158,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Category Quick Slide Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            const isSelected = activeNumber === pkg.num || currentSlide === idx;
            return (
              <button
                key={pkg.num}
                onClick={() => handleTabClick(idx, pkg.num)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4B006E] to-[#A855F7] text-white shadow-[0_4px_16px_rgba(75,0,110,0.35)] scale-105'
                    : 'bg-white text-[#111827] border border-gray-200 hover:border-[#A855F7]/40 hover:text-[#4B006E]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {pkg.num}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{pkg.title}</span>
              </button>
            );
          })}
        </div>

        {/* Swipeable Carousel: 4 cards with full room to slide smoothly */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className={`transition-all duration-800 ease-out delay-150 relative mb-16 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex);
            }}
            modules={[Navigation, Pagination, FreeMode, Mousewheel, Autoplay, Keyboard]}
            grabCursor={true}
            simulateTouch={true}
            allowTouchMove={true}
            threshold={4}
            touchRatio={1.5}
            touchAngle={45}
            nested={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.85,
              momentumVelocityRatio: 1.1,
              momentumBounce: true,
            }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            spaceBetween={24}
            slidesPerView={1.15}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.1,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 2.3,
                spaceBetween: 28,
              },
            }}
            className="!pb-14 px-2 -mx-2"
          >
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const isDark = activeNumber === pkg.num;

              return (
                <SwiperSlide key={pkg.num} className="!h-auto flex">
                  <div
                    onClick={() => handleCardClick(pkg.num)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(pkg.num);
                      }
                    }}
                    className={`w-full rounded-2xl p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between cursor-pointer select-none h-full relative overflow-hidden group will-change-transform ${
                      isDark
                        ? 'bg-gradient-to-br from-[#4B006E] via-[#640F8C] to-[#A855F7] text-white shadow-2xl shadow-[#4B006E]/40 border-2 border-white/40 -translate-y-2.5 translate-x-0.5 -rotate-[0.5deg] scale-[1.015]'
                        : 'bg-white text-gray-900 border border-gray-200/90 shadow-sm hover:border-[#A855F7]/60 hover:shadow-xl hover:-translate-y-1.5 hover:translate-x-0.5 hover:-rotate-[0.3deg]'
                    }`}
                  >
                    {/* Ambient background glow when active */}
                    {isDark && (
                      <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none transition-opacity duration-700" />
                    )}

                    {/* Skidding Gloss / Light sheen sweep on hover & touch */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Top Active Indicator Badge */}
                    {isDark && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm animate-in fade-in duration-300">
                        <Check className="w-3.5 h-3.5 text-[#E0D4FC]" />
                        <span>Active</span>
                      </div>
                    )}

                    <div>
                      {/* Header: Icon + Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                            isDark
                              ? 'bg-white text-[#4B006E] shadow-[0_4px_16px_rgba(0,0,0,0.2)] scale-105'
                              : 'bg-gradient-to-r from-[#4B006E] to-[#A855F7] text-white shadow-[#4B006E]/25 group-hover:scale-110'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-3xl font-black font-mono transition-colors ${
                            isDark ? 'text-white/40' : 'text-gray-200 group-hover:text-[#4B006E]/30'
                          }`}
                        >
                          {pkg.num}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h4
                        className={`text-xl sm:text-2xl font-black mb-2 tracking-tight transition-colors ${
                          isDark ? 'text-white' : 'text-brand-dark group-hover:text-[#4B006E]'
                        }`}
                      >
                        {pkg.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] font-bold mb-4 transition-colors ${
                          isDark ? 'text-[#E0D4FC] font-extrabold' : 'text-[#4B006E]'
                        }`}
                      >
                        {pkg.desc}
                      </p>

                      <p
                        className={`text-xs leading-relaxed mb-6 transition-colors ${
                          isDark ? 'text-white/90' : 'text-gray-500'
                        }`}
                      >
                        {pkg.detail}
                      </p>

                      {/* Deliverables Bullet List */}
                      <div
                        className={`space-y-2.5 mb-8 pt-4 border-t transition-colors ${
                          isDark ? 'border-white/20' : 'border-gray-100'
                        }`}
                      >
                        <span
                          className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-2 transition-colors ${
                            isDark ? 'text-[#E0D4FC]' : 'text-gray-400'
                          }`}
                        >
                          Key Deliverables:
                        </span>
                        {pkg.deliverables.map((item, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${
                              isDark ? 'text-white' : 'text-gray-700'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                isDark
                                  ? 'bg-white text-[#4B006E]'
                                  : 'bg-[#E0D4FC]/60 text-[#4B006E]'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>


                    {/* Bottom Action */}
                    <div
                      className={`pt-4 border-t flex items-center justify-between gap-4 transition-colors ${
                        isDark ? 'border-white/20' : 'border-gray-100'
                      }`}
                    >
                      <div onClick={(e) => e.stopPropagation()}>
                        <SlideArrowButton
                          label="Book Consultation"
                          onClick={() => {
                            if (onOpenModal) onOpenModal();
                          }}
                          variant={isDark ? 'navy' : 'purple'}
                          size="sm"
                        />
                      </div>
                      <span
                        className={`text-xs font-mono font-bold transition-colors ${
                          isDark ? 'text-white/70' : 'text-gray-400'
                        }`}
                      >
                        {pkg.num}/04
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
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
