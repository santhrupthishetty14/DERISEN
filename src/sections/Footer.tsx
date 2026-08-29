import React from 'react';
import { Logo } from '../components/Logo';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';
import { NAV_ITEMS } from '../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10 border-t border-white/10 relative">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Logo variant="light" className="mb-4" />
            <p className="text-xs sm:text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
              Smart Solutions. Real Impact. Creative Design, Branding, Digital Marketing &amp; IT Solutions under one roof.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-purple flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-purple flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-purple flex items-center justify-center text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-brand-violetLight transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Verticals */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Core Verticals
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#individual-services" className="hover:text-brand-violetLight">01 Brand Identity</a></li>
              <li><a href="#individual-services" className="hover:text-brand-violetLight">02 Graphic Design</a></li>
              <li><a href="#individual-services" className="hover:text-brand-violetLight">03 Print &amp; Marketing</a></li>
              <li><a href="#individual-services" className="hover:text-brand-violetLight">04 Digital UI/UX</a></li>
              <li><a href="#digital-production" className="hover:text-brand-violetLight">05 Motion &amp; Video</a></li>
              <li><a href="#digital-production" className="hover:text-brand-violetLight">08 Website &amp; IT Solutions</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-violetLight flex-shrink-0" />
                <span>contact@derisen.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-violetLight flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-violetLight flex-shrink-0" />
                <span>Mumbai &amp; Global Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>© 2026 DE.RISEN. All rights reserved. Client approved design reference.</div>
          <div className="font-semibold text-white/40">Creative • Digital • Technology</div>
        </div>
      </div>
    </footer>
  );
};
