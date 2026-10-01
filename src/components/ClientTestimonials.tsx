import React, { useState } from 'react';
import { Star, CheckCircle2, Play, Pause, Sparkles, ShieldCheck, Quote, Building2 } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  company: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  category: string;
  verified: boolean;
  avatarColor: string;
  badgeColor: string;
  highlightMetric: string;
  initials: string;
  isPriorityClient?: boolean;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'agna-gold',
    company: 'AGNA GOLD AND DIAMONDS',
    name: 'Arjun Varma',
    role: 'Managing Director',
    quote: 'DE.RISEN completely elevated our luxury retail presence. From bespoke jewellery packaging systems to high-end festival ad campaigns, their refined design standards and execution excellence set a new benchmark in our industry.',
    rating: 5,
    category: 'Luxury Branding & Packaging',
    verified: true,
    avatarColor: 'from-[#EAB308] via-[#F59E0B] to-[#B45309]',
    badgeColor: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    highlightMetric: 'Luxury Identity & Packaging Suite',
    initials: 'AG',
    isPriorityClient: true,
  },
  {
    id: 'hindu-mahasabha',
    company: 'Akhil Bharat Hindu Mahasabha Karnataka',
    name: 'Dr. R. K. Shastri',
    role: 'State IT & Communications Head',
    quote: 'Their strategic approach to digital communication, IT infrastructure, and social outreach across Karnataka has been phenomenal. DE.RISEN delivers institutional-grade quality with remarkable agility and cultural alignment.',
    rating: 5,
    category: 'Digital Strategy & IT Infrastructure',
    verified: true,
    avatarColor: 'from-[#F97316] via-[#EA580C] to-[#9A3412]',
    badgeColor: 'bg-orange-500/15 border-orange-500/40 text-orange-300',
    highlightMetric: 'State-Level Digital Outreach Architecture',
    initials: 'AB',
    isPriorityClient: true,
  },
  {
    id: 'brickbunk-ventures',
    company: 'BRICKBUNK Ventures',
    name: 'Vikramaditya Hegde',
    role: 'Founder & Managing Partner',
    quote: 'From our enterprise investment portal to investor presentation systems, BRICKBUNK Ventures found an exceptional partner in DE.RISEN. They masterfully bridge executive finance logic with cutting-edge visual technology.',
    rating: 5,
    category: 'Enterprise Web & Brand Platform',
    verified: true,
    avatarColor: 'from-[#6320EE] via-[#7C3AED] to-[#9333EA]',
    badgeColor: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
    highlightMetric: 'Venture Capital Portal & Pitch Decks',
    initials: 'BV',
    isPriorityClient: true,
  },
  {
    id: 'nexaflow-cloud',
    company: 'NexaFlow Enterprise Cloud',
    name: 'Siddharth Mehta',
    role: 'Chief Technology Officer',
    quote: 'The high-performance SaaS web platform and 3D product animations engineered by DE.RISEN accelerated our inbound demo conversions by 310%. Their full-stack capabilities are world-class.',
    rating: 5,
    category: 'Full-Stack IT & 3D Motion',
    verified: true,
    avatarColor: 'from-[#3B82F6] to-[#1D4ED8]',
    badgeColor: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
    highlightMetric: '+310% Demo Conversions',
    initials: 'NF',
  },
  {
    id: 'aura-wellness',
    company: 'Aura Aesthetics & Wellness',
    name: 'Dr. Nandini Rao',
    role: 'Founder & Medical Director',
    quote: 'Our patient acquisition grew 4x within 90 days of launching the omnichannel digital campaigns created by DE.RISEN. Their aesthetic sensitivity and ad performance data gave us unmatched market authority.',
    rating: 5,
    category: 'Omnichannel Digital Marketing',
    verified: true,
    avatarColor: 'from-[#EC4899] to-[#BE185D]',
    badgeColor: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
    highlightMetric: '4× Patient Inquiries Scaled',
    initials: 'AA',
  },
  {
    id: 'zenith-diagnostics',
    company: 'Zenith Diagnostic Laboratories',
    name: 'Karthik Narayan',
    role: 'Director of Operations',
    quote: 'DE.RISEN streamlined our entire digital booking architecture and overhauled our healthcare brand identity. The user experience is effortless and our corporate perception has never been stronger.',
    rating: 5,
    category: 'Healthcare UI/UX & Brand System',
    verified: true,
    avatarColor: 'from-[#06B6D4] to-[#0E7490]',
    badgeColor: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    highlightMetric: 'Seamless Healthcare Portal',
    initials: 'ZD',
  },
  {
    id: 'kavya-couture',
    company: 'Kavya Couture & Luxury Living',
    name: 'Kavya Singhania',
    role: 'Creative Director & Founder',
    quote: 'Every seasonal catalogue, digital lookbook, and high-fashion video asset produced by DE.RISEN radiates uncompromising craftsmanship. They captured our luxury brand soul with striking elegance.',
    rating: 5,
    category: 'Luxury Fashion & 3D Creative',
    verified: true,
    avatarColor: 'from-[#A855F7] to-[#7E22CE]',
    badgeColor: 'bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-300',
    highlightMetric: 'High-Fashion Digital Lookbook',
    initials: 'KC',
  },
  {
    id: 'vanguard-capital',
    company: 'Vanguard Capital Partners',
    name: 'Rohan Deshmukh',
    role: 'Senior Managing Partner',
    quote: 'DE.RISEN transformed our global fund decks and private equity website. Their acute understanding of institutional trust and modern typography sets them miles ahead of traditional agencies.',
    rating: 5,
    category: 'Fintech & Investment Advisory',
    verified: true,
    avatarColor: 'from-[#10B981] to-[#047857]',
    badgeColor: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    highlightMetric: 'Institutional Advisory Deck',
    initials: 'VC',
  },
  {
    id: 'urbanroots-organic',
    company: 'UrbanRoots Organic Foods',
    name: 'Meera Kulkarni',
    role: 'Co-Founder & CEO',
    quote: 'The sustainable packaging design and viral video campaign created by DE.RISEN enabled us to secure nationwide retail shelf space across 200+ organic supermarkets within just 4 months.',
    rating: 5,
    category: 'Sustainable Packaging & Video',
    verified: true,
    avatarColor: 'from-[#84CC16] to-[#4D7C0F]',
    badgeColor: 'bg-lime-500/15 border-lime-500/40 text-lime-300',
    highlightMetric: '200+ Retail Stores Reached',
    initials: 'UR',
  },
  {
    id: 'apex-logistics',
    company: 'Apex Logistics Global',
    name: 'Farhan Qureshi',
    role: 'Chief Commercial Officer',
    quote: 'Reliable, innovative, and deeply committed. They rebuilt our real-time client tracking web interface and unified our global fleet branding across 6 distribution hubs.',
    rating: 5,
    category: 'Global Logistics IT & Branding',
    verified: true,
    avatarColor: 'from-[#6366F1] to-[#4338CA]',
    badgeColor: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
    highlightMetric: 'Global Fleet Tracking Interface',
    initials: 'AL',
  },
];

