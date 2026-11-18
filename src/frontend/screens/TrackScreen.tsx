import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../components/Header';

interface TrackScreenProps {
  gestationalWeek?: number;
  gestationalDay?: number;
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  onOpenHardwareSheet?: () => void;
}

export const TrackScreen: React.FC<TrackScreenProps> = ({
  gestationalWeek = 31,
  gestationalDay = 4,
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  onOpenHardwareSheet = () => {},
}) => {
  const [kickCount, setKickCount] = useState(9);

  const handleIncrementKick = () => {
    setKickCount((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6 text-left">
      {/* Header */}
      <Header
        gestationalWeek={gestationalWeek}
        gestationalDay={gestationalDay}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen Title + Last reliable reading */}
      <div className="px-1 pt-0.5">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Track
        </h1>
        <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
          Last reliable reading 07:40
        </p>
      </div>

      {/* Card 1: Kicks today */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-['Figtree'] font-bold text-[18px] text-[#0F2733] leading-snug tabular-nums">
              Kicks today: {kickCount}
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-1 leading-snug">
              Aim: 10 in 12 hours
            </p>
            <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] mt-0.5 leading-snug">
              Counting starts around week 24
            </p>
          </div>

          <button
            type="button"
            onClick={handleIncrementKick}
            aria-label="Log kick"
            className="min-h-[44px] h-11 px-5 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#084857] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Kick</span>
          </button>
        </div>

        <p className="font-['Noto_Sans'] font-semibold text-[13px] text-[#B3261E] mt-2.5 leading-snug">
          Baby moving less? Go to the maternity unit now.
        </p>
      </div>

      {/* Card 2: Recording sessions */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] leading-snug">
            Recording sessions
          </h2>
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569] shrink-0">
            5 of 7 done
          </span>
        </div>

        <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-1">
          Missed one? That&apos;s okay.
        </p>

        <h3 className="font-['Figtree'] font-bold text-[14px] text-[#0F2733] mt-2.5">
          Contractions · none today
        </h3>

        <div className="font-['Noto_Sans'] text-[12.5px] text-[#475569] leading-[1.45] mt-1">
          <p>From ~week 26: 20 min, twice daily.</p>
          <p>CTG: baby heart + contractions.</p>
          <p>Scheduled sessions, not continuous.</p>
        </div>
      </div>

      {/* Card 3: Last 7 days */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs">
        <div className="flex items-baseline justify-between gap-2 pb-2.5">
          <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] leading-snug">
            Last 7 days
          </h2>
          <span className="font-['Noto_Sans'] text-[12px] text-[#475569] shrink-0">
            Upper-arm cuff only
          </span>
        </div>

        <div>
          {/* Row 1: Blood pressure (cuff) */}
          <div className="border-t border-[#DCE5EA] py-2.5 flex items-center justify-between gap-2">
            <span className="font-['Figtree'] font-semibold text-[13.5px] text-[#0F2733] flex-1 min-w-0">
              Blood pressure (cuff)
            </span>
            <svg
              viewBox="0 0 46 14"
              className="w-[46px] h-[14px] shrink-0 overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 0 10 L 7.67 11 L 15.33 8 L 23 9 L 30.67 7 L 38.33 8 L 46 6"
                stroke="#0B5F73"
                strokeWidth="1.83"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums w-[54px] text-right shrink-0">
              128/82
            </span>
          </div>

          {/* Row 2: Heart rate (watch) */}
          <div className="border-t border-[#DCE5EA] py-2.5 flex items-center justify-between gap-2">
            <span className="font-['Figtree'] font-semibold text-[13.5px] text-[#0F2733] flex-1 min-w-0">
              Heart rate (watch)
            </span>
            <svg
              viewBox="0 0 46 14"
              className="w-[46px] h-[14px] shrink-0 overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 0 10 L 7.67 11 L 15.33 8 L 23 9 L 30.67 7 L 38.33 8 L 46 6"
                stroke="#0B5F73"
                strokeWidth="1.83"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] tabular-nums w-[54px] text-right shrink-0">
              88
            </span>
          </div>

          {/* Row 3: Sleep (watch) */}
          <div className="border-t border-[#DCE5EA] py-2.5 flex items-center justify-between gap-2">
            <span className="font-['Figtree'] font-semibold text-[13.5px] text-[#0F2733] flex-1 min-w-0">
              Sleep (watch)
            </span>
            <span className="w-[46px] shrink-0" aria-hidden="true" />
            <span className="font-['Figtree'] font-extrabold text-[15px] text-[#0F2733] w-[54px] text-right shrink-0">
              —
            </span>
          </div>

          {/* Row 4: Temperature trend (watch) */}
          <div className="border-t border-[#DCE5EA] pt-2.5 pb-0.5 flex items-center justify-between gap-2">
            <span className="font-['Figtree'] font-semibold text-[13.5px] text-[#0F2733] flex-1 min-w-0">
              Temperature trend (watch)
            </span>
            <svg
              viewBox="0 0 46 14"
              className="w-[46px] h-[14px] shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="7"
                x2="46"
                y2="7"
                stroke="#475569"
                strokeWidth="1.83"
                strokeDasharray="3 3"
              />
            </svg>
            <span className="w-[54px] shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Hardware Status Pills Row */}
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={onOpenHardwareSheet}
          className="flex-1 min-w-0 min-h-[44px] rounded-[16px] bg-[#FBFDFE] border border-[#DCE5EA] px-3 py-2 flex items-center justify-between gap-2 hover:border-[#0B5F73]/40 active:scale-[0.99] transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-2 min-w-0">
            <svg
              viewBox="0 0 20 14"
              className="w-[18px] h-[13px] shrink-0 text-[#0F2733]"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="2"
                width="18"
                height="10"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M6.5 7H13.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <div className="min-w-0">
              <span className="font-['Figtree'] font-bold text-[13px] text-[#0F2733] leading-tight block truncate">
                Band
              </span>
              <span className="font-['Noto_Sans'] text-[11px] text-[#475569] leading-tight block truncate">
                Signal good
              </span>
            </div>
          </div>
          <span
            className="w-2 h-2 rounded-full bg-[#15803D] shrink-0"
            aria-label="Signal good"
          />
        </button>

        <button
          type="button"
          onClick={onOpenHardwareSheet}
          className="min-h-[44px] rounded-[16px] bg-[#FBFDFE] border border-[#DCE5EA] px-3 py-2 flex items-center gap-1.5 hover:border-[#0B5F73]/40 active:scale-[0.99] transition-all cursor-pointer shrink-0"
        >
          <svg
            viewBox="0 0 18 20"
            className="w-[15px] h-[17px] shrink-0 text-[#0F2733]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 2.5V4.5M12 2.5V4.5M6 15.5V17.5M12 15.5V17.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect
              x="3.5"
              y="4.5"
              width="11"
              height="11"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M9 7.8V10L10.5 11.2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-['Figtree'] font-bold text-[13px] text-[#0F2733]">
            Watch
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenHardwareSheet}
          className="min-h-[44px] rounded-[16px] bg-[#FBFDFE] border border-[#DCE5EA] px-3.5 py-2 flex items-center justify-center hover:border-[#0B5F73]/40 active:scale-[0.99] transition-all cursor-pointer shrink-0"
        >
          <span className="font-['Figtree'] font-bold text-[13px] text-[#0F2733]">
            Cuff
          </span>
        </button>
      </div>

      {/* Bottom Urgent Maternity Unit Warning */}
      <div className="px-1 pt-0.5 font-['Noto_Sans'] font-semibold text-[13px] text-[#B3261E] leading-snug">
        <p>Belly pain, bleeding or leaking fluid?</p>
        <p>Go to the maternity unit now.</p>
      </div>
    </div>
  );
};
