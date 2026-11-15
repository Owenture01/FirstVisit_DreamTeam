/**
 * Core Clinical & Vitals Logic
 */

export interface VitalsEvaluation {
  isCritical: boolean;
  priority: 'normal' | 'review' | 'urgent';
  systolicAlert: boolean;
  diastolicAlert: boolean;
  fetalStatus: 'normal' | 'bradycardia' | 'tachycardia';
}

export function evaluateBloodPressure(systolic: number, diastolic: number): 'normal' | 'elevated' | 'stage1' | 'stage2_urgent' {
  if (systolic >= 160 || diastolic >= 110) {
    return 'stage2_urgent';
  }
  if (systolic >= 140 || diastolic >= 90) {
    return 'stage1';
  }
  if (systolic >= 120 && diastolic < 80) {
    return 'elevated';
  }
  return 'normal';
}

export function evaluateFetalHeartRate(bpm: number): 'normal' | 'bradycardia' | 'tachycardia' {
  if (bpm < 110) return 'bradycardia';
  if (bpm > 160) return 'tachycardia';
  return 'normal';
}

export function calculateKickProgress(currentKicks: number, targetKicks: number = 10): {
  progressPercentage: number;
  isGoalMet: boolean;
  remainingKicks: number;
} {
  const safeCurrent = Math.max(0, currentKicks);
  const percentage = Math.min(100, Math.round((safeCurrent / targetKicks) * 100));
  return {
    progressPercentage: percentage,
    isGoalMet: safeCurrent >= targetKicks,
    remainingKicks: Math.max(0, targetKicks - safeCurrent)
  };
}
