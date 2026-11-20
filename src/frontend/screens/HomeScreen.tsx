import React from 'react';
import { Header } from '../components/Header';
import { BabyCompanionCard } from '../components/BabyCompanionCard';
import { BabyHeartbeatCard } from '../components/BabyHeartbeatCard';
import { MotherVitalsCard } from '../components/MotherVitalsCard';
import { WearableStatusPill } from '../components/WearableStatusPill';
import { HanaCompanion } from '../components/HanaCompanion';
import { CriticalAlertBanner } from '../components/CriticalAlertBanner';
import { FirstScanCard } from '../components/FirstScanCard';
import { MidwifeTriageBanner } from '../components/MidwifeTriageBanner';
import { ClinicBookedAppointmentCard } from '../components/ClinicBookedAppointmentCard';
import { BandDisconnectedView } from '../components/BandDisconnectedView';
import { OfflineSafetyView } from '../components/OfflineSafetyView';
import { PostpartumDay5View } from '../components/PostpartumDay5View';
import { AppScenario } from '../types';
import { DEFAULT_DUE_DATE } from '../utils/gestationalAge';
import { BookedClinicAppointment } from '../utils/bookedAppointment';

interface HomeScreenProps {
  scenario: AppScenario;
  gestationalWeek?: number;
  gestationalDay?: number;
  daysRemaining?: number;
  dueDate?: string;
  isMidwifeChecking?: boolean;
  isVideoBooked?: boolean;
  bookedAppointment?: BookedClinicAppointment | null;
  isAlarmMuted?: boolean;
  onToggleAlarmMute?: () => void;
  onToggleConfirmAppointment?: () => void;
  onRescheduleAppointment?: () => void;
  onOpenHelp: () => void;
  onOpenHana: () => void;
  onOpenProfile: () => void;
  onOpenHardwareSheet: () => void;
  onOpenFirstScanDetails: () => void;
  onOpenWhyWeFlagged?: () => void;
  onOpenWhatToDo?: () => void;
  onMarkDoseTaken?: (doseId: string) => void;
  onNavigateToCare?: () => void;
  onReconnectBand?: () => void;
  onOpenMoodCheck?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  scenario,
  gestationalWeek = 31,
  gestationalDay = 4,
  daysRemaining = 59,
  dueDate = DEFAULT_DUE_DATE,
  isMidwifeChecking = false,
  isVideoBooked = false,
  bookedAppointment = null,
  isAlarmMuted = false,
  onToggleAlarmMute,
  onToggleConfirmAppointment = () => {},
  onRescheduleAppointment = () => {},
  onOpenHelp,
  onOpenHana,
  onOpenProfile,
  onOpenHardwareSheet,
  onOpenFirstScanDetails,
  onOpenWhyWeFlagged = () => {},
  onOpenWhatToDo = () => {},
  onMarkDoseTaken,
  onNavigateToCare,
  onReconnectBand,
  onOpenMoodCheck,
}) => {
  const isCritical = scenario === 'critical_alert';
  const isBandDisconnected = scenario === 'band_disconnected';
  const isOffline = scenario === 'offline';
  const isPostpartumDay5 = scenario === 'postpartum_day5';
  const isSpecialScenario = isCritical || isBandDisconnected || isOffline || isPostpartumDay5;
  const isEarly = !isSpecialScenario && (scenario === 'early_pregnancy' || gestationalWeek < 16);

  return (
    <div className="w-full flex-1 flex flex-col space-y-3.5 pb-4">
      {/* Top Header */}
      <Header
        gestationalWeek={gestationalWeek}
        gestationalDay={gestationalDay}
        titleOverride={isPostpartumDay5 ? 'Day 5 after birth' : undefined}
        subtitleOverride={isPostpartumDay5 ? 'Postpartum check' : undefined}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen 27: Band Disconnected Safety Net View */}
      {isBandDisconnected && (
        <BandDisconnectedView
          onOpenHelp={onOpenHelp}
          onReconnectBand={onReconnectBand}
        />
      )}

      {/* Screen 28: Offline Safety Net View */}
      {isOffline && (
        <OfflineSafetyView
          onOpenHelp={onOpenHelp}
          onNavigateToCare={onNavigateToCare}
        />
      )}

      {/* Screen 29: Postpartum Day 5 View */}
      {isPostpartumDay5 && (
        <PostpartumDay5View
          onOpenHelp={onOpenHelp}
          onOpenMoodCheck={onOpenMoodCheck}
        />
      )}

      {/* Screen 2: Critical Alert View */}
      {isCritical && (
        <>
          {/* Urgent Red Beeping Banner */}
          <CriticalAlertBanner
            bloodPressure="162/112"
            time="21:10"
            doctorName="Noura"
            isAlarmMuted={isAlarmMuted}
            onToggleMute={onToggleAlarmMute}
            onCall998={onOpenHelp}
            onHospitalDirections={onOpenHelp}
          />

          {/* Mother Vitals with High HR and Critical Flashing BP */}
          <MotherVitalsCard
            heartRate={104}
            heartRateStatus="urgent"
            bloodPressure="162/112"
            bloodPressureStatus="urgent"
            timeAgo="Last reliable reading 21:10"
            nextStepTitle="Go to A&E now. Don't drive yourself."
            nextStepAction="Directions"
            nextStepType="safe"
            onNextStepAction={onOpenHelp}
          />

          {/* Compact Baby's Heartbeat card */}
          <BabyHeartbeatCard
            bpm={138}
            compact={true}
            statusText="Normal"
            compactSubtitle="Last recording 07:30 · clinic reviews it"
            onCardClick={onOpenHana}
          />

          {/* Wearables status */}
          <WearableStatusPill
            bumpBandBattery={82}
            bumpBandStatus="connected"
            watchBattery={64}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />
        </>
      )}

      {/* Screen 3: Early Pregnancy View (Weeks 4–15) */}
      {isEarly && (
        <>
          {/* Progressive Baby Size Companion Card */}
          <BabyCompanionCard
            gestationalWeek={gestationalWeek}
            gestationalDay={gestationalDay}
            daysRemaining={daysRemaining}
            dueDate={dueDate}
            isEarly={true}
            onActionClick={onOpenFirstScanDetails}
          />

          {/* Baby's heartbeat: month 4 or 5 card */}
          <BabyHeartbeatCard
            bpm={0}
            isEarlyPregnancy={true}
            onCardClick={onOpenHardwareSheet}
          />

          {/* First scan card */}
          <FirstScanCard
            title="First scan"
            dateTime="Thu 21 Nov · 9:00"
            onDetailsClick={onOpenFirstScanDetails}
          />

          {/* Mother Vitals with Extended Sleep & Stress */}
          <MotherVitalsCard
            heartRate={82}
            heartRateStatus="normal"
            bloodPressure="118/76"
            bloodPressureStatus="normal"
            timeAgo="5 min ago"
            showExtendedMetrics={true}
            sleepHours={7}
            stressLevel="Low"
            nextStepTitle="Folic acid with breakfast"
            nextStepAction="Done"
            nextStepType="done"
            onNextStepAction={() => {
              onMarkDoseTaken?.('folic');
            }}
          />

          {/* Wearables status (Bump Band later, Watch 71%) */}
          <WearableStatusPill
            bumpBandBattery={0}
            bumpBandStatus="later"
            watchBattery={71}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />
        </>
      )}

      {/* Booked Clinic Check Home View (immediately shown once date & time are picked from Scenario 20) */}
      {!isSpecialScenario && !isEarly && bookedAppointment && (
        <>
          <ClinicBookedAppointmentCard
            appointment={bookedAppointment}
            onToggleConfirm={onToggleConfirmAppointment}
            onPickAnotherTime={onRescheduleAppointment}
          />

          <BabyHeartbeatCard
            bpm={138}
            compact={true}
            statusText="Normal"
            inlineCompactSubtitle="last recording 07:30"
            onCardClick={onOpenHana}
          />

          <MotherVitalsCard
            heartRate={88}
            heartRateStatus="normal"
            bloodPressure="144/94"
            bloodPressureStatus="review"
            timeAgo="Cuff · 15:02"
            hideNextStep={true}
          />
        </>
      )}

      {/* Screen 1 / Screens 19-23: Default Home & Flag-to-Care View */}
      {!isSpecialScenario && !isEarly && !bookedAppointment && (
        <>
          {/* Progressive Baby Size Companion Card */}
          <BabyCompanionCard
            gestationalWeek={gestationalWeek}
            gestationalDay={gestationalDay}
            daysRemaining={daysRemaining}
            dueDate={dueDate}
            onActionClick={onOpenFirstScanDetails}
          />

          {/* Hero Baby's Heartbeat card */}
          <BabyHeartbeatCard
            bpm={138}
            isLive={true}
            statusText="Normal"
            onCardClick={onOpenHana}
          />

          {/* Clinical Triage Flag Flow Banner (Screens 19-23, 25) */}
          {isMidwifeChecking ? (
            <MidwifeTriageBanner
              currentStep={isVideoBooked ? 'booked' : 'midwife'}
              isBooked={isVideoBooked}
              onOpenWhyWeFlagged={onOpenWhyWeFlagged}
              onOpenWhatToDo={onOpenWhatToDo}
            />
          ) : (
            /* Standard Vitals & Next Step */
            <MotherVitalsCard
              heartRate={88}
              heartRateStatus="normal"
              bloodPressure="128/82"
              bloodPressureStatus="normal"
              timeAgo="5 min ago"
              nextStepTitle="Cuff check at 20:00"
              nextStepAction="Remind me"
              nextStepType="remind"
              onNextStepAction={() => {
                console.log("Reminder set for cuff blood pressure check at 20:00.");
              }}
            />
          )}

          {/* Dual Wearables Sync Status */}
          <WearableStatusPill
            bumpBandBattery={82}
            bumpBandStatus="connected"
            watchBattery={64}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />

          {/* Popping Hana Proactive Routine Cloud */}
          {!isMidwifeChecking && (
            <HanaCompanion
              gestationalWeek={gestationalWeek}
              onOpenChat={onOpenHana}
              onMarkDoseTaken={onMarkDoseTaken}
            />
          )}
        </>
      )}
    </div>
  );
};
