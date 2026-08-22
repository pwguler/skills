---
name: prototype
description: Build a throwaway UI prototype to react to before committing. Prefers the /design canvas; falls back to a self-contained HTML artifact when /design is not available.
disable-model-invocation: true
argument-hint: "What should the prototype show?"
---

The user wants a throwaway prototype: something to react to before any real code. It settles a look, feel, or flow question that prose cannot.

Ground it in a design system before building; never prototype on model defaults, which read as slop. Use the project's `DESIGN.md` or existing design tokens when they exist. When none exists, get one from the user first: a `DESIGN.md`, a reference site to match, or a source like fontpairs.co for the type pairing. Do not start until type, color, and spacing trace to a real source.

Build it with the `/design` skill, a design canvas the user can see and refine. If `/design` is not available in this environment, write a single self-contained HTML artifact instead, with the same intent.

- Visual only. Mock the surface with fake data. Wire no backend, keep no state, touch no production code.
- Say less: short labels, no helper text or explanatory copy the design does not call for. Generated UI over-explains; a prototype that does is already wrong.
- When the direction is open, put a few genuinely different layouts on the canvas to react to, not one polished guess.
- Reference what exists: point `/design` at the real components or pages to match, rather than describing them.
- It is throwaway. It settles the direction; discard it once the user picks, and carry the decision into the real work.

No production code, no branch, no persistence. The prototype is the whole deliverable. Stop when the user has reacted.
