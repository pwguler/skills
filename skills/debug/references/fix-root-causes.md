# Fix root causes

Fix a bug at its root cause, not at its symptom. A symptom is the point where bad state first becomes visible. The root cause is the earliest wrong action of the system, or an allowed state that it did not handle. A fix at the symptom hides the evidence. The cause stays, and it can show up again in a new place. The code also keeps a workaround for a bug that has no name.

When: before a fix that adds a guard, a catch, or a comment that defends it. It applies also when the same cause can occur elsewhere, or when the failure shows only after a restart. The first items below confirm that steps 2 to 4 happened.

- Reproduce the bug first, and find the first cause: steps 2 and 3.
- Keep asking "why". Stop at a decision in the code that was wrong itself, not one that only followed from an earlier error.
- Ask if the state behind the symptom is allowed. If the system is allowed to reach that state, the code that failed on it is wrong. Handle the state in that code.
- If the state must never occur, find the code that produced it, and fix it there. At the failure point, a guard, retry, ignored error, clamped value, or discarded state only hides the bug.
- A workaround that needs a paragraph of comment to defend it shows that the code is wrong. Change the code, not the comment.
- Search the code for the same cause. Fix every instance of it, not only the one that failed.
- When you are stuck, add instrumentation, as step 4 does. Look at the real error and the real state, and do not guess.
- When a failure shows only after a restart, suspect stored state first: serialized state, caches, lock files, or config.

Where it stops: other instances of the same cause are part of the fix and its slice. Flag unrelated problems that you find, but do not fix them. This keeps implement's diffs limited to their slice. Dead code in a file that the fix changes is not an unrelated problem: debug's step 6 deletes it. Offer a cause that is a design problem to drill, as the debug rule on design problems says. When two fixes that rest on one premise failed, read [attack the premise](attack-the-premise.md).
