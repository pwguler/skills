import { test } from "node:test";
import assert from "node:assert/strict";
import { TokenBucket } from "../src/index.ts";

class Clock { t = 0; now() { return this.t; } }

test("AC-1 capacity then refuse", () => {
  const c = new Clock(); const b = new TokenBucket({ capacity: 3, refillPerSecond: 1 }, c);
  assert.deepEqual([b.take("k"), b.take("k"), b.take("k"), b.take("k")], [true, true, true, false]);
});
test("AC-2 refill rate and cap", () => {
  const c = new Clock(); const b = new TokenBucket({ capacity: 2, refillPerSecond: 2 }, c);
  b.take("k"); b.take("k"); assert.equal(b.take("k"), false);
  c.t += 500; assert.equal(b.take("k"), true); assert.equal(b.take("k"), false);
  c.t += 60_000; assert.equal(b.take("k"), true); assert.equal(b.take("k"), true); assert.equal(b.take("k"), false);
});
test("AC-3 all or nothing, RangeError", () => {
  const c = new Clock(); const b = new TokenBucket({ capacity: 3, refillPerSecond: 1 }, c);
  assert.equal(b.take("k", 4), false); assert.equal(b.take("k", 3), true); assert.equal(b.take("k"), false);
  for (const n of [0, -1, 1.5, NaN]) assert.throws(() => b.take("k", n), RangeError);
});
test("AC-4 keys independent", () => {
  const c = new Clock(); const b = new TokenBucket({ capacity: 1, refillPerSecond: 1 }, c);
  assert.equal(b.take("a"), true); assert.equal(b.take("b"), true); assert.equal(b.take("a"), false);
});
