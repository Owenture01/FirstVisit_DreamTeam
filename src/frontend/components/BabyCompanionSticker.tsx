import React, { useId, useState } from 'react';
import { getBabySizeStage } from '../data/babySizeStickers';

interface BabyCompanionStickerProps {
  week: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  progressiveScale?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * Progressive scale classes mapped across Weeks 4-40 so stickers visibly grow
 * from tiny early-pregnancy seeds up to full-term pumpkins without inline styles.
 */
function getProgressiveScaleClass(week: number): string {
  const clamped = Math.max(4, Math.min(40, Math.round(week)));
  if (clamped <= 5) return 'scale-[0.58]';
  if (clamped <= 7) return 'scale-[0.63]';
  if (clamped <= 10) return 'scale-[0.68]';
  if (clamped <= 13) return 'scale-[0.74]';
  if (clamped <= 17) return 'scale-[0.80]';
  if (clamped <= 21) return 'scale-[0.85]';
  if (clamped <= 25) return 'scale-[0.90]';
  if (clamped <= 29) return 'scale-[0.94]';
  if (clamped <= 33) return 'scale-[0.98]';
  if (clamped <= 37) return 'scale-[1.02]';
  return 'scale-[1.06]';
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-11 h-11',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export const BabyCompanionSticker: React.FC<BabyCompanionStickerProps> = ({
  week,
  size = 'lg',
  animated = true,
  progressiveScale = true,
  interactive = false,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const stage = getBabySizeStage(week);
  const [isBooped, setIsBooped] = useState(false);

  const scallionGradId = `scallion-grad-${uid}`;
  const scaleClass = progressiveScale ? getProgressiveScaleClass(stage.week) : 'scale-100';

  const handleTap = () => {
    if (!interactive) return;
    setIsBooped(true);
    window.setTimeout(() => setIsBooped(false), 450);
  };

  return (
    <div
      onClick={handleTap}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleTap();
        }
      }}
      aria-label={`Week ${stage.week} baby size illustration: ${stage.name}`}
      className={`inline-flex items-center justify-center select-none transition-transform duration-500 ease-out ${SIZE_CLASSES[size]} ${scaleClass} ${
        interactive ? 'cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/60 rounded-full' : ''
      } ${isBooped ? 'scale-125 -rotate-6' : ''} ${className}`}
    >
      <div className={`w-full h-full ${animated ? 'animate-companion-wobble' : ''}`}>
        <div className={`w-full h-full ${animated ? 'animate-companion-breathe' : ''}`}>
          <svg
            viewBox={stage.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-[0_4px_10px_rgba(7,35,45,0.28)]"
          >
            <defs>
              <linearGradient
                id={scallionGradId}
                x1="910"
                y1="770.28"
                x2="910"
                y2="812.28"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A8CE8E" />
                <stop offset="0.42" stopColor="#E5EBD3" />
                <stop offset="0.75" stopColor="#F7F3E5" />
                <stop offset="1" stopColor="#EDEAD9" />
              </linearGradient>
            </defs>

            {stage.elements.map((el, idx) => {
              const resolvedFill =
                el.fill && el.fill.startsWith('url(#')
                  ? `url(#${scallionGradId})`
                  : el.fill;

              return (
                <path
                  key={`${stage.week}-${idx}`}
                  d={el.d}
                  fill={resolvedFill}
                  stroke={el.stroke}
                  strokeWidth={el.strokeWidth ? Number(el.strokeWidth) : undefined}
                  strokeLinecap={el.strokeLinecap}
                  strokeLinejoin={el.strokeLinejoin}
                  fillOpacity={el.fillOpacity ? Number(el.fillOpacity) : undefined}
                  opacity={el.opacity ? Number(el.opacity) : undefined}
                  className={animated && el.isEye ? 'companion-eye' : undefined}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
