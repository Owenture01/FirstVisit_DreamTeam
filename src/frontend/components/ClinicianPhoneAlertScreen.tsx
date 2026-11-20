import React, { useEffect, useState } from 'react';
import { Heart, Phone, Check } from 'lucide-react';
import {
  ClinicianPhoneAlertState,
  bookEarlyReview,
  bookUrgentSlot,
  createInitialClinicianPhoneState,
  toggleCallUrgentPatient,
} from '../utils/escalationScenarios';

interface ClinicianPhoneAlertScreenProps {
  isOpen: boolean;
  triggerKey?: number;
}

export const ClinicianPhoneAlertScreen: React.FC<ClinicianPhoneAlertScreenProps> = ({
  isOpen,
  triggerKey = 0,
}) => {
  const [state, setState] = useState<ClinicianPhoneAlertState>(() =>
    createInitialClinicianPhoneState()
  );

  useEffect(() => {
    if (isOpen) {
      setState(createInitialClinicianPhoneState());
    }
  }, [isOpen, triggerKey]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="clinician-phone-alert-screen"
      role="region"
      aria-label="Clinician phone urgent alert"
      className="absolute inset-0 z-40 bg-[#F1F6F8] dark:bg-[#0E1A20] overflow-y-auto px-4 pt-5 pb-6 flex flex-col animate-in fade-in duration-200"
    >
      {/* Clinician Header */}
      <header className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-[12px] bg-[#0B5F73] text-white flex items-center justify-center shrink-0"
          >
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-['Figtree'] font-extrabold text-[16px] leading-tight text-[#0F2733] dark:text-[#F1F6F8]">
              Dr. Aisyah
            </h1>
            <p className="font-['Noto_Sans'] text-[13px] leading-tight text-[#475569] dark:text-[#A9B8C0] mt-0.5">
              Obstetrics care team
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/70 text-[#15803D] dark:text-emerald-300 font-['Figtree'] font-bold text-[12.5px] shrink-0">
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#15803D] dark:bg-emerald-400" />
          <span>Online</span>
        </span>
      </header>

      {/* Hero Urgent Alert Card */}
      <section
        aria-label="Urgent patient alert for Sara A."
        className="w-full rounded-[24px] bg-[#B3261E] text-white p-5 shadow-[0_14px_34px_rgba(179,38,30,0.34)]"
      >
        <div className="flex items-center gap-3.5">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-[12px] bg-white/18 flex items-center justify-center font-['Figtree'] font-extrabold text-[18px] shrink-0"
          >
            !
          </div>

          <div className="min-w-0">
            <p className="font-['Figtree'] font-bold text-[12px] tracking-[0.02em] text-white/90 leading-snug">
              URGENT · assigned to you 10:41
            </p>
            <h2 className="font-['Figtree'] font-extrabold text-[18px] leading-tight text-white mt-0.5">
              Sara A. · 36 weeks
            </h2>
          </div>
        </div>

        <p className="font-['Figtree'] font-bold text-[15px] leading-[1.4] text-white mt-4">
          BP 162/112, confirmed on retake. She has been told to go to A&amp;E. ED notified.
        </p>

        <p className="font-['Noto_Sans'] text-[13.5px] leading-[1.42] text-white/90 mt-2.5">
          Next: arrange an urgent urine protein test for pre-eclampsia.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            type="button"
            onClick={() => setState((prev) => bookUrgentSlot(prev))}
            aria-pressed={state.isUrgentSlotBooked}
            className={`min-h-[46px] h-[46px] px-4 rounded-full font-['Figtree'] font-extrabold text-[15px] inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer ${
              state.isUrgentSlotBooked
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : 'bg-white text-[#8F1D17] hover:bg-red-50'
            }`}
          >
            {state.isUrgentSlotBooked ? (
              <>
                <Check className="w-4 h-4 stroke-[2.8]" />
                <span>Booked {state.urgentSlotTime}</span>
              </>
            ) : (
              <span>Book {state.urgentSlotTime}</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setState((prev) => toggleCallUrgentPatient(prev))}
            aria-pressed={state.isCallingUrgentPatient}
            className={`min-h-[46px] h-[46px] px-4 rounded-full border-[1.5px] font-['Figtree'] font-bold text-[15px] inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
              state.isCallingUrgentPatient
                ? 'bg-white/20 border-white text-white'
                : 'bg-transparent border-white/80 text-white hover:bg-white/10'
            }`}
          >
            <Phone className="w-4 h-4 stroke-[2.2]" />
            <span>{state.isCallingUrgentPatient ? 'Calling…' : 'Call Sara'}</span>
          </button>
        </div>
      </section>

      {/* Early Reviews Queue Card */}
      <section
        aria-label="Early reviews for you"
        className="w-full mt-4 bg-[#FBFDFE] dark:bg-[#15252D] border border-[#DCE5EA] dark:border-slate-700/80 rounded-[20px] px-4 py-3.5 shadow-2xs"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EEF1] dark:border-slate-700/80">
          <h2 className="font-['Figtree'] font-extrabold text-[15.5px] text-[#0F2733] dark:text-[#F1F6F8]">
            Early reviews for you
          </h2>
          <span className="font-['Noto_Sans'] text-[13.5px] font-medium text-[#475569] dark:text-[#A9B8C0] tabular-nums">
            {state.reviews.length}
          </span>
        </div>

        <div className="divide-y divide-[#E6EEF1] dark:divide-slate-700/80">
          {state.reviews.map((review) => {
            const isBooked = review.status === 'booked';
            return (
              <div
                key={review.id}
                className="py-3.5 last:pb-1 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-['Figtree'] font-extrabold text-[15px] leading-snug text-[#0F2733] dark:text-[#F1F6F8]">
                    {review.patientName}
                  </p>
                  <p className="font-['Noto_Sans'] text-[13px] leading-snug text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                    {review.reason}
                  </p>
                </div>

                {isBooked ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/70 text-[#15803D] dark:text-emerald-300 font-['Figtree'] font-bold text-[12.5px] whitespace-nowrap shrink-0">
                    {review.bookedLabel}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setState((prev) => bookEarlyReview(prev, review.id))}
                    className="min-h-[38px] px-4 py-1.5 rounded-full bg-[#DDEFF4] dark:bg-[#0B5F73]/40 text-[#0B5F73] dark:text-[#6CCBE0] font-['Figtree'] font-bold text-[13px] hover:bg-[#cbe3ea] active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book review
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Audit Policy Footnote */}
      <p className="mt-4 px-0.5 font-['Noto_Sans'] text-[13px] leading-[1.45] text-[#475569] dark:text-[#94A3B8]">
        No sign-off needed for alerts or bookings. The app logs what was sent, when, and who acted.
      </p>

      {/* Live Audit Confirmation (only appears after clinician acts) */}
      {state.auditLog.length > 0 && (
        <div
          data-testid="clinician-audit-log"
          role="status"
          aria-live="polite"
          className="mt-3 rounded-[16px] bg-[#FBFDFE] dark:bg-[#15252D] border border-[#DCE5EA] dark:border-slate-700 px-3.5 py-2.5 space-y-1"
        >
          <p className="font-['Figtree'] font-bold text-[11.5px] uppercase tracking-wider text-[#0B5F73] dark:text-[#6CCBE0]">
            Activity logged
          </p>
          {state.auditLog.slice(0, 3).map((entry, idx) => (
            <p
              key={`${entry}-${idx}`}
              className="font-['Noto_Sans'] text-[12px] text-[#475569] dark:text-[#A9B8C0] leading-snug"
            >
              {entry}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
