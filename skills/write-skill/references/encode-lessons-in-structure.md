# Encode lessons in structure

A fix that keeps recurring goes into a mechanism (a tool, code, metadata, automation) rather than into one more written instruction. Text works only when the reader notices, remembers, and complies; a mechanism enforces the rule without asking.

When: the same instruction is about to be written a second time, or the same correction comes back.

- A mistake that has happened twice is a class: fix the class, not only the instance in front of you.
- Fix the class at the highest rung that holds, architecture first: each piece of state has one owner, each task one supported way, internals sit where the outside cannot import them, a list has one source of truth, and the old way is deleted. Below that, in order: a state that cannot be represented and so fails to compile, a lint rule or CI check, a canonical helper, a runtime check or a flag in metadata, a test of the behavior, and a written instruction last, kept for calls that need judgment.
- A lint rule or CI check says in its error what to use instead: the file, the type, or the function. Where the pattern is already common, it fails only on new occurrences.
- Prove each new check against the real mistake: put a past instance back (the current slip before its fix, or the line an old commit had), run the check and see it fail, then take the instance out and see it pass. A check never seen failing proves nothing. It runs the same way locally and in CI.
- An exception carries, on the line it excuses, why it exists, when it expires, and who approved it.
- The agent instruction file (AGENTS.md or CLAUDE.md) keeps a table with a row per rule: the rule, and the mechanism that enforces it, or "none". The change that adds a check adds its row. A correction that matches a row whose mechanism is "none" is a repeat: fix it at the highest rung in that change. A row whose mistake can no longer happen leaves the table.
- When the rule needs judgment, keep the instruction, give it a more prominent place, and show an example of the failure it prevents.
- A structural fix stands alone: once it exists, the instruction it replaces is a symptom and goes, and the table row names the mechanism instead.
- A test that stays green when every function under it returns nothing guards nothing: fix it or delete it.
- Every error, human correction, and surprise is a signal. Capture each one and decide whether it is a one-off or a pattern.
- Route it by reach: a one-off to the project's record (a settled term to `CONTEXT.md`, a decision that passes the ADR tests to `docs/adr/`), a recurring fix to a skill or a lint rule, a systemic one to a principle file in the skill whose step it deepens.
- Close the loop: apply it now, or open a concrete todo item for it.
- Three failures: acknowledging a lesson without recording it, since a promise to remember does not persist; recording it without routing it, like a note about a lint rule nobody builds; fixing one instance and leaving the pattern in place.

Where it stops: once a mechanism enforces the rule, write-skill's loop covers only the text that remains, and that text still needs an observed baseline failure. Implement's type-system-discipline principle owns the unrepresentable-state rung, and its build-the-lever principle owns the script.
