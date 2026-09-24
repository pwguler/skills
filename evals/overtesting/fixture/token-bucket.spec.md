# token-bucket

## Goal
Add a `TokenBucket` limiter: each Key holds up to `capacity` tokens that refill continuously, and a call spends tokens or is refused.

## Non-goals
- No change to `FixedWindowCounter`.
- No persistence, no shared state across processes, no timers.

## Acceptance criteria
- AC-1: `new TokenBucket({ capacity, refillPerSecond }, clock).take(key)` returns `true` for the first `capacity` calls on a fresh Key and `false` after that, with the clock unmoved.
- AC-2: tokens refill at `refillPerSecond` measured on the injected `Clock`, and a Key never holds more than `capacity` tokens.
- AC-3: `take(key, n)` spends `n` tokens at once, all or nothing; `n` that is not a positive integer throws `RangeError`.
- AC-4: Keys are independent: spending on one Key never changes another.
- AC-5: `TokenBucket` is exported from `src/index.ts` and listed in `README.md`.

## Verification
- `npm test`
- `npm run typecheck`
