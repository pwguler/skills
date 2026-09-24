import type { Clock } from "./clock.ts";

/** Counts events per key inside a fixed window. */
export class FixedWindowCounter {
  private readonly counts = new Map<string, { start: number; count: number }>();
  private readonly windowMs: number;
  private readonly clock: Clock;

  constructor(windowMs: number, clock: Clock) {
    if (!Number.isFinite(windowMs) || windowMs <= 0) throw new RangeError("windowMs must be positive");
    this.windowMs = windowMs;
    this.clock = clock;
  }

  hit(key: string): number {
    const now = this.clock.now();
    const entry = this.counts.get(key);
    if (!entry || now - entry.start >= this.windowMs) {
      this.counts.set(key, { start: now, count: 1 });
      return 1;
    }
    entry.count += 1;
    return entry.count;
  }
}
