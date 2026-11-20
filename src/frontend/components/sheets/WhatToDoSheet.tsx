import React, { useState } from 'react';
import {
  MapPin,
  Pill,
  Check,
  X,
  Calendar,
  Navigation,
  Clock,
} from 'lucide-react';
import {
  CLINIC_DATE_OPTIONS,
  CLINIC_LOCATIONS,
  formatClinicAvailabilityLine,
  getLocationById,
} from '../../utils/whatToDoOptions';
import { AppointmentSelectionInput } from '../../utils/bookedAppointment';

interface WhatToDoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCall998: () => void;
  onAppointmentBooked?: (selection: AppointmentSelectionInput) => void;
  onMedicineTaken?: () => void;
}

type ActivePanel = 'none' | 'date_picker' | 'locations';

export const WhatToDoSheet: React.FC<WhatToDoSheetProps> = ({
  isOpen,
  onClose,
  onCall998,
  onAppointmentBooked,
  onMedicineTaken,
}) => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');
  const [selectedDateId, setSelectedDateId] = useState<string>(CLINIC_DATE_OPTIONS[0].id);
  const [selectedTime, setSelectedTime] = useState<string>(CLINIC_DATE_OPTIONS[0].slots[0]);
  const [bookedSlot, setBookedSlot] = useState<{ dateLabel: string; time: string } | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(CLINIC_LOCATIONS[0].id);
  const [navigationStarted, setNavigationStarted] = useState<boolean>(false);
  const [medicineTaken, setMedicineTaken] = useState(false);

  if (!isOpen) return null;

  const currentDateOption =
    CLINIC_DATE_OPTIONS.find((d) => d.id === selectedDateId) ?? CLINIC_DATE_OPTIONS[0];
  const currentLocation = getLocationById(selectedLocationId);

  const handleSelectDate = (dateId: string) => {
    setSelectedDateId(dateId);
    const nextDate = CLINIC_DATE_OPTIONS.find((d) => d.id === dateId) ?? CLINIC_DATE_OPTIONS[0];
    if (!nextDate.slots.includes(selectedTime)) {
      setSelectedTime(nextDate.slots[0]);
    }
  };

  const handleConfirmDateTime = () => {
    const confirmed = { dateLabel: currentDateOption.label, time: selectedTime };
    setBookedSlot(confirmed);
    setActivePanel('none');
    onAppointmentBooked?.({
      dateLabel: confirmed.dateLabel,
      time: confirmed.time,
      location: currentLocation.name,
      address: currentLocation.address,
      driveMinutes: currentLocation.driveMinutes,
    });
  };

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
    setNavigationStarted(false);
  };

  const availabilityText = formatClinicAvailabilityLine(
    currentDateOption,
    bookedSlot,
    bookedSlot ? currentLocation.name : undefined
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="What to do now"
        className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-[#DCE5EA] text-left flex flex-col max-h-[86vh] overflow-hidden"
      >
        {/* Fixed Sheet Handle + Header */}
        <div className="px-5 pt-3 pb-3 bg-white shrink-0">
          {/* Grab handle bar */}
          <div className="w-10 h-1 bg-[#CBD5E1] rounded-full mx-auto mb-3" />

          {/* Header with Title & Close button */}
          <div className="flex items-center justify-between">
            <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733] tracking-tight">
              What to do now
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close what to do now"
              className="min-w-[44px] min-h-[44px] -mr-2 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F1F6F8] hover:text-[#0F2733] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Card 1: Clinic Urine Protein Test + Choose Date + Select Location */}
          <div className="p-4 rounded-[22px] bg-[#F4F8FA] border border-[#E6EEF2] mb-3.5">
            <div className="flex items-start gap-3.5">
              {/* Clinic Home + Cross Icon */}
              <div
                className="w-12 h-12 rounded-[14px] bg-[#0B5F73] text-white flex items-center justify-center shrink-0 shadow-2xs"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10.5L12 4L20 10.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V10.5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10.5V15.5M9.5 13H14.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] leading-[1.3]">
                  Come to the clinic for a urine protein test
                </h3>
                <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-2 leading-snug">
                  {currentLocation.openStatus} · {currentLocation.driveMinutes} min by car
                  {selectedLocationId !== CLINIC_LOCATIONS[0].id
                    ? ` · ${currentLocation.name}`
                    : ''}
                </p>
              </div>
            </div>

            {/* 2-Button Action Row: Pick a time & Directions */}
            <div className="grid grid-cols-2 gap-2.5 mt-3.5">
              <button
                type="button"
                onClick={() =>
                  setActivePanel((prev) => (prev === 'date_picker' ? 'none' : 'date_picker'))
                }
                aria-expanded={activePanel === 'date_picker'}
                className={`min-h-[44px] h-11 px-4 rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                  activePanel === 'date_picker'
                    ? 'bg-[#084857] text-white ring-2 ring-[#0B5F73]/30 shadow-xs'
                    : 'bg-[#0B5F73] text-white hover:bg-[#084857] shadow-2xs'
                }`}
              >
                <span>{bookedSlot ? 'Change time' : 'Pick a time'}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePanel((prev) => (prev === 'locations' ? 'none' : 'locations'))
                }
                aria-expanded={activePanel === 'locations'}
                className={`min-h-[44px] h-11 px-4 rounded-full font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                  activePanel === 'locations'
                    ? 'bg-[#DDEFF4] border border-[#0B5F73] text-[#0B5F73]'
                    : 'bg-white border border-[#DCE5EA] text-[#0F2733] hover:bg-[#F8FAFC]'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={2} />
                <span>Directions</span>
              </button>
            </div>

            {/* Interactive Panel A: Choose Date & Time */}
            {activePanel === 'date_picker' && (
              <div
                aria-label="Choose date and time"
                className="mt-3.5 p-3.5 rounded-[16px] bg-white border border-[#DCE5EA] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-['Figtree'] font-bold text-[#0F2733]">
                    <Calendar className="w-3.5 h-3.5 text-[#0B5F73]" />
                    <span>Choose date</span>
                  </div>
                  <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569]">
                    {currentLocation.name}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {CLINIC_DATE_OPTIONS.map((dateOpt) => {
                    const isSelected = selectedDateId === dateOpt.id;
                    return (
                      <button
                        key={dateOpt.id}
                        type="button"
                        onClick={() => handleSelectDate(dateOpt.id)}
                        aria-pressed={isSelected}
                        className={`min-h-[40px] py-2 px-2 rounded-[12px] font-['Figtree'] font-bold text-[12.5px] cursor-pointer active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#0F2733] text-white'
                            : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-[#E2EDF2]'
                        }`}
                      >
                        {dateOpt.label}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[12.5px] font-['Figtree'] font-bold text-[#0F2733] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#0B5F73]" />
                    <span>Available times</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {currentDateOption.slots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={`${currentDateOption.id}-${slot}`}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          aria-pressed={isSelected}
                          className={`min-h-[40px] py-2 px-2 rounded-full font-['Figtree'] font-bold text-[12.5px] tabular-nums flex items-center justify-center gap-1 cursor-pointer active:scale-[0.98] ${
                            isSelected
                              ? 'bg-[#0B5F73] text-white shadow-2xs'
                              : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-[#E2EDF2]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmDateTime}
                  className="w-full min-h-[44px] h-11 px-4 rounded-full bg-[#0B5F73] hover:bg-[#084857] text-white font-['Figtree'] font-bold text-[13.5px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    Confirm {currentDateOption.label}, {selectedTime}
                  </span>
                </button>
              </div>
            )}

            {/* Interactive Panel B: Select Clinic Location */}
            {activePanel === 'locations' && (
              <div
                aria-label="Select clinic location"
                className="mt-3.5 p-3.5 rounded-[16px] bg-white border border-[#DCE5EA] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-['Figtree'] font-bold text-[#0F2733]">
                    <MapPin className="w-3.5 h-3.5 text-[#0B5F73]" />
                    <span>Select clinic location</span>
                  </div>
                  <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569]">
                    Urine protein lab
                  </span>
                </div>

                <div className="space-y-2">
                  {CLINIC_LOCATIONS.map((loc) => {
                    const isSelected = selectedLocationId === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleSelectLocation(loc.id)}
                        aria-pressed={isSelected}
                        className={`w-full p-2.5 rounded-[12px] text-left flex items-center justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#DDEFF4]/70 border border-[#0B5F73]'
                            : 'bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0B5F73]/50'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-['Figtree'] font-bold text-[13px] text-[#0F2733] truncate">
                            {loc.name}
                          </p>
                          <p className="font-['Noto_Sans'] text-[11.5px] text-[#475569] truncate">
                            {loc.address} · {loc.distanceKm}
                          </p>
                        </div>
                        <span className="font-['Figtree'] font-bold text-[12px] text-[#0B5F73] tabular-nums shrink-0">
                          {loc.driveMinutes} min
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setNavigationStarted(true)}
                  className={`w-full min-h-[44px] h-11 px-4 rounded-full font-['Figtree'] font-bold text-[13px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                    navigationStarted
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#0B5F73] hover:bg-[#084857] text-white'
                  }`}
                >
                  {navigationStarted ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5] shrink-0" />
                      <span className="truncate">Route ready · {currentLocation.name}</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 shrink-0" />
                      <span className="truncate">Route to {currentLocation.name}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Availability / Booked summary footer line */}
            <p
              className={`font-['Noto_Sans'] text-[12px] mt-3 ${
                bookedSlot ? 'text-[#0B5F73] font-semibold' : 'text-[#475569]'
              }`}
            >
              {availabilityText}
            </p>
          </div>

        {/* Card 2: Dr. Layla's Plan - BP Medicine */}
        <div className="p-4 rounded-[22px] bg-[#F4F8FA] border border-[#E6EEF2] mb-5">
          <div className="flex items-start gap-3.5">
            <div
              className="w-11 h-11 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <Pill className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span className="font-['Noto_Sans'] text-[12px] text-[#475569] block leading-tight">
                Dr. Layla&apos;s plan
              </span>
              <h3 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] leading-snug mt-0.5">
                Your BP medicine
              </h3>
              <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] mt-0.5">
                Due 8:00 pm
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const next = !medicineTaken;
              setMedicineTaken(next);
              if (next) onMedicineTaken?.();
            }}
            className={`w-full mt-3.5 min-h-[46px] h-11 rounded-full font-['Figtree'] font-bold text-[14.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.99] ${
              medicineTaken
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'bg-[#0B5F73] text-white hover:bg-[#084857] shadow-xs'
            }`}
          >
            {medicineTaken ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Marked as taken</span>
              </>
            ) : (
              <span>Mark as taken</span>
            )}
          </button>

          <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-2.5">
            Take only what Dr. Layla prescribed.
          </p>
        </div>

        {/* Urgent Link: Severe symptoms? Call 998 */}
          <div className="pt-0.5 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                onCall998();
              }}
              className="min-h-[44px] px-4 text-[14.5px] font-['Figtree'] font-bold text-[#B3261E] hover:underline cursor-pointer"
            >
              Severe symptoms? Call 998
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
