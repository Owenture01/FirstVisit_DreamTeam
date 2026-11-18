export type DoseStatus = 'taken' | 'due';

export interface TodayDoseItem {
  id: string;
  time: string;
  name: string;
  status: DoseStatus;
  badgeText: string;
}

export interface WeekDot {
  day: string;
  state: 'taken' | 'missed';
}

export const INITIAL_TODAY_DOSES: TodayDoseItem[] = [
  {
    id: 'folic',
    time: '08:00',
    name: 'Folic acid',
    status: 'taken',
    badgeText: 'Hana 08:04',
  },
  {
    id: 'iron',
    time: '13:00',
    name: 'Iron',
    status: 'taken',
    badgeText: 'Watch tap 13:20',
  },
  {
    id: 'aspirin',
    time: '20:00',
    name: 'Aspirin',
    status: 'due',
    badgeText: 'Due',
  },
];

export const INITIAL_WEEK_DOTS: WeekDot[] = [
  { day: 'Thu', state: 'taken' },
  { day: 'Fri', state: 'taken' },
  { day: 'Sat', state: 'taken' },
  { day: 'Sun', state: 'taken' },
  { day: 'Mon', state: 'taken' },
  { day: 'Tue', state: 'missed' },
  { day: 'Wed', state: 'taken' },
];

export interface CareDoseSummary {
  nextDose: TodayDoseItem | null;
  takenThisWeek: number;
  totalThisWeek: number;
  missedSummary: string;
}

export function toggleDoseStatus(
  doses: TodayDoseItem[],
  doseId: string
): TodayDoseItem[] {
  return doses.map((dose) => {
    if (dose.id !== doseId) return dose;
    if (dose.status === 'due') {
      return {
        ...dose,
        status: 'taken',
        badgeText: dose.id === 'aspirin' ? 'Taken 20:00' : `Taken ${dose.time}`,
      };
    }
    if (dose.id === 'folic') {
      return { ...dose, status: 'due', badgeText: 'Due' };
    }
    if (dose.id === 'iron') {
      return { ...dose, status: 'due', badgeText: 'Due' };
    }
    return { ...dose, status: 'due', badgeText: 'Due' };
  });
}

export function markDoseTaken(
  doses: TodayDoseItem[],
  doseId: string,
  badgeLabel?: string
): TodayDoseItem[] {
  return doses.map((dose) => {
    if (dose.id !== doseId) return dose;
    return {
      ...dose,
      status: 'taken',
      badgeText:
        badgeLabel ??
        (dose.id === 'aspirin'
          ? 'Hana 20:00'
          : dose.status === 'taken'
          ? dose.badgeText
          : `Hana ${dose.time}`),
    };
  });
}

export function computeCareDoseSummary(
  doses: TodayDoseItem[],
  baseTaken = 13,
  baseTotal = 14
): CareDoseSummary {
  const nextDose = doses.find((d) => d.status === 'due') ?? null;

  const initialById = new Map(INITIAL_TODAY_DOSES.map((d) => [d.id, d.status]));
  let deltaTaken = 0;
  let deltaAddedDoses = 0;

  for (const dose of doses) {
    const wasTaken = initialById.get(dose.id) === 'taken';
    const isTaken = dose.status === 'taken';
    if (!wasTaken && isTaken) {
      deltaTaken += 1;
      deltaAddedDoses += 1;
    } else if (wasTaken && !isTaken) {
      deltaTaken -= 1;
    }
  }

  return {
    nextDose,
    takenThisWeek: Math.max(0, baseTaken + deltaTaken),
    totalThisWeek: baseTotal + deltaAddedDoses,
    missedSummary: '1 missed on Tuesday.',
  };
}
