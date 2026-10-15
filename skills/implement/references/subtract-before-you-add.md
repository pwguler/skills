# Subtract before you add

When a change develops a system, remove complexity first, and build on what is left. A smaller base leaves less code, and it shows the next design clearly.

When: before you add a file, a layer, a dependency, or a parameter.

- Put removal before construction. A removal that the plan holds goes in before any addition that depends on the code that it removes. Step 2 of implement orders the other slices by size.
- Cut to the minimum before you spend effort on polish.
- Make the interface larger only when no existing name, parameter, or option can hold the new capability.
- Design for the usage that exists, not for edge cases that nobody has met.
- Add no validator, parser, or guard beyond what the spec demands and the implement rule on I/O boundaries requires. [Boundary-discipline](boundary-discipline.md) tells where those boundaries are.
- In prompts and instruction text, cut repeated instructions and templates that are too large.
- Delete a reference with no new content in it. Do not keep it as a stub.

Where it stops: removal covers what the change made unused and what the plan names. It also covers dead code in the files that the slice changes. Keep dead code that a non-goal puts out of scope. Flag dead code in other files under the implement rule on dead code. Remove it first only when the plan includes it. An API that a migration leaves without callers is unused because of the change, as [migrate-callers-then-delete-legacy-apis](migrate-callers-then-delete-legacy-apis.md) says. The four questions of implement decide whether an addition is necessary at all. [Laziness-protocol](laziness-protocol.md) keeps each addition small.
