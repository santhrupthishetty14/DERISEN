import React, { useEffect, useRef, useState } from 'react';
import { DigitalProdCard } from '../components/DigitalProdCard';
import { DIGITAL_PRODUCTION_SERVICES } from '../utils/constants';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Swiper modules and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export const DigitalProduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
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

  const pipelineSteps = ['CREATIVE', 'CONTENT', 'VISIBILITY', 'PERFORMANCE', 'DIGITAL EXPERIENCE'];

  return (
    <section
      ref={sectionRef}
      id="digital-production"
      className="py-20 sm:py-28 bg-surface-subtle relative overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-brand-violetLight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with Navigation Arrows */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="eyebrow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>DIGITAL + PRODUCTION STACK</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-3">
              Extend your brand into every touchpoint.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Touch or hover any module to activate its dark suite. Drag horizontally with skidding momentum to explore.
            </p>
          </div>

          {/* Controls: Skidding slide arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white text-brand-dark flex items-center justify-center hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-lg hover:shadow-brand-purple/20 transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white text-brand-dark flex items-center justify-center hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-lg hover:shadow-brand-purple/20 transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Swipeable & Draggable Skidding Carousel */}
        <div
          className={`transition-all duration-800 ease-out delay-150 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={1.12}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.9,
              momentumVelocityRatio: 1.1,
              momentumBounce: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.15,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.15,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
                freeMode: false,
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
                    onClick={() => {
                      setActiveNumber((prev) => (prev === service.number ? null : service.number));
                    }}
                    onMouseEnter={() => setActiveNumber(service.number)}
                    onMouseLeave={() => {
                      // Keep active if touched or clicked
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Swipe hint */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 mt-2 mb-10 tracking-wide uppercase">
          <span className="inline-block w-8 h-[1px] bg-gray-200" />
          <span>Swipe or drag to skid through services</span>
          <span className="inline-block w-8 h-[1px] bg-gray-200" />
        </div>

        {/* Bottom Connected Pipeline Strip (Responsive on all screen sizes) */}
        <div
          className={`text-center transition-all duration-700 ease-out delay-300 ${
            isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-8 py-3 sm:py-3.5 bg-brand-lilacSoft border border-brand-lilacBorder rounded-2xl sm:rounded-full text-[11px] sm:text-sm font-extrabold tracking-wider text-brand-purple uppercase shadow-sm max-w-full">
            {pipelineSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {idx < pipelineSteps.length - 1 && (
                  <span className="text-brand-violetLight font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalProduction;
