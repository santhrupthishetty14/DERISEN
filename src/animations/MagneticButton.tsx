import React from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div onClick={onClick} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
