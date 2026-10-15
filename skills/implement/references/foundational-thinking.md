# Foundational thinking

Build the structure before the logic that depends on it. Define the data shape before the code that reads it. Build the base that every later phase needs before those phases. Decisions about structure keep later options open. Decisions about code keep the code simple.

When: the logic of a slice holds state, branches on a shape, or creates a type that later slices share.

- Settle the data shape before the logic. Define the core types early. Follow every path that reads or writes them, and pick structures that fit the most common paths. [Model the domain](model-the-domain.md) tells which structure fits.
- Remove duplicate structure, not every duplicate line. Types and data models come together into one shape.
- Three similar statements are still better than an abstraction made too early. Use no reflection or dynamic dispatch where a direct call works.
- Tests cover behavior and edge cases, never a line count. [Test behavior, not implementation](test-behavior-not-implementation.md) tells how.
- Before actors share state, ask what happens when another actor changes it at the same moment. If any answer is not "nothing", isolate the state, as [separate before serializing shared state](separate-before-serializing-shared-state.md) says.
- Put first what helps every later phase. For each item, ask whether each later phase gains when the item already exists. CI, the linter, test infrastructure, and shared types are base work.
- Order the work to keep options open. Do setup before features. Put the failing test before the fix that it proves, both in one commit, as [sequence verifiable units](sequence-verifiable-units.md) says. Keep commits small, with one purpose each, as the commit rule says.
- Each step adds one clear abstraction or makes an existing one deeper. Never spread a new capability over its callers as special cases that they must coordinate.
- Subtraction comes before the base work. First remove the code that the change made unused, and dead code in the files that the slice changes. Flag dead code in other files. Remove it first only when the plan includes it, as [subtract before you add](subtract-before-you-add.md) says.

Where it stops: base work is setup before the first slice. It is not a slice. A shared type that it creates has only a shape. Behavior on that type waits for the failing test of a slice. After that, every diff still belongs to its slice.
