import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_TODAY_DOSES,
  INITIAL_WEEK_DOTS,
  markDoseTaken,
  toggleDoseStatus,
  computeCareDoseSummary,
} from './careMedicines';

test('initial state matches Care medicines reference values', () => {
  const summary = computeCareDoseSummary(INITIAL_TODAY_DOSES);
  assert.equal(summary.nextDose?.name, 'Aspirin');
  assert.equal(summary.nextDose?.time, '20:00');
  assert.equal(summary.takenThisWeek, 13);
  assert.equal(summary.totalThisWeek, 14);
  assert.equal(summary.missedSummary, '1 missed on Tuesday.');
  assert.equal(INITIAL_WEEK_DOTS.length, 7);
  assert.equal(INITIAL_WEEK_DOTS[5].state, 'missed');
});

test('toggling Due Aspirin updates nextDose and weekly taken count', () => {
  const afterTake = toggleDoseStatus(INITIAL_TODAY_DOSES, 'aspirin');
  const summary = computeCareDoseSummary(afterTake);

  assert.equal(afterTake[2].status, 'taken');
  assert.equal(summary.nextDose, null);
  assert.equal(summary.takenThisWeek, 14);
  assert.equal(summary.totalThisWeek, 15);

  const afterUndo = toggleDoseStatus(afterTake, 'aspirin');
  const reverted = computeCareDoseSummary(afterUndo);
  assert.equal(afterUndo[2].status, 'due');
  assert.equal(reverted.nextDose?.name, 'Aspirin');
  assert.equal(reverted.takenThisWeek, 13);
  assert.equal(reverted.totalThisWeek, 14);
});

test('markDoseTaken is idempotent when called multiple times', () => {
  const once = markDoseTaken(INITIAL_TODAY_DOSES, 'aspirin');
  const twice = markDoseTaken(once, 'aspirin');
  assert.equal(once[2].status, 'taken');
  assert.equal(once[2].badgeText, 'Hana 20:00');
  assert.equal(twice[2].status, 'taken');
  assert.equal(computeCareDoseSummary(twice).takenThisWeek, 14);
});
