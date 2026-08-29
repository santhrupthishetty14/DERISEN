import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'hidden'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop without touch screen
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 1024) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Determine element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('pointer');
      } else if (target.closest('[data-cursor="view"], .cursor-view-target')) {
        setCursorType('view');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing animation loop
    let animationFrameId: number;
    const animateTrail = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-purple pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
        }}
      />

      {/* Trailing Ring / View Badge */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99998] flex items-center justify-center transition-all duration-300 ease-out border ${
          cursorType === 'pointer'
            ? 'w-12 h-12 -translate-x-6 -translate-y-6 bg-brand-purple/15 border-brand-purple shadow-[0_0_15px_rgba(99,32,238,0.3)] scale-110'
            : cursorType === 'view'
            ? 'w-16 h-16 -translate-x-8 -translate-y-8 bg-brand-purple/80 backdrop-blur-sm border-white text-white font-mono text-[10px] font-black tracking-widest shadow-[0_0_20px_rgba(99,32,238,0.5)]'
            : 'w-8 h-8 -translate-x-4 -translate-y-4 bg-transparent border-brand-purple/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorType === 'view' && <span>VIEW</span>}
      </div>
    </>
  );
};
