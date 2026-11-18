/**
 * Gestational Age & Due Date Simulation Utilities
 * Standard 280-day (40 weeks, 0 days) clinical Naegele calculation using UTC dates
 * to avoid local timezone drift.
 */

export const FULL_TERM_DAYS = 280; // 40 weeks * 7 days
export const DEFAULT_DUE_DATE = '2027-01-12';
// 59 days before 2027-01-12 -> 221 days elapsed -> Week 31, Day 4
export const DEFAULT_SIMULATED_DATE = '2026-11-14';

export interface GestationalProgress {
  gestationalWeek: number;
  gestationalDay: number;
  stickerWeek: number;
  totalDaysElapsed: number;
  daysRemaining: number;
  trimester: 1 | 2 | 3;
}

function parseUtcDate(isoDate: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return Date.UTC(2026, 10, 14);
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  return Date.UTC(year, month, day);
}

function formatUtcDate(ms: number): string {
  const d = new Date(ms);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Computes gestational week/day and remaining days from simulated today date and due date.
 */
export function calculateGestationalProgress(
  simulatedDate: string,
  dueDate: string
): GestationalProgress {
  const simMs = parseUtcDate(simulatedDate);
  const dueMs = parseUtcDate(dueDate);
  const msPerDay = 86_400_000;

  const rawDaysRemaining = Math.round((dueMs - simMs) / msPerDay);
  const rawElapsed = FULL_TERM_DAYS - rawDaysRemaining;
  const totalDaysElapsed = Math.max(0, Math.min(294, rawElapsed));

  const gestationalWeek = Math.floor(totalDaysElapsed / 7);
  const gestationalDay = totalDaysElapsed % 7;
  const stickerWeek = Math.max(4, Math.min(40, gestationalWeek));
  const trimester: 1 | 2 | 3 =
    gestationalWeek <= 13 ? 1 : gestationalWeek <= 27 ? 2 : 3;

  return {
    gestationalWeek,
    gestationalDay,
    stickerWeek,
    totalDaysElapsed,
    daysRemaining: rawDaysRemaining,
    trimester,
  };
}

/**
 * Returns the YYYY-MM-DD date corresponding to a target gestational week and day relative to dueDate.
 */
export function getDateForGestationalWeek(
  dueDate: string,
  week: number,
  day = 0
): string {
  const dueMs = parseUtcDate(dueDate);
  const msPerDay = 86_400_000;
  const elapsed = Math.max(0, Math.min(294, week * 7 + day));
  const daysBeforeDue = FULL_TERM_DAYS - elapsed;
  return formatUtcDate(dueMs - daysBeforeDue * msPerDay);
}

/**
 * Shifts a YYYY-MM-DD date string by deltaDays in UTC.
 */
export function shiftIsoDate(isoDate: string, deltaDays: number): string {
  const ms = parseUtcDate(isoDate);
  return formatUtcDate(ms + deltaDays * 86_400_000);
}

/**
 * Formats YYYY-MM-DD cleanly as "12 Jan 2027".
 */
export function formatFriendlyDate(isoDate: string): string {
  const ms = parseUtcDate(isoDate);
  const d = new Date(ms);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
