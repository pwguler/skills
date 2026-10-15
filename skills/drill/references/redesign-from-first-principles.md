# Redesign from first principles

Add a new requirement to an existing design as if it was an assumption from the start. Do not attach it to the old shape as an extra part. A design built around the requirement keeps later options open.

When: a settled design meets a requirement that it was not built for. This can happen in the interview or in the middle of other work.

- Read every file that the requirement touches. State how the current design works before you propose a change.
- Ask what design you would make if the requirement was known on the first day. Show that design as one of the step 5 approaches.
- List every reference that the change reaches: types, docs, examples, and rationale sections. The settled design names all of them.
- Design the whole change first, then deliver it in parts. The criteria of the spec become the slices of implement. Each slice updates the references that it touches.

Where it stops: a redesign found mid-slice is a decision for the user, and drill handles it. Implement stops and names it, and does not make the slice larger. The debug rule on design problems sends a design problem to drill the same way. This file rebuilds a design around a new requirement. To question a fact that the current design assumes, after fixes built on it fail, use debug's attack-the-premise principle.
