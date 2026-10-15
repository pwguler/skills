# App-check

A project with a runtime interface can keep a recipe that drives it. A runtime interface is a UI, a CLI, a TUI, or a service. The recipe is a project skill at `.pi/skills/verify-<app>/`. It starts the app, drives a feature the way a user does, records what happened, and stops what it started. `verify` drives the recipe when the base branch has one. Write a recipe or update a recipe only when the user asks. Then edit nothing outside `.pi/skills/verify-<app>/`.

## Drive

1. Run the health check of the recipe before the first drive, and again after anything unexpected.
2. Drive the features that the change touches. When you claim that the whole work is done, drive every feature in the map.
3. Keep the evidence where the recipe says. Confirm that it is still there after the teardown.
4. Stop every process that the drive started, by the id that it recorded.

Report a feature that the drive cannot reach as unreachable. Give the missing precondition and the route that you tried. Such a feature never passes by another route.

## Write

Learn the app from the repository. Ask the user only what the repository cannot answer.

- What a user touches: the primary interface first, with notes on the others.
- How it starts locally: the command, ports, environment, seed data, and sign-in.
- How to drive it. Use a driver that the repository already has: browser automation, an expect script, a PTY helper, or HTTP calls. Otherwise use the simplest driver: a browser for web, tmux for a CLI or TUI, and HTTP for a service.
- What to observe: screen captures, terminal transcripts, response bodies, logs, exit codes, and rows written.
- Whether two instances can run at the same time. When they cannot, the recipe says so and refuses a second drive.

When the checkout does not build or start as it is, report that and stop. A recipe written against a broken base records wrong steps.

The frontmatter of `SKILL.md` has `name: verify-<app>`. Its description says which app the recipe drives, and through which interface. `SKILL.md` has these sections:

- **Start:** the exact command, and the signal that the app is ready. Ready means that migrations and seed data are done, not only that a port is open. The section also gives the teardown.
- **Health:** one read-only check that tells whether this instance is fit to drive.
- **Drive:** the steps of the driver, with the real selectors and commands of this repository. Steps use handles that stay valid after a redesign: routes, prompt strings, ARIA labels, and data attributes. Never use screen coordinates.
- **Evidence:** what to keep, and where. Use the real user path, never an endpoint only for tests or an internal setter. Check side effects such as files, rows, and messages next to what the screen shows. Use mocks only at a boundary that production already isolates.
- **Teardown:** stop what this run started, by the recorded id, never by the process name. Remove scratch state. Keep the evidence.

`features/` has a `README.md` index, and one file for each feature that a user sees. Start with the three to five features that a user meets first. Each file starts with a heading and one paragraph about what the user sees. Then it has `Preconditions`, `Steps`, and `Gotchas`. Each step pairs an action with its exact command and the result to observe. Never weaken a step so that it passes. Put an unmet precondition in `Gotchas`.

Before you give the new recipe to the user, run it once from end to end. That is start, health, one feature, evidence, and teardown. Do the teardown after every failed attempt too. A recipe that never ran is only a draft.

## Update

1. Fix the `features/README.md` index: missing, extra, duplicate, or dead entries.
2. Compare each feature file with the source, and note where they disagree. Give the source path.
3. Look through recent changes for user interfaces that the map does not have. Name the source path before you call one missing.
4. Drive every feature once, also when the comparison found no difference.
5. Sort each disagreement. When the description is wrong, fix the file. When the driver cannot do what works, fix the steps. When the app is broken, report it. The recipe never hides it.

The update ends in one of three states:

- clean: nothing to change.
- changed: the recipe edits are ready for `land`.
- blocked: name what stopped it.
