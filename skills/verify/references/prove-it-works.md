# Prove it works

Check a result by looking at the real thing that it produced, never at a proxy for it. An action on a wrong inference costs much more than the look that would have found the error.

When: you read the result of the changed path through a proxy. A proxy is a timestamp, a status file, a cached value, a screenshot, or a report from another agent. It applies also when a check fails, or for a port or migration that someone examines later.

- A self-report, the summary of a subagent, and "it compiles" are not evidence, as the default answer of verify says.
- Look at the thing itself. Check a running process directly, not through state that comes from it. Examples of such state are a file timestamp, an output that looks fresh, or an old screenshot.
- Read the value itself, never a cached or derived copy of it.
- When a check fails, suspect the way that it observed before you suspect the system.
- A comparison that you can run again is better than one look. The test runner, the build, or the linter of the project can run again. Its saved output in the evidence record is the evidence that a reviewer can run again.
- Show that saved output to the user. Commit it only for large work that someone must examine later, such as a port or a migration.

Where it stops: the proof is the test runner, the build, and the linter of the project. The changed path, driven end to end, is part of the proof too. A script written on the same branch as the change never proves the claim, whatever it prints. A claim that no command can settle goes to rubric.
