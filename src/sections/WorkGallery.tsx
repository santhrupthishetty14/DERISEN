import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../utils/constants';
import { ArrowUpRight, Star } from 'lucide-react';

const CATEGORIES = ['All', 'Branding & Identity', 'IT & Web Development', 'Digital Marketing', 'Motion & Video'];

const TESTIMONIALS = [
  {
    name: 'Rajesh Malhotra',
    company: 'Global Strategy & Management Advisory',
    quote: 'DE.RISEN completely transformed our corporate identity and digital presence. Their attention to detail, brand strategy, and execution speed exceeded every expectation.',
    rating: 5,
    role: 'Managing Director',
  },
  {
    name: 'Ananya Sharma',
    company: 'NextGen Cloud & Technology Solutions',
    quote: 'The high-performance web platform built by DE.RISEN increased our inbound client conversions by over 240%. True creative and technical masters under one roof.',
    rating: 5,
    role: 'Chief Technology Officer',
  },
];

const GALLERY_IMAGE_MAP: Record<string, string> = {
  'Branding & Identity': '/assets/service-branding.jpg',
  'IT & Web Development': '/assets/service-it-solutions.jpg',
  'Digital Marketing': '/assets/service-marketing.jpg',
  'Motion & Video': '/assets/service-creative-design.jpg',
};

export const WorkGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative overflow-hidden"
    >
      {/* Background Dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="eyebrow text-[#B063FF]">WORK GALLERY &amp; TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Impact That Speaks For Itself
          </h2>
          <p className="text-base sm:text-lg text-purple-200/80 font-medium max-w-2xl mx-auto">
            A curated showcase of delivered creative assets, brand identities, and high-performance digital systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-4" />
        </div>

        {/* Filter Category Pills */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14 transition-all duration-700 ease-out delay-150 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white shadow-[0_4px_16px_rgba(176,99,255,0.4)] scale-105'
                  : 'bg-white/10 text-purple-100 hover:text-white hover:border-[#B063FF]/50 border border-white/15 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Cards with Dynamic Showcase Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-20">
          {filteredItems.map((item, idx) => {
            const imgSrc = item.imageUrl || GALLERY_IMAGE_MAP[item.category] || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=2000&q=95';

            return (
              <div
                key={item.title}
                style={{ transitionDelay: `${idx * 120}ms` }}
                className={`bg-white rounded-[26px] border border-slate-100 overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2.5 transition-all duration-500 flex flex-col group cursor-pointer text-slate-900 ${
                  isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
              >
                {/* Visual Header with Real Delivered Work Picture */}
                <div className="h-56 relative overflow-hidden bg-brand-navy">
                  {item.videoUrl ? (
                    <video
                      key={item.videoUrl}
                      ref={(el) => {
                        if (el) {
                          el.defaultMuted = true;
                          el.muted = true;
                          const p = el.play();
                          if (p !== undefined) {
                            p.catch(() => {
                              el.muted = true;
                              el.play().catch(() => {});
                            });
                          }
                        }
                      }}
                      src={item.videoUrl}
                      poster={imgSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                    />
                  ) : (
                    <img
                      src={imgSrc}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/20" />

                  {/* Shimmer Light Reflection on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-white bg-[#620D9C]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-300/30 shadow-sm">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#620D9C] shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="text-white font-black text-2xl tracking-tighter drop-shadow-md">
                        0{idx + 1}
                      </div>
                      {item.metrics && (
                        <span className="text-[10px] font-bold text-white bg-[#620D9C] border border-purple-300/40 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                          {item.metrics}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <span className="text-xs font-bold text-[#620D9C] mb-1.5 block">
                      {item.client}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-[#620D9C] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Card Line */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>CASE STUDY</span>
                    <span className="text-[#620D9C] font-bold group-hover:translate-x-1 transition-transform">
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Strip */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/15 p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="eyebrow text-[#B063FF]">CLIENT ENDORSEMENTS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trusted by Ambitious Leaders
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-[26px] p-7 sm:p-8 border border-slate-100 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-purple-200 transition-all duration-300 text-slate-900"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4B006E] to-[#620D9C] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-[#620d9c]/25">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">{t.name}</h5>
                    <p className="text-[11px] text-slate-500 font-medium">{t.role}, {t.company}</p>
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