export const ClientTestimonials: React.FC = () => {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'priority'>('all');

  const row1 = TESTIMONIALS_DATA.slice(0, 5);
  const row2 = TESTIMONIALS_DATA.slice(5, 10);

  const priorityClients = TESTIMONIALS_DATA.filter((t) => t.isPriorityClient);

  return (
    <div id="client-reviews" className="relative rounded-[2.5rem] bg-gradient-to-b from-[#1f0233]/95 via-[#190129]/95 to-[#130022]/98 border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden text-white">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6320EE]/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B063FF]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header & Metrics Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-purple-400/20 text-[#D8B4FE] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B063FF]" />
            <span>Verified Client Endorsements</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Trusted by Ambitious Leaders &amp; Visionary Brands
          </h3>
          <p className="text-purple-200/80 text-sm sm:text-base mt-2 leading-relaxed">
            Real reviews from enterprise clients across luxury retail, institutional organizations, venture funds, healthcare, and technology.
          </p>
        </div>

        {/* Live Metrics Chips & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>5.0 ★ Client Rating</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-bold shadow-xs">
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

      {/* Featured Priority Client Spotlight Ribbon */}
      <div className="relative z-10 mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2B0348]/70 via-[#3B0764]/70 to-[#180128]/70 border border-[#B063FF]/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#620D9C] to-[#B063FF] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#D8B4FE]">Featured Enterprise Clients:</span>
              <p className="text-[11px] text-purple-200/70">Click client pill to toggle focus or view all 10 animated reviews</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#B063FF] text-white shadow-md shadow-[#B063FF]/30'
                  : 'bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10'
              }`}
            >
              All 10 Client Reviews
            </button>
            <button
              onClick={() => setActiveFilter('priority')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'priority'
                  ? 'bg-[#B063FF] text-white shadow-md shadow-[#B063FF]/30'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              <span>⭐ Featured Clients (3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* When "Featured Clients (3)" is active: Highlighted 3-Card Grid */}
      {activeFilter === 'priority' ? (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {priorityClients.map((t) => (
            <div
              key={`priority-${t.id}`}
              className="bg-white border-2 border-purple-200 hover:border-[#620D9C] rounded-[26px] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-slate-900"
            >
              <div>
                {/* Priority Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-700 ml-1">5.0</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Client</span>
                  </div>
                </div>

                {/* Big Prominent Company Name */}
                <div className="mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Client Organization
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {t.company}
                  </h4>
                </div>

                {/* Quote */}
                <div className="relative mb-5">
                  <Quote className="w-7 h-7 text-[#620D9C]/30 mb-2 -ml-1" />
                  <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 font-medium leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              <div>
                {/* Metric Tag */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#620D9C] text-[11px] font-medium tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-[#620D9C] shrink-0" />
                  <span>{t.highlightMetric}</span>
                </div>

                {/* Client Spokesperson */}
                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#620D9C]/20 shrink-0 border border-purple-100`}
                  >
                    {t.initials}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-slate-900 tracking-tight">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Continuous Infinite Animated Marquee Streams (All 10 Clients) */
        <div className="relative z-10 space-y-6">
          {/* Stream 1: Forward Direction (Left) - Features AGNA GOLD, Hindu Mahasabha, BRICKBUNK */}
          <div className="relative w-full overflow-hidden marquee-track">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#190129] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#190129] to-transparent" />

            <div className={`animate-marquee-left flex gap-6 ${isMarqueePaused ? 'marquee-paused' : ''}`}>
              {[...row1, ...row1].map((t, idx) => (
                <div
                  key={`stream1-${t.id}-${idx}`}
                  className="w-[330px] sm:w-[410px] md:w-[450px] shrink-0 bg-white border border-slate-200 hover:border-[#620D9C] rounded-[26px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(24,1,40,0.06)] hover:shadow-[0_20px_45px_rgba(98,13,156,0.12)] transition-all duration-300 flex flex-col justify-between group/card select-none text-slate-900"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-amber-700 ml-1">5.0</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Verified Client</span>
                      </div>
                    </div>

                    {/* BIG BOLD CLIENT COMPANY NAME */}
                    <div className="mb-3">
                      <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#620D9C] block mb-0.5">
                        CLIENT / ENTERPRISE
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover/card:text-[#620D9C] tracking-tight leading-snug transition-colors">
                        {t.company}
                      </h4>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-5">
                      <Quote className="w-6 h-6 text-[#620D9C]/30 mb-2 -ml-1 group-hover/card:text-[#620D9C] transition-colors" />
                      <p className="text-[13px] sm:text-[14px] text-slate-700 font-medium leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Metric Tag */}
                    {t.highlightMetric && (
                      <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#620D9C] text-[10.5px] font-medium tracking-wide">
                        <Sparkles className="w-3 h-3 text-[#620D9C] shrink-0" />
                        <span>{t.highlightMetric}</span>
                      </div>
                    )}

                    {/* Client Identity */}
                    <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#620D9C]/20 shrink-0 border border-purple-100`}
                      >
                        {t.initials}
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="text-sm font-bold text-slate-900 tracking-tight group-hover/card:text-[#620D9C] transition-colors truncate">
                          {t.name}
                        </h5>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
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
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#190129] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#190129] to-transparent" />

            <div className={`animate-marquee-right flex gap-6 ${isMarqueePaused ? 'marquee-paused' : ''}`}>
              {[...row2, ...row2].map((t, idx) => (
                <div
                  key={`stream2-${t.id}-${idx}`}
                  className="w-[330px] sm:w-[410px] md:w-[450px] shrink-0 bg-white border border-slate-200 hover:border-[#620D9C] rounded-[26px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(24,1,40,0.06)] hover:shadow-[0_20px_45px_rgba(98,13,156,0.12)] transition-all duration-300 flex flex-col justify-between group/card select-none text-slate-900"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-amber-700 ml-1">5.0</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Verified Client</span>
                      </div>
                    </div>

                    {/* BIG BOLD CLIENT COMPANY NAME */}
                    <div className="mb-3">
                      <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#620D9C] block mb-0.5">
                        CLIENT / ENTERPRISE
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover/card:text-[#620D9C] tracking-tight leading-snug transition-colors">
                        {t.company}
                      </h4>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-5">
                      <Quote className="w-6 h-6 text-[#620D9C]/30 mb-2 -ml-1 group-hover/card:text-[#620D9C] transition-colors" />
                      <p className="text-[13px] sm:text-[14px] text-slate-700 font-medium leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Metric Tag */}
                    {t.highlightMetric && (
                      <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#620D9C] text-[10.5px] font-medium tracking-wide">
                        <Sparkles className="w-3 h-3 text-[#620D9C] shrink-0" />
                        <span>{t.highlightMetric}</span>
                      </div>
                    )}

                    {/* Client Identity */}
                    <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#620D9C]/20 shrink-0 border border-purple-100`}
                      >
                        {t.initials}
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="text-sm font-bold text-slate-900 tracking-tight group-hover/card:text-[#620D9C] transition-colors truncate">
                          {t.name}
                        </h5>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
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
      )}
    </div>
  );
};

export default ClientTestimonials;
