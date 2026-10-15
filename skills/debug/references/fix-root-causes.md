# Fix root causes

Put the fix where the cause is, not where the symptom shows. Each workaround that stays in the code hides the real bug. It also makes the system harder to understand.

When: before a fix that adds a guard, a catch, or a comment that defends it. It applies also when the same cause can occur elsewhere, or when the failure shows only after a restart. The first items below confirm that steps 2 to 4 happened.

- Reproduce the bug first, and find the first cause: steps 2 and 3.
- Ask "why" until the answer is the cause itself, not another symptom.
- Add no guard that only hides the failure. A bare null guard or a catch-all around a crash hides the crash and fixes nothing.
- A workaround that needs a paragraph of comment to defend it shows that the code is wrong. Change the code, not the comment.
- Search the code for the same cause. Fix every instance of it, not only the one that failed.
- When you are stuck, add instrumentation, as step 4 does. Do not guess.
- After a restart-only failure, suspect stale stored state first: serialized state, caches, lock files, or config. When the failure stops after you clear a state file, validate that state where the code loads it.

Where it stops: other instances of the same cause are part of the fix and its slice. Flag unrelated problems that you find, but do not fix them. This keeps implement's diffs limited to their slice. Dead code in a file that the fix changes is not an unrelated problem: debug's step 6 deletes it. Offer a cause that is a design problem to drill, as the debug rule on design problems says. When two fixes that rest on one assumption failed, read [attack the premise](attack-the-premise.md).
