import React from 'react';
import { Phone } from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';

interface HeaderProps {
  gestationalWeek: number;
  gestationalDay: number;
  titleOverride?: string;
  subtitleOverride?: string;
  motherInitials?: string;
  onOpenHelp: () => void;
  onOpenHana: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gestationalWeek,
  gestationalDay,
  titleOverride,
  subtitleOverride,
  motherInitials = 'M',
  onOpenHelp,
  onOpenHana,
  onOpenProfile,
}) => {
  return (
    <header className="w-full flex items-center justify-between gap-2 pt-2 pb-3 px-0.5">
      {/* Left: Mother Avatar & Week info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenProfile}
          aria-label="Mother profile"
          className="w-11 h-11 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-extrabold text-lg flex items-center justify-center shrink-0 border-2 border-white shadow-xs hover:bg-[#cde7ee] active:scale-95 transition-all"
        >
          {motherInitials}
        </button>

        <div className="flex flex-col text-left min-w-0">
          <span className="font-['Figtree'] font-bold text-[16px] sm:text-[17px] text-[#0F2733] leading-tight whitespace-nowrap truncate">
            {titleOverride ?? `Week ${gestationalWeek}`}
          </span>
          <span className="font-['Noto_Sans'] text-[13px] text-[#475569] leading-tight whitespace-nowrap truncate">
            {subtitleOverride ?? `Day ${gestationalDay}`}
          </span>
        </div>
      </div>

      {/* Right: Hana Companion Mascot button & Red Urgent Help button */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Hana Avatar trigger button */}
        <button
          onClick={onOpenHana}
          aria-label="Ask Hana AI helper"
          className="w-11 h-11 rounded-full p-0.5 bg-white border border-slate-200/80 shadow-xs flex items-center justify-center hover:bg-[#F1F6F8] active:scale-95 transition-all"
        >
          <HanaAvatar size="sm" animated />
        </button>

        {/* Urgent Help Button (min-h 44px, red pill) */}
        <button
          onClick={onOpenHelp}
          aria-label="Emergency help and clinical triage"
          className="h-11 px-4 rounded-full bg-[#B3261E] text-white font-['Figtree'] font-bold text-sm flex items-center gap-1.5 shadow-sm hover:bg-[#9a1f18] active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 fill-white" strokeWidth={2} />
          <span>Help</span>
        </button>
      </div>
    </header>
  );
};
