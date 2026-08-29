import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(name);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl p-8 sm:p-10 shadow-2xl relative border border-gray-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-brand-lilac text-brand-dark hover:text-brand-purple flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="eyebrow">START A PROJECT</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-1">
            Let's Talk About Your Brand
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Tell us what you're looking to build, and our leadership team will connect within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-surface-subtle focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 text-sm text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-surface-subtle focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 text-sm text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
              Service Vertical
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-surface-subtle focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 text-sm text-gray-900 outline-none transition-all"
            >
              <option value="Full Service Suite">All Solutions (Design, Branding, Marketing, IT)</option>
              <option value="Brand Identity">01 Brand Identity & Strategy</option>
              <option value="Graphic Design">02 Graphic Design & Creatives</option>
              <option value="Print & Marketing">03 Print & Collateral Marketing</option>
              <option value="Digital UI/UX">04 Website & Mobile UI/UX</option>
              <option value="Motion & Video">05 Motion Graphics & Video Editing</option>
              <option value="Photography & Production">06 Photography & Video Shoots</option>
              <option value="Digital Marketing">07 Digital Marketing & SEO/Ads</option>
              <option value="Website & IT Solutions">08 Custom Web Applications & IT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
              Project Scope or Vision
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your objectives, timelines, or requirements..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-surface-subtle focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 text-sm text-gray-900 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-pill-primary justify-center py-3.5 mt-2"
          >
            <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}</span>
            <span className="btn-icon-circle">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
