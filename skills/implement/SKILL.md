---
name: implement
description: "Implement a settled plan test-first, smallest slice at a time. Use when starting implementation of a feature or fix after the plan is settled, or when user says \"implement this\" or \"build it\"."
---

Work the plan one thin slice at a time. A slice is the smallest piece that changes observable behavior.

When a spec exists at `docs/specs/<slug>.md`, its acceptance criteria are the plan: work criterion by criterion, and let the spec's non-goals fence every diff. A spec that still carries an `## Open decisions` section is a draft, not a plan: stop and route back to `drill`; implementation cannot start until the draft is settled.


1. Open a todo list before the first test: one item per acceptance criterion when a spec exists, one per slice otherwise, then `verify`, then `rubric` when the work is a UI, a public interface, a name, or a doc. A list of fewer than three items is not opened. Mark each item done as it lands. An item you skip stays in the list as `skip: <reason>`; a criterion is never skipped, only left open.
2. Pick the smallest unfinished slice of the plan. When the plan has three slices or more and the harness dispatches subagents, brief one subagent with the slice and this skill to work steps 3 to 5 and stop before the gate; read its diff, have a second subagent run the slice's gate, and commit on that record. Otherwise work steps 3 to 5 in this session.
3. Write the test that fails for it. Test external behavior through the interface, never implementation details. If no failing test can be written, the seam is wrong: stop and fix the plan, not the test.
4. Write the minimum code that makes it pass.
5. Refactor only with tests green. Match the existing style of the surrounding code.
6. Repeat from step 2 until the plan has no unfinished slices.

Rules:

- On the repo's base branch (whatever the remote HEAD points at), recommend a git branch before the first test and ask; the spec slug names it, or a short slug of the one-sentence plan when there is no spec. Implementing on the base branch is the user's call to make, not yours to assume. A session already on a feature branch stays there.
- One implementation at a time. Unlanded work is never abandoned for a new task on your own: name the options (finish and land it, land it partial, or park it) and let the user pick. Only `land` ends the work.
- No production code before its failing test exists. The one exception is wiring whose only effect lives inside a host the tests cannot drive (a plugin entry point, a registration with a framework): its proof is an end-to-end run through `verify`, never a regex or string match over source.
- Before the first test of a slice, list the ways it can fail. Test the likely ones and the costly ones (lost data, money, access, a broken caller contract); name the rest in the commit message. Size the tests to the change: a one-line fix gets one regression test, not a new harness.
- Inside a slice, run only the test files or test names that exercise it, never the whole suite, however small. The slice ends with one gate, run through `verify` with its output saved as the evidence record: the full gate, or on the fast path the sentence's criterion. Commit on that record. A full run before it, or after the commit on the same tree, is a duplicate.
- A test that passes regardless of the change protects nothing; grep-style string checks counterfeit falsifiability. A slice whose tests never went red on the behavior under test is not done.
- Keep every diff surgical: each changed line traces to the current slice.
- Before adding anything, walk the ladder: does it need to exist, does the stdlib or platform do it, does a present dependency, does one line. Test code walks it too: extend the fake, fixture, or helper that exists before writing a new one; extending it is part of the slice.
- Type-safe with no escape hatches. Defensive at I/O edges, trusting inside. No silent fallback that hides failure.
- Every call across the network is bounded by a timeout, and a write a caller may retry carries an idempotency key.
- Every interleaving of two operations on the same record is correct: a check made before an `await` is stale after it, so re-check it there or run that record's operations one at a time.
- Configuration is input: validate it where it is constructed and refuse a bad value there, not on first use.
- A component's state changes only through its own operations: never hand out a reference to it that a caller could mutate or that changes under them.
- Delete what your change orphaned; flag dead code without removing it unasked.
- Each slice's commit message is one line in the repository's convention (read recent `git log`; imperative lowercase when there is none), names the criterion by what it says, never its spec id, and gives the why, not only the what. Stage the specific files, never `git add .`.
- A bug or unexpected failure mid-slice routes to the `debug` skill; do not patch around symptoms.
- A genuine fork found mid-slice is never guessed: stop, name it, and let the user answer or switch to deep.
- Three failed attempts on the same slice stop the loop: escalate to the user with the criterion, what was tried, and the last error.
- When the last slice lands, run the `verify` skill before claiming the work is done. When the work is a UI, a public interface, a name, or a doc, its quality is a claim of its own: run the `rubric` skill on it too, since the maker never judges its own taste.
- Deep mode (the `deep` skill is active): work only from the spec, criterion by criterion. No one-sentence plans.
