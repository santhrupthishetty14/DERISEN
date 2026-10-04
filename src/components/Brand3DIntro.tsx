import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface Brand3DIntroProps {
  onComplete: () => void;
}

/**
 * Full-Screen Complete Pure White Logo Opening Animation for DE.RISEN
 * 
 * Powered by "Purple_logo_glowing_animation_20260911193702.mp4":
 *  - 100% edge-to-edge full-screen viewport presentation.
 *  - Calibrated with precision levels filter so background is 100% complete pure white (#FFFFFF).
 *  - Seamlessly blends with the surrounding white canvas without any gray box, borders, or lines.
 *  - Cleanly holds the final frame, then smoothly dissolves into the homepage.
 *  - Instant skip with tap/click anywhere or keyboard 'ESC'.
 */
export const Brand3DIntro: React.FC<Brand3DIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const skipRef = useRef<(() => void) | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

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

    const prevHtmlBg = document.documentElement.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlColorScheme = document.documentElement.style.colorScheme;
    const prevBodyColorScheme = document.body.style.colorScheme;

    // Temporarily set document root & body to white during intro so no dark gutters can ever appear
    document.documentElement.style.setProperty("background-color", "#FFFFFF", "important");
    document.body.style.setProperty("background-color", "#FFFFFF", "important");
    document.documentElement.style.setProperty("color-scheme", "only light", "important");
    document.body.style.setProperty("color-scheme", "only light", "important");

    document.body.style.overflow = "hidden";
    const navLogo = document.getElementById("main-nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    let isTerminated = false;

    const restoreStyles = () => {
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
      document.documentElement.style.removeProperty("color-scheme");
      document.body.style.removeProperty("color-scheme");
      if (prevHtmlBg) document.documentElement.style.backgroundColor = prevHtmlBg;
      if (prevBodyBg) document.body.style.backgroundColor = prevBodyBg;
      if (prevHtmlColorScheme) document.documentElement.style.colorScheme = prevHtmlColorScheme;
      if (prevBodyColorScheme) document.body.style.colorScheme = prevBodyColorScheme;
      document.body.style.overflow = "";
    };

    const finishIntro = () => {
      if (isTerminated) return;
      isTerminated = true;

      window.removeEventListener("keydown", handleKeyDown);
      if (navLogo) navLogo.style.opacity = "1";
      restoreStyles();

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
        duration: 0.3,
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
      { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out" }
    );

    // Play the clean 2s sparkling logo video clip
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    const handleVideoEnded = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: finishIntro,
        });
      } else {
        finishIntro();
      }
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnded);
    }

    // Fallback: 2s video ends at ~2000ms; dissolve smoothly after 2400ms max if ended event is delayed
    const fallbackTimer = setTimeout(() => {
      handleVideoEnded();
    }, 2400);

    return () => {
      clearTimeout(fallbackTimer);
      if (video) {
        video.removeEventListener("ended", handleVideoEnded);
        try {
          video.pause();
        } catch {
          // ignore
        }
      }
      restoreStyles();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="brand-intro-screen fixed inset-0 z-[100] w-full h-full min-h-[100dvh] select-none cursor-pointer overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#FFFFFF",
        background: "#FFFFFF",
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 100%)",
        colorScheme: "only light",
        forcedColorAdjust: "none",
        WebkitFontSmoothing: "antialiased",
      }}
      aria-label="DE.RISEN Animated Logo Intro"
    >
      {/* 1. Bulletproof pure white media layer: 1x1 white PNG image stretched 100% x 100% */}
      {/* Mobile browsers (including Samsung Internet & Chrome Auto Dark Mode) NEVER darken <img> elements */}
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20 select-none"
        style={{
          width: "100%",
          height: "100%",
          colorScheme: "only light",
          forcedColorAdjust: "none",
        }}
      />

      {/* 2. Bulletproof pure white SVG background canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          colorScheme: "only light",
          forcedColorAdjust: "none",
        }}
      >
        <rect width="100%" height="100%" fill="#FFFFFF" />
      </svg>

      {/* Top Bar with Skip Button: protected with light styling so dark mode never inverts text */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 pointer-events-auto">
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          style={{
            colorScheme: "only light",
            forcedColorAdjust: "none",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            borderColor: "rgba(0, 0, 0, 0.12)",
            color: "#1f2937",
          }}
          aria-label="Skip Intro Animation"
        >
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#1f2937" }}>
            Skip
          </span>
          <span className="text-[10px] font-mono transition-colors" style={{ color: "#6b7280" }}>
            ESC
          </span>
        </button>
      </div>

      {/* Pure White Video Stage */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden p-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 100%)",
          colorScheme: "only light",
          forcedColorAdjust: "none",
        }}
      >
        <video
          ref={videoRef}
          src="/assets/purple_logo_sparkle_2s.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="w-[78%] sm:w-[68%] max-w-[580px] h-auto max-h-[75vh] object-contain pointer-events-none transform scale-90 sm:scale-85"
          style={{
            backgroundColor: "#FFFFFF",
            filter: "contrast(1.18) brightness(1.09)",
            colorScheme: "only light",
            forcedColorAdjust: "none",
          }}
        />
      </div>
    </div>
  );
};

export default Brand3DIntro;
