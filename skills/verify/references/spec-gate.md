# Spec gate

A spec's acceptance criteria are the claim: each one is proved by its own output or verdict, and the spec's non-goals fence the diff.

When: `verify` runs on work that has a spec at `docs/specs/<slug>.md`.

- A spec that still carries an `## Open decisions` section is a draft. A draft proves nothing: no claim is made against it; route back to `drill`.
- At a slice's commit, gate the criteria that slice touches; a criterion a declared phase ends at is gated at the phase's last commit. When the whole work is claimed done, gate every criterion, reading each from the last record while its id still matches.
- Run each criterion's verification command and quote the output that proves it. A criterion whose line names `rubric` is taken from that judge's verdict rather than a command, and a slice's commit leaves it for the whole work.
- When the whole work is claimed done, the criteria are items in the open todo list, or in a new one (a checklist in the reply when the harness has no todo tool) when none is open and there are three criteria or more. An item is marked done only on the output or verdict that proves it; a criterion without one stays open.
- Then check the diff against the spec's non-goals. A change inside fenced scope fails the claim even with green tests.

Where it stops: commands and their saved output follow verify's rules; this file decides only which criteria a claim proves and what fences the diff.
