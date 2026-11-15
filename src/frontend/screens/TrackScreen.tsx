import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { WearableStatusPill } from '../components/WearableStatusPill';

interface TrackScreenProps {
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  onOpenHardwareSheet?: () => void;
}

export const TrackScreen: React.FC<TrackScreenProps> = ({
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  onOpenHardwareSheet = () => {},
}) => {
  const [kickCount, setKickCount] = useState(9);
  const kickGoal = 12;

  const handleIncrementKick = () => {
    setKickCount(prev => prev + 1);
  };

  const ringPercentage = Math.min(100, Math.round((kickCount / kickGoal) * 100));

  // 7 days of the week for Bump Band wear tracking (5 of 7 days worn)
  const weekDays = [
    { day: 'M', worn: true },
    { day: 'T', worn: true },
    { day: 'W', worn: false }, // missed day
    { day: 'T', worn: true },
    { day: 'F', worn: true },
    { day: 'S', worn: true },  // or upcoming
    { day: 'S', worn: false },
  ];

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6 text-left">
      {/* Header */}
      <Header
        gestationalWeek={31}
        gestationalDay={4}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen Title */}
      <div className="px-1 pt-1">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Track
        </h1>
      </div>

      {/* Card 1: Kicks today */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        {/* Left: Kick progress ring */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#DDEFF4]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#0B5F73] transition-all duration-300"
              strokeDasharray={`${ringPercentage}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] tabular-nums leading-none">
              {kickCount}
            </span>
            <span className="text-[11px] text-[#475569] font-medium mt-0.5">
              of {kickGoal}
            </span>
          </div>
        </div>

        {/* Right: Kicks today info & + Kick button */}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] leading-tight">
            Kicks today
          </h2>
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5 leading-snug">
            Usual: 8 to 12 by noon
          </span>

          <button
            onClick={handleIncrementKick}
            aria-label="Log kick"
            className="mt-3 min-h-[44px] h-10 px-6 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#084857] active:scale-95 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Kick</span>
          </button>
        </div>
      </div>

      {/* Card 2: Band this week */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
            Band this week
          </h2>
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
            5 of 7 days
          </span>
        </div>

        {/* 7 Days tracker boxes */}
        <div className="flex items-center justify-between gap-2 my-1">
          {weekDays.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
              <div 
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center font-['Figtree'] font-bold text-[13px] transition-all ${
                  item.worn
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'bg-white border-2 border-slate-300 text-[#475569]'
                }`}
              >
                {/* Visual fill indicator matching mockup */}
              </div>
              <span className="font-['Noto_Sans'] text-[12px] font-medium text-[#475569]">
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-3">
          Missed a day? That's okay.
        </p>
      </div>

      {/* Card 3: Last 7 days */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
        <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] mb-3">
          Last 7 days
        </h2>

        <div className="space-y-4">
          {/* Row 1: Blood pressure */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733] min-w-[100px]">
              Blood pressure
            </span>
            <div className="flex-1 h-5 flex items-center px-2">
              <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 0 10 Q 25 7 50 11 T 100 8"
                  fill="none"
                  stroke="#0B5F73"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums shrink-0">
              128/82
            </span>
          </div>

          {/* Row 2: Heart rate */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733] min-w-[100px]">
              Heart rate
            </span>
            <div className="flex-1 h-5 flex items-center px-2">
              <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 0 10 Q 20 13 45 7 T 100 9"
                  fill="none"
                  stroke="#0B5F73"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums shrink-0">
              88
            </span>
          </div>

          {/* Row 3: Oxygen */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733] min-w-[100px]">
              Oxygen
            </span>
            <div className="flex-1 h-5 flex items-center px-2">
              <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 0 10 Q 30 8 60 10 T 100 8"
                  fill="none"
                  stroke="#0B5F73"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums shrink-0">
              98%
            </span>
          </div>

          {/* Row 4: Temperature */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733] min-w-[100px]">
              Temperature
            </span>
            <div className="flex-1 h-5 flex items-center px-2">
              <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 0 11 Q 30 9 65 11 T 100 10"
                  fill="none"
                  stroke="#0B5F73"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums shrink-0">
              36.8°
            </span>
          </div>
        </div>
      </div>

      {/* Dual Wearables Sync Status */}
      <WearableStatusPill
        bumpBandBattery={82}
        bumpBandStatus="connected"
        watchBattery={64}
        watchStatus="connected"
        onOpenHardwareSheet={onOpenHardwareSheet}
      />
    </div>
  );
};
