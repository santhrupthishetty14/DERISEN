import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../utils/constants';
import { PortfolioItem } from '../utils/types';
import { ArrowUpRight, Star, X, CheckCircle, Play, Pause, Volume2, VolumeX, Sparkles, Layers, ShieldCheck, Grid } from 'lucide-react';

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

const BRAND_GUIDELINES_SLIDES = [
  {
    title: 'Brand Guidelines Cover System',
    description: '16:9 Presentation Format with high-contrast gradient cards & responsive visual hierarchy.',
    image: '/assets/corporate-brand-identity.jpg',
  },
  {
    title: 'Typography & Inter Scale',
    description: 'Structured typography scale using Inter Google Fonts with precise line-heights and contrast.',
    image: '/assets/brand-guide-frame-1.jpg',
  },
  {
    title: '12×24 Precision Grid Layout',
    description: 'Unified grid architecture guaranteeing consistent alignment across presentation and stationery.',
    image: '/assets/brand-guide-frame-2.jpg',
  },
  {
    title: 'Color Token Palette & Clear Space',
    description: 'Light and Dark mode variables, signature gradients, and strict logo protection clearances.',
    image: '/assets/brand-guide-frame-3.jpg',
  },
  {
    title: 'Core Deliverables & Deck Master',
    description: 'Comprehensive brand manual, tone of voice, visual identity assets, and corporate toolkit.',
    image: '/assets/brand-guide-frame-4.jpg',
  },
];

const PACKAGING_SLIDES = [
  {
    title: 'Embossed Rigid Box Architecture',
    description: 'Sculptural multi-level blind embossing on soft-touch matte stock with pedestal presentation.',
    image: '/assets/luxury-packaging-clean-1.jpg',
  },
  {
    title: 'Tactile Typography & Rose Gold Foil',
    description: 'Warm metallic foil stamping layered with floral botanical illustrations on luxury paperboard.',
    image: '/assets/luxury-packaging-clean-90.jpg',
  },
  {
    title: 'Fluted Crystal Bottle & Primary Pack',
    description: 'Bespoke cylindrical ribbed fluting with polished wooden cap and crystal-clear fragrance chamber.',
    image: '/assets/luxury-packaging-clean-150.jpg',
  },
  {
    title: 'Precision Unboxing & Secondary Sleeve',
    description: 'Engineered magnetic lid opening mechanism with custom cut-to-measure protective insert.',
    image: '/assets/luxury-packaging-clean-240.jpg',
  },
];

