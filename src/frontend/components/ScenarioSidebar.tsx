import React from 'react';
import { 
  X, 
  Menu, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Clock, 
  AlertTriangle,
  PlaySquare,
  Shield,
  Layers,
  Smartphone,
  Calendar,
  RotateCcw,
  ChevronLeft
} from 'lucide-react';
import { AppScenario, ScreenTab } from '../types';
import { CareScreenMode } from '../utils/escalationScenarios';
import { OnboardingStep } from '../screens/OnboardingFlow';
import { BabyCompanionSticker } from './BabyCompanionSticker';
import { getBabySizeStage } from '../data/babySizeStickers';

interface ScenarioSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  // Active states
  currentTab: ScreenTab;
  scenario: AppScenario;
  careScreenMode?: CareScreenMode;
  isClinicPortalActive: boolean;
  isLockScreenOpen: boolean;
  lockScreenMode?: 'morning' | 'routine';
  isPhoneHomeOpen?: boolean;
  currentAuthScreen: OnboardingStep | 'authenticated';
  // Scenario actions
  onSelectAuthStep: (step: OnboardingStep) => void;
  onOpenLockScreen: () => void;
  onOpenRoutineLockScreen: () => void;
  onOpenPhoneHomeScreen: () => void;
  onOpenHanaView: (view: 'daily' | 'mental_health' | 'mood_question' | 'mood_result') => void;
  onSelectPatientTab: (tab: ScreenTab) => void;
  onSelectScenario: (scen: AppScenario) => void;
  onOpenHelp: () => void;
  onToggleClinicPortal: () => void;
  // Flag to care actions
  onOpenWhatToDo: () => void;
  onOpenWhyFlagged: () => void;
  onOpenBookVideo: () => void;
  onOpenCuffTimer: () => void;
  onOpenCuffResult: () => void;
  onOpenVisitDone: () => void;
  onOpenMissedCheck: () => void;
  onOpenEscalatedCuff: () => void;
  onOpenClinicianPhoneAlert: () => void;
  onOpenPostpartumWeek6: () => void;
  // Utilities
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onGuestSkip: () => void;
  // Progressive companion date simulation
  simulatedDate: string;
  dueDate: string;
  gestationalWeek: number;
  gestationalDay: number;
  daysRemaining: number;
  onSimulatedDateChange: (date: string) => void;
  onDueDateChange: (date: string) => void;
  onSelectWeek: (week: number) => void;
  onResetDateSimulation: () => void;
}

