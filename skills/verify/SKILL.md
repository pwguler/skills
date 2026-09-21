---
name: verify
description: Prove a claim of done, fixed, or passing by running the commands and reading the output before making it. Use before claiming work is complete, fixed, or tested, and before committing or opening a PR.
---

Evidence before assertion. A claim without a fresh command run behind it is not made.

1. Name the claim about to be made: "done", "fixed", "passes", "works".
2. Sort the claim. What a command can settle is verified here; a taste claim is not. When the claim is about quality (a design, a UI, a public interface, a name, prose), run the `rubric` skill for it, now, whether or not the commands come back green. Rejecting a taste claim as unprovable is a routing failure, not a verdict.
3. Run the commands that would prove it false: the tests, the build, the linter, and the actual behavior that changed.
4. Green tests prove the code satisfies the tests, not that the tests constrain the code. Run the mutation tool named in the stack's [tooling](../architecture/tooling/README.md) file over the changed source files only, differential, never the whole tree, and quote the survivors list. Each survivor is killed with a test or explained in one line as equivalent: the mutated program behaves the same, so no test can tell them apart. An unexplained survivor fails the claim. A change with no mutation sites (a rename, config, wiring, prose) says so and moves on. A stack with no tool in tooling/ reports the claim as partial: "tests pass; not mutation-checked".
5. When a spec exists at `docs/specs/<slug>.md`, gate criterion by criterion: run each criterion's verification command and quote the output that proves it, and take a criterion whose line names `rubric` from that judge's verdict rather than a command. Then check the diff against the spec's non-goals; a change inside fenced scope fails the claim even with green tests. A spec that still carries an `## Open decisions` section is a draft, and a draft proves nothing: no claim can be made against it; route back to `drill`.
6. Exercise the changed path end to end, not only its unit tests. If the change has a runtime surface, drive it.
7. Read the output. Passing means the output says passing, not that the command exited. A mutation run is read from its survivors list, not its score.
8. State what was run and what it showed. If it broke, say it broke, with the output. When the spec names an artifact, the evidence is that artifact re-run, not a description of an earlier demo.

Rules:

- Default stance: reject. A claim is false until fresh output proves it; the implementer's word is not evidence.
- Never claim from memory of an earlier run; re-run after the last edit.
- A verification command is the project's test runner, build, or linter, or a tool named in the stack's tooling file. A script written on the same branch as the change is not a verification command; a claim resting on one is rejected, however green.
- A skipped check is reported as skipped, not implied as passing.
- Review feedback is a claim: verify it before implementing. Unclear feedback is checked, not obeyed.
- Partial verification gets a partial claim: "tests pass; behavior not exercised" is honest, "done" is not.
- A claim no command can prove (good design, not slop, reads well) is `rubric`'s to settle: never fail it as unprovable, and never pass it because everything a command could check came back green.
- Fast path (one-sentence plan, no spec file): the gate is that sentence's criterion, not the whole suite. Run only the tests that exercise the change; the changed path still runs end to end, and mutation still runs over the changed files.
- Deep mode (the `deep` skill is active): exercise the changed path end to end unconditionally and gate every criterion; mutation covers every source file the branch touched, not only the last slice; a partial claim is not accepted as final.
