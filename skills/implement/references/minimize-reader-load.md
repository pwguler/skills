# Minimize reader load

Code is as maintainable as the work a reader does to understand it, measured on two axes: the layers between a question and its answer, and the hidden or mutable state the reader must carry in mind. Line counts, complexity scores, and architecture labels only stand in for that work, and code is read far more often than it is written.

When: before adding a wrapper, a layer, or a piece of state, before changing or exposing a component's state, and whenever code in the slice is hard to trace.

- Guard both axes, since they move apart: a flat file of fifty globals weighs as much as a stack of six adapters.
- Inline a layer that costs more than it saves: a wrapper with one caller, an adapter with no second implementation, indirection added for a need that never came.
- Each layer changes the abstraction of the one beside it. A layer whose methods and arguments mirror its neighbor's only passes calls through, and collapses.
- An interface earns its breadth by hiding a real decision. A wide surface over little logic makes a reader learn the surface and the logic both.
- Shrink the scope of state: return values over mutation, locals over fields, fields over module state, module state over globals. Derive a value rather than keep two copies in sync.
- A component's state changes only through its own operations: hand out no reference to it that a caller could mutate, or that changes under the caller.
- Name an invariant once, at the boundary, not in each consumer; [boundary discipline](boundary-discipline.md) places that boundary.
- A new layer or new piece of state must remove at least as much reader load elsewhere as it adds.
- The test: a new reader finds where a value comes from and what can change it within half a minute. When not, cut layers or cut state.

Where it stops: the slice's own code is held to this; a layer outside the slice that fails it is flagged, not collapsed, unless the plan includes it, since each changed line traces to the slice. Fewest layers for a new need starts at [laziness protocol](laziness-protocol.md).
