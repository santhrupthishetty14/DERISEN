import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Tag, Megaphone, Code, Sparkles, Target, Users, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { OPERATING_MODEL_SERVICES } from '../utils/constants';

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

const TRUST_BADGES_DATA = [
  { icon: Target, title: 'STRATEGY DRIVEN', desc: 'Purposeful. Focused. Results.' },
  { icon: Users, title: 'CLIENT CENTRIC', desc: 'Your Growth. Our Priority.' },
  { icon: TrendingUp, title: 'DATA BACKED', desc: 'Insights That Drive Impact.' },
  { icon: ShieldCheck, title: 'QUALITY ASSURED', desc: 'Excellence In Everything We Do.' },
];

export const OperatingModel: React.FC = () => {
  return (
    <section id="services-packages" className="py-20 sm:py-28 bg-[#FAFAFC] relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        {/* 1. Header (Slide 4 exact title & subtitle) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-extrabold uppercase tracking-wider mb-3 border border-brand-purple/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span>ONE OPERATING MODEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-[1.15]">
            FOUR SERVICES.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan">
              ONE OPERATING MODEL.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 font-medium">
            Everything Your Brand Needs to Grow — Under One Roof.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan rounded-full mx-auto mt-4" />
        </motion.div>

        {/* 2. Four Cards Grid (Slide 4 Layout - 100% responsive on mobile, tablet & desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-16 sm:mb-20">
          {OPERATING_MODEL_SERVICES.map((service, index) => {
            const IconComp = serviceIconMap[service.iconName] || PenTool;
            const tags = serviceTagsMap[service.id] || [];
            const imageSrc = serviceImageMap[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-md hover:shadow-2xl hover:border-brand-purple/50 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Visual Header with Real 300 DPI Cropped Photography from Slide 4 */}
                <div className="relative h-48 sm:h-52 bg-brand-navy overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />

                  {/* Top Right Number Badge */}
                  <div className="absolute top-3.5 right-4 z-10 font-mono font-black text-xs tracking-wider text-white bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    0{index + 1}
                  </div>

                  {/* Circular Icon in bottom-left */}
                  <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-brand-purple mb-1 block">
                      CORE VERTICAL 0{index + 1}
                    </span>

                    <h3 className="text-xl font-black text-brand-dark mb-1 group-hover:text-brand-purple transition-colors">
                      {service.title}
                    </h3>

                    <h4 className="text-xs font-bold text-gray-700 mb-3">
                      {service.tagline}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-surface-subtle text-gray-600 text-[10.5px] font-semibold border border-gray-200/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Bottom 4 Badges Bar (Slide 4 exact layout: Strategy Driven, Client Centric, Data Backed, Quality Assured) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-md p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {TRUST_BADGES_DATA.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className={`flex items-center gap-3.5 group ${
                    idx > 0 ? 'lg:border-l lg:border-gray-200 lg:pl-6' : ''
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 shadow-sm">
                    <BadgeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-brand-dark group-hover:text-brand-purple transition-colors">
                      {badge.title}
                    </h5>
                    <p className="text-[11px] text-gray-500 font-medium">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
