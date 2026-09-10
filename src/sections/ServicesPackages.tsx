import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const ServicesPackages: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      num: '01',
      title: 'Creative Design',
      desc: 'Design that captures attention.',
      detail: 'High-impact visual identities, custom graphics, marketing collaterals and presentations.',
    },
    {
      num: '02',
      title: 'Branding',
      desc: 'Build a brand people remember.',
      detail: 'Strategic brand architecture, distinctive positioning, guidelines and storytelling.',
    },
    {
      num: '03',
      title: 'Digital Marketing',
      desc: 'Turn visibility into growth.',
      detail: 'Targeted ad funnels, performance marketing, SEO rank elevation, and social management.',
    },
    {
      num: '04',
      title: 'IT Solutions',
      desc: 'Smart technology. Seamless experiences.',
      detail: 'High-performance web applications, responsive corporate platforms, and 24/7 technical support.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services-packages"
      className="py-24 sm:py-32 bg-surface-subtle relative overflow-hidden"
    >
      {/* Ambient background dots */}
      <div className="dot-pattern top-8 left-8 opacity-10" />
      <div className="dot-pattern bottom-8 right-8 opacity-10" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow">INTEGRATED ECOSYSTEM</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-4 leading-tight">
            Everything your brand needs.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            One operating model across creative, digital, marketing, and technology.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full mx-auto mt-4" />
        </div>

        {/* Layout: Left Hero Card + Right 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Hero Card */}
          <div
            className={`lg:col-span-5 bg-gradient-to-br from-[#180D38] via-[#1E1147] to-[#12092c] rounded-3xl p-8 sm:p-12 text-white shadow-[0_25px_60px_rgba(24,13,56,0.35)] border border-white/15 flex flex-col justify-between relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'
            }`}
          >
            {/* Ambient Radial Glow */}
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-brand-purple/35 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-lilac via-brand-violetLight to-brand-cyan">
                  01
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-brand-lilac font-mono text-xs font-bold border border-white/15">
                  DE.RISEN / 01
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 tracking-tight">
                Creative Solutions Tailored to Every Business
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                Flexible services for startups, growing businesses, and enterprises seeking high-impact creative excellence and digital scalability.
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-brand-violetLight">
                CREATIVE • DIGITAL • TECHNOLOGY
              </span>
              <Sparkles className="w-4 h-4 text-brand-cyan" />
            </div>
          </div>

          {/* Right 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.num}
                style={{
                  transitionDelay: `${index * 120 + 200}ms`,
                }}
                className={`bg-white rounded-2xl border p-8 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group hover:-translate-y-2 hover:border-brand-purple hover:shadow-[0_20px_40px_rgba(99,32,238,0.14)] ${
                  isRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white text-base font-black flex items-center justify-center mb-5 shadow-md shadow-brand-purple/25 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow-purple">
                    {pkg.num}
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-black text-brand-dark mb-2 tracking-tight group-hover:text-brand-purple transition-colors">
                    {pkg.title}
                  </h4>

                  {/* Tagline */}
                  <p className="text-xs sm:text-[13px] font-bold text-brand-purple mb-2">
                    {pkg.desc}
                  </p>

                  {/* Detail */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {pkg.detail}
                  </p>
                </div>

                {/* Animated Purple Accent Line: width 0 -> 65px on enter, 100% on hover */}
                <div>
                  <div
                    className={`h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full transition-all duration-700 ease-out ${
                      isRevealed ? 'w-[65px] group-hover:w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
