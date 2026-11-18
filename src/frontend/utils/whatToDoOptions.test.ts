import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLINIC_DATE_OPTIONS,
  CLINIC_LOCATIONS,
  formatClinicAvailabilityLine,
  getLocationById,
} from './whatToDoOptions';

test('default availability line matches Screen 19 reference copy', () => {
  const line = formatClinicAvailabilityLine(CLINIC_DATE_OPTIONS[0], null);
  assert.equal(line, 'Thu 14: 9:30, 13:00 or 16:00');
});

test('booked availability line includes selected date, time, and location', () => {
  const line = formatClinicAvailabilityLine(
    CLINIC_DATE_OPTIONS[1],
    { dateLabel: 'Fri 15', time: '11:30' },
    CLINIC_LOCATIONS[1].name
  );
  assert.equal(line, "Booked Fri 15 at 11:30 · Jumeirah Women's Clinic");
});

test('getLocationById resolves valid locations and falls back to default', () => {
  const jumeirah = getLocationById('jumeirah');
  assert.equal(jumeirah.driveMinutes, 8);
  assert.equal(jumeirah.name, "Jumeirah Women's Clinic");

  const fallback = getLocationById('unknown-id');
  assert.equal(fallback.id, 'al-wasl');
});
