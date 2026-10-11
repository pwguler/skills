---
name: pecut
description: Route a task to its playbook, or to the one skill that owns it, and run the suite's skills in order. Run /pecut <task> at the start of a task, before any other work.
disable-model-invocation: true
---

One task, one route: a playbook that orders the suite's skills, or the one skill that owns the whole flow. Pick the route before any other work, then follow it to its end.

1. Name the task's type and match it to one route under Rules. A narrower route wins over bug-fix, feature, or perf-issue; when two routes still fit, ask the user one question naming both; when none fits, the route is `drill`.
2. A route to a skill hands the task to that skill: run it, and stop routing.
3. A route to a playbook: open it, and check its `When:` and `Not when:` against the task; when `Not when:` matches, take the route it names instead. Otherwise copy its steps into a todo list (a checklist in the reply when the harness has no todo tool); when a todo list is already open, add them to it.
4. Run the steps in order. A step that names a skill runs that skill on the task; any other step is done in this session as the playbook words it.
5. Stop when the playbook's `Done when:` holds, or when a step stops the work for the user; either way, report the result against `Done when:`.

Rules:

- A bug, an error, a crash, a failing test, wrong output, or a regression: [bug-fix](references/bug-fix.md).
- A new feature, or a change to what the product does: [feature](references/feature.md).
- A change to structure that keeps every caller-visible behavior: [refactoring](references/refactoring.md).
- A question about how or why the code behaves as it does, answered without changing it: [investigation](references/investigation.md).
- Opening a pull request for finished work: [opening-a-pr](references/opening-a-pr.md).
- Something too slow or too costly that the user wants faster or cheaper: [perf-issue](references/perf-issue.md).
- A metric the user asks to push as far as it goes, round after round: [hillclimb](references/hillclimb.md).
- A surface made to match a reference image, design file, or page: [visual-parity](references/visual-parity.md).
- Proving whether a change to a skill, a prompt, or an instruction file changes how agents behave: [eval](references/eval.md).
- One open pull request taken to merge-ready: [babysit-pr](references/babysit-pr.md).
- Work on one branch run unattended until a written exit: [autonomous-run](references/autonomous-run.md).
- Resuming work an earlier session left: [session-pickup](references/session-pickup.md).
- Stopping now so another session can resume: [pause-safely](references/pause-safely.md).
- Reclaiming disk from old worktrees: [worktree-cleanup](references/worktree-cleanup.md).
- Writing or editing a skill or other agent-facing prose: `write-skill`.
- A plan for work across several phases: `drill`.
- Merging a finished branch, keeping it, or discarding it: `land`.
- A mock-up to react to before building: `prototype`.
- Several dependent pull requests driven to merge, live-process or trace forensics, and anything else: `drill`.
- A step that belongs to a skill runs that skill; a playbook never stands in for the skill's own rules.
- `deep` stays with the skills: under it, each skill a route runs applies its own deep line.
