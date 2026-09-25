import React, { useEffect, useRef, useState } from 'react';
import { CatalogCard } from '../components/CatalogCard';
import { INDIVIDUAL_SERVICES_CATALOG } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swiper modules and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, FreeMode, Mousewheel, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export const ServiceCatalog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>('01');
  const [currentSlide, setCurrentSlide] = useState(0);

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
      swiperRef.current.slideTo(INDIVIDUAL_SERVICES_CATALOG.length - 1);
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
      id="individual-services"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="eyebrow">INDIVIDUAL SERVICES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-3">
              Choose what your brand needs.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Explore our 4 core modular services—slide smoothly to view all capabilities.
            </p>
          </div>

          {/* Slider Arrow Controls (Slide smoothly with wrap-around) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous category"
              className="w-12 h-12 rounded-full bg-surface-subtle hover:bg-[#620d9c] text-brand-dark hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#620d9c] shadow-sm hover:shadow-[0_8px_20px_rgba(98,13,156,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next category"
              className="w-12 h-12 rounded-full bg-surface-subtle hover:bg-[#620d9c] text-brand-dark hover:text-white flex items-center justify-center border border-gray-200 hover:border-[#620d9c] shadow-sm hover:shadow-[0_8px_20px_rgba(98,13,156,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Category Quick Slide Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {INDIVIDUAL_SERVICES_CATALOG.map((cat, idx) => {
            const isSelected = activeNumber === cat.number || currentSlide === idx;
            return (
              <button
                key={cat.number}
                onClick={() => handleTabClick(idx, cat.number)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white shadow-[0_4px_16px_rgba(176,99,255,0.4)] scale-105'
                    : 'bg-surface-subtle text-gray-600 border border-gray-200 hover:border-[#620d9c]/40 hover:text-[#620d9c]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {cat.number}
                </span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Swipeable Carousel: 4 cards with ample room to slide smoothly */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className={`transition-all duration-800 ease-out delay-150 relative ${
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
              if (INDIVIDUAL_SERVICES_CATALOG[swiper.activeIndex]) {
                setActiveNumber(INDIVIDUAL_SERVICES_CATALOG[swiper.activeIndex].number);
              }
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
            className="!pb-16 px-2 -mx-2"
          >
            {INDIVIDUAL_SERVICES_CATALOG.map((cat) => (
              <SwiperSlide key={cat.number} className="!h-auto flex">
                <div className="w-full h-full flex flex-col">
                  <CatalogCard
                    category={cat}
                    isActive={activeNumber === cat.number}
                    onClick={() => handleCardClick(cat.number)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet-active {
          background-color: #620d9c !important;
        }
      `}} />
    </section>
  );
};
