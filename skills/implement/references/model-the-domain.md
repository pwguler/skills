# Model the domain

Put the domain in one data structure that matches it, not in conditions spread through the code. A structure that fits makes invalid states impossible to write, and it removes branches. It costs least when you choose it while you write the code for the first time.

When: the logic of a slice holds state, branches on a shape, or creates a type that later slices share.

- A state machine replaces loose booleans, phase flags, and lifecycle checks.
- A named model with typed fields replaces loose parameters, and a shape that each use assumes again.
- A map, a registry, a lookup table, or a tagged variant replaces branches spread across files.
- A reducer, or a model of commands and events, replaces state that changes without a plan.
- A module owns one body of domain knowledge, not one pipeline step such as loading, checking, transforming, or saving. The order in which things run does not decide who owns them.
- A small module boundary collects behavior, ownership, or invariants that repeat.
- Use an index, cache, queue, tree or graph, or normalized collection when the way the code reads data needs it.
- Another structure that fits is also correct. When no structure in this list fits, name the states that the code must forbid. Name also the ways it reads its data. Then pick the structure that encodes those and nothing more.
- Never force an abstraction. Plain code wins when it reads clearly, stays local, and will not grow soon.
- Do not trust an abstraction that adds a layer but removes no branch, duplicated rule, invalid state, or lifecycle risk. [Minimize reader load](minimize-reader-load.md) weighs that layer.
- These signs show that this step was skipped. A feature adds one more branch to an if/else chain. A second boolean must change together with the first. Modules named for phases each repeat the same domain rules.

Where it stops: choose the structure for the code that the slice writes. Its types follow [type-system discipline](type-system-discipline.md). [Foundational thinking](foundational-thinking.md) puts the shape before the logic. Change existing code into the structure only in a slice that the plan holds. The implement rule on diffs requires this. A structure that changes the plan is a decision for the user: stop and name it.
