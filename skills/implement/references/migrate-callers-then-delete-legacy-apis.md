# Migrate callers, then delete legacy APIs

When a new API is settled as the right design, move every caller to it. Remove the old API in the same change, and leave no compatibility layer. Two paths double the complexity, stop the cleanup, and make the codebase grow only by addition.

When: a new internal API replaces an old one, and the old one still has callers. No outside user depends on the old API. The project can accept a coordinated breaking change. The new API comes from a simplification or a refactor.

- Never keep an old path only because internal callers still use it.
- List every caller, move each one, and delete the old API at once.
- An adapter between the old and the new API is the exception, never the design. It lives for a short, stated time.
- Rewrite tests to check the new contract. Delete tests that checked only details of the old implementation. [Test-behavior-not-implementation](test-behavior-not-implementation.md) tells which is which.

Where it stops: an API that the migration left without callers is unused because of the change. So the implement rule to delete what the change made unused removes it. Other dead code goes too when it is in a file that the slice changes. Flag it when it is in another file. When outside users depend on the old API, this file does not apply. Whether to break them is a decision for the user.
