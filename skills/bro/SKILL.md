---
name: bro
description: Condense the output of a task that just finished into a short, scannable summary. Use right after a long or noisy task completes (a workflow, a background agent, a big command, an implement or verify run), or when the user types /bro.
---

A task just finished. Give its result, not its transcript.

Write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms. Hard cap: 10 lines total.

- Lead with the result: what the task produced or decided, in one line.
- Then up to 5 flat bullets, one line each, 15 words maximum. Keep exact paths, commands, names, and error strings. Link commits, PRs, and files.
- Close with one line for what needs the user now, or "nothing" when the task is done.

Drop tool-call narration; keep outcomes. No tables, no code blocks, no sub-bullets. If the task produced nothing, say so; never invent progress.

No preamble, no sign-off. The summary is the whole reply. Stop.
