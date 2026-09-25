# Language

The architecture skill speaks a fixed vocabulary, so a suggestion means the same thing every time. Use these words; do not swap in "component", "service", "API", or "boundary".

| term | meaning | kept apart from |
|---|---|---|
| **Module** | Any unit with an interface and an implementation, at any size: a function, a class, a package, a slice through several layers. | "component" or "service", each of which implies one size |
| **Interface** | Everything a caller has to know to use the module correctly: the signature, plus invariants, required ordering, failure modes, configuration, and performance limits. A TypeScript type, a Python protocol, and a Rust trait can each carry part of it. | a signature or an `interface` keyword alone |
| **Implementation** | The code inside the module. | adapter, which names a role |
| **Depth** | How much behavior a caller or a test gets for each thing it must learn about the interface. Deep: a lot of behavior, little to learn. Shallow: the interface is about as complex as what it hides. | line counts |
| **Seam** | A point where behavior can change without editing the code at that point; the place a module's interface sits. Choosing it is a design decision of its own. | "boundary", which collides with bounded contexts |
| **Adapter** | Whatever fills the slot at a seam. It names the role, not the size: an in-memory fake with little code and a database repository with a lot are both adapters. | implementation |
| **Port** | The interface a module declares, in its own terms, for something it depends on across a seam. Adapters implement it. | adapter, which fills the port |
| **Leverage** | What callers gain from depth: more capability per unit of interface, repaid at every call site and in every test. | |
| **Locality** | What maintainers gain from depth: a change, a bug, or a fact lives in one place instead of spreading across callers. | |

A module presents one interface; that interface sits at a seam; an adapter fills the seam; depth, judged at the interface, gives callers leverage and maintainers locality.

## Working principles

- **Judge depth at the interface.** A deep module may be built from small swappable parts; they stay off its interface. Seams inside the implementation, used by the module's own tests, are fine.
- **The deletion test.** Picture the module gone. If its complexity goes with it, it only passed calls through. If the complexity comes back in every caller, it was doing real work.
- **Tests cross where callers cross.** A test that has to reach past the interface points at a module with the wrong shape.
- **A seam needs a second adapter to be real.** With one, it is a guess about the future; add it when something actually varies.

## Framings this skill does not use

- Depth as the ratio of implementation lines to interface lines: it rewards padding.
- Interface as only the public methods or the language keyword: it leaves out most of what callers depend on.
- "Boundary" for a seam: the word already belongs to bounded contexts.
