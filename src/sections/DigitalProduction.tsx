import React, { useEffect, useRef, useState } from 'react';
import { DigitalProdCard } from '../components/DigitalProdCard';
import { DIGITAL_PRODUCTION_SERVICES } from '../utils/constants';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Swiper modules and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, FreeMode, Mousewheel, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export const DigitalProduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>('05');
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
      swiperRef.current.slideTo(DIGITAL_PRODUCTION_SERVICES.length - 1);
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
      id="digital-production"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden"
    >
      {/* Subtle Grid / Ambient Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with Navigation Arrows */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="eyebrow flex items-center gap-1.5 text-[#B063FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
              <span>DIGITAL + PRODUCTION STACK</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Extend your brand into every touchpoint.
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 font-medium">
              Explore our 4 production modules—slide smoothly to view all capabilities.
            </p>
          </div>

          {/* Controls: Skidding slide arrows with wrap-around */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center hover:bg-[#620d9c] hover:text-white hover:border-[#620d9c] hover:shadow-lg hover:shadow-[#620d9c]/25 transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center hover:bg-[#620d9c] hover:text-white hover:border-[#620d9c] hover:shadow-lg hover:shadow-[#620d9c]/25 transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* 4 Category Quick Slide Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {DIGITAL_PRODUCTION_SERVICES.map((service, idx) => {
            const isSelected = activeNumber === service.number || currentSlide === idx;
            return (
              <button
                key={service.number}
                onClick={() => handleTabClick(idx, service.number)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white shadow-[0_4px_16px_rgba(176,99,255,0.4)] scale-105'
                    : 'bg-white/10 text-purple-100 border border-white/15 hover:border-purple-300/40 hover:text-white hover:bg-white/15'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white/15 text-purple-200'
                }`}>
                  {service.number}
                </span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Swipeable & Draggable Skidding Carousel */}
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
              if (DIGITAL_PRODUCTION_SERVICES[swiper.activeIndex]) {
                setActiveNumber(DIGITAL_PRODUCTION_SERVICES[swiper.activeIndex].number);
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
            className="!pb-14 px-1 -mx-1"
          >
            {DIGITAL_PRODUCTION_SERVICES.map((service) => (
              <SwiperSlide key={service.number} className="!h-auto flex">
                <div className="w-full h-full flex flex-col">
                  <DigitalProdCard
                    service={service}
                    isSelected={activeNumber === service.number}
                    onClick={() => handleCardClick(service.number)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

