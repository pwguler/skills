# Parallel tasks

When: the user asks to run two or more independent changes at once.
Not when: the changes share files or state (figure-it-out), are failures that may share one cause (bug-fix), or one needs another's result (figure-it-out).

1. Route each change through the table in `pecut` on its own, and run `drill` here, with the user, on each change whose playbook runs it.
2. Run `parallel` on the changes, each agent running the rest of its change's playbook up to its `land` step.
3. Run `land`: one pull request for the batch.

Done when: each change meets its own playbook's `Done when:` on the integrated tree, its `land` clause aside, and `land` has opened the pull request or taken the path the user named.
