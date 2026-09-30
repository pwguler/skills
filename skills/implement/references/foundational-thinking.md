# Foundational thinking

Structure comes before the logic that rests on it: the data shape before the code that reads it, and the scaffold every later phase needs before those phases. Decisions about structure guard the options left open later, and decisions about code guard simplicity.

When: before the first line of a slice's logic, and before work starts on anything every later slice leans on.

- Settle the data shape before the logic: define the core types early, follow every path that reads or writes them, and pick structures that fit the paths taken most. Which structure fits is [model the domain](model-the-domain.md).
- Remove duplication of structure, not of every line. Types and data models converge on one shape.
- Three similar statements still beat an abstraction made too early. Explicit beats clever.
- Tests cover behavior and edge cases, never a line count; [test behavior, not implementation](test-behavior-not-implementation.md) says how.
- Before state is shared between actors, ask what happens when another actor changes it at the same moment. Any answer other than nothing means isolate it, per [separate before serializing shared state](separate-before-serializing-shared-state.md).
- Whatever helps every later phase goes first; ask whether each later phase gains from it already existing. CI, the linter, test infrastructure, and shared types are scaffold.
- Order for open options: setup before features, and the failing test before the fix it proves, both in one commit per [sequence verifiable units](sequence-verifiable-units.md). Commits stay small and single-purpose, per the commit rule.
- Each increment lands one coherent abstraction or deepens one that exists. A new capability is never spread over its callers as special cases they coordinate.
- Before scaffold comes subtraction: code the change orphaned goes first, and other dead weight is flagged, removed first only when the plan includes it, per [subtract before you add](subtract-before-you-add.md).

Where it stops: scaffold is setup done before the first slice, not a slice, and a shared type laid down there carries shape only; behavior on it waits for a slice's failing test. Every diff after that still traces to its slice.
