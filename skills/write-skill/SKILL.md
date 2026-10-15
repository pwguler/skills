---
name: write-skill
description: Create or edit a document that an agent reads, and prove that it changes behavior. Put a lesson that agents keep learning again into structure. Use when you write or edit a skill, AGENTS.md, CLAUDE.md, a system prompt, or other text for agents. Use it to verify such a document before it ships. Use it also when the user corrects the same agent mistake a second time.
---

Writing for agents is test-first development, applied to text. The same loop ships every document that an agent reads: skills, AGENTS.md, CLAUDE.md, and system prompts.

1. Run the baseline first. Run the scenario that the document targets on an agent WITHOUT the document. Record exactly how it fails, or what excuse it gives. In pi, the baseline is a `subagent` run of an agent with `inheritSkills`, `inheritProjectContext`, and `inheritGlobalContext` false. So it loads no skills and no context files. It also has `systemPromptMode: "append"`, so it keeps the base prompt of pi. No builtin agent is like this, so check with `subagent({ action: "get", agent: "baseline" })`. When there is none, create it with `subagent({ action: "create", options: { config: { name: "baseline", description, scope: "user", systemPromptMode: "append", inheritSkills: false, inheritProjectContext: false, inheritGlobalContext: false } } })`. When `get` shows a baseline that inherits anything, offer to fix it with `subagent({ action: "update", agent: "baseline", options: { config: { ... } } })`. Make the same offer when its system prompt mode is `replace`, which drops the base prompt of pi. When you observe no failure, the document has nothing to teach.
2. Write the minimum text that fixes those specific failures. Do not write a manual. Write the shortest process that changes the behavior.
3. Run the scenario again with the document loaded. It passes, or the document is wrong.
4. Close loopholes. When a new run shows a new excuse, block it in the text, and verify again.

Rules:

- An eval script changes the mechanics, not the loop. When one exists, it runs the baseline and the second run.
- A correction that the user makes a second time is a lesson that did not hold. Read [encode lessons in structure](references/encode-lessons-in-structure.md). Fix its class at the highest level that holds: a mechanism before any text. Only what no mechanism can hold goes through steps 1 to 4.
- When the document is a skill in this repo, follow the [conventions for skills in this repo](references/conventions.md).
- Skip this skill for work done once, or when standard practice is already well documented. Skip it also when a linter or hook could enforce the rule. In that case, build the linter or hook instead, as [encode lessons in structure](references/encode-lessons-in-structure.md) says.
