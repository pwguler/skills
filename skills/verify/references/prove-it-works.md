# Prove it works

A result is checked by looking at the real thing it produced, never at a proxy for it. A wrong inference acted on costs far more than the look that would have caught it.

When: a task's output is about to be called done, fixed, or working.

- A self-report, a subagent's summary, and "it compiles" are not evidence, per the default stance.
- Look at the thing itself: a running process is checked directly, not through state derived from it, such as a file timestamp, an output that looks fresh, or an old screenshot.
- Read the value itself, never a cached or derived copy of it.
- When a check fails, suspect the way it observed before suspecting the system.
- A comparison that reruns beats a single look. The rerunnable form is the project's test runner, build, or linter, and its saved output in the evidence record is the trail a reviewer can rerun.
- Show that saved output to the user, and commit it only when the work is large enough that the trail must be audited later, such as a port or a migration.

Where it stops: the proof is the project's own test runner, build, and linter, plus the changed path driven end to end; a script written on the same branch as the change never proves the claim, whatever it prints. A claim no command can settle goes to rubric.
