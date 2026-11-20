import React, { useState } from 'react';
import { Heart, Check, Radio, Volume2, VolumeX } from 'lucide-react';
import { fetalAudio } from '../utils/fetalSound';

interface BabyHeartbeatCardProps {
  bpm: number;
  isLive?: boolean;
  statusText?: string;
  compactSubtitle?: string;
  inlineCompactSubtitle?: string;
  isEarlyPregnancy?: boolean;
  compact?: boolean;
  onCardClick?: () => void;
}

export const BabyHeartbeatCard: React.FC<BabyHeartbeatCardProps> = ({
  bpm = 138,
  isLive = true,
  statusText = 'Normal',
  compactSubtitle,
  inlineCompactSubtitle,
  isEarlyPregnancy = false,
  compact = false,
  onCardClick,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetalAudio.toggle(bpm, (playing) => {
      setIsPlayingAudio(playing);
    });
  };

  // Screen 3: Early pregnancy state (Month 4 or 5 note)
  if (isEarlyPregnancy) {
    return (
      <div 
        onClick={onCardClick}
        className="w-full bg-white rounded-[20px] p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-[#0B5F73]/40 transition-all text-left"
      >
        <div className="w-12 h-12 rounded-[14px] bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
          {/* Ultrasonic probe / Bump Band icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] leading-snug">
            Baby's heartbeat: month 4 or 5
          </h3>
          <p className="font-['Noto_Sans'] text-[13px] text-[#475569] leading-tight mt-0.5">
            Starts when you wear the Bump Band
          </p>
        </div>
      </div>
    );
  }

  // Screen 2 & Booked Appointment Home: Compact version
  if (compact) {
    return (
      <div 
        onClick={onCardClick}
        className="w-full bg-[#0B5F73] text-white rounded-[24px] py-3.5 px-4 flex items-center justify-between gap-2 shadow-xs cursor-pointer hover:bg-[#094e5e] transition-all text-left"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-[#F2A541] shrink-0">
            <Heart className="w-5 h-5 fill-[#F2A541]" strokeWidth={0} />
          </div>
          <div className="min-w-0">
            <span className="font-['Figtree'] text-[13px] text-[#DDEFF4] block font-semibold leading-tight">
              Baby&apos;s heartbeat
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
              <span className="font-['Figtree'] font-extrabold text-[24px] tabular-nums leading-none">
                {bpm}
              </span>
              <span className="font-['Noto_Sans'] text-[12.5px] text-white/85 font-normal">
                {inlineCompactSubtitle
                  ? `bpm · ${inlineCompactSubtitle}`
                  : compactSubtitle
                    ? 'bpm'
                    : `bpm · ${statusText.toLowerCase()}`}
              </span>
            </div>
            {compactSubtitle && !inlineCompactSubtitle && (
              <span className="text-[11px] text-[#DDEFF4]/80 block mt-1">
                {compactSubtitle}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleAudio}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
          aria-label={isPlayingAudio ? 'Mute fetal audio' : 'Play fetal heartbeat audio'}
          title="Simulate fetal Doppler sound"
        >
          {isPlayingAudio ? (
            <Volume2 className="w-4 h-4 text-[#6CCBE0] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>
    );
  }

  // Screen 1: Full Hero Card (matching image_1d641382.png left screen)
  return (
    <div 
      onClick={onCardClick}
      className="w-full bg-[#0B5F73] text-white rounded-[20px] p-5 shadow-sm relative overflow-hidden transition-all text-left"
    >
      {/* Top row: Title + Pulsing Heart action button */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-['Figtree'] font-semibold text-[15px] text-[#DDEFF4]">
            Baby's heartbeat
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Figtree'] text-[46px] font-[800] tracking-tight leading-none tabular-nums">
              {bpm}
            </span>
            <span className="font-['Noto_Sans'] text-[15px] font-medium text-[#DDEFF4]">
              bpm
            </span>
          </div>
        </div>

        {/* Heartbeat pulse circular action */}
        <div className="flex flex-col items-end gap-1.5">
          <button
            onClick={handleToggleAudio}
            aria-label={isPlayingAudio ? 'Mute heartbeat audio' : 'Listen to fetal heartbeat doppler'}
            title="Click to hear fetal heartbeat"
            className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center relative group"
          >
            {/* Animated pulsating ring */}
            <span className="absolute inset-0 rounded-full bg-[#F2A541]/30 animate-ping opacity-60"></span>
            <Heart 
              className={`w-6 h-6 text-[#F2A541] fill-[#F2A541] animate-heartbeat transition-transform duration-300 ${
                isPlayingAudio ? 'scale-110 drop-shadow-[0_0_8px_#F2A541]' : ''
              }`} 
              strokeWidth={0} 
            />
          </button>
          <span className="text-[10px] text-[#DDEFF4]/80 flex items-center gap-1 font-medium">
            {isPlayingAudio ? (
              <span className="flex items-center gap-1 text-[#6CCBE0]">
                <Volume2 className="w-3 h-3" /> Doppler On
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <VolumeX className="w-3 h-3" /> Tap to hear
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Live ECG Waveform Display */}
      <div className="my-4 h-14 w-full relative flex items-center">
        <svg 
          viewBox="0 0 320 60" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Subtle baseline */}
          <line x1="0" y1="30" x2="320" y2="30" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,3" />

          {/* ECG waveform path */}
          <path
            d="M 0 30 
               L 40 30 
               L 50 28 
               L 56 32 
               L 62 10 
               L 70 48 
               L 76 26 
               L 82 30 
               L 130 30 
               L 140 28 
               L 146 32 
               L 152 8 
               L 160 50 
               L 166 26 
               L 172 30 
               L 220 30 
               L 230 28 
               L 236 32 
               L 242 12 
               L 250 48 
               L 256 26 
               L 262 30 
               L 320 30"
            fill="none"
            stroke="#6CCBE0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-ecg-line drop-shadow-[0_0_6px_rgba(108,203,224,0.6)]"
          />

          {/* Glowing rhythm nodes */}
          <circle cx="62" cy="10" r="3" fill="#FFFFFF" />
          <circle cx="152" cy="8" r="3.5" fill="#FFFFFF" className="animate-ping origin-center" />
          <circle cx="242" cy="12" r="3" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Bottom badges: ✓ Normal & ● Live */}
      <div className="flex items-center gap-2">
        {/* Normal Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[13px] font-semibold backdrop-blur-xs">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          <span>{statusText}</span>
        </div>

        {/* Live Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[13px] font-semibold backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-[#15803D] border border-white animate-pulse"></span>
          <span>{isLive ? 'Live' : 'Cached'}</span>
        </div>
      </div>
    </div>
  );
};
