---
name: drill
description: "Question a plan or design until every decision in it is settled and agreed. Use when the user wants a plan stress-tested or a design settled before building. Use it also to settle the structure of a new codebase or area. Use it when the user says \"drill this\" or \"drill me\"."
---

Run the `core-interview` skill on the plan or design under discussion. The interview also tests the plan against the domain model of the project.

Fast path: first, sharpen the request silently. Ask how a top expert would approach it: the sources, the methods, and an outside check that proves the result. An outside check is evidence from outside the work: a test runner, a live system, or an independent source. Ask what the user really wants, and whether the request says too much or too little. Drop constraints that do not serve that goal. Add only what improves the result, and do not make the work larger. Leave open each choice that belongs to the user. Do not show the user a reworded request, except the one-sentence plan below. Then find the size of the request. A request with no real decision tree is obvious. Examples are one obvious change, a small diff, or a criterion that one sentence can state. Say that the request is obvious, and go directly to `implement` with that sentence as the plan. The sentence keeps the outside check as its criterion. Do not write a spec for an obvious change. The fast path still tests its sentence: state the sentence, then test it. If you cannot state the sentence, or the sentence shows a decision to make, the request was not obvious. Then run the interview.

1. Before the first question, read the project context: code, docs, and recent commits.
2. Before the first question, look for `CONTEXT.md` at the root. Look also for `CONTEXT-MAP.md` and each `CONTEXT.md` that it lists. Look for ADRs under `docs/adr/`, also for ADRs that apply to one context only.
3. On a nontrivial codebase with no `CONTEXT.md`, offer to collect candidate terms from the code and the docs. Put each term to the user during the interview. A term goes into the glossary only after the user confirms it.
4. If the request holds several independent parts, say so. Drill the first part, and keep the other parts for later.
5. Before you choose a direction, show 2 or 3 different approaches with their trade-offs, not variations of one approach. Put your recommendation first, as [exhaust the design space](references/exhaust-the-design-space.md) says. When a new requirement comes into an existing design, one approach is the [redesign from first principles](references/redesign-from-first-principles.md). Check each architectural shape against the [design red flags](references/design-red-flags.md). Some decisions depend on look, feel, or flow that text cannot settle. For these, run the `prototype` skill to build a throwaway that the user reacts to. Discard it when the user picks the direction.
6. The session ends when every branch of the decision tree is resolved. Then state the settled design in a short summary. Get the explicit agreement of the user before any implementation starts.
7. When the settled design is implementation work, write the spec to `docs/specs/<slug>.md` in the target project. Use [spec-format.md](references/spec-format.md): goal, non-goals, checkable acceptance criteria, verification commands, and phases for a phased migration. Put the outside check from the fast path into the verification commands.
8. Sometimes this session cannot resolve the decision tree. Decisions can wait for research outside this context, or the tree can be too large for one session. Then do not write a settled spec for a design that is not settled. Write the spec as a **draft**: [draft-spec.md](references/draft-spec.md).

Rules:

- Remove from the design everything that the stated constraints do not demand. Check what stays against [experience first](references/experience-first.md). Read it when a trade-off on product scope, UX, or an interface puts ease of building against the consumer's experience.
- Create a file only when it has content. Create `CONTEXT.md` with the first settled term, and `docs/adr/` with the first ADR.
- In the interview, **hold the user to the glossary.** When the user gives a word a meaning that is different from `CONTEXT.md`, say so at once. For example: "The glossary says a Refund is X. You seem to mean Y. Which is it?"
- In the interview, **replace vague words.** For a vague word or a word with many meanings, offer an exact term. For example: "By 'user', do you mean the Account holder or the Operator? They are different."
- In the interview, **test with cases.** Where two concepts meet, pick a concrete case at the border between them. Ask what happens.
- In the interview, **check claims against the code.** When the user says how something works, look at the code. Name each difference. For example: "The code refunds whole Payments. You described partial refunds. Which is true?"
- In the interview, **write terms when they settle.** Update `CONTEXT.md` when a term is settled, not at the end. It is only a glossary: no plans, notes, or implementation choices. Use the format in [terms.md](references/terms.md).
- In the interview, **keep ADRs rare.** Offer an ADR only for a decision that passes the three tests in [decision-record.md](references/decision-record.md). The decision is costly to undo, puzzling from the code, and won against a real alternative.
- **Later sessions work on the draft.** When a session opens a spec that still has an `## Open decisions` section, follow [draft-spec.md](references/draft-spec.md).
