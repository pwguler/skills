---
name: prototype
description: Build a throwaway UI prototype to react to before committing. Use when a design fork turns on look, feel, or flow that prose cannot settle, or when the user asks to prototype or mock something up.
---

The user wants a throwaway prototype: something to react to before any real code. It settles a look, feel, or flow question that prose cannot.

1. Ground it in a design system before building; never prototype on model defaults, which read as slop. Use the project's `DESIGN.md` or existing design tokens when they exist. When none exists, get one from the user first: a `DESIGN.md`, a reference site to match, or a source like fontpairs.co for the type pairing. Do not start until type, color, and spacing trace to a real source.
2. When that source is a reference site or a type pairing rather than an existing `DESIGN.md`, write the resolved tokens (type, color, spacing) to the project's `DESIGN.md` before building; it is the one thing the prototype leaves behind, and `implement` and `rubric` read it.
3. Tokens leave most of the look open. Build to [look.md](references/look.md): the defaults generated UI drifts to, and what replaces them.
4. Build it as one self-contained HTML file outside the repository, and give the user its path to open in a browser.
5. Stop when the user has reacted.

Rules:
- Visual only. Mock the surface with fake data. Wire no backend, keep no state, touch no production code.
- Say less: short labels, no helper text or explanatory copy the design does not call for. Generated UI over-explains; a prototype that does is already wrong.
- When the direction is open, put a few genuinely different layouts in the file to react to, not one polished guess.
- Reference what exists: copy the markup and tokens of the real components or pages to match, rather than describing them.
- It is throwaway. It settles the direction; discard it once the user picks, and carry the decision into the real work.
- No production code, no branch, no persistence beyond `DESIGN.md`. The prototype is the whole deliverable.
