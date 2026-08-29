import React from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
