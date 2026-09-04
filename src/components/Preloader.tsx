import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Initial state setup: Dot starts scaled down, logo hidden inside dot origin
    gsap.set(dotRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    gsap.set(logoWrapperRef.current, {
      scale: 0.12,
      opacity: 0,
      filter: 'blur(10px)',
      transformOrigin: '50% 50%',
    });

    const masterTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        setIsDone(true);
        document.body.style.overflow = '';
        onComplete();
      },
    });

    // Step 1: Organic Dot Popup with natural elastic physics
    masterTl.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.55)',
    });

    // Step 2: Gentle organic breath
    masterTl.to(dotRef.current, {
      scale: 1.18,
      duration: 0.4,
      ease: 'sine.inOut',
    });

    // Step 3: Dot expands naturally into liquid ring as real De.risen logo blooms seamlessly from within
    masterTl.to(
      dotRef.current,
      {
        scale: 6,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      },
      '+=0.02'
    );

    masterTl.to(
      logoWrapperRef.current,
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power4.out',
      },
      '<'
    );

    // Step 4: Natural pause to absorb the brand
    masterTl.to({}, { duration: 0.5 });

    // Step 5: Smooth cinematic exit transition
    masterTl
      .to(logoWrapperRef.current, {
        scale: 1.03,
        opacity: 0,
        y: -12,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '-=0.15'
      )
      .to(
        curtainBottomRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '<'
      );

    return () => {
      masterTl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden bg-white select-none"
    >
      {/* Top Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-white border-b border-gray-100 z-10 shadow-[0_10px_30px_rgba(24,13,56,0.06)]"
      />

      {/* Bottom Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-white border-t border-gray-100 z-10 shadow-[0_-10px_30px_rgba(24,13,56,0.06)]"
      />

      {/* Center Stage: Fluid Dot & Blooming Logo */}
      <div className="relative z-20 flex items-center justify-center w-full h-full">
        {/* Natural Purple Dot */}
        <div
          ref={dotRef}
          className="absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-purple shadow-[0_0_24px_rgba(99,32,238,0.45)] pointer-events-none"
        />

        {/* Real De.risen Logo Emerging From Inside */}
        <div
          ref={logoWrapperRef}
          className="relative flex items-center justify-center px-6"
        >
          <img
            src="/assets/derisen-logo-transparent.png"
            alt="De.risen"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_10px_28px_rgba(99,32,238,0.12)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;


