import React from 'react';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({ children, className = '' }) => {
  return <div className={`transition-opacity duration-500 ${className}`}>{children}</div>;
};
