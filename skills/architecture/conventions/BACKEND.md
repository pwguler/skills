# Backend conventions

Applies when the slice is an API, service, or job rather than UI. The contract is the spec: what a caller must know (routes, payload shapes, status codes, error modes, ordering, idempotency) is decided before the handler is written.

- **The interface is the test surface.** Test through the contract, not the internals. A handler test that reaches into the ORM is testing the wrong seam.
- **Validate at the boundary.** Parse and validate every inbound payload at the edge; inside the service, types are already trusted. Never trust a client value.
- **Errors are part of the contract.** Every failure maps to a defined status and a message safe to show a caller. Never leak stack traces, queries, or secrets outward.
- **Own the side effects.** Writes are idempotent where a client can retry. Long work goes to a job, not a request. External calls carry a timeout and a failure path.
- **Migrations run locally, never beyond.** Apply them against a local development database as part of the slice. Shared, staging, and production databases stay the user's to run; name the command and stop.
- **Logs and secrets.** Structured logs at the boundary, no secrets in them. Configuration comes from the environment, never the codebase.

Acceptance for a backend slice: the contract holds (shape, status, errors), the failure paths are exercised by calling the running service (through `run` when the harness provides it, otherwise the way the project's README or scripts start it), and nothing outside the spec's non-goals changed.
