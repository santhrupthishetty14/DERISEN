import React from 'react';

interface FloatingVisualProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const FloatingVisual: React.FC<FloatingVisualProps> = ({ children, className = '' }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};
