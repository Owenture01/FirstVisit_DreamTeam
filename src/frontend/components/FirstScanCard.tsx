import React from 'react';
import { Calendar } from 'lucide-react';

interface FirstScanCardProps {
  title?: string;
  dateTime?: string;
  onDetailsClick: () => void;
}

export const FirstScanCard: React.FC<FirstScanCardProps> = ({
  title = 'First scan',
  dateTime = 'Thu 21 Nov · 9:00',
  onDetailsClick,
}) => {
  return (
    <div className="w-full bg-white rounded-[20px] p-4 px-5 border border-slate-200/90 shadow-xs flex items-center justify-between my-2 text-left">
      <div>
        <span className="font-['Noto_Sans'] text-[12px] text-[#475569] font-medium block">
          {title}
        </span>
        <div className="font-['Figtree'] font-extrabold text-[16px] text-[#0F2733] mt-0.5">
          {dateTime}
        </div>
      </div>

      <button
        onClick={onDetailsClick}
        aria-label="View first scan appointment details"
        className="min-h-[44px] h-11 px-5 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[13px] hover:bg-[#cbe3ea] active:scale-95 transition-all flex items-center justify-center"
      >
        Details
      </button>
    </div>
  );
};
