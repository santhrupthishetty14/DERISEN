import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  // Ensure video autoplays smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => { });
        });
      }
    }
  }, []);

  // Entrance & continuous cinematic subtle floating / horizontal movement
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' }
      );

      // Subtle cinematic horizontal & vertical sway
      const floatTween = gsap.to(stageRef.current, {
        y: '-=8',
        x: '+=6',
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      return () => {
        floatTween.kill();
      };
    }
  }, [prefersReducedMotion]);

  // Desktop 3D Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || prefersReducedMotion || !containerRef.current) return;
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

  const mouseTransform = isDesktop && !prefersReducedMotion
    ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0) rotateY(${mousePos.x * 3.5}deg) rotateX(${-mousePos.y * 3.0}deg)`
    : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[760px] mx-auto flex items-center justify-center select-none py-2 sm:py-0"
      style={{ perspective: '1200px' }}
    >
      {/* Background Soft Purple Aura Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={auraRef}
          id="hero-ambient-aura"
          className="w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-gradient-to-tr from-[#6320EE]/25 via-[#8B5CF6]/18 to-[#00E5FF]/14 blur-3xl transition-transform duration-700 will-change-transform"
          style={{
            transform: isDesktop && !prefersReducedMotion
              ? `translate3d(${mousePos.x * -14}px, ${mousePos.y * -12}px, -40px)`
              : undefined,
          }}
        />
      </div>

      {/* Atmospheric Ambient Purple Horizontal Volumetric Light Ribbon */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[140%] h-[120px] sm:h-[180px] bg-gradient-to-r from-transparent via-[#8B5CF6]/16 to-transparent blur-2xl -rotate-6 transform will-change-transform" />
      </div>

      {/* Master 3D Video Mockup Player */}
      <div
        ref={stageRef}
        id="hero-master-picture-stage"
        style={{
          transform: mouseTransform,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full transition-transform duration-300 ease-out flex items-center justify-center will-change-transform"
      >
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_55px_rgba(24,13,56,0.18)] border border-purple-100/60 bg-slate-900/5 backdrop-blur-sm"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cinematic Website UI 3D Animation Video */}
          <video
            ref={videoRef}
            poster="/assets/website-ui-animation-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl block shadow-inner pointer-events-none"
          >
            <source src="/assets/website-ui-animation-preview.mp4" type="video/mp4" />
            <source src="/assets/website-ui-animation.mp4" type="video/mp4" />
            <source src="/animations/website-animation.mp4" type="video/mp4" />
          </video>

          {/* Subtle Creative-Agency Purple Edge Gradient / Glow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-purple-500/20 shadow-[inset_0_0_40px_rgba(99,32,238,0.08)]" />
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
