import React, { useEffect } from 'react';

interface CuffResultSheetProps {
  isOpen: boolean;
  reading?: string;
  sourceLabel?: string;
  statusLine?: string;
  comparisonLine?: string;
  symptomQuestion?: string;
  onClose: () => void;
  onAnswerNo: () => void;
  onAnswerYes: () => void;
}

export const CuffResultSheet: React.FC<CuffResultSheetProps> = ({
  isOpen,
  reading = '144/94',
  sourceLabel = 'Upper-arm cuff · just now',
  statusLine = '2 readings above 140/90 · Noura has been told',
  comparisonLine = '142/92, then 144/94 · 4 hours apart',
  symptomQuestion = 'Belly pain, bleeding, leaking fluid or baby moving less?',
  onClose,
  onAnswerNo,
  onAnswerYes,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="cuff-result-sheet-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cuff-result-reading"
      onClick={onClose}
      className="absolute inset-0 z-40 flex items-end justify-center bg-[#0F2733]/45 backdrop-blur-[1px] animate-in fade-in duration-200"
    >
      <div
        data-testid="cuff-result-sheet"
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#FBFDFE] dark:bg-[#15252D] rounded-t-[28px] shadow-[0_-12px_36px_rgba(15,39,51,0.2)] px-5 pt-3 pb-7 text-center flex flex-col items-center animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Top Grab Handle */}
        <div
          aria-hidden="true"
          className="w-11 h-1.5 bg-[#D3DDE3] dark:bg-slate-600 rounded-full mx-auto mb-5 shrink-0"
        />

        {/* Blood Pressure Reading */}
        <div
          id="cuff-result-reading"
          className="font-['Figtree'] font-extrabold text-[46px] text-[#0F2733] dark:text-[#F1F6F8] tabular-nums tracking-tight leading-none"
        >
          {reading}
        </div>

        {/* Source Pill */}
        <div className="mt-3 inline-flex items-center px-3.5 py-1 rounded-full bg-[#E6EEF1] dark:bg-slate-800 text-[#475569] dark:text-[#CBD5E1] font-['Figtree'] font-bold text-[12.5px] leading-tight">
          {sourceLabel}
        </div>

        {/* Midwife Notification Status */}
        <p className="mt-3.5 font-['Noto_Sans'] text-[14.5px] leading-snug text-[#475569] dark:text-[#CBD5E1]">
          {statusLine}
        </p>

        {/* Prior Reading Comparison */}
        <p className="mt-4 font-['Noto_Sans'] text-[13px] leading-snug text-[#475569] dark:text-[#94A3B8] tabular-nums">
          {comparisonLine}
        </p>

        {/* Red-Flag Symptom Confirmation Card */}
        <div className="w-full mt-4 rounded-[22px] bg-[#F1F6F8] dark:bg-[#0E1A20] px-4 pt-4 pb-4">
          <h3 className="font-['Figtree'] font-extrabold text-[15px] leading-[1.35] text-[#0F2733] dark:text-[#F1F6F8] max-w-[290px] mx-auto mb-4">
            {symptomQuestion}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onAnswerNo();
                onClose();
              }}
              className="min-h-[48px] h-12 px-4 rounded-full bg-white dark:bg-[#15252D] text-[#0F2733] dark:text-[#F1F6F8] font-['Figtree'] font-extrabold text-[15px] shadow-[0_1px_3px_rgba(15,39,51,0.08)] hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
            >
              No
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onAnswerYes();
              }}
              className="min-h-[48px] h-12 px-4 rounded-full bg-[#B3261E] text-white font-['Figtree'] font-extrabold text-[15px] shadow-xs hover:bg-[#961F18] active:scale-[0.98] transition-all cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
