import React, { useState } from 'react';
import { Phone, MapPin, Users, Building2, Check, X } from 'lucide-react';
import {
  CUFF_ESCALATION_TIMELINE,
  EscalationDotTone,
  MATERNITY_UNIT_DETAILS,
} from '../utils/escalationScenarios';

const DOT_COLOR_CLASS: Record<EscalationDotTone, string> = {
  teal: 'bg-[#0B5F73]',
  amber: 'bg-[#F2A541]',
  urgent: 'bg-[#B3261E]',
};

export const EscalatedCuffCareView: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  return (
    <div data-testid="escalated-cuff-care-view" className="w-full flex flex-col space-y-4">
      {/* Screen Heading */}
      <h1 className="font-['Figtree'] font-extrabold text-[23px] leading-[1.2] tracking-tight text-[#0F2733] dark:text-[#F1F6F8] px-0.5 pt-0.5">
        Who has your cuff reading
      </h1>

      {/* Escalation Timeline Card */}
      <section
        aria-label="Cuff reading escalation timeline"
        className="w-full bg-[#FBFDFE] dark:bg-[#15252D] border border-[#DCE5EA] dark:border-slate-700/80 rounded-[20px] px-4 py-4 space-y-4 shadow-2xs"
      >
        {CUFF_ESCALATION_TIMELINE.map((event) => (
          <div key={event.id} className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <span
                aria-hidden="true"
                className={`w-3 h-3 rounded-full shrink-0 mt-1 ${DOT_COLOR_CLASS[event.tone]}`}
              />
              <div className="min-w-0">
                <p className="font-['Figtree'] font-extrabold text-[15px] leading-[1.25] text-[#0F2733] dark:text-[#F1F6F8]">
                  {event.title}
                </p>
                <p className="font-['Noto_Sans'] text-[13px] leading-[1.35] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                  {event.subtitle}
                </p>
              </div>
            </div>

            <span className="font-['Noto_Sans'] text-[12.5px] text-[#475569] dark:text-[#94A3B8] tabular-nums shrink-0 pt-0.5">
              {event.time}
            </span>
          </div>
        ))}
      </section>

      {/* Red-Bordered Maternity Unit Action Card */}
      <section
        aria-label="Maternity unit instructions"
        className="w-full bg-[#FBFDFE] dark:bg-[#15252D] border-[1.5px] border-[#B3261E] rounded-[20px] p-4 shadow-2xs"
      >
        <div className="flex items-start gap-3.5">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-[12px] bg-[#0B5F73] text-white flex items-center justify-center shrink-0"
          >
            <Building2 className="w-5 h-5 stroke-[2.1]" />
          </div>

          <div className="min-w-0">
            <h2 className="font-['Figtree'] font-extrabold text-[16px] leading-[1.25] text-[#0F2733] dark:text-[#F1F6F8]">
              {MATERNITY_UNIT_DETAILS.name}
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] leading-[1.4] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
              {MATERNITY_UNIT_DETAILS.etaLine}
            </p>
            <p className="font-['Noto_Sans'] text-[13px] leading-[1.4] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
              {MATERNITY_UNIT_DETAILS.testLine}
            </p>
          </div>
        </div>

        {/* Call & Directions Pill Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => setIsCalling((prev) => !prev)}
            aria-pressed={isCalling}
            className={`min-h-[46px] h-[46px] px-4 rounded-full font-['Figtree'] font-bold text-[15px] inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
              isCalling
                ? 'bg-[#15803D] text-white hover:bg-[#166534]'
                : 'bg-[#0B5F73] text-white hover:bg-[#084857]'
            }`}
          >
            {isCalling ? (
              <>
                <Check className="w-4 h-4 stroke-[2.6]" />
                <span>Calling…</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 stroke-[2.2]" />
                <span>Call</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowDirections((prev) => !prev)}
            aria-expanded={showDirections}
            className={`min-h-[46px] h-[46px] px-4 rounded-full border font-['Figtree'] font-bold text-[15px] inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
              showDirections
                ? 'bg-[#DDEFF4] border-[#0B5F73] text-[#0B5F73]'
                : 'bg-[#FBFDFE] dark:bg-slate-800 border-[#C3D0D8] dark:border-slate-600 text-[#0F2733] dark:text-[#F1F6F8] hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4 stroke-[2.2]" />
            <span>Directions</span>
          </button>
        </div>

        {/* Inline Live Call Feedback */}
        {isCalling && (
          <div
            role="status"
            className="mt-3 rounded-[14px] bg-[#DCFCE7] dark:bg-emerald-950/60 px-3.5 py-2.5 flex items-center justify-between gap-2 text-[#15803D] dark:text-emerald-300"
          >
            <span className="font-['Noto_Sans'] text-[12.5px] font-medium">
              Connected to Maternity triage ({MATERNITY_UNIT_DETAILS.phoneNumber})
            </span>
            <button
              type="button"
              onClick={() => setIsCalling(false)}
              aria-label="End call to Maternity unit"
              className="p-1 rounded-full hover:bg-emerald-200/70 cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Inline Route Details */}
        {showDirections && (
          <div
            role="region"
            aria-label="Directions to maternity unit"
            className="mt-3 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-900/70 border border-[#DCE5EA] dark:border-slate-700 px-3.5 py-2.5 text-left"
          >
            <p className="font-['Figtree'] font-bold text-[13px] text-[#0F2733] dark:text-[#F1F6F8]">
              Fastest route · 12 min
            </p>
            <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
              {MATERNITY_UNIT_DETAILS.directionsSummary}
            </p>
          </div>
        )}
      </section>

      {/* Driver & Fallback Notes */}
      <div className="px-0.5 space-y-2 pt-0.5">
        <div className="flex items-center gap-2 text-[#475569] dark:text-[#A9B8C0]">
          <Users className="w-4 h-4 stroke-[2] shrink-0" />
          <span className="font-['Noto_Sans'] text-[13.5px]">
            {MATERNITY_UNIT_DETAILS.driverNote}
          </span>
        </div>

        <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#94A3B8]">
          {MATERNITY_UNIT_DETAILS.fallbackNote}
        </p>
      </div>
    </div>
  );
};
