import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Target, Users, Rocket, ShieldCheck, BarChart2, Zap, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WHY_FEATURES = [
  {
    id: 'creative-strategic',
    iconName: 'Lightbulb',
    heading: 'Creative & Strategic Approach',
    description:
      'We blend creativity with strategy to design solutions that are not just visually stunning but also purpose-driven, effective, and rooted in measurable business outcomes.',
    accentColor: '#6320EE',
  },
  {
    id: 'results-matter',
    iconName: 'Target',
    heading: 'Results That Matter',
    description:
      'Every solution we craft is engineered to deliver real, trackable impact — increased visibility, engagement, and sustainable growth that your numbers will reflect.',
    accentColor: '#7C3AED',
  },
  {
    id: 'client-centric',
    iconName: 'Users',
    heading: 'Client-Centric Mindset',
    description:
      "We listen deeply, collaborate closely, and adapt continuously to make sure every deliverable is perfectly aligned to your unique goals and your audience's expectations.",
    accentColor: '#6320EE',
  },
  {
    id: 'innovation',
    iconName: 'Zap',
    heading: 'Innovation at Every Step',
    description:
      'We stay ahead of industry shifts, embracing the latest technologies and emerging trends to ensure your brand consistently leads rather than follows in a competitive market.',
    accentColor: '#7C3AED',
  },
  {
    id: 'quality-assured',
    iconName: 'ShieldCheck',
    heading: 'Uncompromising Quality',
    description:
      'From the first sketch to final delivery, quality is embedded in our process. We apply rigorous standards so every output is polished, precise, and production-ready.',
    accentColor: '#6320EE',
  },
  {
    id: 'data-backed',
    iconName: 'BarChart2',
    heading: 'Data-Backed Decisions',
    description:
      'Creative instinct guided by real analytics. We use performance data and audience insights to refine strategies that continuously improve and compound over time.',
    accentColor: '#7C3AED',
  },
  {
    id: 'full-service',
    iconName: 'Rocket',
    heading: 'Full-Service Under One Roof',
    description:
      'Design, branding, marketing, and IT — all handled seamlessly within a single agency. No fragmented workflows. No missed handoffs. Just coordinated, cohesive execution.',
    accentColor: '#6320EE',
  },
  {
    id: 'proven-track',
    iconName: 'Award',
    heading: 'Proven Track Record',
    description:
      '96+ projects completed, 51+ happy clients, and 100% client satisfaction across industries including healthcare, retail, real estate, education, and enterprise.',
    accentColor: '#7C3AED',
  },
];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Lightbulb,
  Target,
  Users,
  Zap,
  ShieldCheck,
  BarChart2,
  Rocket,
  Award,
};

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLDivElement>(null);
  const headingLine2Ref = useRef<HTMLDivElement>(null);
  const headingLine3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingItemRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Set initial hidden states (no layout shift) ─────────────────────
      gsap.set(
        [headingLine1Ref.current, headingLine2Ref.current, headingLine3Ref.current],
        { y: 48, opacity: 0 }
      );
      gsap.set(subtitleRef.current, { y: 24, opacity: 0 });
      gsap.set(iconRefs.current.filter(Boolean), { scale: 0.8, opacity: 0 });
      gsap.set(headingItemRefs.current.filter(Boolean), { y: 15, opacity: 0 });
      gsap.set(descRefs.current.filter(Boolean), { opacity: 0 });
      gsap.set(accentRefs.current.filter(Boolean), { scaleX: 0, transformOrigin: 'left center' });

      // ─── Section heading reveal ──────────────────────────────────────────
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
          once: true,
        },
        defaults: { ease: 'power4.out' },
      });

      headingTl
        .to(headingLine1Ref.current, { y: 0, opacity: 1, duration: 0.8 }, 0)
        .to(headingLine2Ref.current, { y: 0, opacity: 1, duration: 0.8 }, 0.14)
        .to(headingLine3Ref.current, { y: 0, opacity: 1, duration: 0.85 }, 0.28)
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }, 0.46);

      // ─── Feature cards: Staggered icon → heading → desc sequence ────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          WHY_FEATURES.forEach((_, i) => {
            const cardDelay = (i % 4) * 0.1 + Math.floor(i / 4) * 0.08;

            const cardTl = gsap.timeline({ delay: cardDelay });

            // Step 1: Icon scales in from 0.8 → 1
            cardTl.to(iconRefs.current[i], {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: 'back.out(1.3)',
            });

            // Step 2: Heading translates up
            cardTl.to(
              headingItemRefs.current[i],
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
              },
              '-=0.3'
            );

            // Step 3: Description fades in
            cardTl.to(
              descRefs.current[i],
              {
                opacity: 1,
                duration: 0.55,
                ease: 'power2.out',
              },
              '-=0.2'
            );

            // Step 4: Accent line draws from left
            cardTl.to(
              accentRefs.current[i],
              {
                scaleX: 1,
                duration: 0.45,
                ease: 'power2.inOut',
              },
              '-=0.3'
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-24 sm:py-32 bg-[#F8F9FD] relative overflow-hidden"
    >
      {/* Subtle ambient dot patterns */}
      <div className="dot-pattern top-12 left-10 opacity-10" />
      <div className="dot-pattern bottom-12 right-10 opacity-10" />

      {/* Soft gradient halo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">

        {/* ─── Section Header ─────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="eyebrow">WHY CHOOSE DE.RISEN?</span>

          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-black text-brand-dark tracking-tight leading-[1.12] mb-5">
            {/* Each heading line sits in overflow-hidden mask */}
            <div className="overflow-hidden pb-1">
              <div ref={headingLine1Ref}>Creating Brands That</div>
            </div>
            <div className="overflow-hidden pb-1">
              <div ref={headingLine2Ref}>
                <span className="gradient-text">Leave a Lasting</span>
              </div>
            </div>
            <div className="overflow-hidden pb-1">
              <div ref={headingLine3Ref}>Impression</div>
            </div>
          </h2>

          <p
            ref={subtitleRef}
            className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto"
          >
            Your brand deserves more than ordinary solutions. At DE.RISEN, we combine
            creativity, strategy, and innovation to craft powerful brand experiences
            that capture attention, build trust, and fuel sustainable growth.
          </p>
        </div>

        {/* ─── 8 Feature Cards Grid (4 × 2) ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {WHY_FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName];
            const isHovered = hoveredId === feature.id;

            return (
              <div
                key={feature.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative bg-white rounded-2xl border p-6 sm:p-7 flex flex-col gap-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default ${
                  isHovered
                    ? 'border-brand-purple/50 shadow-[0_16px_36px_rgba(99,32,238,0.13)] -translate-y-1.5'
                    : 'border-gray-200/90 shadow-sm translate-y-0'
                }`}
              >
                {/* ── Icon badge: scale 0.8 → 1 on scroll enter, translate-y on hover ── */}
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20 transition-transform duration-300 ${
                    isHovered ? '-translate-y-1 scale-110' : 'scale-100'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>

                {/* ── Heading: translateY 15px → 0 on scroll enter ─────────────────── */}
                <h4
                  ref={(el) => {
                    headingItemRefs.current[index] = el;
                  }}
                  className={`text-sm sm:text-[15px] font-extrabold text-brand-dark leading-snug transition-colors duration-300 ${
                    isHovered ? 'text-brand-purple' : ''
                  }`}
                >
                  {feature.heading}
                </h4>

                {/* ── Description: opacity 0 → 1 on scroll enter ───────────────────── */}
                <p
                  ref={(el) => {
                    descRefs.current[index] = el;
                  }}
                  className="text-[12.5px] sm:text-xs text-gray-600 leading-relaxed flex-grow"
                >
                  {feature.description}
                </p>

                {/* ── Accent Line: scaleX 0 → 1 (draws from left), expands fully on hover ── */}
                <div
                  ref={(el) => {
                    accentRefs.current[index] = el;
                  }}
                  className={`h-0.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered
                      ? 'w-full bg-gradient-to-r from-brand-purple to-brand-violet'
                      : 'w-10 bg-gradient-to-r from-brand-purple to-brand-violet'
                  }`}
                  style={{
                    /* GSAP controls initial scaleX; override width with tailwind on hover only */
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ─── Bottom CTA Banner (Promise Strip) ──────────────────────────── */}
        <div className="mt-16 bg-gradient-to-r from-brand-dark via-brand-card to-[#12092c] rounded-2xl p-8 sm:p-10 text-white text-center border border-white/10 shadow-[0_20px_50px_rgba(24,13,56,0.3)] relative overflow-hidden">
          {/* Ambient radial glow inside banner */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,32,238,0.3),transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-3">
              We Don't Just Build Brands.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac to-brand-violetLight">
                We Make Them Rise.
              </span>
            </h3>
            <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
              Partner with DE.RISEN and experience the difference a dedicated, full-service creative
              agency can make — from the first idea to your brand's lasting legacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
