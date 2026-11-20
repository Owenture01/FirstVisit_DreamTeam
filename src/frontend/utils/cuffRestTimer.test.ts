import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CUFF_PREP_STEPS,
  CUFF_REST_INITIAL_SECONDS,
  CUFF_REST_TOTAL_SECONDS,
  formatCuffCountdown,
  getCuffActionButtonLabel,
  getCuffRemainingRatio,
  getRingDashOffset,
  tickCuffCountdown,
} from './cuffRestTimer';

test('formatCuffCountdown formats minutes and zero-padded seconds safely', () => {
  assert.equal(formatCuffCountdown(CUFF_REST_INITIAL_SECONDS), '4:12');
  assert.equal(formatCuffCountdown(CUFF_REST_TOTAL_SECONDS), '5:00');
  assert.equal(formatCuffCountdown(65), '1:05');
  assert.equal(formatCuffCountdown(9), '0:09');
  assert.equal(formatCuffCountdown(0), '0:00');
  assert.equal(formatCuffCountdown(-12), '0:00');
});

test('tickCuffCountdown decrements cleanly and clamps at zero', () => {
  assert.equal(tickCuffCountdown(252), 251);
  assert.equal(tickCuffCountdown(2), 1);
  assert.equal(tickCuffCountdown(1), 0);
  assert.equal(tickCuffCountdown(0), 0);
  assert.equal(tickCuffCountdown(-5), 0);
});

test('getCuffRemainingRatio and getRingDashOffset clamp between 0 and 1', () => {
  assert.equal(getCuffRemainingRatio(300, 300), 1);
  assert.equal(getCuffRemainingRatio(150, 300), 0.5);
  assert.equal(getCuffRemainingRatio(0, 300), 0);
  assert.equal(getCuffRemainingRatio(999, 300), 1);
  assert.equal(getCuffRemainingRatio(-10, 300), 0);

  const circumference = 200;
  assert.equal(getRingDashOffset(circumference, 300, 300), 0);
  assert.equal(getRingDashOffset(circumference, 150, 300), 100);
  assert.equal(getRingDashOffset(circumference, 0, 300), 200);
});

test('getCuffActionButtonLabel switches cleanly at zero', () => {
  assert.equal(getCuffActionButtonLabel(252), 'Measure again in 4:12');
  assert.equal(getCuffActionButtonLabel(1), 'Measure again in 0:01');
  assert.equal(getCuffActionButtonLabel(0), 'Measure again now');
});

test('CUFF_PREP_STEPS lists all 4 preparation instructions in order', () => {
  assert.equal(CUFF_PREP_STEPS.length, 4);
  assert.deepEqual(
    CUFF_PREP_STEPS.map((s) => s.number),
    [1, 2, 3, 4]
  );
  assert.equal(CUFF_PREP_STEPS[0].text, 'Sit with your back supported');
  assert.equal(CUFF_PREP_STEPS[3].text, 'Stay quiet while it measures');
});
