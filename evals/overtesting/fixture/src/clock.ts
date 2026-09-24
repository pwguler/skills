/** Milliseconds since an arbitrary origin. Only differences are meaningful. */
export interface Clock {
  now(): number;
}

export const systemClock: Clock = { now: () => performance.now() };
