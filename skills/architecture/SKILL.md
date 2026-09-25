---
name: architecture
description: "Shape a codebase's architecture, at the start or once it fights you. Use when setting up a new codebase or area and choosing its structure and conventions, or when the user wants the architecture improved: refactoring targets, modules too entangled to change apart, code that is hard to test or hard for an agent to find its way around."
---

Find where the structure resists change and propose **deepenings**: refactors that put more behavior behind smaller interfaces, so the code gets easier to test and easier for an agent to navigate.

A new codebase or area has no friction to find yet. There, skip the search: go straight to the interview (step 3), settle the structure and conventions, and write the result to `ARCHITECTURE.md`.

The conventions this skill owns are indexed in [conventions/](conventions/README.md) and load only when the work touches them; `implement` follows them while building.

Fast by default: search only the area or friction the user named, show the strongest few candidates, and hold the parallel interface designs until asked. Deep mode (the `deep` skill is active): the whole codebase, every candidate, and parallel interface designs for the chosen one.

## Vocabulary

Speak in the terms of [LANGUAGE.md](LANGUAGE.md) every time: **module**, **interface**, **implementation**, **depth**, **seam**, **port**, **adapter**, **leverage**, **locality**. Drifting into "component", "service", "API", or "boundary" blurs the distinctions this skill exists to draw. The checks it leans on most:

- **Deletion test**: would removing the module make complexity vanish (it was a pass-through) or reappear in every caller (it was earning its place)?
- Tests cross the interface that callers cross.
- A seam is real once a second adapter fills it.
- **An interface with more than one consumer is a promise.** Deepen behind it by adding, never by reshaping what callers rely on; a breaking change to it is a migration to plan, not a refactor to slip in.

The domain model steers the work: names for good seams come from `CONTEXT.md`, and decisions in `docs/adr/` are settled ground, not open questions. Formats: [TERMS.md](../drill/TERMS.md), [DECISION-RECORD.md](../drill/DECISION-RECORD.md).

## Process

### 1. Look

Start from what is written down: `ARCHITECTURE.md` (the last map of modules, seams, and invariants; re-derive only what changed since), `CONTEXT.md` or `CONTEXT-MAP.md` with each context's glossary, and the ADRs near the area. A missing file is not worth mentioning, with one exception: on a nontrivial codebase with no `ARCHITECTURE.md`, offer once to seed it from this run using [FORMAT.md](FORMAT.md), and write only what the user confirms.

Then read the code within the area the user named, in a subagent when the harness dispatches one, otherwise here. Follow the friction rather than a checklist. Signs worth noting:

- One concept that takes a tour of many small modules to understand.
- Interfaces nearly as complicated as the code behind them.
- Pure helpers pulled out only so they can be tested, while the bugs live in how they are called.
- Modules so entangled that a change to one leaks into its neighbors.
- Code with no tests, or none that its current interface lets you write.

Run the deletion test on every module that looks shallow.

### 2. Propose

List the deepening candidates, numbered. For each one:

- **Files**: the modules involved.
- **Friction**: what the current structure makes hard.
- **Change**: in plain words, what would move.
- **Payoff**: in leverage and locality, and what the tests would look like afterwards.

Name domain things with the words of `CONTEXT.md` and structural things with those of LANGUAGE.md: "the Invoice issuing module", not "the InvoiceHelper" or "the invoice service".

A candidate that cuts against an ADR appears only when the friction justifies reopening it, and is marked so ("reopens ADR-0007, because ..."). Refactors an ADR already rules out stay off the list.

Propose no interfaces yet. Close by asking which candidate to explore.

### 3. Interview

Run the `core-interview` skill on the chosen candidate. The tree to settle: constraints, dependencies (sorted per [DEPENDENCIES.md](DEPENDENCIES.md)), the shape of the deepened module, what hides behind its seam, and which tests survive.

Write down what settles, as it settles:

- A deepened module named after a concept `CONTEXT.md` lacks: add the term the way `drill` does, creating the file if it does not exist yet. A fuzzy term sharpened in conversation: update its entry.
- A new module, a moved seam, or a new invariant: update `ARCHITECTURE.md` per [FORMAT.md](FORMAT.md).
- A candidate the user turns down for a reason a future review would need: offer an ADR so it is not proposed again. A passing reason ("not now") or an obvious one gets none.
- Alternative interfaces for the chosen module: [INTERFACE.md](INTERFACE.md).

When the result is implementation work, write the spec to `docs/specs/<slug>.md` per [SPEC-FORMAT.md](../drill/SPEC-FORMAT.md), with the deepened interface and the surviving tests as its acceptance criteria, and hand it to `implement`.
