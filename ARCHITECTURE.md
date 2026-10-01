# Architecture

## What this is
A suite of agent skills that carries work from a fuzzy plan to a landed branch. Each skill is a folder of Markdown instructions that an agent harness loads when a task matches its description, or when the user invokes it by name. The suite installs into Claude Code through `npx skills` or as a plugin.

## Modules
- The loop: `drill` settles a plan and writes its spec, `implement` builds it test-first one slice at a time, `verify` proves each claim with fresh command output and sends taste claims to `rubric`, and `land` closes the branch.
- `core-interview`: the questioning loop `drill` runs, one fork at a time.
- `debug`: root cause before any fix.
- `rubric`: judges a quality claim against criteria written first, by a judge that did not make the work.
- `prototype`, `research`, `parallel`: a throwaway to react to, facts from the sources that own them, independent tasks run at once.
- `tldr`, `recall`: report a result, and test the user's grasp of code the agent wrote.
- `deep`: turns every skill under its dial to full rigor for the session.
- `write-skill`: writes any document an agent reads, these skills included, and proves it changes behavior.

## Seams
- A skill's description is its trigger, except for a user-only skill, which fires only by name. Changing when a skill fires means changing that line.
- Skills reach each other by name, never by path: `verify` runs `rubric`, `drill` runs `core-interview`.
- `rubric` takes the criteria a calling skill hands over: on code, `implement` hands its principle files to `verify`, which passes them to `rubric`.
- The deep line: a skill under `deep`'s dial ends its SKILL.md with the line that says what full rigor changes there, and `deep` applies that line.
- The spec at `docs/specs/<slug>.md` in the target project: `drill` writes it, `implement` builds from it, `verify` gates against it, and `land` closes it.
- Harness capabilities (subagents, a question tool, a design canvas) are preferences with a fallback, never requirements.

## Invariants
- A skill folder holds `SKILL.md` and at most one `references/` folder with every file the skill links. No link leaves its skill's folder; a file two skills use is copied into both, byte for byte.
- An engineering principle lives in the `references/` of one skill, linked from the step or rule it deepens there.
- Every SKILL.md body runs in one order, each block present where the skill has one: the law, `Fast path:`, numbered steps, `Rules:`, and the deep line last.
- Skill prose is decisive present tense, with no em dashes and no upstream names.
- A claim is made only on fresh command output, or, for a taste claim, on the verdict of a judge that did not make the work.
