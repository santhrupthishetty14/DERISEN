import React, { useState } from 'react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, CheckCircle2, ChevronDown } from 'lucide-react';

interface ContactPageProps {
  onSuccess: (name: string) => void;
  onNavigate: (page: string) => void;
}

const FAQS = [
  {
    q: 'How fast can DE.RISEN start our branding or IT project?',
    a: 'Once we complete our initial Discovery call and align on scope, our team typically kicks off strategy and asset development within 3 to 5 business days.'
  },
  {
    q: 'Do you offer customized packages for startups and SMEs?',
    a: 'Yes! While we offer standardized packages (Essential, Growth, Enterprise), all our engagements are tailored to your company’s specific milestones, budget, and growth objectives.'
  },
  {
    q: 'Can DE.RISEN handle both digital marketing and website development together?',
    a: 'Absolutely. Our 4-Pillar Operating Model integrates Creative Design, Branding, Digital Marketing, and Full-Stack IT Solutions under one unified team so you don\'t have to manage multiple vendors.'
  },
  {
    q: 'Who will oversee our project execution?',
    a: 'Every project is directly overseen by our executive leadership—Founder & CEO Shweta Deharkar and Managing Director Lejai Jayakumar—ensuring senior-level quality and strategic rigor.'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ onSuccess, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Branding & Identity');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccess(name);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Page Hero Banner with High-Resolution Photography */}
      <PageHeroBanner
        badge="GET IN TOUCH WITH DE.RISEN"
        title="Let's Build Something"
        highlightedWord="Remarkable."
        subtitle="Have a project in mind or need strategic consultation? Our leadership team is ready to connect with you."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
        currentPage="Contact Us"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* 2. Contact Channels Strip */}
      <section className="py-16 bg-surface-subtle border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917899910917?text=Hi%20DE.RISEN%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                FASTEST RESPONSE
              </span>
              <h4 className="text-lg font-black text-brand-dark mb-1">WhatsApp Us</h4>
              <p className="text-xs text-gray-500 font-medium mb-3">+91 78999 10917</p>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:underline">
                Chat Directly →
              </span>
            </a>

            {/* Direct Phone */}
            <a
              href="tel:+917899910917"
              className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-brand-purple/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-lilacSoft text-brand-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                PHONE INQUIRY
              </span>
              <h4 className="text-lg font-black text-brand-dark mb-1">Call Our Office</h4>
              <p className="text-xs text-gray-500 font-medium mb-3">+91 78999 10917</p>
              <span className="text-xs font-bold text-brand-purple flex items-center gap-1 group-hover:underline">
                Call Now →
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:derisen.official@gmail.com"
              className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-brand-pink/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-brand-pink flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                EMAIL DIRECT
              </span>
              <h4 className="text-lg font-black text-brand-dark mb-1">Email Us</h4>
              <p className="text-xs text-gray-500 font-medium mb-3">derisen.official@gmail.com</p>
              <span className="text-xs font-bold text-brand-pink flex items-center gap-1 group-hover:underline">
                Send Mail →
              </span>
            </a>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                TIMINGS
              </span>
              <h4 className="text-lg font-black text-brand-dark mb-1">Working Hours</h4>
              <p className="text-xs text-gray-500 font-medium">Mon - Sat: 9:30 AM - 6:30 PM</p>
              <p className="text-[11px] text-gray-400 font-medium mt-1">Closed on Sundays</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Contact Form & Details Section */}
      <section className="py-24 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl shadow-brand-dark/5 relative overflow-hidden">
            <div className="mb-8">
              <span className="eyebrow">SEND AN INQUIRY</span>
              <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                Tell Us About Your Project
              </h3>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Fill out the form below and we will prepare a tailored proposal within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-black text-brand-dark mb-1">Message Received!</h4>
                <p className="text-sm text-gray-600 font-medium mb-6">
                  Thank you for reaching out. A DE.RISEN director will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple/90 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm text-brand-dark font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm text-brand-dark font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm text-brand-dark font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
                      Interested Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm text-brand-dark font-medium transition-all bg-white"
                    >
                      <option value="Branding & Identity">Branding & Identity</option>
                      <option value="Creative Design & Print">Creative Design & Print</option>
                      <option value="Website & IT Solutions">Website & IT Solutions</option>
                      <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                      <option value="Motion Graphics & Video">Motion Graphics & Video</option>
                      <option value="Full Comprehensive Suite">Full Comprehensive Suite</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-dark mb-1.5">
                    Project Details & Goals
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, target audience, timeline, or any specific requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm text-brand-dark font-medium transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-violet hover:from-brand-purple/90 hover:to-brand-violet/90 text-white font-black text-sm tracking-wide shadow-lg shadow-brand-purple/30 hover:shadow-xl hover:shadow-brand-purple/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    'Sending Proposal Request...'
                  ) : (
                    <>
                      <span>Submit Inquiry to DE.RISEN</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Location & FAQs Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Headquarters Card */}
            <div className="p-8 rounded-3xl bg-brand-dark text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-purple/30 rounded-full filter blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[11px] font-mono font-bold text-brand-cyan uppercase tracking-wider block mb-2">
                  HEADQUARTERS
                </span>
                <h4 className="text-xl font-black mb-3">DE.RISEN Creative Agency</h4>
                <div className="flex items-start gap-3 text-sm text-gray-300 font-medium mb-4">
                  <MapPin className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <span>
                    Hubli / Bangalore, Karnataka, India
                    <br />
                    Serving clients globally across UAE, USA, and India.
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>CIN / REG: REGISTERED AGENCY</span>
                  <span className="text-emerald-400 font-bold">● ACTIVE</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-surface-subtle rounded-3xl p-8 border border-gray-200">
              <span className="eyebrow">FREQUENTLY ASKED</span>
              <h4 className="text-xl font-black text-brand-dark mb-5">Quick Answers</h4>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-brand-dark flex items-center justify-between gap-3 hover:text-brand-purple transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-brand-purple' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-50 pt-2 animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
