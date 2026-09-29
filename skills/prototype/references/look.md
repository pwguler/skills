# Look

Generated UI drifts to the same few defaults, and a prototype built on them tells the user nothing. `DESIGN.md` sets type, color, and spacing; these rules cover what tokens leave open.

## Every surface

- Before building, say the read in one line: what the surface is, who uses it, and the look it aims for.
- None of the stock look: glow gradients in purple or blue, gradient-filled headlines, neon edges, frosted glass as decoration, a centered hero on a dark blurred blob, three identical cards side by side, idle elements that loop.
- One accent with one job, the same in every section. One corner-radius scale. One light or dark theme for the whole surface.
- Group with space and dividers first. A card or a shadow marks real elevation, and shadows take the background's hue.
- Icons come from a single icon library. No emoji, custom cursors, or hand-drawn illustrations.
- Motion appears only when motion is the question; otherwise nothing moves beyond hover and focus.
- Every label, button, input, and focus ring stays readable against what sits behind it. Form labels sit above their fields; placeholder text never stands in for a label.
- Variants differ in structure and density, not only in color.

## Copy

- Fake data looks like real data: believable names, values, and dates, never Jane Doe, Acme, or lorem ipsum. A claim about the product itself, such as a speedup or a customer count, appears only when the brief supplies it.
- Each action has one name across the surface; "Get started" and "Try it free" on one page are the same button twice.
- A button label fits on one line; a primary action takes three words or fewer.
- No em dashes anywhere in the page, comments included.
- Read every string once before showing the prototype, and rewrite anything cute, vague, or ungrammatical as a plain sentence.

## Landing, portfolio, and marketing pages

- The hero fits the first screen at 1440 by 900 with its action in view. It holds four text elements at most: an optional eyebrow, a headline of two lines or fewer, one line of subtext of 20 words or fewer, and up to two actions; an install command is one of the two. Logos, badges, pricing, and taglines move to the sections below.
- The navigation is one line, under 80 px tall.
- A section header is a headline, with any body text stacked beneath it, not squeezed beside it.
- Eyebrow labels sit above one section in three at most, and a section number is an eyebrow.
- No section layout repeats, and image-and-text splits never run three in a row. Parallel items, such as three primitives, share one section (a comparison, tabs, or one block) instead of one section apiece. A grid has no empty or filler cells.
- Products appear as real images or as the interface itself rendered small with fake data, never as a screenshot mocked up from boxes. Without an asset, use placeholder photos by URL; a page of text alone is not finished.
- A long list becomes groups or tabs rather than a table ruled under every row.
- A quote runs three lines at most and names the person and their role.
