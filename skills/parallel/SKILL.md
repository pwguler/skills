---
name: parallel
description: Run independent tasks at once in subagents, race several attempts at one task, or cover many slices of one job, when the user asks for parallel work. Use when the user asks to run two or more independent tasks or failures in parallel, to race or compare several attempts at one task, or to cover many slices of one job at once.
---

Parallel work runs only when the user asks for it. Otherwise the tasks run one at a time in this session; independence is the guarantee, parallelism is only the cheap way to get it.

1. Choose the mode. **Partition** (the default): independent tasks that share no files or state, one `worker` subagent each. **Race**: several full attempts at one task, per [race.md](references/race.md). **Coverage**: many slices of one job with a done check, per [coverage.md](references/coverage.md). Related failures fit no mode: investigate them together first.
2. For a race or a coverage run, state the cost first (how many subagents, how many full attempts) and launch only after the user agrees.
3. For partition, brief each `worker` with scope, context, constraints, and expected return. Scope: one file, one subsystem, one problem; "fix all the tests" loses the agent. Context, pasted in: error messages, test names, relevant paths; agents inherit nothing from the session. Constraints: what must not change ("tests only", "do not touch production code"). Expected return: a summary of root cause and changes, so integration is reviewable.
4. Launch every subagent in one `subagent` workflow call, as one `runs.all` batch whose script returns each child's `artifactPaths` beside its output. Workers that edit files run with `worktree: true`, so no two share a checkout. pi-subagents launches those only from a clean checkout, so a script saved to a file lives outside the repository.
5. Integrate when they return. A `worktree: true` worker's changes come back as a patch, not in this checkout: the run folder among its `artifactPaths` holds `handoff.json`, whose `groups[].children[].patch.path` names the patch file. Read each summary, apply each patch with `git apply --3way`, resolve any conflict by intent, then run the `verify` skill, whose full gate covers the suite, before claiming the batch done.

Rules:

- Partition does not fit when failures are related (fixing one may fix the rest), when the problem is still exploratory, or when agents would touch the same files.
- A race never averages divergent designs: attempts that disagree in shape mean the brief was too loose, so rewrite it. A coverage run never starts without a done check.
- A worker's worktree and branch outlive the run, kept so the worker can resume. Once the batch passes `verify`, offer to drop them: `subagent({ action: "worktree.discard", options: { handoffPath } })` with each worker's `handoff.json`, which asks the user to confirm.
