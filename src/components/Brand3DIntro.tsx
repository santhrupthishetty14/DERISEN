import React, { useEffect, useRef, useCallback, useState } from "react";
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

    // Play video automatically
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

  // When video reaches completion
  const handleVideoEnded = () => {
    if (hasEnded) return;
    setHasEnded(true);

    // Hold the completed crisp logo for 0.7s, then smoothly dissolve into the website
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
      className="fixed inset-0 z-[100] w-screen h-screen select-none cursor-pointer overflow-hidden bg-white"
      style={{
        backgroundColor: "#FFFFFF",
      }}
      aria-label="DE.RISEN Animated Logo Intro"
    >
      {/* Top Bar with Skip Button */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 pointer-events-auto">
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md text-gray-700 hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">ESC</span>
        </button>
      </div>

      {/* Full-Screen Pure White Video Stage: edge-to-edge with pure white background */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden bg-white">
        <video
          ref={videoRef}
          src="/assets/purple_logo_glowing_animation.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-contain max-h-screen max-w-screen pointer-events-none"
          style={{
            backgroundColor: "#FFFFFF",
            // Precision level mapping: pushes any off-white/gray (230-255) to 100% complete pure white (#FFFFFF),
            // making the video background completely seamless with the page canvas while keeping purple colors vibrant
            filter: "contrast(1.18) brightness(1.09)",
          }}
        />
      </div>
    </div>
  );
};

export default Brand3DIntro;
