---
name: debug
description: Find the root cause of a bug before fixing it. Use when a bug, test failure, or unexpected behavior appears, before proposing any fix.
---

No fix before root cause. Symptoms are where the search starts, never where it ends.

Fast path: when the first cause is directly visible in the error output (the stack line points at it), skip the hypothesis loop but never the reproduction or the regression test. If the visible fix does not make the reproduction pass on the first try, the cause was not visible: run the full discipline. Deep mode (the `deep` skill is active): full discipline always.

1. Reproduce first. Build the smallest deterministic reproduction. If it cannot be reproduced, gather evidence (logs, inputs, versions) until it can; do not guess.
2. Read the actual error and trace it back to the first cause in the chain, not the nearest symptom.
3. Form one hypothesis. State it with the observation that would confirm or refute it, then get that observation before touching any fix: a log line, an assertion, a probe. Add instrumentation when the evidence is not already there; keep it minimal and reversible, and remove it once it has answered.
4. When two hypotheses compete, design the one observation that distinguishes them, rather than trying fixes in turn.
5. Fix the root cause. One fix at a time.
6. Add the regression test that would have caught this: red on the old code, green on the fix.
7. Run the `verify` skill before claiming it is fixed.

Rules:

- No shotgun fixes, no "try this and see if it helps".
- If the fix does not make the reproduction pass, the hypothesis was wrong: return to step 3, do not stack a second fix on top.- If the root cause reveals a design problem, say so and offer the `architecture` skill instead of burying a workaround.
