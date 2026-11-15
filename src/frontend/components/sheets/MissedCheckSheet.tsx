import React, { useState } from 'react';
import { Clock, Users, X, Check } from 'lucide-react';

interface MissedCheckSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onRebooked?: (newTime: string) => void;
  onAskAhmed?: () => void;
}

export const MissedCheckSheet: React.FC<MissedCheckSheetProps> = ({
  isOpen,
  onClose,
  onRebooked,
  onAskAhmed,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('Today 16:00');

  if (!isOpen) return null;

  const slots = ['Today 16:00', 'Fri 9:30', 'Fri 13:00'];

  const handleBook = () => {
    if (onRebooked) onRebooked(selectedSlot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl border border-slate-200 p-5 text-left flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

        {/* Top Header: Missed badge + Close */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-['Figtree'] font-bold text-[12px]">
            <Clock className="w-3.5 h-3.5" />
            <span>Missed 9:30 today</span>
          </div>

          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#475569]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733] leading-tight">
          Let's find a new time
        </h2>
        <p className="font-['Noto_Sans'] text-[13px] text-[#475569] mt-0.5 mb-4">
          Your video check with Dr. Layla
        </p>

        {/* Reschedule chips */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 px-2 rounded-xl text-xs font-['Figtree'] font-bold text-center transition-all ${
                  isSelected
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-slate-200'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        {/* Support card: Need a ride or childcare? */}
        <div className="p-3.5 rounded-[18px] bg-[#F1F6F8] border border-slate-200/80 flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-['Figtree'] font-bold text-[14px] text-[#0F2733] leading-tight">
                Need a ride or childcare?
              </h4>
              <p className="font-['Noto_Sans'] text-[11px] text-[#475569] mt-0.5">
                Ask Ahmed, results stay private
              </p>
            </div>
          </div>

          <button
            onClick={onAskAhmed}
            className="min-h-[36px] h-9 px-4 rounded-full bg-white border border-slate-200 text-[#0B5F73] font-['Figtree'] font-bold text-xs hover:bg-[#DDEFF4] transition-colors"
          >
            Ask
          </button>
        </div>

        {/* Warning notification */}
        <div className="text-center text-xs text-[#475569] mb-4">
          <span>Not rebooked by 12:00? Noura will call you.</span>
        </div>

        {/* Action Button: Book [Selected Slot] */}
        <button
          onClick={handleBook}
          className="w-full min-h-[46px] h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center hover:bg-[#084857] active:scale-98 transition-all shadow-xs"
        >
          Book {selectedSlot}
        </button>
      </div>
    </div>
  );
};
