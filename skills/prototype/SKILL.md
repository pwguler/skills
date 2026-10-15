---
name: prototype
description: Build a throwaway UI prototype for the user to react to before any real code. Read this skill when the user asks for a mockup or a prototype of a UI. Use it when a design decision depends on look, feel, or flow that text cannot settle.
---

The user wants a throwaway prototype to react to before any real code. It settles a question of look, feel, or flow that text cannot settle.

1. Base the prototype on a design system before you build. Never build on the defaults of the model, because they look generic. Use the `DESIGN.md` of the project, or its existing design tokens, when they exist. When none exists, get one from the user first. That is a `DESIGN.md`, a reference site to match, or a font pairing from a source such as fontpairs.co. Do not start until typography, color, and spacing come from a real source.
2. Sometimes that source is a reference site or a font pairing, not an existing `DESIGN.md`. Then write the resolved tokens to the `DESIGN.md` of the project before you build: typography, color, and spacing. That file is the one thing that the prototype leaves behind. `implement` and `rubric` read it.
3. Tokens leave most of the look open. Build to [look.md](references/look.md): the defaults that generated UI tends toward, and what replaces them.
4. Build the prototype as one self-contained HTML file outside the repository. Give the user its path, to open in a browser.
5. Stop when the user has reacted.

Rules:

- The prototype is visual only. Mock the screens with fake data. Connect no backend, keep no state, open no branch, and touch no production code.
- Write less: short labels, and no helper text or explanation that the design does not need. Generated UI explains too much. A prototype that explains too much is already wrong.
- When the direction is open, put a few clearly different layouts in the file to react to. Do not show one polished guess.
- Copy what exists: the markup and tokens of the real components or pages to match. Do not describe them.
- The prototype is a throwaway. It settles the direction. Discard it when the user picks, and take the decision into the real work.
