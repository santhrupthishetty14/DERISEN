import React from 'react';
import { ProcessStep } from '../utils/types';

interface ProcessCardProps {
  step: ProcessStep;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ step }) => {
  if (step.isHighlighted) {
    return (
      <div className="bg-gradient-to-br from-[#4B006E] via-[#620D9C] to-[#8E24AA] rounded-[26px] p-8 text-white shadow-2xl shadow-[#620d9c]/40 border-2 border-purple-300/40 hover:-translate-y-1.5 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-white text-[#620d9c] font-black text-base flex items-center justify-center mb-5 shadow-md">
          {step.number}
        </div>
        <h4 className="text-xl font-black text-white mb-2">{step.title}</h4>
        <p className="text-xs text-white/90 leading-relaxed font-normal">{step.description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[26px] border border-slate-100 p-8 shadow-xl hover:shadow-2xl hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300 text-slate-900 group">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4B006E] via-[#620D9C] to-[#B063FF] text-white font-black text-base flex items-center justify-center mb-5 shadow-md shadow-[#620d9c]/25 group-hover:scale-105 transition-transform">
        {step.number}
      </div>
      <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#620D9C] transition-colors">{step.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.description}</p>
    </div>
  );
};
