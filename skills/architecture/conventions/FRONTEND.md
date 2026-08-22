# Frontend from a settled design

When the slice is UI built from a design that is already settled, the acceptance shape differs from the default test-first loop: the design is the spec, and the check is visual, not only a unit test.

Ground first. Read the project's `DESIGN.md` and its design tokens, and the settled design itself (a `/design` canvas, a `prototype`, or a mockup). If no design is settled, stop and route to `prototype`; never invent the look here.

Decompose the design into the smallest buildable slices: one component or region at a time, matching the project's existing component structure and tokens.

For each slice, the acceptance criterion is the design itself:

- Visual match to the design.
- Responsive at the project's breakpoints.
- Accessible: roles, labels, contrast, keyboard, reduced motion.
- Every value drawn from `DESIGN.md` tokens, not hardcoded.
- Performant: animate `transform` and `opacity` only, and meet Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1).

Step 2's failing test is that match. Check it by driving the app through `run` and comparing the rendered result, not only by a unit test. The rest of the loop is unchanged: minimum code to pass, refactor green, `verify` gates each slice, `land` closes it out.

Match the surrounding code: reuse existing components, tokens, and idioms, and add no dependency without a reason. The design is the spec; when it is silent, ask rather than guess.

## Say less in the UI

Generated interfaces over-explain. Every label, hint, and empty state earns its place or goes:

- Labels are nouns, buttons are verbs, both short. No sentence where a word does.
- No helper text under a field the label already explains. No tooltip restating the label.
- Empty states are one line and one action, not a paragraph of encouragement.
- No explanatory banners, onboarding blurbs, or "here you can" copy unless the design has them.
- Errors say what went wrong and what to do, in one line.

## Avoid the AI tells

Grounding in real tokens kills most of these, but check anyway:

- No AI-purple gradients, and no pure black or pure white; use the palette's real values.
- Serif type only with a reason. Do not center everything; the design's own alignment wins.
- No fake avatars, logos, or startup-slop brand names; use the project's real content or the design's.
- Real images, not fake screenshots or placeholder-generator art.

## On a redesign

When the work replaces existing UI rather than building new:

- Audit the existing tokens, components, and content first; preserve what the design keeps.
- Preserve the information architecture and URLs unless the design changes them on purpose; churn there costs SEO.
- Apply modernization in order: typography, spacing, color, motion.
