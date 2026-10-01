---
name: write-skill
description: Create or edit a document an agent reads and prove it changes behavior. Use when writing or editing a skill, AGENTS.md, CLAUDE.md, a system prompt, or other agent-facing prose, or proving that one changes agent behavior.
---

Writing for agents is test-first development applied to prose. The same loop ships every document an agent reads: skills, AGENTS.md, CLAUDE.md, system prompts.

Fast path: an edit that changes no instruction (a typo, formatting, a stale command or path, a deleted line nothing follows anymore) needs no loop. A one-line addition that records a correction the user made in this session takes that correction as its baseline and re-runs once.

1. Baseline first: run the scenario the document targets on an agent that has not seen the document, and record exactly how it fails or rationalizes. That agent is a subagent when the harness dispatches one, otherwise a fresh session the user opens with the scenario alone; with neither, stop and say so. No observed failure means the document has nothing to teach.
2. Write the minimum prose that fixes those specific failures. Not a manual: the shortest process that changes the behavior.
3. Re-run the scenario with the document loaded. It passes or the document is wrong. The re-run passes when the failure recorded in step 1 is absent from its transcript, decided by the test harness's check when one exists and by `rubric` otherwise; the author never marks the pass.
4. Close loopholes: new rationalizations found on re-runs get plugged, then verified again.

Rules:
- A test harness changes mechanics, not the loop: when one exists, automate the baseline re-run.
- When the document is a skill in this repo, follow the [conventions for skills in this repo](references/conventions.md).
- The loop is skipped for a document no agent reads a second time. When a linter or hook could enforce the rule, the author builds that instead, per [encode lessons in structure](references/encode-lessons-in-structure.md).

Deep mode (the `deep` skill is active): no fast path.
