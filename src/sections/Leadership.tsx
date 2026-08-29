import React from 'react';
import { LeaderCard } from '../components/LeaderCard';
import { LEADERS } from '../utils/constants';
import { Lightbulb, TrendingUp } from 'lucide-react';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="py-24 bg-surface-subtle relative overflow-hidden">
      {/* Dot Matrix Ambient Pattern */}
      <div className="dot-pattern top-8 left-8" />
      <div className="dot-pattern top-8 right-8" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow">THE VISIONARIES BEHIND</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight mb-4">
            DE.RISEN
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-xl mx-auto mb-8">
            Driven by passion, guided by strategy, and committed to building impactful brands.
          </p>

          {/* 2 Core Value Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-brand-dark">
                  CREATIVE THINKING
                </h5>
                <p className="text-xs text-gray-500">Ideas that inspire brands that last.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white flex items-center justify-center shadow-md shadow-brand-purple/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-brand-dark">
                  STRATEGIC GROWTH
                </h5>
                <p className="text-xs text-gray-500">Solutions that drive measurable impact.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Founder Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
};
