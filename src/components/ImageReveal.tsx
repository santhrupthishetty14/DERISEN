import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ImageRevealVariant =
  | 'clipReveal'   // Wipe reveal from left (clip-path)
  | 'zoomFade'     // Scale-up + fade in
  | 'riseBlur'     // Slide up + deblur
  | 'peelIn'       // 3D Y-axis flip reveal
  | 'shimmerFade'; // Fade in + shimmer sweep

interface ImageRevealProps {
  children: ReactNode;
  variant?: ImageRevealVariant;
  delay?: number;          // seconds
  duration?: number;       // seconds
  threshold?: number;      // 0–1 viewport threshold
  className?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  variant = 'zoomFade',
  delay = 0,
  duration = 0.9,
  threshold = 0.15,
  className = '',
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const ctx = gsap.context(() => {
      const commonTrigger = {
        trigger: wrap,
        start: `top ${Math.round((1 - threshold) * 100)}%`,
        toggleActions: 'play none none none',
      };

      if (variant === 'clipReveal') {
        // Clip-path wipe from left edge → full reveal
        gsap.set(wrap, { overflow: 'hidden' });
        gsap.fromTo(
          inner,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.06 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration,
            delay,
            ease: 'power3.inOut',
            scrollTrigger: commonTrigger,
          }
        );
      } else if (variant === 'zoomFade') {
        gsap.fromTo(
          inner,
          { opacity: 0, scale: 1.1, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration,
            delay,
            ease: 'expo.out',
            scrollTrigger: commonTrigger,
          }
        );
      } else if (variant === 'riseBlur') {
        gsap.fromTo(
          inner,
          { opacity: 0, y: 48, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: commonTrigger,
          }
        );
      } else if (variant === 'peelIn') {
        gsap.set(wrap, { perspective: 900 });
        gsap.fromTo(
          inner,
          { opacity: 0, rotateY: -35, scale: 0.94, transformOrigin: 'left center' },
          {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: commonTrigger,
          }
        );
      } else if (variant === 'shimmerFade') {
        // Fade in, then after reveal add shimmer CSS class
        gsap.fromTo(
          inner,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              ...commonTrigger,
              onEnter: () => {
                inner.classList.add('img-shimmer-active');
              },
            },
          }
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, [variant, delay, duration, threshold]);

  return (
    <div ref={wrapRef} className={`img-reveal-wrap ${className}`}>
      <div ref={innerRef} className="img-reveal-inner will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default ImageReveal;
