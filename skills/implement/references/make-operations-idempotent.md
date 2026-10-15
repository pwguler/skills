# Make operations idempotent

Every operation that changes state reaches the correct end state. This is true however many times it runs, and wherever an earlier run stopped. Commands, lifecycle steps, and processing loops run among crashes, restarts, and retries. When leftover state changes the result of the next run, each restart becomes a debug session.

When: you design a command, a startup or shutdown step, a scheduler, or a loop that writes state. It applies also when you list the ways that a slice can fail.

- Work out each step from the state that is there now, not from the plan of the last run. Look at the present state, compare it with the target, and apply only the gap. Then a repeat run has nothing to do.
- The next run must be able to tell that a leftover is stale. Leftovers include locks, temp files, records written halfway, and jobs that a run claimed.
- Base that decision on facts that hold wherever the last run stopped, not only in the normal case. If the next run cannot judge a leftover, every crash needs cleanup by hand.
- Two methods help. Write a file under a temporary name, and rename it when it is complete. Then a half-written file never has the final name. Compare leftovers by content, not by their creation order.
- Ask three questions about each operation that changes state. What happens when it runs twice in a row? What happens when the last run crashed at each possible point? Does each run reach the same end state?
- When an answer is "that depends on what the last run left", add a reconciliation step. It examines the leftovers and settles them first.
- The operation passes when each run reaches the same end state.
- A retried write has an idempotency key, as the implement rule on network calls requires. This file applies the same guarantee to local state, restarts, and partial runs.

Where it stops: a second run and a crash in the middle are failure modes for the slice's list. Test them when the cost is lost or doubled data. Two actors that write the same state at the same time are a different question. [Separate-before-serializing-shared-state](separate-before-serializing-shared-state.md) answers it.
