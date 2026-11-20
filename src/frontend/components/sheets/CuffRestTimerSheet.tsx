import React from 'react';
import { ChevronLeft } from 'lucide-react';
import {
  CUFF_PREP_STEPS,
  CUFF_REST_TOTAL_SECONDS,
  formatCuffCountdown,
  getCuffActionButtonLabel,
  getRingDashOffset,
} from '../../utils/cuffRestTimer';

interface CuffRestTimerSheetProps {
  isOpen: boolean;
  secondsRemaining: number;
  totalSeconds?: number;
  firstReadingValue?: string;
  firstReadingTime?: string;
  onMinimize: () => void;
  onCompleteRest: () => void;
  onOpenHelp: () => void;
}

export const CuffRestTimerSheet: React.FC<CuffRestTimerSheetProps> = ({
  isOpen,
  secondsRemaining,
  totalSeconds = CUFF_REST_TOTAL_SECONDS,
  firstReadingValue = '146/94',
  firstReadingTime = '19:52',
  onMinimize,
  onCompleteRest,
  onOpenHelp,
}) => {
  if (!isOpen) return null;

  const ringSize = 86;
  const strokeWidth = 6.5;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = getRingDashOffset(circumference, secondsRemaining, totalSeconds);
  const timeFormatted = formatCuffCountdown(secondsRemaining);
  const actionLabel = getCuffActionButtonLabel(secondsRemaining);
  const isReady = secondsRemaining <= 0;

  return (
    <div
      data-testid="cuff-rest-timer-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cuff-rest-timer-heading"
      className="absolute inset-0 z-40 bg-[#F1F6F8] dark:bg-[#0E1A20] flex flex-col justify-between px-5 pt-4 pb-6 overflow-y-auto animate-cuff-sheet-expand"
    >
      {/* Top Content Stack */}
      <div className="flex flex-col">
        {/* Top-left Exit / Minimize Chevron */}
        <div className="flex items-center mb-3 -ml-2">
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize cuff rest timer"
            title="Minimize to Home widget"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F2733] dark:text-[#F1F6F8] hover:bg-slate-200/70 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>

        {/* Heading & Subtitle */}
        <h1
          id="cuff-rest-timer-heading"
          className="font-['Figtree'] font-extrabold text-[26px] leading-[1.18] tracking-tight text-[#0F2733] dark:text-[#F1F6F8]"
        >
          Let&apos;s check that again
        </h1>
        <p className="font-['Noto_Sans'] text-[14.5px] leading-[1.45] text-[#475569] dark:text-[#A9B8C0] mt-2">
          One high reading is often a blip. Rest, then measure once more.
        </p>

        {/* First Reading Card */}
        <div className="mt-5 bg-[#FBFDFE] dark:bg-[#15252D] border border-[#DCE5EA] dark:border-slate-700/80 rounded-[20px] px-4 py-3.5 flex items-center justify-between gap-3">
          <div>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0]">
              First reading · {firstReadingTime}
            </p>
            <p className="font-['Figtree'] font-extrabold text-[28px] leading-[1.15] tracking-tight text-[#0F2733] dark:text-[#F1F6F8] tabular-nums mt-0.5">
              {firstReadingValue}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBEBD0] dark:bg-amber-950/70 text-[#6E4100] dark:text-amber-300 font-['Figtree'] font-bold text-[12.5px] whitespace-nowrap shrink-0">
            <span aria-hidden="true" className="font-extrabold">
              !
            </span>
            Above 140/90
          </span>
        </div>

        {/* Circular Countdown Ring & Rest Instruction Row */}
        <div className="mt-5 flex items-center gap-4 px-0.5">
          <div className="relative w-[86px] h-[86px] shrink-0 flex items-center justify-center">
            <svg
              width={ringSize}
              height={ringSize}
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              className="absolute inset-0 -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="#DCE5EA"
                strokeWidth={strokeWidth}
                className="dark:stroke-slate-700"
              />
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
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

            <div className="relative z-10 flex flex-col items-center justify-center leading-none">
              <span
                data-testid="cuff-rest-countdown"
                className="font-['Figtree'] font-extrabold text-[23px] text-[#0F2733] dark:text-[#F1F6F8] tabular-nums tracking-tight"
              >
                {timeFormatted}
              </span>
              <span className="font-['Noto_Sans'] text-[12px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                {isReady ? 'done' : 'rest'}
              </span>
            </div>
          </div>

          <p className="font-['Noto_Sans'] text-[14.5px] leading-[1.42] text-[#0F2733] dark:text-[#F1F6F8]">
            Rest for 5 minutes. We&apos;ll tell you when to measure.
          </p>
        </div>

        {/* 4-Step Preparation Checklist Card */}
        <div className="mt-5 bg-[#FBFDFE] dark:bg-[#15252D] border border-[#DCE5EA] dark:border-slate-700/80 rounded-[20px] px-4 py-4 space-y-3.5">
          {CUFF_PREP_STEPS.map((step) => (
            <div key={step.number} className="flex items-center gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#DDEFF4] dark:bg-[#0B5F73]/30 text-[#0B5F73] dark:text-[#6CCBE0] font-['Figtree'] font-extrabold text-[13px] flex items-center justify-center shrink-0">
                {step.number}
              </span>
              <span className="font-['Noto_Sans'] text-[14px] leading-[1.35] text-[#0F2733] dark:text-[#F1F6F8]">
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Urgent Warning Prompt */}
        <button
          type="button"
          onClick={onOpenHelp}
          className="mt-5 flex items-start gap-2.5 px-1 text-left group cursor-pointer focus:outline-none focus-visible:underline"
        >
          <span
            aria-hidden="true"
            className="text-[#B3261E] dark:text-red-400 font-['Figtree'] font-extrabold text-[15px] leading-[1.35] shrink-0 pt-0.5"
          >
            !
          </span>
          <span className="max-w-[272px] font-['Figtree'] font-bold text-[13.5px] leading-[1.4] text-[#B3261E] dark:text-red-400 group-hover:underline">
            Bad headache, blurry vision or belly pain? Press Help now.
          </span>
        </button>
      </div>

      {/* Bottom Full-Width Pill Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={onCompleteRest}
          className={`w-full min-h-[52px] px-5 rounded-full font-['Figtree'] font-bold text-[15px] tabular-nums transition-all active:scale-[0.98] cursor-pointer ${
            isReady
              ? 'bg-[#0B5F73] text-white hover:bg-[#084857] shadow-md'
              : 'bg-[#FBFDFE] dark:bg-[#15252D] border border-[#C3D0D8] dark:border-slate-600 text-[#0F2733] dark:text-[#F1F6F8] hover:border-[#0B5F73] hover:bg-[#F7FBFC]'
          }`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};
