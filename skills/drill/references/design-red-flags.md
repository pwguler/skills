# Design red flags

A shape that looks good in a sketch can still break at the next change. Judge each candidate as its next contributor changes it. That contributor is an agent that read only the files it opened. It copies the closest example and takes the first path that compiles. Prefer the shape where an edit that looks correct inside one file is also correct for the whole repo. When a shape shows a red flag, change the shape or drop it. Replace a dropped shape, so that step 5 still compares two or three shapes.

When: step 5 weighs an architectural choice with more than one possible shape.

- **Shallow module.** The interface is about as large as what it hides. Callers join several calls for one operation, or options show internal stages. Fix: a smaller interface over more behavior, one call for each operation, and no option that names an internal stage. A deep module is not a deep call chain. A chain spreads one piece of understanding over many layers.
- **Information leakage.** Two modules depend on one internal decision, such as a format, a policy, or a protocol detail. A change to it needs edits in both modules. Fix: one module owns the decision. The boundary parses outside data into domain types, and no module exports the wire types again.
- **Temporal decomposition.** Modules follow the order of execution: load, validate, transform, save. Each module repeats the same representation and its invariants. Fix: group code by the knowledge that it owns. Then each representation and its invariants live in one module, also when its methods run at different times.
- **Pass-through method.** A method gives its arguments unchanged to another method of the same shape. Fix: remove it, or move the work to the module that can complete it. Keep a forwarding layer only when it adds policy or adaptation.
- **Split ownership.** Several modules write one piece of state, or each module has its own copy. An agent that changes one writer does not see the other writers. Their rules then stop matching. Fix: give each piece of state exactly one owning module. Other modules read the state or send requests to the owner.
- **Two ways to do one task.** Several routes give the same result, and the route that an agent finds first gets more callers. Fix: keep one route, move the callers to it, and delete the others in the same change. When outside users depend on a route, its deletion is a decision for the user.
- **Importable internals.** Code outside a module can import its internals. The fastest path that compiles then makes them part of the interface. Fix: make the internals unreachable from outside, so that such an import fails the build.
- **Hand-synced list.** The same items are in two or more lists, and a new item needs an edit in each list. An agent sees one list and updates only that one. Fix: derive every list from one list. Where derivation is not possible, add a build check that fails when two lists differ.

Where it stops: exhaust the design space decides when alternatives are necessary. This file checks the alternatives that step 5 compares.
