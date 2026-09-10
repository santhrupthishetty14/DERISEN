import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Brand3DIntro } from './components/Brand3DIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { OperatingModel } from './sections/OperatingModel';
import { About } from './sections/About';
import { Leadership } from './sections/Leadership';
import { WhatWeDo } from './sections/WhatWeDo';
import { ProcessTimeline } from './sections/ProcessTimeline';
import { Promise } from './sections/Promise';
import { ServicesPackages } from './sections/ServicesPackages';
import { ServiceCatalog } from './sections/ServiceCatalog';
import { DigitalProduction } from './sections/DigitalProduction';
import { WorkGallery } from './sections/WorkGallery';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Initial refresh after render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
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

  const handleIntroComplete = React.useCallback(() => {
    setShowIntro(false);
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-purple selection:text-white relative">
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
      <Navbar onOpenModal={handleOpenModal} />

      {/* 2. Main Content Sections */}
      <main className="flex-grow">
        {/* Page 2: Hero Section & 4 Pillars Strip */}
        <Hero onOpenModal={handleOpenModal} />

        {/* Page 3: Performance & Statistics (96+, 51+, 2+, 100%) */}
        <Stats />

        {/* Page 4: 4 Services. One Operating Model */}
        <OperatingModel />

        {/* Page 5: Company Introduction, Vision, Mission, Goal */}
        <About />

        {/* Page 6: Leadership (The Visionaries Behind DE.RISEN) */}
        <Leadership />

        {/* Page 7: What We Do & Why Choose DE.RISEN */}
        <WhatWeDo />

        {/* Page 8: Structured Work Process (6 Steps) */}
        <ProcessTimeline />

        {/* Page 9: Our Promise & 6-Node Workflow Pipeline */}
        <Promise />

        {/* Page 10: Services & Packages */}
        <ServicesPackages />

        {/* Page 11: Individual Services Catalog */}
        <ServiceCatalog />

        {/* Page 12: Digital + Production Stack */}
        <DigitalProduction />

        {/* Work Gallery & Testimonials */}
        <WorkGallery />

        {/* Final Conversion CTA: "Let's Make Your Brand Rise." */}
        <FinalCTA onOpenModal={handleOpenModal} />
      </main>

      {/* 3. Site Footer */}
      <Footer />

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
