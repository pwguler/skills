# Opening a PR

When: finished work on a branch needs a pull request.
Not when: the branch merges locally, stays, or goes (`land`), or a pull request for it is already open (babysit-pr).

1. Order the branch's unpushed commits so each one builds and passes its tests on its own.
2. Run `land` and take its path that pushes and opens a pull request, against the branch the repository merges into.
3. Report the pull request's URL and the checks it started.

Done when: `gh pr view` shows the pull request open against that base, with the body `land` wrote.
