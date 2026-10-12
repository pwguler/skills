---
name: drill
description: "Question a plan or design until every decision in it is settled and agreed, then write its spec. Run by a pecut playbook step that names it."
---

Run the `core-interview` skill against the plan or design under discussion. The interview also tests the plan against the project's domain model, as [domain checks](references/domain-checks.md) lays out.

Fast path: first, size the ask. If it has no real decision tree (one obvious change of fewer than 20 changed lines outside tests, a criterion statable in one sentence), say so: that sentence is the plan, and a spec for an obvious change is ceremony. The fast path still drills its sentence: state it, then test it. A sentence that cannot be stated, or that surfaces a fork or a second decision, was not obvious: run the interview.

1. Explore the project context before the first question: code, docs, recent commits.
2. Before the first question, look for `CONTEXT.md` at the root (or `CONTEXT-MAP.md` and the per-context `CONTEXT.md` files it lists) and for ADRs under `docs/adr/`, including any scoped to one context.
3. First contact: on a codebase with more than one module and no `CONTEXT.md`, offer one seeding pass: collect candidate terms from the code and the existing docs, then put each to the user during the interview. A term enters the glossary, in the format of [terms.md](references/terms.md), only after the user confirms it.
4. If the ask bundles several independent pieces, say so and drill the first piece; the rest queue up.
5. Before settling a direction, put 2 or 3 genuinely different approaches on the table with trade-offs, leading with a recommendation, per the `principle-exhaust-the-design-space` skill; when a new requirement lands in an existing design, one of them is the redesign the `principle-redesign-from-first-principles` skill describes. Screen each architectural shape against [design red flags](references/design-red-flags.md). When a fork turns on look, feel, or flow that prose can't settle, run the `prototype` skill to build a throwaway to react to, and discard it once the direction is picked.
6. The session ends when every branch of the decision tree is resolved: state the settled design in a short summary and get explicit agreement before any implementation starts.
7. When the settled design is implementation work, write the spec to `docs/specs/<slug>.md` in the target project using [spec-format.md](references/spec-format.md): goal, non-goals, decisions, checkable acceptance criteria, verification commands, and phases for a phased migration. The spec is the plan `implement` builds from, the criteria `verify` gates against, and the record `land` closes, asking whether to keep or delete the file.
8. When the decision tree cannot resolve here (decisions await research beyond this context, or the tree is simply too large for one session), do not force a settled spec out of an unsettled design. Write the spec as a **draft** instead: [draft-spec.md](references/draft-spec.md).

Rules:
- Anything the stated constraints don't demand leaves the design. What stays is held to the `principle-experience-first` skill, opened when a trade-off on product scope, UX, or an interface pits implementation convenience against the consumer's experience.
- Files appear only when there is something to put in them: `CONTEXT.md` with the first settled term, `docs/adr/` with the first ADR that passes [decision-record.md](references/decision-record.md).
- **Later sessions work the draft.** When a session opens a spec that still has an `## Open decisions` section, work it as [draft-spec.md](references/draft-spec.md) lays out.
