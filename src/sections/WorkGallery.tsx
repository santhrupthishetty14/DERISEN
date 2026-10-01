import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../utils/constants';
import { PortfolioItem } from '../utils/types';
import { ArrowUpRight, Star, X, CheckCircle, CheckCircle2, Play, Pause, Volume2, VolumeX, Sparkles, Layers, ShieldCheck, Grid, Quote } from 'lucide-react';

const CATEGORIES = ['All', 'Branding & Identity', 'IT & Web Development', 'Digital Marketing', 'Motion & Video'];

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  category: string;
  verified: boolean;
  avatarColor: string;
  highlightMetric?: string;
  initials: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'agna-gold',
    name: 'Arjun Varma',
    role: 'Managing Director',
    company: 'AGNA GOLD AND DIAMONDS',
    quote: 'DE.RISEN completely elevated our luxury retail presence. From bespoke jewellery packaging systems to high-end festival ad campaigns, their refined design standards and execution excellence set a new benchmark in our industry.',
    rating: 5,
    category: 'Luxury Branding & Packaging',
    verified: true,
    avatarColor: 'from-[#EAB308] to-[#CA8A04]',
    highlightMetric: 'Luxury Identity & Packaging',
    initials: 'AG',
  },
  {
    id: 'hindu-mahasabha',
    name: 'Dr. R. K. Shastri',
    role: 'State IT & Communications Head',
    company: 'Akhil Bharat Hindu Mahasabha Karnataka',
    quote: 'Their strategic approach to digital communication, IT infrastructure, and social outreach across Karnataka has been phenomenal. DE.RISEN delivers institutional-grade quality with remarkable agility and cultural alignment.',
    rating: 5,
    category: 'Digital Strategy & IT Infrastructure',
    verified: true,
    avatarColor: 'from-[#F97316] to-[#C2410C]',
    highlightMetric: 'State-Level Digital Outreach',
    initials: 'AB',
  },
  {
    id: 'brickbunk-ventures',
    name: 'Vikramaditya Hegde',
    role: 'Founder & Managing Partner',
    company: 'BRICKBUNK Ventures',
    quote: 'From our enterprise investment portal to investor presentation systems, BRICKBUNK Ventures found an exceptional partner in DE.RISEN. They masterfully bridge executive finance logic with cutting-edge visual technology.',
    rating: 5,
    category: 'Enterprise Web & Brand Platform',
    verified: true,
    avatarColor: 'from-[#6320EE] to-[#7C3AED]',
    highlightMetric: 'Venture Capital Portal & Decks',
    initials: 'BV',
  },
  {
    id: 'nexaflow-cloud',
    name: 'Siddharth Mehta',
    role: 'Chief Technology Officer',
    company: 'NexaFlow Enterprise Cloud',
    quote: 'The high-performance SaaS web platform and 3D product animations engineered by DE.RISEN accelerated our inbound demo conversions by 310%. Their full-stack capabilities are world-class.',
    rating: 5,
    category: 'Full-Stack IT & 3D Motion',
    verified: true,
    avatarColor: 'from-[#3B82F6] to-[#1D4ED8]',
    highlightMetric: '+310% Demo Conversions',
    initials: 'NF',
  },
  {
    id: 'aura-wellness',
    name: 'Dr. Nandini Rao',
    role: 'Founder & Medical Director',
    company: 'Aura Aesthetics & Wellness',
    quote: 'Our patient acquisition grew 4x within 90 days of launching the omnichannel digital campaigns created by DE.RISEN. Their aesthetic sensitivity and ad performance data gave us unmatched market authority.',
    rating: 5,
    category: 'Omnichannel Digital Marketing',
    verified: true,
    avatarColor: 'from-[#EC4899] to-[#BE185D]',
    highlightMetric: '4× Patient Inquiries Scaled',
    initials: 'AA',
  },
  {
    id: 'zenith-diagnostics',
    name: 'Karthik Narayan',
    role: 'Director of Operations',
    company: 'Zenith Diagnostic Laboratories',
    quote: 'DE.RISEN streamlined our entire digital booking architecture and overhauled our healthcare brand identity. The user experience is effortless and our corporate perception has never been stronger.',
    rating: 5,
    category: 'Healthcare UI/UX & Brand System',
    verified: true,
    avatarColor: 'from-[#06B6D4] to-[#0E7490]',
    highlightMetric: 'Seamless Healthcare Portal',
    initials: 'ZD',
  },
  {
    id: 'kavya-couture',
    name: 'Kavya Singhania',
    role: 'Creative Director & Founder',
    company: 'Kavya Couture & Luxury Living',
    quote: 'Every seasonal catalogue, digital lookbook, and high-fashion video asset produced by DE.RISEN radiates uncompromising craftsmanship. They captured our luxury brand soul with striking elegance.',
    rating: 5,
    category: 'Luxury Fashion & 3D Creative',
    verified: true,
    avatarColor: 'from-[#A855F7] to-[#7E22CE]',
    highlightMetric: 'High-Fashion Digital Lookbook',
    initials: 'KC',
  },
  {
    id: 'vanguard-capital',
    name: 'Rohan Deshmukh',
    role: 'Senior Managing Partner',
    company: 'Vanguard Capital Partners',
    quote: 'DE.RISEN transformed our global fund decks and private equity website. Their acute understanding of institutional trust and modern typography sets them miles ahead of traditional agencies.',
    rating: 5,
    category: 'Fintech & Investment Advisory',
    verified: true,
    avatarColor: 'from-[#10B981] to-[#047857]',
    highlightMetric: 'Institutional Advisory Deck',
    initials: 'VC',
  },
  {
    id: 'urbanroots-organic',
    name: 'Meera Kulkarni',
    role: 'Co-Founder & CEO',
    company: 'UrbanRoots Organic Foods',
    quote: 'The sustainable packaging design and viral video campaign created by DE.RISEN enabled us to secure nationwide retail shelf space across 200+ organic supermarkets within just 4 months.',
    rating: 5,
    category: 'Sustainable Packaging & Video',
    verified: true,
    avatarColor: 'from-[#84CC16] to-[#4D7C0F]',
    highlightMetric: '200+ Retail Stores Reached',
    initials: 'UR',
  },
  {
    id: 'apex-logistics',
    name: 'Farhan Qureshi',
    role: 'Chief Commercial Officer',
    company: 'Apex Logistics Global',
    quote: 'Reliable, innovative, and deeply committed. They rebuilt our real-time client tracking web interface and unified our global fleet branding across 6 distribution hubs.',
    rating: 5,
    category: 'Global Logistics IT & Branding',
    verified: true,
    avatarColor: 'from-[#6366F1] to-[#4338CA]',
    highlightMetric: 'Global Fleet Tracking Interface',
    initials: 'AL',
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
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const row1 = TESTIMONIALS.slice(0, 5);
  const row2 = TESTIMONIALS.slice(5, 10);

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
                  ? 'bg-gradient-to-r from-[#6320EE] via-[#7C3AED] to-[#8B5CF6] text-white shadow-[0_4px_16px_rgba(99,32,238,0.4)] scale-105'
                  : 'bg-white/10 text-purple-100 hover:text-white hover:border-[#7C3AED]/50 border border-white/15 shadow-sm'
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
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-white bg-[#6320EE]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-300/30 shadow-sm">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6320EE] shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="text-white font-black text-2xl tracking-tighter drop-shadow-md">
                        0{idx + 1}
                      </div>
                      {item.metrics && (
                        <span className="text-[10px] font-bold text-white bg-[#6320EE] border border-purple-300/40 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                          {item.metrics}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <span className="text-xs font-bold text-[#6320EE] mb-1.5 block">
                      {item.client}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-[#6320EE] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Card Line */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>CASE STUDY</span>
                    <span className="text-[#6320EE] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Client Reviews & Testimonials Carousel Showcase */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#1f0233]/90 via-[#190129]/95 to-[#130022]/98 border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6320EE]/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B063FF]/15 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Header & Controls Bar */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-purple-400/20 text-[#D8B4FE] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
                <span>Verified Client Endorsements</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Trusted by Ambitious Leaders &amp; Visionary Brands
              </h3>
              <p className="text-purple-200/80 text-sm sm:text-base mt-2 leading-relaxed">
                Explore real reviews from enterprise leaders across luxury gold &amp; diamonds, institutional organizations, venture funds, healthcare, and technology.
              </p>
            </div>

            {/* Metrics Chips & Marquee Pause/Play Control */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>5.0 ★ Client Rating</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B063FF]" />
                <span>100% Verified Partners</span>
              </div>

              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                title={isMarqueePaused ? 'Resume auto-scroll animation' : 'Pause auto-scroll animation'}
              >
                {isMarqueePaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Play Stream</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#B063FF]" />
                    <span>Pause Stream</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Continuous Infinite Animated Marquee Streams */}
          <div className="relative z-10 space-y-6">
            {/* Stream 1: Forward Direction (Left) */}
            <div className="relative w-full overflow-hidden marquee-track">
              {/* Left / Right Fade Curtains */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#190129] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#190129] to-transparent" />

              <div className={`animate-marquee-left flex gap-6 ${isMarqueePaused ? 'marquee-paused' : ''}`}>
                {[...row1, ...row1].map((t, idx) => (
                  <div
                    key={`stream1-${t.id}-${idx}`}
                    className="w-[330px] sm:w-[410px] md:w-[440px] shrink-0 bg-gradient-to-b from-[#25033d]/95 via-[#1c012d]/95 to-[#130022]/98 backdrop-blur-xl border border-white/15 hover:border-[#B063FF] rounded-[26px] p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(176,99,255,0.35)] transition-all duration-300 flex flex-col justify-between group/card select-none"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-amber-300 ml-1">5.0</span>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Verified Client</span>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative mb-5">
                        <Quote className="w-6 h-6 text-[#B063FF]/50 mb-2 -ml-1 group-hover/card:text-[#B063FF] transition-colors" />
                        <p className="text-[13px] sm:text-[14px] text-purple-100/90 font-normal leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* Metric Tag */}
                      {t.highlightMetric && (
                        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-purple-400/20 text-[#D8B4FE] text-[10.5px] font-medium tracking-wide">
                          <Sparkles className="w-3 h-3 text-[#B063FF] shrink-0" />
                          <span>{t.highlightMetric}</span>
                        </div>
                      )}

                      {/* Client Identity with highlighted Company Name */}
                      <div className="flex items-center gap-3 pt-3.5 border-t border-white/10">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-lg shadow-[#6320EE]/20 shrink-0 border border-white/20`}
                        >
                          {t.initials}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="text-sm font-bold text-white tracking-tight group-hover/card:text-[#D8B4FE] transition-colors truncate">
                            {t.name}
                          </h5>
                          <div className="text-[11px] font-bold text-[#B063FF] tracking-wide uppercase truncate">
                            {t.company}
                          </div>
                          <div className="text-[11px] text-purple-200/60 font-medium truncate">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stream 2: Reverse Direction (Right) */}
            <div className="relative w-full overflow-hidden marquee-track">
              {/* Left / Right Fade Curtains */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#190129] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#190129] to-transparent" />

              <div className={`animate-marquee-right flex gap-6 ${isMarqueePaused ? 'marquee-paused' : ''}`}>
                {[...row2, ...row2].map((t, idx) => (
                  <div
                    key={`stream2-${t.id}-${idx}`}
                    className="w-[330px] sm:w-[410px] md:w-[440px] shrink-0 bg-gradient-to-b from-[#25033d]/95 via-[#1c012d]/95 to-[#130022]/98 backdrop-blur-xl border border-white/15 hover:border-[#B063FF] rounded-[26px] p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(176,99,255,0.35)] transition-all duration-300 flex flex-col justify-between group/card select-none"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-amber-300 ml-1">5.0</span>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Verified Client</span>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative mb-5">
                        <Quote className="w-6 h-6 text-[#B063FF]/50 mb-2 -ml-1 group-hover/card:text-[#B063FF] transition-colors" />
                        <p className="text-[13px] sm:text-[14px] text-purple-100/90 font-normal leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* Metric Tag */}
                      {t.highlightMetric && (
                        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-purple-400/20 text-[#D8B4FE] text-[10.5px] font-medium tracking-wide">
                          <Sparkles className="w-3 h-3 text-[#B063FF] shrink-0" />
                          <span>{t.highlightMetric}</span>
                        </div>
                      )}

                      {/* Client Identity with highlighted Company Name */}
                      <div className="flex items-center gap-3 pt-3.5 border-t border-white/10">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-lg shadow-[#6320EE]/20 shrink-0 border border-white/20`}
                        >
                          {t.initials}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="text-sm font-bold text-white tracking-tight group-hover/card:text-[#D8B4FE] transition-colors truncate">
                            {t.name}
                          </h5>
                          <div className="text-[11px] font-bold text-[#B063FF] tracking-wide uppercase truncate">
                            {t.company}
                          </div>
                          <div className="text-[11px] text-purple-200/60 font-medium truncate">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Helper Note */}
            <div className="pt-2 text-center">
              <span className="text-xs text-purple-200/50 font-medium">
                Tip: Hover over or tap any card to pause stream and read details
              </span>
            </div>
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
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-white bg-[#6320EE] px-3 py-1 rounded-full border border-purple-300/30">
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
                    <div className="p-2.5 rounded-xl bg-[#6320EE]/50 border border-purple-300/30 text-white shrink-0">
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
                    <div className="p-2.5 rounded-xl bg-[#6320EE]/50 border border-purple-300/30 text-white shrink-0">
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
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6320EE] via-[#7C3AED] to-[#8B5CF6] text-white text-xs font-bold hover:shadow-[0_4px_20px_rgba(99,32,238,0.5)] transition-all cursor-pointer"
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
