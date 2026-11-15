import React from 'react';

interface HanaAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const HanaAvatar: React.FC<HanaAvatarProps> = ({ 
  className = '', 
  size = 'md',
  animated = false 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-sm ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}
      >
        {/* Soft aura/glow */}
        <circle cx="50" cy="50" r="46" fill="#DDEFF4" />

        {/* Head/Face */}
        <circle cx="50" cy="52" r="34" fill="#FFEEDB" stroke="#0F2733" strokeWidth="2.5" />

        {/* Hair bangs */}
        <path
          d="M26 44C32 30 68 30 74 44C66 38 56 36 50 38C44 36 34 38 26 44Z"
          fill="#D97706"
        />

        {/* Cute Nurse / Clinic Cap */}
        <path
          d="M34 26C34 20 66 20 66 26L68 32H32L34 26Z"
          fill="#FFFFFF"
          stroke="#0F2733"
          strokeWidth="2.5"
        />
        {/* Cap Cross / Emblem */}
        <path
          d="M50 23V29M47 26H53"
          stroke="#0B5F73"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Antenna / Sensor node */}
        <circle cx="50" cy="14" r="3.5" fill="#0B5F73" />
        <line x1="50" y1="17.5" x2="50" y2="21" stroke="#0F2733" strokeWidth="2" />

        {/* Big expressive anime-style eyes */}
        <circle cx="40" cy="52" r="5" fill="#0F2733" />
        <circle cx="60" cy="52" r="5" fill="#0F2733" />
        {/* Eye highlights */}
        <circle cx="41.5" cy="50" r="1.8" fill="#FFFFFF" />
        <circle cx="61.5" cy="50" r="1.8" fill="#FFFFFF" />
        <circle cx="38.5" cy="53.5" r="0.9" fill="#FFFFFF" />
        <circle cx="58.5" cy="53.5" r="0.9" fill="#FFFFFF" />

        {/* Cheerful rosy cheeks */}
        <ellipse cx="32" cy="58" rx="4.5" ry="2.5" fill="#F472B6" fillOpacity="0.6" />
        <ellipse cx="68" cy="58" rx="4.5" ry="2.5" fill="#F472B6" fillOpacity="0.6" />

        {/* Happy smile */}
        <path
          d="M45 61C47 64 53 64 55 61"
          stroke="#0F2733"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Doctor Coat Collar */}
        <path
          d="M32 78L43 72L50 82L57 72L68 78C62 88 38 88 32 78Z"
          fill="#0B5F73"
          stroke="#0F2733"
          strokeWidth="2"
        />

        {/* Stethoscope */}
        <path
          d="M38 72C38 80 62 80 62 72"
          stroke="#15803D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="80" r="3" fill="#F2A541" stroke="#0F2733" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
