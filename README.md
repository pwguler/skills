# skills

Built against the Triple Debt Model (Storey, [arXiv:2603.22106](https://arxiv.org/abs/2603.22106)). It names three debts that pile up when code arrives faster than people can follow it, and the suite works against each:

- **Technical debt**, in the code: `implement` builds test-first in thin slices, `debug` fixes the root cause, and `verify` and `rubric` check the result against evidence and fresh reviewers.
- **Cognitive debt**, in the people, as their shared understanding of the system fades: `tldr` reports results rather than transcripts, `recall` rebuilds where work stands from past sessions, `research` reads why code is shaped the way it is, and `CONTEXT.md` and `ARCHITECTURE.md` keep the shared picture current.
- **Intent debt**, in what nobody wrote down (rationale, goals, constraints): `drill` writes the goal and constraints into a spec and hard-to-reverse decisions into ADRs, and `land` keeps the spec as the record of why.

## Install

The suite runs in [pi](https://pi.dev). Two ways in. Pick one: with both, every skill name collides, and pi keeps the first copy it finds and warns about the other.

**pi package**:

```bash
pi install git:github.com/pwguler/skills
```

**`npx skills`**:

```bash
npx skills add pwguler/skills
```

For the same reason, a pi package install needs any older copy of these skills gone from `~/.agents/skills/` and `~/.pi/agent/skills/`.

## Update

**pi package**:

```bash
pi update git:github.com/pwguler/skills
```

**`npx skills`**:

```bash
npx skills update
```

You may need to reinstall to get all skills.

Run `/reload` in an open session to load the new version.

## The loop

The base suite (drill → implement → verify → land) implements the run-until-done loop: a bounded goal, a maker/checker cycle, an exit only on proven criteria. A quality claim no command can settle exits through `rubric`, judged by someone who did not make the work. Before work with a spec lands, `rubric`'s defect pass sends the diff to two fresh reviewers, one of them on another model family. Fast path: an obvious task skips the interview; one sentence is the plan, once it passes the fork test. If `verify` fails twice on a fast-path task, the task was lying: route back through drill.

Subtraction comes first: in each file a slice or a fix changes, the dead code goes before anything is added, and so does any comment that restates the code or excuses a workaround.

The 24 engineering principles the work rests on (fix root causes, test behavior not implementation, make operations idempotent, explain the number, and the rest) live in the skill whose step or rule they deepen, and open at that step, so a session pays for one only when it reaches it.

```mermaid
flowchart TD
    idea([idea or codebase friction]) --> drill["1. drill: settle the plan"]
    drill -- "goal, non-goals, acceptance criteria" --> spec[("docs/specs/*.md")]
    drill -- "tree too big for one session" --> draft[("spec as draft: open decisions")]
    draft -- "sessions resolve decisions one at a time" --> spec
    spec --> impl

    subgraph cycle["2. the maker / checker cycle"]
        impl["implement (maker): failing test, minimum code, blast radius when a slice changes a contract"] --> verify["verify (checker): reject by default, quotes evidence, drives the runtime surface"]
        verify -- "criterion fails" --> impl
        impl -. "bug: root cause first" .-> debug
        debug -.-> impl
        rub["rubric (checker): defect pass by fresh reviewers, taste by a fresh judge"] -- "act-on finding or failed criterion" --> impl
    end

    verify -- "taste claim: no command can settle it" --> rub
    impl -- "quality surface: UI, interface, name, doc" --> rub
    rub -- "criteria met" --> land
    verify -- "every criterion proven" --> land["3. land: fresh-eyes gate, defect pass when a spec exists"]
    impl -- "3 failed attempts on one slice" --> you(["escalate to you"])
    land -- "residue to ADRs, CONTEXT.md, ARCHITECTURE.md; spec kept unless dropped" --> done([branch closed])
```

The documents the suite maintains, all created lazily with no setup step: `CONTEXT.md` (domain glossary, born from the first resolved term; a repo with several contexts keeps one per context, listed in `CONTEXT-MAP.md`), `ARCHITECTURE.md` (the system as it is), `DESIGN.md` (the look: tokens, type, color, spacing; `prototype` grounds in it, and `implement` builds UI from it), `docs/adr/` (hard-to-reverse decisions), `docs/specs/<slug>.md` (the loop's steering artifact; a spec kept after its branch is a record of why the code looks the way it does), `docs/research/` (the findings a draft spec's AFK decisions are resolved from), `.pi/skills/verify-<app>/` (the recipe `verify` drives the app with; `verify` offers one when the app has none, and writes or updates it only when you ask). These are shared project artifacts: committed, human-readable, reviewed in PRs.

## When to use what

Any skill also runs on demand: type `/skill:<name>`.

| Moment | Skill |
|---|---|
| New plan, feature, or design, including the structure of a new codebase or area | `drill` |
| Any topic you want settled by being questioned one fork at a time (`drill` runs it for plans) | `core-interview` |
| A design fork needs a throwaway to react to | `prototype` |
| Implementing a settled plan | `implement` |
| Bug or unexpected behavior | `debug` |
| About to claim done, fixed, or passing; write or update the app's verification recipe | `verify` |
| A defect review of a change, or quality no command can settle | `rubric` |
| Reading legwork, or why code is shaped the way it is | `research` |
| Branch done, needs merging or a PR | `land` |
| Parallel work you ask for: independent tasks, a race between attempts, or coverage across slices | `parallel` |
| Authoring or editing anything an agent reads, or correcting the same agent mistake a second time | `write-skill` |
| Starting or resuming work: where it stands, from past sessions; runs only on `/skill:recall` | `recall` |
| A task finished, or you want to catch up on this session since your last message | `tldr` |
