import React, { useState } from 'react';
import { Building2, Phone, MapPin, Pill, Check, X } from 'lucide-react';

interface WhatToDoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCall998: () => void;
}

export const WhatToDoSheet: React.FC<WhatToDoSheetProps> = ({
  isOpen,
  onClose,
  onCall998,
}) => {
  const [medicineTaken, setMedicineTaken] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-5 text-left flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Grab handle bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header with Title & Close button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733]">
            What to do now
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Nearest Maternity Unit */}
        <div className="p-4 rounded-[20px] bg-[#F1F6F8] border border-slate-200/80 mb-3.5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0B5F73] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                Nearest maternity unit
              </h3>
              <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
                Open now · 12 min by car
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <button
              onClick={() => alert('Calling Al Wasl Maternity Unit (Priority Line)...')}
              className="min-h-[44px] h-10 px-4 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-[#084857] active:scale-95 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
            <button
              onClick={() => alert('Opening turn-by-turn navigation to Maternity ER...')}
              className="min-h-[44px] h-10 px-4 rounded-full bg-white border border-[#0B5F73] text-[#0B5F73] font-['Figtree'] font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-[#DDEFF4] active:scale-95 transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Directions</span>
            </button>
          </div>

          <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-3">
            Your latest readings are sent ahead.
          </p>
        </div>

        {/* Section 2: BP Medicine */}
        <div className="p-4 rounded-[20px] bg-[#F1F6F8] border border-slate-200/80 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span className="font-['Noto_Sans'] text-[11px] text-[#475569] block">
                Dr. Layla's plan
              </span>
              <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                Your BP medicine
              </h3>
              <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-0.5">
                Due 8:00 pm
              </p>
            </div>
          </div>

          <button
            onClick={() => setMedicineTaken(!medicineTaken)}
            className={`w-full mt-3.5 min-h-[44px] h-11 rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              medicineTaken
                ? 'bg-[#15803D] text-white'
                : 'bg-[#0B5F73] text-white hover:bg-[#084857]'
            }`}
          >
            {medicineTaken ? (
              <>
                <Check className="w-4 h-4" />
                <span>Marked as taken</span>
              </>
            ) : (
              <span>Mark as taken</span>
            )}
          </button>

          <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-2.5">
            Take only what Dr. Layla prescribed.
          </p>
        </div>

        {/* Urgent Link: Severe symptoms? Call 998 */}
        <div className="pt-1 pb-2 text-center">
          <button
            onClick={() => {
              onClose();
              onCall998();
            }}
            className="text-[14px] font-['Figtree'] font-bold text-[#B3261E] hover:underline"
          >
            Severe symptoms? Call 998
          </button>
        </div>
      </div>
    </div>
  );
};
