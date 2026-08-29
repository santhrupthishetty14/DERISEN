import React, { useState } from 'react';
import { LeaderProfile } from '../utils/types';
import { Award, Sparkles } from 'lucide-react';

interface LeaderCardProps {
  leader: LeaderProfile;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isShweta = leader.avatarSeed === 'shweta';
  const avatarSrc = isShweta ? '/assets/leader-shweta.jpg' : '/assets/leader-lejai.jpg';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-3xl border p-8 sm:p-10 transition-all duration-500 flex flex-col justify-between ${
        isHovered
          ? 'border-brand-purple/50 shadow-[0_20px_50px_rgba(99,32,238,0.12)] -translate-y-1.5'
          : 'border-gray-200 shadow-md'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 text-center sm:text-left">
          {/* Avatar Frame with Glowing Purple Gradient Border */}
          <div className="relative group/avatar">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-brand-purple via-brand-violet to-brand-cyan flex-shrink-0 shadow-lg shadow-brand-purple/30 overflow-hidden transition-transform duration-500 group-hover/avatar:scale-105">
              <img
                src={avatarSrc}
                alt={leader.name}
                className="w-full h-full rounded-full object-cover object-top transition-transform duration-700 group-hover/avatar:scale-110"
                loading="lazy"
              />
            </div>
            {/* Illuminated floating badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md border-2 border-white">
              {isShweta ? <Award className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl sm:text-[26px] font-black text-brand-dark mb-2 tracking-tight">
              {leader.name}
            </h3>
            <span className="inline-block px-4 py-1.5 bg-brand-card text-white text-xs font-extrabold rounded-full tracking-wide shadow-sm">
              {leader.role}
            </span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-sm sm:text-base font-semibold italic text-brand-purple bg-brand-lilacSoft p-4 sm:p-5 rounded-2xl border-l-4 border-brand-purple mb-6 leading-relaxed shadow-sm">
          {leader.quote}
        </blockquote>

        {/* Bio Paragraphs */}
        <div className="space-y-3 text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-medium">
          {leader.bioParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* Card Footer Badge */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-mono">
        <span>DE.RISEN LEADERSHIP</span>
        <span className="text-brand-purple font-bold">VERIFIED</span>
      </div>
    </div>
  );
};
