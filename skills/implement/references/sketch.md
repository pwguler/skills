# Sketch

Optional pre-slice design when the next work introduces new types, public signatures, or a module boundary. Sketch is not a second plan interview: the spec is already settled. A sketch that changes the settled shape routes back to `drill` for agreement.

## Ground

Read the seam the slice will touch. Name the domain concept per [model-the-domain.md](model-the-domain.md) and the type rules per [type-system-discipline.md](type-system-discipline.md).

## Two shapes

Produce at least two structurally distinct sketches (types, signatures, module ownership). Usage first, then types. Prefer a small public surface that hides real complexity. Reject shapes that show these red flags:

- Shallow module: large interface, little hidden capability; callers orchestrate many methods for one job.
- Information leakage: wire, storage, or framework types escape the boundary.
- Temporal decomposition: modules split by load/validate/save instead of ownership.
- Pass-through methods, split ownership of one piece of state, two ways to do one task, importable internals, hand-synced lists.

## Pick and contract

Pick one shape. Write it as the contract the slice will fill: types and signatures with stub bodies, or a short module map. Implement against that contract. Deviations are signal: stop and either fix the sketch or route a real fork to `drill`.

## Scrap

A pattern of friction (not one edge case) means the shape is wrong. Subtract before bolting on. Re-sketch; do not grow a wrong architecture.
