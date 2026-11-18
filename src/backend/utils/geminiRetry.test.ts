import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyGeminiError,
  executeCompanionWithFallback,
} from './geminiRetry';

describe('geminiRetry', () => {
  it('succeeds on primary model when first retry recovers from transient 503', async () => {
    const calls: string[] = [];
    const result = await executeCompanionWithFallback(
      async (cfg) => {
        calls.push(cfg.model);
        if (calls.length === 1) {
          throw new Error('{"error":{"code":503,"status":"UNAVAILABLE"}}');
        }
        return 'Warm ginger tea is generally safe in moderation.';
      },
      { attemptsPerModel: 2, baseDelayMs: 0, sleep: async () => {} }
    );

    assert.equal(result.modelUsed, 'gemini-4-hydrogen');
    assert.deepEqual(calls, ['gemini-4-hydrogen', 'gemini-4-hydrogen']);
    assert.match(result.text, /ginger tea/i);
  });

  it('falls back to gemini-3.1-flash-lite when primary model stays 503 UNAVAILABLE', async () => {
    const calls: string[] = [];
    const result = await executeCompanionWithFallback(
      async (cfg) => {
        calls.push(cfg.model);
        if (cfg.model === 'gemini-4-hydrogen') {
          throw new Error(
            '{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}'
          );
        }
        return 'Here is your medication reminder from Dr. Layla.';
      },
      { attemptsPerModel: 2, baseDelayMs: 0, sleep: async () => {} }
    );

    assert.equal(result.modelUsed, 'gemini-3.1-flash-lite');
    assert.deepEqual(calls, [
      'gemini-4-hydrogen',
      'gemini-4-hydrogen',
      'gemini-3.1-flash-lite',
    ]);
  });

  it('stops immediately without fallback on non-retryable 403 API_KEY_INVALID error', async () => {
    const calls: string[] = [];
    await assert.rejects(
      () =>
        executeCompanionWithFallback(
          async (cfg) => {
            calls.push(cfg.model);
            throw new Error('403 PERMISSION_DENIED: API_KEY_INVALID');
          },
          { attemptsPerModel: 2, baseDelayMs: 0, sleep: async () => {} }
        ),
      /API_KEY_INVALID/
    );

    assert.deepEqual(calls, ['gemini-4-hydrogen']);
  });

  it('fails over immediately without retrying primary on timeout error', async () => {
    const calls: string[] = [];
    const result = await executeCompanionWithFallback(
      async (cfg) => {
        calls.push(cfg.model);
        if (cfg.model === 'gemini-4-hydrogen') {
          const timeoutErr = new Error('The operation timed out');
          timeoutErr.name = 'TimeoutError';
          throw timeoutErr;
        }
        return 'Stay hydrated and rest on your side.';
      },
      { attemptsPerModel: 2, baseDelayMs: 0, sleep: async () => {} }
    );

    assert.equal(result.modelUsed, 'gemini-3.1-flash-lite');
    assert.deepEqual(calls, ['gemini-4-hydrogen', 'gemini-3.1-flash-lite']);
  });

  it('classifies 503 UNAVAILABLE as HTTP 503 SERVICE_UNAVAILABLE', () => {
    const classified = classifyGeminiError(
      '{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}'
    );
    assert.equal(classified.httpStatus, 503);
    assert.equal(classified.code, 'SERVICE_UNAVAILABLE');
    assert.match(classified.userMessage, /high demand/i);
  });
});
