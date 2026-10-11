---
name: auto
description: Route a task to the playbook for its type and run the suite's skills in the playbook's order. Run /auto <task> at the start of a task, before any other work.
disable-model-invocation: true
---

One task, one playbook. A playbook is the only place the order of the suite's skills is written: each skill checks its own work and stops, and the playbook starts the next one. Pick the playbook before any other work, then follow it to its end.

1. Name the task's type and match it to one route under Rules. A narrower route wins over bug-fix, feature, or perf-issue; when two routes still fit, ask the user one question naming both; when none fits, the route is figure-it-out.
2. Open the playbook and check its `When:` and `Not when:` against the task; when `Not when:` matches, take the playbook it names instead. Otherwise copy its steps into a todo list (a checklist in the reply when the harness has no todo tool); when a todo list is already open, add them to it.
3. Run the steps in order. A step that names a skill runs that skill on the task; any other step is done in this session as the playbook words it. When a skill stops on a condition a rule below names, that rule decides the next move.
4. Stop when the playbook's `Done when:` holds, or when a step stops the work for the user; either way, report the result against `Done when:`.

Rules:

- A bug, an error, a crash, a failing test, wrong output, or a regression: [bug-fix](references/bug-fix.md).
- A new feature, or a change to what the product does: [feature](references/feature.md).
- A change to structure that keeps every caller-visible behavior: [refactoring](references/refactoring.md).
- A question about how or why the code, or a library or service it uses, behaves as it does, answered without changing it: [investigation](references/investigation.md).
- Something too slow or too costly that the user wants faster or cheaper: [perf-issue](references/perf-issue.md).
- A metric the user asks to push as far as it goes, round after round: [hillclimb](references/hillclimb.md).
- A surface made to match a reference image, design file, or page: [visual-parity](references/visual-parity.md).
- Proving whether a change to a skill, a prompt, or an instruction file changes how agents behave: [eval](references/eval.md).
- One open pull request taken to merge-ready: [babysit-pr](references/babysit-pr.md).
- Work on one branch run unattended until a written exit: [autonomous-run](references/autonomous-run.md).
- Resuming work an earlier session left: [session-pickup](references/session-pickup.md).
- Stopping now so another session can resume: [pause-safely](references/pause-safely.md).
- Reclaiming disk from old worktrees: [worktree-cleanup](references/worktree-cleanup.md).
- Writing or editing a skill, AGENTS.md, CLAUDE.md, a system prompt, or other prose an agent reads: [authoring-a-skill](references/authoring-a-skill.md).
- A plan for work that runs in phases on one branch: [multi-phase-plan](references/multi-phase-plan.md).
- Finished work leaving its branch: a pull request, or the path the user names (merge locally, keep, discard): [shipping](references/shipping.md).
- A mock-up to react to before building: [prototype](references/prototype.md).
- Several dependent pull requests driven to merge, live-process or trace forensics, and anything no other route fits: [figure-it-out](references/figure-it-out.md).
- When `verify` stops a one-sentence plan because the task was not obvious, run `drill` on the task through its interview, then go on with the settled plan.
- When `implement` or `verify` stops on a draft spec, run `drill` on its open decisions, then go on from the step that stopped.
- When `debug` reports a design problem behind a failure, offer the feature playbook on the redesign and stop for the user.
- A step that runs `implement` without a spec gives it the change in one sentence; that sentence is its plan.
- When a playbook that ran `implement` or `parallel` reaches `Done when:`, offer `/recall` on the code the agent wrote.
- A step that belongs to a skill runs that skill; a playbook never stands in for the skill's own rules.
