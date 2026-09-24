---
name: drill
description: "Question a plan or design until every decision in it is settled and agreed. Use when the user wants a plan stress-tested or a design pinned down before building, or says \"drill this\" or \"drill me\"."
---

First, size the ask. If it has no real decision tree (one obvious change, a small diff, a criterion statable in one sentence), say so and route straight to `implement` with that sentence as the plan; a spec for an obvious change is ceremony. The fast path still drills its sentence: state it, then test it. A sentence that cannot be stated, or that surfaces a fork or a second decision, was not obvious: run the interview. A genuine fork discovered mid-task is never guessed: stop, name it, let the user answer or switch to deep. If `verify` fails twice on a task judged obvious, the task was lying about its size: stop and drill it properly.

Deep mode (the `deep` skill is active): no sizing, no routing past the interview; the full session runs and the spec is always written.

Run the `core-interview` skill against the plan or design under discussion.

Shape of the session:

- Explore the project context before the first question: code, docs, recent commits.
- If the ask bundles several independent pieces, say so and drill the first piece; the rest queue up.
- Before settling a direction, put 2 or 3 genuinely different approaches on the table with trade-offs, leading with a recommendation. When a fork turns on look, feel, or flow that prose can't settle, run the `prototype` skill to build a throwaway to react to, and discard it once the direction is picked.
- Cut ruthlessly: anything the stated constraints don't demand leaves the design.

## Domain language

The interview also tests the plan against the project's domain model. Before the first question, look for `CONTEXT.md` at the root (or `CONTEXT-MAP.md` and the per-context `CONTEXT.md` files it lists) and for ADRs under `docs/adr/`, including any scoped to one context.

Files appear only when there is something to put in them: `CONTEXT.md` with the first settled term, `docs/adr/` with the first ADR.

**First contact.** On a nontrivial codebase with no `CONTEXT.md`, offer one seeding pass: collect candidate terms from the code and the existing docs, then put each to the user during the interview. A term enters the glossary only after the user confirms it.

While interviewing:

- **Hold the user to the glossary.** A word used against its `CONTEXT.md` meaning gets named at once: "the glossary says a Refund is X; you seem to mean Y. Which?"
- **Replace vague words.** A loose or overloaded word gets a precise candidate: "by 'user', do you mean the Account holder or the Operator? They differ."
- **Test with cases.** Where two concepts touch, pick a concrete case at their edge and ask what happens.
- **Check claims against the code.** When the user says how something works, look. Name any disagreement: "the code refunds whole Payments; you described partial refunds. Which is true?"
- **Write terms as they settle.** Update `CONTEXT.md` the moment a term is settled, not at the end. It is a glossary only: no plans, notes, or implementation choices. Format: [TERMS.md](TERMS.md).
- **Keep ADRs rare.** Offer one only for a decision that passes the three tests in [DECISION-RECORD.md](DECISION-RECORD.md): costly to undo, puzzling from the code, won against a real rival.

The session ends when every branch of the decision tree is resolved: state the settled design in a short summary and get explicit agreement before any implementation starts.

When the settled design is implementation work, write the spec to `docs/specs/<slug>.md` in the target project using [SPEC-FORMAT.md](SPEC-FORMAT.md): goal, non-goals, checkable acceptance criteria, verification commands. The spec steers the loop: `implement` builds from it, `verify` gates against it, `land` closes it out and asks whether to keep or delete the file.

## The tree does not fit this session: write the draft
When the decision tree cannot resolve here (decisions await research beyond this context, or the tree is simply too large for one session), do not force a settled spec out of an unsettled design. Write the spec as a **draft** instead: `Destination`, `Decisions so far` (empty), `Open decisions`, `Not yet specified` (fog), `Out of scope`. Each open decision carries a Mode:

- **AFK**: the `research` skill can resolve it alone. Fire one research pass per AFK decision, in parallel when the harness dispatches subagents, each writing its findings to `docs/research/<slug>-<decision-slug>.md`. Without dispatch, the draft names the AFK decisions and their output paths, and later sessions work them one at a time.
- **HITL**: only a live exchange with the user resolves it. Never answer your own HITL question.

Writing the draft is one session's work: name the destination, sketch the frontier, write the draft, fire the AFK subagents, stop. It resolves nothing itself.

**Later sessions work the draft.** When a session opens a spec that still has an `## Open decisions` section:

1. Load the whole spec: the low-res view, not one decision's deep dive.
2. Pick the next open decision; if the user named one, use that. Claim it before working it.
3. Resolve it: AFK decisions read the findings left at `docs/research/<slug>-<decision-slug>.md`, or run the `research` skill now when no session has produced them yet; HITL decisions are worked with the user through the `core-interview` skill.
4. Record the resolution in `Decisions so far`, and remove the decision from `Open decisions`. Graduate anything now sharp from `Not yet specified` into fresh open decisions. A decision revealed to sit beyond the destination is ruled out of scope instead of resolved.
5. When the last open decision closes, delete the `## Open decisions` section: the spec is settled and the loop takes over.

One decision per session, except AFK decisions already dispatched. If no fog surfaces at all (the way is clear and the journey fits one session), there is no draft; settle normally.
