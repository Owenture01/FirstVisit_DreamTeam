import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_DUE_DATE,
  DEFAULT_SIMULATED_DATE,
  calculateGestationalProgress,
  getDateForGestationalWeek,
} from './gestationalAge';
import { BABY_SIZE_STAGES, getBabySizeStage } from '../data/babySizeStickers';

test('default simulated date yields Week 31 Day 4 (Coconut)', () => {
  const progress = calculateGestationalProgress(DEFAULT_SIMULATED_DATE, DEFAULT_DUE_DATE);
  assert.equal(progress.gestationalWeek, 31);
  assert.equal(progress.gestationalDay, 4);
  assert.equal(progress.daysRemaining, 59);
  assert.equal(getBabySizeStage(progress.stickerWeek).name, 'Coconut');
});

test('getDateForGestationalWeek roundtrips Week 9 Day 2 (Grape)', () => {
  const dateStr = getDateForGestationalWeek(DEFAULT_DUE_DATE, 9, 2);
  const progress = calculateGestationalProgress(dateStr, DEFAULT_DUE_DATE);
  assert.equal(progress.gestationalWeek, 9);
  assert.equal(progress.gestationalDay, 2);
  assert.equal(getBabySizeStage(progress.stickerWeek).name, 'Grape');
});

test('all 37 baby size stages (Weeks 4-40) have valid viewBox and 2 eye paths', () => {
  assert.equal(BABY_SIZE_STAGES.length, 37);
  assert.equal(getBabySizeStage(4).name, 'Poppy seed');
  assert.equal(getBabySizeStage(40).name, 'Small pumpkin');
  assert.equal(getBabySizeStage(2).week, 4);
  assert.equal(getBabySizeStage(42).week, 40);

  for (const stage of BABY_SIZE_STAGES) {
    assert.ok(stage.viewBox.endsWith('100 100'));
    const eyeCount = stage.elements.filter((el) => el.isEye).length;
    assert.equal(eyeCount, 2, `Expected 2 eyes for Week ${stage.week}`);
  }
});
