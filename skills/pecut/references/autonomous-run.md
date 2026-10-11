# Autonomous run

When: work on one branch runs unattended until a written exit condition.
Not when: several dependent pull requests are involved (figure-it-out).

1. Before starting, write down the exit condition, a time limit, and a round limit, in a file each round reads.
2. Work from a settled spec; when none exists, run `drill` while the user is still there.
3. Drive the rounds with the harness's loop runner, its limits taken from step 1, or run them in this session up to those limits when the harness has none; each round runs `implement` on the spec.
4. Stop the run, recording why in the file from step 1, at a genuine fork, before any database operation, and before any action git cannot undo; never delete untracked work, and never run `reset --hard` or `git clean -fd` on a dirty tree.
5. At the end, run `verify` on the whole work, and record in the file from step 1 which exit or limit ended the run, with `verify`'s output.
6. When the exit condition holds, run `land`; when a limit ended the run, leave the branch for the user.

Done when: the exit condition from step 1 holds or a limit is reached, the file from step 1 records which, with `verify`'s output, and when the exit condition holds, `land` has opened the pull request.
