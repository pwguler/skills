# App-check

A project with a runtime surface (a UI, CLI, TUI, or service) can keep a recipe for driving it: a project skill at `.pi/skills/verify-<app>/` that starts the app, drives a feature the way a user does, records what happened, and stops what it started. `verify` drives the recipe when the base branch has one. Writing one and updating one happen only when the user asks, and edit nothing outside `.pi/skills/verify-<app>/`.

## Drive

1. Run the recipe's health check before the first drive, and again after anything unexpected.
2. Drive the features the change touches, or every mapped feature when the whole work is claimed done.
3. Keep the evidence where the recipe says it goes, and confirm it is still there after teardown.
4. Stop every process the drive started, by the id it recorded.

A feature the drive cannot reach is reported as unreachable, with the missing precondition and the route tried. It never passes by another route.

## Write

Learn the app from the repository; ask the user only what the repository cannot answer.

- What a user touches: the primary surface first, the others noted.
- How it starts locally: the command, ports, environment, seed data, sign-in.
- How to drive it: a driver the repository already has (browser automation, an expect script, a PTY helper, HTTP calls), else the plainest one for the surface: a browser for web, a tmux session for a CLI or TUI, HTTP for a service.
- What to observe: screen captures, terminal transcripts, response bodies, logs, exit codes, rows written.
- Whether two instances can run at once. When they cannot, the recipe says so and refuses a second drive.

When the checkout does not build or start as it is, report that and stop: a recipe written against a broken base records wrong steps.

`SKILL.md` carries frontmatter (`name: verify-<app>`, a description naming the app and its surface) and these sections:

- **Start:** the exact command, the signal that the app is usable (migrations and seed done, not only a port open), and teardown.
- **Health:** one read-only check that says whether this instance is fit to drive.
- **Drive:** the driver's steps with this repository's real selectors and commands. Steps hold on to handles that survive a redesign (routes, prompt strings, ARIA labels, data attributes), never screen coordinates.
- **Evidence:** what to keep and where. The real user path, never a test-only endpoint or an internal setter. Side effects (files, rows, messages) checked next to what the screen shows. Mocks only at a boundary production already isolates.
- **Teardown:** stop what this run started, by recorded id, never by process name. Scratch state goes; evidence stays.

`features/` holds a `README.md` index and one file per user-facing feature, starting with the three to five a user meets first. Each file opens with a heading and one paragraph of what the user sees, then `Preconditions`, `Steps` (each action paired with its exact command and the result to observe), and `Gotchas`. A step is never softened to pass; an unmet precondition goes in `Gotchas`.

Run the new recipe once end to end (start, health, one feature, evidence, teardown) before handing it over, and tear down after every failed attempt too. A recipe that never ran is a draft.

## Update

1. Fix the `features/README.md` index: missing, extra, duplicate, or dead entries.
2. Read each feature file against the source and note where they disagree, citing the source path.
3. Look through recent changes for user-facing surfaces the map lacks; name the source path before calling one missing.
4. Drive every feature once, even when the reading found no drift.
5. Sort each disagreement: the description is wrong (fix the file), the driver cannot do what works (fix the steps), or the app is broken (report it; the recipe never hides it).

The pass ends clean (nothing to change), changed (recipe edits ready for `land`), or blocked (name what stopped it).
