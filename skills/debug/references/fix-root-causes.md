# Fix root causes

A fix goes where the cause lives, never where the symptom shows. Each workaround left in place hides the real bug and makes the system harder to reason about.

When: step 6, as the fix is about to be written; the first bullets confirm that steps 2 to 4 happened.

- Reproduce first and trace back to the first cause: steps 2 and 3.
- Keep asking why until the answer is the cause itself, not another symptom.
- No guard that only silences the failure: a bare null guard or catch-all around a crash hides the crash and fixes nothing.
- A workaround that needs a paragraph of comment to defend it marks wrong code: change the code, not the comment.
- Search the code for the same cause and fix every instance of it, not only the one that failed.
- Stuck means instrument, not guess: step 4.
- A failure that shows only after a restart points first at stale persistent state: config files, caches, lock files, serialized state. When clearing a state file brings the behavior back, the fix validates that state where it is loaded.

Where it stops: other instances of the same cause belong to the fix and its slice; unrelated problems found on the way get flagged, not fixed, which keeps implement's diffs surgical. A cause that is a design problem is offered to drill, per the rule on design problems. When two fixes built on one assumption have failed, open [attack the premise](attack-the-premise.md).
