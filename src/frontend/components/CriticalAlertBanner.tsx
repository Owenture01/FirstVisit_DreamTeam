import React from 'react';
import { Phone, Building2, Pin, Volume2, VolumeX, Check, ArrowRight } from 'lucide-react';

interface CriticalAlertBannerProps {
  bloodPressure: string;
  time: string;
  doctorName?: string;
  isAlarmMuted?: boolean;
  onToggleMute?: () => void;
  onCall998: () => void;
  onHospitalDirections: () => void;
}

export const CriticalAlertBanner: React.FC<CriticalAlertBannerProps> = ({
  bloodPressure = '162/112',
  time = '21:10',
  isAlarmMuted = false,
  onToggleMute,
  onCall998,
  onHospitalDirections,
}) => {
  return (
    <div className="w-full animate-emergency-card text-white rounded-[20px] p-5 shadow-lg relative overflow-hidden transition-all text-left border border-white/15">
      {/* Top row: Pulsing ! badge + Header + Mute/Pin controls */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-[12px] bg-white/20 flex items-center justify-center shrink-0 relative">
            <span className="absolute inset-0 rounded-[12px] bg-white/35 animate-ping" />
            <span className="font-['Figtree'] font-black text-xl text-white relative z-10">!</span>
          </div>
          <div className="min-w-0">
            <h2 className="font-['Figtree'] font-bold text-[18px] text-white leading-tight">
              Blood pressure very high
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-white/90 font-medium mt-0.5 tabular-nums">
              {bloodPressure} · cuff · {time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 -mr-1.5 -mt-1.5">
          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isAlarmMuted ? 'Unmute emergency alarm beep' : 'Mute emergency alarm beep'}
              title={isAlarmMuted ? 'Unmute alert beep' : 'Mute alert beep'}
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              {isAlarmMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 animate-pulse" />
              )}
            </button>
          )}
          <button
            type="button"
            aria-label="Pinned critical priority"
            className="w-11 h-11 rounded-full bg-white/10 text-white/85 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Pin className="w-4 h-4 fill-white/40" />
          </button>
        </div>
      </div>

      {/* Immediate urgent action instruction */}
      <p className="font-['Figtree'] font-bold text-[15px] text-white mt-3.5">
        Go to A&amp;E now. Don&apos;t drive yourself.
      </p>

      {/* Emergency Action Buttons (min-h 44px, rounded full) */}
      <div className="grid grid-cols-2 gap-3 mt-3.5">
        {/* Call 998 Primary Urgent Action */}
        <button
          type="button"
          onClick={onCall998}
          aria-label="Call emergency 998"
          className="min-h-[44px] h-11 px-4 bg-white text-[#B3261E] rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-98 hover:bg-slate-50 transition-all"
        >
          <Phone className="w-4 h-4 fill-[#B3261E]" strokeWidth={2} />
          <span>Call 998</span>
        </button>

        {/* Hospital Navigation Action */}
        <button
          type="button"
          onClick={onHospitalDirections}
          aria-label="Get hospital emergency directions"
          className="min-h-[44px] h-11 px-4 bg-white/10 border border-white/45 text-white rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-98 hover:bg-white/20 transition-all"
        >
          <Building2 className="w-4 h-4" strokeWidth={2} />
          <span>Directions</span>
        </button>
      </div>

      {/* Live escalation status row matching image_4d64f311.png */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[12px] font-['Noto_Sans']">
        <span className="inline-flex items-center gap-1 font-bold text-white">
          <span>Alert sent</span>
          <Check className="w-3.5 h-3.5 stroke-[2.75]" />
        </span>
        <ArrowRight className="w-3 h-3 text-white/60" />
        <span className="text-white/90 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>Clinic has seen it</span>
        </span>
        <ArrowRight className="w-3 h-3 text-white/60" />
        <span className="text-white/75 font-medium">Done</span>
      </div>

      {/* Privacy reassurance line */}
      <p className="font-['Noto_Sans'] text-[12px] text-white/80 mt-2.5">
        Ahmed is only told if you allowed it.
      </p>
    </div>
  );
};
