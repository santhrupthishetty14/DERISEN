import React from 'react';

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({ children, className = '' }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};
