# Babysit PR

When: one open pull request has to reach merge-ready: checks green, review threads answered, no conflicts.
Not when: no pull request exists yet (shipping), or several dependent ones must land in order (figure-it-out).

1. Read the pull request's state: `gh pr checks` for failing checks, `gh pr view --json mergeable,reviewDecision` for conflicts and the review decision, and `gh api graphql` on its review threads for those not yet resolved.
2. Run `debug` on each failing check whose cause its log does not state, and `implement` on the fix for each whose log states it.
3. Run `verify` on each unresolved review comment as a claim; run `implement` on the change when it holds, and reply on the thread with the reason when it does not.
4. Resolve merge conflicts the way `land` resolves them.
5. Run `verify` on the branch, then push under `land`'s rules for pushing.
6. Repeat from step 1 until the pull request is merge-ready, or stop and report what needs a person: a reviewer's decision, a permission, or a check that fails outside the repository.

Done when: `gh pr checks` shows every check passed, none failing or pending, `gh pr view` shows it mergeable, and no review thread is left without a fix or a reply.
