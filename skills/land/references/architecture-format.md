# Architecture Document Format

`ARCHITECTURE.md` at the root of the target project describes the system as it is now. Skills update it in place when the shape of the system changes, so it always matches the code.

## Template

```markdown
# Architecture

## What this is
Two or three sentences: what the system does, and for whom.

## Modules
One line for each major module: its name in the words of CONTEXT.md, and its single responsibility.

## Seams
The interfaces that the design depends on: where behavior can change without an edit in place, and what is behind each one.

## Invariants
What must stay true across the whole system. One line each.
```

## Rules

- Write only what stays true for years: modules, responsibilities, seams, and invariants. Never write API signatures, lists of files, or anything that a grep answers better.
- The limit is one page. A longer document describes implementation, not architecture.
- Update it in place when the shape changes, never in a later cleanup. Examples are a `land` that adds a module, moves a seam, or adds an invariant.
- Use the words of `CONTEXT.md` for domain names.
- Create it only when it is needed: the first `land` that changes the shape of the system creates it.
