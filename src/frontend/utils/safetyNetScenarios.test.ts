import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BAND_TROUBLESHOOT_STEPS,
  createInitialOfflineQueue,
  countWaitingItems,
  syncOfflineQueue,
  addOfflineKickRecord,
} from './safetyNetScenarios';

test('band troubleshooting lists the 3 ordered steps from Scenario 27', () => {
  assert.equal(BAND_TROUBLESHOOT_STEPS.length, 3);
  assert.deepEqual(
    BAND_TROUBLESHOOT_STEPS.map((s) => s.stepNumber),
    [1, 2, 3]
  );
  assert.match(BAND_TROUBLESHOOT_STEPS[0].text, /belly button/i);
  assert.match(BAND_TROUBLESHOOT_STEPS[1].text, /3 s/i);
  assert.match(BAND_TROUBLESHOOT_STEPS[2].text, /5 m/i);
});

test('initial offline queue contains 3 waiting readings', () => {
  const queue = createInitialOfflineQueue();
  assert.equal(queue.length, 3);
  assert.equal(countWaitingItems(queue), 3);
  assert.equal(queue[0].value, '136/86');
  assert.equal(queue[1].value, 'Kicks 10');
  assert.equal(queue[2].value, 'HR 90');
});

test('syncOfflineQueue marks all waiting items as sent without mutating input', () => {
  const initial = createInitialOfflineQueue();
  const synced = syncOfflineQueue(initial);
  assert.equal(countWaitingItems(initial), 3);
  assert.equal(countWaitingItems(synced), 0);
  assert.ok(synced.every((item) => item.status === 'sent'));
});

test('addOfflineKickRecord prepends a waiting reading offline and sent reading online', () => {
  const initial = createInitialOfflineQueue();
  const offlineUpdated = addOfflineKickRecord(initial, 4, '20:18', false);
  assert.equal(offlineUpdated.length, 4);
  assert.equal(offlineUpdated[0].value, 'Kicks 4');
  assert.equal(offlineUpdated[0].detail, 'Count · 20:18');
  assert.equal(offlineUpdated[0].status, 'waiting');
  assert.equal(countWaitingItems(offlineUpdated), 4);

  const onlineUpdated = addOfflineKickRecord(syncOfflineQueue(initial), 6, '20:22', true);
  assert.equal(onlineUpdated[0].status, 'sent');
  assert.equal(countWaitingItems(onlineUpdated), 0);
});
