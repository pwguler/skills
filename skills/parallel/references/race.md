# Race

Several full attempts at one task, for when a single attempt would lock in the wrong shape. A race costs one complete run per attempt.

## Before launch

1. Name the artifact every attempt produces. All attempts get the same brief, word for word.
2. Write three to six criteria to grade the results on. The attempts never see them.
3. Pick the count, usually two to four, and state the cost: that many full runs.
4. Launch the attempts as `worker` subagents in one `subagent` workflow call, as one `runs.all` batch with `worktree: true`, each writing only inside its own worktree.

Each attempt returns its artifact and a short note on what it considered and rejected. An attempt that fails to return is noted, and the race goes on with the rest.

## Pick

Grade every attempt against the criteria, one criterion at a time. For a second opinion, a `reviewer` subagent with `context: "fresh"`, on a model from a different family than the attempts', grades them too: agreement confirms the pick, and disagreement sends you back to both notes. Pick the base the next maintainer can extend most easily; on a tie, the one with the smaller public surface.

## Graft

Apply the base attempt's patch to this checkout as `parallel`'s step 5 does, then port one or two pieces worth keeping from the other attempts' patches, by hand. When every attempt reached the same shape, ship that shape without grafting. When the shapes diverge widely, the brief was too loose: rewrite it and race again rather than averaging. The result passes `verify`, and `rubric` when taste applies.
