# Architecture

## What this is
A suite of agent skills that carries work from a fuzzy plan to a landed branch. Each skill is a folder of Markdown instructions that an agent harness loads when a task matches its description, or when the user invokes it by name. The suite installs into Claude Code through `npx skills` or as a plugin.

## Modules
- The loop: `drill` settles a plan and writes its spec, `implement` builds it test-first one slice at a time (optional type sketch before new boundaries, blast-radius before a commit you do not trust), `verify` proves each claim with fresh command output and app-check on a runtime surface, `rubric` interrogates the diff for defects then judges taste claims, and `land` closes the branch.
- `core-interview`: the questioning loop `drill` runs, one fork at a time.
- `debug`: root cause before any fix.
- `correct`: user-only; make repeated agent mistakes impossible, and reflect a session into approval-gated skill edits.
- `prototype`, `research`, `parallel`: a throwaway to react to, facts from the sources that own them (including why from internal history), independent tasks with opt-in race or coverage modes.
- `tldr`, `recall`: report a result or catch the user up, and test the user's grasp of code the agent wrote.
- `deep`: turns every skill under its dial to full rigor for the session.
- `write-skill`: writes any document an agent reads, these skills included, and proves it changes behavior.

## Seams
- A skill's description is its trigger, except for a user-only skill, which fires only by name. Changing when a skill fires means changing that line, and `test/descriptions.json` pins every description so no edit changes one by accident.
- Skills reach each other by name, never by path: `verify` runs `rubric`, `drill` runs `core-interview`, `land` offers `correct`, `correct` routes prose edits through `write-skill`.
- The deep line: a skill under `deep`'s dial ends its SKILL.md with the line that says what full rigor changes there, and `deep` applies that line.
- The spec at `docs/specs/<slug>.md` in the target project: `drill` writes it, `implement` builds from it, `verify` gates against it, and `land` closes it.
- Harness capabilities (subagents, a question tool, a design canvas) are preferences with a fallback, never requirements.
- A project-local `verify-<app>` skill under the project's agent skills directory is the maintained app-check recipe `verify` drives when a runtime surface exists.

## Invariants
- A skill folder holds `SKILL.md` and at most one `references/` folder with every file the skill links. No link leaves its skill's folder; a file two skills use is copied into both, byte for byte.
- Every SKILL.md body runs in one order: the law, `Fast path:`, numbered steps, `Rules:`, and the deep line last.
- `npm test` checks both invariants and every description.
- Skill prose is decisive present tense, with no em dashes and no upstream names.
- A claim is made only on fresh command output, or, for a taste claim, on the verdict of a judge that did not make the work. Defect findings from `rubric`'s interrogate pass are not taste; they loop back to `implement` or `debug`.
