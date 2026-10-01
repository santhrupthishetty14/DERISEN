import React from 'react';
import { Logo } from '../components/Logo';
import { Sparkles, Mail, Phone, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface MaintenancePageProps {
  onBypassPreview?: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ onBypassPreview }) => {
  return (
    <div className="min-h-screen w-full bg-[#180128] text-white flex flex-col justify-between relative overflow-hidden select-none px-6 py-10">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#620D9C]/50 via-[#7C3AED]/40 to-[#B063FF]/30 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#B063FF]/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Background Subtle Grid */}
      <div className="absolute inset-0 circuit-grid opacity-15 pointer-events-none" />

      {/* Top Bar with Official Logo */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        <div className="scale-95 sm:scale-100 origin-left">
          <Logo />
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-400/20 text-[#D8B4FE] text-xs font-mono font-bold tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#B063FF] animate-pulse" />
          <span>Scheduled Upgrade Active</span>
        </div>
      </header>

      {/* Center Hero Announcement Stage */}
      <main className="relative z-10 max-w-3xl mx-auto text-center my-auto py-12">
        {/* Futuristic Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#620D9C]/40 to-[#B063FF]/30 border border-[#B063FF]/50 text-white text-xs font-mono font-extrabold uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(176,99,255,0.4)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Under Final Enhancement &amp; Polish</span>
        </div>

        {/* Cinematic Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] mb-6">
          Architecting an{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B063FF] via-[#D8B4FE] to-[#9333EA]">
            Elevated Experience.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          We are currently calibrating our new digital platform, high-performance portfolios, and client experience systems. We will be live shortly.
        </p>

        {/* Enterprise Direct Contact Card */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <a
            href="mailto:derisen.official@gmail.com"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold transition-all hover:scale-105"
          >
            <Mail className="w-4 h-4 text-[#B063FF]" />
            <span>derisen.official@gmail.com</span>
          </a>

          <a
            href="tel:+919742400028"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#620D9C] hover:bg-[#7C3AED] text-white text-sm font-bold shadow-lg shadow-[#620D9C]/30 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>+91 97424 00028</span>
          </a>
        </div>

        {/* Private Preview Access Trigger */}
        {onBypassPreview && (
          <div className="mt-8">
            <button
              onClick={onBypassPreview}
              className="text-xs text-purple-300/40 hover:text-purple-200 underline transition-colors cursor-pointer"
            >
              Client &amp; Team Preview Access →
            </button>
          </div>
        )}
      </main>

      {/* Footer Credentials */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-purple-200/60 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DE.RISEN Strategic Systems &bull; All Rights Reserved &copy; 2026</span>
        </div>

        <div>
          <span>Crafted for Influence &bull; Engineered for Growth</span>
        </div>
      </footer>
    </div>
  );
};

export default MaintenancePage;
