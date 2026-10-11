# Babysit PR

When: one open pull request has to reach merge-ready: checks green, review threads answered, no conflicts.
Not when: no pull request exists yet (opening-a-pr), or several dependent ones must land in order (`drill`).

1. Read the pull request's state: `gh pr checks` for failing checks, `gh pr view --json mergeable,reviewDecision` for conflicts and the review decision, and `gh api graphql` on its review threads for those not yet resolved.
2. Run `debug` on each failing check whose cause its log does not state; fix a stated cause directly.
3. Answer each unresolved review thread: change the code when the comment holds, and reply with the reason when it does not.
4. Resolve merge conflicts the way `land` resolves them.
5. Run `verify` on the branch, then push under `land`'s rules for pushing.
6. Repeat from step 1 until the pull request is merge-ready, or stop and report what needs a person: a reviewer's decision, a permission, or a check that fails outside the repository.

Done when: `gh pr checks` shows no failing check, `gh pr view` shows it mergeable, and no review thread is left without a fix or a reply.
