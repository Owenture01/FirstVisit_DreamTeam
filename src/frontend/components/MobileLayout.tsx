import React, { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  bottomNav?: ReactNode;
  overlay?: ReactNode;
  isDark?: boolean;
  isCritical?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  bottomNav,
  overlay,
  isDark = false,
  isCritical = false,
}) => {
  return (
    <div className="w-full flex justify-center items-start min-h-screen sm:py-2">
      {/* Mobile Web Application Layout (edge-to-edge on phones, centered on wider viewports) */}
      <div 
        className={`w-full max-w-[430px] h-dvh sm:h-[844px] sm:max-h-[920px] flex flex-col relative overflow-hidden transition-colors sm:rounded-[24px] sm:shadow-lg sm:border border-slate-200/90 dark:border-slate-800 ${
          isCritical
            ? 'animate-emergency-bg text-[#0F2733] dark:text-[#F1F6F8] border-[#B3261E]/40'
            : isDark 
            ? 'bg-[#0E1A20] text-[#F1F6F8]' 
            : 'bg-[#F1F6F8] text-[#0F2733]'
        }`}
      >
        {/* Main scrollable mobile page */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 flex flex-col">
          {children}
        </div>

        {/* Docked bottom navigation bar */}
        {bottomNav && (
          <div className="sticky bottom-0 z-30 shrink-0 border-t border-slate-200/80 dark:border-slate-800">
            {bottomNav}
          </div>
        )}

        {/* Full-bleed lock screen or overlay */}
        {overlay}
      </div>
    </div>
  );
};
