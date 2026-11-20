export interface AppointmentDateChoice {
  id: string;
  label: string;
  slots: string[];
}

export interface BookedClinicAppointment {
  id: string;
  eyebrow: string;
  title: string;
  dateLabel: string;
  time: string;
  location: string;
  address: string;
  driveMinutes: number;
  reasonText: string;
  isConfirmed: boolean;
  askPartnerHelp: boolean;
}

export interface AppointmentSelectionInput {
  dateLabel: string;
  time: string;
  location?: string;
  address?: string;
  driveMinutes?: number;
  askPartnerHelp?: boolean;
  title?: string;
  reasonText?: string;
}

export const DEFAULT_CLINIC_LOCATION = 'Maternity clinic, level 2';
export const DEFAULT_CLINIC_ADDRESS = 'Al Wasl Rd, Gate 2 · Building B, Level 2';
export const DEFAULT_CLINIC_DRIVE_MINUTES = 12;

export const BOOKING_DATE_CHOICES: AppointmentDateChoice[] = [
  { id: 'today', label: 'Today', slots: ['16:30', '17:30', '18:30'] },
  { id: 'thu-14', label: 'Thu 14', slots: ['09:30', '13:00', '16:00'] },
  { id: 'fri-15', label: 'Fri 15', slots: ['10:00', '11:30', '14:30'] },
];

export function createBookedAppointment(
  selection: AppointmentSelectionInput
): BookedClinicAppointment {
  const dateLabel = selection.dateLabel.trim() || BOOKING_DATE_CHOICES[0].label;
  const time = selection.time.trim() || BOOKING_DATE_CHOICES[0].slots[0];
  const location = selection.location?.trim() || DEFAULT_CLINIC_LOCATION;

  return {
    id: `appt-${dateLabel.toLowerCase().replace(/\s+/g, '-')}-${time.replace(':', '')}`,
    eyebrow: 'Your clinic booked a check',
    title: selection.title?.trim() || 'Urine protein test',
    dateLabel,
    time,
    location,
    address: selection.address?.trim() || DEFAULT_CLINIC_ADDRESS,
    driveMinutes: selection.driveMinutes ?? DEFAULT_CLINIC_DRIVE_MINUTES,
    reasonText:
      selection.reasonText?.trim() ||
      'Why: 2 readings above 140/90 today. Dr. Aisyah will see you.',
    isConfirmed: false,
    askPartnerHelp: Boolean(selection.askPartnerHelp),
  };
}

export function rescheduleBookedAppointment(
  existing: BookedClinicAppointment | null,
  selection: AppointmentSelectionInput
): BookedClinicAppointment {
  if (!existing) {
    return createBookedAppointment(selection);
  }
  const dateLabel = selection.dateLabel.trim() || existing.dateLabel;
  const time = selection.time.trim() || existing.time;
  const location = selection.location?.trim() || existing.location;

  return {
    ...existing,
    id: `appt-${dateLabel.toLowerCase().replace(/\s+/g, '-')}-${time.replace(':', '')}`,
    dateLabel,
    time,
    location,
    address: selection.address?.trim() || existing.address,
    driveMinutes: selection.driveMinutes ?? existing.driveMinutes,
    askPartnerHelp:
      selection.askPartnerHelp !== undefined
        ? selection.askPartnerHelp
        : existing.askPartnerHelp,
    isConfirmed: false,
  };
}

export function toggleAppointmentConfirmation(
  appointment: BookedClinicAppointment
): BookedClinicAppointment {
  return {
    ...appointment,
    isConfirmed: !appointment.isConfirmed,
  };
}

export function formatAppointmentScheduleLine(
  appointment: Pick<BookedClinicAppointment, 'dateLabel' | 'time' | 'location'>
): string {
  return `${appointment.dateLabel} ${appointment.time} · ${appointment.location}`;
}
