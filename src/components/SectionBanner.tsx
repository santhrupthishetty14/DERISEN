import React from 'react';

interface SectionBannerProps {
  /** Eyebrow label shown above the title (e.g. "THE VISIONARIES BEHIND") */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Unsplash or any image URL for the banner background */
  imageUrl: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Overlay darkness 0–100. Default 65 */
  overlayOpacity?: number;
  /** Extra Tailwind classes for the outer wrapper */
  className?: string;
  /** Min height in px. Default 280 */
  minHeight?: number;
}

/**
 * SectionBanner
 * A full-width cinematic banner strip with a parallax background image,
 * dark gradient overlay, and centered title text.
 * Drop this above any section's content to give it a premium hero-strip feel.
 */
export const SectionBanner: React.FC<SectionBannerProps> = ({
  eyebrow,
  title,
  subtitle,
  imageUrl,
  imageAlt = 'Section banner',
  overlayOpacity = 65,
  className = '',
  minHeight = 280,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ minHeight }}
      role="img"
      aria-label={imageAlt}
    >
      {/* ── High-quality background image (no compression / blur) ── */}
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ imageRendering: 'auto' }}
      />

      {/* ── Layered gradient overlay for contrast + purple brand tint ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(19, 6, 62, ${overlayOpacity / 100}) 0%,
            rgba(99, 32, 238, ${(overlayOpacity * 0.55) / 100}) 50%,
            rgba(19, 6, 62, ${overlayOpacity / 100}) 100%
          )`,
        }}
      />

      {/* ── Subtle grid-line texture on top of overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Text content ── */}
      <div className="relative z-10 text-center px-6 py-14 max-w-3xl mx-auto">
        {eyebrow && (
          <span className="inline-block text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/60 mb-3">
            {eyebrow}
          </span>
        )}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.45)' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base text-white/75 font-medium max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* ── Decorative purple accent line ── */}
        <div className="mt-6 mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-brand-purple to-brand-violet opacity-90 shadow-[0_0_12px_rgba(99,32,238,0.7)]" />
      </div>
    </div>
  );
};
