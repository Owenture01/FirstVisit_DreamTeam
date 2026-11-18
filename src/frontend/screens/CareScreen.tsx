import React, { useState } from 'react';
import { Video, Timer, Clock, Pill, Calendar, Check } from 'lucide-react';
import { Header } from '../components/Header';

interface CareScreenProps {
  gestationalWeek?: number;
  gestationalDay?: number;
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  isVisitDone?: boolean;
}

interface MedicineRow {
  id: string;
  title: string;
  subtitle?: string;
  days: boolean[];
}

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const INITIAL_MEDICINES: MedicineRow[] = [
  {
    id: 'folic',
    title: 'Folic acid · morning',
    days: [true, true, true, false, false, false, false],
  },
  {
    id: 'iron',
    title: 'Iron · evening',
    subtitle: '(prescribed after blood test)',
    days: [true, true, true, false, false, false, false],
  },
  {
    id: 'aspirin',
    title: 'Aspirin · evening (Dr. Layla)',
    days: [true, true, true, false, false, false, false],
  },
];

const EXTRA_PRESCRIPTION_OPTIONS: Omit<MedicineRow, 'days'>[] = [
  {
    id: 'vitd',
    title: 'Vitamin D · morning (Dr. Layla)',
    subtitle: '(2000 IU daily)',
  },
  {
    id: 'calcium',
    title: 'Calcium · midday (Dr. Layla)',
    subtitle: '(take 2h apart from iron)',
  },
];

