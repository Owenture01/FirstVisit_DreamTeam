import React, { useState } from 'react';
import { Calendar, Check, MapPin, Navigation } from 'lucide-react';
import {
  BookedClinicAppointment,
  formatAppointmentScheduleLine,
} from '../utils/bookedAppointment';

interface ClinicBookedAppointmentCardProps {
  appointment: BookedClinicAppointment;
  onToggleConfirm: () => void;
  onPickAnotherTime: () => void;
}

export const ClinicBookedAppointmentCard: React.FC<ClinicBookedAppointmentCardProps> = ({
  appointment,
  onToggleConfirm,
  onPickAnotherTime,
}) => {
  const [showDirections, setShowDirections] = useState(false);
  const [routeStarted, setRouteStarted] = useState(false);

  const scheduleLine = formatAppointmentScheduleLine(appointment);

  return (
    <section
      aria-label="Booked clinic appointment"
      className="w-full rounded-[20px] bg-[#F4FAFC] border-2 border-[#0B5F73] p-4 text-left shadow-2xs transition-all"
    >
      {/* Top Row: Calendar Badge + Appointment Title & Time/Location */}
      <div className="flex items-start gap-3.5">
        <div
          className="w-11 h-11 rounded-[14px] bg-[#0B5F73] text-white flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <Calendar className="w-[22px] h-[22px]" strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-['Figtree'] font-bold text-[13px] text-[#0B5F73] leading-snug">
            {appointment.eyebrow}
          </p>
          <h2 className="font-['Figtree'] font-extrabold text-[17.5px] text-[#0F2733] leading-tight mt-0.5">
            {appointment.title}
          </h2>
          <p className="font-['Noto_Sans'] text-[13.5px] text-[#475569] leading-snug mt-0.5 tabular-nums">
            {scheduleLine}
          </p>
        </div>
      </div>

      {/* Reason Copy */}
      <p className="font-['Noto_Sans'] text-[14px] text-[#0F2733] leading-[1.45] mt-3.5">
        {appointment.reasonText}
      </p>

      {/* Optional Partner Note when enabled during scheduling */}
      {appointment.askPartnerHelp && (
        <p className="font-['Noto_Sans'] text-[12px] text-[#0B5F73] font-semibold mt-1.5">
          Ahmed will be notified to help with the kids.
        </p>
      )}

      {/* Action Buttons: Confirm & Directions */}
      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <button
          type="button"
          onClick={onToggleConfirm}
          aria-pressed={appointment.isConfirmed}
          className={`min-h-[44px] h-11 px-4 rounded-full font-['Figtree'] font-bold text-[14.5px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all ${
            appointment.isConfirmed
              ? 'bg-[#15803D] hover:bg-[#126b33] text-white shadow-2xs'
              : 'bg-[#0B5F73] hover:bg-[#084857] text-white shadow-2xs'
          }`}
        >
          {appointment.isConfirmed ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Confirmed</span>
            </>
          ) : (
            <span>Confirm</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowDirections((prev) => !prev)}
          aria-expanded={showDirections}
          className={`min-h-[44px] h-11 px-4 rounded-full font-['Figtree'] font-bold text-[14.5px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all ${
            showDirections
              ? 'bg-[#DDEFF4] border border-[#0B5F73] text-[#0B5F73]'
              : 'bg-[#FBFDFE] hover:bg-white border border-[#C3D0D8] text-[#0F2733]'
          }`}
        >
          <MapPin className="w-4 h-4 shrink-0" strokeWidth={2} />
          <span>Directions</span>
        </button>
      </div>

      {/* Expandable Inline Directions Panel (no window.alert / window.open) */}
      {showDirections && (
        <div
          aria-label="Clinic directions"
          className="mt-3 p-3 rounded-[14px] bg-white border border-[#DCE5EA] space-y-2.5"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-['Figtree'] font-bold text-[13px] text-[#0F2733]">
                {appointment.location}
              </p>
              <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-0.5">
                {appointment.address}
              </p>
            </div>
            <span className="font-['Figtree'] font-bold text-[12px] text-[#0B5F73] tabular-nums shrink-0">
              {appointment.driveMinutes} min by car
            </span>
          </div>

          <button
            type="button"
            onClick={() => setRouteStarted((prev) => !prev)}
            className={`w-full min-h-[40px] h-10 px-4 rounded-full font-['Figtree'] font-bold text-[13px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all ${
              routeStarted
                ? 'bg-[#15803D] text-white'
                : 'bg-[#0B5F73] hover:bg-[#084857] text-white'
            }`}
          >
            {routeStarted ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Route ready · {appointment.driveMinutes} min</span>
              </>
            ) : (
              <>
                <Navigation className="w-3.5 h-3.5" />
                <span>Start route</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Reschedule Link */}
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={onPickAnotherTime}
          className="font-['Figtree'] font-bold text-[13.5px] text-[#0B5F73] hover:underline cursor-pointer py-1 px-2"
        >
          Can&apos;t make it? Pick another time
        </button>
      </div>
    </section>
  );
};
