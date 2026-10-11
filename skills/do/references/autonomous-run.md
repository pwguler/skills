# Autonomous run

When: work on one branch should run unattended until a written exit condition.
Not when: the user stays to answer forks (route the work itself), or several dependent pull requests are involved (`drill`).

1. Before starting, write down the exit condition, a time limit, and a round limit, in a file each round reads.
2. Work from a settled spec; when none exists, run `drill` while the user is still there.
3. Drive the rounds with the harness's loop runner, its limits taken from step 1; each round runs `implement` on the spec.
4. Stop the run, with a note for the user, at a genuine fork, before any database operation, and before any action git cannot undo; never delete untracked work, and never run `reset --hard` or `git clean -fd` on a dirty tree.
5. At the end, run `verify` on the whole work, and leave the branch unmerged for the user.

Done when: the exit condition from step 1 holds or a limit is reached, and the note records which, with `verify`'s output.
