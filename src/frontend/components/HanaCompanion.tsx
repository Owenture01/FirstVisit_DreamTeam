import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';
import {
  getNextPromptIndex,
  getProactivePromptsForWeek,
} from '../utils/hanaProactivePrompts';

interface HanaCompanionProps {
  gestationalWeek?: number;
  onOpenChat: () => void;
  onMarkDoseTaken?: (doseId: string) => void;
  onLater?: () => void;
}

export const HanaCompanion: React.FC<HanaCompanionProps> = ({
  gestationalWeek = 31,
  onOpenChat,
  onMarkDoseTaken,
  onLater = () => {},
}) => {
  const prompts = getProactivePromptsForWeek(gestationalWeek);
  const [promptIndex, setPromptIndex] = useState(0);
  const [popCycle, setPopCycle] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const safeIndex = promptIndex % prompts.length;
  const activePrompt = prompts[safeIndex];

  useEffect(() => {
    setPromptIndex(0);
    setPopCycle((c) => c + 1);
  }, [gestationalWeek]);

  useEffect(() => {
    if (dismissed || isPaused || confirmation) return;

    const timer = window.setInterval(() => {
      setPromptIndex((prev) => getNextPromptIndex(prev, prompts.length));
      setPopCycle((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [dismissed, isPaused, confirmation, prompts.length]);

  const handlePrimaryClick = () => {
    if (activePrompt.category === 'sleep') {
      onOpenChat();
      return;
    }

    if (activePrompt.linkedDoseId && onMarkDoseTaken) {
      onMarkDoseTaken(activePrompt.linkedDoseId);
    }

    setConfirmation(activePrompt.confirmationText);
    window.setTimeout(() => {
      setConfirmation(null);
      setPromptIndex((prev) => getNextPromptIndex(prev, prompts.length));
      setPopCycle((prev) => prev + 1);
    }, 1400);
  };

  const handleSecondaryClick = () => {
    setDismissed(true);
    onLater();
  };

  if (dismissed) {
    return (
      <div className="sticky bottom-1 z-20 mt-auto flex justify-end pointer-events-none pt-1">
        <button
          type="button"
          onClick={() => {
            setDismissed(false);
            setPopCycle((c) => c + 1);
          }}
          aria-label="Show Hana proactive check-in"
          title="Tap to see Hana check-in"
          className="pointer-events-auto cursor-pointer flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xs border border-[#DCE5EA] pl-3 pr-1.5 py-1 shadow-[0_8px_24px_rgba(11,95,115,0.14)] hover:scale-105 active:scale-95 transition-transform"
        >
          <span className="font-['Figtree'] font-bold text-[12px] text-[#0B5F73]">
            Ask Hana
          </span>
          <HanaAvatar size="sm" animated />
        </button>
      </div>
    );
  }

  return (
    <div
      className="sticky bottom-1 z-20 mt-auto flex items-end justify-end gap-2 pointer-events-none pt-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Popping Speech Cloud Card */}
      <div
        key={`${activePrompt.id}-${popCycle}`}
        data-testid="hana-proactive-cloud"
        role="status"
        aria-live="polite"
        className="pointer-events-auto w-[238px] max-w-[74%] bg-white/98 backdrop-blur-sm rounded-[20px] rounded-br-[4px] p-3.5 border border-[#DCE5EA] shadow-[0_14px_34px_rgba(11,95,115,0.18)] text-left animate-hana-cloud-pop relative"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-['Noto_Sans'] text-[11.5px] font-semibold text-[#475569]">
            {activePrompt.headerLabel}
          </span>
          <span className="font-['Noto_Sans'] text-[10.5px] text-[#64748B] tabular-nums">
            {safeIndex + 1}/{prompts.length}
          </span>
        </div>

        {confirmation ? (
          <div className="mt-2 py-2 px-3 rounded-[14px] bg-[#DCFCE7] text-[#15803D] font-['Figtree'] font-bold text-[13px] flex items-center gap-1.5">
            <Check className="w-4 h-4 stroke-[2.6] shrink-0" />
            <span>{confirmation}</span>
          </div>
        ) : (
          <>
            <p className="font-['Figtree'] text-[14.5px] font-bold text-[#0F2733] mt-1 leading-snug">
              {activePrompt.question}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-2.5">
              <button
                type="button"
                onClick={handlePrimaryClick}
                aria-label={activePrompt.primaryAction}
                className="min-h-[38px] h-9 px-3.5 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[12.5px] hover:bg-[#084857] active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              >
                {activePrompt.primaryAction}
              </button>

              <button
                type="button"
                onClick={handleSecondaryClick}
                aria-label={activePrompt.secondaryAction}
                className="min-h-[38px] h-9 px-3 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[12.5px] hover:bg-[#cbe3ea] active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                {activePrompt.secondaryAction}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hana Mascot Character Illustration */}
      <button
        type="button"
        onClick={onOpenChat}
        aria-label="Tap to chat with Hana"
        title="Tap to chat with Hana"
        className="pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0 focus:outline-none drop-shadow-md"
      >
        <HanaAvatar size="md" animated />
      </button>
    </div>
  );
};
