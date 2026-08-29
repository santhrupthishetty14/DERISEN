import React from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  className = '',
}) => {
  return (
    <span className={`font-extrabold ${className}`}>
      {value}
      {suffix}
    </span>
  );
};