export const CareScreen: React.FC<CareScreenProps> = ({
  gestationalWeek = 31,
  gestationalDay = 4,
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  isVisitDone: initialVisitDone = false,
}) => {
  const [isVisitDone, setIsVisitDone] = useState(initialVisitDone);

  React.useEffect(() => {
    setIsVisitDone(initialVisitDone);
  }, [initialVisitDone]);

  const [medicines, setMedicines] = useState<MedicineRow[]>(INITIAL_MEDICINES);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showPrescriptionDrawer, setShowPrescriptionDrawer] = useState(false);

  const timeSlots = [
    'Thursday · 09:30 AM',
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

  const toggleMedicineDay = (medId: string, dayIdx: number) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === medId
          ? {
              ...med,
              days: med.days.map((checked, idx) =>
                idx === dayIdx ? !checked : checked
              ),
            }
          : med
      )
    );
  };

  const addPrescriptionMedicine = (item: Omit<MedicineRow, 'days'>) => {
    setMedicines((prev) => {
      if (prev.some((m) => m.id === item.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          ...item,
          days: [false, false, false, false, false, false, false],
        },
      ];
    });
    setShowPrescriptionDrawer(false);
  };

  const availableExtras = EXTRA_PRESCRIPTION_OPTIONS.filter(
    (opt) => !medicines.some((m) => m.id === opt.id)
  );

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

      {/* Screen Title & Loop status toggle */}
      <div className="px-1 pt-0.5 flex items-center justify-between gap-2">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Care
        </h1>

        <button
          type="button"
          onClick={() => setIsVisitDone(!isVisitDone)}
          className={`min-h-[36px] text-[11px] font-['Figtree'] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
            isVisitDone
              ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]/40'
              : 'bg-[#FBFDFE] text-[#0B5F73] border-[#DCE5EA]'
          }`}
        >
          {isVisitDone ? 'View: 24 · Visit done ✓' : 'View: 12 · Plan & medicines'}
        </button>
      </div>

      {/* Screen 24 · Visit Done View */}
      {isVisitDone ? (
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
        /* Screen 12 · Your plan & Medicine box */
        <>
          {/* Card 1: Your plan */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
                Your plan
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[12px]">
                By Dr. Layla
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="font-['Noto_Sans'] font-semibold text-[14.5px] text-[#0F2733] leading-snug">
                  Urine protein check · clinic · Thu 9:30
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                  <Timer className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="font-['Noto_Sans'] font-semibold text-[14.5px] text-[#0F2733] leading-snug">
                  Cuff check, morning and night
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTimePicker(!showTimePicker)}
              aria-label="Pick a time for clinic check"
              className="w-full mt-4 min-h-[48px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-[0.99] transition-all cursor-pointer"
            >
              {selectedTimeSlot ? `Booked: ${selectedTimeSlot}` : 'Pick a time'}
            </button>

            {showTimePicker && (
              <div className="mt-3 p-3 rounded-[16px] bg-[#F1F6F8] border border-[#DCE5EA] space-y-2">
                <span className="text-xs font-['Figtree'] font-bold text-[#475569] block">
                  Available slots with Midwife Noura:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => {
                        setSelectedTimeSlot(slot);
                        setShowTimePicker(false);
                      }}
                      className={`min-h-[44px] px-3 py-2 text-xs font-['Figtree'] font-semibold rounded-xl text-left transition-colors cursor-pointer ${
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

          {/* Card 2: Medicine box */}
          <div className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs">
            <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] leading-snug">
              Medicine box
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
              From your prescription · Dr. Layla
            </p>

            {/* 7-Day Column Header */}
            <div className="grid grid-cols-7 gap-1 text-center mt-3.5 mb-2">
              {WEEK_DAYS.map((day) => (
                <span
                  key={day}
                  className="font-['Figtree'] font-bold text-[11px] text-[#475569]"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Medicine Checklist Rows */}
            <div className="space-y-3">
              {medicines.map((med) => (
                <div key={med.id}>
                  <p className="font-['Figtree'] font-bold text-[14px] text-[#0F2733] leading-snug">
                    {med.title}
                  </p>
                  {med.subtitle && (
                    <p className="font-['Noto_Sans'] text-[12px] text-[#475569] leading-snug mt-0.5">
                      {med.subtitle}
                    </p>
                  )}

                  <div className="grid grid-cols-7 gap-1 mt-1.5">
                    {med.days.map((checked, dayIdx) => (
                      <button
                        key={`${med.id}-${WEEK_DAYS[dayIdx]}`}
                        type="button"
                        onClick={() => toggleMedicineDay(med.id, dayIdx)}
                        aria-label={`${med.title} ${WEEK_DAYS[dayIdx]}`}
                        aria-pressed={checked}
                        className="min-h-[38px] w-full flex items-center justify-center cursor-pointer group"
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            checked
                              ? 'bg-[#0B5F73] text-white'
                              : 'bg-white border-[1.5px] border-[#CFE7EE] group-hover:border-[#0B5F73]'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowPrescriptionDrawer((prev) => !prev)}
              className="w-full mt-4 min-h-[44px] h-11 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center hover:bg-[#084857] active:scale-[0.99] transition-all cursor-pointer"
            >
              Add from prescription
            </button>

            {showPrescriptionDrawer && (
              <div className="mt-3 p-3 rounded-[16px] bg-[#F1F6F8] border border-[#DCE5EA] space-y-2">
                <span className="text-xs font-['Figtree'] font-bold text-[#475569] block">
                  {availableExtras.length > 0
                    ? 'Dr. Layla prescription items:'
                    : 'All prescribed items added to your Medicine box.'}
                </span>
                {availableExtras.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => addPrescriptionMedicine(item)}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-white hover:bg-[#DDEFF4] text-left transition-colors cursor-pointer border border-[#DCE5EA]"
                  >
                    <span className="font-['Figtree'] font-bold text-[13px] text-[#0F2733] block">
                      + {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569] block">
                        {item.subtitle}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] leading-snug mt-3">
              Hana can explain your medicines but never changes a dose.
            </p>
          </div>

          {/* Card 3: Midwife Noura speech bubble */}
          <div className="w-full flex items-end gap-2.5 pt-0.5">
            <div className="w-9 h-9 rounded-full bg-[#FBEBD0] text-[#6E4100] font-['Figtree'] font-bold text-[15px] flex items-center justify-center shrink-0">
              N
            </div>

            <div className="flex-1 bg-[#FBFDFE] rounded-[20px] rounded-bl-[2px] px-4 py-3 border border-[#DCE5EA] shadow-2xs">
              <span className="font-['Noto_Sans'] text-[12px] font-semibold text-[#475569] block">
                Midwife Noura
              </span>
              <p className="font-['Noto_Sans'] font-medium text-[14px] text-[#0F2733] mt-0.5 leading-snug">
                {selectedTimeSlot
                  ? `Confirmed for ${selectedTimeSlot}.`
                  : 'Pick a time for your clinic check.'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
