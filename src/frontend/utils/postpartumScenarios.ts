export type PostpartumDayStatus = 'done' | 'current' | 'upcoming';

export const POSTPARTUM_CHECK_DAYS: readonly number[] = [3, 4, 5, 6, 7, 8, 9, 10];

export interface PostpartumBpState {
  morningReading: string;
  morningTime: string;
  eveningLogged: boolean;
  eveningReading: string;
  eveningTime: string;
}

export function createInitialPostpartumBpState(): PostpartumBpState {
  return {
    morningReading: '134/86',
    morningTime: '8:10',
    eveningLogged: false,
    eveningReading: '132/84',
    eveningTime: '20:00',
  };
}

export function getPostpartumProgressBadge(eveningLogged: boolean): string {
  return eveningLogged ? '2 of 2 done' : '1 of 2 done';
}

export function toggleEveningCheck(state: PostpartumBpState): PostpartumBpState {
  return {
    ...state,
    eveningLogged: !state.eveningLogged,
  };
}

export function getPostpartumDayStatus(
  day: number,
  currentDay: number,
  isTodayComplete: boolean
): PostpartumDayStatus {
  if (day < currentDay) {
    return 'done';
  }
  if (day === currentDay) {
    return isTodayComplete ? 'done' : 'current';
  }
  return 'upcoming';
}

export interface PostpartumHandoverItem {
  id: 'doctor' | 'yearly_bp';
  title: string;
  subtitle: string;
}

export const POSTPARTUM_HANDOVER_ITEMS: readonly PostpartumHandoverItem[] = [
  {
    id: 'doctor',
    title: 'Dr. Salma, family doctor',
    subtitle: 'Your summary was sent on 24 Dec',
  },
  {
    id: 'yearly_bp',
    title: 'Yearly upper-arm cuff BP check',
    subtitle: 'Use an upper-arm cuff yearly. Reminder set.',
  },
];

export function buildPostpartumSummaryText(): string {
  return [
    'FirstVisit Postpartum 6-Week Handover Summary',
    '============================================',
    'Patient: Mariam',
    'Status: Day 42 after birth · 6-week postpartum BP plan complete',
    'Final upper-arm cuff reading: 124/80 mmHg',
    '',
    'Handover Details:',
    '- Family doctor: Dr. Salma (Summary sent on 24 Dec)',
    '- Long-term follow-up: Yearly upper-arm cuff BP check (Reminder set)',
    '- Device return: Your band can go back to the clinic.',
    '',
    'Thank you, Mariam.',
  ].join('\n');
}
