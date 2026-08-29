import React from 'react';

interface RevealImageProps {
  children: React.ReactNode;
  className?: string;
}

export const RevealImage: React.FC<RevealImageProps> = ({ children, className = '' }) => {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
};
