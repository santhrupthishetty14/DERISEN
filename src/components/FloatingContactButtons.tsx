import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingContactButtonsProps {
  whatsappNumber?: string;
  phoneNumber?: string;
  whatsappMessage?: string;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  whatsappNumber = '917899910917',
  phoneNumber = '+917899910917',
  whatsappMessage = 'Hi DE.RISEN, I would like to inquire about your services.',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Fade in smoothly after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${phoneNumber}`;

  return (
    <aside
      aria-label="Quick Contact Options"
      className={`fixed right-3.5 sm:right-6 bottom-5 sm:bottom-8 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-out select-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* 1. WhatsApp Floating Button (Top) */}
      <div className="relative flex items-center group">
        {/* Desktop Tooltip / Pill Badge */}
        <span
          className="pointer-events-none hidden md:flex items-center gap-1.5 absolute right-[calc(100%+12px)] px-3 py-1.5 rounded-full bg-[#180128]/95 backdrop-blur-md border border-[#25D366]/40 text-[#25D366] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Chat on WhatsApp
        </span>

        {/* Action Link */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with DE.RISEN on WhatsApp (+91 78999 10917)"
          title="Chat on WhatsApp (+91 78999 10917)"
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.7)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#180128]"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 drop-shadow-sm" />
        </a>
      </div>

      {/* 2. Direct Call Floating Button (Bottom) */}
      <div className="relative flex items-center group">
        {/* Desktop Tooltip / Pill Badge */}
        <span
          className="pointer-events-none hidden md:flex items-center gap-1.5 absolute right-[calc(100%+12px)] px-3 py-1.5 rounded-full bg-[#180128]/95 backdrop-blur-md border border-[#B063FF]/40 text-purple-200 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#B063FF] animate-pulse" />
          Call: +91 78999 10917
        </span>

        {/* Action Link */}
        <a
          href={phoneUrl}
          aria-label="Call DE.RISEN (+91 78999 10917)"
          title="Call DE.RISEN (+91 78999 10917)"
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#6320EE] via-[#7C3AED] to-[#B063FF] text-white shadow-[0_6px_20px_rgba(176,99,255,0.45)] hover:shadow-[0_8px_28px_rgba(176,99,255,0.7)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B063FF] focus:ring-offset-2 focus:ring-offset-[#180128]"
        >
          {/* Phone Icon */}
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-sm" />
        </a>
      </div>
    </aside>
  );
};

export default FloatingContactButtons;
