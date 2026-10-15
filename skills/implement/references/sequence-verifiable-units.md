# Sequence verifiable units

Do the work in small units. Each unit ends in a state that a check can confirm. Start the next unit only when the current one passes its check. A break found at the unit that made it is easy to find. A break found after many units is under work that depends on it.

When: a migration, or any series of similar edits. It applies also to the order of the commits and pull requests of a branch.

- Make each unit a closed sequence: a known good state, one change, the check, and then the next unit.
- In a series of similar edits, check each edit before you start the next one. Inside a slice, that check runs only the tests that exercise the edit. The implement rule on test runs says so.
- When a script does the edits ([build the lever](build-the-lever.md)), the check for each unit costs almost nothing. Run it anyway.
- Order the commits, and a stack of pull requests, so that the history explains the work. Put a subtraction before the change that it makes possible. Put a baseline capture before the change that you measure against it. Put the base work before the feature.
- Each commit stands alone: it passes the gate when you check it out alone. Inside a phase that the spec declares, that gate is the gate of the area, as [outcome-oriented execution](outcome-oriented-execution.md) says.
- Keep the output of a failing run as evidence under the hash of its own tree. Commit the test in the same commit as its fix.

Where it stops: the check of the unit is the narrow test run of the slice. The full gate runs once, at the commit of the slice, through `verify`. Inside a declared phase, it runs at the last commit of the phase. This file never adds a full run between them. The proof behind each check stays with the prove-it-works principle of verify. Dead code that a subtraction removes follows [subtract before you add](subtract-before-you-add.md).
