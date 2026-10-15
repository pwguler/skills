---
name: land
description: Finish a development branch with a merge, a PR, a keep, or a discard. Use it when the implementation is complete.
---

Do not land work that is not verified.

Fast path: the diff is small, and the invocation already names the path: merge, PR, keep, or discard. Then skip the options menu and go, unless step 4 removes that path. The spec question is not part of the fast path. When a spec exists and the invocation did not name its fate, ask about it here too. Ask in one line, with keep as the default.

1. Before you run anything, create a `todo` list with these steps as its items. If a `todo` list already exists, add the steps to it. Each step is one item. When the chosen path skips a step, mark it `completed` and add `skip: <reason>` to its subject.
2. Read the `verify` skill and follow it. It reuses its evidence record when the tree hash did not change. A record made inside a declared phase covers only its area. So when you land from inside a phase, run the full gate first. Then read the `rubric` skill and follow it. Its defect pass runs when the work has a spec at `docs/specs/<slug>.md`. Its taste pass runs when the diff changes a UI, a public interface, a name, or prose. It runs also when the spec has a criterion that names a quality, not a behavior. Send an act-on finding back to `implement` or `debug`. The fixed tree then passes `verify` again. Failing work does not reach the options menu.
3. Find the environment: a normal checkout, a named-branch worktree, or a detached HEAD. A detached HEAD is a workspace that something outside manages.
4. Show exactly four options, with no explanation. They are: merge locally to the base branch, push and open a PR, keep the branch, or discard. A detached HEAD removes the merge and discard options, also when the invocation names one. Then say that its workspace belongs to what manages it, and show the other options. Discard requires the user to type "discard".
5. On the merge and PR paths, close the spec. First move its lasting content out. A decision worth keeping becomes an ADR, as [decision-record.md](references/decision-record.md) says. A settled term goes to `CONTEXT.md`, as [terms.md](references/terms.md) says. A change to the shape of the system updates `ARCHITECTURE.md`, as [architecture-format.md](references/architecture-format.md) says. Create that file if it does not exist. This move is not optional. Only the fate of the spec file is the decision of the user. Ask about it in one line, and give the default in the same line: **keep, unless the user asks otherwise**. A path named in the invocation already answers it, such as "land: merge, drop the spec". The keep path leaves the spec in place without a question, because the spec still guides the work.
6. Write the PR body and the merge commit message from the spec. Start the body with the demo. The demo is the `verify` evidence: what ran and what it showed. Or it tells how to exercise the change. Then write the goal as the summary line, the acceptance criteria as the change list, and non-goals as scope notes. The reasoning goes into the permanent record where `git blame` points, whether the spec file stays or not.
7. On the merge path, do these actions in this order. From the main checkout, merge the branch. Test the merged result: a matching evidence record counts. Remove the worktree. Then delete the branch. A branch deletion before the worktree removal fails. A worktree removal from inside the worktree fails.
8. The PR and keep paths keep the worktree, because the user needs it for more work. On the discard path, wait until the user typed "discard". In a named-branch worktree, remove the worktree from the main checkout. Use `git worktree remove --force` when the worktree holds uncommitted work. In a normal checkout, switch to the base branch with `git switch --discard-changes <base>`. Untracked files stay, and you name them to the user. In both cases, then delete the branch with `git branch -D`. A copy of the branch on the remote stays there, unless the user asks.

Rules:

- Never force-push, and never amend a published commit. Use no `--no-verify`, and no `reset --hard` on a dirty tree, unless the user asks explicitly.
- Never delete a spec that the user did not ask to delete. Silence is not consent. When the user does not answer, keep the spec.
- Remove only the worktree of the branch that you land. Leave every other worktree alone, also the worktrees that `subagent` runs keep. Only the `worktree.discard` and `worktree.cleanup` actions of pi-subagents remove those. Run `git worktree prune` after a removal.
- Never merge without a test. The merged result runs the tests, unless its tree hash matches the evidence record. A fast-forward matches the record. A merge after the branches diverged never matches it.
- Resolve merge conflicts by intent, one hunk at a time. Trace each side to its source. `--abort` is not a resolution.
