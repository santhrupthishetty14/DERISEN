import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code, CheckCircle, Sparkles, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CorePillar {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: typeof PenTool;
  tags: string[];
}

const PILLARS: CorePillar[] = [
  {
    id: 'creative-design',
    num: '01',
    title: 'Creative Design',
    tagline: 'Visuals That Command Attention',
    description:
      'High-impact brand assets, visual identities, packaging, and digital interfaces that articulate your story with elegance, precision, and clarity.',
    image: '/assets/service-creative-design.jpg',
    icon: PenTool,
    tags: ['Brand Identity', 'Print & Packaging', 'UI/UX Layouts'],
  },
  {
    id: 'branding',
    num: '02',
    title: 'Branding',
    tagline: 'Identities Built to Endure',
    description:
      'Distinctive market positioning, comprehensive brand guidelines, and evocative narrative systems that earn customer trust and brand loyalty.',
    image: '/assets/service-branding.jpg',
    icon: Tag,
    tags: ['Brand Strategy', 'Visual Positioning', 'Brand Bible'],
  },
  {
    id: 'digital-marketing',
    num: '03',
    title: 'Digital Marketing',
    tagline: 'Performance That Drives Growth',
    description:
      'Data-informed performance ads, organic search elevation, and high-conversion funnels engineered to capture intent and compound business ROI.',
    image: '/assets/service-marketing.jpg',
    icon: Megaphone,
    tags: ['Performance Ads', 'Advanced SEO', 'Lead Funnels'],
  },
  {
    id: 'it-solutions',
    num: '04',
    title: 'IT Solutions',
    tagline: 'Engineering That Scales Seamlessly',
    description:
      'High-velocity modern web platforms, bespoke web applications, and resilient cloud architectures built for enterprise security and rapid scale.',
    image: '/assets/service-it-solutions.jpg',
    icon: Code,
    tags: ['Custom Web Apps', 'Cloud Solutions', 'API Systems'],
  },
];

export const WhatWeDo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="py-24 sm:py-32 bg-white relative overflow-hidden w-full max-w-full"
    >
      {/* Ambient background dots & soft gradient */}
      <div className="dot-pattern top-10 left-10 opacity-10" />
      <div className="dot-pattern bottom-10 right-10 opacity-10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* ===================================================================
            Symmetrical Centered Section Header
            =================================================================== */}
        <div
          ref={headingRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="eyebrow inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-card text-white text-xs font-extrabold uppercase tracking-wider rounded-full mb-5 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5 text-brand-purple" />
            <span>WHAT WE DO / CORE CAPABILITIES</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-5 leading-[1.18]">
            We Create Brands That{' '}
            <span className="gradient-text">Inspire, Connect &amp; Grow</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            At DE.RISEN, we combine creativity, strategy, and technology to transform ideas into impactful brand experiences that capture attention, build trust, and fuel sustainable growth.
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-6" />
        </div>

        {/* ===================================================================
            Symmetrical 4-Card Pillar Grid (Equal heights & balanced columns)
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-3xl border border-gray-200/90 hover:border-brand-purple/50 p-5 sm:p-6 shadow-sm hover:shadow-[0_20px_45px_rgba(99,32,238,0.16)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                {/* Cyber Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Aspect-Ratio Visual Frame */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 bg-gray-100 shadow-inner">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Corner Icon Badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#180D38]/90 text-white flex items-center justify-center backdrop-blur-md shadow-md border border-white/20 group-hover:bg-brand-purple transition-colors duration-300">
                      <IconComponent className="w-4 h-4 text-brand-cyan" />
                    </div>

                    {/* Index Number Chip */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono font-black border border-white/10">
                      {pillar.num}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-2.5">
                    <h3 className="text-xl font-black text-brand-dark tracking-tight group-hover:text-brand-purple transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-bold text-brand-purple mt-0.5">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                {/* Capability Tags Footer */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#F8F9FD] group-hover:bg-brand-lilacSoft/50 text-gray-600 group-hover:text-brand-purple text-[11px] font-semibold transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            Symmetrical Bottom Highlight Banner: Creative Production Studio
            =================================================================== */}
        <div
          className={`mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#F8F9FD] via-white to-[#F8F9FD] border border-gray-200/80 p-6 sm:p-7 shadow-sm transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-lg shadow-brand-purple/25 flex-shrink-0">
                <Layers className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h4 className="text-base font-black text-brand-dark">
                  One Unified Team. Zero Fragmented Handoffs.
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Design, branding, performance marketing, and engineering coordinated under one roof.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% In-House Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
