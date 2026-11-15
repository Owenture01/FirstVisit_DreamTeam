/**
 * FirstVisit - Mother & Child Health Tracker (MERN Mobile Web Architecture)
 * Complete implementation following design tokens (image_beffec35.png) and layouts (image_1d641382.png)
 */

import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Stethoscope, 
  Volume2, 
  VolumeX, 
  Heart,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MobileLayout } from './frontend/components/MobileLayout';
import { BottomNav } from './frontend/components/BottomNav';
import { HomeScreen } from './frontend/screens/HomeScreen';
import { TrackScreen } from './frontend/screens/TrackScreen';
import { JourneyScreen } from './frontend/screens/JourneyScreen';
import { CareScreen } from './frontend/screens/CareScreen';
import { FamilyScreen } from './frontend/screens/FamilyScreen';
import { EmergencyModal } from './frontend/components/EmergencyModal';
import { HardwareSheet } from './frontend/components/HardwareSheet';
import { HanaChatSheet } from './frontend/components/HanaChatSheet';
import { WhatToDoSheet } from './frontend/components/sheets/WhatToDoSheet';
import { WhyWeFlaggedSheet } from './frontend/components/sheets/WhyWeFlaggedSheet';
import { BookVideoCheckSheet } from './frontend/components/sheets/BookVideoCheckSheet';
import { CuffRestTimerSheet } from './frontend/components/sheets/CuffRestTimerSheet';
import { CuffResultSheet } from './frontend/components/sheets/CuffResultSheet';
import { MissedCheckSheet } from './frontend/components/sheets/MissedCheckSheet';
import { ClinicPortalView } from './clinic_app/ClinicPortalView';
import { ScenarioSidebar } from './frontend/components/ScenarioSidebar';
import { OnboardingFlow, OnboardingStep } from './frontend/screens/OnboardingFlow';
import { ScreenTab, AppScenario } from './frontend/types';
import { fetalAudio } from './frontend/utils/fetalSound';

