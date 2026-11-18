export interface CompanionModelAttempt {
  model: 'gemini-4-hydrogen' | 'gemini-3.1-flash-lite';
  useLowThinking: boolean;
}

export const COMPANION_MODEL_CHAIN: CompanionModelAttempt[] = [
  { model: 'gemini-4-hydrogen', useLowThinking: true },
  { model: 'gemini-3.1-flash-lite', useLowThinking: false },
];

export type ClassifiedGeminiErrorCode =
  | 'API_KEY_INVALID'
  | 'RATE_LIMITED'
  | 'SERVICE_UNAVAILABLE'
  | 'GEMINI_UPSTREAM_ERROR';

export interface ClassifiedGeminiError {
  httpStatus: number;
  code: ClassifiedGeminiErrorCode;
  userMessage: string;
}

export function isNonRetryableGeminiError(errorMessage: string): boolean {
  const upper = errorMessage.toUpperCase();
  return (
    upper.includes('400') ||
    upper.includes('403') ||
    upper.includes('PERMISSION_DENIED') ||
    upper.includes('API_KEY_INVALID') ||
    upper.includes('INVALID_ARGUMENT')
  );
}

export function isTimeoutOrAbortError(err: unknown): boolean {
  if (err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
    return true;
  }
  const msg = (err instanceof Error ? err.message : String(err)).toUpperCase();
  return (
    msg.includes('TIMEOUT') ||
    msg.includes('TIMED OUT') ||
    msg.includes('ABORTED') ||
    msg.includes('ETIMEDOUT')
  );
}

export function isModelUnavailableOrOverloadedError(errorMessage: string): boolean {
  const upper = errorMessage.toUpperCase();
  return (
    upper.includes('503') ||
    upper.includes('UNAVAILABLE') ||
    upper.includes('HIGH DEMAND') ||
    upper.includes('OVERLOADED') ||
    upper.includes('429') ||
    upper.includes('RESOURCE_EXHAUSTED') ||
    upper.includes('NOT_FOUND') ||
    upper.includes('404')
  );
}

export function classifyGeminiError(errorMessage: string): ClassifiedGeminiError {
  const upper = errorMessage.toUpperCase();

  if (
    upper.includes('403') ||
    upper.includes('PERMISSION_DENIED') ||
    upper.includes('API_KEY_INVALID')
  ) {
    return {
      httpStatus: 502,
      code: 'API_KEY_INVALID',
      userMessage:
        'Hana could not verify the AI service credentials. Please check Settings > Secrets, or press Help if this is urgent.',
    };
  }

  if (upper.includes('429') || upper.includes('RESOURCE_EXHAUSTED')) {
    return {
      httpStatus: 429,
      code: 'RATE_LIMITED',
      userMessage:
        'Hana is busy right now. Please wait a moment and try again, or press Help if this is urgent.',
    };
  }

  if (
    upper.includes('503') ||
    upper.includes('UNAVAILABLE') ||
    upper.includes('HIGH DEMAND') ||
    upper.includes('OVERLOADED') ||
    upper.includes('TIMEOUT') ||
    upper.includes('TIMED OUT') ||
    upper.includes('ABORTED')
  ) {
    return {
      httpStatus: 503,
      code: 'SERVICE_UNAVAILABLE',
      userMessage:
        "Hana's AI service is temporarily busy due to high demand. Please tap Retry in a moment, or press Help if you have urgent symptoms.",
    };
  }

  return {
    httpStatus: 500,
    code: 'GEMINI_UPSTREAM_ERROR',
    userMessage:
      'Unable to reach Hana right now. Please tap Retry, or press Help if you have urgent symptoms.',
  };
}

export interface ExecuteWithFallbackOptions {
  attemptsPerModel?: number;
  baseDelayMs?: number;
  sleep?: (ms: number) => Promise<void>;
}

export interface ExecuteWithFallbackResult {
  text: string;
  modelUsed: string;
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function executeCompanionWithFallback(
  invokeModel: (attempt: CompanionModelAttempt) => Promise<string>,
  options: ExecuteWithFallbackOptions = {}
): Promise<ExecuteWithFallbackResult> {
  const attemptsPerModel = options.attemptsPerModel ?? 2;
  const baseDelayMs = options.baseDelayMs ?? 600;
  const sleep = options.sleep ?? defaultSleep;

  let lastError: unknown = new Error('Empty response from Gemini model');
  let primaryError: unknown = null;

  for (let i = 0; i < COMPANION_MODEL_CHAIN.length; i++) {
    const modelConfig = COMPANION_MODEL_CHAIN[i];
    for (let attempt = 1; attempt <= attemptsPerModel; attempt++) {
      try {
        const text = (await invokeModel(modelConfig)).trim();
        if (text) {
          return { text, modelUsed: modelConfig.model };
        }
        lastError = new Error(`Empty response from ${modelConfig.model}`);
      } catch (err: unknown) {
        lastError = err;
        if (i === 0) {
          primaryError = err;
        }
        const msg = err instanceof Error ? err.message : String(err);

        if (isNonRetryableGeminiError(msg)) {
          throw err;
        }

        // Do not spend another slow timeout on the same stalled model; fail over immediately
        if (isTimeoutOrAbortError(err)) {
          break;
        }

        if (attempt < attemptsPerModel) {
          const jitter = Math.floor(Math.random() * 200);
          await sleep(baseDelayMs * attempt + jitter);
          continue;
        }
        break;
      }

      if (attempt < attemptsPerModel) {
        await sleep(baseDelayMs * attempt);
      }
    }
  }

  const finalMsg = (lastError instanceof Error ? lastError.message : String(lastError)).toUpperCase();
  if (
    primaryError &&
    (finalMsg.includes('404') || finalMsg.includes('NOT_FOUND'))
  ) {
    throw primaryError instanceof Error ? primaryError : new Error(String(primaryError));
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
