import React, { useState } from 'react';
import { X, AlertCircle, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SlideArrowButton } from './SlideArrowButton';
import { sendInquiry, buildMailtoUrl, TARGET_EMAIL } from '../utils/emailService';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Full Service Suite');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dispatchInfo, setDispatchInfo] = useState<{ mailtoUrl: string; whatsappUrl: string } | null>(null);

  if (!isOpen) return null;

  const handleModalClose = () => {
    setDispatchInfo(null);
    setErrorMsg(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await sendInquiry({
      name,
      email,
      service,
      message,
      source: 'Header/Floating Contact Modal',
    });

    setIsSubmitting(false);

    if (result.success) {
      if (result.isDirectMail && result.mailtoUrl && result.whatsappUrl) {
        setDispatchInfo({
          mailtoUrl: result.mailtoUrl,
          whatsappUrl: result.whatsappUrl,
        });
      } else {
        onSuccess(name);
        setName('');
        setEmail('');
        setMessage('');
        setErrorMsg(null);
        onClose();
      }
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1A0B2E]/95 backdrop-blur-2xl rounded-3xl w-full max-w-xl p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative border border-purple-500/30 text-white">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#B063FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-purple-200 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {dispatchInfo ? (
          <div className="py-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-1">
                Inquiry Details Prepared!
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
                Your email client was triggered to send your project details to{' '}
                <span className="font-bold text-[#B063FF]">{TARGET_EMAIL}</span>.
                You can also connect instantly via WhatsApp:
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={dispatchInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> Send Instantly via WhatsApp (+91 78999 10917)
              </a>

              <a
                href={dispatchInfo.mailtoUrl}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4B006E] to-[#620D9C] hover:from-[#620D9C] hover:to-[#B063FF] text-white text-xs sm:text-sm font-bold transition-all shadow-md"
              >
                <Mail className="w-4 h-4" /> Re-open Email Client ({TARGET_EMAIL})
              </a>

              <button
                type="button"
                onClick={handleModalClose}
                className="w-full py-2.5 rounded-xl border border-white/15 text-purple-200 hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer mt-1"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <span className="eyebrow text-[#B063FF]">START A PROJECT</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                Let's Talk About Your Brand
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80">
                Tell us what you're looking to build, and our leadership team will connect within 24 hours.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#B063FF] focus:ring-2 focus:ring-[#B063FF]/20 text-sm text-white placeholder:text-purple-300/40 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#B063FF] focus:ring-2 focus:ring-[#B063FF]/20 text-sm text-white placeholder:text-purple-300/40 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-1.5">
                  Service Vertical
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:bg-[#1A0B2E] focus:border-[#B063FF] focus:ring-2 focus:ring-[#B063FF]/20 text-sm text-white outline-none transition-all"
                >
                  <option value="Full Service Suite" className="bg-[#1A0B2E] text-white">All Solutions (Design, Branding, Marketing, IT)</option>
                  <option value="Brand Identity" className="bg-[#1A0B2E] text-white">01 Brand Identity & Strategy</option>
                  <option value="Graphic Design" className="bg-[#1A0B2E] text-white">02 Graphic Design & Creatives</option>
                  <option value="Print & Marketing" className="bg-[#1A0B2E] text-white">03 Print & Collateral Marketing</option>
                  <option value="Digital UI/UX" className="bg-[#1A0B2E] text-white">04 Website & Mobile UI/UX</option>
                  <option value="Motion & Video" className="bg-[#1A0B2E] text-white">05 Motion Graphics & Video Editing</option>
                  <option value="Photography & Production" className="bg-[#1A0B2E] text-white">06 Photography & Video Shoots</option>
                  <option value="Digital Marketing" className="bg-[#1A0B2E] text-white">07 Digital Marketing & SEO/Ads</option>
                  <option value="Website & IT Solutions" className="bg-[#1A0B2E] text-white">08 Custom Web Applications & IT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-1.5">
                  Project Scope or Vision
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your objectives, timelines, or requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#B063FF] focus:ring-2 focus:ring-[#B063FF]/20 text-sm text-white placeholder:text-purple-300/40 outline-none transition-all resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                  <a
                    href={buildMailtoUrl({ name, email, service, message })}
                    className="inline-flex items-center gap-1.5 font-bold text-red-300 hover:text-white underline ml-6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-3.5 h-3.5" /> Open default email app to send directly
                  </a>
                </div>
              )}

              <SlideArrowButton
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                variant="purple"
                size="lg"
                className="w-full mt-2"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};
