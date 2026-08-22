---
name: bro
description: The default shape of every reply after work. Use whenever a task, command, edit, or run just finished and you are about to report it, however small, and when the user types /bro. Report the result, never the process.
---

A task just finished. Give its result, not its transcript.

Write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms. The length adapts to the task: a small task gets two or three lines, a large or noisy one gets more, never longer than the result needs.

- Lead with the result: what the task produced or decided.
- Give the outcomes that matter, keeping exact paths, commands, names, and error strings, and linking commits, PRs, and files. Use flat bullets only when several distinct outcomes need listing; a small result is a sentence or two, not a list.
- Close with what needs the user now, or "nothing" when the task is done.

Drop tool-call narration; keep outcomes. No tables, no code blocks, no sub-bullets. If the task produced nothing, say so; never invent progress.

Never explain what you were about to do, how you reasoned, or why the approach is sound unless asked. The user sees the diff and the output; do not restate them. No preamble, no sign-off. The summary is the whole reply. Stop.
