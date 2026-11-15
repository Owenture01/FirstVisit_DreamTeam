import React from 'react';
import { Home, Activity, PlaySquare, Calendar, Users } from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'today' as ScreenTab, label: 'Today', icon: Home },
    { id: 'track' as ScreenTab, label: 'Track', icon: Activity },
    { id: 'journey' as ScreenTab, label: 'Journey', icon: PlaySquare },
    { id: 'care' as ScreenTab, label: 'Care', icon: Calendar },
    { id: 'family' as ScreenTab, label: 'Family', icon: Users },
  ];

  return (
    <nav 
      aria-label="Main navigation" 
      className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shrink-0 z-20"
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            aria-selected={isActive}
            className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isActive 
                ? 'text-[#0B5F73]' 
                : 'text-[#475569] hover:text-[#0F2733]'
            }`}
          >
            <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-110' : ''}`}>
              <IconComponent 
                className={`w-5 h-5 ${isActive ? 'stroke-[#0B5F73]' : 'stroke-[#475569]'}`} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
            </div>
            <span className={`font-['Noto_Sans'] text-[11px] leading-tight mt-0.5 ${
              isActive ? 'font-bold text-[#0B5F73]' : 'font-medium text-[#475569]'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
