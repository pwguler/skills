---
name: land
description: Finish a development branch. Use when implementation is complete and the work needs to be merged, pushed as a PR, kept, or discarded.
---

Nothing lands unverified.

Fast path: when the user already named the path in the invocation (merge, PR, keep, discard): skip the options menu and the todo list, and go. On the merge path, if the base has not moved since the branch forked, skip the post-merge test re-run; a merge onto that base produces the exact tree `verify` just passed. Any divergence from the base branch voids this: diverged merge results are new trees and get the full re-run. The spec question is not part of the fast path: when a spec exists and its fate was not named in the invocation, ask it even here (one line, default keep), except on the keep path, which leaves the spec in place.

1. Open a todo list (a checklist in the reply when the harness has no todo tool) with these steps as its items before you run anything; when a todo list is already open, add them to it. Each step is its own item. A step the chosen path does not take stays as `skip: <reason>`.
2. Run the `verify` skill, or reuse its evidence record while verify's rule still counts it fresh. A fast-path record covers its criterion only, so the merge path runs the full gate once, unless the change has no runtime behavior. Then the `rubric` skill, when the diff carries a quality surface, as `rubric` defines it, or the spec has a criterion that names a quality rather than a behavior: the final gate is a fresh judge, never the maker. A `rubric` verdict is reused under rubric's rule on saved verdicts. `rubric` picks its criteria sources and writes the criteria before it reads the diff. Failing work does not reach the options menu.
3. Detect the environment: normal checkout, named-branch worktree, or detached HEAD (externally managed workspace).
4. Present exactly these options, no essay: merge locally to the base branch / push and open a PR / keep the branch as-is / discard. Detached HEAD drops the merge option. Discard requires the user to type "discard".
5. On merge and PR paths, close the spec: route durable residue out (a decision that passes the bar in [decision-record.md](references/decision-record.md) is offered to the user as an ADR, a settled term goes to `CONTEXT.md` per [terms.md](references/terms.md) only when the user confirmed it during the work and is offered otherwise, a change to the system's shape updates `ARCHITECTURE.md` per [architecture-format.md](references/architecture-format.md), creating it if absent). Then ask what happens to the spec file itself (keep it, or delete it) and say which is the default in the same breath: **keep unless the user asks otherwise**. Routing the residue is not optional: it happens on every merge and PR, and a diff that adds no decision, term, or module boundary gets one line saying so instead. Only what is offered and the file's fate are the user's call. A named path in the invocation ("land: merge, drop the spec") answers the question already: do not ask twice. Keep path leaves the spec in place without asking; it is still steering.
6. Write the PR body and the merge commit message from the spec, or from the one-sentence plan when there is none: lead the body with the demo (the `verify` evidence: what was run and what it showed, or how to exercise the change), then the goal as the summary line, the decisions with their reasons, acceptance criteria as the change list, non-goals as scope notes. The merge runs with `--no-ff`, so the merge commit carries the message: the reasoning enters the permanent record where `git log` finds it, whether or not the file survives.
7. Merge path, in this order: from the main checkout merge the branch with `git merge --no-ff`, test the merged result (a matching evidence record counts), remove the worktree, then delete the branch. Branch deletion before worktree removal fails; worktree removal from inside the worktree fails.
8. PR and keep paths preserve the worktree; the user needs it to iterate.

Rules:

- Never force-push, never amend a published commit, and no `--no-verify` or `reset --hard` on a dirty tree without an explicit ask.
- Never delete a spec the user did not ask to delete. Silence is not consent; unanswered means keep.
- Never remove a worktree the harness created; only clean up ones under `.worktrees/` or `worktrees/`. Run `git worktree prune` after removal.
- Never merge untested: the merged result runs the tests unless its tree hash matches an evidence record that verify's rule still counts fresh, which it does after a merge onto a base that has not moved since the branch forked.
- Merge conflicts are resolved by intent, hunk by hunk, each side traced to its source; `--abort` is not a resolution.

Deep mode (the `deep` skill is active): voids the whole fast path: full menu, the post-merge tests re-run even when a record matches, and the spec question asked explicitly rather than inferred.
