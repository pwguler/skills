---
name: debug
description: Find the root cause of a bug before you fix it. Use when the user says "fix", "broken", "not working", "error", "failing", or "bug". Use it also when a bug, a test failure, or unexpected behavior appears, before you propose a fix.
---

Do not fix a bug before you know its root cause. The search starts at the symptom, but it does not end there.

Fast path: when the error output shows the first cause directly, skip the hypothesis steps. An example is a stack line that points at the cause. Do not skip the reproduction or the regression test. If the visible fix does not make the reproduction pass on the first try, the cause was not visible. Then do all the steps.

1. Before you reproduce the bug, create a `todo` list with these steps as its items. If a `todo` list already exists, add the steps to it. Each step is one item. When you skip a step, mark it `completed` and add `skip: <reason>` to its subject. The fast path skips the hypothesis steps this way. A completed item cannot open again. To go back to an earlier step, add that step and each step after it again as new items. Then delete the unfinished items that the new items replace.
2. Reproduce the bug first. Build the smallest reproduction that fails every time. If you cannot reproduce the bug, collect evidence until you can: logs, inputs, and versions. Do not guess.
3. Read the actual error. Find the first cause in the chain of causes, not the nearest symptom.
4. Make one hypothesis. Write it with the observation that would confirm it or refute it. Get that observation before you start a fix: a log line, an assertion, or a probe. If the evidence does not exist yet, add instrumentation. Keep the instrumentation small and easy to remove, and remove it when it has given its answer.
5. When two hypotheses compete, design one observation that shows which one is true. Do not try fixes one after another.
6. Fix the root cause, one fix at a time. Flag another problem that you find, such as a second bug, but do not fix it. Dead code is not another problem. Before the fix, delete the dead code in each file that the fix changes, as `implement` does. Do this also when the bug did not touch that code. Dead code is functions, imports, and parameters that no caller uses, and branches that no caller reaches. It is also stale flags, and validators that repeat a check that a boundary already did. It is also comments that repeat the code or excuse a workaround. Keep dead code that a non-goal puts out of scope. Read [fix root causes](references/fix-root-causes.md) before a fix that adds a guard, a catch, or a comment that defends it. Read it also when the same cause can occur elsewhere, or when the failure shows only after a restart.
7. Add the regression test that would have caught this bug. It fails on the old code and passes with the fix.
8. Run the `verify` skill before you say that the bug is fixed. When the bug appeared inside a slice, this step checks only the reproduction and the regression test. The full gate waits for the slice's commit.

Rules:

- Do not try several fixes at random to see if one helps.
- Stop the loop after three refuted hypotheses in a row. Stop it also when the available evidence cannot give a reproduction. Then report what you tried and which observation is missing, and let the user decide.
- If the fix does not make the reproduction pass, the hypothesis was wrong. Go back to step 4. Do not keep the failed fix and add a second fix. When two failed fixes shared one premise, read [attack the premise](references/attack-the-premise.md).
- If the root cause shows a design problem, say so. Offer to run `drill` on the redesign. Do not hide the problem under a workaround.
- When the cause took more than one hypothesis to find, propose a cheap signal that stays on. It is a log line, a metric, or an assertion that would have shown this cause at once. Add it when the user agrees.
