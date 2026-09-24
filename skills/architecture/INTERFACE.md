# Alternative Interfaces

The first interface that comes to mind is rarely the best one. When the user wants options for a picked candidate, produce several designs independently, then compare them. Terms follow [LANGUAGE.md](LANGUAGE.md); dependency rows follow [DEPENDENCIES.md](DEPENDENCIES.md).

1. **Set the problem for the user.** In plain words: what every design must satisfy, what the module depends on and which DEPENDENCIES row each dependency sits in, and a throwaway code sketch that makes those limits concrete. The sketch is not a proposal. Post it and start the designs without waiting; the user reads while they run.

2. **Produce at least three designs, each under a different pressure.** Add more when a constraint of the problem suggests one.
   - Fewest entry points: one to three, each carrying as much behavior as it can.
   - Widest reach: serve many kinds of caller and leave room for extension.
   - Easiest common call: the usual case is one line with no options.
   - Ports first, when the module has remote dependencies: every crossing goes through a port.

   Each design pass gets its own brief, separate from the user's framing: the files, how the pieces couple today, each dependency's row, what must hide behind the seam, and the vocabulary of LANGUAGE.md and `CONTEXT.md`. Run the passes as parallel subagents when the harness dispatches them. Otherwise run them in turn, write each down before starting the next, and do not reread earlier designs: independence is the requirement, parallelism only makes it cheap.

3. **Each design returns** the interface (types, entry points, invariants, ordering, failure modes), a caller's code that uses it, what it hides, how each dependency crosses the seam, and where its leverage is strong or weak.

4. **Compare, then choose.** Show the designs one at a time, then compare them on depth, locality, and where the seam sits. Recommend one and say why; when parts of two designs fit together, propose the combination. The user asked for a judgment, not a catalogue.
