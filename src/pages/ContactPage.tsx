import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { FinalCTA } from '../sections/FinalCTA';

interface ContactPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenModal, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Branding & Identity',
    budget: '₹25,000 - ₹50,000',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const faqs = [
    {
      q: 'What is the typical timeline for an end-to-end brand identity project?',
      a: 'Most comprehensive brand identity packages (logo system, visual guidelines, typography, stationery, digital templates) are delivered within 10 to 18 business days with phased milestone reviews.',
    },
    {
      q: 'How do your monthly retainer packages operate?',
      a: 'Our Starter, Growth, and Enterprise retainers provide dedicated creative and digital hours each month with guaranteed turnaround SLAs, weekly sprints, and priority support across all four verticals.',
    },
    {
      q: 'Do you collaborate with international and remote clients?',
      a: 'Yes! While headquartered in Karnataka, India, DE.RISEN operates globally with remote clients across the US, UK, Middle East, and Southeast Asia using agile collaboration tools.',
    },
    {
      q: 'Can we customize a package that combines IT solutions with marketing?',
      a: 'Absolutely. We specialize in unified ecosystem solutions where your web application, brand narrative, and performance ad funnels are engineered in complete synergy.',
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-clip bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="CONTACT US / LET'S CONNECT"
        title="Let's Build Something"
        highlightWord="Extraordinary Together."
        description="Whether you need a full brand overhaul, a high-converting web platform, or a monthly growth retainer, our executive team is ready to bring your vision to life."
        breadcrumb="Contact Us"
        onNavigateHome={() => onNavigate('home')}
        tags={['Instant WhatsApp', 'Custom Scopes', 'Quick Turnarounds', 'Global Remote Delivery']}
      />

      {/* 2. Main Contact Grid & Direct Inquiry Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAFC] relative">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Contact Methods & Office Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-4">
                  <span>Fast Response Channels</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight mb-4">
                  Speak Directly with Our Strategy Team
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  No automated chatbots or endless queues. Connect directly with our core directors and get immediate clarity on your project roadmap.
                </p>

                {/* Direct Channel Cards */}
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917899910917?text=Hi%20DE.RISEN%2C%20I%20would%20like%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-gray-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Direct WhatsApp</div>
                      <div className="text-base font-bold text-brand-dark group-hover:text-emerald-600 transition-colors">
                        +91 78999 10917
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">Instant reply &amp; project chat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:derisen.official@gmail.com"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-gray-200/80 hover:border-brand-purple hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Official Inquiries</div>
                      <div className="text-base font-bold text-brand-dark group-hover:text-brand-purple transition-colors">
                        derisen.official@gmail.com
                      </div>
                      <div className="text-xs text-gray-500">Replies within 4 business hours</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-purple group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917899910917"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-gray-200/80 hover:border-brand-cyan hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0 group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Direct Line</div>
                      <div className="text-base font-bold text-brand-dark group-hover:text-brand-cyan transition-colors">
                        +91 78999 10917
                      </div>
                      <div className="text-xs text-gray-500">Mon - Sat, 9:00 AM - 8:00 PM IST</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-gray-200/80">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Headquarters</div>
                      <div className="text-base font-bold text-brand-dark">Karnataka, India</div>
                      <div className="text-xs text-gray-500">Serving enterprise clients worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust highlights */}
              <div className="p-6 rounded-2xl bg-brand-purple/5 border border-brand-purple/15 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-brand-purple flex-shrink-0" />
                <div className="text-xs text-gray-700 leading-relaxed font-medium">
                  <span className="font-bold text-brand-dark">Non-Disclosure &amp; IP Protection:</span> All client project discussions, concepts, and materials are held under strict confidentiality.
                </div>
              </div>
            </div>

            {/* Right Column: Full Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-[0_20px_60px_rgba(24,13,56,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-brand-dark">Inquiry Submitted Successfully!</h3>
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      Thank you for contacting DE.RISEN. An executive lead strategist will review your requirements and get in touch within 4 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 rounded-full bg-brand-purple text-white text-xs font-bold hover:bg-brand-dark transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-brand-dark mb-1">Start a Consultation</h3>
                      <p className="text-xs text-gray-500 font-medium">Tell us about your brand objectives and project scope.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-purple focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-purple focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-purple focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Primary Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-purple focus:bg-white transition-all"
                        >
                          <option value="Branding & Identity">01 Brand Identity &amp; Strategy</option>
                          <option value="Graphic & Print">02 Graphic &amp; Print Collateral</option>
                          <option value="Digital Marketing">03 Performance Digital Marketing</option>
                          <option value="Web & IT Solutions">04 Website &amp; IT Solutions</option>
                          <option value="3D Motion & Video">05 3D Motion Graphics &amp; Video</option>
                          <option value="Monthly Retainer">06 Monthly Growth Retainer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Estimated Budget Range
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['< ₹25k', '₹25k - ₹50k', '₹50k - ₹1.5L', '₹1.5L+ / Retainer'].map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                              formData.budget === b
                                ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Project Brief &amp; Goals
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, current challenges, target launch date, and what you would like to achieve..."
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-purple focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-violet hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-[0_8px_25px_rgba(99,32,238,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-black text-brand-dark">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-200/70 hover:border-brand-purple/40 transition-colors"
              >
                <h4 className="text-base font-bold text-brand-dark mb-2 flex items-start gap-2">
                  <span className="text-brand-purple font-mono font-black text-sm">0{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <FinalCTA onOpenModal={onOpenModal} />
    </div>
  );
};

export default ContactPage;
