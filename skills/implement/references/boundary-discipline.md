# Boundary discipline

Validate, narrow, and handle errors where data enters or leaves the system, trust what is inside, and keep business logic in pure functions under a thin, mechanical shell. Checks scattered through the core are noisy, redundant, and make the code look safer than it is.

When: wiring validation, error handling, or the adapter code between the program and its host, its callers, or its dependencies.

- Edges are command-line arguments, config files, external APIs, and network protocols. There the code is defensive, per implement's "Defensive at I/O edges"; it returns errors instead of hiding them, per "No silent fallback that hides failure".
- At the edge, turn raw input into domain types. A parse function is a pure transform from raw bytes to typed state.
- Inside, work on typed data and propagate errors outward. Never validate again what an edge already validated, and add no absence checks deep in a call chain.
- Across an edge, expose domain concepts, never the edge's private representation. Transport, storage, framework, and wire types stay off the public surface and are never re-exported through it.
- Generic mechanism lives in the core; policy tied to one case lives at the edge.
- Business logic lives in pure functions with no framework dependency, so a test drives it without the host. Prompt construction takes structured state and returns a string; scoring and assessment are pure transforms from state to results.
- Two checks:
  - Is this data crossing an edge right now? If not, validating it here is redundant.
  - Could this be a pure function the shell merely calls? If yes, extract it.

Where it stops: config needs nothing extra from this file, since implement's "Configuration is input" already checks it where it is constructed. The shape parsed data lands in belongs to [type-system-discipline](type-system-discipline.md), and how much a reader must hold across layers belongs to [minimize-reader-load](minimize-reader-load.md).
