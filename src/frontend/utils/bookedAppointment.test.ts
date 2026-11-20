import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BOOKING_DATE_CHOICES,
  DEFAULT_CLINIC_LOCATION,
  createBookedAppointment,
  formatAppointmentScheduleLine,
  rescheduleBookedAppointment,
  toggleAppointmentConfirmation,
} from './bookedAppointment.ts';

describe('bookedAppointment pure helpers', () => {
  it('creates a clinic urine protein test appointment with default clinic details', () => {
    const appt = createBookedAppointment({
      dateLabel: 'Today',
      time: '16:30',
    });

    assert.equal(appt.eyebrow, 'Your clinic booked a check');
    assert.equal(appt.title, 'Urine protein test');
    assert.equal(appt.dateLabel, 'Today');
    assert.equal(appt.time, '16:30');
    assert.equal(appt.location, DEFAULT_CLINIC_LOCATION);
    assert.equal(appt.isConfirmed, false);
    assert.equal(
      formatAppointmentScheduleLine(appt),
      'Today 16:30 · Maternity clinic, level 2'
    );
  });

  it('toggles appointment confirmation state cleanly without mutating the input', () => {
    const initial = createBookedAppointment({ dateLabel: 'Today', time: '16:30' });
    const confirmed = toggleAppointmentConfirmation(initial);
    const unconfirmed = toggleAppointmentConfirmation(confirmed);

    assert.equal(initial.isConfirmed, false);
    assert.equal(confirmed.isConfirmed, true);
    assert.equal(unconfirmed.isConfirmed, false);
  });

  it('reschedules an existing appointment and resets confirmation to false', () => {
    const initial = toggleAppointmentConfirmation(
      createBookedAppointment({ dateLabel: 'Today', time: '16:30' })
    );
    assert.equal(initial.isConfirmed, true);

    const updated = rescheduleBookedAppointment(initial, {
      dateLabel: 'Fri 15',
      time: '11:30',
      askPartnerHelp: true,
    });

    assert.equal(updated.dateLabel, 'Fri 15');
    assert.equal(updated.time, '11:30');
    assert.equal(updated.location, DEFAULT_CLINIC_LOCATION);
    assert.equal(updated.isConfirmed, false);
    assert.equal(updated.askPartnerHelp, true);
    assert.equal(
      formatAppointmentScheduleLine(updated),
      'Fri 15 11:30 · Maternity clinic, level 2'
    );
  });

  it('provides Today 16:30 as the first booking option and multi-day slots', () => {
    assert.equal(BOOKING_DATE_CHOICES[0].label, 'Today');
    assert.equal(BOOKING_DATE_CHOICES[0].slots[0], '16:30');
    assert.ok(BOOKING_DATE_CHOICES.length >= 3);
    for (const day of BOOKING_DATE_CHOICES) {
      assert.ok(day.slots.length >= 3, `Expected at least 3 slots for ${day.label}`);
    }
  });
});
