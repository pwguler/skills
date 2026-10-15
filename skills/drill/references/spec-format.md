# Spec Format

Each work item has one spec, at `docs/specs/<slug>.md` in the target project. `drill` creates the spec when the decision tree resolves into implementation work. `land` closes the spec when the branch closes. It keeps the file unless the user asks to delete it. A spec guides one branch. After the branch closes, a kept spec records why the code is the way it is.

A spec has two states. Its content shows the state, not a status field.

- **Draft**: the plan is not settled. The spec holds the open decisions to resolve before implementation can start. `drill` writes a draft when one session cannot resolve the decision tree. Decisions can wait for research, or the tree can be too large for one context.
- **Settled**: every open decision is resolved, and the `## Open decisions` section is gone. The spec holds the goal, the non-goals, the acceptance criteria, and the verification commands. A phased migration also has its phases. Only a settled spec guides `implement` and `verify`.

To change a draft into a settled spec, resolve the open decisions, one session at a time. When the last open decision closes, process each item that is left in `Not yet specified`:

- Drop the item when the decisions already answer it.
- Make it an open decision when you can now state it exactly.
- Move it out of scope when it is beyond the destination.
- Otherwise, make it a `HITL` open decision, and make it exact with the user. Then no item stays in `Not yet specified`.

When both sections are empty, change the draft into the settled template in the same file:

- `Destination` becomes `Goal`, and `Out of scope` becomes `Non-goals`.
- Write the acceptance criteria and their `Verification` lines from `Decisions so far`. Add `Phases` for a phased migration.
- Remove the two empty sections.

`Decisions so far` stays below the template as the record of why.

## Draft template

```markdown
# <slug>: draft

## Destination
One or two lines that name where this work ends: the settled spec, the decision, or the change. Each session reads this first, then picks a decision.

## Decisions so far
- [<decision name>]: the answer in one line

## Open decisions
### <decision name> · Mode: AFK
<the question that this decision resolves. One session can hold it.>

### <decision name> · Mode: HITL
<the question. Only a live exchange with the user resolves it.>

## Not yet specified
<decisions that you can see will come, but cannot state exactly yet. Each one becomes an open decision when you can state it exactly.>

## Out of scope
<work beyond the destination. It is closed, and it never becomes an open decision.>
```

## Settled template

```markdown
# <slug>

## Goal
One sentence: what this work item delivers.

## Non-goals
What this work must not touch or change. The diff must not change them.

## Phases
Only for a rewrite or a migration in phases. Write one line for each phase. Name the criterion where it ends, and the checks that can fail inside it. These are checks of the code that the phase replaces, or of callers that have not moved yet. All checks pass at the end of each phase. Implement's outcome-oriented-execution principle works through the phases.

## Acceptance criteria
- AC-1: <a statement that a command or a test can prove true or false>
- AC-2: <a statement about quality that names `rubric` as its judge, when no command can prove it>
- AC-3: ...

## Verification
The exact commands that prove the criteria, one command on each line. A quality criterion has no command: its line names `rubric`. When the work has a runtime interface, one line names the demo. The demo is the artifact that a reviewer runs again to see the change work: a script, a fixture, a recorded transcript, or the exact command sequence. A demo that nobody can repeat is only a claim. The demo shows that the change works, but it proves no criterion. So a script written on the branch can be the demo.
```

## Rules

- Every criterion is checkable. A command or a test proves a behavior. A named judge proves a quality, such as how an interface looks, reads, or feels. That judge is `rubric`, which runs at `verify` time and again in the `land` gate. There is no third kind of criterion.
- A verification command is the test runner, the build, or the linter of the project. A script written on the same branch as the change is not a verification command. With such a script, the maker grades its own work.
- Non-goals are binding: `verify` fails work that changes something that a non-goal excludes.
- The spec states the destination, not the route. It has no implementation steps and no file lists. A `Phases` section names only where each phase ends, and which checks can fail inside it.
- Move lasting content out of the spec, whether the file stays or not. Decisions go to `docs/adr/`, and settled terms go to `CONTEXT.md`. A kept spec records the reasoning of one branch. It does not replace that move.

## Draft rules

- **The mode tells who resolves the decision.** For `AFK` (away from keyboard), the `research` skill resolves it alone. It runs as parallel subagents from the session that wrote the draft. Each subagent writes its findings to `docs/research/<slug>-<decision-slug>.md`. For `HITL` (human in the loop), only a live exchange with the user resolves it. An agent that answers its own HITL question breaks the loop.
- **Work on one decision in each session.** Research decisions that subagents already work on are the exception. Claim the decision that you work on: mark it claimed before you start.
- **Refer to decisions by name**, never by number or slug. A reader understands a name at once, but not an id.
- **Open decision or not yet specified?** The test is whether you can state the question exactly, not whether you can answer it. A question that you can state exactly goes to `Open decisions`. A question that is still too vague goes to `Not yet specified`.
- **A decision that is beyond the destination goes out of scope.** It is not resolved. Close it, and write one line for it in `Out of scope`. It does not go into `Decisions so far`.
- `verify` and `implement` refuse a draft. They send a spec that still has `## Open decisions` back to `drill`.
