import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Brand3DIntro } from './components/Brand3DIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import { PageTransition } from './components/PageTransition';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ContactPage } from './pages/ContactPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PAGE_IDS = ['home', 'about', 'services', 'work', 'contact'];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      if (typeof e.progress === 'number') {
        setScrollProgress(e.progress);
      }
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Native scroll listener fallback for progress
    const handleNativeScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Multi-page navigation handler with gradient tab transition
  const handleNavigate = useCallback((targetPage: string) => {
    let cleanId = targetPage.toLowerCase().replace('#', '');
    if (cleanId === 'services-packages') cleanId = 'services';
    if (cleanId === 'work-gallery') cleanId = 'work';
    if (!PAGE_IDS.includes(cleanId)) cleanId = 'home';

    if (cleanId === currentPage) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTransitionTarget(cleanId);
    setIsNavigating(true);

    // After luxury gradient curtain sweeps in, swap page & reset scroll
    setTimeout(() => {
      setCurrentPage(cleanId);
      window.history.pushState(null, '', `#${cleanId}`);

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      setScrollProgress(0);

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
        setScrollProgress(0);

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

  const [showIntro, setShowIntro] = useState(true);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#180128] text-white selection:bg-brand-purple selection:text-white relative overflow-x-clip w-full max-w-full">
      {/* Dynamic Global Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-brand-purple via-[#a855f7] to-[#B063FF] z-[60] origin-left shadow-[0_0_12px_rgba(176,99,255,0.85)] pointer-events-none transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 0. Cinematic 3D Brand Intro */}
      {showIntro && (
        <Brand3DIntro
          key={introKey}
          onComplete={handleIntroComplete}
        />
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
      <main className="flex-grow w-full max-w-full overflow-x-clip">
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
      </main>

      {/* 3. Site Footer with Navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Interactive Consultation Dialog Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleFormSuccess}
      />

      {/* 5. Feedback Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
