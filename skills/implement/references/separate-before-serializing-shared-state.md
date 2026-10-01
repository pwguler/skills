# Separate before serializing shared state

If several actors running at once could write one piece of mutable state, remove the sharing first, and serialize access by structure only when a single common target is truly required. Races on shared state are intermittent, hard to reproduce, and costly to track down.

When: two operations run on one record, or two or more actors (processes, tasks, workers, agents) could read and write the same file, key, branch, record, or state object.

- Find the shared mutable state: files that more than one actor both reads and writes, branches more than one actor pushes to, interfaces one side defines while another consumes them.
- Ask whether the actors need one canonical object or are each publishing independent facts. For independent facts, hand every actor a file, key, branch, or directory it alone owns, and combine them only where the results are read or reported. Two workers each writing their own field into one shared state file still share it; one state file per worker does not.
- Only when a single shared target is a real invariant, serialize access by structure: a lockfile, phases that run in order, a single owner that performs every write, or an atomic compare-and-swap.
- Every interleaving of two operations on the same record is correct: a check made before an `await` is stale after it, so re-check it there or run that record's operations one at a time.
- A written instruction or a team convention is never concurrency control.
- Reaching for a lock is a design smell to examine, not the default answer.

Where it stops: it governs the code a slice writes, not how sessions share a spec file; work split across subagents already follows the parallel skill, which never dispatches agents that would touch the same files.
