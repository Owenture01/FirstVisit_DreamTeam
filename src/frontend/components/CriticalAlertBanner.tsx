import React from 'react';
import { Phone, Building2, AlertCircle, Pin } from 'lucide-react';

interface CriticalAlertBannerProps {
  bloodPressure: string;
  time: string;
  doctorName?: string;
  onCall998: () => void;
  onHospitalDirections: () => void;
}

export const CriticalAlertBanner: React.FC<CriticalAlertBannerProps> = ({
  bloodPressure = '162/112',
  time = '21:10',
  doctorName = 'Noura',
  onCall998,
  onHospitalDirections,
}) => {
  return (
    <div className="w-full bg-[#B3261E] text-white rounded-[20px] p-5 shadow-lg relative overflow-hidden transition-all text-left">
      {/* Top row: Exclamation badge + Header + Pin icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-['Figtree'] font-black text-xl text-white">!</span>
          </div>
          <div>
            <h2 className="font-['Figtree'] font-bold text-[18px] text-white leading-tight">
              Blood pressure very high
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-white/90 font-medium mt-0.5">
              {bloodPressure} · {time}
            </p>
          </div>
        </div>

        <button 
          aria-label="Pinned critical priority" 
          className="text-white/80 p-1.5 hover:text-white transition-colors"
        >
          <Pin className="w-4 h-4 fill-white/40" />
        </button>
      </div>

      {/* Reassurance & clinical visibility notice */}
      <p className="font-['Noto_Sans'] text-[14px] text-white/90 mt-3 font-normal">
        {doctorName} and the hospital can see this.
      </p>

      {/* Emergency Action Buttons (min-h 44px, rounded full) */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {/* Call 998 Primary Urgent Action */}
        <button
          onClick={onCall998}
          aria-label="Call emergency 998"
          className="min-h-[44px] h-11 px-4 bg-white text-[#B3261E] rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-98 hover:bg-slate-50 transition-all"
        >
          <Phone className="w-4 h-4 fill-[#B3261E]" strokeWidth={2} />
          <span>Call 998</span>
        </button>

        {/* Hospital Navigation Action */}
        <button
          onClick={onHospitalDirections}
          aria-label="Get hospital emergency directions"
          className="min-h-[44px] h-11 px-4 bg-white/15 border border-white/30 text-white rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-98 hover:bg-white/25 transition-all"
        >
          <Building2 className="w-4 h-4" strokeWidth={2} />
          <span>Hospital</span>
        </button>
      </div>
    </div>
  );
};
