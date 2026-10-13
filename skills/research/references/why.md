# Why (Internal History)

When the question is why code is shaped the way it is, read the owners of that history, not only vendor docs.

## Anchor

Before broad reading, build a code anchor: paths and symbols, recent commits touching them (`git log`, `git blame`), PR numbers from merge subjects, and linked ticket ids when present. This anchor goes with every lookup.

## Source classes

Treat each class you can reach. A missing class is a named gap, not a silent skip.

1. **Source control** (always): commits, PR bodies, reviews, tests, comments in code.
2. **Tickets / issues:** the product or business forcing function.
3. **Long-form docs:** design notes written before the code.
4. **Team chat:** deliberation that never reached a doc, when a readable store exists.
5. **Observability / errors / analytics:** runtime or data pressure that motivated defensive code, when those stores are reachable.

Vendor docs and live endpoints stay valid for "what is true today." They do not replace history for "why we chose this."

## Output

One Markdown note, each claim followed by its citation (commit, PR, ticket, doc, or message id). Separate what the sources say from what you infer. If the lookup is a precursor to a change, close with Preserve / Change / Avoid / Risk. Do not invent callers, APIs, or motives.