export default function App() {
  // Navigation & Scenario States
  const [currentTab, setCurrentTab] = useState<ScreenTab>('today');
  const [scenario, setScenario] = useState<AppScenario>('home_week31');
  const [isClinicPortalActive, setIsClinicPortalActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMidwifeChecking, setIsMidwifeChecking] = useState(false);
  const [isVideoBooked, setIsVideoBooked] = useState(false);
  const [isCareVisitDone, setIsCareVisitDone] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState<OnboardingStep | 'authenticated'>('authenticated');

  // Modal Sheet States
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showHardwareSheet, setShowHardwareSheet] = useState(false);
  const [showHanaChat, setShowHanaChat] = useState(false);
  const [showWhatToDoSheet, setShowWhatToDoSheet] = useState(false);
  const [showWhyWeFlaggedSheet, setShowWhyWeFlaggedSheet] = useState(false);
  const [showBookVideoSheet, setShowBookVideoSheet] = useState(false);
  const [showCuffTimerSheet, setShowCuffTimerSheet] = useState(false);
  const [showCuffResultSheet, setShowCuffResultSheet] = useState(false);
  const [showMissedCheckSheet, setShowMissedCheckSheet] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    fetalAudio.toggle(138, (playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handleScenarioChange = (newScenario: AppScenario) => {
    setScenario(newScenario);
    setIsClinicPortalActive(false);
    setIsCareVisitDone(false);
    if (newScenario === 'critical_alert') {
      setCurrentTab('today');
    }
  };

  const closeAllSheets = () => {
    setShowWhatToDoSheet(false);
    setShowWhyWeFlaggedSheet(false);
    setShowBookVideoSheet(false);
    setShowCuffTimerSheet(false);
    setShowCuffResultSheet(false);
    setShowMissedCheckSheet(false);
    setShowEmergencyModal(false);
  };

  return (
    <div className={`min-h-screen w-full transition-colors ${
      isDarkMode ? 'dark bg-[#0E1A20] text-[#F1F6F8]' : 'bg-[#EBF1F4] text-[#0F2733]'
    } flex flex-col items-center justify-start p-1 sm:p-4 selection:bg-[#0B5F73] selection:text-white relative`}>
      
      {/* Dedicated Collapsible Scenario Sidebar Drawer */}
      <ScenarioSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentTab={currentTab}
        scenario={scenario}
        isClinicPortalActive={isClinicPortalActive}
        currentAuthScreen={currentAuthScreen}
        onSelectAuthStep={(step) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen(step);
        }}
        onSelectPatientTab={(tab) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
          setCurrentTab(tab);
        }}
        onSelectScenario={(scen) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
          handleScenarioChange(scen);
        }}
        onOpenHelp={() => {
          setCurrentAuthScreen('authenticated');
          setShowEmergencyModal(true);
        }}
        onToggleClinicPortal={() => {
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(!isClinicPortalActive);
        }}
        onOpenWhatToDo={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowWhatToDoSheet(true);
        }}
        onOpenWhyFlagged={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowWhyWeFlaggedSheet(true);
        }}
        onOpenBookVideo={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowBookVideoSheet(true);
        }}
        onOpenCuffTimer={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowCuffTimerSheet(true);
        }}
        onOpenCuffResult={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowCuffResultSheet(true);
        }}
        onOpenVisitDone={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(false);
          setIsCareVisitDone(true);
          setCurrentTab('care');
        }}
        onOpenMissedCheck={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          setIsVideoBooked(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowMissedCheckSheet(true);
        }}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onGuestSkip={() => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
        }}
      />

      {/* Main Workspace Display (Clean Edge-to-Edge Mobile Container) */}
      {isClinicPortalActive ? (
        /* Doctor Triage Station View (Clinic App) */
        <div className="w-full animate-in fade-in duration-300">
          <ClinicPortalView 
            scenario={scenario}
            onBackToPatientApp={() => setIsClinicPortalActive(false)}
          />
        </div>
      ) : (
        /* Mobile Web App View (Clean Mobile Layout) */
        <MobileLayout 
          isDark={isDarkMode}
          bottomNav={
            currentAuthScreen === 'authenticated' ? (
              <BottomNav
                currentTab={currentTab}
                onTabChange={(tab) => setCurrentTab(tab)}
              />
            ) : undefined
          }
        >
          {/* Active Screen View */}
          {currentAuthScreen !== 'authenticated' ? (
            <OnboardingFlow
              initialStep={currentAuthScreen}
              onComplete={() => setCurrentAuthScreen('authenticated')}
              onGuestSkip={() => setCurrentAuthScreen('authenticated')}
            />
          ) : (
            <main className="flex-1 flex flex-col">
              {currentTab === 'today' && (
                <HomeScreen
                  scenario={scenario}
                  isMidwifeChecking={isMidwifeChecking}
                  isVideoBooked={isVideoBooked}
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={() => setShowHanaChat(true)}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  onOpenHardwareSheet={() => setShowHardwareSheet(true)}
                  onOpenFirstScanDetails={() => setCurrentTab('care')}
                  onOpenWhyWeFlagged={() => {
                    closeAllSheets();
                    setShowWhyWeFlaggedSheet(true);
                  }}
                  onOpenWhatToDo={() => {
                    closeAllSheets();
                    setShowWhatToDoSheet(true);
                  }}
                />
              )}

              {currentTab === 'track' && (
                <TrackScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={() => setShowHanaChat(true)}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  onOpenHardwareSheet={() => setShowHardwareSheet(true)}
                />
              )}

              {currentTab === 'journey' && (
                <JourneyScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={() => setShowHanaChat(true)}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                />
              )}

              {currentTab === 'care' && (
                <CareScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={() => setShowHanaChat(true)}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  isVisitDone={isCareVisitDone}
                />
              )}

              {currentTab === 'family' && (
                <FamilyScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={() => setShowHanaChat(true)}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                />
              )}
            </main>
          )}
        </MobileLayout>
      )}

      {/* Interactive Overlays & Sheets */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        currentBP={scenario === 'critical_alert' ? '162/112' : '128/82'}
      />

      <HardwareSheet
        isOpen={showHardwareSheet}
        onClose={() => setShowHardwareSheet(false)}
        bumpBandBattery={scenario === 'early_pregnancy' ? 0 : 82}
        watchBattery={scenario === 'early_pregnancy' ? 71 : 64}
      />

      <HanaChatSheet
        isOpen={showHanaChat}
        onClose={() => setShowHanaChat(false)}
        gestationalWeek={scenario === 'early_pregnancy' ? 9 : 31}
      />

      {/* Flag to Care Sheets (Screens 19-25) */}
      <WhatToDoSheet
        isOpen={showWhatToDoSheet}
        onClose={() => setShowWhatToDoSheet(false)}
        onCall998={() => {
          setShowWhatToDoSheet(false);
          setShowEmergencyModal(true);
        }}
      />

      <WhyWeFlaggedSheet
        isOpen={showWhyWeFlaggedSheet}
        onClose={() => setShowWhyWeFlaggedSheet(false)}
        onPickATime={() => {
          setShowWhyWeFlaggedSheet(false);
          setShowBookVideoSheet(true);
        }}
      />

      <BookVideoCheckSheet
        isOpen={showBookVideoSheet}
        onClose={() => setShowBookVideoSheet(false)}
        onBookingConfirmed={() => {
          setIsVideoBooked(true);
        }}
      />

      <CuffRestTimerSheet
        isOpen={showCuffTimerSheet}
        onClose={() => setShowCuffTimerSheet(false)}
        onCompleteRest={() => {
          setShowCuffTimerSheet(false);
          setShowCuffResultSheet(true);
        }}
      />

      <CuffResultSheet
        isOpen={showCuffResultSheet}
        onClose={() => setShowCuffResultSheet(false)}
        onAnswerNo={() => {
          setShowCuffResultSheet(false);
        }}
        onAnswerYes={() => {
          setShowCuffResultSheet(false);
          setShowEmergencyModal(true);
        }}
      />

      <MissedCheckSheet
        isOpen={showMissedCheckSheet}
        onClose={() => setShowMissedCheckSheet(false)}
        onRebooked={() => {
          setIsVideoBooked(true);
        }}
        onAskAhmed={() => {
          setShowMissedCheckSheet(false);
          setCurrentTab('family');
        }}
      />
    </div>
  );
}
