---
name: parallel
description: Run independent tasks at once in subagents, race attempts at one task, or cover many parts of one job. Use it only when the user asks for parallel work. Use it when the user asks to run two or more independent tasks or failures in parallel. Use it also to race or compare several attempts at one task, or to cover many parts of one job.
---

Run parallel work only when the user asks for it. Otherwise, run the tasks one at a time in this session. The independence of the tasks is the guarantee. Parallel runs are only the cheap way to get it.

1. Choose the mode. **Partition** is the default: independent tasks that share no files or state, with one subagent for each task. **Race** is several full attempts at one task, as [race.md](references/race.md) says. **Coverage** is many parts of one job with a done check, as [coverage.md](references/coverage.md) says. Related failures fit no mode. Investigate them together first.
2. For a race or a coverage run, state the cost first: how many subagents, and how many full attempts. Launch only after the user agrees.
3. For partition, give each worker a brief with its scope, context, constraints, and expected return. The scope is one file, one subsystem, or one problem. "Fix all the tests" is too wide for an agent. Paste the context into the brief: error messages, test names, and relevant paths. Agents get nothing from the session. The constraints say what must not change, such as "tests only" or "do not touch production code". The expected return is a summary of the root cause and the changes, so that you can review the integration.
4. Launch all the subagents at the same time. Run each worker that edits files in its own git worktree, so that no two workers share a checkout. A new worktree holds only committed files, so start the workers from a clean checkout.
5. Integrate the results when they return. A worker in a worktree gives its changes back as a patch or a branch, not in this checkout. Read each summary. Apply each patch with `git apply --3way`, or merge each branch. Resolve any conflict by intent. Then run the `verify` skill before you say that the batch is done. Its full gate covers the suite.

Rules:

- Partition does not fit in three cases. The failures are related, so a fix for one can fix the others. The cause of the problem is still unknown. Or the agents would touch the same files.
- A race never averages different designs. When the attempts differ in shape, the brief was too loose. Rewrite it. A coverage run never starts without a done check.
- The worktree and branch of a worker stay after the run, so that the worker can continue. When the batch passes `verify`, offer to remove them. Remove them only after the user agrees.
