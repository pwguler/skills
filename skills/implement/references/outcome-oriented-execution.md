# Outcome-oriented execution

A planned migration aims at its end state. When every commit on the way must pass every check, the work tends to add compatibility code. Examples are an adapter, a shim, or a second path. The plan deletes that code later, or never. Failing checks that the spec declares and limits cost less.

When: the spec has a Phases section, for a rewrite or a migration in phases.

- Inside a phase, only the checks that the spec names can fail. These are the checks of the code that the phase replaces, or of callers that have not moved yet. Every other check passes at every commit.
- A slice inside a phase uses the checks of the area that it touches as its gate. These are the tests of the modules that it changes, and of the code that calls them. Leave out the checks that the spec declared as failing. Commit on that evidence record. The full gate runs at the last commit of each phase, so the plan ends on a full gate.
- No phase ends with a failing check. When a phase cannot end with all checks passing, go back to the plan. Never add a shim.
- A slice writes no code that the plan deletes later. It adds no adapter that keeps an old call shape alive, and no flag that runs both paths. It keeps no copy of the old module for one caller.
- A check that starts to fail outside the declared ones is a regression. Fix it in the slice that caused it.

Where it stops: when a spec declares no phases, the full gate runs at every commit. Its migrations follow [migrate callers, then delete legacy APIs](migrate-callers-then-delete-legacy-apis.md), with the short-lived adapter. Inside a declared phase, write no adapter. The checks that the spec declared as failing already cover the callers that have not moved yet.
