---
name: write-skill
description: Create or edit a document an agent reads and prove it changes behavior, and lock a lesson agents keep relearning into structure. Use when writing or editing a skill, AGENTS.md, CLAUDE.md, a system prompt, or other agent-facing prose, when verifying one before it ships, and when the user corrects the same agent mistake a second time.
---

Writing for agents is test-first development applied to prose. The same loop ships every document an agent reads: skills, AGENTS.md, CLAUDE.md, system prompts.

1. Baseline first: run the scenario the document targets on an agent WITHOUT it, and record exactly how it fails or rationalizes. In pi the baseline is a `subagent` run of an agent defined with `inheritSkills`, `inheritProjectContext`, and `inheritGlobalContext` false, so it loads no skills and no context files, and with `systemPromptMode: "append"`, so it keeps pi's base prompt. No builtin agent is, so check with `subagent({ action: "get", agent: "baseline" })`. When there is none, create it with `subagent({ action: "create", options: { config: { name: "baseline", description, scope: "user", systemPromptMode: "append", inheritSkills: false, inheritProjectContext: false, inheritGlobalContext: false } } })`. When `get` shows one that inherits anything or whose system prompt mode is `replace`, which drops pi's base prompt, offer to fix it with `subagent({ action: "update", agent: "baseline", options: { config: { ... } } })`. No observed failure means the document has nothing to teach.
2. Write the minimum prose that fixes those specific failures. Not a manual: the shortest process that changes the behavior.
3. Re-run the scenario with the document loaded. It passes or the document is wrong.
4. Close loopholes: new rationalizations found on re-runs get plugged, then verified again.

Rules:
- An eval script changes mechanics, not the loop: when one exists, it runs the baseline and the re-run.
- A correction the user makes a second time is a lesson that did not hold: open [encode lessons in structure](references/encode-lessons-in-structure.md) and fix its class at the highest rung that holds, a mechanism before any prose. Only what no mechanism can hold goes through steps 1 to 4.
- When the document is a skill in this repo, follow the [conventions for skills in this repo](references/conventions.md).
- Skip it when the work is a one-off, when standard practice is already well documented, or when a linter or hook could enforce the rule mechanically; in that last case build the linter or hook instead, per [encode lessons in structure](references/encode-lessons-in-structure.md).
