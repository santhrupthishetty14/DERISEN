import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface Brand3DIntroProps {
  onComplete: () => void;
}

/**
 * Full-Screen Complete Pure White Logo Opening Animation for DE.RISEN
 * 
 * Powered by dynamic HTML5 Canvas rendering:
 *  - 100% edge-to-edge pure white (#FFFFFF) canvas background.
 *  - Immune to Samsung Internet / Chrome Mobile Night Mode / Dark Mode inversion because
 *    the entire viewport is a single bitmap canvas surface (no background divs).
 *  - The logo video is painted directly onto the white canvas with precision contrast & brightness levels,
 *    making it seamlessly blend into the surrounding white background without any dark frames or seams.
 *  - Smooth dissolve into the homepage on end or skip.
 */
export const Brand3DIntro: React.FC<Brand3DIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    document.body.style.overflow = "hidden";
    const navLogo = document.getElementById("main-nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    let isTerminated = false;
    let animFrameId: number;

    const finishIntro = () => {
      if (isTerminated) return;
      isTerminated = true;

      cancelAnimationFrame(animFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
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
      { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out" }
    );

    // Setup Canvas and Video loop
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const renderLoop = () => {
      if (isTerminated) return;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // 1. Paint 100% solid pure white edge-to-edge
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 2. Draw centered video frame when ready
          if (video && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
            const aspect = video.videoWidth / video.videoHeight;
            // On mobile devices, ensure the logo is comfortably large but does not touch edges
            const maxW = Math.min(canvas.width * 0.90, canvas.height * 0.85 * aspect);
            const drawW = Math.min(maxW, 640 * (window.devicePixelRatio || 1));
            const drawH = drawW / aspect;
            const drawX = Math.round((canvas.width - drawW) / 2);
            const drawY = Math.round((canvas.height - drawH) / 2);

            ctx.filter = "contrast(1.18) brightness(1.09)";
            ctx.drawImage(video, drawX, drawY, drawW, drawH);
            ctx.filter = "none";
          }
        }
      }
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // Play video
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
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (video) {
        video.removeEventListener("ended", handleVideoEnded);
        try {
          video.pause();
        } catch {
          // ignore
        }
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 select-none cursor-pointer overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 99999,
        backgroundColor: "#FFFFFF",
      }}
      aria-label="DE.RISEN Animated Logo Intro"
    >
      {/* 1. Full-screen HTML5 Canvas: Guarantees 100% pure white edge-to-edge on all mobile browsers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "#FFFFFF",
        }}
      />

      {/* 2. Hidden background video driving the canvas frames */}
      <video
        ref={videoRef}
        src="/assets/purple_logo_sparkle_2s.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        className="absolute opacity-0 pointer-events-none"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* 3. Top Bar with Skip Button */}
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
    </div>
  );
};

export default Brand3DIntro;
