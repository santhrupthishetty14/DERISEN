import React from 'react';

interface WorkflowNodeProps {
  step: string;
  name: string;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ step, name }) => {
  return (
    <div className="flex flex-col items-center gap-3 relative z-10 group">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-violet text-white font-extrabold text-base flex items-center justify-center shadow-lg shadow-brand-purple/25 transition-transform duration-300 group-hover:scale-110">
        {step}
      </div>
      <span className="text-sm font-bold text-brand-dark">{name}</span>
    </div>
  );
};
