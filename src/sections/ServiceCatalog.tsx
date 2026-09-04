import React, { useEffect, useRef, useState } from 'react';
import { CatalogCard } from '../components/CatalogCard';
import { INDIVIDUAL_SERVICES_CATALOG } from '../utils/constants';

// Swiper modules and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export const ServiceCatalog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="individual-services"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="eyebrow">INDIVIDUAL SERVICES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Choose what your brand needs.
          </h2>
          <p className="text-base text-gray-600 font-medium">
            A modular service catalog—from identity and content to digital experiences and production.
          </p>
        </div>

        {/* Swipeable Carousel */}
        <div
          className={`transition-all duration-800 ease-out delay-150 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* We use negative margin and padding to allow box-shadows on cards to not be clipped, while remaining swipeable. */}
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            mousewheel={{
              forceToAxis: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
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
                    onMouseEnter={() => setActiveNumber(cat.number)}
                    onMouseLeave={() => setActiveNumber(null)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet-active {
          background-color: var(--brand-purple) !important;
        }
      `}} />
    </section>
  );
};
