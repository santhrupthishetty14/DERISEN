import React, { useRef, useState, useEffect } from 'react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setMousePos({
      x: Math.max(-1, Math.min(1, deltaX)),
      y: Math.max(-1, Math.min(1, deltaY)),
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const visualTransform = isDesktop
    ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10}px, 0) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`
    : 'none';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[760px] mx-auto flex items-center justify-center select-none perspective-[1200px]"
    >
      {/* Background Soft Purple Aura Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div id="hero-ambient-aura" className="w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-brand-purple/25 via-brand-violet/20 to-brand-cyan/20 blur-3xl transition-transform duration-700" />
      </div>

      {/* Ambient Delicate Flowing Wave Ribbons Glow */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

      {/* Master 3D Artwork (iMac, Phone, Mug, Keyboard, Velvet Ribbon & Spheres) */}
      <div
        id="hero-master-picture-stage"
        style={{ transform: visualTransform }}
        className="relative z-10 w-full transition-transform duration-300 ease-out flex items-center justify-center"
      >
        <div className="relative group overflow-visible">
          {/* Master 3D Scene Image with Dynamic Glow */}
          <img
            id="hero-main-picture"
            src="/assets/hero-3d-scene-perfect.png"
            alt="De.risen 3D Agency Suite & Creative Studio"
            className="w-full h-auto max-h-[520px] lg:max-h-[570px] object-contain drop-shadow-[0_25px_60px_rgba(24,13,56,0.18)] transition-all duration-500 will-change-transform"
            loading="eager"
          />

          {/* Dynamic Interactive Light Sheen Across Monitor Screen on Scroll/Hover */}
          <div
            id="hero-picture-sheen"
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 pointer-events-none rounded-3xl mix-blend-overlay transition-opacity duration-700"
          />
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 1 (Left-Center near Mug & Button) */}
        <div
          id="hero-sphere-left"
          className="absolute -left-4 sm:-left-8 bottom-14 sm:bottom-18 z-20 pointer-events-none transition-transform duration-300 ease-out animate-float-slow"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * -16}px, 0)`
              : undefined,
          }}
        >
          <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full shadow-[0_16px_32px_rgba(40,10,95,0.5)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#934bf8] via-[#5219c6] to-[#250961] relative overflow-hidden">
              <div className="absolute top-1.5 left-2 w-4 h-3 rounded-full bg-white/80 blur-[0.5px] -rotate-30" />
              <div className="absolute top-3 left-3 w-2 h-1 rounded-full bg-white" />
              <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-brand-cyan/25 to-transparent" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-full bg-brand-purple/30 blur-sm" />
          </div>
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 2 (Top-Right ambient above monitor) */}
        <div
          id="hero-sphere-top"
          className="absolute right-4 sm:right-8 -top-4 sm:-top-8 z-20 pointer-events-none transition-transform duration-300 ease-out animate-float-medium"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * 24}px, ${mousePos.y * 20}px, 0)`
              : undefined,
          }}
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0_12px_24px_rgba(40,10,95,0.45)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#9f60f9] via-[#6320ee] to-[#2e0e70] relative overflow-hidden">
              <div className="absolute top-1 left-1.5 w-3 h-2 rounded-full bg-white/85 blur-[0.5px] -rotate-30" />
              <div className="absolute top-2 left-2.5 w-1.5 h-0.5 rounded-full bg-white" />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-2 rounded-full bg-brand-purple/25 blur-sm" />
          </div>
        </div>

        {/* Dynamic 3D Floating Metallic Purple Sphere 3 (Far-Right behind Phone) */}
        <div
          id="hero-sphere-right"
          className="absolute -right-3 sm:-right-6 bottom-28 sm:bottom-36 z-20 pointer-events-none transition-transform duration-300 ease-out animate-float-slow"
          style={{
            animationDelay: '1.5s',
            transform: isDesktop
              ? `translate3d(${mousePos.x * 16}px, ${mousePos.y * -18}px, 0)`
              : undefined,
          }}
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-[0_14px_28px_rgba(40,10,95,0.4)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7e34f4] via-[#4d14be] to-[#200656] relative overflow-hidden">
              <div className="absolute top-1.5 left-2 w-3.5 h-2.5 rounded-full bg-white/75 blur-[0.5px] -rotate-30" />
              <div className="absolute top-2.5 left-2.5 w-1.5 h-0.5 rounded-full bg-white" />
              <div className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-brand-cyan/20 to-transparent" />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-brand-purple/20 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;

