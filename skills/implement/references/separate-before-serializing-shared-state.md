# Separate before serializing shared state

When several actors that run at the same time can write one piece of changeable state, remove the sharing first. Serialize access by structure only when one common target is really necessary. Races on shared state happen at random, are hard to reproduce, and cost much to find.

When: two or more actors can read and write the same file, key, branch, database row, or state object. Actors are processes, tasks, workers, or agents.

- Find the shared changeable state. Examples are files that more than one actor reads and writes, and branches that more than one actor pushes to. An interface that one side defines while another side uses it is shared state too.
- Ask whether the actors need one canonical object, or whether each actor publishes independent facts. For independent facts, give each actor a file, key, branch, or directory that only it owns. Combine the results only where something reads or reports them. Two workers that each write their own field into one shared state file still share it. One state file for each worker removes the sharing.
- Serialize access by structure only when one shared target is a real invariant. Use a lockfile, phases that run in order, one owner that does every write, or an atomic compare-and-swap.
- A written instruction or a team convention is never concurrency control.
- A lock is a sign to examine the design. It is not the default answer.

Where it stops: this file applies to code that a slice writes, not to how sessions share a spec file. The implement rule on two operations that change the same data applies to data that stays shared. This file runs first, and asks whether the data must be shared at all. Work split across subagents already follows the parallel skill. It never sends agents that would touch the same files.
