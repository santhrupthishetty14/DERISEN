import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Tag, Megaphone, Code } from 'lucide-react';
import gsap from 'gsap';

interface HeroVisualProps {
  timeline?: gsap.core.Timeline | null;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ timeline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const waveLinesRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const object3DRef = useRef<HTMLDivElement>(null);
  const mugRef = useRef<HTMLDivElement>(null);
  const sphere1Ref = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);
  const sphere3Ref = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // Initial state setup for visual layers (prevent layout shift)
    gsap.set(
      [
        bgGlowRef.current,
        waveLinesRef.current,
        laptopRef.current,
        phoneRef.current,
        object3DRef.current,
        mugRef.current,
        sphere1Ref.current,
        sphere2Ref.current,
        sphere3Ref.current,
      ],
      { opacity: 0, willChange: 'transform, opacity' }
    );

    // Build timeline if not provided from parent
    const masterTl = timeline || gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Step 1: Background Glow & Ambient Aura (Starts at 0.0s)
    masterTl.fromTo(
      bgGlowRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 0.75, scale: 1, duration: 1.2, ease: 'power2.out' },
      0.1
    );

    // Step 2: Continuous Moving Wave Lines
    masterTl.fromTo(
      waveLinesRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.45, y: 0, duration: 1.0, ease: 'power2.out' },
      0.4
    );

    // Step 6: Main Laptop Device Visual Enters (Smooth scale & settle)
    masterTl.fromTo(
      laptopRef.current,
      { opacity: 0, scale: 0.93, rotationX: 4, rotationY: -3, y: 20 },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        y: 0,
        duration: 1.15,
        ease: 'power3.out',
      },
      0.85
    );

    // Step 7: Smartphone Enters Subtly from Right
    masterTl.fromTo(
      phoneRef.current,
      { opacity: 0, x: 40, y: 25, rotation: 5 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: -2,
        duration: 1.05,
        ease: 'power3.out',
      },
      1.1
    );

    // Step 8: Purple 3D Object Enters
    masterTl.fromTo(
      object3DRef.current,
      { opacity: 0, scale: 0.85, y: -25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
      },
      1.25
    );

    // Step 9: Branded Mug & Floating Spheres Enter
    masterTl.fromTo(
      mugRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
      1.35
    );

    masterTl.fromTo(
      [sphere1Ref.current, sphere2Ref.current, sphere3Ref.current],
      { opacity: 0, scale: 0.65 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'back.out(1.2)',
      },
      1.45
    );

    // After entrance completes, start subtle continuous GSAP idle animations
    masterTl.add(() => {
      // 3D Object subtle continuous breathing float
      if (object3DRef.current) {
        gsap.to(object3DRef.current, {
          y: '-=12',
          rotation: '+=2.5',
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Sphere 1 idle float
      if (sphere1Ref.current) {
        gsap.to(sphere1Ref.current, {
          y: '-=14',
          x: '+=5',
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Sphere 2 idle float (out of phase)
      if (sphere2Ref.current) {
        gsap.to(sphere2Ref.current, {
          y: '+=10',
          x: '-=4',
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      // Sphere 3 idle float
      if (sphere3Ref.current) {
        gsap.to(sphere3Ref.current, {
          y: '-=8',
          scale: 1.05,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2,
        });
      }
    });

    return () => {
      window.removeEventListener('resize', checkDesktop);
      masterTl.kill();
    };
  }, [timeline]);

  // Desktop Mouse Parallax Handler
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

  // Parallax layer transforms
  const bgTransform = isDesktop ? `translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)` : 'none';
  const waveTransform = isDesktop ? `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)` : 'none';
  const laptopTransform = isDesktop
    ? `translate3d(${mousePos.x * 14}px, ${mousePos.y * 12}px, 0) rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 2.5}deg)`
    : 'none';
  const object3DTransform = isDesktop ? `translate3d(${mousePos.x * 22}px, ${mousePos.y * 18}px, 0)` : 'none';
  const phoneTransform = isDesktop
    ? `translate3d(${mousePos.x * 26}px, ${mousePos.y * 22}px, 0) rotateY(${mousePos.x * 3.5}deg) rotateX(${-mousePos.y * 3.5}deg)`
    : 'none';
  const mugTransform = isDesktop ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10}px, 0)` : 'none';
  const sphere1Transform = isDesktop ? `translate3d(${mousePos.x * 30}px, ${mousePos.y * 24}px, 0)` : 'none';
  const sphere2Transform = isDesktop ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * -16}px, 0)` : 'none';
  const sphere3Transform = isDesktop ? `translate3d(${mousePos.x * 18}px, ${mousePos.y * -20}px, 0)` : 'none';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] mx-auto min-h-[460px] sm:min-h-[520px] flex items-center justify-center select-none perspective-[1200px]"
    >
      {/* LAYER 1: Ambient Background Glow */}
      <div
        ref={bgGlowRef}
        style={{ transform: bgTransform }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
      >
        <div className="w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-brand-purple/25 via-brand-violet/20 to-brand-lilac/30 blur-3xl" />
      </div>

      {/* LAYER 1B: Wave Lines */}
      <div
        ref={waveLinesRef}
        style={{ transform: waveTransform }}
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out overflow-hidden"
      >
        <svg viewBox="0 0 600 500" className="w-full h-full opacity-40" fill="none">
          <path
            d="M 50,250 C 150,100 250,380 400,200 C 500,80 550,280 600,220"
            stroke="url(#gsapWaveGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-wave-flow"
          />
          <path
            d="M 0,180 C 120,320 280,100 420,300 C 500,420 580,260 620,320"
            stroke="url(#gsapWaveGrad2)"
            strokeWidth="1.5"
            className="animate-wave-float opacity-60"
          />
          <defs>
            <linearGradient id="gsapWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6320EE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gsapWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6320EE" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 2: Purple Abstract 3D Object */}
      <div
        ref={object3DRef}
        style={{ transform: object3DTransform }}
        className="absolute -top-10 right-4 sm:right-12 z-20 pointer-events-none"
      >
        <div className="relative w-36 h-36 sm:w-44 sm:h-44">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_15px_30px_rgba(99,32,238,0.45)]">
            <defs>
              <radialGradient id="gsapAbstractGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#EDE9FE" />
                <stop offset="30%" stopColor="#A855F7" />
                <stop offset="70%" stopColor="#6320EE" />
                <stop offset="100%" stopColor="#1E1147" />
              </radialGradient>
              <linearGradient id="gsapSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#C4B5FD" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6320EE" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="origin-center">
              <path
                d="M100 20 C140 20 180 60 180 100 C180 140 140 180 100 180 C60 180 20 140 20 100 C20 60 60 20 100 20 Z"
                fill="url(#gsapAbstractGrad)"
                opacity="0.95"
              />
              <path
                d="M100 35 C130 35 165 70 165 100 C165 130 130 165 100 165 C70 165 35 130 35 100 C35 70 70 35 100 35 Z"
                fill="none"
                stroke="url(#gsapSpecular)"
                strokeWidth="4"
              />
              <ellipse cx="100" cy="85" rx="45" ry="30" fill="url(#gsapSpecular)" opacity="0.6" transform="rotate(-25 100 85)" />
              <ellipse cx="115" cy="110" rx="35" ry="50" fill="url(#gsapAbstractGrad)" opacity="0.8" transform="rotate(35 115 110)" />
            </g>
          </svg>
        </div>
      </div>

      {/* LAYER 3: Floating 3D Metallic Spheres */}
      <div
        ref={sphere1Ref}
        style={{ transform: sphere1Transform }}
        className="absolute -top-4 right-16 z-30 pointer-events-none"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFFFFF_0%,#C4B5FD_25%,#7C3AED_60%,#180D38_100%)] shadow-[0_12px_28px_rgba(99,32,238,0.45)]" />
      </div>

      <div
        ref={sphere2Ref}
        style={{ transform: sphere2Transform }}
        className="absolute bottom-10 -left-6 z-30 pointer-events-none"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFFFFF_0%,#DDD6FE_20%,#6320EE_65%,#150A33_100%)] shadow-[0_8px_20px_rgba(99,32,238,0.35)]" />
      </div>

      <div
        ref={sphere3Ref}
        style={{ transform: sphere3Transform }}
        className="absolute top-1/2 -right-6 z-30 pointer-events-none"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,#FFFFFF_0%,#A78BFA_40%,#4338CA_85%,#0F0728_100%)] shadow-[0_6px_15px_rgba(99,32,238,0.3)]" />
      </div>

      {/* LAYER 4: Branded Ceramic Mug */}
      <div
        ref={mugRef}
        style={{ transform: mugTransform }}
        className="hidden sm:flex absolute -bottom-10 left-6 z-25"
      >
        <div className="relative w-28 h-26 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-t-xl rounded-b-3xl shadow-[0_20px_35px_rgba(24,13,56,0.18)] border border-gray-200 p-3 flex flex-col items-center justify-center">
          <span className="text-sm font-black text-brand-purple tracking-tight">De.risen</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Creative</span>
          <div className="absolute -right-4 top-4 w-5 h-14 border-[5px] border-l-0 border-gray-300 rounded-r-2xl" />
        </div>
      </div>

      {/* LAYER 5: Desktop Laptop Mockup */}
      <div
        ref={laptopRef}
        style={{ transform: laptopTransform }}
        className="w-full max-w-[480px] sm:max-w-[520px] z-10"
      >
        <div className="bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] rounded-t-2xl p-3 sm:p-3.5 shadow-[0_25px_60px_rgba(24,13,56,0.38)] border border-white/20 relative">
          <div className="bg-[#0D061F] rounded-xl p-5 sm:p-6 text-white min-h-[280px] sm:min-h-[300px] flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(circle_at_80%_25%,rgba(99,32,238,0.5)_0%,transparent_65%)]">
            <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="font-extrabold text-brand-lilac tracking-tight ml-2 text-xs">De.risen</span>
              </div>
              <span className="text-white/60 text-[11px] font-mono">Agency Suite</span>
            </div>

            <div className="my-auto py-2">
              <h4 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight mb-2">
                Smart Solutions.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan">
                  Real Impact.
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-white/70 max-w-[280px] leading-relaxed">
                We create strategies and designs that drive real results.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
              <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg p-2 flex flex-col items-center gap-1 text-[10px] font-bold text-brand-lilac transition-colors">
                <PenTool className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Creative</span>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg p-2 flex flex-col items-center gap-1 text-[10px] font-bold text-brand-lilac transition-colors">
                <Tag className="w-3.5 h-3.5 text-brand-violetLight" />
                <span>Branding</span>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg p-2 flex flex-col items-center gap-1 text-[10px] font-bold text-brand-lilac transition-colors">
                <Megaphone className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Marketing</span>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg p-2 flex flex-col items-center gap-1 text-[10px] font-bold text-brand-lilac transition-colors">
                <Code className="w-3.5 h-3.5 text-brand-violetLight" />
                <span>IT Tech</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-t-2xl pointer-events-none" />
        </div>

        <div className="w-[106%] h-3.5 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 -ml-[3%] rounded-b-xl shadow-lg border-t border-gray-400" />
      </div>

      {/* LAYER 6: Overlapping Smartphone Mockup */}
      <div
        ref={phoneRef}
        style={{ transform: phoneTransform }}
        className="absolute -right-2 sm:-right-4 -bottom-8 z-40 w-44 sm:w-48"
      >
        <div className="bg-[#0B041A] rounded-[32px] p-2.5 shadow-[0_25px_50px_rgba(0,0,0,0.5)] border-[3px] border-gray-700">
          <div className="w-16 h-3 bg-black rounded-b-lg mx-auto mb-2" />

          <div className="bg-gradient-to-b from-[#180D38] to-[#100726] rounded-[24px] p-3.5 text-white text-[11px] min-h-[250px] flex flex-col justify-between border border-white/10">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-brand-lilac text-xs">De.risen</span>
                <span className="text-[10px] text-white/50">9:41</span>
              </div>
              <div className="font-extrabold text-xs text-white leading-tight mb-3">
                Your Brand.<br />
                Our Creativity.<br />
                <span className="text-brand-violetLight">Real Impact.</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-2">
                <span className="text-brand-violetLight">✦</span> Creative Design
              </div>
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-2">
                <span className="text-brand-violetLight">✦</span> Branding
              </div>
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-2">
                <span className="text-brand-violetLight">✦</span> Digital Marketing
              </div>
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-2">
                <span className="text-brand-violetLight">✦</span> IT Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
