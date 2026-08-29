import React from 'react';
import { DigitalProductionService } from '../utils/types';

interface DigitalProdCardProps {
  service: DigitalProductionService;
}

export const DigitalProdCard: React.FC<DigitalProdCardProps> = ({ service }) => {
  if (service.isHighlighted) {
    return (
      <div className="bg-gradient-to-br from-brand-card to-brand-navy rounded-2xl p-8 text-white shadow-xl shadow-brand-dark/25 border border-white/15 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/15">
          <span className="text-base font-extrabold text-brand-violetLight">{service.number}</span>
          <h4 className="text-xl font-bold text-white">{service.title}</h4>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-white/90">
              <span className="text-brand-violetLight font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-brand-lilac">
        <span className="text-base font-extrabold text-brand-purple">{service.number}</span>
        <h4 className="text-xl font-bold text-brand-dark">{service.title}</h4>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
        {service.items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-brand-purple font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
