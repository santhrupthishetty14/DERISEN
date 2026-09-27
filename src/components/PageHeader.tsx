import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

export interface PageHeaderProps {
  badge: string;
  title: string;
  highlightWord?: string;
  description: string;
  breadcrumb: string;
  onNavigateHome?: () => void;
  tags?: string[];
  imageSrc?: string;
  imageAlt?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  videoHueRotate?: string;
  fullBackground?: boolean;
  backgroundPosition?: string;
  backgroundOpacity?: number;
  hudInfo?: {
    tag: string;
    title: string;
    status: string;
  };
  floatingBadge?: {
    text: string;
    subtext?: string;
  };
  showNexus?: boolean;
  purpleAnimationOnly?: boolean;
  theme?: 'dark' | 'white';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightWord,
  description,
  breadcrumb,
  onNavigateHome,
  tags = [],
  imageSrc,
  imageAlt,
  backgroundImage = '/assets/banner-ai-future.jpg',
  backgroundVideo,
  videoHueRotate = '85deg',
  fullBackground = false,
  backgroundPosition,
  backgroundOpacity,
  hudInfo,
  floatingBadge,
  showNexus = false,
  purpleAnimationOnly = false,
  theme = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24;
    setMousePos({ x, y });
  };

  // Particle animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const colors = theme === 'white' ? [
      'rgba(99, 32, 238, ',   // deep royal purple
      'rgba(124, 58, 237, ',  // violet-600
      'rgba(147, 51, 234, ',  // purple-600
      'rgba(168, 85, 247, ',  // purple-500
      'rgba(98, 13, 156, ',   // brand purple
    ] : [
      'rgba(99, 32, 238, ',   // purple
      'rgba(176, 99, 255, ',  // electric violet
      'rgba(192, 132, 252, ', // purple-400
      'rgba(168, 85, 247, ',  // purple-500
      'rgba(147, 51, 234, ',  // purple-600
    ];

    const createParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = [];
      const count = Math.min(55, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.5 + 0.6,
          alpha: theme === 'white' ? Math.random() * 0.4 + 0.15 : Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const drawConnections = (p1: typeof particles[0]) => {
      for (const p2 of particles) {
        if (p1 === p2) continue;
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const alpha = (1 - dist / 110) * (theme === 'white' ? 0.12 : 0.08);
          ctx.beginPath();
          ctx.strokeStyle = theme === 'white' ? `rgba(124, 58, 237, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color + currentAlpha + ')');
        gradient.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.fillStyle = p.color + currentAlpha + ')';
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        drawConnections(p);
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  const isFullBg = purpleAnimationOnly || fullBackground || (!imageSrc && Boolean(backgroundImage || backgroundVideo));
  const isWhite = theme === 'white';

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-[500px] lg:min-h-[calc(100vh-78px)] lg:max-h-[760px] flex items-center pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-24 lg:pb-10 overflow-hidden transition-colors duration-500 ${
        isWhite
          ? 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE] text-slate-900 border-b border-purple-200/80 shadow-[0_10px_35px_rgba(98,13,156,0.06)]'
          : 'bg-[#180128] text-white border-b border-brand-violetLight/20 shadow-2xl'
      }`}
    >
      {/* ====== PURE PURPLE AURORA ANIMATION STAGE (NO BACKGROUND IMAGE) ====== */}
      {purpleAnimationOnly && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {isWhite ? (
            <>
              {/* Luminous Pure White Canvas Base */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAF5FF] to-[#F5EEFE]" />

              {/* Glowing Animated Purple Aurora Plasma Waves on White Canvas */}
              <div
                className="absolute -inset-[30%] opacity-75 blur-3xl will-change-transform pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 65% 55% at 75% 40%, rgba(176, 99, 255, 0.28) 0%, rgba(147, 51, 234, 0.18) 45%, transparent 70%), radial-gradient(ellipse 55% 45% at 30% 65%, rgba(192, 132, 252, 0.25) 0%, rgba(124, 58, 237, 0.15) 50%, transparent 75%), radial-gradient(ellipse 50% 50% at 85% 75%, rgba(233, 213, 255, 0.4) 0%, rgba(168, 85, 247, 0.16) 40%, transparent 65%)',
                  animation: 'purpleAuroraWave 14s ease-in-out infinite alternate',
                  transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
                }}
              />

              {/* Secondary Floating Violet Energy Orb */}
              <div
                className="absolute top-1/3 right-[15%] w-[480px] h-[480px] rounded-full blur-2xl opacity-45 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(124, 58, 237, 0.12) 50%, transparent 75%)',
                  animation: 'purpleOrbFloat 10s ease-in-out infinite alternate',
                  transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
                }}
              />

              {/* Tertiary Deep Purple Flare */}
              <div
                className="absolute -bottom-20 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl opacity-35 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(98, 13, 156, 0.1) 60%, transparent 80%)',
                  animation: 'bannerBgPulse 12s ease-in-out infinite alternate',
                }}
              />

              {/* Light Cyber Grid Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(98, 13, 156, 0.45) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(98, 13, 156, 0.45) 1px, transparent 1px)
                  `,
                  backgroundSize: '48px 48px',
                }}
              />

              {/* Luminous Vignette Softener */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5FF]/80 via-transparent to-white/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent lg:w-3/5" />
            </>
          ) : (
            <>
              {/* Deep Violet Cyber Matrix Base */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#120120] via-[#1a0129] to-[#0e0018]" />

              {/* Glowing Animated Purple Aurora Plasma Waves */}
              <div
                className="absolute -inset-[30%] opacity-85 blur-3xl will-change-transform pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 65% 55% at 75% 40%, rgba(176, 99, 255, 0.45) 0%, rgba(98, 13, 156, 0.35) 45%, transparent 70%), radial-gradient(ellipse 55% 45% at 30% 65%, rgba(147, 51, 234, 0.4) 0%, rgba(75, 0, 110, 0.3) 50%, transparent 75%), radial-gradient(ellipse 50% 50% at 85% 75%, rgba(216, 180, 254, 0.3) 0%, rgba(168, 85, 247, 0.25) 40%, transparent 65%)',
                  animation: 'purpleAuroraWave 14s ease-in-out infinite alternate',
                  transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
                }}
              />

              {/* Secondary Floating Violet Energy Orb */}
              <div
                className="absolute top-1/3 right-[15%] w-[480px] h-[480px] rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(176, 99, 255, 0.5) 0%, rgba(98, 13, 156, 0.25) 50%, transparent 75%)',
                  animation: 'purpleOrbFloat 10s ease-in-out infinite alternate',
                  transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
                }}
              />

              {/* Tertiary Deep Purple Flare */}
              <div
                className="absolute -bottom-20 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(98, 13, 156, 0.6) 0%, rgba(75, 0, 110, 0.3) 60%, transparent 80%)',
                  animation: 'bannerBgPulse 12s ease-in-out infinite alternate',
                }}
              />

              {/* Subtle Cyber Grid Texture */}
              <div className="absolute inset-0 circuit-grid-dark opacity-35" />

              {/* Vignette / Edge Softeners */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#180128] via-transparent to-[#180128]/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#180128]/95 via-[#180128]/60 to-transparent lg:w-3/5" />
            </>
          )}
        </div>
      )}

      {/* ====== COMPLETE ANIMATED BACKGROUND IMAGE / VIDEO LAYER ====== */}
      {!purpleAnimationOnly && (backgroundVideo || backgroundImage) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {backgroundVideo ? (
            <video
              src={backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
              style={{
                objectPosition: backgroundPosition || (isFullBg ? 'right 20% center' : 'center 35%'),
                opacity: backgroundOpacity !== undefined ? backgroundOpacity : isFullBg ? 0.90 : 0.50,
                transform: `scale(${isFullBg ? 1.05 : 1.06}) translate(${mousePos.x * 0.45}px, ${mousePos.y * 0.45}px)`,
                filter: `hue-rotate(${videoHueRotate}) saturate(1.4) contrast(1.15) brightness(1.05)`,
                animation: 'bannerBgPulse 18s ease-in-out infinite alternate',
              }}
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out will-change-transform"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: backgroundPosition || (isFullBg ? 'right 25% center' : 'center 35%'),
                backgroundSize: isFullBg ? 'cover' : 'cover',
                opacity: backgroundOpacity !== undefined ? backgroundOpacity : isFullBg ? 0.86 : 0.45,
                transform: `scale(${isFullBg ? 1.05 : 1.06}) translate(${mousePos.x * 0.45}px, ${mousePos.y * 0.45}px)`,
                filter: isFullBg
                  ? 'saturate(1.38) contrast(1.2) brightness(1.06)'
                  : 'saturate(1.25) contrast(1.15)',
                animation: 'bannerBgPulse 18s ease-in-out infinite alternate',
              }}
            />
          )}

          {/* Optional Glowing Fingertip / Ecosystem Nexus */}
          {showNexus && (
            <>
              <div
                className={`absolute pointer-events-none transition-transform duration-700 ease-out ${
                  isFullBg
                    ? 'top-[44%] right-[20%] sm:right-[24%] md:right-[26%] lg:right-[24%] xl:right-[23%]'
                    : 'top-[48%] right-[26%] sm:right-[32%]'
                }`}
                style={{
                  transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`,
                }}
              >
                {/* Concentric Expanding Shockwave Ripple 1 */}
                <div
                  className="absolute w-36 h-36 rounded-full border border-[#B063FF]/80 pointer-events-none"
                  style={{
                    animation: 'bannerTouchRipple 3.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
                    animationDelay: '0s',
                  }}
                />

                {/* Concentric Expanding Shockwave Ripple 2 */}
                <div
                  className="absolute w-36 h-36 rounded-full border border-brand-violetLight/80 pointer-events-none"
                  style={{
                    animation: 'bannerTouchRipple 3.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
                    animationDelay: '1.2s',
                  }}
                />

                {/* Concentric Expanding Shockwave Ripple 3 */}
                <div
                  className="absolute w-36 h-36 rounded-full border border-purple-400/70 pointer-events-none"
                  style={{
                    animation: 'bannerTouchRipple 3.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
                    animationDelay: '2.4s',
                  }}
                />

                {/* Radial High-Intensity Luminous Photon Core */}
                <div
                  className="w-40 h-40 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(176, 99, 255, 0.9) 25%, rgba(98, 13, 156, 0.6) 55%, transparent 75%)',
                    animation: 'bannerNexusPulse 3.5s ease-in-out infinite',
                  }}
                />

                {/* Micro Sparkle Star Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#ffffff,0_0_35px_#b063ff,0_0_50px_#a855f7] animate-ping" style={{ animationDuration: '2s' }} />
              </div>

              {/* Luminous Synaptic Grid Intersection Blinks */}
              <div
                className="absolute top-[30%] right-[32%] w-2 h-2 rounded-full bg-[#B063FF]"
                style={{ animation: 'bannerNodeBlink 3s ease-in-out infinite', animationDelay: '0.4s' }}
              />
              <div
                className="absolute top-[48%] right-[30%] w-2.5 h-2.5 rounded-full bg-brand-violetLight"
                style={{ animation: 'bannerNodeBlink 3.5s ease-in-out infinite', animationDelay: '1.1s' }}
              />
              <div
                className="absolute top-[62%] right-[25%] w-2 h-2 rounded-full bg-purple-300"
                style={{ animation: 'bannerNodeBlink 2.8s ease-in-out infinite', animationDelay: '1.8s' }}
              />
              <div
                className="absolute top-[26%] right-[22%] w-2 h-2 rounded-full bg-purple-300"
                style={{ animation: 'bannerNodeBlink 4s ease-in-out infinite', animationDelay: '2.5s' }}
              />
            </>
          )}

          {/* Premium Gradient Blend Overlays (Preserves 100% Typography Readability while letting artwork shine) */}
          <div
            className="absolute inset-0"
            style={{
              background: isFullBg
                ? 'linear-gradient(90deg, rgba(24, 1, 40, 0.98) 0%, rgba(24, 1, 40, 0.92) 35%, rgba(24, 1, 40, 0.50) 55%, rgba(24, 1, 40, 0.05) 75%, rgba(24, 1, 40, 0.40) 100%)'
                : 'linear-gradient(90deg, rgba(24, 1, 40, 0.96) 0%, rgba(24, 1, 40, 0.88) 45%, rgba(32, 2, 54, 0.65) 80%, rgba(24, 1, 40, 0.92) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isFullBg
                ? 'radial-gradient(circle at 75% 44%, transparent 30%, rgba(24, 1, 40, 0.50) 85%)'
                : 'radial-gradient(circle at 75% 45%, transparent 20%, rgba(24, 1, 40, 0.75) 85%)',
            }}
          />
        </div>
      )}

      {/* ====== AMBIENT BACKGROUND GLOW LAYERS ====== */}

      {/* Ambient glowing atmospheric orbs */}
      {!isWhite && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full opacity-45"
            style={{
              background: 'radial-gradient(circle, rgba(99, 32, 238, 0.75) 0%, rgba(99, 32, 238, 0) 70%)',
              animation: 'headerOrbFloat1 8s ease-in-out infinite alternate',
            }}
          />
          <div
            className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(176, 99, 255, 0.45) 0%, rgba(176, 99, 255, 0) 70%)',
              animation: 'headerOrbFloat2 10s ease-in-out infinite alternate',
            }}
          />
          <div
            className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0) 70%)',
              animation: 'headerOrbFloat3 12s ease-in-out infinite alternate',
            }}
          />
        </div>
      )}

      {/* Futuristic animated subtle tech grid */}
      {!isWhite && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            animation: 'headerGridShift 20s linear infinite',
          }}
        />
      )}

      {/* Horizontal glowing scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-60"
        style={{
          background: isWhite
            ? 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.25) 20%, rgba(147, 51, 234, 0.45) 50%, rgba(124, 58, 237, 0.25) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(99, 32, 238, 0.5) 20%, rgba(176, 99, 255, 0.7) 50%, rgba(99, 32, 238, 0.5) 80%, transparent 100%)',
          animation: 'headerScanline 6s ease-in-out infinite',
        }}
      />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isWhite ? 0.75 : 0.55 }}
      />

      {/* ====== BANNER FOREGROUND CONTENT ====== */}
      <div className="max-w-[1360px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Left Column: Editorial Typography & Actions */}
          <div className={`${(purpleAnimationOnly || isFullBg || imageSrc) ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col items-start`}>
            {/* Breadcrumb Navigation */}
            <div
              className={`flex items-center gap-2 text-xs font-mono mb-3 sm:mb-4 transition-all duration-700 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={onNavigateHome}
                className={
                  isWhite
                    ? 'text-slate-500 hover:text-[#620D9C] font-semibold transition-colors cursor-pointer'
                    : 'text-white/60 hover:text-white transition-colors cursor-pointer'
                }
              >
                Home
              </button>
              <ChevronRight className={`w-3.5 h-3.5 ${isWhite ? 'text-slate-400' : 'text-white/40'}`} />
              <span className={isWhite ? 'text-[#620D9C] font-black' : 'text-brand-violet font-semibold'}>{breadcrumb}</span>
            </div>

            {/* Animated Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3.5 sm:mb-4 transition-all duration-700 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{
                transitionDelay: '150ms',
                background: isWhite
                  ? 'linear-gradient(135deg, rgba(238, 230, 255, 0.95) 0%, rgba(245, 240, 255, 0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(99, 32, 238, 0.4) 0%, rgba(176, 99, 255, 0.2) 100%)',
                border: isWhite ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(139, 92, 246, 0.45)',
                backdropFilter: 'blur(14px)',
                boxShadow: isWhite
                  ? '0 4px 16px rgba(98, 13, 156, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
                  : '0 0 24px rgba(99, 32, 238, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isWhite ? 'text-[#620D9C]' : 'text-brand-violet'} animate-pulse`} />
              <span className={`text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] ${isWhite ? 'text-[#620D9C]' : 'text-brand-lilac'}`}>{badge}</span>
            </div>

            {/* Title with staggered line reveals */}
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black tracking-tight leading-[1.12] max-w-3xl mb-3.5 sm:mb-4">
              <div className={isRevealed ? 'overflow-visible' : 'overflow-hidden'}>
                <div
                  className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isWhite ? 'text-slate-950' : 'text-white'
                  } ${
                    isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  {title}{' '}
                </div>
              </div>

              {highlightWord && (
                <div className={isRevealed ? 'overflow-visible' : 'overflow-hidden'}>
                  <div
                    className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
                    }`}
                    style={{ transitionDelay: '450ms' }}
                  >
                    <span
                      className="text-transparent bg-clip-text inline-block pb-1 pr-2"
                      style={{
                        backgroundImage: isWhite
                          ? 'linear-gradient(135deg, #620D9C 0%, #7C3AED 35%, #9333EA 70%, #620D9C 100%)'
                          : 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 25%, #B063FF 50%, #A78BFA 75%, #EDE9FE 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'headerGradientText 4s ease infinite',
                      }}
                    >
                      {highlightWord}
                    </span>
                  </div>
                </div>
              )}
            </h1>

            {/* Description with elegant reveal */}
            <div className="overflow-hidden">
              <p
                className={`text-xs sm:text-sm lg:text-base max-w-xl font-medium leading-relaxed mb-4 sm:mb-5 transition-all duration-700 ease-out ${
                  isWhite ? 'text-slate-600' : 'text-white/80'
                } ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                {description}
              </p>
            </div>

            {/* Premium Tags with shimmer */}
            {tags.length > 0 && (
              <div
                className={`flex flex-wrap gap-2 transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: '750ms' }}
              >
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`header-tag-pill px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 ${
                      isWhite
                        ? 'bg-white/95 text-[#620D9C] border border-purple-200/90 shadow-[0_2px_8px_rgba(98,13,156,0.06)] hover:bg-purple-50 hover:border-[#620D9C]/50 hover:shadow-md'
                        : 'text-white/90 hover:text-white'
                    }`}
                    style={
                      isWhite
                        ? { animationDelay: `${idx * 100}ms` }
                        : {
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(139, 92, 246, 0.2) 100%)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                            animationDelay: `${idx * 100}ms`,
                          }
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Decorative bottom line */}
            <div
              className={`mt-4 sm:mt-5 h-[1px] max-w-xs transition-all duration-[1200ms] ease-out ${
                isRevealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: '900ms',
                transformOrigin: 'left',
                background: isWhite
                  ? 'linear-gradient(90deg, rgba(98, 13, 156, 0.75) 0%, rgba(147, 51, 234, 0.5) 50%, transparent 100%)'
                  : 'linear-gradient(90deg, rgba(99, 32, 238, 0.8) 0%, rgba(176, 99, 255, 0.6) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Right Column: Full-Background Floating HUD Layer OR Frame Card OR 3D Purple Core */}
          {isFullBg ? (
            purpleAnimationOnly ? (
              <div
                className={`lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative transition-all duration-1000 ease-out my-auto ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: '400ms',
                }}
              >
                {/* 3D Holographic Purple Cyber Core */}
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center pointer-events-none select-none"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
                  }}
                >
                  {/* Outer Concentric Orbit Ring 1 */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-dashed pointer-events-none ${
                      isWhite ? 'border-[#7C3AED]/35' : 'border-[#B063FF]/40'
                    }`}
                    style={{ animation: 'orbitRotate 22s linear infinite' }}
                  />

                  {/* Outer Concentric Orbit Ring 2 with glowing gradient */}
                  <div
                    className={`absolute inset-4 rounded-full border pointer-events-none ${
                      isWhite ? 'border-purple-300/60' : 'border-purple-400/50'
                    }`}
                    style={{ animation: 'orbitRotate 14s linear infinite reverse' }}
                  />

                  {/* Pulsing Purple Halo Core */}
                  <div
                    className="absolute w-36 h-36 rounded-full pointer-events-none blur-xl"
                    style={{
                      background: isWhite
                        ? 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(216, 180, 254, 0.2) 45%, transparent 75%)'
                        : 'radial-gradient(circle, rgba(176, 99, 255, 0.85) 0%, rgba(98, 13, 156, 0.6) 45%, transparent 75%)',
                      animation: 'bannerNexusPulse 3.5s ease-in-out infinite',
                    }}
                  />

                  {/* High-Luminance Center Energy Gem */}
                  <div
                    className={`relative w-24 h-24 rounded-full p-1 animate-pulse ${
                      isWhite
                        ? 'bg-gradient-to-tr from-[#620D9C] via-[#7C3AED] to-[#B063FF] shadow-[0_10px_30px_rgba(124,58,237,0.25)]'
                        : 'bg-gradient-to-tr from-[#620D9C] via-[#B063FF] to-[#D8B4FE] shadow-[0_0_40px_rgba(176,99,255,0.7)]'
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center p-2.5 backdrop-blur-md ${
                        isWhite ? 'bg-white/95 text-slate-800' : 'bg-[#180128]/85 text-white'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full animate-ping mb-1 ${
                          isWhite ? 'bg-[#7C3AED] shadow-[0_0_10px_#7C3AED]' : 'bg-[#B063FF] shadow-[0_0_10px_#B063FF]'
                        }`}
                      />
                      <span className={`text-[9.5px] font-mono font-black uppercase tracking-wider ${isWhite ? 'text-[#620D9C]' : 'text-white'}`}>
                        LIVE NEXUS
                      </span>
                      <span className={`text-[8.5px] font-bold ${isWhite ? 'text-slate-500' : 'text-[#D8B4FE]'}`}>
                        Direct 24/7
                      </span>
                    </div>
                  </div>

                  {/* Satellite Floating Micro Nodes */}
                  <div
                    className={`absolute 0 right-1 px-2.5 py-1 rounded-full border shadow-md text-[9px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md animate-bounce ${
                      isWhite
                        ? 'bg-white/95 border-purple-200 text-slate-800 shadow-purple-900/5'
                        : 'bg-[#180128]/95 border-[#B063FF]/60 text-white'
                    }`}
                    style={{ animationDuration: '4s' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                    <span>Instant Reply</span>
                  </div>

                  <div
                    className={`absolute 0 left-1 px-2.5 py-1 rounded-full border shadow-md text-[9px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md animate-bounce ${
                      isWhite
                        ? 'bg-white/95 border-purple-200 text-slate-800 shadow-purple-900/5'
                        : 'bg-[#180128]/95 border-[#B063FF]/60 text-[#D8B4FE]'
                    }`}
                    style={{ animationDuration: '4.5s', animationDelay: '1s' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>WhatsApp Ready</span>
                  </div>
                </div>
              </div>
            ) : (hudInfo || floatingBadge) ? (
              <div
                className={`lg:col-span-5 hidden lg:flex flex-col items-end justify-center relative transition-all duration-1000 ease-out my-auto ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 0.25}deg) rotateX(${-mousePos.y * 0.25}deg)`,
                  transitionDelay: '400ms',
                }}
              >
                {/* Floating Synergy HUD Card */}
                {hudInfo && (
                  <div
                    className="p-4 rounded-2xl bg-[#180128]/90 border border-brand-violetLight/40 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.45)] flex flex-col gap-2 max-w-[260px] select-none hover:border-brand-violet/60 transition-all duration-500 hover:scale-105"
                    style={{ animation: 'floatHudChip 6s ease-in-out infinite alternate' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-brand-violet font-bold">
                        {hudInfo.tag}
                      </span>
                      <Zap className="w-3.5 h-3.5 text-brand-violet animate-pulse" />
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                      {hudInfo.title}
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[10px] text-white/70 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#B063FF] shadow-[0_0_8px_#B063FF] animate-pulse" />
                      <span>{hudInfo.status}</span>
                    </div>
                  </div>
                )}

                {/* Floating Corner Badge */}
                {floatingBadge && (
                  <div
                    className="mt-4 px-3.5 py-2 rounded-2xl bg-[#180128]/95 border border-brand-violetLight/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
                    style={{ animation: 'floatHudChip 5s ease-in-out infinite alternate', animationDelay: '1s' }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <ShieldCheck className="w-4 h-4 text-brand-violet" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white leading-tight">{floatingBadge.text}</div>
                      {floatingBadge.subtext && (
                        <div className="text-[9px] text-brand-violet font-bold leading-tight">{floatingBadge.subtext}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null
          ) : imageSrc ? (
            <div
              className={`lg:col-span-5 flex justify-center items-center relative transition-all duration-1000 ease-out mt-6 lg:mt-0 ${
                isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div
                className="relative w-full max-w-[420px] group select-none transition-transform duration-500 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
                }}
              >
                {/* Brand Purple & Violet Pulsing Glow Aura */}
                <div
                  className="absolute -inset-3 bg-gradient-to-tr from-brand-purple via-brand-violet to-[#8447FF] rounded-3xl blur-2xl opacity-65 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ animation: 'bannerAuraPulse 6s ease-in-out infinite alternate' }}
                />

                {/* Floating Top Mini HUD Chip */}
                <div
                  className="absolute -top-3 -left-2 z-30 px-3 py-1 rounded-full bg-[#180128]/95 border border-brand-violet/50 backdrop-blur-md shadow-lg flex items-center gap-2 animate-bounce"
                  style={{ animationDuration: '3.5s' }}
                >
                  <Zap className="w-3 h-3 text-brand-violet animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-wide">Digital Architecture</span>
                </div>

                {/* Frame with image */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-brand-violetLight/40 bg-gradient-to-b from-[#180128] to-[#0a0014] shadow-[0_20px_50px_rgba(5,2,15,0.7)] backdrop-blur-md transform transition-all duration-700 group-hover:scale-[1.02]">
                  <img
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="w-full h-[230px] sm:h-[260px] lg:h-[280px] object-cover rounded-2xl block transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014]/80 via-transparent to-brand-purple/15 pointer-events-none" />
                </div>

                {/* Floating Corner Badge */}
                {floatingBadge && (
                  <div className="absolute -bottom-3 right-3 sm:-bottom-4 sm:right-4 z-30 px-3.5 py-2 rounded-2xl bg-[#180128]/95 border border-brand-violetLight/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <ShieldCheck className="w-4 h-4 text-brand-violet" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white leading-tight">{floatingBadge.text}</div>
                      {floatingBadge.subtext && (
                        <div className="text-[9px] text-brand-violet font-bold leading-tight">{floatingBadge.subtext}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

