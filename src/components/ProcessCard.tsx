import React from 'react';
import { ProcessStep } from '../utils/types';

interface ProcessCardProps {
  step: ProcessStep;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ step }) => {
  if (step.isHighlighted) {
    return (
      <div className="bg-gradient-to-br from-brand-card to-brand-navy rounded-2xl p-8 text-white shadow-xl shadow-brand-dark/20 border border-white/15 hover:-translate-y-1 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-white text-brand-dark font-extrabold text-base flex items-center justify-center mb-5 shadow-md">
          {step.number}
        </div>
        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
        <p className="text-xs text-white/80 leading-relaxed">{step.description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white font-extrabold text-base flex items-center justify-center mb-5 shadow-md shadow-brand-purple/20">
        {step.number}
      </div>
      <h4 className="text-xl font-bold text-brand-dark mb-2">{step.title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
    </div>
  );
};
