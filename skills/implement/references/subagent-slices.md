# Subagent slices

A slice handed to a subagent costs two extra sessions, and the main session stays answerable for it.

When: the plan has three slices or more, the harness dispatches subagents, and the user's instructions ask for them.

- Brief one subagent with the slice and the implement skill to work steps 3 to 5, and stop before the gate.
- Read its diff in the main session.
- Have a second subagent, one that did not write the slice, run the slice's gate, and commit on that record.

Where it stops: when any of the three conditions is missing, the main session works steps 3 to 5 itself.
