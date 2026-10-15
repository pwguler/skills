# Decision Record

An ADR records one decision that the code cannot explain. ADRs are in `docs/adr/` as `0001-<slug>.md`, `0002-<slug>.md`, and so on. The next file takes the highest number plus one. Create the directory with the first ADR, not before.

## Shape

```md
# <The decision, as a short title>

<What made the choice necessary, what you chose, and why. One to three sentences.>
```

One paragraph is a complete ADR. It keeps two facts: the choice was deliberate, and the reason for it.

Add a section only when it is worth its length:

- `Status` frontmatter (`proposed`, `accepted`, `superseded by ADR-NNNN`, `deprecated`), when someone examines the decision again.
- `Considered options`, when someone is likely to propose a rejected option again.
- `Consequences`, when an effect in another part would surprise a reader.

## The tests

Write an ADR only for a decision that passes all three tests:

1. **Costly to undo.** A later change of direction takes real work.
2. **Puzzling from the code.** A reader of the code would ask why it is this way.
3. **Won against a real alternative.** Another option was possible, and it lost for a stated reason.

A decision that fails one test gets no ADR. Reverse a cheap choice instead of recording it. An obvious choice causes no question. A choice with no alternative has no reason to keep.

Decisions that often pass:

- The overall shape of the system: one repo or many, calls or events between components, and how it stores state.
- A technology that would take about three months to replace: the database, the queue, the identity provider, or the host. An ordinary library does not count.
- Ownership: which part alone writes some data, and what the other parts can do with it. A recorded refusal is as useful as a permission.
- A deliberate change from the usual approach, recorded so that nobody "fixes" it later.
- An outside limit that the code cannot show: a regulation, a contract, or the latency budget of a partner.
- A rejected option whose rejection was not obvious.
