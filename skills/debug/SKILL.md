---
name: debug
description: Find the root cause of a bug before fixing it. Use whenever the user says "fix", "broken", "not working", "error", "failing", or "bug", and whenever a bug, test failure, or unexpected behavior appears, before proposing any fix.
---

No fix before root cause. Symptoms are where the search starts, never where it ends.

Fast path: when the first cause is directly visible in the error output (the stack line points at it), skip the hypothesis loop but never the reproduction or the regression test. If the visible fix does not make the reproduction pass on the first try, the cause was not visible: run the full discipline.

1. Open a `todo` list with these steps as its items before you reproduce anything; when a `todo` list is already open, add them to it. Each step is its own item; a list of fewer than three items is not opened. A step you skip, as the fast path skips the hypothesis loop, stays as `skip: <reason>`; returning to an earlier step reopens its item and the ones after it.
2. Reproduce first. Build the smallest deterministic reproduction. If it cannot be reproduced, gather evidence (logs, inputs, versions) until it can; do not guess.
3. Read the actual error and trace it back to the first cause in the chain, not the nearest symptom.
4. Form one hypothesis. State it with the observation that would confirm or refute it, then get that observation before touching any fix: a log line, an assertion, a probe. Add instrumentation when the evidence is not already there; keep it minimal and reversible, and remove it once it has answered.
5. When two hypotheses compete, design the one observation that distinguishes them, rather than trying fixes in turn.
6. Fix the root cause. One fix at a time; another problem found on the way, such as a second bug, is flagged, not fixed. Before the fix goes in, delete the dead code in each file it changes, as `implement` does: functions, imports, and parameters no caller uses, branches no caller reaches, stale flags, and comments that restate the code or excuse a workaround, unless a non-goal fences them. Open [fix root causes](references/fix-root-causes.md) before a fix that adds a guard, a catch, or a comment defending it, when the same cause could recur elsewhere, or when the failure shows only after a restart.
7. Add the regression test that would have caught this: red on the old code, green on the fix.
8. Run the `verify` skill before claiming it is fixed. When the bug surfaced inside a slice, the reproduction and the regression test are this step's check; the full gate waits for the slice's commit.

Rules:

- No shotgun fixes, no "try this and see if it helps".
- Three refuted hypotheses in a row, or no reproduction reachable with the evidence available, stop the loop: report what was tried and which observation is missing, and let the user decide. Do not keep cycling.
- If the fix does not make the reproduction pass, the hypothesis was wrong: return to step 4, do not stack a second fix on top. When two failed fixes shared one assumption, open [attack the premise](references/attack-the-premise.md).
- If the root cause reveals a design problem, say so and offer to run `drill` on the redesign instead of burying a workaround.
- When finding the cause took more than one hypothesis, propose a cheap signal that stays on (a log line, a metric, an assertion) and would have exposed this cause right away; add it when the user agrees.
