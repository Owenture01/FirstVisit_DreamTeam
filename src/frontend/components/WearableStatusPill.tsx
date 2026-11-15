import React from 'react';
import { Watch } from 'lucide-react';

interface WearableStatusPillProps {
  bumpBandBattery?: number;
  bumpBandStatus?: 'connected' | 'later' | 'offline';
  watchBattery?: number;
  watchStatus?: 'connected' | 'offline';
  onOpenHardwareSheet: () => void;
}

export const WearableStatusPill: React.FC<WearableStatusPillProps> = ({
  bumpBandBattery = 82,
  bumpBandStatus = 'connected',
  watchBattery = 64,
  watchStatus = 'connected',
  onOpenHardwareSheet,
}) => {
  return (
    <div className="w-full flex items-center gap-2.5 my-2">
      {/* Bump Band Device Pill */}
      <button
        onClick={onOpenHardwareSheet}
        aria-label="Bump Band wearable hardware status"
        className="min-h-[44px] flex-1 px-3.5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs flex items-center justify-between hover:bg-slate-50 active:scale-98 transition-all"
      >
        <div className="flex items-center gap-2">
          {/* Bump Band loop icon */}
          <svg className="w-4 h-4 text-[#0B5F73]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="12" rx="9" ry="5" />
            <path d="M7 12a5 5 0 0 1 10 0" />
          </svg>
          <span className="font-['Noto_Sans'] text-[13px] font-medium text-[#0F2733]">
            Bump Band
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569] font-medium">
            {bumpBandStatus === 'later' ? 'later' : `${bumpBandBattery}%`}
          </span>
          <span className={`w-2 h-2 rounded-full ${
            bumpBandStatus === 'connected' ? 'bg-[#15803D]' : 'bg-slate-400'
          }`}></span>
        </div>
      </button>

      {/* Smart Watch Device Pill */}
      <button
        onClick={onOpenHardwareSheet}
        aria-label="Smartwatch wearable hardware status"
        className="min-h-[44px] flex-1 px-3.5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs flex items-center justify-between hover:bg-slate-50 active:scale-98 transition-all"
      >
        <div className="flex items-center gap-2">
          <Watch className="w-4 h-4 text-[#0B5F73]" strokeWidth={2} />
          <span className="font-['Noto_Sans'] text-[13px] font-medium text-[#0F2733]">
            Watch
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569] font-medium">
            {watchBattery}%
          </span>
          <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
        </div>
      </button>
    </div>
  );
};
