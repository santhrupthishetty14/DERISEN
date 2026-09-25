import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Tag, Megaphone, Code, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrustBadge } from '../components/TrustBadge';
import { OPERATING_MODEL_SERVICES, TRUST_BADGES } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const serviceIconMap: Record<string, any> = {
  PenTool,
  Tag,
  Megaphone,
  Code,
};

const serviceImageMap: Record<string, string> = {
  'creative-design': '/assets/service-creative-design.jpg',
  'branding': '/assets/service-branding.jpg',
  'digital-marketing': '/assets/service-marketing.jpg',
  'it-solutions': '/assets/service-it-solutions.jpg',
};

const serviceTagsMap: Record<string, string[]> = {
  'creative-design': ['Brand Identity', 'Logo & Guidelines', 'Packaging Design', 'Print Media'],
  'branding': ['Brand Architecture', 'Brand Storytelling', 'Visual Positioning', 'Tone & Voice'],
  'digital-marketing': ['SEO Elevation', 'Meta & Google Ads', 'Lead Generation', 'Content Strategy'],
  'it-solutions': ['Custom Web Apps', 'High-Speed UI/UX', 'Cloud Architecture', '24/7 Support'],
};

export const OperatingModel: React.FC = () => {
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const pinTarget = pinTargetRef.current;
    const track = trackRef.current;
    if (!pinTarget) return;

    const mm = gsap.matchMedia();

    // Desktop Only: Horizontal Scroll Pinning (>= 1024px)
    mm.add('(min-width: 1024px)', () => {
      if (!track) return;

      const updateCardStates = () => {
        const cards = track.querySelectorAll<HTMLDivElement>('.horizontal-card-item');
        const viewportCenter = window.innerWidth / 2;
        const maxDistance = window.innerWidth * 0.45;

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(viewportCenter - cardCenter);
          const progress = Math.min(distance / maxDistance, 1);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }

          const scale = 1.04 - progress * 0.16;
          const opacity = 1.0 - progress * 0.35;
          const normalizedOffset = (cardCenter - viewportCenter) / maxDistance;
          const clampedOffset = Math.max(-1.2, Math.min(1.2, normalizedOffset));
          const imageParallaxX = clampedOffset * -35;
          const badgeParallaxX = clampedOffset * -12;

          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;

          const imgEl = card.querySelector<HTMLImageElement>('.card-parallax-image');
          if (imgEl) {
            imgEl.style.transform = `translateX(${imageParallaxX}px) scale(1.15)`;
          }

          const badgeEl = card.querySelector<HTMLDivElement>('.card-parallax-badge');
          if (badgeEl) {
            badgeEl.style.transform = `translateX(${badgeParallaxX}px)`;
          }

          if (progress < 0.28) {
            card.classList.add('is-focused-card');
          } else {
            card.classList.remove('is-focused-card');
          }
        });

        setActiveCardIndex(closestIndex);
      };

      const getScrollDistance = () => -(track.scrollWidth - window.innerWidth);

      const st = ScrollTrigger.create({
        trigger: pinTarget,
        start: 'top top',
        end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 1.5)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: getScrollDistance,
          ease: 'none',
        }),
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          updateCardStates();
        },
        onRefresh: () => {
          updateCardStates();
        },
      });

      updateCardStates();

      return () => {
        st.kill();
      };
    });

    // Mobile & Tablet (< 1024px): Natural Smooth Stagger Entrance (NO PINNING, NO TRAP)
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        '.mobile-op-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.mobile-op-container',
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div id="services-packages" className="relative bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white w-full max-w-full overflow-hidden">
      {/* =====================================================================
          1. DESKTOP VIEW (>= 1024px): Pinned Horizontal Cinematic Track
          ===================================================================== */}
      <div className="hidden lg:block">
        <section
          ref={pinTargetRef}
          className="w-full h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-between py-8 lg:py-10 relative overflow-hidden bg-transparent text-white"
        >
          {/* Ambient Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-32 -left-32 w-96 h-96 bg-[#620D9C]/20 rounded-full blur-3xl transition-transform duration-700"
              style={{ transform: `translateX(${scrollProgress * 80}px)` }}
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#B063FF]/15 rounded-full blur-3xl transition-transform duration-700"
              style={{ transform: `translateX(${-scrollProgress * 80}px)` }}
            />
          </div>
          <div className="dot-pattern top-12 left-12 opacity-15 pointer-events-none" />
          <div className="dot-pattern bottom-12 right-12 opacity-15 pointer-events-none" />

          {/* Desktop Header */}
          <div className="max-w-[1320px] w-full mx-auto px-6 z-10 flex items-end justify-between gap-4 flex-shrink-0">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B063FF] text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
                <span>ONE OPERATING MODEL</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Four Services. <span className="gradient-text">One Operating Model.</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm text-white">
                <span className="text-xs font-mono font-black text-[#B063FF]">
                  0{activeCardIndex + 1}
                </span>
                <span className="text-xs font-bold text-purple-300/50">/</span>
                <span className="text-xs font-mono font-bold text-purple-300/70">
                  0{OPERATING_MODEL_SERVICES.length}
                </span>
                <span className="h-3 w-px bg-white/20 mx-1" />
                <span className="text-xs font-extrabold text-white truncate max-w-[130px]">
                  {OPERATING_MODEL_SERVICES[activeCardIndex]?.title}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-purple-200/70">
                <span>Scroll to navigate</span>
                <div className="w-6 h-6 rounded-full bg-white/10 text-[#B063FF] flex items-center justify-center animate-pulse">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Track */}
          <div className="w-full relative z-10 my-auto overflow-visible py-4">
            <div
              ref={trackRef}
              className="flex items-center gap-10 flex-nowrap will-change-transform"
              style={{
                paddingLeft: 'max(6vw, calc(50vw - 250px))',
                paddingRight: 'max(6vw, calc(50vw - 250px))',
              }}
            >
              {OPERATING_MODEL_SERVICES.map((service, index) => {
                const IconComp = serviceIconMap[service.iconName] || PenTool;
                const tags = serviceTagsMap[service.id] || [];
                const imageSrc = serviceImageMap[service.id];

                return (
                  <div
                    key={service.id}
                    className="horizontal-card-item w-[480px] lg:w-[500px] flex-shrink-0 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col will-change-transform transition-shadow duration-500 hover:shadow-2xl"
                    style={{
                      transformOrigin: 'center center',
                      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                    }}
                  >
                    <div className="relative h-60 bg-[#0B041A] overflow-hidden flex-shrink-0">
                      <div className="absolute top-4 right-5 z-20 font-mono font-black text-xs tracking-wider text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                        0{index + 1}
                      </div>
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={service.title}
                          className="card-parallax-image w-full h-full object-cover will-change-transform pointer-events-none"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div className="card-parallax-badge absolute bottom-4 left-6 z-20 flex items-center gap-3">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(99,32,238,0.45)] border-2 border-white/90">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono font-extrabold text-[#B063FF]">
                          DE.RISEN / PILLAR 0{index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col justify-between flex-grow bg-white text-slate-900">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-wider text-slate-900 mb-1">
                          {service.title}
                        </h3>
                        <div className="text-sm font-bold text-[#620D9C] mb-3">
                          {service.tagline}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                          {service.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#620D9C] text-[11px] font-bold border border-purple-100"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#620D9C]" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#620D9C] to-[#B063FF] transition-all duration-500 rounded-full"
                            style={{
                              width: activeCardIndex === index ? '100%' : '20%',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Bottom Progress Strip */}
          <div className="max-w-[1320px] w-full mx-auto px-6 z-10 flex-shrink-0">
            <div className="flex items-center justify-between pt-4 border-t border-white/15">
              <div className="flex items-center gap-4 flex-grow max-w-2xl">
                {OPERATING_MODEL_SERVICES.map((s, idx) => (
                  <div key={s.id} className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="font-mono text-[#B063FF]">0{idx + 1}</span>
                      <span className="text-purple-200/80 truncate max-w-[90px]">{s.title}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          activeCardIndex === idx
                            ? 'w-full bg-gradient-to-r from-[#620D9C] to-[#B063FF]'
                            : activeCardIndex > idx
                            ? 'w-full bg-[#620D9C]/50'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-purple-200/60">PROGRESS</span>
                <div className="w-28 h-2 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B063FF] rounded-full transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-black text-white min-w-[36px]">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          2. MOBILE & TABLET VIEW (< 1024px): Natural Fluid Vertical Grid
          ===================================================================== */}
      <div className="block lg:hidden py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B063FF] text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
            <span>ONE OPERATING MODEL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Four Services. <span className="gradient-text">One Operating Model.</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 font-medium mt-2">
            Everything your brand needs to scale under one unified roof.
          </p>
        </div>

        <div className="mobile-op-container max-w-xl mx-auto space-y-6">
          {OPERATING_MODEL_SERVICES.map((service, index) => {
            const IconComp = serviceIconMap[service.iconName] || PenTool;
            const tags = serviceTagsMap[service.id] || [];
            const imageSrc = serviceImageMap[service.id];

            return (
              <div
                key={service.id}
                className="mobile-op-card bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col text-slate-900"
              >
                <div className="relative h-48 sm:h-56 bg-[#0B041A] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 right-4 font-mono font-black text-xs text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    0{index + 1}
                  </div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shadow-md border-2 border-white/90">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-extrabold text-[#B063FF] bg-black/70 px-2.5 py-0.5 rounded-full border border-white/15">
                      PILLAR 0{index + 1}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white text-slate-900">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900">
                      {service.title}
                    </h3>
                    <div className="text-xs sm:text-sm font-bold text-[#620D9C] mb-2">
                      {service.tagline}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#620D9C] text-[10px] font-bold border border-purple-100"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#620D9C]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="bg-[#180128]/90 backdrop-blur-md border-t border-white/10 py-10 sm:py-12 relative z-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .is-focused-card {
          border-color: var(--brand-purple) !important;
          box-shadow: 0 25px 60px -15px rgba(99, 32, 238, 0.28), 0 0 0 1px rgba(99, 32, 238, 0.25) !important;
        }
      `}} />
    </div>
  );
};

export default OperatingModel;
