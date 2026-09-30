# Subtract before you add

When a change evolves a system, take complexity out first and build on what remains. A smaller base leaves less code and shows the next design plainly.

When: sequencing a feature, refactor, or rewrite, before its first addition lands.

- Order removal ahead of construction: a removal the plan holds lands before any addition built on the code it clears, and implement's step 2 orders the rest of the slices by size.
- Cut to the minimum before spending effort on polish.
- Treat simplification as a standing investment: leave the design a little simpler and a little more capable than it was, behind a surface the same size or smaller.
- Design for the usage that exists, not for edge cases nobody has met.
- Add no validator, parser, or guard beyond what the spec demands and implement's "Defensive at I/O edges" requires; [boundary-discipline](boundary-discipline.md) says where those edges sit.
- In prompts and instruction text, cut repeated instructions and oversized templates.
- A reference with nothing new in it is deleted, not kept as a stub.

Where it stops: removal reaches what the change orphaned and what the plan names; other dead weight is flagged under implement's "Keep every diff surgical" and "flag dead code without removing it unasked", and it is removed first only when the plan includes it. An API a migration leaves without callers counts as orphaned, per [migrate-callers-then-delete-legacy-apis](migrate-callers-then-delete-legacy-apis.md). The ladder decides whether an addition is needed at all, and [laziness-protocol](laziness-protocol.md) keeps what does get added small.