interface WorkGalleryProps {
  onOpenModal?: (service?: string) => void;
  onNavigate?: (page: string) => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onOpenModal, onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setIsPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
      setIsMuted(modalVideoRef.current.muted);
    }
  };

  const handleInquire = () => {
    const service = selectedItem?.title === 'Luxury Product Packaging & Print'
      ? 'Packaging Design'
      : selectedItem?.category || 'Branding & Identity';
    setSelectedItem(null);
    if (onOpenModal) {
      onOpenModal(service);
    } else if (onNavigate) {
      onNavigate('contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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

        {/* Portfolio Grid Cards with Dynamic Showcase Pictures & Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-20">
          {filteredItems.map((item, idx) => {
            const imgSrc = item.imageUrl || GALLERY_IMAGE_MAP[item.category] || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=2000&q=95';

            return (
              <div
                key={item.title}
                onClick={() => {
                  setSelectedItem(item);
                  setActiveSlideIndex(0);
                  setIsPlaying(true);
                  setIsMuted(true);
                }}
                style={{ transitionDelay: `${idx * 120}ms` }}
                className={`bg-white rounded-[26px] border border-slate-100 overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2.5 transition-all duration-500 flex flex-col group cursor-pointer text-slate-900 ${
                  isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
              >
                {/* Visual Header with Real Delivered Work Picture / Video */}
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
                    <span className="text-[#620D9C] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
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

      {/* Case Study Showcase Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div
            className="bg-[#120020] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-30 flex items-center justify-between p-5 sm:p-6 bg-[#180128]/95 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-white bg-[#620D9C] px-3 py-1 rounded-full border border-purple-300/30">
                  {selectedItem.category}
                </span>
                {selectedItem.metrics && (
                  <span className="text-xs font-bold text-[#D8B4FE] bg-[#3B0764]/70 border border-[#B063FF]/40 px-3 py-1 rounded-full">
                    {selectedItem.metrics}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-8 space-y-8">
              {/* Title & Client */}
              <div>
                <span className="text-sm font-bold text-[#B063FF] block mb-1">
                  Client: {selectedItem.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedItem.title}
                </h3>
                <p className="text-sm sm:text-base text-purple-200/80 mt-2 max-w-2xl leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Main Media Showcase (Video + Controls) */}
              <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/15 aspect-video sm:aspect-[16/9] flex items-center justify-center group shadow-2xl">
                {selectedItem.videoUrl ? (
                  <>
                    <video
                      ref={modalVideoRef}
                      src={selectedItem.videoUrl}
                      poster={selectedItem.imageUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-contain bg-[#0a0012]"
                    />
                    {/* Video Overlay Controls */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 opacity-90 hover:opacity-100 transition-opacity">
                      <button
                        onClick={toggleModalPlay}
                        className="text-white hover:text-brand-purple p-1 cursor-pointer"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={toggleModalMute}
                        className="text-white hover:text-brand-purple p-1 cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Special Detailed Section for Corporate Brand Identity & Guidelines */}
              {selectedItem.title === 'Corporate Brand Identity & Guidelines' && (
                <div className="space-y-6">
                  {/* Section Title */}
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#B063FF]" />
                    <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                      Brand Guidelines Toolkit &amp; Slide Breakdown
                    </h4>
                  </div>

                  {/* Slide Carousel Previews */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {BRAND_GUIDELINES_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.title}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`group rounded-xl p-2 border transition-all text-left flex flex-col justify-between cursor-pointer ${
                          activeSlideIndex === idx
                            ? 'bg-purple-900/40 border-[#B063FF] shadow-[0_0_15px_rgba(176,99,255,0.4)]'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black/40 mb-2 relative">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1 bg-black/70 text-[9px] font-mono px-1.5 py-0.5 rounded text-white font-bold">
                            0{idx + 1}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold line-clamp-1 text-purple-200">
                          {slide.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Slide Feature Card */}
                  <div className="bg-gradient-to-r from-purple-950/60 to-brand-navy/60 p-4 sm:p-5 rounded-2xl border border-white/10 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#620D9C]/50 border border-purple-300/30 text-white shrink-0">
                      <Grid className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white mb-1">
                        {BRAND_GUIDELINES_SLIDES[activeSlideIndex % BRAND_GUIDELINES_SLIDES.length].title}
                      </h5>
                      <p className="text-xs text-purple-200/80 leading-relaxed">
                        {BRAND_GUIDELINES_SLIDES[activeSlideIndex % BRAND_GUIDELINES_SLIDES.length].description}
                      </p>
                    </div>
                  </div>

                  {/* Specifications & Deliverables Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#B063FF] mb-2">
                        <Layers className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Architecture</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        12×24 Responsive Grid System, 1920×1080 16:9 Presentation Format, Clean Section Hierarchy.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#C084FC] mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Typography &amp; Modes</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Inter Google Font Scale, Light &amp; Dark Modes switchable via Design Variables, Token Collections.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Brand Governance</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Safe Area Protection, Color Ratio Rules, Stationery Suite, and Multi-Format Asset Exports.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Detailed Section for Luxury Product Packaging & Print */}
              {selectedItem.title === 'Luxury Product Packaging & Print' && (
                <div className="space-y-6">
                  {/* Section Title */}
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#B063FF]" />
                    <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                      Luxury Packaging Architecture &amp; Unboxing Experience
                    </h4>
                  </div>

                  {/* Slide Carousel Previews */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PACKAGING_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.title}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`group rounded-xl p-2 border transition-all text-left flex flex-col justify-between cursor-pointer ${
                          activeSlideIndex === idx
                            ? 'bg-purple-900/40 border-[#B063FF] shadow-[0_0_15px_rgba(176,99,255,0.4)]'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black/40 mb-2 relative">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1 bg-black/70 text-[9px] font-mono px-1.5 py-0.5 rounded text-white font-bold">
                            0{idx + 1}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold line-clamp-1 text-purple-200">
                          {slide.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Slide Feature Card */}
                  <div className="bg-gradient-to-r from-purple-950/60 to-brand-navy/60 p-4 sm:p-5 rounded-2xl border border-white/10 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#620D9C]/50 border border-purple-300/30 text-white shrink-0">
                      <Grid className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white mb-1">
                        {PACKAGING_SLIDES[activeSlideIndex % PACKAGING_SLIDES.length].title}
                      </h5>
                      <p className="text-xs text-purple-200/80 leading-relaxed">
                        {PACKAGING_SLIDES[activeSlideIndex % PACKAGING_SLIDES.length].description}
                      </p>
                    </div>
                  </div>

                  {/* Specifications & Deliverables Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#B063FF] mb-2">
                        <Layers className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Tactile Finishes</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        FSC Soft-Touch Stock, Sculptural Multi-Level Embossing, Rose Gold Foil Stamping &amp; Spot UV.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#C084FC] mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">3D CGI &amp; Vessel</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Fluted Crystal Fragrance Chamber, Custom Wooden Cap Fitting, and Unreal Engine Photorealistic Motion.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Print Production</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Vector Die-lines, Pantone Matching System (PMS), Fold Tolerances, and Industrial Packaging Specs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-purple-200/70">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Delivered under DE.RISEN Full-Spectrum Production SLA</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close Showcase
                  </button>
                  <button
                    onClick={handleInquire}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white text-xs font-bold hover:shadow-[0_4px_20px_rgba(176,99,255,0.5)] transition-all cursor-pointer"
                  >
                    {selectedItem.title === 'Corporate Brand Identity & Guidelines'
                      ? 'Request Brand Guidelines Service →'
                      : selectedItem.title === 'Luxury Product Packaging & Print'
                      ? 'Request Luxury Packaging Service →'
                      : 'Inquire About This Service →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
