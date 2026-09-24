import { test } from "node:test";
import assert from "node:assert/strict";
import { FixedWindowCounter } from "../src/window.ts";
import { FakeClock } from "./fake-clock.ts";

test("counts hits per key inside the window", () => {
  const clock = new FakeClock();
  const w = new FixedWindowCounter(1000, clock);
  assert.equal(w.hit("a"), 1);
  assert.equal(w.hit("a"), 2);
  assert.equal(w.hit("b"), 1);
});

test("a new window starts the count over", () => {
  const clock = new FakeClock();
  const w = new FixedWindowCounter(1000, clock);
  w.hit("a");
  clock.advance(1000);
  assert.equal(w.hit("a"), 1);
});
