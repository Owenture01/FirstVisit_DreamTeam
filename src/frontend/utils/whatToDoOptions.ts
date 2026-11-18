export interface ClinicLocationOption {
  id: string;
  name: string;
  address: string;
  driveMinutes: number;
  distanceKm: string;
  openStatus: string;
}

export interface ClinicDateOption {
  id: string;
  label: string;
  slots: string[];
}

export const CLINIC_LOCATIONS: ClinicLocationOption[] = [
  {
    id: 'al-wasl',
    name: 'Al Wasl Maternity Clinic',
    address: 'Oud Metha Rd · Gate 2 Lab',
    driveMinutes: 12,
    distanceKm: '4.8 km',
    openStatus: 'Open now',
  },
  {
    id: 'jumeirah',
    name: "Jumeirah Women's Clinic",
    address: 'Al Wasl Rd · Villa 14',
    driveMinutes: 8,
    distanceKm: '3.1 km',
    openStatus: 'Open now',
  },
  {
    id: 'dubai-hospital',
    name: 'Dubai Hospital Maternity Unit',
    address: 'Al Khaleej Rd · Antenatal Wing',
    driveMinutes: 16,
    distanceKm: '7.4 km',
    openStatus: 'Open 24h',
  },
];

export const CLINIC_DATE_OPTIONS: ClinicDateOption[] = [
  {
    id: 'thu-14',
    label: 'Thu 14',
    slots: ['9:30', '13:00', '16:00'],
  },
  {
    id: 'fri-15',
    label: 'Fri 15',
    slots: ['9:00', '11:30', '15:00'],
  },
  {
    id: 'sat-16',
    label: 'Sat 16',
    slots: ['10:00', '14:00'],
  },
];

export function formatClinicAvailabilityLine(
  dateOption: ClinicDateOption,
  bookedSlot: { dateLabel: string; time: string } | null,
  locationName?: string
): string {
  if (bookedSlot) {
    return locationName
      ? `Booked ${bookedSlot.dateLabel} at ${bookedSlot.time} · ${locationName}`
      : `Booked ${bookedSlot.dateLabel} at ${bookedSlot.time}`;
  }
  const slots = dateOption.slots;
  if (slots.length === 1) {
    return `${dateOption.label}: ${slots[0]}`;
  }
  const allButLast = slots.slice(0, -1).join(', ');
  const last = slots[slots.length - 1];
  return `${dateOption.label}: ${allButLast} or ${last}`;
}

export function getLocationById(locationId: string): ClinicLocationOption {
  return CLINIC_LOCATIONS.find((loc) => loc.id === locationId) ?? CLINIC_LOCATIONS[0];
}
