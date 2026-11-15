import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface WhyWeFlaggedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPickATime: () => void;
}

export const WhyWeFlaggedSheet: React.FC<WhyWeFlaggedSheetProps> = ({
  isOpen,
  onClose,
  onPickATime,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-5 text-left flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

        {/* Guardrail callout: A flag, not a diagnosis. Noura decides. */}
        <div className="w-full p-3 rounded-[16px] bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={2.5} />
            <span className="font-['Noto_Sans'] font-medium text-[13px] leading-tight">
              A flag, not a diagnosis. Noura decides.
            </span>
          </div>
          <button onClick={onClose} className="text-[#0B5F73]/70 hover:text-[#0B5F73]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733] mb-4">
          Why we flagged this
        </h2>

        {/* Reasons List */}
        <div className="space-y-3 mb-6">
          {/* Reason 1: Main */}
          <div className="p-3.5 rounded-[18px] bg-[#F1F6F8] flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-['Figtree'] font-bold text-[12px] shrink-0">
              Main
            </span>
            <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733]">
              Past pre-eclampsia
            </span>
          </div>

          {/* Reason 2: Also */}
          <div className="p-3.5 rounded-[18px] bg-[#F1F6F8] flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-200 text-[#475569] font-['Figtree'] font-bold text-[12px] shrink-0">
              Also
            </span>
            <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733]">
              BP over 140, three times
            </span>
          </div>
        </div>

        {/* Action: Pick a time */}
        <button
          onClick={() => {
            onClose();
            onPickATime();
          }}
          className="w-full min-h-[46px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-98 transition-all shadow-xs"
        >
          Pick a time
        </button>
      </div>
    </div>
  );
};
