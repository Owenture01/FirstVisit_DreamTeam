import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CUFF_ESCALATION_TIMELINE,
  MATERNITY_UNIT_DETAILS,
  bookEarlyReview,
  bookUrgentSlot,
  createInitialClinicianPhoneState,
  toggleCallUrgentPatient,
} from './escalationScenarios';

test('CUFF_ESCALATION_TIMELINE matches Scenario 26 escalation progression', () => {
  assert.equal(CUFF_ESCALATION_TIMELINE.length, 4);
  assert.deepEqual(
    CUFF_ESCALATION_TIMELINE.map((e) => ({ title: e.title, time: e.time, tone: e.tone })),
    [
      { title: 'Cuff reading sent', time: '21:10', tone: 'teal' },
      { title: 'Midwife Noura', time: '21:10', tone: 'teal' },
      { title: 'No reply in 15 min', time: '21:25', tone: 'amber' },
      { title: 'Dr. Layla replied', time: '21:31', tone: 'urgent' },
    ]
  );
  assert.equal(MATERNITY_UNIT_DETAILS.name, 'Maternity unit');
  assert.equal(MATERNITY_UNIT_DETAILS.driverNote, 'Ahmed was asked to drive you.');
});

test('bookUrgentSlot marks Sara A. 11:30 slot booked and logs once (idempotent)', () => {
  const initial = createInitialClinicianPhoneState();
  assert.equal(initial.isUrgentSlotBooked, false);
  assert.equal(initial.auditLog.length, 0);

  const booked = bookUrgentSlot(initial);
  assert.equal(booked.isUrgentSlotBooked, true);
  assert.equal(booked.auditLog.length, 1);
  assert.match(booked.auditLog[0], /Dr\. Aisyah booked 11:30/i);

  const bookedAgain = bookUrgentSlot(booked);
  assert.equal(bookedAgain.auditLog.length, 1);
});

test('toggleCallUrgentPatient toggles calling state and logs call initiation', () => {
  const initial = createInitialClinicianPhoneState();
  const calling = toggleCallUrgentPatient(initial);
  assert.equal(calling.isCallingUrgentPatient, true);
  assert.equal(calling.auditLog.length, 1);

  const ended = toggleCallUrgentPatient(calling);
  assert.equal(ended.isCallingUrgentPatient, false);
  assert.equal(ended.auditLog.length, 1);
});

test('bookEarlyReview books Aisha N. and leaves Mariam K. unchanged without mutating input', () => {
  const initial = createInitialClinicianPhoneState();
  assert.equal(initial.reviews.length, 2);
  assert.equal(initial.reviews[0].status, 'booked');
  assert.equal(initial.reviews[1].status, 'pending');

  const updated = bookEarlyReview(initial, 'aisha-n');
  assert.equal(initial.reviews[1].status, 'pending');
  assert.equal(updated.reviews[1].status, 'booked');
  assert.equal(updated.reviews[1].bookedLabel, 'Booked Thu 14:00');
  assert.equal(updated.auditLog.length, 1);
  assert.match(updated.auditLog[0], /Aisha N\./);

  const repeated = bookEarlyReview(updated, 'aisha-n');
  assert.equal(repeated.auditLog.length, 1);
});
