# Shipping

When: finished work leaves its branch: through a pull request, or by the path the user names (merge the pull request, merge locally, keep, discard).
Not when: a pull request for the branch is already open and has to reach merge-ready (babysit-pr).

1. Run `land`.
2. When `land` opened a pull request, report its URL and the checks it started, from `gh pr checks`.
3. When the user named another path, report what `land` did: the merge and its test run, the kept branch, or the discarded one.

Done when: `gh pr view` shows the pull request open with the body `land` wrote, or the path the user named is done as `land` reported it.
