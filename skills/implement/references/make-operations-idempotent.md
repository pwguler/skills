# Make operations idempotent

Every operation that changes state reaches the correct end state. This is true however many times it runs, and wherever an earlier run stopped. Commands, lifecycle steps, and processing loops must survive crashes, restarts, and retries.

When: you design a command, a startup or shutdown step, a scheduler, or a loop that writes state. It applies also when you list the ways that a slice can fail.

- Ask two questions about each operation that changes state. What happens when it runs twice in a row? What happens when the run before it stopped partway, at each point where it could stop?
- Startup reaches the correct state. It scans for state that is already present, removes stale leftovers, and takes over sessions that are still alive.
- Cleanup compares by content, never by which item was created first.
- A lock repairs itself. When the holder of a lock no longer runs, the system finds the lock stale and takes it back.
- Scheduling can repeat. Failed work starts again cleanly, and the system makes new input after every cycle.
- A retried write has an idempotency key, as the implement rule on network calls requires. This file applies the same guarantee to local state, restarts, and partial runs.
- The operation passes when a second run reaches the same end state. Sometimes the honest answer is "that depends on what the last run left". Then add a reconciliation step that examines the leftovers and settles them first.

Where it stops: a second run and a crash in the middle are failure modes for the slice's list. Test them when the cost is lost or doubled data. Two actors that write the same state at the same time are a different question. [Separate-before-serializing-shared-state](separate-before-serializing-shared-state.md) answers it.
