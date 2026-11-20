export type CareScreenMode = 'medicines' | 'visit_done' | 'escalated' | 'postpartum_week6';

export type EscalationDotTone = 'teal' | 'amber' | 'urgent';

export interface CuffEscalationEvent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  tone: EscalationDotTone;
}

export const CUFF_ESCALATION_TIMELINE: readonly CuffEscalationEvent[] = [
  {
    id: 'sent',
    title: 'Cuff reading sent',
    subtitle: '152/102 · upper-arm cuff, after rest',
    time: '21:10',
    tone: 'teal',
  },
  {
    id: 'midwife',
    title: 'Midwife Noura',
    subtitle: 'Message sent',
    time: '21:10',
    tone: 'teal',
  },
  {
    id: 'no_reply',
    title: 'No reply in 15 min',
    subtitle: 'Moved to on-call doctor',
    time: '21:25',
    tone: 'amber',
  },
  {
    id: 'doctor_replied',
    title: 'Dr. Layla replied',
    subtitle: 'Come to the maternity unit tonight',
    time: '21:31',
    tone: 'urgent',
  },
];

export const MATERNITY_UNIT_DETAILS = {
  name: 'Maternity unit',
  etaLine: "They know you're coming · 12 min",
  testLine: 'Urine protein test tonight',
  phoneNumber: '+971 4 219 5000',
  directionsSummary: 'Al Wasl Maternity Unit · Entrance B, Level 2 · 4.8 km (12 min by car)',
  driverNote: 'Ahmed was asked to drive you.',
  fallbackNote: 'No answer in 15 min? We call the next person.',
} as const;

export interface ClinicianEarlyReview {
  id: string;
  patientName: string;
  reason: string;
  status: 'booked' | 'pending';
  bookedLabel?: string;
  nextAvailableSlot: string;
}

export interface ClinicianPhoneAlertState {
  isUrgentSlotBooked: boolean;
  urgentSlotTime: string;
  isCallingUrgentPatient: boolean;
  reviews: ClinicianEarlyReview[];
  auditLog: string[];
}

export const INITIAL_CLINICIAN_EARLY_REVIEWS: readonly ClinicianEarlyReview[] = [
  {
    id: 'mariam-k',
    patientName: 'Mariam K.',
    reason: 'BP 2 readings above 140/90',
    status: 'booked',
    bookedLabel: 'Booked Thu 9:30',
    nextAvailableSlot: 'Booked Thu 9:30',
  },
  {
    id: 'aisha-n',
    patientName: 'Aisha N.',
    reason: 'Baby variability high (28 bpm)',
    status: 'pending',
    nextAvailableSlot: 'Booked Thu 14:00',
  },
];

export function createInitialClinicianPhoneState(): ClinicianPhoneAlertState {
  return {
    isUrgentSlotBooked: false,
    urgentSlotTime: '11:30',
    isCallingUrgentPatient: false,
    reviews: INITIAL_CLINICIAN_EARLY_REVIEWS.map((review) => ({ ...review })),
    auditLog: [],
  };
}

export function bookUrgentSlot(state: ClinicianPhoneAlertState): ClinicianPhoneAlertState {
  if (state.isUrgentSlotBooked) {
    return state;
  }
  return {
    ...state,
    isUrgentSlotBooked: true,
    auditLog: [
      `10:42 · Dr. Aisyah booked ${state.urgentSlotTime} urgent urine protein test for Sara A.`,
      ...state.auditLog,
    ],
  };
}

export function toggleCallUrgentPatient(state: ClinicianPhoneAlertState): ClinicianPhoneAlertState {
  const nextCalling = !state.isCallingUrgentPatient;
  return {
    ...state,
    isCallingUrgentPatient: nextCalling,
    auditLog: nextCalling
      ? ['10:42 · Dr. Aisyah started urgent call to Sara A.', ...state.auditLog]
      : state.auditLog,
  };
}

export function bookEarlyReview(
  state: ClinicianPhoneAlertState,
  reviewId: string
): ClinicianPhoneAlertState {
  const target = state.reviews.find((r) => r.id === reviewId);
  if (!target || target.status === 'booked') {
    return state;
  }

  return {
    ...state,
    reviews: state.reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            status: 'booked',
            bookedLabel: review.nextAvailableSlot,
          }
        : review
    ),
    auditLog: [
      `10:43 · Dr. Aisyah booked review for ${target.patientName} (${target.nextAvailableSlot.replace('Booked ', '')}).`,
      ...state.auditLog,
    ],
  };
}
