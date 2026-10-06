---
name: verify
description: Prove a claim of done, fixed, or passing by running the commands and reading the output before making it. Use before claiming work is complete, fixed, or tested, and before committing.
---

Evidence before assertion. A claim without a fresh command run behind it is not made.

Fast path: when the plan is one sentence and no spec file exists, the gate for that sentence's criterion is a closed list: the tests that exercise the change, the build, and the linter, not the rest of the suite. The changed path still runs end to end. A second failed gate on a fast-path task means the task was not obvious: stop and run `drill` on it.

1. Name the claim about to be made: "done", "fixed", "passes", "works".
2. Sort the claim. What a command can settle is verified here; a taste claim is not. When the claim is about quality (a design, or a quality surface, as `rubric` defines it), run the `rubric` skill for it once the whole work is claimed done, with any criteria the calling skill hands over, whether or not the commands come back green; a slice's gate leaves it for then. Rejecting a taste claim as unprovable is a routing failure, not a verdict.
3. Run the commands that would prove it false: the tests, the build, the linter, and the actual behavior that changed. The full gate (every test, the build, the linter) runs once per commit, on the tree about to be committed, except on the fast path, where the gate is the closed list above, and for a change with no runtime behavior (docs, comments, assets), where it is the build and the linter; inside a slice, the red-green loop runs only the tests that exercise it.
4. When a spec exists at `docs/specs/<slug>.md`, gate it criterion by criterion and check the diff against its non-goals, as [spec gate](references/spec-gate.md) lays out.
5. Exercise the changed path end to end, not only its unit tests. If the change has a runtime surface, drive it. Open [prove it works](references/prove-it-works.md) when the changed path's result is read through a proxy (a timestamp, a status file, a cached value, a screenshot, or a report from another agent), a check fails, or the work is a port or a migration.
6. Read the output. Passing means the output says passing, not that the command exited.
7. State what was run and what it showed. If it broke, say it broke, with the output. When the spec names an artifact, re-run it and show its result, not a description of an earlier demo; the claim rests on the gate's output, never on the artifact alone.

Rules:

- Default stance: reject. A claim is false until fresh output proves it; the implementer's word is not evidence.
- Never claim from memory of an earlier run. The evidence record is each command and its saved output, keyed on the tree id that [fingerprint.sh](references/fingerprint.sh) prints, with `--with-markdown` when any gate command reads Markdown (a test, the build, a docs linter) or the change is Markdown only; when it prints no id, there is no record. A record whose id matches the tree is fresh output, not memory: reuse it, and never re-run it unless a deep line orders a re-run. A change to an ignored file the tests read (an env file, local config) voids the record, though the id does not change.
- Dedupe and batch: plan every command a claim needs, run each once in a single call, and map the output onto criteria. Each command writes its full output to a file (`> /tmp/verify-<hash>-<name>.log 2>&1`); read and search that file. Running a command again to see more of its output is a duplicate run. Independent commands run concurrently; independent means no shared file, port, database, or build directory. A criterion is a reading of output already produced, not another suite boot.
- A verification command is the project's test runner, build, or linter. A script written on the same branch as the change is not a verification command; a claim resting on one is rejected, however green.
- A skipped check is reported as skipped, not implied as passing.
- Review feedback is a claim: verify it before implementing. Unclear feedback is checked, not obeyed.
- Partial verification gets a partial claim: "tests pass; behavior not exercised" is honest, "done" is not.
- A claim no command can prove (good design, not slop, reads well) is `rubric`'s to settle: never fail it as unprovable, and never pass it because everything a command could check came back green.

Deep mode (the `deep` skill is active): exercise the changed path end to end unconditionally and gate every criterion; a partial claim is not accepted as final.
