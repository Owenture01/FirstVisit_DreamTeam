import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface BookVideoCheckSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed?: (bookingSummary: string) => void;
}

export const BookVideoCheckSheet: React.FC<BookVideoCheckSheetProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Wed 13' | 'Thu 14' | 'Fri 15'>('Thu 14');
  const [selectedSlot, setSelectedSlot] = useState<string>('9:30');
  const [askAhmed, setAskAhmed] = useState(false);

  if (!isOpen) return null;

  const days: Array<'Wed 13' | 'Thu 14' | 'Fri 15'> = ['Wed 13', 'Thu 14', 'Fri 15'];
  const slots = ['9:30', '13:00', '16:00'];

  const handleDone = () => {
    if (onBookingConfirmed) {
      onBookingConfirmed(`Booked ${selectedDay}, ${selectedSlot}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-5 text-left flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header with Title & Doctor note */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733] leading-tight">
              Video check
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5">
              With Dr. Layla, by Friday
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Day selection chips */}
        <div className="flex items-center gap-2 mb-3">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-['Figtree'] font-bold transition-all ${
                selectedDay === day
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Time slot chips */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 rounded-full text-xs font-['Figtree'] font-bold flex items-center justify-center gap-1.5 transition-all ${
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

        {/* Booked Confirmation banner */}
        <div className="w-full p-3 rounded-[16px] bg-[#DDEFF4] text-[#0B5F73] flex items-center gap-2 font-['Figtree'] font-bold text-[13px] mb-4">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Booked {selectedDay}, {selectedSlot}</span>
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
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
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

        {/* Done action button */}
        <button
          onClick={handleDone}
          className="w-full min-h-[46px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-98 transition-all shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
};
