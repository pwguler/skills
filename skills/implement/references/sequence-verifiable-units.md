# Sequence verifiable units

Work goes in small units that each end in a state a check can confirm, and the next unit starts only once the current one is green. A break found at the unit that made it is cheap to locate, while one found after a batch sits under work already built on it.

When: a sweep, a migration, or any run of similar edits, and the order of a branch's commits and pull requests.

- Frame each unit as a bracket: a known-good state, one change, the check, then the next unit.
- In a run of similar edits, check each edit before starting the next; inside a slice that check is the narrow run of the tests that exercise it, per the rule this file hangs from.
- When a script does the edits ([build the lever](build-the-lever.md)), the check per unit costs almost nothing; run it anyway.
- Order commits, and a stack of pull requests, so the history argues for the work: a subtraction before the reshape it clears the way for, a baseline capture before the treatment measured against it, the scaffold before the feature.
- Each commit stands on its own: it passes the gate when checked out alone.
- A test's red state goes in the evidence record, and the test lands in the same commit as its fix.

Where it stops: the unit's check is the slice's narrow test run, and the full gate runs once, at the slice's commit, through `verify`; this file never adds a full run between. The proof behind each check stays the verify skill's prove-it-works principle, and dead weight a subtraction clears follows [subtract before you add](subtract-before-you-add.md).
