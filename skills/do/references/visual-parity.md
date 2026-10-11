# Visual parity

When: a surface must match a reference: a screenshot, a design file, or a live page.
Not when: no reference exists and the look is still open (`prototype`).

1. Treat the reference as the spec: list what it fixes (layout, type, color, spacing, and each state shown) before any change.
2. Capture the current surface the way the reference was captured: the same viewport, data, and state.
3. Run `implement` on the differences, one region of the surface per slice.
4. After each slice, capture the surface again and compare it side by side with the reference.
5. Run `rubric` with the list from step 1 as its criteria and the latest capture as the artifact.

Done when: `rubric` passes every item from step 1 on a capture of the current tree.
