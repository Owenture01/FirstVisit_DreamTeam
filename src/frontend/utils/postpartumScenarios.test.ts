import test from 'node:test';
import assert from 'node:assert/strict';
import {
  POSTPARTUM_CHECK_DAYS,
  POSTPARTUM_HANDOVER_ITEMS,
  buildPostpartumSummaryText,
  createInitialPostpartumBpState,
  getPostpartumDayStatus,
  getPostpartumProgressBadge,
  toggleEveningCheck,
} from './postpartumScenarios';

test('postpartum day 5 initial BP state and badge progress', () => {
  const initial = createInitialPostpartumBpState();
  assert.equal(initial.morningReading, '134/86');
  assert.equal(initial.morningTime, '8:10');
  assert.equal(initial.eveningLogged, false);
  assert.equal(getPostpartumProgressBadge(initial.eveningLogged), '1 of 2 done');

  const afterEvening = toggleEveningCheck(initial);
  assert.equal(afterEvening.eveningLogged, true);
  assert.equal(getPostpartumProgressBadge(afterEvening.eveningLogged), '2 of 2 done');
  assert.equal(initial.eveningLogged, false);
});

test('days 3 to 10 chip statuses reflect day 5 progress before and after evening check', () => {
  assert.deepEqual(POSTPARTUM_CHECK_DAYS, [3, 4, 5, 6, 7, 8, 9, 10]);

  assert.equal(getPostpartumDayStatus(3, 5, false), 'done');
  assert.equal(getPostpartumDayStatus(4, 5, false), 'done');
  assert.equal(getPostpartumDayStatus(5, 5, false), 'current');
  assert.equal(getPostpartumDayStatus(6, 5, false), 'upcoming');

  assert.equal(getPostpartumDayStatus(5, 5, true), 'done');
  assert.equal(getPostpartumDayStatus(6, 5, true), 'upcoming');
});

test('week 6 handover items and downloadable summary include required clinical details', () => {
  assert.equal(POSTPARTUM_HANDOVER_ITEMS.length, 2);
  assert.equal(POSTPARTUM_HANDOVER_ITEMS[0].title, 'Dr. Salma, family doctor');
  assert.equal(POSTPARTUM_HANDOVER_ITEMS[1].title, 'Yearly upper-arm cuff BP check');

  const summary = buildPostpartumSummaryText();
  assert.match(summary, /124\/80/);
  assert.match(summary, /Dr\. Salma/);
  assert.match(summary, /24 Dec/);
  assert.match(summary, /Yearly upper-arm cuff BP check/);
  assert.match(summary, /Mariam/);
});
