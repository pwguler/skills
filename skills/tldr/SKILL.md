---
name: tldr
description: Report a finished task as its result, not its transcript. Or tell the user what happened since their last message. Use when a task that made an artifact or a run just finished, and you are about to report it. Examples are a build, a workflow, a background agent, an implement or verify run, or a release. Use it also when the user types /skill:tldr, or asks to catch up on this session.
---

A task just finished, or the user asks what happened. Give the result, not the transcript.

Rules:

- When the user asks what happened since their last message, report as [catch-up.md](references/catch-up.md) says. Its reply order and its picture rules replace the rules below on the first line, the last line, and visuals. The other rules still apply. `/skill:recall` rebuilds the work of earlier sessions, not this skill.
- Write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms.
- Fit the length to the task. A small task gets two or three lines. A large task, or one with much output, gets more. The reply is never longer than the result needs.
- Choose the form that the user reads fastest for this result. Use prose for a few outcomes. Use bullets or a table when the user must scan several separate items.
- Start with the result: what the task made or decided.
- Give the outcomes that matter. Keep exact paths, commands, names, and error strings. Link commits, PRs, and files.
- Redact secrets. Replace a token, key, password, or connection string in a command or an error with a placeholder. Never copy it.
- End with what needs the user now, or "nothing" when the task is done.
- Add one small visual when the result is a new structure that prose would only list. Examples are a tree of files or calls, a flow between parts, or a layout. One new or moved file is a path in prose, not a tree. Build the visual as [visual.md](references/visual.md) says. Add one visual at most. A second visual is transcript again.
- Leave out the story of the tool calls. Keep the outcomes. If the task made nothing, say so. Never invent progress.
- Unless asked, never explain what you were about to do, how you reasoned, or why the approach is sound.
- The user sees the diff and the output. Do not repeat them.
- This register applies to this reply only. It never becomes the standard register of the session. The reasoning that it leaves out still goes into ADRs and specs on the land path.
- Write no introduction and no closing words. The summary is the whole reply. Stop.
