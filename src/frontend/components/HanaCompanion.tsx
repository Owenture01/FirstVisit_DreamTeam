import React, { useState } from 'react';
import { HanaAvatar } from './HanaAvatar';

interface HanaCompanionProps {
  title?: string;
  message?: string;
  primaryAction?: string;
  secondaryAction?: string;
  onYesPlease: () => void;
  onLater: () => void;
}

export const HanaCompanion: React.FC<HanaCompanionProps> = ({
  title = 'Hana · AI helper',
  message = 'Only 5 h of sleep. Want a tip?',
  primaryAction = 'Yes please',
  secondaryAction = 'Later',
  onYesPlease,
  onLater,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="w-full py-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="text-xs text-[#0B5F73] font-medium flex items-center gap-1.5 hover:underline min-h-[44px] px-2"
        >
          <HanaAvatar size="sm" animated />
          <span>Hana is standing by. Tap for tips.</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex items-end justify-between gap-2.5 my-3">
      {/* Speech Bubble Card */}
      <div className="flex-1 bg-white rounded-[20px] rounded-br-[4px] p-4 border border-slate-200/90 shadow-sm text-left relative transition-all">
        <span className="font-['Noto_Sans'] text-[12px] font-semibold text-[#475569] block">
          {title}
        </span>
        <p className="font-['Figtree'] text-[15px] font-bold text-[#0F2733] mt-1 leading-snug">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={onYesPlease}
            aria-label={primaryAction}
            className="min-h-[44px] h-11 px-4 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[13px] hover:bg-[#084857] active:scale-95 transition-all shadow-xs"
          >
            {primaryAction}
          </button>

          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              onLater();
            }}
            aria-label={secondaryAction}
            className="min-h-[44px] h-11 px-4 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[13px] hover:bg-[#cbe3ea] active:scale-95 transition-all"
          >
            {secondaryAction}
          </button>
        </div>
      </div>

      {/* Hana Mascot Character Illustration */}
      <button
        type="button"
        onClick={onYesPlease}
        aria-label="Tap to chat with Hana"
        title="Tap to chat with Hana"
        className="cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0 focus:outline-none"
      >
        <HanaAvatar size="md" animated />
      </button>
    </div>
  );
};
