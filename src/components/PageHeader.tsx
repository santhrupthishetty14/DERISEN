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
  fullBackground?: boolean;
  hudInfo?: {
    tag: string;
    title: string;
    status: string;
  };
  floatingBadge?: {
    text: string;
    subtext?: string;
  };
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
  fullBackground = false,
  hudInfo,
  floatingBadge,
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

    const colors = [
      'rgba(99, 32, 238, ',   // purple
      'rgba(139, 92, 246, ',  // violet
      'rgba(56, 189, 248, ',  // cyan
      'rgba(168, 85, 247, ',  // purple-400
      'rgba(236, 72, 153, ',  // pink
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
          alpha: Math.random() * 0.5 + 0.1,
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
          const alpha = (1 - dist / 110) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
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
  }, []);

  const isFullBg = fullBackground || (!imageSrc && Boolean(backgroundImage));

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden border-b border-brand-violetLight/20 shadow-2xl bg-[#090417] ${
        isFullBg ? 'min-h-[580px] lg:min-h-[660px]' : ''
      }`}
    >
      {/* ====== COMPLETE ANIMATED BACKGROUND IMAGE LAYER ====== */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Main Background Image with Breathing Zoom & Mouse Parallax */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: isFullBg ? 'right 42% center' : 'center 35%',
              backgroundSize: isFullBg ? 'cover' : 'cover',
              opacity: isFullBg ? 0.72 : 0.42,
              transform: `scale(${isFullBg ? 1.05 : 1.06}) translate(${mousePos.x * 0.45}px, ${mousePos.y * 0.45}px)`,
              filter: isFullBg
                ? 'saturate(1.35) contrast(1.18) brightness(1.02)'
                : 'saturate(1.25) contrast(1.15)',
              animation: 'bannerBgPulse 18s ease-in-out infinite alternate',
            }}
          />

          {/* Glowing Fingertip Touchpoint Nexus - Coordinates aligned with touch intersection */}
          <div
            className={`absolute pointer-events-none transition-transform duration-700 ease-out ${
              isFullBg
                ? 'top-[42%] right-[22%] sm:right-[28%] md:right-[32%] lg:right-[26%] xl:right-[24%]'
                : 'top-[48%] right-[26%] sm:right-[32%]'
            }`}
            style={{
              transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`,
            }}
          >
            {/* Concentric Expanding Shockwave Ripple 1 */}
            <div
              className="absolute w-36 h-36 rounded-full border border-brand-cyan/80 pointer-events-none"
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
                  'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(56, 189, 248, 0.9) 25%, rgba(168, 85, 247, 0.6) 55%, transparent 75%)',
                animation: 'bannerNexusPulse 3.5s ease-in-out infinite',
              }}
            />

            {/* Micro Sparkle Star Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#ffffff,0_0_35px_#38bdf8,0_0_50px_#a855f7] animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          {/* Luminous Synaptic Grid Intersection Blinks */}
          <div
            className="absolute top-[32%] right-[38%] w-2 h-2 rounded-full bg-brand-cyan"
            style={{ animation: 'bannerNodeBlink 3s ease-in-out infinite', animationDelay: '0.4s' }}
          />
          <div
            className="absolute top-[48%] right-[35%] w-2.5 h-2.5 rounded-full bg-brand-violetLight"
            style={{ animation: 'bannerNodeBlink 3.5s ease-in-out infinite', animationDelay: '1.1s' }}
          />
          <div
            className="absolute top-[58%] right-[29%] w-2 h-2 rounded-full bg-cyan-300"
            style={{ animation: 'bannerNodeBlink 2.8s ease-in-out infinite', animationDelay: '1.8s' }}
          />
          <div
            className="absolute top-[28%] right-[25%] w-2 h-2 rounded-full bg-purple-300"
            style={{ animation: 'bannerNodeBlink 4s ease-in-out infinite', animationDelay: '2.5s' }}
          />

          {/* Premium Gradient Blend Overlays (Preserves 100% Typography Readability while letting artwork shine) */}
          <div
            className="absolute inset-0"
            style={{
              background: isFullBg
                ? 'linear-gradient(90deg, rgba(9, 4, 23, 0.97) 0%, rgba(12, 6, 30, 0.92) 36%, rgba(15, 7, 38, 0.68) 58%, rgba(15, 7, 38, 0.25) 78%, rgba(9, 4, 23, 0.7) 100%)'
                : 'linear-gradient(90deg, rgba(13, 7, 34, 0.96) 0%, rgba(18, 9, 44, 0.88) 45%, rgba(26, 13, 61, 0.65) 80%, rgba(13, 7, 34, 0.92) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isFullBg
                ? 'radial-gradient(circle at 74% 42%, transparent 22%, rgba(9, 4, 23, 0.6) 80%)'
                : 'radial-gradient(circle at 75% 45%, transparent 20%, rgba(13, 7, 34, 0.75) 85%)',
            }}
          />
        </div>
      )}

      {/* ====== AMBIENT BACKGROUND GLOW LAYERS ====== */}

      {/* Ambient glowing atmospheric orbs */}
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
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.55) 0%, rgba(56, 189, 248, 0) 70%)',
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

      {/* Futuristic animated subtle tech grid */}
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

      {/* Horizontal glowing scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 32, 238, 0.5) 20%, rgba(56, 189, 248, 0.7) 50%, rgba(99, 32, 238, 0.5) 80%, transparent 100%)',
          animation: 'headerScanline 6s ease-in-out infinite',
        }}
      />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* ====== BANNER FOREGROUND CONTENT ====== */}
      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Actions */}
          <div className={`${isFullBg ? 'lg:col-span-8' : imageSrc ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col items-start`}>
            {/* Breadcrumb Navigation */}
            <div
              className={`flex items-center gap-2 text-xs font-mono mb-6 sm:mb-8 transition-all duration-700 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={onNavigateHome}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-brand-cyan font-semibold">{breadcrumb}</span>
            </div>

            {/* Animated Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 sm:mb-8 transition-all duration-700 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{
                transitionDelay: '150ms',
                background: 'linear-gradient(135deg, rgba(99, 32, 238, 0.4) 0%, rgba(56, 189, 248, 0.2) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.45)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 0 24px rgba(99, 32, 238, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-brand-lilac">{badge}</span>
            </div>

            {/* Title with staggered line reveals */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.14] max-w-4xl mb-6">
              <div className={isRevealed ? 'overflow-visible' : 'overflow-hidden'}>
                <div
                  className={`text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                      className="text-transparent bg-clip-text inline-block pb-1.5 pr-2"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 25%, #38BDF8 50%, #A78BFA 75%, #EDE9FE 100%)',
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
                className={`text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl font-medium leading-relaxed mb-8 transition-all duration-700 ease-out ${
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
                className={`flex flex-wrap gap-2.5 transition-all duration-700 ease-out ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: '750ms' }}
              >
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="header-tag-pill px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold text-white/90 backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 hover:text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                      animationDelay: `${idx * 100}ms`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Decorative bottom line */}
            <div
              className={`mt-10 sm:mt-12 h-[1px] max-w-md transition-all duration-[1200ms] ease-out ${
                isRevealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: '900ms',
                transformOrigin: 'left',
                background: 'linear-gradient(90deg, rgba(99, 32, 238, 0.8) 0%, rgba(56, 189, 248, 0.6) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Right Column: Full-Background Floating HUD Layer OR Frame Card */}
          {isFullBg ? (
            <div
              className={`lg:col-span-4 hidden lg:flex flex-col items-end justify-center relative transition-all duration-1000 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.25}deg) rotateX(${-mousePos.y * 0.25}deg)`,
                transitionDelay: '400ms',
              }}
            >
              {/* Floating Synergy HUD Card */}
              <div
                className="p-5 rounded-2xl bg-[#0e0728]/85 border border-brand-violetLight/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-3 max-w-[280px] select-none hover:border-brand-cyan/60 transition-all duration-500 hover:scale-105"
                style={{ animation: 'floatHudChip 6s ease-in-out infinite alternate' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-cyan font-bold">
                    {hudInfo?.tag || 'Neural Synergy'}
                  </span>
                  <Zap className="w-4 h-4 text-brand-cyan animate-pulse" />
                </div>
                <div className="text-sm font-extrabold text-white leading-snug">
                  {hudInfo?.title || 'Human Creativity × AI Matrix Architecture'}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[11px] text-white/70 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{hudInfo?.status || 'Interactive Live Nexus'}</span>
                </div>
              </div>

              {/* Floating Corner Badge */}
              {floatingBadge && (
                <div
                  className="mt-6 px-4 py-2.5 rounded-2xl bg-[#12092c]/95 border border-brand-violetLight/60 shadow-[0_12px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105"
                  style={{ animation: 'floatHudChip 5s ease-in-out infinite alternate', animationDelay: '1s' }}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <ShieldCheck className="w-4.5 h-4.5 text-brand-cyan" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white leading-tight">{floatingBadge.text}</div>
                    {floatingBadge.subtext && (
                      <div className="text-[10px] text-brand-cyan font-bold leading-tight">{floatingBadge.subtext}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : imageSrc ? (
            <div
              className={`lg:col-span-5 flex justify-center items-center relative transition-all duration-1000 ease-out mt-8 lg:mt-0 ${
                isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div
                className="relative w-full max-w-[460px] group select-none transition-transform duration-500 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
                }}
              >
                {/* Brand Purple & Cyan Pulsing Glow Aura */}
                <div
                  className="absolute -inset-4 bg-gradient-to-tr from-brand-purple via-brand-violet to-brand-cyan rounded-3xl blur-2xl opacity-65 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ animation: 'bannerAuraPulse 6s ease-in-out infinite alternate' }}
                />

                {/* Floating Top Mini HUD Chip */}
                <div
                  className="absolute -top-3.5 -left-2 z-30 px-3.5 py-1.5 rounded-full bg-[#12092c]/95 border border-brand-cyan/50 backdrop-blur-md shadow-lg flex items-center gap-2 animate-bounce"
                  style={{ animationDuration: '3.5s' }}
                >
                  <Zap className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                  <span className="text-[11px] font-bold text-white tracking-wide">Digital Architecture</span>
                </div>

                {/* Frame with image */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-brand-violetLight/40 bg-gradient-to-b from-[#12092c] to-[#080315] shadow-[0_25px_60px_rgba(5,2,15,0.8)] backdrop-blur-md transform transition-all duration-700 group-hover:scale-[1.02]">
                  <img
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="w-full h-[280px] sm:h-[320px] lg:h-[340px] object-cover rounded-3xl block transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080315]/80 via-transparent to-brand-purple/15 pointer-events-none" />
                </div>

                {/* Floating Corner Badge */}
                {floatingBadge && (
                  <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-5 z-30 px-4 py-2.5 rounded-2xl bg-[#12092c]/95 border border-brand-violetLight/60 shadow-[0_12px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <ShieldCheck className="w-4.5 h-4.5 text-brand-cyan" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white leading-tight">{floatingBadge.text}</div>
                      {floatingBadge.subtext && (
                        <div className="text-[10px] text-brand-cyan font-bold leading-tight">{floatingBadge.subtext}</div>
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

