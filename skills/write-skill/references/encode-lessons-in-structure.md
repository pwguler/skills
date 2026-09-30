# Encode lessons in structure

A fix that keeps recurring goes into a mechanism (a tool, code, metadata, automation) rather than into one more written instruction. Text works only when the reader notices, remembers, and complies; a mechanism enforces the rule without asking.

When: the same instruction is about to be written a second time, or the same correction comes back.

- Ask whether a lint rule, a flag in metadata, a check at runtime, or a script can carry the rule. When it does, build that and delete the instruction.
- When it needs judgment, keep the instruction, give it a more prominent place, and show an example of the failure it prevents.
- Choose the strongest mechanism that fits, in this order: a state that cannot be represented and so fails to compile, a lint rule or banned API that breaks CI, a canonical helper, a runtime check.
- A structural fix stands alone: once it exists, the instruction it replaces is a symptom and goes.
- Every error, human correction, and surprise is a signal. Capture each one and decide whether it is a one-off or a pattern.
- Route it by reach: a one-off to the project's record (a settled term to `CONTEXT.md`, a decision that passes the ADR tests to `docs/adr/`), a recurring fix to a skill or a lint rule, a systemic one to a principle file in the skill whose step it deepens.
- Close the loop: apply it now, or open a concrete todo item for it.
- Three failures: acknowledging a lesson without recording it, since a promise to remember does not persist; recording it without routing it, like a note about a lint rule nobody builds; fixing one instance and leaving the pattern in place.

Where it stops: once a mechanism enforces the rule, write-skill's loop covers only the text that remains, and that text still needs an observed baseline failure. Implement's type-system-discipline principle owns the unrepresentable-state rung, and its build-the-lever principle owns the script.
