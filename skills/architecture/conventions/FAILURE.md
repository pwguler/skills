# Failure design

Failure is part of the interface. A caller must know how a module fails as surely as how it succeeds; LANGUAGE.md lists error modes inside the interface for this reason.

- **Two kinds, two mechanisms.** An expected failure (not found, rejected, rate limited) is a value: a typed result or error union the caller must handle. A bug (a broken invariant, an impossible state) throws, and nothing catches it but the top-level boundary. Never throw for the expected; never return a value for the impossible.
- **Fail loud.** No catch-and-continue, no default that masks a failure, no empty array where an error belonged. A silent fallback turns a visible failure into a wrong answer the user trusts.
- **Every external call is bounded.** A timeout, a bounded retry with jitter for transient faults only, and a defined outcome when the budget is spent. An unbounded call is a hang waiting for its moment.
- **Writes a client may retry are idempotent.** An idempotency key or a natural unique key makes the retry safe; without one, a retry is a duplicate.
- **Errors carry what the handler needs, never what the attacker wants.** Enough context to act on (which entity, which constraint), no stack traces, queries, or secrets past the boundary.
- **The failure path is exercised.** A failure mode that no test or run has triggered is a guess. Acceptance includes the failures, not only the happy path.
