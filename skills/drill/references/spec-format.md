# Spec Format

One spec per work item, at `docs/specs/<slug>.md` in the target project. `drill` creates it when the decision tree resolves into implementation work; `land` closes it when the branch closes, keeping the file unless the user asks for it to go. A spec steers a branch.

A spec has two states, derived from its content, not a status field:

- **Draft**: the plan is not settled yet. The spec carries the open decisions that must be resolved before implementation can start. `drill` writes it this way when the decision tree cannot resolve within one session (decisions await research, or the tree is too large for one context).
- **Settled**: every open decision is resolved, the `## Open decisions` section is gone, and the spec carries goal, non-goals, decisions, acceptance criteria, and verification commands, and, for a phased migration, its phases. A draft settles in place: when its last open decision closes, the session writes those sections, gets the user's explicit agreement, then deletes `## Open decisions`. Only a settled spec steers `implement` and `verify`; both route a draft back to `drill`.

## Draft template

```markdown
# <slug>: draft

## Destination
One or two lines naming where this effort ends: the settled spec, the decision, or the change it is heading for. Each session reads this first, then picks a decision.

## Decisions so far
- [<decision name>]: one-line gist of the answer

## Open decisions
### <decision name> · Mode: AFK
<the question this decision resolves. One session can hold it.>

### <decision name> · Mode: HITL
<the question. Resolves only through a live exchange with the user.>

## Not yet specified
<fog: decisions you can see coming but cannot yet phrase sharply enough to ticket. Graduates into Open decisions as the frontier advances.>

## Out of scope
<work placed past the destination. Closed for good; it never becomes an open decision.>
```

## Settled template

```markdown
# <slug>

## Goal
One sentence: what this work item delivers.

## Non-goals
What this work must not touch or change. These fence the diff.

## Decisions
One line per settled fork: the option taken and its reason. `land` carries this section into the merge message.

## Phases
Only for a rewrite or migration planned in phases: one line per phase, naming the criterion it ends at and the checks that may be red inside it, those of the code being replaced or of callers not yet moved. Every phase ends green; implement's outcome-oriented-execution principle works the phases.

## Acceptance criteria
- AC-1: <a checkable statement; a command or test can prove it true or false>
- AC-2: <a quality statement naming `rubric` as its judge, when no command can prove it>
- AC-3: ...

## Verification
The exact commands that prove the criteria, one per line. A quality criterion has no command: its line names `rubric` instead. When the work has a runtime surface, one line names the artifact a reviewer re-runs to see it work: a script, a fixture, a recorded transcript, or the exact command sequence. The artifact demonstrates the work; the verification commands prove the criteria. A demo nobody can repeat is a claim.
```

## Rules

- Every criterion is checkable. A command or test proves it, or, when it is a quality (how a surface looks, reads, or feels) rather than a behavior, a named judge does: `rubric`, run once at `verify` time; `land`'s gate reuses its verdict under rubric's rule on saved verdicts. There is no third kind.
- A verification command is the project's test runner, build, or linter. A script written on the same branch as the change is not a verification command: the maker would be grading its own exam.
- Non-goals are load-bearing: `verify` fails work that changes what a non-goal fences off.
- The spec states the destination, not the route: no implementation steps, no file lists; a Phases section names only where each phase ends and which checks may be red inside it.
- Durable residue is routed out regardless of the spec file's fate: decisions go to `docs/adr/`, settled terms to `CONTEXT.md`. A kept spec is a record of one branch's reasoning, not a substitute for that routing.

## Draft rules

- **Mode is who resolves the decision.** `AFK` (away from keyboard): the `research` skill resolves it alone, run in parallel from the session that wrote the draft when the harness dispatches subagents, and by later sessions one at a time otherwise, writing its findings to `docs/research/<slug>-<decision-slug>.md`. `HITL` (human in the loop): only a live exchange with the user resolves it; an agent answering its own HITL question has broken the loop.
- **One decision per session**, except research decisions already dispatched as subagents. Claim the decision you work: mark it claimed before starting.
- **Refer to decisions by name**, never by number or slug. Names read at a glance; ids do not.
- **Fog or decision?** What counts is whether the question can already be phrased exactly, not whether it can already be answered. Phrasable → `Open decisions`; still too coarse → `Not yet specified`.
- **A decision that turns out to sit beyond the destination is ruled out of scope**, not resolved. Close it and leave one line in `Out of scope`; it does not enter `Decisions so far`.
