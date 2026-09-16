import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export interface PageHeaderProps {
  badge: string;
  title: string;
  highlightWord?: string;
  description: string;
  breadcrumb: string;
  onNavigateHome?: () => void;
  tags?: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightWord,
  description,
  breadcrumb,
  onNavigateHome,
  tags = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      const count = Math.min(60, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.5 + 0.5,
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
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
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

        // Wrap around edges
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

  return (
    <div
      ref={sectionRef}
      className="relative w-full pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden border-b border-white/5"
      style={{ background: 'linear-gradient(160deg, #06010F 0%, #0B041A 25%, #130830 50%, #0D0520 75%, #06010F 100%)' }}
    >
      {/* ====== ANIMATED BACKGROUND LAYERS ====== */}

      {/* Layer 1: Animated gradient mesh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary orb - top left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(99, 32, 238, 0.6) 0%, rgba(99, 32, 238, 0) 70%)',
            animation: 'headerOrbFloat1 8s ease-in-out infinite alternate',
          }}
        />
        {/* Secondary orb - right */}
        <div
          className="absolute top-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(56, 189, 248, 0) 70%)',
            animation: 'headerOrbFloat2 10s ease-in-out infinite alternate',
          }}
        />
        {/* Accent orb - bottom center */}
        <div
          className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)',
            animation: 'headerOrbFloat3 12s ease-in-out infinite alternate',
          }}
        />
        {/* Hot pink accent */}
        <div
          className="absolute top-2/3 right-1/4 w-[250px] h-[250px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)',
            animation: 'headerOrbFloat1 14s ease-in-out infinite alternate-reverse',
          }}
        />
      </div>

      {/* Layer 2: Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: 'headerGridShift 20s linear infinite',
        }}
      />

      {/* Layer 3: Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 32, 238, 0.4) 20%, rgba(56, 189, 248, 0.6) 50%, rgba(99, 32, 238, 0.4) 80%, transparent 100%)',
          animation: 'headerScanline 6s ease-in-out infinite',
        }}
      />

      {/* Layer 4: Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Layer 5: Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 6: Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6, 1, 15, 0.6) 100%)',
        }}
      />

      {/* ====== CONTENT ====== */}
      <div className="max-w-[1320px] mx-auto px-6 relative z-10">

        {/* Breadcrumb Navigation */}
        <div
          className={`flex items-center gap-2 text-xs font-mono mb-8 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={onNavigateHome}
            className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <span className="text-brand-cyan font-semibold">{breadcrumb}</span>
        </div>

        {/* Animated Badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 transition-all duration-700 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
          style={{
            transitionDelay: '150ms',
            background: 'linear-gradient(135deg, rgba(99, 32, 238, 0.2) 0%, rgba(56, 189, 248, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(99, 32, 238, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan" style={{ animation: 'headerSparkle 2s ease-in-out infinite' }} />
          <span className="text-xs font-black uppercase tracking-[0.15em] text-brand-lilac">{badge}</span>
        </div>

        {/* Title with staggered line reveals */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.2] max-w-5xl mb-7">
          {/* Main title line */}
          <div className="overflow-hidden pb-3">
            <div
              className={`text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] pb-1 ${
                isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {title}{' '}
            </div>
          </div>

          {/* Highlight word with gradient */}
          {highlightWord && (
            <div className="overflow-hidden pb-3">
              <div
                className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] pb-1 ${
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <span
                  className="text-transparent bg-clip-text inline-block pb-1.5 pr-2"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #EDE9FE 0%, #A78BFA 25%, #38BDF8 50%, #8B5CF6 75%, #EDE9FE 100%)',
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
            className={`text-base sm:text-lg text-white/60 max-w-2xl font-medium leading-relaxed mb-10 transition-all duration-700 ease-out ${
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
            className={`flex flex-wrap gap-3 transition-all duration-700 ease-out ${
              isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="header-tag-pill px-4 py-2 rounded-full text-xs font-semibold text-white/90 backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 hover:text-white"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
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
          className={`mt-14 h-[1px] max-w-md transition-all duration-[1200ms] ease-out ${
            isRevealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            transitionDelay: '900ms',
            transformOrigin: 'left',
            background: 'linear-gradient(90deg, rgba(99, 32, 238, 0.6) 0%, rgba(56, 189, 248, 0.3) 50%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default PageHeader;
