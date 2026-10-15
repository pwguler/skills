# Minimize reader load

Code is as easy to maintain as the work that a reader does to understand it. Measure that work on two axes. One is the number of layers between a question and its answer. The other is the hidden or changeable state that the reader must keep in mind. Line counts, complexity scores, and architecture labels only estimate that work. People read code much more often than they write it.

When: before you add a wrapper, a layer, or a piece of state. It applies also when code in the slice is hard to follow.

- Watch both axes, because they move separately. A flat file of fifty globals is as hard to read as six layers of adapters.
- Inline a layer that costs more than it saves. Examples: a wrapper with one caller, an adapter with no second implementation, and indirection for a need that never came.
- Each layer changes the abstraction of the layer next to it. A layer whose methods and arguments copy those of its neighbor only passes calls through. Remove it.
- Make an interface wide only when it hides a real decision. A wide interface over little logic makes a reader learn both the interface and the logic.
- Make the scope of state smaller. Prefer return values to mutation, locals to fields, fields to module state, and module state to globals. Derive a value instead of keeping two copies the same.
- Name an invariant once, at the boundary, not in each consumer. [Boundary discipline](boundary-discipline.md) places that boundary.
- A new layer or piece of state must remove at least as much reader load elsewhere as it adds.
- The test: a new reader finds where a value comes from, and what can change it, within half a minute. If not, remove layers or remove state.

Where it stops: this file applies to the code of the slice. Flag a layer outside the slice that fails the test, but do not remove it, unless the plan includes it. Each changed line belongs to the slice. For the fewest layers for a new need, start at [laziness protocol](laziness-protocol.md). The state of a component stays behind its operations, as the implement rule on state requires.
