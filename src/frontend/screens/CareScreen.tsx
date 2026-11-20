import React, { useState } from 'react';
import { Clock, Pill, Calendar, Check } from 'lucide-react';
import { Header } from '../components/Header';
import { EscalatedCuffCareView } from '../components/EscalatedCuffCareView';
import { PostpartumWeek6View } from '../components/PostpartumWeek6View';
import {
  INITIAL_TODAY_DOSES,
  INITIAL_WEEK_DOTS,
  TodayDoseItem,
  computeCareDoseSummary,
  toggleDoseStatus,
} from '../utils/careMedicines';
import { CareScreenMode } from '../utils/escalationScenarios';

interface CareScreenProps {
  gestationalWeek?: number;
  gestationalDay?: number;
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  isVisitDone?: boolean;
  careMode?: CareScreenMode;
  todayDoses?: TodayDoseItem[];
  onToggleDose?: (doseId: string) => void;
}

export const CareScreen: React.FC<CareScreenProps> = ({
  gestationalWeek = 31,
  gestationalDay = 4,
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  isVisitDone: initialVisitDone = false,
  careMode: controlledCareMode,
  todayDoses: controlledDoses,
  onToggleDose: controlledToggleDose,
}) => {
  const [isVisitDone, setIsVisitDone] = useState(initialVisitDone);
  const [localDoses, setLocalDoses] = useState<TodayDoseItem[]>(INITIAL_TODAY_DOSES);
  const todayDoses = controlledDoses ?? localDoses;

  React.useEffect(() => {
    setIsVisitDone(initialVisitDone);
  }, [initialVisitDone]);

  const effectiveMode: CareScreenMode =
    controlledCareMode ?? (isVisitDone ? 'visit_done' : 'medicines');

  const triageSteps = [
    { label: 'Flagged', done: true },
    { label: 'Midwife', done: true },
    { label: 'Doctor', done: true },
    { label: 'Booked', done: true },
    { label: 'Seen', done: true },
  ];

  const handleToggleDose = (doseId: string) => {
    if (controlledToggleDose) {
      controlledToggleDose(doseId);
    } else {
      setLocalDoses((prev) => toggleDoseStatus(prev, doseId));
    }
  };

  const summary = computeCareDoseSummary(todayDoses);

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6 text-left">
      {/* Header */}
      <Header
        gestationalWeek={gestationalWeek}
        gestationalDay={gestationalDay}
        titleOverride={effectiveMode === 'postpartum_week6' ? 'Day 42 after birth' : undefined}
        subtitleOverride={effectiveMode === 'postpartum_week6' ? 'Postpartum check' : undefined}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen 26 · No reply · escalated */}
      {effectiveMode === 'escalated' ? (
        <EscalatedCuffCareView />
      ) : effectiveMode === 'postpartum_week6' ? (
        <PostpartumWeek6View />
      ) : (
        <>
          {/* Screen Title */}
          <div className="px-1 pt-0.5 flex items-center justify-between gap-2">
            <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
              Care
            </h1>

            {effectiveMode === 'visit_done' && !controlledCareMode && (
              <button
                type="button"
                onClick={() => setIsVisitDone(false)}
                className="min-h-[36px] text-[12px] font-['Figtree'] font-bold px-3 py-1 rounded-full border bg-[#FBFDFE] text-[#0B5F73] border-[#DCE5EA] hover:bg-[#DDEFF4]/50 transition-colors cursor-pointer"
              >
                Back to medicines
              </button>
            )}
          </div>

          {/* Screen 24 · Visit Done View */}
          {effectiveMode === 'visit_done' ? (
        <>
          {/* Card 1: Video check done */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-[#DCE5EA] shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
                  Video check done
                </h2>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] font-['Figtree'] font-bold text-[12px]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Done</span>
              </span>
            </div>

            {/* 5 Filled Progress Dots: Flagged, Midwife, Doctor, Booked, Seen */}
            <div className="my-3 flex items-center justify-between px-1">
              {triageSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#0B5F73] ring-4 ring-[#DDEFF4]" />
                  <span className="text-[10px] font-['Noto_Sans'] text-[#0B5F73] font-bold mt-1.5">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-3 pt-2 border-t border-slate-100">
              Thu 14 Nov, 9:30 · Dr. Layla
            </p>
          </div>

          {/* Card 2: What Dr. Layla decided */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-[#DCE5EA] shadow-2xs">
            <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] mb-4">
              What Dr. Layla decided
            </h2>

            <div className="space-y-4">
              {/* Decision 1: Medicine */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 -rotate-45" />
                </div>
                <div>
                  <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                    Keep your BP medicine
                  </h3>
                  <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
                    Twice a day, no change
                  </p>
                </div>
              </div>

              {/* Decision 2: Cuff check */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                    Cuff check morning and night
                  </h3>
                  <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
                    Until your next visit
                  </p>
                </div>
              </div>

              {/* Decision 3: Next check */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                    Next check Thu 21 Nov
                  </h3>
                  <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
                    Already booked for you
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Dr. Layla's Note */}
          <div className="w-full flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-extrabold text-[16px] flex items-center justify-center shrink-0 shadow-xs">
              L
            </div>

            <div className="flex-1 bg-[#FBFDFE] rounded-[20px] rounded-tl-[4px] p-4 border border-[#DCE5EA] shadow-2xs">
              <span className="font-['Noto_Sans'] text-[12px] font-semibold text-[#475569] block">
                Dr. Layla
              </span>
              <p className="font-['Noto_Sans'] font-medium text-[14px] text-[#0F2733] mt-0.5">
                Baby looks well. Keep checking your BP.
              </p>
            </div>
          </div>
        </>
      ) : (
        /* Screen 12 · Care · medicines */
        <>
          {/* Card 1: Next dose hero card */}
          <section
            aria-label="Next dose reminder"
            className="w-full rounded-[22px] bg-[#0B5F73] text-white p-5 shadow-xs"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <Pill className="w-6 h-6 text-white" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <span className="font-['Noto_Sans'] text-[13px] font-medium text-[#CFE7EE] block leading-snug">
                  {summary.nextDose ? 'Next dose' : 'Today complete'}
                </span>
                <h2 className="font-['Figtree'] font-extrabold text-[22px] text-white leading-tight tabular-nums mt-0.5">
                  {summary.nextDose
                    ? `${summary.nextDose.name} · ${summary.nextDose.time}`
                    : 'All doses taken'}
                </h2>
              </div>
            </div>

            <p className="font-['Noto_Sans'] text-[13.5px] text-white/90 leading-snug mt-3.5">
              {summary.nextDose
                ? `Hana will check in at ${summary.nextDose.time}. Just tap Yes on her message.`
                : 'All medicines logged for today. Hana will check in tomorrow at 08:00.'}
            </p>
          </section>

          {/* Card 2: Today dose schedule */}
          <section
            aria-label="Today's medicines"
            className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
          >
            <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] pb-3 border-b border-[#E5EEF2]">
              Today
            </h2>

            <div className="divide-y divide-[#E5EEF2]">
              {todayDoses.map((dose) => {
                const isTaken = dose.status === 'taken';
                return (
                  <div
                    key={dose.id}
                    className="py-3.5 last:pb-1 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-['Figtree'] font-bold text-[14.5px] text-[#0F2733] tabular-nums shrink-0 w-11">
                        {dose.time}
                      </span>
                      <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733] truncate">
                        {dose.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleDose(dose.id)}
                      aria-pressed={isTaken}
                      aria-label={
                        isTaken
                          ? `${dose.name} at ${dose.time} marked ${dose.badgeText}. Tap to mark due`
                          : `Mark ${dose.name} at ${dose.time} as taken`
                      }
                      className={`min-h-[34px] px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-['Figtree'] font-bold text-[12.5px] transition-all shrink-0 cursor-pointer active:scale-95 ${
                        isTaken
                          ? 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#c8f7d8]'
                          : 'bg-[#FBEBD0] text-[#8F5300] hover:bg-[#f7dfb8]'
                      }`}
                    >
                      {isTaken ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.6]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                      )}
                      <span>{dose.badgeText}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Card 3: This week adherence summary */}
          <section
            aria-label="Weekly medicine adherence"
            className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
                This week
              </h2>
              <span className="font-['Figtree'] font-bold text-[14.5px] text-[#0F2733] tabular-nums">
                {summary.takenThisWeek} of {summary.totalThisWeek} taken
              </span>
            </div>

            <div className="flex items-center gap-2.5 mt-3" role="list" aria-label="Daily doses this week">
              {INITIAL_WEEK_DOTS.map((dot) => (
                <span
                  key={dot.day}
                  role="listitem"
                  title={`${dot.day}: ${dot.state}`}
                  aria-label={`${dot.day}: ${dot.state}`}
                  className={
                    dot.state === 'taken'
                      ? 'w-3.5 h-3.5 rounded-full bg-[#15803D] inline-block shrink-0'
                      : 'w-3.5 h-3.5 rounded-full border-2 border-[#B3261E] bg-white inline-block shrink-0'
                  }
                />
              ))}
            </div>

            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-2.5">
              {summary.missedSummary}
            </p>
          </section>
        </>
      )}
        </>
      )}
    </div>
  );
};
