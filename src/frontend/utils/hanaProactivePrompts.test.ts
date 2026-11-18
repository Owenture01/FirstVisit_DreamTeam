import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getProactivePromptsForWeek,
  getNextPromptIndex,
} from './hanaProactivePrompts';

test('getProactivePromptsForWeek includes prescription, exercise, and stage-appropriate prompts', () => {
  const week31Prompts = getProactivePromptsForWeek(31);
  assert.ok(week31Prompts.length >= 6);
  assert.equal(week31Prompts[0].id, 'aspirin-2000');
  assert.equal(week31Prompts[0].linkedDoseId, 'aspirin');
  assert.ok(week31Prompts.some((p) => p.category === 'exercise'));
  assert.ok(week31Prompts.some((p) => p.category === 'prescription'));
  assert.ok(week31Prompts.some((p) => p.category === 'fetal_movement'));

  const week9Prompts = getProactivePromptsForWeek(9);
  assert.ok(!week9Prompts.some((p) => p.id === 'kicks-check'));
});

test('getNextPromptIndex wraps around safely', () => {
  assert.equal(getNextPromptIndex(0, 8), 1);
  assert.equal(getNextPromptIndex(7, 8), 0);
  assert.equal(getNextPromptIndex(2, 0), 0);
});
