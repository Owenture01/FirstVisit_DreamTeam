export const CUFF_REST_TOTAL_SECONDS = 300; // 5 minutes
export const CUFF_REST_INITIAL_SECONDS = 252; // 4:12 active countdown matching clinical check-in state

export interface CuffPrepStep {
  number: number;
  text: string;
}

export const CUFF_PREP_STEPS: readonly CuffPrepStep[] = [
  { number: 1, text: 'Sit with your back supported' },
  { number: 2, text: 'Feet flat, legs not crossed' },
  { number: 3, text: 'Cuff on bare upper arm, at heart level' },
  { number: 4, text: 'Stay quiet while it measures' },
];

export type CuffTimerMode = 'closed' | 'expanded' | 'minimized';

/**
 * Formats seconds into M:SS (e.g., 252 -> "4:12", 65 -> "1:05", 0 -> "0:00").
 */
export function formatCuffCountdown(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Decrements the countdown timer by 1 second, clamping at 0.
 */
export function tickCuffCountdown(secondsRemaining: number): number {
  if (!Number.isFinite(secondsRemaining) || secondsRemaining <= 1) {
    return 0;
  }
  return Math.floor(secondsRemaining) - 1;
}

/**
 * Returns remaining fraction in [0, 1] for rendering the circular SVG progress ring.
 */
export function getCuffRemainingRatio(
  secondsRemaining: number,
  totalSeconds: number = CUFF_REST_TOTAL_SECONDS
): number {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return 0;
  }
  const clamped = Math.max(0, Math.min(totalSeconds, Number.isFinite(secondsRemaining) ? secondsRemaining : 0));
  return clamped / totalSeconds;
}

/**
 * Computes SVG strokeDashoffset so the teal ring reflects remaining rest time.
 */
export function getRingDashOffset(
  circumference: number,
  secondsRemaining: number,
  totalSeconds: number = CUFF_REST_TOTAL_SECONDS
): number {
  const ratio = getCuffRemainingRatio(secondsRemaining, totalSeconds);
  return circumference * (1 - ratio);
}

/**
 * Returns the CTA label for the bottom pill button.
 */
export function getCuffActionButtonLabel(secondsRemaining: number): string {
  if (secondsRemaining <= 0) {
    return 'Measure again now';
  }
  return `Measure again in ${formatCuffCountdown(secondsRemaining)}`;
}
