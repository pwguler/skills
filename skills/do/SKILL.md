---
name: do
description: Route a task to its playbook and run the suite's skills in the playbook's order. Run /do <task>.
disable-model-invocation: true
---

One task, one route: a playbook that orders the suite's skills, or the one skill that owns the whole flow. Pick the route before any other work, then follow it to its end.

1. Name the task's type and match it to one route under Rules. When two routes fit, ask the user one question naming both; when none fits, the route is `drill`.
2. A route to a skill hands the task to that skill: run it, and stop routing.
3. A route to a playbook: open it, check its `When:` and `Not when:` against the task, and copy its steps into a todo list (a checklist in the reply when the harness has no todo tool); when a todo list is already open, add them to it.
4. Run the steps in order. A step that names a skill runs that skill on the task; any other step is done in this session as the playbook words it.
5. Stop when the playbook's `Done when:` holds, and report the result against it.

Rules:

- A bug, an error, a crash, a failing test, wrong output, or a regression: [bug-fix](references/bug-fix.md).
- A new feature, or a change to what the product does: [feature](references/feature.md).
- A change to structure that keeps every caller-visible behavior: [refactoring](references/refactoring.md).
- A question about how or why the code behaves as it does, answered without changing it: [investigation](references/investigation.md).
- Opening a pull request for finished work: [opening-a-pr](references/opening-a-pr.md).
- Something too slow or too costly, with a target to meet or a regression to undo: [perf-issue](references/perf-issue.md).
- One metric pushed as far as it goes in small measured steps, with no fixed target: [hillclimb](references/hillclimb.md).
- A surface made to match a reference image, design file, or page: [visual-parity](references/visual-parity.md).
- Proving whether a change to a skill, a prompt, or an instruction file changes how agents behave: [eval](references/eval.md).
- One open pull request taken to merge-ready: [babysit-pr](references/babysit-pr.md).
- Work on one branch run unattended until a written exit: [autonomous-run](references/autonomous-run.md).
- Writing or editing a skill or other agent-facing prose: `write-skill`.
- A plan for work across several phases: `drill`.
- Merging a finished branch, keeping it, or discarding it: `land`.
- A mock-up to react to before building: `prototype`.
- Several dependent pull requests driven to merge, live-process or trace forensics, and anything else: `drill`.
- A step that belongs to a skill runs that skill; a playbook never stands in for the skill's own rules.
- `deep` stays with the skills: under it, each skill a route runs applies its own deep line.
