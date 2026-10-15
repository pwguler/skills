# Encode lessons in structure

Put a fix that keeps coming back into a mechanism, not into one more written instruction. A mechanism is a tool, code, metadata, or automation. Text works only when the reader notices it, remembers it, and obeys it. A mechanism enforces the rule without a request.

When: you are about to write the same instruction a second time, or the same correction comes back.

- A mistake that happened twice is a class. Fix the class, not only the instance in front of you.
- Fix the class at the highest level that holds. Architecture comes first:
  - each piece of state has one owner;
  - each task has one supported way;
  - internals are where the outside cannot import them;
  - a list has one source of truth;
  - the old way is deleted.
- Below architecture, use these levels in this order:
  1. a state that the types cannot represent, so that it fails to compile;
  2. a lint rule or a CI check;
  3. a canonical helper;
  4. a runtime check or a flag in metadata;
  5. a test of the behavior;
  6. a written instruction, last, only for calls that need judgment.
- A lint rule or CI check names in its error what to use instead: a file, type, or function. Where the pattern is already common, the check fails only on new occurrences.
- Prove each new check against the real mistake. Put a past instance back: the current error before its fix, or the line that an old commit had. Run the check, and see it fail. Then remove the instance, and see the check pass. A check that you never saw fail proves nothing. It runs the same way locally and in CI.
- An exception has a note on its line: why it exists, when it expires, and who approved it.
- The agent instruction file (AGENTS.md or CLAUDE.md) keeps a table with one row for each rule. The row gives the rule, and the mechanism that enforces it, or "none". The change that adds a check also adds its row. A correction that matches a row with "none" as its mechanism is a repeat. Fix it at the highest level in that change. Remove a row when its mistake can no longer happen.
- When the rule needs judgment, keep the instruction. Give it a more visible place, and show an example of the failure that it prevents.
- A structural fix is enough alone. When it exists, the instruction that it replaces is only a symptom, so delete that instruction. The table row then names the mechanism.
- A test that still passes when the behavior breaks protects nothing. A test that fails when only the internals change is wrong too. Fix it or delete it.
- Every error, human correction, and surprise is a signal. Record each one, and decide whether it happened once or is a pattern.
- Route each signal where it belongs. A one-time event goes to the record of the project. In that record, a settled term goes to `CONTEXT.md`, and a decision that passes the ADR tests goes to `docs/adr/`. A repeated fix goes to a skill or a lint rule. A fix for the whole system goes to a principle file in the skill whose step it adds detail to.
- Act on each signal. Apply the fix now, or create a concrete item for it in the task list.
- There are three failures. The first: you accept a lesson but do not record it, because a promise to remember does not last. The second: you record it but do not route it, like a note about a lint rule that nobody builds. The third: you fix one instance and leave the pattern.

Where it stops: when a mechanism enforces the rule, the write-skill loop covers only the text that is left. That text still needs a baseline failure that you observed. Implement's type-system-discipline principle owns the level of states that the types cannot represent. Its build-the-lever principle owns the script.
