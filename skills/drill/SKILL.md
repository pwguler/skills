---
name: drill
description: "Question a plan or design until every decision in it is settled and agreed. Use when the user wants a plan stress-tested, a design pinned down before building, or the structure of a new codebase or area settled, asks to be questioned on a plan or decision, or says \"drill this\" or \"drill me\"."
---

Run the `core-interview` skill against the plan or design under discussion. The interview also tests the plan against the project's domain model.

Fast path: first, size the ask. If it has no real decision tree (one obvious change, a small diff, a criterion statable in one sentence), say so and route straight to `implement` with that sentence as the plan; a spec for an obvious change is ceremony. The fast path still drills its sentence: state it, then test it. A sentence that cannot be stated, or that surfaces a fork or a second decision, was not obvious: run the interview. A genuine fork discovered mid-task is never guessed: stop, name it, let the user answer or switch to deep. If `verify` fails twice on a task judged obvious, the task was lying about its size: stop and drill it properly.

1. Explore the project context before the first question: code, docs, recent commits.
2. Before the first question, look for `CONTEXT.md` at the root (or `CONTEXT-MAP.md` and the per-context `CONTEXT.md` files it lists) and for ADRs under `docs/adr/`, including any scoped to one context.
3. First contact: on a codebase with more than one module and no `CONTEXT.md`, offer one seeding pass: collect candidate terms from the code and the existing docs, then put each to the user during the interview. A term enters the glossary only after the user confirms it.
4. If the ask bundles several independent pieces, say so and drill the first piece; the rest queue up.
5. Before settling a direction, put 2 or 3 genuinely different approaches on the table with trade-offs, leading with a recommendation, per [exhaust the design space](references/exhaust-the-design-space.md); when a new requirement lands in an existing design, one of them is the [redesign from first principles](references/redesign-from-first-principles.md). When a fork turns on look, feel, or flow that prose can't settle, run the `prototype` skill to build a throwaway to react to, and discard it once the direction is picked.
6. The session ends when every branch of the decision tree is resolved: state the settled design in a short summary and get explicit agreement before any implementation starts.
7. When the settled design is implementation work, write the spec to `docs/specs/<slug>.md` in the target project using [spec-format.md](references/spec-format.md): goal, non-goals, decisions, checkable acceptance criteria, verification commands. The spec steers the loop: `implement` builds from it, `verify` gates against it, `land` closes it out and asks whether to keep or delete the file.
8. When the decision tree cannot resolve here (decisions await research beyond this context, or the tree is simply too large for one session), do not force a settled spec out of an unsettled design. Write the spec as a **draft** instead: [draft-spec.md](references/draft-spec.md).

Rules:
- Cut ruthlessly: anything the stated constraints don't demand leaves the design. What stays is held to [experience first](references/experience-first.md), opened when a trade-off on product scope, UX, or an interface pits implementation convenience against the consumer's experience.
- Files appear only when there is something to put in them: `CONTEXT.md` with the first settled term, `docs/adr/` with the first ADR.
- While interviewing: **Hold the user to the glossary.** A word used against its `CONTEXT.md` meaning gets named at once: "the glossary says a Refund is X; you seem to mean Y. Which?"
- While interviewing: **Replace vague words.** A loose or overloaded word gets a precise candidate: "by 'user', do you mean the Account holder or the Operator? They differ."
- While interviewing: **Test with cases.** Where two concepts touch, pick a concrete case at their edge and ask what happens.
- While interviewing: **Check claims against the code.** When the user says how something works, look. Name any disagreement: "the code refunds whole Payments; you described partial refunds. Which is true?"
- While interviewing: **Write terms as they settle.** Update `CONTEXT.md` the moment a term is settled, not at the end. It is a glossary only: no plans, notes, or implementation choices. Format: [terms.md](references/terms.md).
- While interviewing: **Keep ADRs rare.** Offer one only for a decision that passes the three tests in [decision-record.md](references/decision-record.md): costly to undo, puzzling from the code, won against a real rival.
- **Later sessions work the draft.** When a session opens a spec that still has an `## Open decisions` section, work it as [draft-spec.md](references/draft-spec.md) lays out.

Deep mode (the `deep` skill is active): no sizing, no routing past the interview; the full session runs and the spec is always written.
