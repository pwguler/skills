# Conventions

What `architecture` owns and `implement` follows. Load only the file the work touches.

Universal, for any code:

- [TYPES.md](TYPES.md): make illegal states unrepresentable.
- [FAILURE.md](FAILURE.md): failure is part of the interface; fail loud; bound every external call.
- [DIRECTION.md](DIRECTION.md): dependencies point inward; the domain imports nothing from the edge.
- [PURITY.md](PURITY.md): immutable by default, pure core, effects injected at the edge.
- [CONCURRENCY.md](CONCURRENCY.md): one owner per state, named async seams, idempotent handlers.
- [SECURITY.md](SECURITY.md): trust nothing that crossed a seam; authz once, encode on exit, fail closed.
- [OBSERVABILITY.md](OBSERVABILITY.md): correlation id end to end, structured logs at seams.
- [COHESION.md](COHESION.md): one reason to change, names from CONTEXT.md, no dumping grounds.

By surface:

- [FRONTEND.md](FRONTEND.md): UI built from a settled design; the design is the spec, checked visually.
- [BACKEND.md](BACKEND.md): APIs, services, and jobs; the contract is the spec.

Per toolchain and stack: [../tooling/](../tooling/README.md). The look itself lives in the project's `DESIGN.md`, which `prototype` grounds in and FRONTEND.md reads.
