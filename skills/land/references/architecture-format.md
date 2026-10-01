# Architecture Document Format

`ARCHITECTURE.md` at the target project's root describes the system as it currently is. It is a living document: skills update it inline the moment the system's shape changes, so it is never allowed to drift from the code.

## Template

```markdown
# Architecture

## What this is
Two or three sentences: what the system does and for whom.

## Modules
One line per major module: name (CONTEXT.md vocabulary) and its single responsibility.

## Seams
The load-bearing interfaces: where behavior can be changed without editing in place, and what sits behind each.

## Invariants
What must stay true, system-wide. One line each.
```

## Rules

- Only what stays true when any one module is rewritten behind its interface: modules, responsibilities, seams, invariants. Never API signatures, never file-by-file listings, never anything a grep answers better.
- A page is the budget. If it grows past that, it is describing implementation, not architecture.
- Update inline at the moment the shape changes (a `land` that adds a module, moves a seam, or introduces an invariant), never in batch cleanups.
- Use `CONTEXT.md` vocabulary for domain names.
- Created lazily: the first `land` that changes the system's shape creates it.
