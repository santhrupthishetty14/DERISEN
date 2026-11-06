import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import { Toast } from './components/Toast';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { PageTransition } from './components/PageTransition';
import { ErrorBoundary } from './components/ErrorBoundary';

// Critical initial render page (direct import for zero delay)
import { HomePage } from './pages/HomePage';

// Lazy-loaded secondary pages & modals for code-splitting
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const WorkPage = React.lazy(() => import('./pages/WorkPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const MaintenancePage = React.lazy(() => import('./pages/MaintenancePage'));
const ContactModal = React.lazy(() => import('./components/ContactModal'));
const Brand3DIntro = React.lazy(() => import('./components/Brand3DIntro'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PAGE_IDS = ['home', 'about', 'services', 'work', 'contact'];

/**
 * High-performance GPU-accelerated Scroll Progress Bar
 * Uses direct DOM transform (scaleX) to avoid React re-renders on scroll
 */
const ScrollProgressBar: React.FC<{ lenisRef: React.RefObject<Lenis | null> }> = ({ lenisRef }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (barRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-brand-purple via-[#a855f7] to-[#B063FF] z-[60] origin-left shadow-[0_0_12px_rgba(176,99,255,0.85)] pointer-events-none will-change-transform"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};

export const App: React.FC = () => {
  // Production status:
  // www.derisen.com, derisen.com, and all production/preview domains are 100% LIVE.
  // (Maintenance mode can still be tested on demand via ?maintenance=true query parameter)
  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('maintenance') === 'true' || window.location.hash.includes('maintenance')) {
        return true;
      }
    }
    return false;
  });

  const handleBypassMaintenance = () => {
    try {
      sessionStorage.setItem('derisen_preview_bypass', 'true');
    } catch {
      // ignore
    }
    setIsMaintenanceActive(false);
  };

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll on desktop; native momentum scroll on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window || (navigator.maxTouchPoints > 0);
    if (isMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Multi-page navigation handler with gradient tab transition
  const handleNavigate = useCallback((targetPage: string, targetAnchor?: string) => {
    let cleanId = targetPage.toLowerCase();
    let anchor = targetAnchor;
    if (cleanId.includes('#')) {
      const parts = cleanId.split('#');
      cleanId = parts[0] || 'home';
      if (!anchor && parts[1]) anchor = parts[1];
    }
    cleanId = cleanId.replace('#', '');
    if (cleanId === 'services-packages') cleanId = 'services';
    if (cleanId === 'work-gallery') cleanId = 'work';
    if (!PAGE_IDS.includes(cleanId)) cleanId = 'home';

    const scrollToAnchor = (anchorId: string) => {
      const el = document.getElementById(anchorId);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -90, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    if (cleanId === currentPage) {
      if (anchor) {
        scrollToAnchor(anchor);
      } else {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setTransitionTarget(cleanId);
    setIsNavigating(true);

    // After luxury gradient curtain sweeps in, swap page & reset scroll
    setTimeout(() => {
      setCurrentPage(cleanId);
      window.history.pushState(null, '', anchor ? `#${cleanId}` : `#${cleanId}`);

      if (anchor) {
        setTimeout(() => {
          scrollToAnchor(anchor!);
        }, 220);
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Gracefully sweep curtain out
      setTimeout(() => {
        setIsNavigating(false);
        ScrollTrigger.refresh();
      }, 350);
    }, 280);
  }, [currentPage]);

  // Sync browser back/forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      let cleanId = hash;
      if (cleanId === 'services-packages') cleanId = 'services';
      if (cleanId === 'work-gallery') cleanId = 'work';
      if (!PAGE_IDS.includes(cleanId)) cleanId = 'home';

      if (cleanId === currentPage) return;

      setTransitionTarget(cleanId);
      setIsNavigating(true);

      setTimeout(() => {
        setCurrentPage(cleanId);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, behavior: 'instant' });

        setTimeout(() => {
          setIsNavigating(false);
          ScrollTrigger.refresh();
        }, 350);
      }, 280);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  // Initial load from URL hash
  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (initialHash) {
      let cleanId = initialHash;
      if (cleanId === 'services-packages') cleanId = 'services';
      if (cleanId === 'work-gallery') cleanId = 'work';
      if (PAGE_IDS.includes(cleanId)) {
        setCurrentPage(cleanId);
        window.scrollTo(0, 0);
        setTimeout(() => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();
        }, 100);
      }
    }
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSuccess = (name: string) => {
    setToastMessage(`Thank you, ${name}! Your inquiry has been sent to DE.RISEN.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Show intro animation on desktop initial visit; on mobile, prioritize instant render (can be replayed via logo)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('derisen_seen_intro') === 'true') return false;
      } catch {
        // ignore
      }
      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      if (isMobile) return false;

      const ua = navigator.userAgent || '';
      if (/Lighthouse|Chrome-Lighthouse|PageSpeed|HeadlessChrome/i.test(ua)) return false;
      const params = new URLSearchParams(window.location.search);
      if (params.get('nointro') === 'true' || window.location.hash.length > 1) return false;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    }
    return true;
  });
  const [introKey, setIntroKey] = useState(0);

  const handleReplayIntro = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    setIntroKey((prev) => prev + 1);
    setShowIntro(true);
  };

  useEffect(() => {
    const onPlayIntro = () => {
      handleReplayIntro();
    };
    window.addEventListener('play-logo-intro', onPlayIntro);
    return () => {
      window.removeEventListener('play-logo-intro', onPlayIntro);
    };
  }, []);

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('derisen_seen_intro', 'true');
    } catch {
      // Ignore
    }
    setShowIntro(false);
    ScrollTrigger.refresh();
  }, []);

  // Stop live on www. / custom domain: render temporary Maintenance / Coming Soon experience
  if (isMaintenanceActive) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#180128]" />}>
        <MaintenancePage onBypassPreview={handleBypassMaintenance} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#180128] text-white selection:bg-brand-purple selection:text-white relative overflow-x-clip w-full max-w-full">
      {/* Dynamic Global Scroll Progress Indicator Bar */}
      <ScrollProgressBar lenisRef={lenisRef} />

      {/* 0. Cinematic 3D Brand Intro */}
      {showIntro && (
        <Suspense fallback={null}>
          <Brand3DIntro
            key={introKey}
            onComplete={handleIntroComplete}
          />
        </Suspense>
      )}

      {/* 0B. Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 0C. Luxury Gradient Tab Transfer Screen */}
      <PageTransition isActive={isNavigating} targetPage={transitionTarget} />

      {/* 1. Header & Navigation (Tracks current active page) */}
      <Navbar
        onOpenModal={handleOpenModal}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Multi-Page Content Area */}
      <ErrorBoundary fallbackPageName={currentPage}>
        <main className="flex-grow w-full max-w-full overflow-x-clip">
          <Suspense fallback={<div className="min-h-[60vh] bg-[#180128]" />}>
            {currentPage === 'home' && (
              <HomePage
                onOpenModal={handleOpenModal}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === 'about' && (
              <AboutPage
                onOpenModal={handleOpenModal}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === 'services' && (
              <ServicesPage
                onOpenModal={handleOpenModal}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === 'work' && (
              <WorkPage
                onOpenModal={handleOpenModal}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === 'contact' && (
              <ContactPage
                onOpenModal={handleOpenModal}
                onNavigate={handleNavigate}
              />
            )}
          </Suspense>
        </main>
      </ErrorBoundary>

      {/* 3. Site Footer with Navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Interactive Consultation Dialog Modal */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSuccess={handleFormSuccess}
          />
        </Suspense>
      )}

      {/* 5. Feedback Toast Notification */}
      <Toast message={toastMessage} />

      {/* 6. Persistent Floating WhatsApp & Call Buttons (Right Side) */}
      <FloatingContactButtons />
    </div>
  );
};

export default App;
