import React, { useState } from 'react';
import { Video, Clock, Pill, Calendar, Check, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/Header';

interface CareScreenProps {
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  isVisitDone?: boolean;
}

export const CareScreen: React.FC<CareScreenProps> = ({
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  isVisitDone: initialVisitDone = false,
}) => {
  const [isVisitDone, setIsVisitDone] = useState(initialVisitDone);

  React.useEffect(() => {
    setIsVisitDone(initialVisitDone);
  }, [initialVisitDone]);

  const [ironTaken, setIronTaken] = useState(false);
  const [folicTaken, setFolicTaken] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    'Thursday · 10:00 AM',
    'Thursday · 02:30 PM',
    'Friday · 11:00 AM',
    'Friday · 04:00 PM',
  ];

  const triageSteps = [
    { label: 'Flagged', done: true },
    { label: 'Midwife', done: true },
    { label: 'Doctor', done: true },
    { label: 'Booked', done: true },
    { label: 'Seen', done: true },
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

      {/* Screen Title & Loop status toggle */}
      <div className="px-1 pt-1 flex items-center justify-between">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Care
        </h1>

        <button
          onClick={() => setIsVisitDone(!isVisitDone)}
          className={`text-[11px] font-['Figtree'] font-bold px-2.5 py-1 rounded-full border transition-all ${
            isVisitDone
              ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]/40'
              : 'bg-[#F1F6F8] text-[#0B5F73] border-slate-200'
          }`}
        >
          {isVisitDone ? 'View: 24 · Visit done ✓' : 'View: 12 · Plan & supplements'}
        </button>
      </div>

      {/* Screen 24 · Visit Done View */}
      {isVisitDone ? (
        <>
          {/* Card 1: Video check done */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
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
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
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

            <div className="flex-1 bg-white rounded-[20px] rounded-tl-[4px] p-4 border border-slate-200/90 shadow-xs">
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
        /* Screen 12 · Plan & Supplements View */
        <>
          {/* Card 1: Your plan */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
                Your plan
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[12px]">
                By Dr. Layla
              </span>
            </div>

            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733]">
                Video check by Friday
              </span>
            </div>

            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733]">
                Cuff check, morning and night
              </span>
            </div>

            <button
              onClick={() => setShowTimePicker(!showTimePicker)}
              aria-label="Pick a time for video check"
              className="w-full mt-4 min-h-[44px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-98 transition-all shadow-xs"
            >
              {selectedTimeSlot ? `Booked: ${selectedTimeSlot}` : 'Pick a time'}
            </button>

            {showTimePicker && (
              <div className="mt-3 p-3 rounded-[16px] bg-[#F1F6F8] border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-[#475569] block">
                  Available slots with Midwife Noura:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedTimeSlot(slot);
                        setShowTimePicker(false);
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors ${
                        selectedTimeSlot === slot
                          ? 'bg-[#0B5F73] text-white'
                          : 'bg-white hover:bg-[#DDEFF4] text-[#0F2733]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Supplements */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
                Supplements
              </h2>
              <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
                From Noura
              </span>
            </div>

            <div 
              onClick={() => setFolicTaken(!folicTaken)}
              className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-none cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 -rotate-45" strokeWidth={2} />
                </div>
                <div>
                  <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] block">
                    Folic acid
                  </span>
                  <span className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                    Morning
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[12px] font-bold transition-all ${
                folicTaken
                  ? 'bg-[#DCFCE7] text-[#15803D]'
                  : 'bg-slate-100 text-[#475569]'
              }`}>
                {folicTaken ? 'Taken' : 'Pending'}
              </span>
            </div>

            <div 
              onClick={() => setIronTaken(!ironTaken)}
              className="flex items-center justify-between py-2.5 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 -rotate-45" strokeWidth={2} />
                </div>
                <div>
                  <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] block">
                    Iron
                  </span>
                  <span className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                    With dinner
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[12px] font-bold transition-all ${
                ironTaken
                  ? 'bg-[#DCFCE7] text-[#15803D]'
                  : 'bg-[#FEF3C7] text-[#92400E]'
              }`}>
                {ironTaken ? 'Taken' : 'At 19:00'}
              </span>
            </div>

            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-3">
              Ask Noura before taking anything new.
            </p>
          </div>

          {/* Card 3: Midwife Noura Message note */}
          <div className="w-full flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-[#FED7AA] text-[#9A3412] font-['Figtree'] font-extrabold text-[16px] flex items-center justify-center shrink-0 shadow-xs">
              N
            </div>

            <div className="flex-1 bg-white rounded-[20px] rounded-tl-[4px] p-4 border border-slate-200/90 shadow-xs">
              <span className="font-['Noto_Sans'] text-[12px] font-semibold text-[#475569] block">
                Midwife Noura
              </span>
              <p className="font-['Noto_Sans'] font-medium text-[14px] text-[#0F2733] mt-0.5">
                Pick a time for our video call.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
