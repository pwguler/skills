# Coverage

Opt-in only. Costly: N workers across slices or a race mix. Use for broad parallel coverage the user asked for. Never start because spare capacity exists.

## Frame

1. State the done predicate and the artifact or report to return.
2. Choose the shape: partition into slices, race identical briefs, or mix. For a race or mix, declare the selection rule up front: `first pass`, `rank all`, or `best-of`.
3. Set N from the user or from the shape. Say the cost before spawning, and stop if the user declines.
4. Prefer different model families when the harness allows and judgment diversity matters; otherwise the parent model in fresh contexts.
5. Each worker gets its own writable outputs. Measurement briefs name exact SHAs and the method (sample count, what one sample is, order).

## Fan out

Every brief stands alone: goal, scope, slice or race arm, how to verify, what to report. Status is `PASS`, `ISSUES`, or `BLOCKED` with evidence. A worker that can prove defects lists every proven issue, not only the first. Dropouts proceed with N-1 and are noted.

## Aggregate and report

Drop a result that omits required SHAs or method; respawn that worker once, then record a gap. Gaps are not passes. Apply the declared race rule when used. Return one compact table, one-line evidenced issues, and explicit gaps or dropouts. Do not paste raw worker dumps.
