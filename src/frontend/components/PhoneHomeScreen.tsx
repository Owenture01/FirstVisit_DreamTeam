import React, { useEffect, useState } from 'react';
import { Check, Heart, Wifi, Battery } from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';
import {
  getNextPromptIndex,
  getProactivePromptsForWeek,
} from '../utils/hanaProactivePrompts';

interface PhoneHomeScreenProps {
  isOpen: boolean;
  triggerKey: number;
  gestationalWeek?: number;
  onLaunchFirstVisit: () => void;
  onMarkDoseTaken?: (doseId: string) => void;
}

const APP_GRID_SLOTS = Array.from({ length: 16 }, (_, idx) => idx);
const FIRSTVISIT_SLOT_INDEX = 5;

export const PhoneHomeScreen: React.FC<PhoneHomeScreenProps> = ({
  isOpen,
  triggerKey,
  gestationalWeek = 31,
  onLaunchFirstVisit,
  onMarkDoseTaken,
}) => {
  const prompts = getProactivePromptsForWeek(gestationalWeek);
  const [promptIndex, setPromptIndex] = useState(0);
  const [toastCycle, setToastCycle] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setPromptIndex(0);
    setToastCycle((c) => c + 1);
    setToastVisible(true);
    setConfirmation(null);
  }, [isOpen, triggerKey]);

  useEffect(() => {
    if (!isOpen || !toastVisible || isPaused || confirmation) return;

    const timer = window.setInterval(() => {
      setPromptIndex((prev) => getNextPromptIndex(prev, prompts.length));
      setToastCycle((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isOpen, toastVisible, isPaused, confirmation, prompts.length]);

  if (!isOpen) return null;

  const activePrompt = prompts[promptIndex % prompts.length];

  const handlePrimaryToastAction = () => {
    if (activePrompt.linkedDoseId && onMarkDoseTaken) {
      onMarkDoseTaken(activePrompt.linkedDoseId);
    }
    setConfirmation(activePrompt.confirmationText);
    window.setTimeout(() => {
      setConfirmation(null);
      setPromptIndex((prev) => getNextPromptIndex(prev, prompts.length));
      setToastCycle((prev) => prev + 1);
    }, 1500);
  };

  const handleDismissToast = () => {
    setToastVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulated phone home screen"
      className="absolute inset-0 z-[35] flex flex-col justify-between px-4 pt-3 pb-3 select-none bg-gradient-to-b from-[#8CA1AB] via-[#98ACB6] to-[#A4B7C1] text-[#0F2733]"
    >
      {/* Top iOS Status Bar & Floating Hana Toast */}
      <div>
        <div className="flex items-center justify-between px-2 pb-2 text-white text-[12px] font-['Figtree'] font-bold">
          <span className="tabular-nums">20:00</span>
          <div className="flex items-center gap-1.5 opacity-95">
            <Wifi className="w-3.5 h-3.5" strokeWidth={2.2} />
            <Battery className="w-4 h-4" strokeWidth={2.2} />
          </div>
        </div>

        {/* Floating iOS Notification Banner Toast */}
        <div
          className="min-h-[146px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {toastVisible ? (
            <div
              key={`${activePrompt.id}-${toastCycle}`}
              data-testid="phone-home-toast"
              className="w-full rounded-[22px] bg-white/95 backdrop-blur-md p-3.5 shadow-[0_14px_34px_rgba(15,39,51,0.22)] animate-toast-banner-pop text-left"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#DDEFF4]/80 border border-[#DCE5EA] flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
                  <HanaAvatar size="sm" animated />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-['Figtree'] font-bold text-[11px] tracking-wide uppercase text-[#475569]">
                      HANA · FIRSTVISIT
                    </span>
                    <span className="font-['Noto_Sans'] text-[11px] text-[#64748B]">
                      now
                    </span>
                  </div>

                  {confirmation ? (
                    <div className="mt-1.5 py-1.5 px-2.5 rounded-[12px] bg-[#DCFCE7] text-[#15803D] font-['Figtree'] font-bold text-[13px] flex items-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[2.6] shrink-0" />
                      <span>{confirmation}</span>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug mt-0.5">
                        {activePrompt.toastTitle}
                      </h2>
                      <p className="font-['Noto_Sans'] text-[12.5px] text-[#334155] leading-snug">
                        {activePrompt.toastSubtitle}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!confirmation && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handlePrimaryToastAction}
                    className="min-h-[40px] h-10 rounded-full bg-[#0B5F73] hover:bg-[#084857] text-white font-['Figtree'] font-bold text-[13px] active:scale-95 transition-all cursor-pointer"
                  >
                    {activePrompt.primaryAction}
                  </button>
                  <button
                    type="button"
                    onClick={handleDismissToast}
                    className="min-h-[40px] h-10 rounded-full bg-white hover:bg-[#F1F6F8] border border-[#DCE5EA] text-[#0F2733] font-['Figtree'] font-bold text-[13px] active:scale-95 transition-all cursor-pointer"
                  >
                    {activePrompt.secondaryAction}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setPromptIndex((prev) =>
                    getNextPromptIndex(prev, prompts.length)
                  );
                  setToastCycle((prev) => prev + 1);
                  setToastVisible(true);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/30 hover:bg-white/45 text-white font-['Figtree'] font-semibold text-[12px] backdrop-blur-xs transition-colors cursor-pointer"
              >
                Show Hana notification toast
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulated 4x4 App Icon Grid (FirstVisit is the ONLY clickable app) */}
      <div className="px-2 my-auto py-3">
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
          {APP_GRID_SLOTS.map((slot) => {
            if (slot === FIRSTVISIT_SLOT_INDEX) {
              return (
                <div key={slot} className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onLaunchFirstVisit}
                    aria-label="Open FirstVisit app"
                    className="w-[58px] h-[58px] rounded-[16px] bg-[#0B5F73] text-white shadow-[0_10px_22px_rgba(11,95,115,0.38)] ring-2 ring-white/65 hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center cursor-pointer relative"
                  >
                    <Heart className="w-6 h-6 text-white fill-white" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B3261E] text-white font-['Figtree'] font-bold text-[10px] flex items-center justify-center shadow-xs">
                      1
                    </span>
                  </button>
                  <span className="font-['Figtree'] font-bold text-[11px] text-white drop-shadow-xs">
                    FirstVisit
                  </span>
                </div>
              );
            }

            return (
              <div
                key={slot}
                aria-hidden="true"
                className="flex flex-col items-center gap-1.5 pointer-events-none select-none"
              >
                <div className="w-[58px] h-[58px] rounded-[16px] bg-[#E2EAEE]/45 border border-white/20" />
                <div className="w-8 h-2 rounded-full bg-white/20" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dock + Caption */}
      <div className="flex flex-col items-center gap-3 pb-1">
        <div
          aria-hidden="true"
          className="w-full rounded-[24px] bg-white/20 backdrop-blur-md px-3.5 py-2.5 grid grid-cols-4 gap-4 pointer-events-none"
        >
          {[0, 1, 2, 3].map((dockIdx) => (
            <div
              key={dockIdx}
              className="w-full aspect-square max-w-[54px] mx-auto rounded-[15px] bg-[#E2EAEE]/45"
            />
          ))}
        </div>

        <p className="font-['Noto_Sans'] text-[12px] text-white/90 text-center">
          Pops up over any app. She answers without leaving it.
        </p>

        <span className="w-[124px] h-[4.5px] rounded-full bg-white/75 block" />
      </div>
    </div>
  );
};
