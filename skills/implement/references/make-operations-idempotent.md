# Make operations idempotent

Every operation that changes state converges on the correct end state however many times it runs and wherever a previous run stopped. Commands, lifecycle steps, and processing loops live among crashes, restarts, and retries.

When: designing a write a caller may retry, a command, a startup or shutdown step, a scheduler, or a loop that writes state, and when listing the ways a slice can fail.

- Ask two questions of each state-changing operation: what happens when it runs twice in a row, and what happens when the run before it died partway through, at each point it could have died?
- Startup converges: it scans for state already present, clears stale leftovers, and adopts sessions that are still alive.
- Cleanup compares by content, never by which thing was created first.
- A lock heals itself: a lock whose holder no longer runs is detected as stale and reclaimed.
- Scheduling is repeatable: failed work respawns cleanly, and fresh input is regenerated after every cycle.
- A write a caller may retry carries an idempotency key; this file extends the same guarantee to local state, restarts, and partial runs.
- The operation passes when rerunning it reaches the same end state. When the honest answer is "that depends on what the last run left behind", add a reconciliation step that inspects the leftovers and settles them first.

Where it stops: a rerun and a crash midway are failure modes for the slice's list; test them when losing or doubling data is the cost. Two actors writing the same state at once is a separate question, answered by [separate-before-serializing-shared-state](separate-before-serializing-shared-state.md).
