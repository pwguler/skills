# App-Check

A project with a runtime surface (UI, CLI, TUI, service, desktop, or mobile) keeps a project-local skill that launches the real app, drives a feature the way a user would, and captures evidence. Tests alone do not settle that claim. The skill lives once under the project's agent skills directory as `verify-<app>/` (`.claude/skills/verify-<app>/` when this pack is installed into Claude Code) and stays current as the app changes.

App-check has three jobs: create the skill when none exists, drive it when a claim needs proof, and maintain it when the map drifts. Product code is never edited during create or maintain: a behavior the map describes that the app no longer does is either map drift (fix the map) or a product regression (report it).

## Create

Interview the repo, not the user. Ask only what the codebase cannot show.

- **Surface:** what a user actually touches. A repo can have several; pick the primary one and note the rest.
- **Run:** the documented local start command, ports, env, seed data, auth.
- **Drive:** existing harnesses first (browser automation, expect scripts, PTY helpers, HTTP). Only then a generic recipe: browser for web and Electron, a PTY or tmux session for CLI or TUI, plain HTTP for services.
- **Observe:** screenshots, terminal transcripts, response bodies, logs, exit codes, DB state.
- **Isolate:** whether two instances can run side by side. If not, the skill says so: refuse to double-drive a shared instance.

If the checkout does not build or start as-is, fix that first, or report it precisely, before writing the skill. A skill written against a broken base teaches wrong steps.

Write `verify-<app>/SKILL.md` with frontmatter (`name: verify-<app>`, a description that names the app, the surface, and when to reach for it) and these sections, each grounded in what the interview found, no placeholders left:

- **Launch:** the exact start command, how to tell it is ready (usable, not merely answering), teardown. Ready means migrations and seed finished. For a short-lived CLI there is no long-lived server: build once, then start each drive in its own isolated session.
- **Doctor:** one read-only check that answers "is this instance worth driving?" An agent runs this first whenever anything looks off.
- **Drive:** the harness recipe with real selectors and commands from this repo. Prefer stable handles (ARIA labels, data attributes, prompt strings, route paths) over coordinates and tab order.
- **Evidence:** what to capture and where it goes. Exercise the real user path, not internal setters or test-only endpoints. Capture the action and the resulting state. Verify side effects (files, rows, messages) alongside what is visible. Mocks only where a production boundary already isolates the external system. When a dry-run or test mode is the safe path, observe what it actually skips rather than trusting its name.
- **Cleanup:** tear down instances this run created. Kill what you started, never by process name. Cleanup removes instances and scratch state, never the evidence.
- **Helpers:** any script the skill ships is executable, and its invocation is shown in the skill body.

Seed `verify-<app>/features/`: a README index plus one file per user-facing feature (start with the top three to five from routes, commands, menus, or docs). Each feature file starts with an H1 and one paragraph of user-visible behavior, then exactly four H2s in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, `Gotchas`. The driving section starts with `Preconditions:` and pairs each user action with an exact command and observable result. Never weaken a journey to make it pass; put unmet preconditions in `Gotchas`.

Prove the generated skill once before handing it over: launch, doctor, drive one mapped feature, capture evidence, clean up, and confirm the evidence still exists at the named location. Fix what fails, and run cleanup after every failed iteration too. A skill that was never executed is a draft, not a deliverable.

## Drive

When a claim needs app-check and `verify-<app>` exists, follow that skill. Doctor before the first drive. Drive the features the change touches, or every mapped feature when the whole work is claimed done. Capture evidence to the locations the skill names. Hold three invariants:

1. Never drive an instance you have not health-checked since it last did something surprising.
2. Evidence captured so far survives every cleanup; check it at its named location.
3. Nothing a drive started outlives that drive's usefulness.

A feature that cannot be reached is reported as unreachable with the concrete prerequisite and the route attempted, never as passing through a different path.

## Maintain

A feature map rots when the app changes. Say which outcome you leave with:

- **clean:** every feature got source and live coverage; nothing worth shipping. No branch, no PR.
- **changed:** one PR ships proven doc, harness, or map corrections.
- **blocked:** coverage could not finish or a proven fix could not ship safely. Say exactly what blocked it.

Pass:

1. Locate the target `verify-<app>` skill. Several candidates: ask which. None: stop and create instead of inventing a target.
2. Index hygiene: fix missing, extra, duplicate, or dead entries in the features README.
3. Source wave: one read-only pass per feature file (concurrent subagents when the harness allows). Each returns a short summary, cited drift or none, and one live recipe. Children never drive the app and never edit.
4. Reconcile recipes into as few app states as practical. Sweep recent churn for user-facing surfaces missing from the map; require a concrete source path before calling one missing.
5. Live pass: required even when source looks clean. Exercise every feature at least once under the three drive invariants above. A doctor failure caused by skill drift is drift: fix it under edit scope and retry once.
6. Triage: wrong user-POV description is doc drift; harness cannot drive working behavior is a harness gap; broken app behavior is a product gap (record it, keep it out of the verification PR).
7. Ship or stop: for changed, one PR of proven corrections after re-reading every changed file. For clean or blocked, no PR.

Edit only the verification skill's own directory. Keep concise run notes in a scratch location; do not commit them.
