---
name: parallel
description: "Dispatch independent tasks to concurrent subagents and integrate what they return. Run by a pecut playbook step that names it, or by debug for failures with separate causes."
---

One agent per independent problem domain, all dispatched in a single response so they run concurrently. Without subagent dispatch, run the tasks one at a time in this session; independence is the guarantee, parallelism is only the cheap way to get it.

Rules:
- Each agent's prompt carries scope, context, constraints, and expected return. Scope: one file, one subsystem, one problem. "Fix all the tests" loses the agent. Context, pasted in: error messages, test names, relevant paths. Agents inherit nothing from the session. Constraints: what must not change ("tests only", "do not touch production code"). Expected return: a summary of root cause and changes, so integration is reviewable.
- Integrate when they return: read each summary, check the diffs for conflicts, then run the `verify` skill, whose full gate covers the suite, before claiming the batch done.
- Do not use when failures are related (fixing one may fix the rest: investigate together first), when the problem is still exploratory, or when agents would touch the same files.
