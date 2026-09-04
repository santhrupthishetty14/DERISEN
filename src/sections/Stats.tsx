import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Users, Briefcase, ThumbsUp, LucideIcon } from 'lucide-react';
import { STATS_DATA } from '../utils/constants';
import gsap from 'gsap';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Users,
  Briefcase,
  ThumbsUp,
};

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const separatorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial hidden state for elements
    gsap.set(iconRefs.current.filter(Boolean), { opacity: 0, scale: 0.8, y: 15 });
    gsap.set(numberRefs.current.filter(Boolean), { opacity: 0, y: 10 });
    gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 10 });
    gsap.set(separatorRefs.current.filter(Boolean), { scaleY: 0, transformOrigin: 'top center' });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          triggerStatsAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const triggerStatsAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Step 1: Draw Vertical Separators using scaleY
    tl.to(separatorRefs.current.filter(Boolean), {
      scaleY: 1,
      duration: 0.9,
      ease: 'power2.inOut',
      stagger: 0.1,
    }, 0.1);

    // Step 2: Animated sequence: Icon -> Number -> Label
    STATS_DATA.forEach((stat, index) => {
      const delayOffset = 0.2 + index * 0.14;

      // Icon appears
      tl.to(
        iconRefs.current[index],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.4)',
        },
        delayOffset
      );

      // Number appears and counts from 0
      tl.to(
        numberRefs.current[index],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          onStart: () => {
            animateSingleCounter(index, stat.value);
          },
        },
        delayOffset + 0.15
      );

      // Label appears
      tl.to(
        labelRefs.current[index],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        delayOffset + 0.3
      );
    });
  };

  const animateSingleCounter = (index: number, target: number) => {
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * target);

      setCounts((prev) => {
        const next = [...prev];
        next[index] = current;
        return next;
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="py-20 sm:py-24 bg-white border-y border-gray-100 relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight mb-3">
            OUR PERFORMANCE. YOURS TRUST
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto" />
        </div>

        {/* 4 Stats Grid Columns with Vertical Separators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative">
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || Rocket;

            return (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center text-center px-4 py-4 sm:py-2"
              >
                {/* 1. Icon in circular gradient badge with AI aura */}
                <div
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-brand-purple via-brand-violet to-brand-cyan text-white flex items-center justify-center mb-5 shadow-[0_8px_20px_rgba(99,32,238,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(56,189,248,0.5)] cursor-pointer"
                >
                  {/* Subtle pulsing AI ring */}
                  <div className="absolute -inset-1.5 rounded-full border border-brand-cyan/40 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-ping" style={{ animationDuration: '2s' }} />
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* 2. Number counting up */}
                <div
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="text-4xl sm:text-5xl lg:text-[54px] font-black text-brand-dark tracking-tight leading-none mb-2"
                >
                  {hasAnimated ? counts[idx] : 0}
                  <span className="text-brand-purple">{stat.suffix}</span>
                </div>

                {/* 3. Label */}
                <div
                  ref={(el) => {
                    labelRefs.current[idx] = el;
                  }}
                  className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-gray-500 max-w-[180px]"
                >
                  {stat.label}
                </div>

                {/* 4. Vertical Separator Drawing with scaleY (Desktop only) */}
                {idx < STATS_DATA.length - 1 && (
                  <div
                    ref={(el) => {
                      separatorRefs.current[idx] = el;
                    }}
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-28 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
