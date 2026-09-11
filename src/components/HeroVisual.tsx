import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Entrance animation for video stage
  useEffect(() => {
    if (!stageRef.current) return;

    gsap.fromTo(
      stageRef.current,
      {
        opacity: 0,
        scale: 0.94,
        y: 24,
      },
      {
        opacity: 1,
        scale: 1.0,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      }
    );

    if (auraRef.current) {
      gsap.fromTo(
        auraRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 0.85, scale: 1.0, duration: 1.3, ease: 'power2.out' }
      );
    }
  }, []);

  // Desktop 3D Mouse Parallax
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
    setIsHovered(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const mouseTransform = isDesktop
    ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0) rotateY(${mousePos.x * 3.5}deg) rotateX(${-mousePos.y * 3.0}deg)`
    : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[760px] mx-auto flex items-center justify-center select-none py-2 sm:py-0"
      style={{ perspective: '1200px' }}
    >
      {/* Background Soft Purple Aura Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={auraRef}
          id="hero-ambient-aura"
          className="w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-gradient-to-tr from-[#6320EE]/28 via-[#8B5CF6]/20 to-[#00E5FF]/16 blur-3xl transition-transform duration-700 will-change-transform"
          style={{
            transform: isDesktop
              ? `translate3d(${mousePos.x * -14}px, ${mousePos.y * -12}px, -40px)`
              : undefined,
          }}
        />
      </div>

      {/* Atmospheric Ambient Purple Horizontal Volumetric Light Ribbon */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[140%] h-[120px] sm:h-[180px] bg-gradient-to-r from-transparent via-[#8B5CF6]/18 to-transparent blur-2xl -rotate-6 transform will-change-transform" />
      </div>

      {/* Ambient Delicate Flowing Wave Ribbons Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-60 sm:w-96 h-60 sm:h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
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
          className="relative group w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_55px_rgba(24,13,56,0.18)] border border-gray-100/90 bg-slate-900/5 backdrop-blur-sm"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 4-Second Cinematic 3D Animation Video */}
          <video
            ref={videoRef}
            src="/assets/website-ui-animation-preview.mp4"
            poster="/assets/website-ui-animation-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl block"
          />

          {/* Video Controls Overlay on Hover */}
          <div
            className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2 z-20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0 group-hover:opacity-100'
            }`}
          >
            <button
              onClick={restartVideo}
              aria-label="Restart animation"
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 shadow-lg"
              title="Replay from start"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 shadow-lg"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <Play className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlaying ? 'opacity-60' : 'text-brand-cyan'}`} />
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 shadow-lg"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-purple" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
