# Frontend from a settled design

When the slice is UI built from a design that is already settled, the acceptance shape differs from the default test-first loop: the design is the spec, and the check is visual, not only a unit test.

Ground first. Read the project's `DESIGN.md` and its design tokens, and the settled design itself (a `/design` canvas, a `prototype`, or a mockup). If no design is settled, stop and route to `prototype`; never invent the look here.

Decompose the design into the smallest buildable slices: one component or region at a time, matching the project's existing component structure and tokens.

For each slice, the acceptance criterion is the design itself:

- Visual match to the design.
- Responsive at the project's breakpoints.
- Accessible: roles, labels, contrast, keyboard, reduced motion.
- Every value drawn from `DESIGN.md` tokens, not hardcoded.

Step 2's failing test is that match. Check it by driving the app through `run` and comparing the rendered result, not only by a unit test. The rest of the loop is unchanged: minimum code to pass, refactor green, `verify` gates each slice, `land` closes it out.

Match the surrounding code: reuse existing components, tokens, and idioms, and add no dependency without a reason. The design is the spec; when it is silent, ask rather than guess.
