# Race

A race runs several full attempts at one task. Use it when one attempt could make the wrong shape permanent. A race costs one complete run for each attempt.

## Before launch

1. Name the artifact that every attempt produces. All attempts get the same brief, word for word.
2. Write three to six criteria to grade the results on. The attempts never see them.
3. Pick the count, usually two to four, and state the cost: that many full runs.
4. Launch the attempts at the same time, each in a subagent with its own git worktree. Each attempt writes only inside its own worktree.

Each attempt returns its artifact and a short note on what it considered and rejected. Note an attempt that does not return, and continue the race with the others.

## Pick

Grade every attempt against the criteria, one criterion at a time. For a second opinion, a fresh subagent grades them too. When your agent can choose the model of a subagent, use a family that made no attempt. When it agrees, the pick is confirmed. When it disagrees, read both notes again. Pick the base that the next maintainer can extend most easily. On a tie, pick the one with the smaller public interface.

## Graft

Apply the patch of the base attempt to this checkout, as step 5 of `parallel` does. Then copy one or two good pieces from the patches of the other attempts, by hand. When every attempt reached the same shape, ship that shape without grafting. When the shapes are very different, the brief was too loose. Rewrite it and race again. Do not average the shapes. The result passes `verify`, and `rubric` when taste applies.
