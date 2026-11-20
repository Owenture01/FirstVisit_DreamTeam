import React, { useEffect, useState } from 'react';
import { Calendar, Check, Clock, X } from 'lucide-react';
import {
  AppointmentSelectionInput,
  BOOKING_DATE_CHOICES,
  DEFAULT_CLINIC_LOCATION,
} from '../../utils/bookedAppointment';

interface BookVideoCheckSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  initialDateLabel?: string;
  initialTime?: string;
  onBookingConfirmed?: (selection: AppointmentSelectionInput) => void;
}

export const BookVideoCheckSheet: React.FC<BookVideoCheckSheetProps> = ({
  isOpen,
  onClose,
  title = 'Pick a time',
  subtitle = 'Urine protein test · Dr. Aisyah',
  initialDateLabel,
  initialTime,
  onBookingConfirmed,
}) => {
  const [selectedDateId, setSelectedDateId] = useState<string>(BOOKING_DATE_CHOICES[0].id);
  const [selectedSlot, setSelectedSlot] = useState<string>(BOOKING_DATE_CHOICES[0].slots[0]);
  const [askAhmed, setAskAhmed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (initialDateLabel) {
      const matchedDay = BOOKING_DATE_CHOICES.find((d) => d.label === initialDateLabel);
      if (matchedDay) {
        setSelectedDateId(matchedDay.id);
        if (initialTime && matchedDay.slots.includes(initialTime)) {
          setSelectedSlot(initialTime);
        } else {
          setSelectedSlot(matchedDay.slots[0]);
        }
        return;
      }
    }
    setSelectedDateId(BOOKING_DATE_CHOICES[0].id);
    setSelectedSlot(BOOKING_DATE_CHOICES[0].slots[0]);
  }, [isOpen, initialDateLabel, initialTime]);

  if (!isOpen) return null;

  const activeDay =
    BOOKING_DATE_CHOICES.find((d) => d.id === selectedDateId) ?? BOOKING_DATE_CHOICES[0];

  const handleSelectDay = (dayId: string) => {
    setSelectedDateId(dayId);
    const nextDay = BOOKING_DATE_CHOICES.find((d) => d.id === dayId) ?? BOOKING_DATE_CHOICES[0];
    if (!nextDay.slots.includes(selectedSlot)) {
      setSelectedSlot(nextDay.slots[0]);
    }
  };

  const handleDone = () => {
    onBookingConfirmed?.({
      dateLabel: activeDay.label,
      time: selectedSlot,
      location: DEFAULT_CLINIC_LOCATION,
      askPartnerHelp: askAhmed,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-5 text-left flex flex-col max-h-[85vh] overflow-y-auto"
      >
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header with Title & Doctor note */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733] leading-tight">
              {title}
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
              {subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close time picker"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Date selection */}
        <div className="flex items-center gap-1.5 text-[12.5px] font-['Figtree'] font-bold text-[#0F2733] mb-2">
          <Calendar className="w-3.5 h-3.5 text-[#0B5F73]" />
          <span>Choose date</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {BOOKING_DATE_CHOICES.map((day) => {
            const isSelected = selectedDateId === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => handleSelectDay(day.id)}
                aria-pressed={isSelected}
                className={`min-h-[42px] py-2 px-3 rounded-full text-[13px] font-['Figtree'] font-bold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0F2733] text-white shadow-xs'
                    : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-slate-200'
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>

        {/* Time slot chips */}
        <div className="flex items-center gap-1.5 text-[12.5px] font-['Figtree'] font-bold text-[#0F2733] mb-2">
          <Clock className="w-3.5 h-3.5 text-[#0B5F73]" />
          <span>Choose time</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {activeDay.slots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={`${activeDay.id}-${slot}`}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                aria-pressed={isSelected}
                className={`min-h-[42px] py-2 px-3 rounded-full text-[13px] font-['Figtree'] font-bold tabular-nums flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{slot}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Appointment Summary Banner */}
        <div className="w-full p-3 rounded-[16px] bg-[#DDEFF4] text-[#0B5F73] flex items-center gap-2 font-['Figtree'] font-bold text-[13px] mb-4">
          <Check className="w-4 h-4 stroke-[3] shrink-0" />
          <span className="tabular-nums">
            {activeDay.label} {selectedSlot} · {DEFAULT_CLINIC_LOCATION}
          </span>
        </div>

        {/* Toggle switch: Ask Ahmed to mind the kids */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100 mb-5">
          <span className="font-['Noto_Sans'] font-medium text-[14px] text-[#0F2733]">
            Ask Ahmed to mind the kids
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={askAhmed}
            onClick={() => setAskAhmed(!askAhmed)}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
              askAhmed ? 'bg-[#0B5F73]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                askAhmed ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Confirm action button */}
        <button
          type="button"
          onClick={handleDone}
          className="w-full min-h-[46px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          Confirm {activeDay.label}, {selectedSlot}
        </button>
      </div>
    </div>
  );
};
