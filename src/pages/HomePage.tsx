import React from 'react';
import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { OperatingModel } from '../sections/OperatingModel';
import { FinalCTA } from '../sections/FinalCTA';
import { PORTFOLIO_ITEMS } from '../utils/constants';
import { ArrowRight, ArrowUpRight, CheckCircle, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal, onNavigate }) => {
  const featuredWorks = PORTFOLIO_ITEMS.slice(0, 3);

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Hero Section & 4 Pillars Strip */}
      <Hero onOpenModal={onOpenModal} />

      {/* 2. Performance & Statistics (96+, 51+, 2+, 100%) */}
      <Stats />

      {/* 3. About DE.RISEN High-Impact Spotlight (Curated Teaser) */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Image / Visual Collage with Scroll Entrance */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
                  alt="DE.RISEN Agency Team"
                  className="w-full h-[360px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-cyan mb-1 block">
                    FOUNDED IN EXCELLENCE
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold leading-snug">
                    Creative Vision Powered by Technical Precision.
                  </h4>
                </div>
              </div>

              {/* Floating Stat Card with Gentle Levitation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-100 flex items-center gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center font-black text-lg sm:text-xl shadow-inner">
                  96+
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-gray-400">DELIVERED</div>
                  <div className="text-xs sm:text-sm font-black text-brand-dark">Creative Projects</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Story Text with Staggered Scroll Entrance */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 lg:pl-6"
            >
              <span className="eyebrow">WHO WE ARE</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-5 sm:mb-6 leading-tight">
                Where Bold Ideas Rise into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
                  Market Leaders.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-6">
                DE.RISEN was established with a singular mission: to help startups, SMEs, and enterprises transform ambitious visions into powerful brands and high-performing digital systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-subtle border border-gray-200/60 hover:border-brand-purple/40 transition-colors">
                  <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">Strategic Leadership</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Led by Shweta Deharkar & Lejai Jayakumar.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-subtle border border-gray-200/60 hover:border-brand-cyan/40 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">One Unified Model</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Design, branding, tech, and marketing under one roof.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-dark hover:bg-brand-purple text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-lg shadow-brand-dark/20 flex items-center gap-2 group cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Explore Our Story & Leadership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-surface-subtle hover:bg-gray-100 text-brand-dark text-xs sm:text-sm font-bold border border-gray-200 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Operating Model & Core Pillars */}
      <OperatingModel />

      {/* 5. View Full Services & Packages Banner Bar */}
      <section className="py-12 bg-gradient-to-r from-brand-purple to-brand-violet text-white">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-cyan block mb-1">
              FULL-SPECTRUM PACKAGES AVAILABLE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Looking for our full catalog of services & pricing tiers?
            </h3>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-4 rounded-full bg-white text-brand-purple hover:bg-gray-100 text-xs sm:text-sm font-black tracking-wide shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>View All Services & Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. Featured Work Showcase Preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
          >
            <div>
              <span className="eyebrow">SELECTED CASE STUDIES</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-tight">
                Featured Client Work
              </h2>
            </div>
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-pink transition-colors cursor-pointer group"
            >
              <span>Explore All Delivered Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Grid of 3 High-Res Items with Staggered Entrance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredWorks.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => onNavigate('work')}
                className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-purple/50 hover:-translate-y-2 transition-all duration-500 flex flex-col group cursor-pointer bg-white"
              >
                <div className="h-56 sm:h-60 relative overflow-hidden bg-brand-navy">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=85'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-brand-cyan bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-purple transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  {item.metrics && (
                    <div className="absolute bottom-4 right-4">
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {item.metrics}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-purple block mb-1">
                      {item.client}
                    </span>
                    <h4 className="text-base font-black text-brand-dark group-hover:text-brand-purple transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 font-medium">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>VIEW CASE STUDY</span>
                    <span className="text-brand-purple font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Client Testimonial Highlight Card */}
      <section className="py-16 sm:py-20 bg-surface-subtle border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center"
        >
          <div className="flex justify-center gap-1 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold text-brand-dark leading-snug tracking-tight mb-6">
            “DE.RISEN completely transformed our corporate identity and digital presence. Their attention to detail, brand strategy, and execution speed exceeded every expectation.”
          </blockquote>
          <div className="text-sm font-black text-brand-dark">Rajesh Malhotra</div>
          <div className="text-xs text-brand-purple font-semibold">Managing Director, Finizon Consulting</div>
        </motion.div>
      </section>

      {/* 8. Final Conversion CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};
