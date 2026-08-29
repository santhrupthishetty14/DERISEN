import React from 'react';
import { Target, Users, BarChart, ShieldCheck, LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  title: string;
  subtitle: string;
  iconName: string;
}

const iconMap: Record<string, LucideIcon> = {
  Target,
  Users,
  BarChart,
  ShieldCheck,
};

export const TrustBadge: React.FC<TrustBadgeProps> = ({ title, subtitle, iconName }) => {
  const IconComponent = iconMap[iconName] || ShieldCheck;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-lilac text-brand-purple flex-shrink-0">
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h5 className="text-xs font-extrabold uppercase tracking-wider text-brand-dark">{title}</h5>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};
