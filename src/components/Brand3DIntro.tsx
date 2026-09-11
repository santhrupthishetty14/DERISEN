import React, { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

interface Brand3DIntroProps {
  onComplete: () => void;
}

/**
 * Premium Logo Opening Animation for DE.RISEN
 * 
 * Powered directly by the supplied high-fidelity video:
 * "Purple_logo_glowing_animation_20260911193702.mp4"
 * 
 * Features:
 *  - Fluid purple metallic ribbon / liquid swirl and glowing light around the DE.RISEN logo.
 *  - Seamless pure white background matching the video's background.
 *  - Responsive video container across desktop, tablet, and mobile viewports.
 *  - Holds the final pristine frame cleanly, then smoothly transitions to the website.
 *  - Interactive tap/click to skip, and keyboard 'ESC' / Space key support.
 */
export const Brand3DIntro: React.FC<Brand3DIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const skipRef = useRef<(() => void) | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [hasEnded, setHasEnded] = useState(false);

  const handleSkip = useCallback(() => {
    if (skipRef.current) {
      skipRef.current();
    }
  }, []);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }

    document.body.style.overflow = "hidden";
    const navLogo = document.getElementById("main-nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    let isTerminated = false;

    const finishIntro = () => {
      if (isTerminated) return;
      isTerminated = true;

      window.removeEventListener("keydown", handleKeyDown);
      if (navLogo) navLogo.style.opacity = "1";
      document.body.style.overflow = "";

      onCompleteRef.current();
    };

    skipRef.current = () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {
          // ignore
        }
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: finishIntro,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        skipRef.current?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Fade in skip button gently
    gsap.fromTo(
      skipBtnRef.current,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: "power2.out" }
    );

    // Video play handling
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay with sound, ensure muted and retry
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // When video reaches end or near completion
  const handleVideoEnded = () => {
    if (hasEnded) return;
    setHasEnded(true);

    // Reveal tagline smoothly on the final frame
    gsap.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // Hold the completed pristine logo briefly, then smoothly transition
    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          const navLogo = document.getElementById("main-nav-logo");
          if (navLogo) navLogo.style.opacity = "1";
          document.body.style.overflow = "";
          onCompleteRef.current();
        },
      });
    }, 700);
  };

  // Near-end fallback monitor
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasEnded) return;

    if (video.duration && video.currentTime >= video.duration - 0.25) {
      handleVideoEnded();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden bg-white"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="DE.RISEN Animated Logo Intro"
    >
      {/* Top Bar with Skip Button and Mobile Notice */}
      <div className="absolute top-5 left-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center justify-between pointer-events-auto">
        <span className="sm:hidden text-[10px] font-bold text-gray-400 tracking-wider uppercase bg-black/5 px-3 py-1 rounded-full border border-black/10">
          Tap to skip
        </span>
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="ml-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md text-gray-700 hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">ESC</span>
        </button>
      </div>

      {/* Main Video Animation Stage */}
      <div className="relative w-full max-w-[1000px] px-4 sm:px-8 flex flex-col items-center justify-center">
        <video
          ref={videoRef}
          src="/assets/purple_logo_glowing_animation.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-auto max-h-[65vh] sm:max-h-[75vh] object-contain select-none pointer-events-none mix-blend-multiply"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        />

        {/* Subtle Brand Tagline that reveals on the final frame */}
        <div
          ref={taglineRef}
          className="mt-4 sm:mt-6 flex flex-col items-center justify-center text-center opacity-0 translate-y-2 pointer-events-none transition-all duration-500"
        >
          <p
            className="text-[10px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.22em] sm:tracking-[0.32em] uppercase text-gray-800 text-center"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>

          <p className="mt-1.5 text-[9px] sm:text-[11px] font-semibold tracking-[0.28em] sm:tracking-[0.38em] uppercase text-[#6320EE] text-center">
            Rise Above &bull; Redefine
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brand3DIntro;
