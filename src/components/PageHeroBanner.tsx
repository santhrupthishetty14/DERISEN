import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

interface PageHeroBannerProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  subtitle: string;
  backgroundImage: string;
  currentPage: string;
  onNavigateHome?: () => void;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  badge = 'DE.RISEN CREATIVE AGENCY',
  title,
  highlightedWord,
  subtitle,
  backgroundImage,
  currentPage,
  onNavigateHome,
}) => {
  return (
    <section className="relative w-full max-w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* 1. Background Image with High-Res Photography & Blur/Parallax Styling */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          loading="eager"
        />
        {/* Multi-layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-purple/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/30 via-transparent to-transparent" />

        {/* Decorative ambient glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-purple/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-pink/15 rounded-full filter blur-3xl" />
      </div>

      {/* 2. Banner Content with Framer Motion Entrance Animations */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full text-center flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-2 text-sm text-gray-300/80 mb-5 font-medium bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg"
        >
          <button
            onClick={onNavigateHome || (() => (window.location.hash = '#home'))}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-brand-pink" />
          <span className="text-white font-semibold">{currentPage}</span>
        </motion.div>

        {/* Floating Agency Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/30 border border-brand-purple/50 backdrop-blur-md text-brand-pink text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-spin-slow" />
            <span>{badge}</span>
          </motion.div>
        )}

        {/* Main Banner Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
        >
          {title}{' '}
          {highlightedWord && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-purple-300 to-cyan-300">
              {highlightedWord}
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Bottom decorative divider bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 h-1 w-24 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan rounded-full shadow-[0_0_15px_rgba(107,56,251,0.8)]"
        />
      </div>
    </section>
  );
};
