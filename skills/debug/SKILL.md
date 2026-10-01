---
name: debug
description: Find the root cause of a bug before fixing it. Use when behavior differs from what was expected and its cause is not yet known, such as a failing test, an error, a crash, a regression, or something the user calls "broken" or "not working". Not for a change whose cause is already stated, such as a typo fix or a named edit.
---

No fix before root cause. Symptoms are where the search starts, never where it ends.

Fast path: when the first cause is directly visible in the error output (the stack line points at it) or at the location the bug report names, skip the todo list and the hypothesis loop, but never the reproduction or the regression test. If the visible fix does not make the reproduction pass on the first try, the cause was not visible: run the full discipline.

1. Open a todo list (a checklist in the reply when the harness has no todo tool) with these steps as its items before you reproduce anything; when a todo list is already open, add them to it. Each step is its own item. A step you skip stays as `skip: <reason>`; returning to an earlier step reopens its item and the ones after it.
2. Reproduce first. Build the smallest deterministic reproduction. If it cannot be reproduced, gather evidence (logs, inputs, versions) until it can; do not guess.
3. Read the actual error and trace it back to the first cause in the chain, not the nearest symptom.
4. Form one hypothesis. State it with the observation that would confirm or refute it, then get that observation before touching any fix: a log line, an assertion, a probe. Add instrumentation when the evidence is not already there; keep it minimal and reversible, and remove it once it has answered.
5. When two hypotheses compete, design the one observation that distinguishes them, rather than trying fixes in turn.
6. Add the regression test that would have caught this and run it: red on the old code.
7. Fix the root cause until the regression test is green. One fix at a time. Unrelated problems found on the way get flagged, not fixed. Open [fix root causes](references/fix-root-causes.md) before a fix that adds a guard, a catch, or a comment defending it, when the same cause could recur elsewhere, or when the failure shows only after a restart.
8. Run the `verify` skill before claiming it is fixed. Inside a slice, the reproduction and the regression test are this step's check, and the full gate waits for the slice's commit; outside one, follow implement's rules on the branch question and the commit, then offer `land` once `verify` passes.

Rules:

- No shotgun fixes, no "try this and see if it helps".
- Three refuted hypotheses in a row, or no reproduction reachable with the evidence available, stop the loop: report what was tried and which observation is missing, and let the user decide. Do not keep cycling.
- If the fix does not make the reproduction pass, the hypothesis was wrong: return to step 4, do not stack a second fix on top. When two failed fixes shared one assumption, open [attack the premise](references/attack-the-premise.md).
- If the root cause reveals a design problem, say so and offer to run `drill` on the redesign instead of burying a workaround.
- Two or more failures are reproduced one by one and grouped by first cause: groups with separate causes go to `parallel`; a single group stays here.

Deep mode (the `deep` skill is active): full discipline always.
