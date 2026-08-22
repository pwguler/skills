# Immutability and a pure core

Data is immutable by default, and the core of a module is pure: the same input yields the same output, with no effect on the world. Effects live at the edge.

- **Immutable by default.** Produce new values; never mutate an argument, a shared structure, or a value another caller holds. Mutation is allowed only local to one function, on data it created, when the gain is measured.
- **The core is functions over data.** Business logic takes values and returns values. It reads no clock, no random source, no environment, no network, no disk. What it needs from the world arrives as an argument.
- **Effects are injected, never reached for.** Time, randomness, I/O, and identity generation enter through the interface as explicit dependencies, so a test can supply a fixed clock or an in-memory store. A module that calls `now()` internally cannot be tested for yesterday.
- **One effectful shell.** The edge performs the effects the core decided on: it reads, calls the pure core, then writes. Decide in the core, act at the edge, never interleave.
- **Purity is the test strategy.** A pure core needs no mocks, no setup, no teardown; a table of inputs and expected outputs covers it. When a test needs a mock for core logic, an effect has leaked inward.

Pairs with DIRECTION.md: that file governs what a module imports; this one governs what it does.
