# Worktree cleanup

When: disk is short, and old git worktrees or their build outputs take the space.
Not when: a branch still has to be merged or discarded (`land`).

1. List the worktrees with `git worktree list`, with the disk each one uses, largest first.
2. For each, record its branch, whether that branch is merged or pushed, and what `git status --ignored` shows in it: changes, untracked files, and ignored files.
3. A worktree is clean when it has no changes, no untracked files, and no ignored file other than build outputs and dependency caches; `git worktree remove` deletes ignored files with the directory, so a database file, an env file, or local data in it makes it not clean.
4. Remove only a clean worktree that `land` may remove and whose branch is merged or pushed; for every other one, ask the user, naming it and each file that would be lost.
5. Remove each with `git worktree remove` under `land`'s rules for removing a worktree, never with `--force` on a dirty worktree.
6. Outside the worktrees removed under step 4, delete no branch and no file, build output included, without an explicit ask that names it, and run no `reset --hard` or `git clean -fd`.

Done when: the disk freed is reported per worktree, and each worktree left in place has its reason.
