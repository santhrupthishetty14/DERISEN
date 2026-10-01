import React from 'react';
import { Logo } from '../components/Logo';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = '#' + page;
    }
  };

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden w-full max-w-full">
      {/* Background Cybernetic Circuit Texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 circuit-grid-dark opacity-15" />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div onClick={(e) => handleNav(e, 'home')} className="cursor-pointer">
              <Logo variant="light" className="mb-4" />
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
              Smart Solutions. Real Impact. Creative Design, Branding, Digital Marketing &amp; IT Solutions under one unified leadership.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {/* WhatsApp - Official Green */}
              <a
                href="https://wa.me/917899910917?text=Hi%20DE.RISEN%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_12px_rgba(37,211,102,0.35)] hover:shadow-[0_0_18px_rgba(37,211,102,0.6)] cursor-pointer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
              </a>

              {/* Instagram - Official Gradient */}
              <a
                href="https://www.instagram.com/de.risen/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_12px_rgba(220,39,67,0.35)] hover:shadow-[0_0_18px_rgba(188,24,136,0.6)] cursor-pointer"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>

              {/* Twitter / X - Official Twitter Sky Blue */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_12px_rgba(29,161,242,0.35)] hover:shadow-[0_0_18px_rgba(29,161,242,0.6)] cursor-pointer"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter className="w-4.5 h-4.5 fill-current" />
              </a>

              {/* Facebook - Official Facebook Blue */}
              <a
                href="https://www.facebook.com/profile.php?id=61556596557316"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_12px_rgba(24,119,242,0.35)] hover:shadow-[0_0_18px_rgba(24,119,242,0.6)] cursor-pointer"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook className="w-4.5 h-4.5 fill-current" />
              </a>

              {/* LinkedIn - Official LinkedIn Blue */}
              <a
                href="https://www.linkedin.com/company/109275476/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_12px_rgba(10,102,194,0.35)] hover:shadow-[0_0_18px_rgba(10,102,194,0.6)] cursor-pointer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={(e) => handleNav(e, 'home')}
                  className="hover:text-brand-violetLight transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-brand-violetLight transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight transition-colors cursor-pointer text-left"
                >
                  Services &amp; Packages
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'work')}
                  className="hover:text-brand-violetLight transition-colors cursor-pointer text-left"
                >
                  Work Gallery &amp; Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'contact')}
                  className="hover:text-brand-violetLight transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Core Verticals */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Core Verticals
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight cursor-pointer text-left"
                >
                  01 Brand Identity &amp; Strategy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight cursor-pointer text-left"
                >
                  02 Graphic &amp; Print Design
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight cursor-pointer text-left"
                >
                  03 Performance Digital Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight cursor-pointer text-left"
                >
                  04 Website &amp; Full-Stack IT Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-brand-violetLight cursor-pointer text-left"
                >
                  05 3D Motion Graphics &amp; Video Shoots
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <a href="mailto:derisenofficial@gmail.com" className="hover:text-white transition-colors">
                  derisenofficial@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+917899910917" className="hover:text-white transition-colors">
                  +91 78999 10917
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Karnataka, India &amp; Global Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>© 2026 DE.RISEN. All rights reserved. Creative • Digital • Technology.</div>
          <div className="font-semibold text-white/40">Smart Solutions. Real Impact.</div>
        </div>
      </div>
    </footer>
  );
};
