# Look

Generated UI tends toward the same few defaults, and a prototype built on them tells the user nothing. `DESIGN.md` sets typography, color, and spacing. These rules cover what the tokens leave open.

## Every screen

- Before you build, state in one line what the screen is, who uses it, and its target look.
- Use none of the stock look: glow gradients in purple or blue, headlines filled with gradients, or neon edges. Use no frosted glass as decoration, and no centered hero on a dark blurred shape. Use no three identical cards side by side, and no idle elements that loop.
- Use one accent with one job, the same in every section. Use one corner-radius scale. Use one light or dark theme for the whole prototype.
- Group with space and dividers first. A card or a shadow marks real elevation. Shadows take the hue of the background.
- Take icons from one icon library. Use no emoji, custom cursors, or hand-drawn illustrations.
- Use motion only when motion is the question. Otherwise, nothing moves beyond hover and focus.
- Every label, button, input, and focus ring stays readable against what is behind it. Form labels go above their fields. Placeholder text never replaces a label.
- Variants differ in structure and density, not only in color.

## Copy

- Fake data looks like real data: believable names, values, and dates. Never use Jane Doe, Acme, or lorem ipsum. Show a claim about the product, such as a speedup or a customer count, only when the brief gives it.
- Each action has one name across the prototype. "Get started" and "Try it free" on one page are the same button twice.
- A button label fits on one line. A primary action has three words or fewer.
- Use no em dashes anywhere in the page, also in comments.
- Read every string once before you show the prototype. Rewrite anything cute, vague, or ungrammatical as a plain sentence.

## Landing, portfolio, and marketing pages

- The hero fits the first screen at 1440 by 900, with its action in view. It has at most four text elements: an optional eyebrow, a headline, one subtext line, and up to two actions. The headline has two lines or fewer. The subtext has 20 words or fewer. An install command is one of the two actions. Move logos, badges, pricing, and taglines to the sections below.
- The navigation is one line, under 80 px high.
- A section header is a headline, with any body text below it, not beside it.
- An eyebrow label goes above one section in three at most. A section number is an eyebrow.
- No section layout repeats. Image-and-text splits never occur three times in a row. Parallel items, such as three primitives, share one section: a comparison, tabs, or one block. Do not give each item its own section. A grid has no empty or filler cells.
- Show products as real images, or as the product UI itself at small size with fake data. Never show a screenshot made from boxes. Without an asset, use placeholder photos by URL. A page of text alone is not complete.
- Change a long list into groups or tabs, not a table with a line under every row.
- A quote has three lines at most. It names the person and their role.
