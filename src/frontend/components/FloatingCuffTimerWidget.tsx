import React from 'react';
import {
  CUFF_REST_TOTAL_SECONDS,
  formatCuffCountdown,
  getRingDashOffset,
} from '../utils/cuffRestTimer';

interface FloatingCuffTimerWidgetProps {
  isVisible: boolean;
  secondsRemaining: number;
  totalSeconds?: number;
  onExpand: () => void;
}

export const FloatingCuffTimerWidget: React.FC<FloatingCuffTimerWidgetProps> = ({
  isVisible,
  secondsRemaining,
  totalSeconds = CUFF_REST_TOTAL_SECONDS,
  onExpand,
}) => {
  if (!isVisible) return null;

  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = getRingDashOffset(circumference, secondsRemaining, totalSeconds);
  const timeFormatted = formatCuffCountdown(secondsRemaining);
  const isReady = secondsRemaining <= 0;

  return (
    <button
      type="button"
      onClick={onExpand}
      data-testid="floating-cuff-timer-widget"
      aria-label={
        isReady
          ? 'Cuff rest timer complete, open to measure again'
          : `Expand cuff rest timer, ${timeFormatted} remaining`
      }
      title="Tap to open cuff rest timer"
      className="absolute right-4 top-[476px] z-30 w-[74px] h-[74px] rounded-full bg-[#FBFDFE] dark:bg-[#15252D] shadow-[0_12px_28px_rgba(15,39,51,0.28)] border-2 border-white dark:border-slate-700 ring-1 ring-[#DCE5EA] dark:ring-slate-600/70 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform animate-cuff-widget-pop focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5F73] focus-visible:ring-offset-2"
    >
      {/* Circular Countdown Progress Ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 m-auto -rotate-90 pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#DCE5EA"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isReady ? '#15803D' : '#0B5F73'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isReady ? 0 : dashOffset}
          className="transition-[stroke-dashoffset] duration-500 ease-linear"
        />
      </svg>

      {/* Center Live Countdown Label */}
      <div className="relative z-10 flex flex-col items-center justify-center leading-none">
        <span
          className={`font-['Figtree'] font-extrabold text-[17px] tabular-nums tracking-tight ${
            isReady
              ? 'text-[#15803D] dark:text-emerald-400 text-[13px]'
              : 'text-[#0F2733] dark:text-[#F1F6F8]'
          }`}
        >
          {isReady ? 'Ready' : timeFormatted}
        </span>
        <span className="font-['Noto_Sans'] text-[10px] font-medium text-[#475569] dark:text-[#A9B8C0] mt-0.5">
          {isReady ? 'measure' : 'rest'}
        </span>
      </div>
    </button>
  );
};
