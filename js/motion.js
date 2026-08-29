/**
 * DE.RISEN — MOTION DESIGN & STAT COUNTER SCRIPTS
 * Handles IntersectionObserver scroll reveals, metric count-ups, and orb dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initStatCounters();
  initOrbParallax();
});

/**
 * 1. Intersection Observer for Scroll Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 2. Animated Counter for Statistics Section
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          animateCounter(stat, target, suffix);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

function animateCounter(element, target, suffix) {
  const duration = 1800; // ms
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // Ease out cubic
    const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    
    element.textContent = current + suffix;

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target + suffix;
    }
  }, frameDuration);
}

/**
 * 3. 3D Orb Parallax Effect on Mousemove
 */
function initOrbParallax() {
  const hero = document.querySelector('.hero-section');
  const orbs = document.querySelectorAll('.floating-orb');

  if (!hero || orbs.length === 0 || window.innerWidth < 992) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 12;
      const x = deltaX * speed;
      const y = deltaY * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = `translate(0px, 0px)`;
    });
  });
}
