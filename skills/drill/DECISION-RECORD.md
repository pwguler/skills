# Decision Record

An ADR records one decision the code cannot explain on its own. ADRs live in `docs/adr/` as `0001-<slug>.md`, `0002-<slug>.md`, and so on: the next file takes the highest number present plus one. The directory appears with the first ADR, not before.

## Shape

```md
# <The decision, as a short title>

<What forced the choice, what was chosen, and the reason. One to three sentences.>
```

One paragraph is a complete ADR. What it preserves is the fact that the choice was deliberate, and the reason.

Add a section only when it pays for itself:

- `Status` frontmatter (`proposed`, `accepted`, `superseded by ADR-NNNN`, `deprecated`), once the decision gets revisited.
- `Considered options`, when a losing option is likely to be proposed again.
- `Consequences`, when an effect downstream would surprise a reader.

## The bar

Write an ADR only for a decision that passes all three:

1. **Costly to undo.** Changing course later takes real work.
2. **Puzzling from the code.** Someone reading the code would ask why it is this way.
3. **Won against a real rival.** Another option was viable and lost for a stated reason.

A decision that fails one test gets no ADR. A cheap choice gets reversed instead of recorded, an obvious one raises no question, and a choice with no rival has no reason to preserve.

Decisions that tend to pass:

- The system's overall shape: one repo or many, calls or events between parts, how state is stored.
- A technology that would take a quarter to leave: the database, the queue, the identity provider, the host. An ordinary library does not count.
- Who owns what: which part alone writes some data, and what the others may do with it. A recorded refusal is worth as much as a permission.
- A deliberate break from the usual approach, recorded so nobody "fixes" it later.
- A limit set from outside that the code cannot show: a regulation, a contract, a partner's latency budget.
- A rejected option whose rejection was not obvious.
