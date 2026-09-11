import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import { CustomCursor } from './components/CustomCursor';
import { Brand3DIntro } from './components/Brand3DIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const VALID_PAGES = ['home', 'about', 'services', 'contact'];

function getPageFromHash(): string {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  // Map legacy section hashes if any
  if (hash === 'services-packages' || hash === 'work' || hash === 'work-gallery') return 'services';
  if (VALID_PAGES.includes(hash)) return hash;
  return 'home';
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);
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

    // Fallback scroll listener for scroll progress
    const handleNativeScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleNativeScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronize hash changes with currentPage state
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      setScrollProgress(0);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    let target = page.toLowerCase();
    if (target === 'services-packages') target = 'services';
    if (target === 'work-gallery') target = 'work';
    if (!VALID_PAGES.includes(target)) target = 'home';

    setCurrentPage(target);
    window.location.hash = '#' + target;
    setScrollProgress(0);

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setTimeout(() => ScrollTrigger.refresh(), 120);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSuccess = (name: string) => {
    setToastMessage(`Thank you, ${name}! Your inquiry has been sent to DE.RISEN.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('derisen_seen_intro');
      if (seen) return false;
    }
    return getPageFromHash() === 'home';
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

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-purple selection:text-white relative overflow-x-hidden w-full">
      {/* Dynamic Global Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-brand-purple via-[#a855f7] to-brand-cyan z-[60] origin-left shadow-[0_0_12px_rgba(99,32,238,0.85)] pointer-events-none transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 0. Cinematic 3D Brand Intro (White Studio, 3D De.risen Logo) */}
      {showIntro && (
        <Brand3DIntro
          key={introKey}
          onComplete={handleIntroComplete}
        />
      )}

      {/* 0B. Custom Magnetic Cursor (Desktop) */}
      <CustomCursor />

      {/* 1. Header & Navigation */}
      <Navbar
        onOpenModal={handleOpenModal}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Multi-Page Content Area with Smooth Page Transitions */}
      <main className="flex-grow pt-[70px] sm:pt-[90px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
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

            {currentPage === 'contact' && (
              <ContactPage
                onSuccess={handleFormSuccess}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
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
