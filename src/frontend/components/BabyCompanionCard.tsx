import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { BabyCompanionSticker } from './BabyCompanionSticker';
import { getBabySizeStage } from '../data/babySizeStickers';
import { formatFriendlyDate } from '../utils/gestationalAge';

interface BabyCompanionCardProps {
  gestationalWeek: number;
  gestationalDay: number;
  daysRemaining: number;
  dueDate: string;
  isEarly?: boolean;
  onActionClick?: () => void;
}

export const BabyCompanionCard: React.FC<BabyCompanionCardProps> = ({
  gestationalWeek,
  gestationalDay,
  daysRemaining,
  dueDate,
  isEarly = false,
  onActionClick,
}) => {
  const stage = getBabySizeStage(gestationalWeek);

  const visitLabel =
    isEarly || gestationalWeek < 16
      ? 'First visit · Thu 21 Nov, 9:00'
      : daysRemaining > 0
      ? `Due ${formatFriendlyDate(dueDate)} · ${daysRemaining} days to go`
      : daysRemaining === 0
      ? `Due today · ${formatFriendlyDate(dueDate)}`
      : `Full term · ${formatFriendlyDate(dueDate)}`;

  return (
    <section
      aria-label="Weekly baby growth companion"
      className="w-full bg-[#0B5F73] text-white rounded-[20px] p-5 shadow-sm relative overflow-hidden text-left"
    >
      {/* Main row: Week & produce description + circular animated companion badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-['Figtree'] font-[800] text-[30px] leading-tight tracking-tight text-white">
            Week {gestationalWeek}
          </h2>
          <p className="font-['Noto_Sans'] text-[15px] text-white/90 leading-snug mt-1 max-w-[205px]">
            Baby is about the size of {stage.articleName}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[12px] font-['Noto_Sans'] text-[#DDEFF4]/85 tabular-nums">
            <span>Day {gestationalDay}</span>
            <span aria-hidden="true">·</span>
            <span>~{stage.lengthCm}</span>
            <span aria-hidden="true">·</span>
            <span>Trimester {stage.trimester}</span>
          </div>
        </div>

        {/* Translucent circular companion badge */}
        <div className="w-[92px] h-[92px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
          <BabyCompanionSticker
            week={stage.week}
            size="lg"
            animated
            progressiveScale
            interactive
          />
        </div>
      </div>

      {/* Bottom visit / milestone bar matching image_608ad448.png */}
      <button
        type="button"
        onClick={onActionClick}
        className="w-full min-h-[44px] mt-4 px-4 py-2.5 rounded-[14px] bg-white/15 hover:bg-white/22 active:scale-[0.99] transition-all flex items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Calendar className="w-4 h-4 text-white/90 shrink-0" strokeWidth={2} />
          <span className="font-['Figtree'] font-bold text-[13.5px] text-white truncate">
            {visitLabel}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-white/80 shrink-0" strokeWidth={2.2} />
      </button>
    </section>
  );
};
