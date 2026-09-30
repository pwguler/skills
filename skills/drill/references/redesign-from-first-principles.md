# Redesign from first principles

A new requirement enters an existing design as if it had been a founding assumption, never as a part bolted onto the old shape. Designing around it keeps later options open.

When: a settled design meets a requirement it was not built for, whether in the interview or in the middle of other work.

- Read every file the requirement touches and state how the current design works before proposing a change.
- Ask what a blank page would produce with the requirement known on day one, and put that design on the table as one of step 5's approaches.
- List every reference the change reaches: types, docs, examples, rationale sections. The settled design names them all.
- Design the whole change first, then deliver it in pieces: the spec's criteria become implement's slices, and each slice carries the references it touches.

Where it stops: a redesign found mid-slice is a fork, routed through drill: implement stops and names it rather than growing the slice, and debug's design-problem rule routes the same way. This file rebuilds a design around a new requirement; questioning a fact the current design assumes, after fixes built on it fail, is debug's attack-the-premise principle.
