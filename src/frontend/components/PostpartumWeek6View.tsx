import React, { useState } from 'react';
import { Calendar, Check, Download, User } from 'lucide-react';
import {
  POSTPARTUM_HANDOVER_ITEMS,
  buildPostpartumSummaryText,
} from '../utils/postpartumScenarios';

export const PostpartumWeek6View: React.FC = () => {
  const [summarySaved, setSummarySaved] = useState(false);

  const handleSaveSummary = () => {
    const content = buildPostpartumSummaryText();
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mariam-6-week-postpartum-summary.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      // Fallback gracefully in restricted environments
    }
    setSummarySaved(true);
  };

  return (
    <div
      data-testid="postpartum-week6-view"
      className="w-full flex flex-col space-y-3.5 text-left"
    >
      {/* Page Heading */}
      <div className="px-1 pt-0.5">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Week 6 after birth
        </h1>
      </div>

      {/* Completion Hero Card */}
      <section
        aria-label="6-week postpartum plan completed"
        className="w-full bg-[#FBFDFE] rounded-[20px] px-5 py-6 border border-[#DCE5EA] shadow-2xs text-center"
      >
        <div className="w-[84px] h-[84px] rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <h2 className="mt-4 font-['Figtree'] font-extrabold text-[21px] text-[#0F2733] leading-tight">
          Your 6-week plan is done
        </h2>

        <div className="mt-2.5 flex items-center justify-center gap-6">
          <span className="font-['Noto_Sans'] text-[14px] text-[#475569]">
            Upper-arm cuff reading:
          </span>
          <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] tabular-nums">
            124/80
          </span>
        </div>
      </section>

      {/* Handed Over Card */}
      <section
        aria-label="Postpartum handover details"
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
      >
        <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733]">
          Handed over
        </h2>

        <div className="mt-3.5 space-y-4">
          {POSTPARTUM_HANDOVER_ITEMS.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#DDEFF4] text-[#0B5F73] flex items-center justify-center shrink-0">
                {item.id === 'doctor' ? (
                  <User className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Calendar className="w-5 h-5" strokeWidth={2} />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                  {item.title}
                </h3>
                <p className="font-['Noto_Sans'] text-[13px] text-[#475569] leading-snug mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save My Summary Button */}
      <button
        type="button"
        onClick={handleSaveSummary}
        className={`w-full h-[52px] rounded-full border font-['Figtree'] font-bold text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
          summarySaved
            ? 'bg-[#DCFCE7] border-[#15803D]/30 text-[#15803D]'
            : 'bg-[#FBFDFE] hover:bg-[#F1F6F8] border-[#C3D0D8] text-[#0F2733]'
        }`}
      >
        {summarySaved ? (
          <>
            <Check className="w-4.5 h-4.5 stroke-[2.8]" />
            <span>Summary saved</span>
          </>
        ) : (
          <>
            <Download className="w-4.5 h-4.5" strokeWidth={2.2} />
            <span>Save my summary</span>
          </>
        )}
      </button>

      {/* Return band footnote */}
      <p className="px-1 font-['Noto_Sans'] text-[13px] text-[#475569] leading-snug">
        Your band can go back to the clinic. Thank you, Mariam.
      </p>
    </div>
  );
};
