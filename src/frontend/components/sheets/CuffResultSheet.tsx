import React from 'react';
import { X } from 'lucide-react';

interface CuffResultSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAnswerNo: () => void;
  onAnswerYes: () => void;
}

export const CuffResultSheet: React.FC<CuffResultSheetProps> = ({
  isOpen,
  onClose,
  onAnswerNo,
  onAnswerYes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-6 text-center flex flex-col items-center justify-between min-h-[380px]">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 shrink-0" />

        {/* Top close */}
        <div className="w-full flex justify-end">
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cuff Reading Display */}
        <div className="my-2">
          <div className="font-['Figtree'] font-extrabold text-[44px] text-[#0F2733] tabular-nums tracking-tight leading-none">
            138/88
          </div>
          <div className="font-['Noto_Sans'] text-[14px] font-semibold text-[#475569] mt-2">
            Cuff · just now
          </div>
          <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
            Sent to Midwife Noura
          </p>
        </div>

        {/* Symptoms confirmation box */}
        <div className="w-full mt-4 pt-4 border-t border-slate-100">
          <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] mb-3.5">
            Headache, blurry vision or rib pain?
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onAnswerNo();
                onClose();
              }}
              className="min-h-[44px] h-11 px-4 rounded-full bg-white border border-slate-300 text-[#0F2733] font-['Figtree'] font-bold text-[14px] hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
            >
              No
            </button>

            <button
              onClick={() => {
                onClose();
                onAnswerYes();
              }}
              className="min-h-[44px] h-11 px-4 rounded-full bg-[#B3261E] text-white font-['Figtree'] font-bold text-[14px] hover:bg-[#8F1D17] active:scale-95 transition-all shadow-xs"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
