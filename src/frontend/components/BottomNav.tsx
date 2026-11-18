import React from 'react';
import { Home, PlaySquare, Calendar, Users } from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

const SLIDE_TRANSFORM_CLASSES = [
  'translate-x-0',
  'translate-x-full',
  'translate-x-[200%]',
  'translate-x-[300%]',
  'translate-x-[400%]',
] as const;

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs: { id: ScreenTab; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'track', label: 'Track' },
    { id: 'journey', label: 'Journey' },
    { id: 'care', label: 'Care' },
    { id: 'family', label: 'Family' },
  ];

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === currentTab)
  );
  const slideTransformClass =
    SLIDE_TRANSFORM_CLASSES[activeIndex] ?? 'translate-x-0';

  const renderIcon = (tabId: ScreenTab, isActive: boolean) => {
    const colorClass = isActive ? 'text-[#0B5F73]' : 'text-[#475569]';
    switch (tabId) {
      case 'today':
        return <Home className={`w-5 h-5 ${colorClass}`} strokeWidth={1.85} />;
      case 'track':
        return (
          <svg
            viewBox="0 0 22 22"
            fill="none"
            className={`w-[22px] h-[22px] ${colorClass}`}
            aria-hidden="true"
          >
            <path
              d="M2.75 14.583L7.333 9.083L11 12.75L14.667 6.333L19.25 14.583"
              stroke="currentColor"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'journey':
        return <PlaySquare className={`w-5 h-5 ${colorClass}`} strokeWidth={1.85} />;
      case 'care':
        return <Calendar className={`w-5 h-5 ${colorClass}`} strokeWidth={1.85} />;
      case 'family':
        return <Users className={`w-5 h-5 ${colorClass}`} strokeWidth={1.85} />;
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="w-full h-[76px] bg-[#FBFDFE] border-t border-[#DCE5EA] shrink-0 z-20 relative overflow-hidden"
    >
      <div className="grid grid-cols-5 relative h-full w-full">
        {/* Smooth sliding active pill + soft blue fade backgrounding */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-1/5 flex flex-col items-center pt-[12px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${slideTransformClass}`}
        >
          {/* Soft feathered blue fade backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_28%,rgba(221,239,244,0.85)_0%,rgba(221,239,244,0.38)_52%,transparent_85%)]" />
          {/* Crisp active pill indicator matching SVG (52x30, rx=15) */}
          <div className="relative w-[52px] h-[30px] rounded-full bg-[#DDEFF4] shadow-[0_2px_10px_rgba(11,95,115,0.12)]" />
        </div>

        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-selected={isActive}
              className="relative z-10 min-h-[44px] h-full flex flex-col items-center justify-start pt-[12px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B5F73]"
            >
              <div
                className={`w-[52px] h-[30px] flex items-center justify-center transition-transform duration-300 ${
                  isActive ? 'scale-[1.03]' : 'scale-100'
                }`}
              >
                {renderIcon(tab.id, isActive)}
              </div>
              <span
                className={`mt-1 text-[12px] leading-[15px] transition-colors duration-200 ${
                  isActive
                    ? "font-['Figtree'] font-bold text-[#0B5F73]"
                    : "font-['Noto_Sans'] font-medium text-[#475569]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
