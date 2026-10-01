---
name: implement
description: "Implement a settled plan test-first, smallest slice at a time. Use when starting implementation of a feature or fix after the plan is settled, or when user says \"implement this\" or \"build it\"."
---

Work the plan one thin slice at a time. A slice is the smallest piece that changes observable behavior. When a spec exists at `docs/specs/<slug>.md`, its acceptance criteria are the plan: work criterion by criterion, and let the spec's non-goals fence every diff. A spec that still carries an `## Open decisions` section is a draft, not a plan: stop and route back to `drill`; implementation cannot start until the draft is settled.

1. Open a todo list (a checklist in the reply when the harness has no todo tool) before the first test: one item per acceptance criterion when a spec exists, one per slice otherwise, then `verify`, which runs `rubric` when the work touches a quality surface, as `rubric` defines it. A list of fewer than three items is not opened. Mark each item done as it lands. An item you skip stays in the list as `skip: <reason>`; a criterion is never skipped, only left open.
2. Pick the smallest unfinished slice of the plan. When the plan has three slices or more, the harness dispatches subagents, and the user's instructions ask for them, run the slice as [subagent slices](references/subagent-slices.md) lays out; otherwise work steps 3 to 5 in this session.
3. Write the test that fails for it. Test external behavior through the interface, never implementation details. If no failing test can be written, the seam is wrong: stop and fix the plan, not the test; a change that preserves behavior is the exception.
4. Write the minimum code that makes it pass.
5. Refactor only with tests green. Match the existing style of the surrounding code.
6. Gate the slice through `verify` and commit on its record, per the gate rule.
7. Repeat from step 2 until the plan has no unfinished slices.
8. When no slice is left, run `verify` on the whole work, which runs `rubric` when the work touches a quality surface; then offer the user `land`, which ends the work, and `/recall` on the code the agent wrote.

Rules:

- With no spec and no one-sentence plan that passed drill's sizing, run `drill` first: its fast path sizes a one-sentence change in one line.
- On the repo's base branch (whatever the remote HEAD points at), recommend a git branch before the first test and ask; the spec slug names it, or a short slug of the one-sentence plan when there is no spec. Implementing on the base branch is the user's call to make, not yours to assume. The user's answer holds for the rest of the session. A project instruction (AGENTS.md or CLAUDE.md) that settles where work goes answers it for every session. A session already on a feature branch stays there.
- One implementation at a time. Unlanded work is never abandoned for a new task on your own: name the options (finish and land it, land it partial, or park it) and let the user pick. Only `land` ends the work.
- No production code before its failing test exists. One exception is wiring whose only effect lives inside a host the tests cannot drive (a plugin entry point, a registration with a framework): its proof is an end-to-end run through `verify`, never a regex or string match over source.
- A change that preserves behavior (a refactor, a rename, a deletion) is the other exception: the tests that cover it, green before and after, are its test. When no test covers it, first add one that passes on the current code and pins what it does. A change with no runtime behavior (docs, comments, assets) needs no test: its gate is the build and the linter, plus `rubric` when it touches a quality surface.
- Before the first test of a slice, list the ways it can fail. Test the ones the spec or the report names and every costly one (lost data, money, access, a broken caller contract); name the rest in the commit body. Size the tests to the change: a one-line fix gets one regression test, not a new harness.
- Inside a slice, run only the test files or test names that exercise it, never the whole suite, however small. The slice ends with one gate, run through `verify` with its output saved as the evidence record: the full gate, or on the fast path the sentence's criterion. Commit on that record. A full run before it, or after the commit on the same tree, is a duplicate. A run of similar edits follows [sequence verifiable units](references/sequence-verifiable-units.md).
- Whenever this skill runs `verify` on code, it hands over the principle files in `references/` as the criteria `verify` passes to `rubric`.
- A test that passes regardless of the change protects nothing ([test behavior, not implementation](references/test-behavior-not-implementation.md), opened when a test's assertion does not plainly compare the subject's output with a literal value); grep-style string checks counterfeit falsifiability. A slice whose tests never went red on the behavior under test is not done.
- Keep every diff surgical: each changed line traces to the current slice.
- Before adding anything, walk the ladder ([laziness protocol](references/laziness-protocol.md) and [subtract before you add](references/subtract-before-you-add.md), opened before adding a file, a layer, a dependency, or a parameter): does it need to exist, does the stdlib or platform do it, does a present dependency, does one line. Test code walks it too: extend the fake, fixture, or helper that exists before writing a new one; extending it is part of the slice.
- Mechanical work (a sweep of edits, a migration, generated files, an analysis over data) is done by a tool built for it, not by hand: open [build the lever](references/build-the-lever.md) before the first hand edit.
- When a slice's logic holds state, branches on a shape, or lays down a type later slices share, the data shape comes first: open [model the domain](references/model-the-domain.md) and [foundational thinking](references/foundational-thinking.md) before writing that logic.
- Type-safe with no escape hatches ([type-system discipline](references/type-system-discipline.md), opened when designing a type or a signature). Defensive at I/O edges, trusting inside ([boundary discipline](references/boundary-discipline.md), opened when wiring validation, error handling, or an adapter at an I/O edge). No silent fallback that hides failure.
- A call across the network gets a timeout, and a write a caller may retry gets an idempotency key ([make operations idempotent](references/make-operations-idempotent.md), opened for a command, startup step, scheduler, or loop that writes state and can run twice).
- When two operations touch the same record, re-check any condition read before an `await` after it, or run that record's operations one at a time ([separate before serializing shared state](references/separate-before-serializing-shared-state.md), opened when two actors could write the same file, key, or record).
- Validate configuration where it is constructed and refuse a bad value there, not on first use ([boundary discipline](references/boundary-discipline.md), opened when wiring configuration).
- Change a component's state only through its own operations, and hand out no reference to it that a caller could mutate or that changes under them ([minimize reader load](references/minimize-reader-load.md), opened before exposing a component's state).
- Before adding a wrapper, a layer, or a piece of state, open [minimize reader load](references/minimize-reader-load.md) and add it only when it passes that file's test.
- Delete what your change orphaned ([migrate callers, then delete legacy APIs](references/migrate-callers-then-delete-legacy-apis.md), opened before writing a new API that replaces one that still has callers); flag dead code without removing it unasked.
- Each slice's commit subject is one line in the repository's convention (read recent `git log`; imperative lowercase when there is none), names the criterion by what it says, never its spec id, and gives the why, not only the what. Stage the specific files, never `git add .`.
- A bug or unexpected failure mid-slice routes to the `debug` skill; do not patch around symptoms.
- A genuine fork found mid-slice is never guessed: stop, name it, and let the user answer or switch to deep.
- Three failed attempts on the same slice stop the loop: escalate to the user with the criterion, what was tried, and the last error.

Deep mode (the `deep` skill is active): work only from the spec, criterion by criterion. No one-sentence plans.
