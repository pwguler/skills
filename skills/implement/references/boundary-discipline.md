# Boundary discipline

Validate data, narrow it, and handle errors where data enters or leaves the system. Trust the data inside. Keep business logic in pure functions under a thin, mechanical shell. Checks spread through the core add noise and repeat work. They also make the code look safer than it is.

When: you write configuration, validation, error handling, or adapter code between the program and its host, callers, or dependencies.

- Boundaries are command-line arguments, config files, external APIs, and network protocols. At a boundary, the code is defensive, as the implement rule on I/O boundaries says. It returns errors and does not hide them, as the implement rule against a silent fallback says.
- At the boundary, change raw input into domain types. A parse function is a pure transform from raw bytes to typed state.
- Configuration is a boundary too. Parse it into a typed value where the code builds it, and apply its defaults there. Then no later code reads a raw key.
- Inside, work on typed data and pass errors outward. Never validate again what a boundary already validated. Add no checks for absent values deep in a call chain.
- Across a boundary, show domain concepts, never the private representation of the boundary. Keep transport, storage, framework, and wire types out of the public interface. Never export them again through it.
- General mechanism goes in the core. Policy for one case goes at the boundary.
- Business logic goes in pure functions with no framework dependency, so that a test can run it without the host. Prompt construction takes structured state and returns a string. Scoring and assessment are pure transforms from state to results.
- Two checks:
  - Does this data cross a boundary at this point? If not, validation here repeats work.
  - Could the shell just call a pure function here? If yes, extract that function.

Where it stops: the shape of the parsed data belongs to [type-system-discipline](type-system-discipline.md). How much a reader must keep in mind across layers belongs to [minimize-reader-load](minimize-reader-load.md).
