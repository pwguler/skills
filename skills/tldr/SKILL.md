---
name: tldr
description: Report a finished task as its result, not its transcript, or catch the user up on what happened since their last message. Use when a task that produced an artifact or a run (a build, a workflow, a background agent, an implement or verify run, a release) has just finished and you are about to report it, when the user types /skill:tldr, and when the user asks to catch up or resume.
---

A task just finished, or the user asks to catch up. Give the result, not the transcript.

Rules:
- When the user asks to catch up on what happened since their last message, or to resume, report per [catch-up.md](references/catch-up.md): its reply order replaces the lead and close rules below, and the rest still apply.
- Write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms.
- The length adapts to the task: a small task gets two or three lines, a large or noisy one gets more, never longer than the result needs.
- Choose the shape that reads fastest for this result: prose for a few outcomes, bullets or a table when several distinct items need scanning.
- Lead with the result: what the task produced or decided.
- Give the outcomes that matter, keeping exact paths, commands, names, and error strings, and linking commits, PRs, and files.
- Redact secrets: a token, key, password, or connection string that appears in a command or error is replaced with a placeholder, never reproduced.
- Close with what needs the user now, or "nothing" when the task is done.
- Add one small visual when the result is a new structure that prose would only list: a tree of files or calls, a flow between parts, a layout. One new or moved file is a path in prose, not a tree. Build the visual to [visual.md](references/visual.md). One visual at most; a second one is transcript again.
- Drop tool-call narration; keep outcomes. If the task produced nothing, say so; never invent progress.
- Never explain what you were about to do, how you reasoned, or why the approach is sound unless asked.
- The user sees the diff and the output; do not restate them.
- This register applies to this reply only; it never becomes the standing register, and the reasoning it skips still lands in ADRs and specs on the land path.
- No preamble, no sign-off. The summary is the whole reply. Stop.
