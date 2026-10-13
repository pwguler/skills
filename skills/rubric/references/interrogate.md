# Interrogate

Adversarial review of a diff or named files for defects, before any taste judgment. Challenge the execution, not the goal. An empty finding list is a valid result.

## Reviewers

Prefer several reviewers from different model families when the harness allows; otherwise run several fresh contexts on the same model. Give every reviewer the same brief: the scope, one paragraph of intent, and the lenses below. Reviewers never edit files and never see each other's findings.

Each finding names severity (`critical`, `warning`, or `nit`), cites a concrete path or call chain, and states the observable failure. "I would have done it differently" is not a finding.

## Lenses

Use the lenses that fit the change; skip the rest.

- **Correctness:** edge cases, error handling, races, idempotency, sad paths. Trace the execution path; do not flag a hypothetical the callers cannot reach.
- **Root cause:** is this a real fix or a symptom guard (nil check, retry, cast, "don't do X" comment)? Prefer a fix at the right layer.
- **Structure:** boundary validation once at the edge, no bolted-on dual paths, no hand-synced lists, no shallow pass-through modules.
- **Verification:** tests assert behavior the user sees; proof checks the real artifact, not a proxy or self-report.
- **Complexity:** justified by what the code does now; delete dead and obsolete compatibility paths.
- **Security:** untrusted input to dangerous sinks, auth gaps, secrets in logs, TOCTOU on security paths. Trace the input path.
- **Comments:** delete comments that restate the code. A comment that encodes a real constraint is a finding only until the constraint lives in a type, lint, test, or runtime check; prefer that encoding, and delete the comment once the structure holds it. Never expand the change fence to chase comments outside the diff. Never edit product behavior under this lens except to remove a comment or the tiny fix that makes the comment unnecessary.

## Lead buckets

The lead (this session) does not aggregate. Filter with full context the reviewers lack, then bucket every finding:

- **Act on:** concrete defects to fix before the claim ships. Keep this list short; more than about five usually means the filter is weak.
- **Consider:** real tradeoffs the user may want to weigh.
- **Noted:** true but not actionable on this change.
- **Dismissed:** nits inflated to fill space, hypotheticals the call chain blocks, premature abstractions, preference-only rewrites, or findings that miss known constraints. Say why.

Multi-reviewer agreement is the strongest signal. Be slower to dismiss correctness and security findings even from a single reviewer.

Act-on findings route back to `implement` or `debug`. The taste pass does not start while act-on is non-empty and the claim is that the work ships.
