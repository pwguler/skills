# Outcome-oriented execution

A planned migration aims at its end state. Holding every commit on the way fully green tempts the work into compatibility code (an adapter, a shim, a second path) that the plan deletes later or never does; red checks that the spec declares and bounds cost less.

When: the spec has a Phases section, a rewrite or migration planned in phases.

- Inside a phase, only the checks the spec names may be red: those of the code being replaced or of callers not yet moved. Every other check stays green at every commit.
- A slice inside a phase gates on the checks of the area it touches (the tests of the modules it changes and of the code that calls them, less the checks the spec declared red) and commits on that record. The full gate runs at each phase's last commit, so the plan ends on one.
- No phase ends red. A phase that cannot end green goes back to the plan, never to a shim.
- A slice writes no code the plan deletes later: no adapter that keeps an old call shape alive, no flag that runs both paths, no copy of the old module kept for one caller.
- A check that turns red outside the declared ones is a regression: fix it in the slice that caused it.

Where it stops: work whose spec declares no phases keeps the full gate at every commit, and its migrations follow [migrate callers, then delete legacy APIs](migrate-callers-then-delete-legacy-apis.md), short-lived adapter included. Inside a declared phase no adapter is written: the checks the spec declared red already cover the callers not yet moved.
