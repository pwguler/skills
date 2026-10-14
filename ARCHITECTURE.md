# Architecture

## What this is
A suite of agent skills for pi that carries work from a fuzzy plan to a landed branch. Each skill is a folder of Markdown instructions that pi loads when a task matches its description, or when the user runs `/skill:<name>`. The repository is a pi package: pi discovers the skills in `skills/`.

## Modules
- The loop: `drill` settles a plan and writes its spec, `implement` builds it test-first one slice at a time and checks the blast radius of a slice that changes a contract, `verify` proves each claim with fresh command output and drives the runtime surface, `rubric` runs the defect pass and judges taste claims, and `land` closes the branch.
- `core-interview`: the questioning loop `drill` runs, one fork at a time.
- `debug`: root cause before any fix.
- `prototype`, `research`, `parallel`: a throwaway to react to, facts from the sources that own them and the history behind the code, and the parallel work the user asks for (partition, race, coverage).
- `tldr`, `recall`: report a result or catch the user up, and test the user's grasp of code the agent wrote.
- `deep`: turns every skill under its dial to full rigor for the session.
- `write-skill`: writes any document an agent reads, these skills included, and proves it changes behavior.

## Seams
- A skill's description is its trigger, except for a user-only skill, which fires only through `/skill:<name>`. Changing when a skill fires means changing that line, and `test/descriptions.json` pins every description so no edit changes one by accident.
- Skills reach each other by name, never by path: `verify` runs `rubric`, `drill` runs `core-interview`, `land` runs `verify` and `rubric`.
- The deep line: a skill under `deep`'s dial ends its SKILL.md with the line that says what full rigor changes there, and `deep` applies that line.
- The spec at `docs/specs/<slug>.md` in the target project: `drill` writes it, `implement` builds from it, `verify` gates against it, and `land` closes it.
- The pi tools the skills call by name, each from a pi package: `subagent` (pi-subagents, with its `reviewer`, `worker`, `researcher`, and `scout` agents), `todo` (rpiv-todo), `ask_user_question` (rpiv-ask-user-question), and `web_search` with `fetch_content` (pi-web-access).
- A subagent runs only where a skill names one: `rubric`'s reviewers and judges, `write-skill`'s baseline, `drill`'s AFK research, a hand-off or parallel run the user asked for, and a payload too large for the session. `rubric`'s taste judges and a race's grader run on a model from a different family than the one that made the work, and the defect pass pairs a reviewer on the session's model with one from another family; every other subagent runs on the session's model.
- A project's app recipe at `.pi/skills/verify-<app>/`: `verify` drives it in the form the base branch has, and writes or updates it only when the user asks.

## Invariants
- A skill folder holds `SKILL.md` and at most one `references/` folder with every file the skill links. No link leaves its skill's folder; a file two skills use is copied into both, byte for byte.
- Every SKILL.md body runs in one order: the law, `Fast path:`, numbered steps, `Rules:`, and the deep line last.
- Skill text names no coding agent other than pi, and no upstream project or skill.
- Each of the 24 engineering principles lives in the `references/` of the skill whose step or rule it deepens (debug, drill, implement, research, verify, write-skill), linked from that line.
- `npm test` checks these four invariants and every description.
- Skill prose is decisive present tense, with no em dashes.
- A claim is made only on fresh command output, or, for a taste claim, on the verdict of a judge that did not make the work. Findings from `rubric`'s defect pass are not taste; they go back to `implement` or `debug`.