export const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({
  isOpen,
  onToggle,
  currentTab,
  scenario,
  careScreenMode = 'medicines',
  isClinicPortalActive,
  isLockScreenOpen,
  lockScreenMode = 'morning',
  isPhoneHomeOpen = false,
  currentAuthScreen,
  onSelectAuthStep,
  onOpenLockScreen,
  onOpenRoutineLockScreen,
  onOpenPhoneHomeScreen,
  onOpenHanaView,
  onSelectPatientTab,
  onSelectScenario,
  onOpenHelp,
  onToggleClinicPortal,
  onOpenWhatToDo,
  onOpenWhyFlagged,
  onOpenBookVideo,
  onOpenCuffTimer,
  onOpenCuffResult,
  onOpenVisitDone,
  onOpenMissedCheck,
  onOpenEscalatedCuff,
  onOpenClinicianPhoneAlert,
  onOpenPostpartumWeek6,
  isPlayingAudio,
  onToggleAudio,
  isDarkMode,
  onToggleDarkMode,
  onGuestSkip,
  simulatedDate,
  dueDate,
  gestationalWeek,
  gestationalDay,
  daysRemaining,
  onSimulatedDateChange,
  onDueDateChange,
  onSelectWeek,
  onResetDateSimulation,
}) => {
  const stage = getBabySizeStage(gestationalWeek);
  const clampedWeek = Math.max(4, Math.min(40, gestationalWeek));
  return (
    <>
      {/* Collapsed Trigger: discreet left-edge pull handle on mobile/tablet so it never blocks the Week/Day header, compact gutter pill on desktop (lg+) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          aria-label="Open Scenarios Sidebar"
          title="Scenarios & Date Simulator"
          className="fixed left-0 top-[58%] -translate-y-1/2 z-40 h-14 w-5 hover:w-6 rounded-r-xl bg-white/75 dark:bg-[#15252D]/75 text-[#0B5F73] dark:text-[#6CCBE0] border-y border-r border-slate-300/70 dark:border-slate-700/70 shadow-sm backdrop-blur-xs opacity-60 hover:opacity-100 active:scale-95 transition-all flex items-center justify-center before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-11 lg:top-4 lg:left-4 lg:translate-y-0 lg:h-auto lg:w-auto lg:hover:w-auto lg:px-3.5 lg:py-2 lg:rounded-full lg:border lg:opacity-90 lg:shadow-md lg:gap-2 lg:before:hidden"
        >
          <ChevronRight className="w-3.5 h-3.5 lg:hidden shrink-0" strokeWidth={2.5} />
          <Menu className="hidden lg:block w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-['Figtree'] font-bold text-[12px] whitespace-nowrap">
            Scenarios & Views
          </span>
        </button>
      )}

      {/* Dimmed backdrop on mobile when drawer is open */}
      {isOpen && (
        <div 
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Slide-out Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-[#15252D] border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B5F73] text-white flex items-center justify-center font-['Figtree'] font-black text-[13px] shadow-xs">
              FV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Figtree'] font-black text-[15px] text-[#0F2733] dark:text-white">
                  FirstVisit
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#DDEFF4] dark:bg-[#0B5F73] text-[#0B5F73] dark:text-[#6CCBE0] font-bold text-[9px]">
                  MERN
                </span>
              </div>
              <p className="font-['Noto_Sans'] text-[11px] text-[#475569] dark:text-[#A9B8C0]">
                Prototype Scenario Switcher
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            aria-label="Collapse Scenarios Sidebar"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Scenario Groups */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left text-xs">
          {/* Guest Mode Direct Access */}
          <div className="p-2.5 rounded-xl bg-[#DCFCE7] dark:bg-emerald-950/40 border border-[#15803D]/30 flex items-center justify-between">
            <div>
              <span className="font-['Figtree'] font-extrabold text-[12px] text-[#15803D] dark:text-emerald-300 block">
                Tester Guest Mode
              </span>
              <span className="font-['Noto_Sans'] text-[11px] text-[#15803D]/80 dark:text-emerald-400">
                Skip straight to home
              </span>
            </div>
            <button
              onClick={() => {
                onGuestSkip();
                if (window.innerWidth < 1024) onToggle();
              }}
              className="px-2.5 py-1 rounded-lg bg-[#15803D] text-white font-['Figtree'] font-bold text-[11px] hover:bg-[#126b33] transition-colors shadow-xs"
            >
              Skip →
            </button>
          </div>

          {/* Group 0: Progressive Baby Size Date Simulation */}
          <div className="p-3 rounded-2xl bg-[#F1F6F8] dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date & Growth Simulator</span>
              </span>
              <button
                type="button"
                onClick={onResetDateSimulation}
                title="Reset to default Week 31 Day 4"
                className="text-[10px] font-['Figtree'] font-bold text-[#0B5F73] dark:text-[#6CCBE0] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Live Companion Mini Preview */}
            <div className="p-2.5 rounded-xl bg-[#0B5F73] text-white flex items-center gap-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <BabyCompanionSticker week={stage.week} size="sm" animated progressiveScale />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-['Figtree'] font-extrabold text-[13px] leading-tight tabular-nums">
                  Week {gestationalWeek} · Day {gestationalDay}
                </div>
                <div className="font-['Noto_Sans'] text-[11px] text-[#DDEFF4] truncate mt-0.5">
                  {stage.name} ({stage.lengthCm})
                </div>
                <div className="font-['Noto_Sans'] text-[10px] text-white/75 tabular-nums">
                  {daysRemaining > 0
                    ? `${daysRemaining} days until due date`
                    : daysRemaining === 0
                    ? 'Due date today'
                    : `${Math.abs(daysRemaining)} days past due date`}
                </div>
              </div>
            </div>

            {/* Simulated Current Date Picker */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="sim-current-date"
                  className="block font-['Figtree'] font-bold text-[10px] text-[#475569] dark:text-[#A9B8C0] mb-1"
                >
                  Simulated date
                </label>
                <input
                  id="sim-current-date"
                  type="date"
                  value={simulatedDate}
                  onChange={(e) => {
                    if (e.target.value) onSimulatedDateChange(e.target.value);
                  }}
                  className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-semibold text-[11px] tabular-nums focus:outline-hidden focus:border-[#0B5F73]"
                />
              </div>

              <div>
                <label
                  htmlFor="sim-due-date"
                  className="block font-['Figtree'] font-bold text-[10px] text-[#475569] dark:text-[#A9B8C0] mb-1"
                >
                  Due date
                </label>
                <input
                  id="sim-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => {
                    if (e.target.value) onDueDateChange(e.target.value);
                  }}
                  className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-semibold text-[11px] tabular-nums focus:outline-hidden focus:border-[#0B5F73]"
                />
              </div>
            </div>

            {/* Week Scrubber Slider & Stepper */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="sim-week-slider"
                  className="font-['Figtree'] font-bold text-[10px] text-[#475569] dark:text-[#A9B8C0]"
                >
                  Jump by week (4–40)
                </label>
                <span className="font-['Figtree'] font-extrabold text-[11px] text-[#0B5F73] dark:text-[#6CCBE0] tabular-nums">
                  Wk {clampedWeek}
                </span>
              </div>
              <input
                id="sim-week-slider"
                type="range"
                min={4}
                max={40}
                value={clampedWeek}
                onChange={(e) => onSelectWeek(Number(e.target.value))}
                className="w-full accent-[#0B5F73] cursor-pointer"
              />
              <div className="flex items-center justify-between gap-1.5 mt-1.5">
                <button
                  type="button"
                  onClick={() => onSelectWeek(Math.max(4, clampedWeek - 1))}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-['Figtree'] font-bold text-[11px] text-[#0F2733] dark:text-white hover:bg-slate-50 flex items-center justify-center gap-0.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>-1 wk</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWeek(Math.min(40, clampedWeek + 1))}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-['Figtree'] font-bold text-[11px] text-[#0F2733] dark:text-white hover:bg-slate-50 flex items-center justify-center gap-0.5"
                >
                  <span>+1 wk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPatientTab('today');
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className="py-1.5 px-2.5 rounded-lg bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[11px] hover:bg-[#084958] transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Group 1: Onboarding & Login (Screens 01-07) */}
          <div>
            <div className="px-1 mb-1.5 flex items-center justify-between">
              <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0]">
                01-07 · Onboarding & Auth
              </span>
              {currentAuthScreen !== 'authenticated' && (
                <span className="w-2 h-2 rounded-full bg-[#0B5F73] animate-pulse" />
              )}
            </div>

            <div className="space-y-1">
              {[
                { id: 'splash', label: '01 · Splash' },
                { id: 'welcome', label: '02 · Welcome' },
                { id: 'signup', label: '03 · Sign up' },
                { id: 'verify', label: '04 · Verify code' },
                { id: 'setup', label: '05 · Choose setup' },
                { id: 'pair', label: '06 · Pair band' },
                { id: 'login', label: '07 · Log in' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectAuthStep(s.id as OnboardingStep);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                    currentAuthScreen === s.id
                      ? 'bg-[#0B5F73] text-white shadow-xs'
                      : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{s.label}</span>
                  {currentAuthScreen === s.id && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Core Patient App */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-slate-400 dark:text-slate-500 px-1 mb-1.5 block">
              Core Patient App
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenLockScreen();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  isLockScreenOpen && lockScreenMode === 'morning'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>08 · Lock Screen Check-in</span>
                <span className="text-[9px] opacity-75">2s popup</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('home_week31');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  !isLockScreenOpen && currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'today' && scenario === 'home_week31'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  <span>Home (Week 31)</span>
                </div>
                <span className="text-[9px] opacity-70">Day 4</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('track');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'track'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>11 · Track</span>
                <span className="text-[9px] opacity-70">Kicks & Band</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('journey');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'journey'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>31 · Baby Journey</span>
                <span className="text-[9px] opacity-70">AI Montage</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('care');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'care'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>12 · Care</span>
                <span className="text-[9px] opacity-70">Medicines</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('family');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'family'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>13 · Family</span>
                <span className="text-[9px] opacity-70">Ahmed husband</span>
              </button>

              <button
                onClick={() => {
                  onOpenHelp();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between bg-[#B3261E] text-white hover:bg-[#8F1D17] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>14 · Help</span>
                </div>
                <span className="text-[9px] text-white/80">Call 998</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('critical_alert');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && scenario === 'critical_alert'
                    ? 'bg-[#B3261E] text-white shadow-xs'
                    : 'text-[#B3261E] hover:bg-red-50 dark:hover:bg-red-950/30'
                }`}
              >
                <span>BP Alert (162/112)</span>
                <span className="text-[9px] opacity-80">Urgent</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('early_pregnancy');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && scenario === 'early_pregnancy'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Early Pregnancy</span>
                <span className="text-[9px] opacity-70">Week 9</span>
              </button>
            </div>
          </div>

          {/* Group 2B: Hana Companion (Screens 15-18) */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] px-1 mb-1.5 block">
              15-18 · Hana Companion
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenHanaView('daily');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                15 · Hana chat · daily
              </button>
              <button
                onClick={() => {
                  onOpenHanaView('mental_health');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                16 · Hana chat · mental health
              </button>
              <button
                onClick={() => {
                  onOpenHanaView('mood_question');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                17 · Mood check · question
              </button>
              <button
                onClick={() => {
                  onOpenHanaView('mood_result');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                18 · Mood check · result
              </button>
              <button
                onClick={() => {
                  onSelectScenario('home_week31');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>18a · Today · Hana cloud</span>
                <span className="text-[9px] opacity-70">3s loop</span>
              </button>
              <button
                onClick={() => {
                  onOpenRoutineLockScreen();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  isLockScreenOpen && lockScreenMode === 'routine'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>18b · Lock screen · toast</span>
                <span className="text-[9px] opacity-70">Routine</span>
              </button>
              <button
                onClick={() => {
                  onOpenPhoneHomeScreen();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  isPhoneHomeOpen
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>18c · Phone home · toast</span>
                <span className="text-[9px] opacity-70">App grid</span>
              </button>
            </div>
          </div>

          {/* Group 3: From Flag to Care Loop (Screens 19-25) */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] px-1 mb-1.5 block">
              19-25 · Flag to Care Loop
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenWhatToDo();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                19 · What to do now
              </button>

              <button
                onClick={() => {
                  onOpenWhyFlagged();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                20 · Why we flagged this
              </button>

              <button
                onClick={() => {
                  onOpenBookVideo();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                21 · Book a video check
              </button>

              <button
                onClick={() => {
                  onOpenCuffTimer();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                22 · Cuff rest timer (5:00)
              </button>

              <button
                onClick={() => {
                  onOpenCuffResult();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                23 · Cuff check: 144/94
              </button>

              <button
                onClick={() => {
                  onOpenVisitDone();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#15803D] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
              >
                24 · Visit done (5 dots)
              </button>

              <button
                onClick={() => {
                  onOpenMissedCheck();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#F2A541] hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
              >
                25 · Missed check (Reschedule)
              </button>

              <button
                onClick={() => {
                  onOpenEscalatedCuff();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#B3261E] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                26 · No reply · escalated
              </button>

              <button
                onClick={() => {
                  onOpenClinicianPhoneAlert();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#B3261E] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-between gap-1.5"
              >
                <span>26a · Clinician phone · urgent alert</span>
                <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#15803D] shrink-0">
                  New
                </span>
              </button>
            </div>
          </div>

          {/* Group 3B: Safety Net (Screens 27-28) */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] px-1 mb-1.5 block">
              27-28 · Safety Net
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectScenario('band_disconnected');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'today' && scenario === 'band_disconnected'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>27 · Band disconnected</span>
                <span className="text-[9px] opacity-70">Try this</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('offline');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'today' && scenario === 'offline'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>28 · Offline</span>
                <span className="text-[9px] opacity-70">Saved queue</span>
              </button>
            </div>
          </div>

          {/* Group 3C: Postpartum (Screens 29-30) */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] px-1 mb-1.5 block">
              29-30 · Postpartum
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectScenario('postpartum_day5');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'today' && scenario === 'postpartum_day5'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>29 · Postpartum day 5</span>
                <span className="text-[9px] opacity-70">After birth</span>
              </button>

              <button
                onClick={() => {
                  onOpenPostpartumWeek6();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'care' && careScreenMode === 'postpartum_week6'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>30 · Postpartum week 6 · handover</span>
                <span className="text-[9px] opacity-70">Day 42</span>
              </button>
            </div>
          </div>

          {/* Group 4: Doctor Station */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-slate-400 dark:text-slate-500 px-1 mb-1.5 block">
              Clinic App
            </span>

            <button
              onClick={() => {
                onToggleClinicPortal();
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full px-2.5 py-2 rounded-xl font-['Figtree'] font-bold text-[12px] flex items-center justify-between transition-colors border ${
                isClinicPortalActive
                  ? 'bg-[#0B5F73] text-white border-[#0B5F73] shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-[#0B5F73] dark:text-[#6CCBE0] border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>Dr. Noura Clinic View</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Utilities (Sound & Dark Mode) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-[#F1F6F8]/60 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl border transition-colors ${
                isPlayingAudio
                  ? 'bg-[#0B5F73] text-white border-[#0B5F73]'
                  : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-[#A9B8C0] border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle authentic 138 bpm fetal Doppler audio"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-[#F2A541] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-[#475569] dark:text-[#A9B8C0] border border-slate-200 dark:border-slate-700 hover:text-[#0F2733] dark:hover:text-white transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F2A541]" /> : <Moon className="w-4 h-4 text-[#0B5F73]" />}
            </button>
          </div>

          <span className="font-['Figtree'] font-extrabold text-[11px] text-slate-400">
            FirstVisit v1.4
          </span>
        </div>
      </aside>
    </>
  );
};
