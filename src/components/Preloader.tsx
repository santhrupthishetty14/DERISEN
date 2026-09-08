import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const letters = lettersRef.current.filter(Boolean);

    // ── initial states ──
    gsap.set(letters, { yPercent: 110, opacity: 0 });
    gsap.set(dotRef.current, { scale: 0, opacity: 0 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });

    if (accentLineRef.current) {
      const len = (accentLineRef.current as SVGLineElement & { getTotalLength?: () => number }).getTotalLength?.() ?? 80;
      gsap.set(accentLineRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    }

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        setIsDone(true);
        document.body.style.overflow = '';
        onComplete();
      },
    });

    // 1. Draw accent line (left bar of the D)
    tl.to(accentLineRef.current, {
      strokeDashoffset: 0,
      duration: 0.55,
      ease: 'power3.out',
    });

    // 2. "De" slides up
    tl.to(
      letters.slice(0, 2),
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.07,
      },
      '-=0.25'
    );

    // 3. The dot pops in
    tl.to(
      dotRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      },
      '-=0.1'
    );

    // 4. "risen" letters stagger in
    tl.to(
      letters.slice(2),
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.065,
      },
      '-=0.25'
    );

    // 5. Tagline fades in
    tl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=0.1'
    );

    // 6. Hold
    tl.to({}, { duration: 0.85 });

    // 7. Logo fades up out
    tl.to([logoRef.current, taglineRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    });

    // 8. Curtain wipes to reveal site
    tl.to(
      curtainRef.current,
      {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.75,
        ease: 'power4.inOut',
      },
      '-=0.15'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  const risenPart = ['r', 'i', 's', 'e', 'n'];

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
      style={{ background: '#0d0618' }}
    >
      {/* Curtain overlay — scaleY from 1→0 on exit */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-10"
        style={{ background: '#0d0618', transformOrigin: 'top center' }}
      />

      {/* Radial purple ambient glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,32,238,0.20) 0%, transparent 70%)',
        }}
      />

      {/* Centre stage */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full" style={{ gap: '20px' }}>

        {/* Logo row */}
        <div ref={logoRef} className="flex items-center" style={{ gap: 0 }}>

          {/* D with animated SVG accent bar */}
          <span className="relative inline-flex items-center" style={{ marginRight: '1px' }}>
            <svg
              className="absolute pointer-events-none"
              style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}
              width="5"
              height="60"
              viewBox="0 0 5 60"
            >
              <line
                ref={accentLineRef}
                x1="2.5"
                y1="4"
                x2="2.5"
                y2="56"
                stroke="#6320EE"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span
              ref={el => { lettersRef.current[0] = el; }}
              className="inline-block"
              style={{
                fontSize: 'clamp(52px, 8vw, 82px)',
                fontFamily: "'Inter', 'Outfit', system-ui, sans-serif",
                fontWeight: 800,
                color: '#ffffff',
                paddingLeft: '13px',
                lineHeight: 1,
              }}
            >
              D
            </span>
          </span>

          {/* e */}
          <span
            ref={el => { lettersRef.current[1] = el; }}
            className="inline-block"
            style={{
              fontSize: 'clamp(52px, 8vw, 82px)',
              fontFamily: "'Inter', 'Outfit', system-ui, sans-serif",
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1,
            }}
          >
            e
          </span>

          {/* Animated dot */}
          <span
            ref={dotRef}
            className="inline-block"
            style={{
              fontSize: 'clamp(52px, 8vw, 82px)',
              fontFamily: "'Inter', 'Outfit', system-ui, sans-serif",
              fontWeight: 800,
              color: '#6320EE',
              lineHeight: 1,
              display: 'inline-block',
            }}
          >
            .
          </span>

          {/* risen — individual letter animation */}
          {risenPart.map((char, i) => (
            <span
              key={i}
              ref={el => { lettersRef.current[2 + i] = el; }}
              className="inline-block"
              style={{
                fontSize: 'clamp(52px, 8vw, 82px)',
                fontFamily: "'Inter', 'Outfit', system-ui, sans-serif",
                fontWeight: 800,
                color: '#a855f7',
                lineHeight: 1,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            color: 'rgba(168,85,247,0.6)',
            fontWeight: 500,
            margin: 0,
          }}
        >
          Rise above. Redefine.
        </p>
      </div>
    </div>
  );
};

export default Preloader;
