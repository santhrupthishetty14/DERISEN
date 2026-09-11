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
    if (!pinTarget || !track) return;

    // Calculate states for each card on scroll/tick
    const updateCardStates = () => {
      if (!track) return;
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

        // Center card scales to 1.04, side cards scale down to 0.88
        const scale = 1.04 - progress * 0.16;
        // Center card is 1.0 opacity, side cards fade to 0.65
        const opacity = 1.0 - progress * 0.35;
        // Inner image parallax
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

    const ctx = gsap.context(() => {
      // Dynamic total scroll distance calculation
      const getScrollDistance = () => {
        if (!track) return 1500;
        return -(track.scrollWidth - window.innerWidth);
      };

      gsap.to(track, {
        x: getScrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 1.6)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            updateCardStates();
          },
          onRefresh: () => {
            updateCardStates();
          },
        },
      });

      // Initial card position & size update
      updateCardStates();
    }, pinTargetRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
      updateCardStates();
    };

    window.addEventListener('resize', handleResize);

    // Refresh triggers after initial render settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      updateCardStates();
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div id="services-packages" className="relative bg-[#FAFAFC]">
      {/* Pinned 100vh Viewport Section */}
      <section
        ref={pinTargetRef}
        className="w-full h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-between py-6 sm:py-8 lg:py-10 relative overflow-hidden bg-[#FAFAFC]"
      >
        {/* Ambient background decorative elements with subtle parallax */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700"
          style={{ transform: `translateX(${scrollProgress * 80}px)` }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700"
          style={{ transform: `translateX(${-scrollProgress * 80}px)` }}
        />
        <div className="dot-pattern top-12 left-12 opacity-15 pointer-events-none" />
        <div className="dot-pattern bottom-12 right-12 opacity-15 pointer-events-none" />

        {/* 1. Header Area */}
        <div className="max-w-[1320px] w-full mx-auto px-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-brand-purple/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>ONE OPERATING MODEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight leading-tight">
              Four Services. <span className="gradient-text">One Unified Ecosystem.</span>
            </h2>
          </div>

          {/* Active Service Pill / Indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-sm">
              <span className="text-xs font-mono font-black text-brand-purple">
                0{activeCardIndex + 1}
              </span>
              <span className="text-xs font-bold text-gray-400">/</span>
              <span className="text-xs font-mono font-bold text-gray-500">
                0{OPERATING_MODEL_SERVICES.length}
              </span>
              <span className="h-3 w-px bg-gray-200 mx-1" />
              <span className="text-xs font-extrabold text-brand-dark hidden sm:inline">
                {OPERATING_MODEL_SERVICES[activeCardIndex]?.title}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-gray-500">
              <span>Scroll to navigate</span>
              <div className="w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center animate-pulse">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Horizontal Scroll Track Area */}
        <div className="w-full relative z-10 my-auto overflow-visible py-4">
          <div
            ref={trackRef}
            className="flex items-center gap-8 sm:gap-12 flex-nowrap will-change-transform"
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
                  className="horizontal-card-item w-[320px] sm:w-[420px] md:w-[480px] lg:w-[500px] flex-shrink-0 bg-white rounded-3xl border border-gray-200/90 shadow-lg overflow-hidden flex flex-col will-change-transform transition-shadow duration-500 hover:shadow-2xl"
                  style={{
                    transformOrigin: 'center center',
                    transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  {/* Card Visual Header with Parallax Window */}
                  <div className="relative h-48 sm:h-56 md:h-64 bg-[#0B041A] overflow-hidden flex-shrink-0">
                    {/* Top Right Number Badge */}
                    <div className="absolute top-4 right-5 z-20 font-mono font-black text-xs tracking-wider text-white bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                      0{index + 1}
                    </div>

                    {/* Parallax Image Container */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={service.title}
                        className="card-parallax-image w-full h-full object-cover will-change-transform pointer-events-none"
                        loading="lazy"
                      />
                      {/* Gradient Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Parallax Icon Badge */}
                    <div className="card-parallax-badge absolute bottom-4 left-6 z-20 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-[0_10px_25px_rgba(99,32,238,0.45)] border-2 border-white/90">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div className="bg-brand-dark/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono font-extrabold text-brand-cyan hidden sm:block">
                        DE.RISEN / PILLAR 0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      {/* Service Title */}
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-brand-dark mb-1.5 flex items-center justify-between">
                        <span>{service.title}</span>
                      </h3>

                      {/* Tagline */}
                      <div className="text-sm font-bold text-brand-purple mb-3.5">
                        {service.tagline}
                      </div>

                      {/* Supporting Description */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-5">
                        {service.description}
                      </p>
                    </div>

                    {/* Feature Tags / Pills */}
                    <div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle text-gray-700 text-[11px] font-bold border border-gray-200/80"
                          >
                            <CheckCircle2 className="w-3 h-3 text-brand-purple" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Animated Purple Progress Line */}
                      <div className="mt-5 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-purple to-brand-violet transition-all duration-500 rounded-full"
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

        {/* 3. Bottom Progress Bar & Navigation Track */}
        <div className="max-w-[1320px] w-full mx-auto px-6 z-10 flex-shrink-0">
          <div className="flex items-center justify-between gap-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm">
            {/* 4 Step Pills */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 flex-grow max-w-2xl">
              {OPERATING_MODEL_SERVICES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`flex flex-col gap-1 transition-all duration-300 ${
                    activeCardIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="font-mono text-brand-purple">0{idx + 1}</span>
                    <span className="text-gray-700 hidden sm:inline truncate max-w-[90px]">
                      {s.title}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        activeCardIndex === idx
                          ? 'w-full bg-gradient-to-r from-brand-purple to-brand-violet'
                          : activeCardIndex > idx
                          ? 'w-full bg-brand-purple/50'
                          : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Scroll Progress Bar */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-400">PROGRESS</span>
              <div className="w-28 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-dark rounded-full transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-xs font-mono font-black text-brand-dark min-w-[36px]">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip (In normal layout flow directly following pinned section) */}
      <div className="bg-white border-t border-gray-200/80 py-12 relative z-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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


