# Model the domain

The domain lives in one data structure that matches it, not in conditionals spread through the code. A fitting structure makes invalid states impossible to write and removes branches, and it costs least when chosen while the code is first written.

When: a slice's logic holds state, branches on a shape, or lays down a type later slices share.

- A state machine replaces loose booleans, phase flags, and lifecycle checks.
- A named model with typed fields replaces loose parameters and a shape assumed again at each use.
- A map, registry, lookup table, or tagged variant replaces branching spread across files.
- A reducer, or a model of commands and events, replaces state changed ad hoc.
- A module owns one body of domain knowledge, not one pipeline step such as loading, checking, transforming, or saving. The order things run in is not who owns them.
- A small module boundary gathers behavior, ownership, or invariants that repeat.
- An index, a cache, a queue, a tree or graph, or a normalized collection goes where the way the data is read calls for it.
- A fitting structure beyond these is fair too. When nothing listed fits, name the states the code must forbid and the ways its data is read, and pick the structure that encodes those and no more.
- Never force an abstraction. Plain code wins when what is there reads clearly, stays local, and is not about to grow.
- Distrust an abstraction that adds a layer without removing a branch, a duplicated rule, an invalid state, or a lifecycle risk; [minimize reader load](minimize-reader-load.md) weighs that layer.
- The sign this was skipped: a feature that adds one more branch to an if/else chain, a second boolean that must stay in step with the first, or modules named for phases that each repeat the same domain rules.

Where it stops: the structure is chosen for the code the slice writes, with its types held to [type-system discipline](type-system-discipline.md) and the order of shape before logic set by [foundational thinking](foundational-thinking.md). Recasting existing code into it happens only in a slice the plan holds, per implement's "Keep every diff surgical", and a structure that changes the plan is a fork: stop and name it.
