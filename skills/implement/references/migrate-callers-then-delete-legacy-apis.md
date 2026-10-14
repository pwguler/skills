# Migrate callers, then delete legacy APIs

Once a new API is settled as the right design, move every caller to it and remove the old one in the same wave, with no compatibility layer left behind. Keeping both paths doubles the complexity, stalls cleanup, and makes the codebase grow only by appending.

When: a new internal API replaces an old one while callers of the old one remain, no outside user depends on the old one staying compatible, the project can take a coordinated breaking change, and the new API belongs to a simplification or refactor.

- Never keep an old path only because internal callers still use it.
- List every caller, migrate each one, and delete the old API right away.
- An adapter between old and new is the exception, never the design, and it lives for a short, stated time.
- Rewrite tests to check the new contract, and delete tests that guarded only details of the old implementation; [test-behavior-not-implementation](test-behavior-not-implementation.md) says which is which.

Where it stops: an API the migration left without callers counts as orphaned by the change, so implement's "Delete what your change orphaned" removes it; other dead code found along the way is flagged, not removed. When outside users depend on the old API, this file does not apply, and whether to break them is a fork for the user.
