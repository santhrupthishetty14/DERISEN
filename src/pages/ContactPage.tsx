import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { FinalCTA } from '../sections/FinalCTA';
import { SlideArrowButton } from '../components/SlideArrowButton';
import { sendInquiry, buildMailtoUrl } from '../utils/emailService';

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dispatchData, setDispatchData] = useState<{
    isDirectMail?: boolean;
    mailtoUrl?: string;
    whatsappUrl?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setErrorMsg(null);

    const result = await sendInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      source: 'Full Consultation Page Form',
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setErrorMsg(null);
      setDispatchData({
        isDirectMail: result.isDirectMail,
        mailtoUrl: result.mailtoUrl,
        whatsappUrl: result.whatsappUrl,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Branding & Identity',
        budget: '₹25,000 - ₹50,000',
        message: '',
      });
    } else {
      setErrorMsg(result.message);
    }
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
    <div className="w-full max-w-full overflow-x-clip bg-[#180128] text-white">
      {/* 1. Page Header with Complete Edge-to-Edge Animated AI Hologram Tech Background */}
      <PageHeader
        badge="CONTACT US / LET'S CONNECT"
        title="Let's Build Something"
        highlightWord="Extra Ordinary Together."
        description="Whether you need a full brand overhaul, a high-converting web platform, or a monthly growth retainer, our executive team is ready to bring your vision to life."
        breadcrumb="Contact Us"
        onNavigateHome={() => onNavigate('home')}
        tags={['Instant WhatsApp', 'Custom Scopes', 'Quick Turnarounds', 'Global Remote Delivery']}
        backgroundImage="/assets/banner-contact-tech.jpg"
        fullBackground={true}
        hudInfo={{
          tag: 'Executive Hotline',
          title: 'Direct Strategy Line • AI & Tech Roadmap',
          status: 'Active & Responding',
        }}
        floatingBadge={{
          text: 'Direct Executive Line',
          subtext: '+91 78999 10917',
        }}
      />

      {/* 2. Main Contact Grid & Direct Inquiry Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#180128] via-[#200236] to-[#180128] text-white relative">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Contact Methods & Office Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B063FF] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
                  <span>Fast Response Channels</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                  Speak Directly with Our Strategy Team
                </h2>
                <p className="text-purple-200/80 text-sm sm:text-base leading-relaxed mb-8">
                  No automated chatbots or endless queues. Connect directly with our core directors and get immediate clarity on your project roadmap.
                </p>

                {/* Direct Channel Cards */}
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917899910917?text=Hi%20DE.RISEN%2C%20I%20would%20like%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-300/60">Direct WhatsApp</div>
                      <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        +91 78999 10917
                      </div>
                      <div className="text-xs text-emerald-400 font-medium">Instant reply &amp; project chat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-300/60 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:derisenofficial@gmail.com"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/5 border border-white/15 hover:border-[#B063FF] hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B063FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#620D9C] group-hover:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-300/60">Official Inquiries</div>
                      <div className="text-base font-bold text-white group-hover:text-[#B063FF] transition-colors">
                        derisenofficial@gmail.com
                      </div>
                      <div className="text-xs text-purple-200/70">Replies within 4 business hours</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-300/60 group-hover:text-[#B063FF] group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917899910917"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/5 border border-white/15 hover:border-[#B063FF] hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B063FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#620D9C] group-hover:text-white transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-300/60">Direct Line</div>
                      <div className="text-base font-bold text-white group-hover:text-[#B063FF] transition-colors">
                        +91 78999 10917
                      </div>
                      <div className="text-xs text-purple-200/70">Mon - Sat, 9:00 AM - 8:00 PM IST</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-300/60 group-hover:text-[#B063FF] group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/5 border border-white/15">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B063FF] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-300/60">Headquarters</div>
                      <div className="text-base font-bold text-white">Karnataka, India</div>
                      <div className="text-xs text-purple-200/70">Serving enterprise clients worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust highlights */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/15 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-[#B063FF] flex-shrink-0" />
                <div className="text-xs text-purple-200/80 leading-relaxed font-medium">
                  <span className="font-bold text-white">Non-Disclosure &amp; IP Protection:</span> All client project discussions, concepts, and materials are held under strict confidentiality.
                </div>
              </div>
            </div>

            {/* Right Column: Full Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#620D9C]/20 rounded-full blur-3xl pointer-events-none" />

                {submitted ? (
                  <div className="py-12 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        {dispatchData?.isDirectMail
                          ? 'Inquiry Prepared & Email App Opened!'
                          : 'Inquiry Submitted Successfully!'}
                      </h3>
                      <p className="text-purple-200/80 text-sm max-w-md mx-auto leading-relaxed">
                        {dispatchData?.isDirectMail ? (
                          <>
                            Your message details have been pre-filled for{' '}
                            <span className="font-bold text-[#B063FF]">derisenofficial@gmail.com</span>.
                            If your email app did not open automatically, choose a direct option below:
                          </>
                        ) : (
                          'Thank you for contacting DE.RISEN. Your inquiry was delivered to derisenofficial@gmail.com and our strategy team will connect within 4 business hours.'
                        )}
                      </p>
                    </div>

                    {dispatchData?.isDirectMail && (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                        {dispatchData.whatsappUrl && (
                          <a
                            href={dispatchData.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md"
                          >
                            <MessageSquare className="w-4 h-4" /> Send via WhatsApp (+91 78999 10917)
                          </a>
                        )}
                        {dispatchData.mailtoUrl && (
                          <a
                            href={dispatchData.mailtoUrl}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-[#620D9C] text-white text-xs font-bold transition-all"
                          >
                            <Mail className="w-4 h-4" /> Open Email Client (derisenofficial@gmail.com)
                          </a>
                        )}
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setDispatchData(null);
                        }}
                        className="px-6 py-2.5 rounded-full border border-white/20 text-purple-200 hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1">Start a Consultation</h3>
                      <p className="text-xs text-purple-200/70 font-medium">Tell us about your brand objectives and project scope.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-[#B063FF] focus:bg-white/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-[#B063FF] focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-[#B063FF] focus:bg-white/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                          Primary Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#200236] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B063FF] transition-all"
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
                      <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
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
                                ? 'bg-gradient-to-r from-[#620D9C] to-[#B063FF] text-white border-white/30 shadow-md'
                                : 'bg-white/5 text-purple-200 border-white/15 hover:border-[#B063FF]/50'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                        Project Brief &amp; Goals
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, current challenges, target launch date, and what you would like to achieve..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-[#B063FF] focus:bg-white/10 transition-all resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-2xl bg-red-900/30 border border-red-500/50 text-xs text-red-200 flex flex-col gap-2.5">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-red-200 mb-0.5">Could not deliver inquiry automatically</span>
                            <span>{errorMsg}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-7 pt-1">
                          <a
                            href={buildMailtoUrl(formData)}
                            className="inline-flex items-center gap-1.5 font-bold text-[#B063FF] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail className="w-3.5 h-3.5" /> Send directly via Email App
                          </a>
                          <span className="text-white/30">•</span>
                          <a
                            href={`https://wa.me/917899910917?text=${encodeURIComponent(`Hi DE.RISEN, I am ${formData.name}. I would like to inquire about ${formData.service}.`)}`}
                            className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Send via WhatsApp (+91 78999 10917)
                          </a>
                        </div>
                      </div>
                    )}

                    <SlideArrowButton
                      type="submit"
                      disabled={loading}
                      label={loading ? 'Submitting Your Inquiry...' : 'Submit Consultation Request'}
                      variant="purple"
                      size="lg"
                      className="w-full"
                    />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Section */}
      <section className="py-20 bg-[#180128] border-t border-white/10 text-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B063FF] text-xs font-bold uppercase tracking-wider mb-3 border border-white/15">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B063FF]/40 transition-colors"
              >
                <h4 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                  <span className="text-[#B063FF] font-mono font-black text-sm">0{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-purple-200/80 leading-relaxed pl-6">{faq.a}</p>
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
