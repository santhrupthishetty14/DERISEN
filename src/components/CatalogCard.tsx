import React from 'react';
import { ServiceCategory } from '../utils/types';

interface CatalogCardProps {
  category: ServiceCategory;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ category }) => {
  if (category.isHighlighted) {
    return (
      <div className="bg-gradient-to-br from-brand-card to-brand-navy rounded-2xl p-8 text-white shadow-xl shadow-brand-dark/25 border border-white/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
        <div className="text-sm font-extrabold text-brand-violetLight mb-1.5">{category.number}</div>
        <h4 className="text-xl font-bold text-white mb-5 pb-3 border-b border-white/15">{category.title}</h4>
        <ul className="space-y-2.5 flex-grow">
          {category.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-white/90 font-medium">
              <span className="text-brand-violetLight font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:border-brand-purple/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      <div className="text-sm font-extrabold text-brand-purple mb-1.5">{category.number}</div>
      <h4 className="text-xl font-bold text-brand-dark mb-5 pb-3 border-b-2 border-brand-lilac">{category.title}</h4>
      <ul className="space-y-2.5 flex-grow">
        {category.items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
            <span className="text-brand-purple font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
