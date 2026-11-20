import React, { useState } from 'react';
import { Check, ChevronRight, Smile } from 'lucide-react';
import {
  POSTPARTUM_CHECK_DAYS,
  PostpartumBpState,
  createInitialPostpartumBpState,
  getPostpartumDayStatus,
  getPostpartumProgressBadge,
  toggleEveningCheck,
} from '../utils/postpartumScenarios';

interface PostpartumDay5ViewProps {
  onOpenHelp: () => void;
  onOpenMoodCheck?: () => void;
}

export const PostpartumDay5View: React.FC<PostpartumDay5ViewProps> = ({
  onOpenHelp,
  onOpenMoodCheck,
}) => {
  const [bpState, setBpState] = useState<PostpartumBpState>(() =>
    createInitialPostpartumBpState()
  );

  const badgeText = getPostpartumProgressBadge(bpState.eveningLogged);
  const displayedReading = bpState.eveningLogged
    ? bpState.eveningReading
    : bpState.morningReading;
  const displayedMeta = bpState.eveningLogged
    ? `Upper-arm cuff · ${bpState.eveningTime}`
    : `Upper-arm cuff · ${bpState.morningTime}`;

  return (
    <div
      data-testid="postpartum-day5-view"
      className="w-full flex flex-col space-y-3.5 text-left"
    >
      {/* Page Heading */}
      <div className="px-1 pt-0.5">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          After birth
        </h1>
      </div>

      {/* Hero Today's Blood Pressure Card */}
      <section
        aria-label="Today's postpartum blood pressure"
        className="w-full rounded-[24px] bg-[#0B5F73] text-white p-4.5 sm:p-5 shadow-xs"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-['Noto_Sans'] text-[14px] text-white/85">
            Today&apos;s blood pressure
          </span>
          <span
            data-testid="postpartum-bp-progress"
            className="px-3 py-1 rounded-full bg-white/16 text-white font-['Figtree'] font-bold text-[12px] tabular-nums"
          >
            {badgeText}
          </span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2.5 flex-wrap">
          <span className="font-['Figtree'] font-extrabold text-[40px] leading-none tracking-tight tabular-nums">
            {displayedReading}
          </span>
          <span className="font-['Noto_Sans'] text-[13.5px] text-white/85">
            {displayedMeta}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setBpState((prev) => toggleEveningCheck(prev))}
          className="mt-4 w-full h-[50px] rounded-full bg-white hover:bg-[#F1F6F8] text-[#0B5F73] font-['Figtree'] font-bold text-[15px] flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
        >
          {bpState.eveningLogged ? (
            <>
              <Check className="w-4 h-4 text-[#15803D] stroke-[2.8]" />
              <span>Evening check logged · 20:00</span>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5 text-[#0B5F73]"
                aria-hidden="true"
              >
                <rect x="3" y="8" width="13" height="8" rx="3" />
                <circle cx="9.5" cy="12" r="1.5" />
                <path d="M16 11h3a2 2 0 0 1 0 4h-1" />
              </svg>
              <span>Evening check at 20:00</span>
            </>
          )}
        </button>
      </section>

      {/* Days 3 to 10 Schedule Card */}
      <section
        aria-label="Days 3 to 10 blood pressure check schedule"
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733]">
            Days 3 to 10
          </h2>
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
            Twice a day
          </span>
        </div>

        <div
          className="mt-3 grid grid-cols-8 gap-1.5 items-center"
          role="list"
          aria-label="Postpartum check days 3 through 10"
        >
          {POSTPARTUM_CHECK_DAYS.map((day) => {
            const status = getPostpartumDayStatus(day, 5, bpState.eveningLogged);
            return (
              <div
                key={day}
                role="listitem"
                aria-label={`Day ${day}: ${status}`}
                data-day-status={status}
                className={`h-9 rounded-[11px] font-['Figtree'] font-bold text-[13px] flex items-center justify-center tabular-nums transition-colors ${
                  status === 'done'
                    ? 'bg-[#0B5F73] text-white'
                    : status === 'current'
                    ? 'bg-[#FBEBD0] border-2 border-[#F2A541] text-[#6E4100]'
                    : 'bg-transparent text-[#0F2733]'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <p className="mt-3 font-['Noto_Sans'] text-[13.5px] text-[#475569] leading-snug">
          Then weekly until week 6. Midwife Noura checks every reading.
        </p>
      </section>

      {/* How are you feeling? Mood check card */}
      <button
        type="button"
        onClick={() => onOpenMoodCheck?.()}
        className="w-full bg-[#FBFDFE] hover:bg-[#F3F8FA] rounded-[20px] p-3.5 border border-[#DCE5EA] shadow-2xs flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-[14px] bg-[#FBEBD0] text-[#6E4100] flex items-center justify-center shrink-0">
            <Smile className="w-5 h-5" strokeWidth={2.1} />
          </div>
          <div className="min-w-0">
            <span className="font-['Figtree'] font-bold text-[15.5px] text-[#0F2733] block leading-snug">
              How are you feeling?
            </span>
            <span className="font-['Noto_Sans'] text-[13px] text-[#475569] block leading-snug">
              2-minute mood check
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#475569] shrink-0" />
      </button>

      {/* Emergency Warning Card */}
      <button
        type="button"
        onClick={onOpenHelp}
        className="w-full bg-[#FBE3E0] hover:bg-[#f7d5d1] rounded-[20px] p-4 text-left transition-colors cursor-pointer"
      >
        <span className="font-['Figtree'] font-bold text-[15px] text-[#7A1712] block leading-snug">
          Call 998 if you have
        </span>
        <span className="font-['Noto_Sans'] text-[13.5px] text-[#7A1712] block leading-snug mt-1">
          Bad headache · blurry vision · chest pain · heavy bleeding
        </span>
      </button>
    </div>
  );
};
