import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CuffRestTimerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteRest: () => void;
}

export const CuffRestTimerSheet: React.FC<CuffRestTimerSheetProps> = ({
  isOpen,
  onClose,
  onCompleteRest,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(180); // 3:00

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(180);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onCompleteRest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onCompleteRest]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-6 text-center flex flex-col items-center justify-between min-h-[460px]">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 shrink-0" />

        {/* Header with Title & Close button */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="w-6" /> {/* Spacer */}
          <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733]">
            Rest, then measure
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Breathing Circle with Real Countdown Timer */}
        <div className="my-6 relative flex flex-col items-center justify-center">
          {/* Subtle animated pulsating halo */}
          <div className="w-48 h-48 rounded-full bg-[#DDEFF4]/60 flex items-center justify-center animate-pulse">
            <div className="w-40 h-40 rounded-full bg-[#DDEFF4] flex flex-col items-center justify-center p-4 shadow-xs">
              <span className="font-['Figtree'] font-black text-[38px] text-[#0B5F73] tabular-nums leading-none">
                {timeFormatted}
              </span>
              <span className="font-['Noto_Sans'] text-[12px] text-[#0B5F73] font-medium mt-1.5">
                Breathe with the circle
              </span>
            </div>
          </div>
        </div>

        {/* Skip rest action button */}
        <button
          onClick={onCompleteRest}
          className="text-[15px] font-['Figtree'] font-bold text-[#0F2733] hover:text-[#0B5F73] py-2 px-6 rounded-full hover:bg-slate-100 transition-colors"
        >
          Skip rest
        </button>
      </div>
    </div>
  );
};
