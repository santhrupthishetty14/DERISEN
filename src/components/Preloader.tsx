import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable body scroll during preloader
    document.body.style.overflow = 'hidden';

    // Animate progress 0 -> 100% over ~1.6s
    const startTime = performance.now();
    const duration = 1600;

    const interval = requestAnimationFrame(function update(now) {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(update);
      } else {
        // Trigger exit timeline
        const tl = gsap.timeline({
          onComplete: () => {
            setIsDone(true);
            document.body.style.overflow = '';
            onComplete();
          },
        });

        tl.to('.preloader-content', {
          opacity: 0,
          y: -25,
          duration: 0.5,
          ease: 'power3.in',
        })
          .to(
            '.preloader-curtain-top',
            {
              yPercent: -100,
              duration: 0.7,
              ease: 'power4.inOut',
            },
            '-=0.2'
          )
          .to(
            '.preloader-curtain-bottom',
            {
              yPercent: 100,
              duration: 0.7,
              ease: 'power4.inOut',
            },
            '<'
          );
      }
    });

    return () => {
      cancelAnimationFrame(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden">
      {/* Top and Bottom Transition Curtains */}
      <div className="preloader-curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#0B041A] z-10" />
      <div className="preloader-curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#0B041A] z-10" />

      {/* Main Preloader Content */}
      <div className="preloader-content relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-lg">
        {/* Animated Brand Mark */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-violet flex items-center justify-center shadow-[0_0_30px_rgba(99,32,238,0.5)] border border-white/20">
            <span className="text-white font-black text-2xl tracking-tighter">D</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            De<span className="text-brand-purple">.</span>risen
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-lilac/80 mb-8 max-w-md">
          Creative Thinking. Strategic Execution. Measurable Results.
        </p>

        {/* Progress Container */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-gradient-to-r from-brand-purple via-brand-violet to-brand-cyan transition-all duration-75 ease-out shadow-[0_0_12px_#6320EE]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Percentage */}
        <div className="flex items-center justify-between w-64 sm:w-80 text-[11px] font-mono font-bold text-white/50">
          <span>INITIALIZING</span>
          <span className="text-brand-lilac font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
