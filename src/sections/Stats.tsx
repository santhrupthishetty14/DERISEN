import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Users, Briefcase, ThumbsUp, LucideIcon } from 'lucide-react';
import { STATS_DATA } from '../utils/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Users,
  Briefcase,
  ThumbsUp,
};

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const separatorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initial state
    gsap.set(iconRefs.current.filter(Boolean), { opacity: 0, scale: 0.8, y: 15 });
    gsap.set(numberRefs.current.filter(Boolean), { opacity: 0, y: 10 });
    gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 10 });
    gsap.set(separatorRefs.current.filter(Boolean), { scaleY: 0, transformOrigin: 'top center' });

    const triggerStatsAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 1: Draw Vertical Separators
      tl.to(
        separatorRefs.current.filter(Boolean),
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.1,
        },
        0.1
      );

      // Step 2: Icons, Numbers, and Labels
      STATS_DATA.forEach((stat, index) => {
        const delayOffset = 0.15 + index * 0.12;

        tl.to(
          iconRefs.current[index],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.5)',
          },
          delayOffset
        );

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
          delayOffset + 0.1
        );

        tl.to(
          labelRefs.current[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          delayOffset + 0.2
        );
      });
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 92%',
      onEnter: () => {
        setHasAnimated(true);
        triggerStatsAnimation();
      },
      once: true,
    });

    // Immediately trigger if already visible in viewport
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setHasAnimated(true);
      triggerStatsAnimation();
    }

    return () => {
      st.kill();
    };
  }, []);

  const animateSingleCounter = (index: number, target: number) => {
    const duration = 1400;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
      className="py-14 sm:py-20 bg-white border-y border-gray-100 relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight mb-2 sm:mb-3">
            OUR PERFORMANCE. YOURS TRUST
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto" />
        </div>

        {/* 4 Stats in Responsive 2x2 Grid (Mobile) / 4-Col (Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || Rocket;

            return (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center text-center px-2 sm:px-4 py-3 sm:py-2"
              >
                {/* 1. Icon Circle Badge */}
                <div
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-purple via-brand-violet to-brand-cyan text-white flex items-center justify-center mb-3 sm:mb-5 shadow-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(99,32,238,0.4)] cursor-pointer"
                >
                  <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* 2. Number counting up */}
                <div
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-none mb-1.5 sm:mb-2"
                >
                  {hasAnimated ? counts[idx] : 0}
                  <span className="text-brand-purple">{stat.suffix}</span>
                </div>

                {/* 3. Label */}
                <div
                  ref={(el) => {
                    labelRefs.current[idx] = el;
                  }}
                  className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-gray-500 max-w-[150px] leading-tight"
                >
                  {stat.label}
                </div>

                {/* 4. Vertical Separator for Desktop */}
                {idx < STATS_DATA.length - 1 && (
                  <div
                    ref={(el) => {
                      separatorRefs.current[idx] = el;
                    }}
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent"
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

export default Stats;
