import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../utils/constants';
import { ArrowUpRight, Star } from 'lucide-react';

const CATEGORIES = ['All', 'Branding & Identity', 'IT & Web Development', 'Digital Marketing', 'Motion & Video'];

const TESTIMONIALS = [
  {
    name: 'Rajesh Malhotra',
    company: 'Finizon Consulting',
    quote: 'DE.RISEN completely transformed our corporate identity and digital presence. Their attention to detail, brand strategy, and execution speed exceeded every expectation.',
    rating: 5,
    role: 'Managing Director',
  },
  {
    name: 'Ananya Sharma',
    company: 'Sanama Tech Solutions',
    quote: 'The high-performance web platform built by DE.RISEN increased our inbound client conversions by over 240%. True creative and technical masters under one roof.',
    rating: 5,
    role: 'Chief Technology Officer',
  },
];

export const WorkGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="work-gallery" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background Dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow">WORK GALLERY &amp; TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-4 leading-tight">
            Impact That Speaks For Itself
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            A curated showcase of delivered creative assets, brand identities, and high-performance digital systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-4" />
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-dark text-white shadow-md shadow-brand-dark/20 scale-105'
                  : 'bg-surface-subtle text-gray-600 hover:text-brand-purple hover:bg-brand-lilacSoft border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-20">
          {filteredItems.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-purple/50 hover:-translate-y-2 transition-all duration-500 flex flex-col group cursor-view-target"
            >
              {/* Visual Header */}
              <div className="h-48 bg-gradient-to-br from-[#12092c] via-[#1E1147] to-[#180D38] p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-radial from-brand-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-brand-cyan bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-purple">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-white font-black text-2xl tracking-tighter relative z-10">
                  0{idx + 1}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-purple mb-1.5 block">
                    {item.client}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-brand-dark mb-2 leading-snug group-hover:text-brand-purple transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Card Line */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>CASE STUDY</span>
                  <span className="text-brand-purple font-bold">EXPLORE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Strip */}
        <div className="bg-surface-subtle rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="eyebrow">CLIENT ENDORSEMENTS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Trusted by Ambitious Leaders
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-brand-violet text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-brand-dark">{t.name}</h5>
                    <p className="text-[11px] text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
