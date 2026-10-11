# Worktree cleanup

When: disk is short, and old git worktrees or their build outputs take the space.
Not when: a branch still has to be merged or discarded (`land`).

1. List the worktrees with `git worktree list`, with the disk each one uses, largest first.
2. For each, record its branch, whether that branch is merged or pushed, and whether `git status` in it shows changes or untracked files.
3. Remove only a worktree `land` may remove, and only when it is clean and its branch is merged or pushed; for every other one, ask the user, naming it and what would be lost.
4. Remove with `git worktree remove`, never with `--force` on a dirty worktree, then run `git worktree prune`.
5. Delete no branch, no untracked file, and no build output outside a removed worktree without an explicit ask that names it.

Done when: the disk freed is reported per worktree, and each worktree left in place has its reason.
