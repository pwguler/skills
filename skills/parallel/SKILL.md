---
name: parallel
description: Dispatch independent tasks to concurrent subagents, or run an opt-in race or coverage fan-out the user asked for. Use when two or more failures or tasks are independent, sharing no files or state, and can be worked simultaneously; when the user asks to race, arena, or compare candidates; or when they ask to swarm or cover many slices in parallel.
---

One agent per independent problem domain by default, all dispatched in a single response so they run concurrently. Without subagent dispatch, run the tasks one at a time in this session; independence is the guarantee, parallelism is only the cheap way to get it. Race and coverage modes are opt-in and never start on their own: say the cost first and wait for the user.

Fast path: the default partition mode when the user did not ask for a race or coverage fan-out. Skip race and coverage entirely unless named.

1. Choose the mode. **Partition** (default): independent tasks, no shared files or state. **Race**: N candidates on one brief, pick a base, graft; only when the user asks (race, arena, compare candidates). **Coverage**: N workers across slices or a declared race mix; only when the user asks (swarm, cover these slices). Related failures stay out of every mode: investigate together first.
2. For partition: brief each agent with scope, context, constraints, and expected return. Scope: one file, one subsystem, one problem. Context, pasted in: error messages, test names, relevant paths. Agents inherit nothing from the session. Constraints: what must not change. Expected return: a summary of root cause and changes.
3. For race: follow [race.md](references/race.md). For coverage: follow [coverage.md](references/coverage.md). Prefer different model families when the harness allows; otherwise fresh contexts on the same model.
4. Integrate when they return: read each summary, check the diffs for conflicts, then run the `verify` skill, whose full gate covers the suite, before claiming the batch done. A race ends on the grafted base; coverage ends on the aggregate table.

Rules:

- Race and coverage never auto-start from idle capacity, deep mode, or "this might benefit from more attempts." The user opts in, after the cost is named.
- A batch is the biggest slice you did not write; `/recall` after integration pays the understanding back.
- Do not use partition when failures are related (fixing one may fix the rest), when the problem is still exploratory, or when agents would touch the same files.
- Do not use race to average divergent designs; re-frame instead. Do not use coverage without a done predicate.
