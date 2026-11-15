import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateBloodPressure, evaluateFetalHeartRate, calculateKickProgress } from './healthLogic';

test('blood pressure evaluation flags stage 2 urgent hypertension correctly', () => {
  assert.equal(evaluateBloodPressure(162, 112), 'stage2_urgent');
  assert.equal(evaluateBloodPressure(128, 82), 'normal');
  assert.equal(evaluateBloodPressure(118, 76), 'normal');
  assert.equal(evaluateBloodPressure(145, 88), 'stage1');
  assert.equal(evaluateBloodPressure(122, 75), 'elevated');
});

test('fetal heart rate flags reassuring reference range between 110 and 160 bpm', () => {
  assert.equal(evaluateFetalHeartRate(138), 'normal');
  assert.equal(evaluateFetalHeartRate(155), 'normal');
  assert.equal(evaluateFetalHeartRate(95), 'bradycardia');
  assert.equal(evaluateFetalHeartRate(175), 'tachycardia');
});

test('fetal kick counter calculations handle target progress and remaining counts', () => {
  const result = calculateKickProgress(8, 10);
  assert.equal(result.progressPercentage, 80);
  assert.equal(result.isGoalMet, false);
  assert.equal(result.remainingKicks, 2);

  const goalMet = calculateKickProgress(10, 10);
  assert.equal(goalMet.progressPercentage, 100);
  assert.equal(goalMet.isGoalMet, true);
  assert.equal(goalMet.remainingKicks, 0);
});
