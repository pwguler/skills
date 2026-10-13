# Race

Opt-in only. Costly: N full attempts at one task. Use when one attempt would lock in the wrong shape. Never start a race because the harness can.

## Frame

1. State the artifact each candidate produces. The shared prompt is the contract; every candidate gets the same one.
2. Write 3 to 6 gradeable criteria for this task. Candidates do not see them; the picker does.
3. Set N (usually 2 to 4). Prefer different model families when the harness allows; otherwise the same model in fresh contexts. Say the cost (N full runs) before spawning, and stop if the user declines.
4. Give each candidate its own writable output (a worktree when practical, otherwise an isolated directory). No shared mutable state.

## Fan out

Spawn all candidates in one batch when the harness allows concurrent agents. Each returns the artifact and a short rationale of what it considered and rejected. A dropout proceeds with N-1 and is noted.

## Cross-judge and pick

Score every candidate against the criteria, criterion by criterion. A separate judge in a fresh context helps when available; agreement confirms the base, disagreement means re-read both rationales. Pick the base a future maintainer can extend most easily. On a tie, prefer the smaller public surface.

## Graft and verify

Port one or two worth-keeping pieces from losers into the base by hand; do not paste. Consensus on one shape means ship that shape with no graft. Wild divergence means the frame was under-specified: re-frame rather than average. Verify the result through `verify` (and `rubric` when taste applies).
