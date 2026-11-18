export type ProactiveCategory =
  | 'prescription'
  | 'exercise'
  | 'hydration'
  | 'vitals'
  | 'fetal_movement'
  | 'sleep';

export interface HanaProactivePrompt {
  id: string;
  category: ProactiveCategory;
  headerLabel: string;
  question: string;
  toastTitle: string;
  toastSubtitle: string;
  primaryAction: string;
  secondaryAction: string;
  confirmationText: string;
  linkedDoseId?: 'aspirin' | 'iron' | 'folic';
  minWeek?: number;
}

const ALL_PROACTIVE_PROMPTS: HanaProactivePrompt[] = [
  {
    id: 'aspirin-2000',
    category: 'prescription',
    headerLabel: 'Hana · 20:00',
    question: 'Time for your aspirin. Taken it?',
    toastTitle: 'Did you take your aspirin?',
    toastSubtitle: "1 tablet, from Dr. Layla's plan.",
    primaryAction: 'Yes, taken',
    secondaryAction: 'Not yet',
    confirmationText: 'Aspirin logged for 20:00 ✓',
    linkedDoseId: 'aspirin',
  },
  {
    id: 'exercise-walk',
    category: 'exercise',
    headerLabel: 'Hana · Exercise',
    question: 'Ready for a 15-min gentle walk?',
    toastTitle: 'Time for a 15-min walk?',
    toastSubtitle: 'Light evening movement helps circulation.',
    primaryAction: 'Log walk',
    secondaryAction: 'Not yet',
    confirmationText: '15-min walk logged ✓',
  },
  {
    id: 'prescription-iron',
    category: 'prescription',
    headerLabel: 'Hana · Prescription',
    question: 'Had your iron tablet after lunch?',
    toastTitle: 'Did you take your iron tablet?',
    toastSubtitle: 'Best absorbed away from tea or coffee.',
    primaryAction: 'Yes, taken',
    secondaryAction: 'Not yet',
    confirmationText: 'Iron dose confirmed ✓',
    linkedDoseId: 'iron',
  },
  {
    id: 'hydration-water',
    category: 'hydration',
    headerLabel: 'Hana · Routine',
    question: 'Time for a glass of water, Mariam?',
    toastTitle: 'Quick hydration check',
    toastSubtitle: 'A glass of water helps prevent cramps.',
    primaryAction: 'Drank a cup',
    secondaryAction: 'Later',
    confirmationText: 'Hydration logged ✓',
  },
  {
    id: 'kicks-check',
    category: 'fetal_movement',
    headerLabel: 'Hana · Baby kicks',
    question: 'Felt 10 gentle kicks today?',
    toastTitle: 'How are baby kicks today?',
    toastSubtitle: 'Aim for 10 movements in 12 hours.',
    primaryAction: 'Yes, normal',
    secondaryAction: 'Not yet',
    confirmationText: 'Kick check recorded ✓',
    minWeek: 24,
  },
  {
    id: 'cuff-check',
    category: 'vitals',
    headerLabel: 'Hana · BP check',
    question: 'Ready for your evening cuff check?',
    toastTitle: 'Evening BP cuff check',
    toastSubtitle: 'Sit quietly 5 min before measuring.',
    primaryAction: 'Will check now',
    secondaryAction: 'Later',
    confirmationText: 'BP reminder noted ✓',
  },
  {
    id: 'stretch-back',
    category: 'exercise',
    headerLabel: 'Hana · Mobility',
    question: 'Try 3 min of gentle pelvic tilts?',
    toastTitle: 'Gentle back stretch?',
    toastSubtitle: 'Relieves lower-back pressure before bed.',
    primaryAction: 'Done',
    secondaryAction: 'Later',
    confirmationText: 'Stretch logged ✓',
  },
  {
    id: 'sleep-tip',
    category: 'sleep',
    headerLabel: 'Hana · Sleep',
    question: 'Only 5 h of sleep. Want a tip?',
    toastTitle: 'Rest & sleep check-in',
    toastSubtitle: 'Side-lying with a pillow helps tonight.',
    primaryAction: 'Yes please',
    secondaryAction: 'Later',
    confirmationText: 'Opening sleep tips…',
  },
];

export function getProactivePromptsForWeek(week: number): HanaProactivePrompt[] {
  return ALL_PROACTIVE_PROMPTS.filter(
    (prompt) => prompt.minWeek === undefined || week >= prompt.minWeek
  );
}

export function getNextPromptIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}
