# Design red flags

A shape that reads well in a sketch can still be one the next change breaks. Judge each candidate as its next contributor changes it: an agent that has read only the files it opened, imitates the closest example, and picks whatever path compiles first. Prefer the shape in which an edit that seems correct from inside one file is also correct for the repo as a whole. A flag is a reason to revise the shape or drop it, and a dropped shape is replaced, so step 5 still compares two or three.

When: step 5 weighs an architectural choice with more than one viable shape.

- **Shallow module.** The interface is about as large as what it hides: callers string several calls together for one operation, or options expose internal stages. Fix: a smaller interface over more behavior, one call per operation, and no option naming an internal stage. A deep module is not a deep call chain; a chain spreads one understanding over many layers.
- **Information leakage.** Two modules rely on one internal decision (a format, a policy, a protocol detail), so changing it means editing both. Fix: one module owns the decision; outside data is parsed into domain types at the boundary, and wire types are not re-exported.
- **Temporal decomposition.** Modules follow execution order (load, validate, transform, save), and each repeats the same representation with its invariants. Fix: group code by the knowledge it owns, so each representation and its invariants live in one module, even when its methods run at different times.
- **Pass-through method.** A method hands its arguments unchanged to another of the same shape. Fix: remove it, or move the work to the module able to finish it; a forwarding layer stays only when it adds policy or adaptation.
- **Split ownership.** Several modules write one piece of state, or each keeps a copy of it. An agent editing one writer does not see the others, and their rules drift apart. Fix: each piece of state gets one owner; the rest read it or ask the owner.
- **Two ways to do one task.** Several routes reach the same result, and whichever one an agent finds first gains callers. Fix: keep one, move the callers, and delete the others in the same change, unless outside users depend on one, which makes its deletion a fork for the user.
- **Importable internals.** Code outside a module can import its internals, so the quickest path that compiles turns them into interface. Fix: make them unreachable from outside, so such an import fails the build.
- **Hand-synced list.** The same items are listed in two or more places, and adding one means editing each. An agent sees one list and updates that one. Fix: derive every list from a single one; where a list cannot be derived, the build fails when they disagree.

Where it stops: exhaust the design space decides when alternatives are needed; this file screens the ones on the table.
