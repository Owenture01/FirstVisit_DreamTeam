export interface BandTroubleshootStep {
  stepNumber: number;
  text: string;
}

export const BAND_TROUBLESHOOT_STEPS: readonly BandTroubleshootStep[] = [
  {
    stepNumber: 1,
    text: 'Refit the band, sensor below your belly button',
  },
  {
    stepNumber: 2,
    text: 'Check the battery: hold the button 3 s',
  },
  {
    stepNumber: 3,
    text: 'Keep your phone within 5 m',
  },
];

export type OfflineQueueStatus = 'waiting' | 'sent';

export interface OfflineQueueItem {
  id: string;
  value: string;
  detail: string;
  status: OfflineQueueStatus;
}

export const INITIAL_OFFLINE_QUEUE: readonly OfflineQueueItem[] = [
  {
    id: 'bp-2005',
    value: '136/86',
    detail: 'Upper-arm cuff · 20:05',
    status: 'waiting',
  },
  {
    id: 'kicks-1840',
    value: 'Kicks 10',
    detail: 'Count · 18:40',
    status: 'waiting',
  },
  {
    id: 'hr-1800',
    value: 'HR 90',
    detail: 'Watch · 18:00',
    status: 'waiting',
  },
];

export function createInitialOfflineQueue(): OfflineQueueItem[] {
  return INITIAL_OFFLINE_QUEUE.map((item) => ({ ...item }));
}

export function countWaitingItems(items: readonly OfflineQueueItem[]): number {
  return items.filter((item) => item.status === 'waiting').length;
}

export function syncOfflineQueue(items: readonly OfflineQueueItem[]): OfflineQueueItem[] {
  return items.map((item) => ({
    ...item,
    status: 'sent',
  }));
}

export function addOfflineKickRecord(
  items: readonly OfflineQueueItem[],
  kickCount: number,
  timeLabel: string,
  isOnline: boolean
): OfflineQueueItem[] {
  const safeCount = Math.max(1, Math.floor(kickCount));
  const nextItem: OfflineQueueItem = {
    id: `kicks-${items.length + 1}-${safeCount}`,
    value: `Kicks ${safeCount}`,
    detail: `Count · ${timeLabel}`,
    status: isOnline ? 'sent' : 'waiting',
  };
  return [nextItem, ...items];
}
